// Boot-time environment validation. Refuse to boot if critical secrets are missing.
// Per PRD security checklist item 5: JWT_SECRET must be present and >= 32 bytes.

type EnvShape = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  SECRETBOX_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  BREVO_API_KEY?: string;
  BREVO_BETA_LIST_ID?: string;
  TELEGRAM_BOT_TOKEN_POOL?: string;
  GOOGLE_OAUTH_CLIENT_ID?: string;
  GOOGLE_OAUTH_CLIENT_SECRET?: string;
  HETZNER_API_KEY?: string;
  NEXT_PUBLIC_APP_URL: string;
};

let cached: EnvShape | null = null;

export function getEnv(): EnvShape {
  if (cached) return cached;

  const jwtSecret =
    process.env.JWT_SECRET ?? (process.env.NODE_ENV === 'test' ? 'test-jwt-secret-must-be-at-least-32-bytes-long' : '');

  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error(
      'FATAL: JWT_SECRET is missing or under 32 bytes. The app refuses to boot. Set JWT_SECRET in your environment to a value of at least 32 bytes (per PRD security checklist item 5).'
    );
  }

  const secretboxKey =
    process.env.SECRETBOX_KEY ??
    (process.env.NODE_ENV === 'test' ? '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef' : '');

  if (!secretboxKey || secretboxKey.length < 64) {
    // 32 bytes hex-encoded = 64 chars
    throw new Error('FATAL: SECRETBOX_KEY missing or invalid. Must be a 32-byte hex string (64 chars).');
  }

  cached = {
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    JWT_SECRET: jwtSecret,
    SECRETBOX_KEY: secretboxKey,
    STRIPE_SECRET_KEY:
      process.env.STRIPE_SECRET_KEY_TEST ?? process.env.STRIPE_SECRET_KEY ?? '',
    STRIPE_WEBHOOK_SECRET:
      process.env.STRIPE_WEBHOOK_SECRET_TEST ?? process.env.STRIPE_WEBHOOK_SECRET ?? '',
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_BETA_LIST_ID: process.env.BREVO_BETA_LIST_ID,
    TELEGRAM_BOT_TOKEN_POOL: process.env.TELEGRAM_BOT_TOKEN_POOL,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    HETZNER_API_KEY: process.env.HETZNER_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  };

  return cached;
}

export function resetEnvCacheForTests() {
  cached = null;
}
