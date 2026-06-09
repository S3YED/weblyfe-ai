// POST /api/appie/integrations/{notion|airtable}/validate
// Bring-your-own-token integration: the customer pastes THEIR own Notion
// integration token / Airtable PAT; we validate it server-side against the
// provider API and return the connected workspace / base label. Nothing is
// stored here. The raw token never leaves the server and is never logged or
// echoed back.
//
// Request:  { "token": "secret_..." | "pat..." }
// Response: { "ok": true, "label": "My workspace", "detail"?: "Base A, Base B" }
//           { "ok": false, "error": "malformed"|"invalid-token"|"no-access"|"network" }

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth/session';
import {
  validateIntegrationToken,
  type IntegrationProvider,
} from '@/lib/integrations';
import { logInfo } from '@/lib/log';

export const runtime = 'nodejs';

type Body = { token?: unknown };

const PROVIDERS: ReadonlySet<string> = new Set(['notion', 'airtable']);

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  if (!PROVIDERS.has(provider)) {
    return NextResponse.json({ ok: false, error: 'unknown-provider' }, { status: 404 });
  }

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

  const result = await validateIntegrationToken(
    provider as IntegrationProvider,
    body.token
  );

  if (!result.ok) {
    // Never log the token. Log only the classification.
    logInfo('integration.validate.rejected', { userId, provider, error: result.error });
    const status = result.error === 'network' ? 502 : 400;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }

  logInfo('integration.validate.ok', { userId, provider, label: result.label });
  return NextResponse.json({ ok: true, label: result.label, detail: result.detail });
}
