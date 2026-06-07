// POST /api/appie/heartbeat
// The provisioned box phones home. Body: { appie_id, secret }.
// Validates the per-appie heartbeat_secret (set at provision time), then marks
// the appie online (replaces the time-based mock progression once a real box
// is calling). Public route: the secret is the credential.
// Service-role RLS scope (app.user_id NULL) so it can update across users.

import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { withUserScope } from '@/lib/db';
import { logInfo, logWarn } from '@/lib/log';
import { __testStore__, isE2eMode } from '@/lib/test-store';

export const runtime = 'nodejs';

type HeartbeatBody = { appie_id?: string; secret?: string };

// Constant-time compare to avoid leaking the secret via timing.
function secretsMatch(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function POST(req: NextRequest) {
  let body: HeartbeatBody;
  try {
    body = (await req.json()) as HeartbeatBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  if (!body.appie_id || !body.secret) {
    return NextResponse.json({ ok: false, error: 'missing-fields' }, { status: 400 });
  }

  if (isE2eMode()) {
    for (const appie of __testStore__.appies.values()) {
      if (appie.hetznerServerId && body.appie_id.includes(appie.hetznerServerId)) {
        if (appie.heartbeatSecret && secretsMatch(appie.heartbeatSecret, body.secret)) {
          appie.status = 'online';
          logInfo('appie.heartbeat.ok.e2e', { online: true });
          return NextResponse.json({ ok: true, status: 'online' });
        }
      }
    }
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  try {
    const result = await withUserScope(null, async (client) => {
      const r = await client.query<{ heartbeat_secret: string | null }>(
        `SELECT heartbeat_secret FROM appies WHERE id = $1`,
        [body.appie_id]
      );
      if (r.rowCount === 0) return 'not-found' as const;
      const stored = r.rows[0].heartbeat_secret;
      if (!stored || !body.secret || !secretsMatch(stored, body.secret)) {
        return 'unauthorized' as const;
      }
      await client.query(
        `UPDATE appies
           SET status = 'online', provision_percent = '100', last_heartbeat_at = now()
         WHERE id = $1`,
        [body.appie_id]
      );
      return 'ok' as const;
    });

    if (result === 'not-found' || result === 'unauthorized') {
      // Same response for both: never reveal whether an appie_id exists.
      logWarn('appie.heartbeat.rejected', { reason: result });
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }

    logInfo('appie.heartbeat.ok', { online: true });
    return NextResponse.json({ ok: true, status: 'online' });
  } catch (err) {
    logWarn('appie.heartbeat.error', { error: String(err) });
    return NextResponse.json({ ok: false, error: 'internal' }, { status: 500 });
  }
}
