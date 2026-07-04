// Postgres connection layer. Uses node-postgres `pg` for compatibility with
// local Docker Postgres + Vercel Postgres / Neon.
// Sets `app.user_id` per-request via SET LOCAL for Postgres RLS policies.

import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool, PoolClient } from 'pg';
import * as schema from './schema';

let pool: Pool | null = null;

function getPool(): Pool {
  if (pool) return pool;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL not set');
  }
  pool = new Pool({
    connectionString: url,
    max: 5,
    ssl: url.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
  });
  return pool;
}

export function getDb(): NodePgDatabase<typeof schema> {
  return drizzle(getPool(), { schema });
}

// Run an operation inside a transaction with `app.user_id` set so RLS
// policies key off it. Per PRD security checklist item 2.
export async function withUserScope<T>(
  userId: string | null,
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    if (userId) {
      // SET LOCAL is rolled back at txn end, so it's request-scoped.
      await client.query("SELECT set_config('app.user_id', $1, true)", [userId]);
    }
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export { schema };
