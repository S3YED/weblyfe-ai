import { test, expect, request } from '@playwright/test';

test('replay attempt on a single-use magic link returns 410 Gone', async ({ baseURL }) => {
  const ctx = await request.newContext({ baseURL });
  await ctx.post('/appie/api/test-only', { data: { op: 'reset' } });
  const mintRes = await ctx.post('/appie/api/test-only', { data: { op: 'mint-token' } });
  const { token } = await mintRes.json();

  // First use: 303 with Set-Cookie + Referrer-Policy.
  const first = await ctx.get(`/appie/auth/verify?token=${token}`, { maxRedirects: 0 });
  expect(first.status()).toBe(303);
  expect(first.headers()['referrer-policy']).toBe('no-referrer');
  expect(first.headers()['set-cookie']).toBeTruthy();
  expect(first.headers()['location']).toMatch(/\/appie\/(setup|dashboard|setup\/provisioning)/);

  // Second use: 410.
  const second = await ctx.get(`/appie/auth/verify?token=${token}`, { maxRedirects: 0 });
  expect(second.status()).toBe(410);
});
