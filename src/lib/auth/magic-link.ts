// Magic-link mint + verify. Pure functions over a passed-in pg client so they're
// drop-in usable from API routes (with pool client) AND unit tests
// (with a transactional client).

import type { PoolClient } from 'pg';
import { generateMagicLinkToken, MAGIC_LINK_TTL_MS } from './tokens';

export type IssueResult = {
  token: string;
  expiresAt: Date;
};

// Issues a magic link for a user. Atomically invalidates all prior unused tokens
// for the same user (PRD security checklist item 3 / schema comment).
export async function issueMagicLink(
  client: PoolClient,
  userId: string,
  now: Date = new Date()
): Promise<IssueResult> {
  await client.query(
    `UPDATE magic_tokens SET used_at = $1
     WHERE user_id = $2 AND used_at IS NULL`,
    [now, userId]
  );

  const token = generateMagicLinkToken();
  const expiresAt = new Date(now.getTime() + MAGIC_LINK_TTL_MS);

  await client.query(
    `INSERT INTO magic_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)`,
    [token, userId, expiresAt]
  );

  return { token, expiresAt };
}

// Atomic single-use UPDATE-with-RETURNING per PRD section "Magic-link verification".
// Returns userId on success, null if invalid / expired / replayed.
export async function consumeMagicLink(
  client: PoolClient,
  token: string,
  now: Date = new Date()
): Promise<{ userId: string } | null> {
  const res = await client.query<{ user_id: string }>(
    `UPDATE magic_tokens
       SET used_at = $1
     WHERE token = $2
       AND used_at IS NULL
       AND expires_at > $1
     RETURNING user_id`,
    [now, token]
  );
  if (res.rowCount === 0) return null;
  return { userId: res.rows[0].user_id };
}
