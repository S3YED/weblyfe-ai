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
import { sendFirstPing } from '@/lib/telegram';
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

  // Narrow once so the value stays `string` inside the async closure below.
  const appieId = body.appie_id;
  const presentedSecret = body.secret;

  try {
    const result = await withUserScope(null, async (client) => {
      const r = await client.query<{ heartbeat_secret: string | null }>(
        `SELECT heartbeat_secret FROM appies WHERE id = $1`,
        [appieId]
      );
      if (r.rowCount === 0) return 'not-found' as const;
      const stored = r.rows[0].heartbeat_secret;
      if (!stored || !secretsMatch(stored, presentedSecret)) {
        return 'unauthorized' as const;
      }
      // Flip online + stamp heartbeat. RETURNING tells us if THIS call was the
      // first online transition (xmax = 0 means inserted, not relevant here;
      // instead we detect transition by the WHERE on prior status).
      const flip = await client.query<{ id: string }>(
        `UPDATE appies
           SET status = 'online', provision_percent = '100', last_heartbeat_at = now()
         WHERE id = $1 AND status IS DISTINCT FROM 'online'
         RETURNING id`,
        [appieId]
      );
      const firstOnline = (flip.rowCount ?? 0) > 0;
      if (!firstOnline) {
        // Already online: just refresh last_heartbeat_at (liveness ping).
        await client.query(`UPDATE appies SET last_heartbeat_at = now() WHERE id = $1`, [
          appieId,
        ]);
        return 'ok' as const;
      }

      // First online transition: send the customer's first ping (idempotent -
      // only runs on the transition, not on subsequent liveness pings).
      const detail = await client.query<{
        onboarding_state: { name?: string; icp?: string; voiceLanguage?: 'nl' | 'en' } | null;
        telegram_chat_id: string | null;
        telegram_bot_token_enc: Buffer | null;
        telegram_bot_token_nonce: Buffer | null;
      }>(
        `SELECT onboarding_state, telegram_chat_id,
                telegram_bot_token_enc, telegram_bot_token_nonce
           FROM appies WHERE id = $1`,
        [appieId]
      );
      const row = detail.rows[0];
      const onboarding = row?.onboarding_state || {};
      await sendFirstPing(client, {
        appieId,
        customerName: onboarding.name || 'daar',
        icp: onboarding.icp || 'jouw doelklant',
        language: (onboarding.voiceLanguage as 'nl' | 'en') || 'nl',
        telegramChatId: row?.telegram_chat_id ?? null,
        botTokenEnc: row?.telegram_bot_token_enc ?? null,
        botTokenNonce: row?.telegram_bot_token_nonce ?? null,
      });
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
