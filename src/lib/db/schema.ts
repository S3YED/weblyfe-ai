// Drizzle schema mapping the PRD section "Database schema (minimum)" verbatim.

import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  jsonb,
  inet,
  customType,
} from 'drizzle-orm/pg-core';

const bytea = customType<{ data: Buffer; default: false }>({
  dataType() {
    return 'bytea';
  },
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  status: text('status').notNull(),
  tier: text('tier').notNull(),
  betaLockedPricing: boolean('beta_locked_pricing').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const appies = pgTable('appies', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  hetznerServerId: text('hetzner_server_id'),
  hetznerIp: inet('hetzner_ip'),
  telegramBotTokenEnc: bytea('telegram_bot_token_enc'),
  telegramBotTokenNonce: bytea('telegram_bot_token_nonce'),
  telegramBotUsername: text('telegram_bot_username'),
  // Customer's Telegram chat id, bound via the t.me deep-link /start flow.
  telegramChatId: text('telegram_chat_id'),
  sshPubkey: text('ssh_pubkey'),
  onboardingState: jsonb('onboarding_state'),
  status: text('status'),
  // Provisioning state for status polling
  provisionStep: text('provision_step'),
  provisionPercent: text('provision_percent'),
  provisionStartedAt: timestamp('provision_started_at', { withTimezone: true }),
  // Heartbeat: per-appie shared secret + last seen, set at provision time.
  heartbeatSecret: text('heartbeat_secret'),
  lastHeartbeatAt: timestamp('last_heartbeat_at', { withTimezone: true }),
  // Provisioning provider chosen at provision time + opaque provider-side id.
  provider: text('provider'),
  providerId: text('provider_id'),
  // Google Calendar OAuth tokens (encrypted)
  googleAccessTokenEnc: bytea('google_access_token_enc'),
  googleAccessTokenNonce: bytea('google_access_token_nonce'),
  googleRefreshTokenEnc: bytea('google_refresh_token_enc'),
  googleRefreshTokenNonce: bytea('google_refresh_token_nonce'),
  // Bring-your-own-token integrations (encrypted at rest). Non-secret label
  // (workspace / base name) stored alongside for display without decrypting.
  notionTokenEnc: bytea('notion_token_enc'),
  notionTokenNonce: bytea('notion_token_nonce'),
  notionWorkspaceLabel: text('notion_workspace_label'),
  notionConnectedAt: timestamp('notion_connected_at', { withTimezone: true }),
  airtableTokenEnc: bytea('airtable_token_enc'),
  airtableTokenNonce: bytea('airtable_token_nonce'),
  airtableBaseLabel: text('airtable_base_label'),
  airtableConnectedAt: timestamp('airtable_connected_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const magicTokens = pgTable('magic_tokens', {
  token: text('token').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  usedAt: timestamp('used_at', { withTimezone: true }),
});

// One-time tokens for binding a customer's Telegram chat to their appie.
// The customer opens t.me/<bot>?start=<token>; the bot relays /start to
// POST /api/appie/register-chat which validates + consumes the token.
export const telegramBindTokens = pgTable('telegram_bind_tokens', {
  token: text('token').primaryKey(),
  appieId: uuid('appie_id').references(() => appies.id),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  usedAt: timestamp('used_at', { withTimezone: true }),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id'),
  event: text('event').notNull(),
  payload: jsonb('payload'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const webhookEvents = pgTable('webhook_events', {
  stripeEventId: text('stripe_event_id').primaryKey(),
  processedAt: timestamp('processed_at', { withTimezone: true }).defaultNow().notNull(),
});

// dev-only: in mock mode we record outgoing pings here for inspection
export const devPings = pgTable('dev_pings', {
  id: uuid('id').primaryKey().defaultRandom(),
  appieId: uuid('appie_id'),
  body: text('body').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
