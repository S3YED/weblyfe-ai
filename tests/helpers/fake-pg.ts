// Minimal in-memory pg-compatible client for unit tests.
// Implements ONLY the SQL shapes used in src/lib/auth/magic-link.ts and the
// stripe-webhook idempotency path.

import type { PoolClient } from 'pg';

type Row = Record<string, unknown>;

export type FakeStore = {
  users: Map<string, { id: string; email: string }>;
  magic_tokens: Map<string, { token: string; user_id: string; expires_at: Date; used_at: Date | null }>;
  webhook_events: Map<string, { stripe_event_id: string; processed_at: Date }>;
};

export function makeFakeStore(): FakeStore {
  return {
    users: new Map(),
    magic_tokens: new Map(),
    webhook_events: new Map(),
  };
}

export function makeFakeClient(store: FakeStore): PoolClient {
  // We only implement the .query method shape used. Cast at the end.
  const client = {
    async query(text: string, params: unknown[] = []): Promise<{ rows: Row[]; rowCount: number }> {
      const sql = text.replace(/\s+/g, ' ').trim();

      // INSERT INTO webhook_events ON CONFLICT DO NOTHING
      if (sql.startsWith('INSERT INTO webhook_events')) {
        const id = String(params[0]);
        if (store.webhook_events.has(id)) return { rows: [], rowCount: 0 };
        store.webhook_events.set(id, { stripe_event_id: id, processed_at: new Date() });
        return { rows: [], rowCount: 1 };
      }

      // UPDATE magic_tokens SET used_at = $1 WHERE user_id = $2 AND used_at IS NULL
      if (
        sql.startsWith('UPDATE magic_tokens SET used_at = $1 WHERE user_id = $2')
      ) {
        const ts = params[0] as Date;
        const userId = String(params[1]);
        let n = 0;
        for (const row of store.magic_tokens.values()) {
          if (row.user_id === userId && row.used_at === null) {
            row.used_at = ts;
            n++;
          }
        }
        return { rows: [], rowCount: n };
      }

      // INSERT INTO magic_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)
      if (sql.startsWith('INSERT INTO magic_tokens')) {
        const token = String(params[0]);
        const user_id = String(params[1]);
        const expires_at = params[2] as Date;
        store.magic_tokens.set(token, { token, user_id, expires_at, used_at: null });
        return { rows: [], rowCount: 1 };
      }

      // UPDATE magic_tokens SET used_at = $1 WHERE token = $2 AND used_at IS NULL AND expires_at > $1 RETURNING user_id
      if (
        sql.startsWith('UPDATE magic_tokens SET used_at = $1 WHERE token = $2')
      ) {
        const now = params[0] as Date;
        const token = String(params[1]);
        const row = store.magic_tokens.get(token);
        if (!row) return { rows: [], rowCount: 0 };
        if (row.used_at !== null) return { rows: [], rowCount: 0 };
        if (row.expires_at.getTime() <= now.getTime()) return { rows: [], rowCount: 0 };
        row.used_at = now;
        return { rows: [{ user_id: row.user_id }], rowCount: 1 };
      }

      throw new Error(`fake-pg: unhandled SQL: ${sql}`);
    },
    release: () => {},
  };

  return client as unknown as PoolClient;
}
