-- Instant Appie: record which provisioner built each box.
-- Adds:
--   - appies.provider     ('orgo' | 'hetzner') — chosen at provision time
--   - appies.provider_id  (opaque provider-side id: Orgo computer id / Hetzner server id)
-- Additive + idempotent (IF NOT EXISTS) to match the 0001/0002 convention.

ALTER TABLE appies ADD COLUMN IF NOT EXISTS provider TEXT;
ALTER TABLE appies ADD COLUMN IF NOT EXISTS provider_id TEXT;
