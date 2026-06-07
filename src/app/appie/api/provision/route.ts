// POST /appie/api/provision
// Kicks off provisioning. In dev/preview always uses hetzner-mock.
// Body: wizard state (name, icp, voice, telegramHandle, primaryTool).

import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth/session';
import { withUserScope } from '@/lib/db';
import { buildMockProvisionResult } from '@/lib/hetzner-mock';
import { encryptToBuffers } from '@/lib/secretbox';
import { issueBindToken, buildBindDeepLink } from '@/lib/telegram-bind';
import { logInfo, logWarn } from '@/lib/log';
import { __testStore__, isE2eMode } from '@/lib/test-store';
import { provision } from '@/lib/provisioning';
import { leaseBot } from '@/lib/provisioning/bot-pool';

// Real provisioning runs the Orgo->Hetzner orchestrator. Gate: PROVISION_MODE=real.
// Mock stays the default so dev/preview never touches a cloud provider.
function isRealMode(): boolean {
  return process.env.PROVISION_MODE === 'real';
}

// Per-appie heartbeat shared secret. The box presents this back to
// POST /api/appie/heartbeat to prove identity. 32 bytes base64url.
function generateHeartbeatSecret(): string {
  return randomBytes(32).toString('base64url');
}

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

  // Real mode: lease a bot, persist the appie row, run the Orgo->Hetzner
  // orchestrator, then record the chosen provider. E2E never enters here.
  if (isRealMode() && !isE2eMode()) {
    return provisionReal(userId, body);
  }

  const mock = buildMockProvisionResult(userId);
  const tokenEnc = encryptToBuffers(mock.telegramBotToken);
  const heartbeatSecret = generateHeartbeatSecret();

  if (isE2eMode()) {
    const bindToken = `bind_e2e_${mock.hetznerServerId}`;
    __testStore__.appies.set(userId, {
      userId,
      status: 'provisioning',
      provisionStartedAt: new Date(),
      onboardingState: body as unknown as Record<string, unknown>,
      telegramBotUsername: mock.telegramBotUsername,
      hetznerIp: mock.hetznerIp,
      hetznerServerId: mock.hetznerServerId,
      telegramChatId: null,
      heartbeatSecret,
      bindToken,
    });
    logInfo('provision.queued.e2e', { userId, provisionId: mock.provisionId });
    return NextResponse.json({
      ok: true,
      provisionId: mock.provisionId,
      mode: 'mock-e2e',
      telegramDeepLink: buildBindDeepLink(mock.telegramBotUsername, bindToken),
    });
  }

  const { telegramDeepLink } = await withUserScope(userId, async (client) => {
    // Upsert appie row for this user.
    const existing = await client.query<{ id: string }>(
      `SELECT id FROM appies WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    let appieId: string;
    if (existing.rowCount === 0) {
      const inserted = await client.query<{ id: string }>(
        `INSERT INTO appies (
           user_id, hetzner_server_id, hetzner_ip,
           telegram_bot_token_enc, telegram_bot_token_nonce,
           telegram_bot_username, ssh_pubkey,
           onboarding_state, status,
           provision_step, provision_percent, provision_started_at,
           heartbeat_secret
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'provisioning', 'queued', '0', now(), $9)
         RETURNING id`,
        [
          userId,
          mock.hetznerServerId,
          mock.hetznerIp,
          tokenEnc.ciphertext,
          tokenEnc.nonce,
          mock.telegramBotUsername,
          mock.sshPubkey,
          JSON.stringify(body),
          heartbeatSecret,
        ]
      );
      appieId = inserted.rows[0].id;
    } else {
      appieId = existing.rows[0].id;
      await client.query(
        `UPDATE appies
         SET hetzner_server_id = $2, hetzner_ip = $3,
             telegram_bot_token_enc = $4, telegram_bot_token_nonce = $5,
             telegram_bot_username = $6, ssh_pubkey = $7,
             onboarding_state = $8, status = 'provisioning',
             provision_step = 'queued', provision_percent = '0', provision_started_at = now(),
             heartbeat_secret = $9
         WHERE id = $1`,
        [
          appieId,
          mock.hetznerServerId,
          mock.hetznerIp,
          tokenEnc.ciphertext,
          tokenEnc.nonce,
          mock.telegramBotUsername,
          mock.sshPubkey,
          JSON.stringify(body),
          heartbeatSecret,
        ]
      );
    }

    // Mint a one-time chat-bind token and build the customer's deep-link.
    const { token: bindToken } = await issueBindToken(client, appieId);

    await client.query(
      `INSERT INTO audit_log (user_id, event, payload)
       VALUES ($1, 'provision.queued', $2)`,
      [userId, JSON.stringify({ provision_id: mock.provisionId })]
    );

    return {
      telegramDeepLink: buildBindDeepLink(mock.telegramBotUsername, bindToken),
    };
  });

  logInfo('provision.queued', { userId, mode: 'mock', provisionId: mock.provisionId });

  return NextResponse.json({
    ok: true,
    provisionId: mock.provisionId,
    mode: 'mock',
    telegramDeepLink,
  });
}

// ── Real provisioning path ────────────────────────────────────────────────
// 1. Lease a bot from the pool (one per customer; never reuse a leased token).
// 2. Upsert the appie row with identity (heartbeat_secret) + encrypted bot token.
// 3. Mint the chat-bind deep-link.
// 4. Run the orchestrator (Orgo primary, Hetzner fallback) and persist the
//    chosen provider + provider_id.
// The box phones home to /api/appie/heartbeat with {appie_id, secret}; the
// status route flips it online on that signal (real-heartbeat preferred path).
async function provisionReal(userId: string, body: WizardBody): Promise<NextResponse> {
  const heartbeatSecret = generateHeartbeatSecret();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';
  if (!appUrl) {
    return NextResponse.json(
      { ok: false, error: 'misconfigured', hint: 'NEXT_PUBLIC_APP_URL required for real mode.' },
      { status: 500 }
    );
  }

  // Phase 1 (transactional): resolve the customer's bot + persist the row + mint
  // the bind link.
  //
  // Token selection (Seyed decision 2026-06-07, TG 2890): PREFER the customer's
  // OWN bot token if they already connected one via /api/appie/bot/connect.
  // Only fall back to leasing from TELEGRAM_BOT_TOKEN_POOL when no customer
  // token is present on their appie row.
  let prepared: {
    appieId: string;
    botToken: string;
    telegramDeepLink: string;
  };
  try {
    prepared = await withUserScope(userId, async (client) => {
      const { decryptFromBuffers } = await import('@/lib/secretbox');

      // Look up the customer's existing appie row (may already hold their own bot).
      const existing = await client.query<{
        id: string;
        enc: Buffer | null;
        nonce: Buffer | null;
        username: string | null;
      }>(
        `SELECT id, telegram_bot_token_enc AS enc,
                telegram_bot_token_nonce AS nonce,
                telegram_bot_username AS username
           FROM appies WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [userId]
      );
      const current = existing.rows[0] ?? null;

      // 1) Customer brought their own token -> use it, skip the pool entirely.
      let bot: { token: string; username: string } | null = null;
      if (current?.enc && current.nonce && current.username) {
        try {
          bot = {
            token: decryptFromBuffers(current.enc, current.nonce),
            username: current.username,
          };
          logInfo('provision.real.token-source', { userId, source: 'customer' });
        } catch {
          // Undecryptable (corrupt/mock) -> fall through to pool lease.
          bot = null;
        }
      }

      // 2) No customer token -> FALLBACK: lease one from the pool, never reusing
      //    a token already assigned to another appie.
      if (!bot) {
        const leasedRows = await client.query<{ enc: Buffer | null; nonce: Buffer | null }>(
          `SELECT telegram_bot_token_enc AS enc, telegram_bot_token_nonce AS nonce
             FROM appies
            WHERE telegram_bot_token_enc IS NOT NULL`
        );
        const leasedTokens = new Set<string>();
        for (const r of leasedRows.rows) {
          if (r.enc && r.nonce) {
            try {
              leasedTokens.add(decryptFromBuffers(r.enc, r.nonce));
            } catch {
              // Skip undecryptable rows (e.g. mock tokens); they won't collide.
            }
          }
        }
        bot = leaseBot(process.env.TELEGRAM_BOT_TOKEN_POOL, leasedTokens);
        logInfo('provision.real.token-source', { userId, source: 'pool' });
      }

      const resolvedBot = bot;
      const tokenEnc = encryptToBuffers(resolvedBot.token);

      let appieId: string;
      if (!current) {
        const inserted = await client.query<{ id: string }>(
          `INSERT INTO appies (
             user_id, telegram_bot_token_enc, telegram_bot_token_nonce,
             telegram_bot_username, onboarding_state, status,
             provision_step, provision_percent, provision_started_at,
             heartbeat_secret
           ) VALUES ($1, $2, $3, $4, $5, 'provisioning', 'queued', '0', now(), $6)
           RETURNING id`,
          [userId, tokenEnc.ciphertext, tokenEnc.nonce, resolvedBot.username, JSON.stringify(body), heartbeatSecret]
        );
        appieId = inserted.rows[0].id;
      } else {
        appieId = current.id;
        await client.query(
          `UPDATE appies
             SET telegram_bot_token_enc = $2, telegram_bot_token_nonce = $3,
                 telegram_bot_username = $4, onboarding_state = $5,
                 status = 'provisioning', provision_step = 'queued',
                 provision_percent = '0', provision_started_at = now(),
                 heartbeat_secret = $6
           WHERE id = $1`,
          [appieId, tokenEnc.ciphertext, tokenEnc.nonce, resolvedBot.username, JSON.stringify(body), heartbeatSecret]
        );
      }

      const { token: bindToken } = await issueBindToken(client, appieId);
      await client.query(
        `INSERT INTO audit_log (user_id, event, payload) VALUES ($1, 'provision.queued', $2)`,
        [userId, JSON.stringify({ mode: 'real' })]
      );

      return {
        appieId,
        botToken: resolvedBot.token,
        telegramDeepLink: buildBindDeepLink(resolvedBot.username, bindToken),
      };
    });
  } catch (err) {
    logWarn('provision.real.prepare-failed', { userId, error: String(err) });
    return NextResponse.json(
      { ok: false, error: 'provision-prepare-failed' },
      { status: 503 }
    );
  }

  // Phase 2 (no DB txn held while we hit the cloud): orchestrate the box.
  try {
    const outcome = await provision({
      appieId: prepared.appieId,
      heartbeatSecret,
      appUrl,
      botToken: prepared.botToken,
      onboardingState: body as unknown as Record<string, unknown>,
    });

    // Persist the chosen provider + provider-side id for status/destroy.
    await withUserScope(userId, async (client) => {
      await client.query(
        `UPDATE appies
           SET provider = $2, provider_id = $3,
               hetzner_server_id = $3, hetzner_ip = $4,
               provision_step = 'server-creating', provision_percent = '20'
         WHERE id = $1`,
        [prepared.appieId, outcome.provider, outcome.providerId, outcome.ip ?? null]
      );
    });

    logInfo('provision.real.queued', {
      userId,
      provider: outcome.provider,
      appieId: prepared.appieId,
    });

    return NextResponse.json({
      ok: true,
      provisionId: outcome.providerId,
      mode: 'real',
      provider: outcome.provider,
      telegramDeepLink: prepared.telegramDeepLink,
    });
  } catch (err) {
    // Both providers failed. Mark the row failed but keep the deep-link so the
    // customer can still bind once we retry; surface a 503.
    logWarn('provision.real.failed', { userId, error: String(err) });
    await withUserScope(userId, async (client) => {
      await client.query(`UPDATE appies SET status = 'failed' WHERE id = $1`, [prepared.appieId]);
    }).catch(() => undefined);
    return NextResponse.json(
      { ok: false, error: 'provision-failed', telegramDeepLink: prepared.telegramDeepLink },
      { status: 503 }
    );
  }
}
