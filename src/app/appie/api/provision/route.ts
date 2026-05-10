// POST /appie/api/provision
// Kicks off provisioning. In dev/preview always uses hetzner-mock.
// Body: wizard state (name, icp, voice, telegramHandle, primaryTool).

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth/session';
import { withUserScope } from '@/lib/db';
import { buildMockProvisionResult } from '@/lib/hetzner-mock';
import { isRealProvisionEnabled } from '@/lib/hetzner';
import { encryptToBuffers } from '@/lib/secretbox';
import { logInfo } from '@/lib/log';
import { __testStore__, isE2eMode } from '@/lib/test-store';

export const runtime = 'nodejs';

type WizardBody = {
  name: string;
  icp: string;
  voiceLanguage: 'nl' | 'en';
  voiceTone: string;
  telegramHandle: string;
  primaryTool: 'google_calendar';
};

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  let body: WizardBody;
  try {
    body = (await req.json()) as WizardBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  if (
    !body.name ||
    !body.icp ||
    !body.voiceLanguage ||
    !body.telegramHandle ||
    !body.primaryTool
  ) {
    return NextResponse.json({ ok: false, error: 'missing-fields' }, { status: 400 });
  }

  if (isRealProvisionEnabled()) {
    return NextResponse.json(
      {
        ok: false,
        error: 'real-provision-blocked',
        hint: 'STRIPE_LIVE_OK: provision_real_servers approval required.',
      },
      { status: 503 }
    );
  }

  const mock = buildMockProvisionResult(userId);
  const tokenEnc = encryptToBuffers(mock.telegramBotToken);

  if (isE2eMode()) {
    __testStore__.appies.set(userId, {
      userId,
      status: 'provisioning',
      provisionStartedAt: new Date(),
      onboardingState: body as unknown as Record<string, unknown>,
      telegramBotUsername: mock.telegramBotUsername,
      hetznerIp: mock.hetznerIp,
      hetznerServerId: mock.hetznerServerId,
    });
    logInfo('provision.queued.e2e', { userId, provisionId: mock.provisionId });
    return NextResponse.json({ ok: true, provisionId: mock.provisionId, mode: 'mock-e2e' });
  }

  await withUserScope(userId, async (client) => {
    // Upsert appie row for this user.
    const existing = await client.query<{ id: string }>(
      `SELECT id FROM appies WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    if (existing.rowCount === 0) {
      await client.query(
        `INSERT INTO appies (
           user_id, hetzner_server_id, hetzner_ip,
           telegram_bot_token_enc, telegram_bot_token_nonce,
           telegram_bot_username, ssh_pubkey,
           onboarding_state, status,
           provision_step, provision_percent, provision_started_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'provisioning', 'queued', '0', now())`,
        [
          userId,
          mock.hetznerServerId,
          mock.hetznerIp,
          tokenEnc.ciphertext,
          tokenEnc.nonce,
          mock.telegramBotUsername,
          mock.sshPubkey,
          JSON.stringify(body),
        ]
      );
    } else {
      await client.query(
        `UPDATE appies
         SET hetzner_server_id = $2, hetzner_ip = $3,
             telegram_bot_token_enc = $4, telegram_bot_token_nonce = $5,
             telegram_bot_username = $6, ssh_pubkey = $7,
             onboarding_state = $8, status = 'provisioning',
             provision_step = 'queued', provision_percent = '0', provision_started_at = now()
         WHERE id = $1`,
        [
          existing.rows[0].id,
          mock.hetznerServerId,
          mock.hetznerIp,
          tokenEnc.ciphertext,
          tokenEnc.nonce,
          mock.telegramBotUsername,
          mock.sshPubkey,
          JSON.stringify(body),
        ]
      );
    }
    await client.query(
      `INSERT INTO audit_log (user_id, event, payload)
       VALUES ($1, 'provision.queued', $2)`,
      [userId, JSON.stringify({ provision_id: mock.provisionId })]
    );
  });

  logInfo('provision.queued', { userId, mode: 'mock', provisionId: mock.provisionId });

  return NextResponse.json({
    ok: true,
    provisionId: mock.provisionId,
    mode: 'mock',
  });
}
