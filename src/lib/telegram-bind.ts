// Telegram chat-bind one-time tokens. Mirrors the magic-link pattern:
// pure functions over a passed-in pg client so they're usable from API routes
// (with a pool client) AND unit tests (with a transactional client).

import type { PoolClient } from 'pg';
import { randomBytes } from 'node:crypto';
import { getEnv } from './env';

// Telegram's /start payload is limited to 64 chars, [A-Za-z0-9_-].
// 24 random bytes base64url = 32 chars, well within the limit.
export const BIND_TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24h

export function generateBindToken(): string {
  return randomBytes(24).toString('base64url');
}

export type IssueBindResult = {
  token: string;
  expiresAt: Date;
};

// Issues a bind token for an appie. Atomically invalidates prior unused tokens
// for the same appie so only the latest deep-link is live.
export async function issueBindToken(
  client: PoolClient,
  appieId: string,
  now: Date = new Date()
): Promise<IssueBindResult> {
  await client.query(
    `UPDATE telegram_bind_tokens SET used_at = $1
     WHERE appie_id = $2 AND used_at IS NULL`,
    [now, appieId]
  );

  const token = generateBindToken();
  const expiresAt = new Date(now.getTime() + BIND_TOKEN_TTL_MS);

  await client.query(
    `INSERT INTO telegram_bind_tokens (token, appie_id, expires_at)
     VALUES ($1, $2, $3)`,
    [token, appieId, expiresAt]
  );

  return { token, expiresAt };
}

// Atomic single-use UPDATE-with-RETURNING. Returns appieId on success,
// null if the token is invalid / expired / already used.
export async function consumeBindToken(
  client: PoolClient,
  token: string,
  now: Date = new Date()
): Promise<{ appieId: string } | null> {
  const res = await client.query<{ appie_id: string }>(
    `UPDATE telegram_bind_tokens
       SET used_at = $1
     WHERE token = $2
       AND used_at IS NULL
       AND expires_at > $1
     RETURNING appie_id`,
    [now, token]
  );
  if (res.rowCount === 0 || !res.rows[0].appie_id) return null;
  return { appieId: res.rows[0].appie_id };
}

// Builds the t.me deep-link a customer taps to bind their chat.
// botUsername is stored without the leading @; the link omits it too.
export function buildBindDeepLink(botUsername: string, token: string): string {
  const clean = botUsername.replace(/^@/, '');
  return `https://t.me/${clean}?start=${token}`;
}

// Convenience: the public base URL (for webhook callback documentation).
export function appBaseUrl(): string {
  return getEnv().NEXT_PUBLIC_APP_URL;
}
