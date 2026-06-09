// POST /api/appie/integrations/{notion|airtable}/connect
// Bring-your-own-token integration: re-validate the customer-supplied token
// server-side (defense in depth - never trust the client's "already validated"
// claim), then store it encrypted at rest (secretbox) on the appies row along
// with a non-secret display label and connected-at timestamp.
//
// Only the public label is returned; the raw token is encrypted with secretbox
// and never logged or echoed.
//
// Request:  { "token": "secret_..." | "pat..." }
// Response: { "ok": true, "label": "My workspace", "detail"?: "..." }
//           { "ok": false, "error": "malformed"|"invalid-token"|"network"|"store-failed" }

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth/session';
import { withUserScope } from '@/lib/db';
import { encryptToBuffers } from '@/lib/secretbox';
import {
  validateIntegrationToken,
  type IntegrationProvider,
} from '@/lib/integrations';
import { logInfo, logWarn } from '@/lib/log';

export const runtime = 'nodejs';

type Body = { token?: unknown };

// Per-provider column mapping. Keeps the SQL parameterised and the route generic
// without ever interpolating user input into the statement.
const COLUMNS: Record<
  IntegrationProvider,
  { enc: string; nonce: string; label: string; connectedAt: string; event: string }
> = {
  notion: {
    enc: 'notion_token_enc',
    nonce: 'notion_token_nonce',
    label: 'notion_workspace_label',
    connectedAt: 'notion_connected_at',
    event: 'integration.notion.connected',
  },
  airtable: {
    enc: 'airtable_token_enc',
    nonce: 'airtable_token_nonce',
    label: 'airtable_base_label',
    connectedAt: 'airtable_connected_at',
    event: 'integration.airtable.connected',
  },
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  if (provider !== 'notion' && provider !== 'airtable') {
    return NextResponse.json({ ok: false, error: 'unknown-provider' }, { status: 404 });
  }
  const col = COLUMNS[provider];

  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  if (typeof body.token !== 'string' || body.token.trim().length === 0) {
    return NextResponse.json({ ok: false, error: 'missing-token' }, { status: 400 });
  }
  const token = body.token.trim();

  // Re-validate before storing. Defense in depth: never store an unvalidated token.
  const validation = await validateIntegrationToken(provider, token);
  if (!validation.ok) {
    logInfo('integration.connect.rejected', { userId, provider, error: validation.error });
    const status = validation.error === 'network' ? 502 : 400;
    return NextResponse.json({ ok: false, error: validation.error }, { status });
  }
  const label = validation.label;
  const tokenEnc = encryptToBuffers(token);

  try {
    await withUserScope(userId, async (client) => {
      const existing = await client.query<{ id: string }>(
        `SELECT id FROM appies WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [userId]
      );

      if (existing.rowCount === 0) {
        await client.query(
          `INSERT INTO appies (
             user_id, ${col.enc}, ${col.nonce}, ${col.label}, ${col.connectedAt}
           ) VALUES ($1, $2, $3, $4, now())`,
          [userId, tokenEnc.ciphertext, tokenEnc.nonce, label]
        );
      } else {
        await client.query(
          `UPDATE appies
             SET ${col.enc} = $2,
                 ${col.nonce} = $3,
                 ${col.label} = $4,
                 ${col.connectedAt} = now()
           WHERE id = $1`,
          [existing.rows[0].id, tokenEnc.ciphertext, tokenEnc.nonce, label]
        );
      }

      await client.query(
        `INSERT INTO audit_log (user_id, event, payload)
         VALUES ($1, $2, $3)`,
        [userId, col.event, JSON.stringify({ label })]
      );
    });

    logInfo('integration.connect.ok', { userId, provider, label });
    return NextResponse.json({ ok: true, label, detail: validation.detail });
  } catch (err) {
    logWarn('integration.connect.store-failed', { userId, provider, error: String(err) });
    return NextResponse.json({ ok: false, error: 'store-failed' }, { status: 503 });
  }
}
