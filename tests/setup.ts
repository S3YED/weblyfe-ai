// Vitest setup: bootstrap test env vars before any module reads process.env.
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-jwt-secret-must-be-at-least-32-bytes-long';
process.env.SECRETBOX_KEY = process.env.SECRETBOX_KEY ?? '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
process.env.NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
process.env.STRIPE_SECRET_KEY_TEST = process.env.STRIPE_SECRET_KEY_TEST ?? 'sk_test_dummy';
process.env.STRIPE_WEBHOOK_SECRET_TEST = process.env.STRIPE_WEBHOOK_SECRET_TEST ?? 'whsec_test_dummy';
