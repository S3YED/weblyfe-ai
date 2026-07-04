// POST /api/appie/bot/webhook/<appieId>
//
// UNIFIED per-appie bot webhook. Each customer's bot is pointed here at connect
// time (the appie id lives in the path), so an inbound Telegram update maps to
// exactly ONE appie row. This is the per-tenant isolation boundary.
//
// Handles BOTH:
//   1. "/start <bindToken>"  -> binds this chat to the appie (same as the old
//      register-chat flow, kept working).
//   2. Any normal text message -> loads the appie's onboarding context + short
//      conversation memory, asks the onboarding model (OpenRouter), and replies
//      THROUGH the customer's own bot. The bot talks back immediately, before
//      any box is provisioned.
//   3. A voice message -> graceful text-first reply (transcription is a TODO).
//
// SECURITY:
//   - Public route. We validate the body looks like a Telegram update and that
//     the path appie id is a UUID before doing anything.
//   - Per-appie rate limit (in-memory token bucket) to blunt abuse/loops.
//   - The bot token is decrypted only to send; never logged or returned.
//   - The user's text is untrusted: it stays in the `user` role, never folded
//     into the system prompt (prompt-injection boundary).
//   - An update for appie A can only ever read/write appie A's row.

import { NextRequest, NextResponse } from 'next/server';
import { withUserScope } from '@/lib/db';
import { consumeBindToken } from '@/lib/telegram-bind';
import { decryptFromBuffers } from '@/lib/secretbox';
import { sendCustomerMessage } from '@/lib/telegram';
import {
  generateOnboardingReply,
  appendTurn,
  guessLanguage,
  fallbackText,
  voiceFallbackText,
  type ChatTurn,
} from '@/lib/onboarding-chat';
import { logInfo, logWarn } from '@/lib/log';
import { isE2eMode, __testStore__ } from '@/lib/test-store';

export const runtime = 'nodejs';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type TgChat = { id?: number | string };
type TgVoice = { file_id?: string };
type TgMessage = {
  chat?: TgChat;
  text?: string;
  voice?: TgVoice;
  from?: { language_code?: string };
};
type TgUpdate = { message?: TgMessage };

// ── Per-appie rate limit: simple in-memory token bucket. Good enough for a
// single serverless instance; abuse beyond that is shed by Telegram + the
// model's own limits. Resets naturally over time.
const RATE_MAX = 20; // messages
const RATE_WINDOW_MS = 60_000; // per minute
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function rateLimited(appieId: string, now = Date.now()): boolean {
  const b = buckets.get(appieId);
  if (!b || now > b.resetAt) {
    buckets.set(appieId, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (b.count >= RATE_MAX) return true;
  b.count += 1;
  return false;
}

function startToken(text: string): string | null {
  const m = text.match(/^\/start(?:@\w+)?\s+(\S+)/);
  return m ? m[1] : null;
}

type AppieOnboarding = {
  name?: string | null;
  icp?: string | null;
  voiceLanguage?: 'nl' | 'en' | null;
  chatHistory?: ChatTurn[];
};

// Always answer 200 to Telegram once we've decided not to act, so it does not
// retry/back off the webhook. Errors we want Telegram to retry return non-200.
function ok() {
  return NextResponse.json({ ok: true });
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ appieId: string }> }
) {
  const { appieId } = await ctx.params;
  if (!appieId || !UUID_RE.test(appieId)) {
    return NextResponse.json({ ok: false, error: 'bad-appie' }, { status: 400 });
  }

  let update: TgUpdate;
  try {
    update = (await req.json()) as TgUpdate;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  const msg = update.message;
  // Plausibility check: a real Telegram message has a chat id.
  const chatId = msg?.chat?.id != null ? String(msg.chat.id) : null;
  if (!msg || !chatId) {
    // Not something we handle (edited messages, channel posts, etc.). Ack so
    // Telegram stops resending.
    return ok();
  }

  if (rateLimited(appieId)) {
    logWarn('telegram.bot.webhook.rate-limited', { appieId });
    return ok();
  }

  const text = typeof msg.text === 'string' ? msg.text : '';

  // ── 1) Bind flow: "/start <token>" ──────────────────────────────────────
  const bindToken = text ? startToken(text) : null;
  if (bindToken) {
    return handleBind(appieId, bindToken, chatId);
  }

  // ── 2) Voice: graceful text-first fallback (transcription is a TODO) ─────
  if (msg.voice && !text) {
    return handleVoice(appieId, chatId, msg);
  }

  // ── 3) Normal message: AI onboarding reply ──────────────────────────────
  if (!text.trim()) {
    return ok(); // nothing to respond to (sticker, photo without caption, etc.)
  }

  return handleOnboardingMessage(appieId, chatId, text, msg);
}

// Bind this chat to the appie (single-use token).
async function handleBind(appieId: string, token: string, chatId: string) {
  if (isE2eMode()) {
    for (const [id, appie] of __testStore__.appies.entries()) {
      if (id === appieId && appie.bindToken === token) {
        appie.bindToken = null;
        appie.telegramChatId = chatId;
        logInfo('telegram.bot.webhook.bound.e2e', { appieId });
        return ok();
      }
    }
    return ok();
  }

  try {
    await withUserScope(null, async (client) => {
      const consumed = await consumeBindToken(client, token);
      // Isolation: only bind if the token actually belongs to THIS appie.
      if (!consumed || consumed.appieId !== appieId) return;
      await client.query(`UPDATE appies SET telegram_chat_id = $2 WHERE id = $1`, [
        appieId,
        chatId,
      ]);
      await client.query(
        `INSERT INTO audit_log (user_id, event, payload)
         SELECT user_id, 'telegram.chat-bound', $2 FROM appies WHERE id = $1`,
        [appieId, JSON.stringify({ appie_id: appieId })]
      );
    });
    logInfo('telegram.bot.webhook.bound', { appieId });
  } catch (err) {
    logWarn('telegram.bot.webhook.bind-error', { appieId, error: String(err) });
  }
  return ok();
}

async function handleVoice(appieId: string, chatId: string, msg: TgMessage) {
  const lang = pickLanguage(null, msg);
  await safeSend(appieId, chatId, voiceFallbackText(lang)).catch(() => undefined);
  logInfo('telegram.bot.webhook.voice-fallback', { appieId });
  return ok();
}

async function handleOnboardingMessage(
  appieId: string,
  chatId: string,
  text: string,
  msg: TgMessage
) {
  // E2E mode: deterministic canned reply, no model / DB.
  if (isE2eMode()) {
    const appie = __testStore__.appies.get(appieId);
    if (appie) {
      const lang = pickLanguage(appie.onboardingState as AppieOnboarding, msg);
      const reply =
        lang === 'en' ? 'Hi! I am Appie, here to help.' : 'Hoi! Ik ben Appie, ik help je.';
      logInfo('telegram.bot.webhook.reply.e2e', { appieId });
      // E2E has no real bot token; record intent in pings for inspection.
      __testStore__.pings.push({ appieUserId: appie.userId, body: reply, ts: new Date() });
    }
    return ok();
  }

  try {
    // Load this appie's token + onboarding context in one scoped read.
    const loaded = await withUserScope(null, async (client) => {
      const r = await client.query<{
        telegram_bot_token_enc: Buffer | null;
        telegram_bot_token_nonce: Buffer | null;
        onboarding_state: AppieOnboarding | null;
      }>(
        `SELECT telegram_bot_token_enc, telegram_bot_token_nonce, onboarding_state
           FROM appies WHERE id = $1`,
        [appieId]
      );
      return r.rows[0] ?? null;
    });

    if (!loaded?.telegram_bot_token_enc || !loaded.telegram_bot_token_nonce) {
      logWarn('telegram.bot.webhook.no-token', { appieId });
      return ok();
    }

    const onboarding: AppieOnboarding = loaded.onboarding_state ?? {};
    const lang = pickLanguage(onboarding, msg);
    const history: ChatTurn[] = Array.isArray(onboarding.chatHistory)
      ? onboarding.chatHistory
      : [];

    const result = await generateOnboardingReply({
      apiKey: process.env.OPENROUTER_API_KEY,
      ctx: { name: onboarding.name, icp: onboarding.icp, language: lang },
      history,
      userMessage: text,
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
      // Optional ops override if the default free model is unavailable.
      model: process.env.OPENROUTER_MODEL,
    });

    const replyText = result.ok ? result.reply : fallbackText(lang);

    // Send through the customer's own bot.
    const botToken = decryptFromBuffers(
      loaded.telegram_bot_token_enc,
      loaded.telegram_bot_token_nonce
    );
    await sendCustomerMessage(botToken, chatId, replyText);

    // Persist updated conversation memory (only on a real model reply).
    if (result.ok) {
      const nextHistory = appendTurn(
        appendTurn(history, { role: 'user', content: text.slice(0, 2000) }),
        { role: 'assistant', content: result.reply }
      );
      const nextState: AppieOnboarding = {
        ...onboarding,
        voiceLanguage: onboarding.voiceLanguage ?? lang,
        chatHistory: nextHistory,
      };
      await withUserScope(null, async (client) => {
        await client.query(
          `UPDATE appies SET onboarding_state = $2 WHERE id = $1`,
          [appieId, JSON.stringify(nextState)]
        );
      });
    }

    logInfo('telegram.bot.webhook.reply-sent', {
      appieId,
      modelOk: result.ok,
    });
  } catch (err) {
    logWarn('telegram.bot.webhook.reply-error', { appieId, error: String(err) });
    // Best-effort: don't ask Telegram to retry (would re-charge the model).
  }
  return ok();
}

// Decide the reply language: stored preference wins, else the Telegram
// language_code hint, else a heuristic from the message text.
function pickLanguage(
  onboarding: AppieOnboarding | null,
  msg: TgMessage
): 'nl' | 'en' {
  if (onboarding?.voiceLanguage === 'nl' || onboarding?.voiceLanguage === 'en') {
    return onboarding.voiceLanguage;
  }
  const code = msg.from?.language_code?.toLowerCase();
  if (code?.startsWith('nl')) return 'nl';
  if (code?.startsWith('en')) return 'en';
  return guessLanguage(typeof msg.text === 'string' ? msg.text : '');
}

// Decrypt-and-send wrapper used by the voice fallback (needs the bot token).
async function safeSend(appieId: string, chatId: string, body: string) {
  if (isE2eMode()) return;
  const loaded = await withUserScope(null, async (client) => {
    const r = await client.query<{
      telegram_bot_token_enc: Buffer | null;
      telegram_bot_token_nonce: Buffer | null;
    }>(
      `SELECT telegram_bot_token_enc, telegram_bot_token_nonce
         FROM appies WHERE id = $1`,
      [appieId]
    );
    return r.rows[0] ?? null;
  });
  if (!loaded?.telegram_bot_token_enc || !loaded.telegram_bot_token_nonce) return;
  const botToken = decryptFromBuffers(
    loaded.telegram_bot_token_enc,
    loaded.telegram_bot_token_nonce
  );
  await sendCustomerMessage(botToken, chatId, body);
}
