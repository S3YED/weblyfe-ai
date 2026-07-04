// POST /api/appie/register-chat
// Binds a customer's Telegram chat to their appie via a one-time token.
//
// Called two ways:
//  1. By the customer's bot webhook, with a raw Telegram update for a
//     "/start <token>" message:
//       { "message": { "chat": { "id": 123 }, "text": "/start <token>" } }
//  2. Directly (tests / manual), with { "token": "...", "chat_id": "123" }.
//
// On success: stores telegram_chat_id on the appie, marks the bind token used.
// Public route (no session): the caller proves authority via the one-time token.
// Runs as service role (app.user_id NULL) so RLS lets it read across users.

import { NextRequest, NextResponse } from 'next/server';
import { withUserScope } from '@/lib/db';
import { consumeBindToken } from '@/lib/telegram-bind';
import { logInfo, logWarn } from '@/lib/log';
import { __testStore__, isE2eMode } from '@/lib/test-store';

export const runtime = 'nodejs';

type DirectBody = { token?: string; chat_id?: string | number };
type TelegramUpdate = {
  message?: { chat?: { id?: number | string }; text?: string };
};

// Pull (token, chatId) out of either a direct body or a Telegram update.
function extract(body: DirectBody & TelegramUpdate): {
  token: string | null;
  chatId: string | null;
} {
  // Direct form takes priority when present.
  if (body.token) {
    return {
      token: body.token,
      chatId: body.chat_id != null ? String(body.chat_id) : null,
    };
  }
  const text = body.message?.text ?? '';
  const chatRaw = body.message?.chat?.id;
  const chatId = chatRaw != null ? String(chatRaw) : null;
  // Telegram deep-link delivers "/start <payload>".
  const m = text.match(/^\/start(?:@\w+)?\s+(\S+)/);
  return { token: m ? m[1] : null, chatId };
}

export async function POST(req: NextRequest) {
  let raw: DirectBody & TelegramUpdate;
  try {
    raw = (await req.json()) as DirectBody & TelegramUpdate;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  const { token, chatId } = extract(raw);
  if (!token) {
    return NextResponse.json({ ok: false, error: 'missing-token' }, { status: 400 });
  }
  if (!chatId) {
    return NextResponse.json({ ok: false, error: 'missing-chat-id' }, { status: 400 });
  }

  if (isE2eMode()) {
    const now = new Date();
    for (const appie of __testStore__.appies.values()) {
      if (appie.bindToken === token) {
        appie.bindToken = null; // consume
        appie.telegramChatId = chatId;
        logInfo('telegram.register-chat.bound.e2e', { hasChatId: true });
        return NextResponse.json({ ok: true });
      }
    }
    void now;
    return NextResponse.json({ ok: false, error: 'invalid-token' }, { status: 400 });
  }

  try {
    const bound = await withUserScope(null, async (client) => {
      const consumed = await consumeBindToken(client, token);
      if (!consumed) return false;
      await client.query(`UPDATE appies SET telegram_chat_id = $2 WHERE id = $1`, [
        consumed.appieId,
        chatId,
      ]);
      await client.query(
        `INSERT INTO audit_log (user_id, event, payload)
         SELECT user_id, 'telegram.chat-bound', $2 FROM appies WHERE id = $1`,
        [consumed.appieId, JSON.stringify({ appie_id: consumed.appieId })]
      );
      return true;
    });

    if (!bound) {
      return NextResponse.json({ ok: false, error: 'invalid-token' }, { status: 400 });
    }
    logInfo('telegram.register-chat.bound', { hasChatId: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    logWarn('telegram.register-chat.error', { error: String(err) });
    return NextResponse.json({ ok: false, error: 'internal' }, { status: 500 });
  }
}
