// Structured logging with PII redaction.
// Per PRD security checklist item 13: never log JWT_SECRET, Stripe keys,
// Hetzner key, OAuth tokens, or customer email + amount paired together.

const REDACT_KEYS = new Set([
  'jwt_secret',
  'jwtsecret',
  'stripe_secret_key',
  'stripe_secret_key_test',
  'stripe_webhook_secret',
  'stripe_webhook_secret_test',
  'hetzner_api_key',
  'hetznerapikey',
  'telegram_bot_token',
  'telegrambottoken',
  'access_token',
  'refresh_token',
  'authorization',
  'cookie',
  'set-cookie',
  'password',
  'secretbox_key',
  'brevo_api_key',
]);

function redact(value: unknown, depth = 0): unknown {
  if (depth > 5) return '[depth-limit]';
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map((v) => redact(v, depth + 1));
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const lower = k.toLowerCase();
      if (REDACT_KEYS.has(lower) || lower.includes('secret') || lower.includes('token')) {
        out[k] = '[redacted]';
      } else {
        out[k] = redact(v, depth + 1);
      }
    }
    return out;
  }
  return value;
}

export function logInfo(event: string, fields?: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ level: 'info', event, ts: new Date().toISOString(), ...((redact(fields) as object) || {}) }));
}

export function logWarn(event: string, fields?: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.warn(JSON.stringify({ level: 'warn', event, ts: new Date().toISOString(), ...((redact(fields) as object) || {}) }));
}

export function logError(event: string, fields?: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.error(JSON.stringify({ level: 'error', event, ts: new Date().toISOString(), ...((redact(fields) as object) || {}) }));
}

export const __test__ = { redact };
