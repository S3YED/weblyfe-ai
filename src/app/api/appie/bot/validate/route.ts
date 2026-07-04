// POST /api/appie/bot/validate
// Bring-your-own Telegram bot: the customer pastes THEIR bot token; we call
// Telegram getMe server-side to confirm it works and return the bot @username.
// Nothing is stored here. The raw token never leaves the server and is never
// logged or echoed back.
//
// Request:  { "token": "1234567:ABC..." }
// Response: { "ok": true, "username": "my_appie_bot" }
//           { "ok": false, "error": "malformed"|"invalid-token"|"network" }

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth/session';
import { validateBotToken } from '@/lib/telegram-bot';
import { logInfo } from '@/lib/log';

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

  const result = await validateBotToken(body.token);

  if (!result.ok) {
    // Never log the token. Log only the classification.
    logInfo('telegram.bot.validate.rejected', { userId, error: result.error });
    const status = result.error === 'network' ? 502 : 400;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }

  logInfo('telegram.bot.validate.ok', { userId, username: result.username });
  return NextResponse.json({ ok: true, username: result.username });
}
