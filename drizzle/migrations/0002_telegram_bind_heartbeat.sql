-- Instant Appie: Telegram chat binding + heartbeat.
-- Adds:
--   - appies.telegram_chat_id  (customer chat bound via t.me deep-link /start flow)
--   - appies.heartbeat_secret  (per-appie shared secret, set at provision time)
--   - appies.last_heartbeat_at (last time the box phoned home)
--   - telegram_bind_tokens     (one-time tokens for the /start bind flow)
-- Idempotent (IF NOT EXISTS / DO blocks) to match the 0001 convention.

ALTER TABLE appies ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE appies ADD COLUMN IF NOT EXISTS heartbeat_secret TEXT;
ALTER TABLE appies ADD COLUMN IF NOT EXISTS last_heartbeat_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS telegram_bind_tokens (
  token TEXT PRIMARY KEY,
  appie_id UUID REFERENCES appies(id),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_telegram_bind_tokens_appie_active
  ON telegram_bind_tokens(appie_id) WHERE used_at IS NULL;

-- Row-Level Security: bind tokens are consumed by the public bot webhook
-- (service role, app.user_id NULL) and minted by the owning user's request.
ALTER TABLE telegram_bind_tokens ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  -- A NULL/empty app.user_id means "service role" (bot webhook, migrations); allow.
  -- Otherwise rows must belong to an appie owned by the current user.
  CREATE POLICY telegram_bind_tokens_isolation ON telegram_bind_tokens
    USING (current_setting('app.user_id', true) IS NULL
           OR current_setting('app.user_id', true) = ''
           OR appie_id IN (
             SELECT id FROM appies
             WHERE user_id::text = current_setting('app.user_id', true)
           ));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
