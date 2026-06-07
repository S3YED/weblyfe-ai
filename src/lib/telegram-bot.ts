// Bring-your-own Telegram bot: validate a customer-supplied token and wire its
// webhook. Pure-ish helpers over `fetch` so routes stay thin and the logic is
// unit-testable by injecting a fetch implementation.
//
// SECURITY: the raw bot token is a secret. It is never logged, never echoed in
// an error message, and never returned to the client. Only the bot @username
// (public) is surfaced.

export type FetchLike = typeof fetch;

// Telegram bot tokens look like "<botId>:<35-char secret>". We validate the
// SHAPE locally (cheap, no network) before ever calling Telegram, so obviously
// malformed input fails fast without a round-trip.
const TOKEN_SHAPE = /^\d{6,}:[A-Za-z0-9_-]{30,}$/;

export function isWellFormedToken(token: string): boolean {
  return TOKEN_SHAPE.test(token.trim());
}

export type ValidateOk = {
  ok: true;
  username: string;
  botId: number;
};

export type ValidateErr = {
  ok: false;
  // Machine-readable so the UI can branch + localise. Never contains the token.
  error: 'malformed' | 'invalid-token' | 'network';
};

export type ValidateResult = ValidateOk | ValidateErr;

// Call Telegram getMe with the supplied token. Returns the bot @username on
// success. Distinguishes a bad token (Telegram 401/404) from a transport error
// so the UI can give the customer an accurate message.
export async function validateBotToken(
  token: string,
  fetchImpl: FetchLike = fetch
): Promise<ValidateResult> {
  const clean = token.trim();
  if (!isWellFormedToken(clean)) {
    return { ok: false, error: 'malformed' };
  }

  let res: Response;
  try {
    res = await fetchImpl(`https://api.telegram.org/bot${clean}/getMe`, {
      method: 'GET',
    });
  } catch {
    return { ok: false, error: 'network' };
  }

  if (!res.ok) {
    // 401/404 => bad token. Any other non-2xx we treat as invalid too, since a
    // valid token always yields 200 from getMe.
    return { ok: false, error: 'invalid-token' };
  }

  let body: {
    ok?: boolean;
    result?: { id?: number; username?: string };
  };
  try {
    body = (await res.json()) as typeof body;
  } catch {
    return { ok: false, error: 'network' };
  }

  if (!body.ok || !body.result?.username || typeof body.result.id !== 'number') {
    return { ok: false, error: 'invalid-token' };
  }

  return {
    ok: true,
    username: body.result.username.replace(/^@/, ''),
    botId: body.result.id,
  };
}

export type SetWebhookResult =
  | { ok: true }
  | { ok: false; error: 'failed' | 'network' };

// Point the customer's bot at our register-chat endpoint so the /start deep-link
// binds their chat. Idempotent on Telegram's side (setWebhook overwrites).
export async function setWebhook(
  token: string,
  webhookUrl: string,
  fetchImpl: FetchLike = fetch
): Promise<SetWebhookResult> {
  let res: Response;
  try {
    res = await fetchImpl(
      `https://api.telegram.org/bot${token.trim()}/setWebhook`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ['message'],
        }),
      }
    );
  } catch {
    return { ok: false, error: 'network' };
  }

  if (!res.ok) return { ok: false, error: 'failed' };

  let body: { ok?: boolean };
  try {
    body = (await res.json()) as typeof body;
  } catch {
    return { ok: false, error: 'network' };
  }
  if (!body.ok) return { ok: false, error: 'failed' };
  return { ok: true };
}

// Build the webhook URL for a given app base URL. Single source of truth so the
// route and any future caller agree on the path.
export function buildRegisterChatWebhookUrl(appUrl: string): string {
  return `${appUrl.replace(/\/$/, '')}/api/appie/register-chat`;
}
