// POST /api/appie/bot/connect
// Bring-your-own Telegram bot: store the customer's validated bot token
// (encrypted at rest), set the bot's webhook to our register-chat endpoint, and
// return the t.me deep-link so the customer can /start-bind their chat.
//
// The token is re-validated server-side before storage (never trust the client
// claim that it already validated). Only the bot @username is returned; the raw
// token is encrypted with secretbox and never logged or echoed.
//
// Request:  { "token": "1234567:ABC..." }
// Response: { "ok": true, "username": "my_appie_bot",
//             "telegramDeepLink": "https://t.me/my_appie_bot?start=<token>",
//             "webhookSet": true }

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth/session';
import { withUserScope } from '@/lib/db';
import { encryptToBuffers } from '@/lib/secretbox';
import {
  validateBotToken,
  setWebhook,
  buildRegisterChatWebhookUrl,
} from '@/lib/telegram-bot';
import { issueBindToken, buildBindDeepLink } from '@/lib/telegram-bind';
import { getEnv } from '@/lib/env';
import { logInfo, logWarn } from '@/lib/log';

export const runtime = 'nodejs';

type Body = { token?: unknown };

export async function POST(req: NextRequest) {
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

  // Re-validate before storing. Defense in depth: do NOT store an unvalidated token.
  const validation = await validateBotToken(token);
  if (!validation.ok) {
    logInfo('telegram.bot.connect.rejected', { userId, error: validation.error });
    const status = validation.error === 'network' ? 502 : 400;
    return NextResponse.json({ ok: false, error: validation.error }, { status });
  }
  const username = validation.username;

  // Set the webhook so the bot relays /start <bindToken> to register-chat.
  const appUrl = getEnv().NEXT_PUBLIC_APP_URL;
  const webhookUrl = buildRegisterChatWebhookUrl(appUrl);
  const webhook = await setWebhook(token, webhookUrl);
  if (!webhook.ok) {
    // Webhook failed: do not store a half-wired bot. Surface a clear error.
    logWarn('telegram.bot.connect.webhook-failed', { userId, error: webhook.error });
    return NextResponse.json(
      { ok: false, error: 'webhook-failed' },
      { status: webhook.error === 'network' ? 502 : 502 }
    );
  }

  const tokenEnc = encryptToBuffers(token);

  try {
    const { telegramDeepLink } = await withUserScope(userId, async (client) => {
      // Upsert the appie row: store encrypted token + username on the customer's
      // most recent appie, or create one if none exists yet.
      const existing = await client.query<{ id: string }>(
        `SELECT id FROM appies WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [userId]
      );

      let appieId: string;
      if (existing.rowCount === 0) {
        const inserted = await client.query<{ id: string }>(
          `INSERT INTO appies (
             user_id, telegram_bot_token_enc, telegram_bot_token_nonce,
             telegram_bot_username, status
           ) VALUES ($1, $2, $3, $4, 'bot_connected')
           RETURNING id`,
          [userId, tokenEnc.ciphertext, tokenEnc.nonce, username]
        );
        appieId = inserted.rows[0].id;
      } else {
        appieId = existing.rows[0].id;
        await client.query(
          `UPDATE appies
             SET telegram_bot_token_enc = $2,
                 telegram_bot_token_nonce = $3,
                 telegram_bot_username = $4
           WHERE id = $1`,
          [appieId, tokenEnc.ciphertext, tokenEnc.nonce, username]
        );
      }

      const { token: bindToken } = await issueBindToken(client, appieId);

      await client.query(
        `INSERT INTO audit_log (user_id, event, payload)
         VALUES ($1, 'telegram.bot.connected', $2)`,
        [userId, JSON.stringify({ username })]
      );

      return { telegramDeepLink: buildBindDeepLink(username, bindToken) };
    });

    logInfo('telegram.bot.connect.ok', { userId, username });
    return NextResponse.json({
      ok: true,
      username,
      telegramDeepLink,
      webhookSet: true,
    });
  } catch (err) {
    logWarn('telegram.bot.connect.store-failed', { userId, error: String(err) });
    return NextResponse.json({ ok: false, error: 'store-failed' }, { status: 503 });
  }
}
