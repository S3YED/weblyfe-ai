-- Instant Appie BETA: initial schema.
-- Mirrors PRD section "Database schema (minimum)" verbatim, plus:
-- - provision_step / provision_percent / provision_started_at on appies (status polling)
-- - google_access_token_enc + nonce, google_refresh_token_enc + nonce on appies (OAuth at rest)
-- - dev_pings table (mock Telegram first-ping log in dev/preview)
-- Per PRD security checklist: Row-Level Security ON for users / subscriptions / appies / magic_tokens / sessions.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL,
  tier TEXT NOT NULL,
  beta_locked_pricing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS appies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  hetzner_server_id TEXT,
  hetzner_ip INET,
  telegram_bot_token_enc BYTEA,
  telegram_bot_token_nonce BYTEA,
  telegram_bot_username TEXT,
  ssh_pubkey TEXT,
  onboarding_state JSONB,
  status TEXT,
  provision_step TEXT,
  provision_percent TEXT,
  provision_started_at TIMESTAMPTZ,
  google_access_token_enc BYTEA,
  google_access_token_nonce BYTEA,
  google_refresh_token_enc BYTEA,
  google_refresh_token_nonce BYTEA,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS magic_tokens (
  token TEXT PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_magic_tokens_user_active
  ON magic_tokens(user_id) WHERE used_at IS NULL;

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  event TEXT NOT NULL,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS webhook_events (
  stripe_event_id TEXT PRIMARY KEY,
  processed_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS dev_pings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appie_id UUID,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Row-Level Security: enabled on every customer-data table.
-- App must `SELECT set_config('app.user_id', $1, true)` per request inside a txn.

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE appies ENABLE ROW LEVEL SECURITY;
ALTER TABLE magic_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- A NULL app.user_id means "service role" (webhook, cron, migrations); allow.
  -- Otherwise rows must match.
  CREATE POLICY users_isolation ON users
    USING (current_setting('app.user_id', true) IS NULL
           OR current_setting('app.user_id', true) = ''
           OR id::text = current_setting('app.user_id', true));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY subscriptions_isolation ON subscriptions
    USING (current_setting('app.user_id', true) IS NULL
           OR current_setting('app.user_id', true) = ''
           OR user_id::text = current_setting('app.user_id', true));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY appies_isolation ON appies
    USING (current_setting('app.user_id', true) IS NULL
           OR current_setting('app.user_id', true) = ''
           OR user_id::text = current_setting('app.user_id', true));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY magic_tokens_isolation ON magic_tokens
    USING (current_setting('app.user_id', true) IS NULL
           OR current_setting('app.user_id', true) = ''
           OR user_id::text = current_setting('app.user_id', true));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY sessions_isolation ON sessions
    USING (current_setting('app.user_id', true) IS NULL
           OR current_setting('app.user_id', true) = ''
           OR user_id::text = current_setting('app.user_id', true));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  -- Audit log is append-only: SELECT allowed scoped to user, but no UPDATE/DELETE policy.
  CREATE POLICY audit_log_select ON audit_log FOR SELECT
    USING (current_setting('app.user_id', true) IS NULL
           OR current_setting('app.user_id', true) = ''
           OR user_id::text = current_setting('app.user_id', true));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY audit_log_insert ON audit_log FOR INSERT
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
