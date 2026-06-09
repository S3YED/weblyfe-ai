-- Instant Appie: bring-your-own-token integrations (Notion + Airtable).
-- The customer pastes their own Notion integration token / Airtable PAT; we
-- validate it server-side and store it encrypted at rest (app-layer secretbox,
-- BYTEA ciphertext + nonce), mirroring the telegram_bot_token_enc / google_*_enc
-- pattern already on this table.
--
-- We also store a non-secret human label (workspace / base name) so the
-- dashboard can show "Connected to <workspace>" without ever decrypting.
-- Additive + idempotent (IF NOT EXISTS) to match the 0001/0002/0003 convention.

-- Notion
ALTER TABLE appies ADD COLUMN IF NOT EXISTS notion_token_enc BYTEA;
ALTER TABLE appies ADD COLUMN IF NOT EXISTS notion_token_nonce BYTEA;
ALTER TABLE appies ADD COLUMN IF NOT EXISTS notion_workspace_label TEXT;
ALTER TABLE appies ADD COLUMN IF NOT EXISTS notion_connected_at TIMESTAMPTZ;

-- Airtable
ALTER TABLE appies ADD COLUMN IF NOT EXISTS airtable_token_enc BYTEA;
ALTER TABLE appies ADD COLUMN IF NOT EXISTS airtable_token_nonce BYTEA;
ALTER TABLE appies ADD COLUMN IF NOT EXISTS airtable_base_label TEXT;
ALTER TABLE appies ADD COLUMN IF NOT EXISTS airtable_connected_at TIMESTAMPTZ;
