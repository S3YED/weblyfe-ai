// POST /api/appie/integrations/{notion|airtable}/disconnect
// Bring-your-own-token integration: forget the stored token + label for this
// provider. Null out the encrypted columns + label + connected-at, and audit.
// No secret is ever returned. Idempotent - disconnecting an already-disconnected
// provider is a no-op 200.

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth/session';
import { withUserScope } from '@/lib/db';
import type { IntegrationProvider } from '@/lib/integrations';
import { logInfo, logWarn } from '@/lib/log';

export const runtime = 'nodejs';

const COLUMNS: Record<
  IntegrationProvider,
  { enc: string; nonce: string; label: string; connectedAt: string; event: string }
> = {
  notion: {
    enc: 'notion_token_enc',
    nonce: 'notion_token_nonce',
    label: 'notion_workspace_label',
    connectedAt: 'notion_connected_at',
    event: 'integration.notion.disconnected',
  },
  airtable: {
    enc: 'airtable_token_enc',
    nonce: 'airtable_token_nonce',
    label: 'airtable_base_label',
    connectedAt: 'airtable_connected_at',
    event: 'integration.airtable.disconnected',
  },
};

export async function POST(
  _req: NextRequest,
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

  try {
    await withUserScope(userId, async (client) => {
      await client.query(
        `UPDATE appies
           SET ${col.enc} = NULL,
               ${col.nonce} = NULL,
               ${col.label} = NULL,
               ${col.connectedAt} = NULL
         WHERE user_id = $1`,
        [userId]
      );
      await client.query(
        `INSERT INTO audit_log (user_id, event, payload)
         VALUES ($1, $2, '{}'::jsonb)`,
        [userId, col.event]
      );
    });

    logInfo('integration.disconnect.ok', { userId, provider });
    return NextResponse.json({ ok: true });
  } catch (err) {
    logWarn('integration.disconnect.failed', { userId, provider, error: String(err) });
    return NextResponse.json({ ok: false, error: 'store-failed' }, { status: 503 });
  }
}
