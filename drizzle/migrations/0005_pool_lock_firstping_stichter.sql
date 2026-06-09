-- Instant Appie beta hardening (PRD v1.1 review findings G16/G17/G19).
-- Additive + idempotent (IF NOT EXISTS) to match the 0001-0004 convention.
--
-- G16 — pool exclusivity: prevent the same Telegram bot from being leased to two
--   tenants under concurrent provisioning. A partial UNIQUE index on
--   telegram_bot_username is the DB-level guard; provisionReal catches the
--   unique-violation and retries with the next free pool bot (app-layer wiring).
--
-- G17 — first-ping idempotency: a timestamp so sendFirstPing fires exactly once
--   even under concurrent heartbeat + status-poll (READ COMMITTED TOCTOU). The
--   send is gated on this being NULL and set atomically in the same UPDATE.
--
-- G19 — Stichter number: a monotonic beta-cohort number assigned at
--   subscription.created time (app layer calls nextval on the locked product
--   only, so dupes/test rows don't burn numbers).

-- G16
CREATE UNIQUE INDEX IF NOT EXISTS idx_appies_bot_username_unique
  ON appies (telegram_bot_username)
  WHERE telegram_bot_username IS NOT NULL;

-- G17
ALTER TABLE appies ADD COLUMN IF NOT EXISTS first_ping_sent_at TIMESTAMPTZ;

-- G19
CREATE SEQUENCE IF NOT EXISTS stichter_seq START 1;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS stichter_number INTEGER;
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_stichter_unique
  ON subscriptions (stichter_number)
  WHERE stichter_number IS NOT NULL;
