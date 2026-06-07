// Lease a Telegram bot from the pre-made BotFather pool, one per customer.
//
// TELEGRAM_BOT_TOKEN_POOL is a comma-separated list. Each entry is either:
//   - "username:1234567:ABC..."  (username + token; username used for deep-link)
//   - "1234567:ABC..."           (token only; username derived from bot id)
//
// Leasing is "claim the first token not already assigned to an appie". The
// caller passes the set of already-leased tokens (from existing appie rows) so
// we never hand the same bot to two tenants.

import { ProvisionerError } from './types';

export type LeasedBot = {
  readonly token: string;
  readonly username: string;
};

function parseEntry(entry: string): LeasedBot | null {
  const trimmed = entry.trim();
  if (!trimmed) return null;
  // Token shape is "<botId>:<secret>". A leading "username:" prefix is optional.
  // Detect by counting colon-separated parts: 2 = token only, 3 = username+token.
  const parts = trimmed.split(':');
  if (parts.length === 3) {
    const [username, botId, secret] = parts;
    return { token: `${botId}:${secret}`, username: username.replace(/^@/, '') };
  }
  if (parts.length === 2) {
    const [botId] = parts;
    return { token: trimmed, username: `appie_${botId}_bot` };
  }
  return null;
}

export function parsePool(raw: string | undefined): LeasedBot[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map(parseEntry)
    .filter((b): b is LeasedBot => b !== null);
}

// Pick the first pool bot whose token isn't already leased. Throws a typed
// ProvisionerError when the pool is empty/exhausted so callers can decide.
export function leaseBot(
  poolRaw: string | undefined,
  alreadyLeasedTokens: ReadonlySet<string>
): LeasedBot {
  const pool = parsePool(poolRaw);
  if (pool.length === 0) {
    throw new ProvisionerError(
      'hetzner',
      'not-configured',
      'TELEGRAM_BOT_TOKEN_POOL is empty; cannot lease a customer bot'
    );
  }
  const free = pool.find((b) => !alreadyLeasedTokens.has(b.token));
  if (!free) {
    throw new ProvisionerError(
      'hetzner',
      'not-configured',
      'TELEGRAM_BOT_TOKEN_POOL exhausted; all bots already leased'
    );
  }
  return free;
}
