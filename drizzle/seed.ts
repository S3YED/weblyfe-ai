// Seed one test user + subscription + appie row for local dev.
// Use: DATABASE_URL=... npm run db:seed

import { Pool } from 'pg';

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }
  const pool = new Pool({ connectionString: url });

  const email = 'seyed+seed@weblyfe.nl';
  const userRes = await pool.query(
    `INSERT INTO users (email) VALUES ($1)
     ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
     RETURNING id`,
    [email]
  );
  const userId = userRes.rows[0].id as string;

  await pool.query(
    `INSERT INTO subscriptions (user_id, stripe_subscription_id, status, tier, beta_locked_pricing)
     VALUES ($1, $2, 'active', 'instant_appie_beta_250_locked', TRUE)
     ON CONFLICT (stripe_subscription_id) DO NOTHING`,
    [userId, 'sub_seed_dev_only']
  );

  await pool.query(
    `INSERT INTO appies (user_id, status, onboarding_state)
     VALUES ($1, 'pending_setup', '{}'::jsonb)
     ON CONFLICT DO NOTHING`,
    [userId]
  );

  console.log(`[seed] dev user ready: ${email} (id=${userId})`);
  await pool.end();
}

main().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
