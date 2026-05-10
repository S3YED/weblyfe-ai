import { test, expect, request } from '@playwright/test';

test('expired magic link returns 410 Gone with Referrer-Policy: no-referrer', async ({ baseURL }) => {
  const ctx = await request.newContext({ baseURL });
  await ctx.post('/appie/api/test-only', { data: { op: 'reset' } });
  const mintRes = await ctx.post('/appie/api/test-only', {
    data: { op: 'expire-token' },
  });
  const { token } = await mintRes.json();

  const res = await ctx.get(`/appie/auth/verify?token=${token}`, { maxRedirects: 0 });
  expect(res.status()).toBe(410);
  expect(res.headers()['referrer-policy']).toBe('no-referrer');
});

test('missing token returns 410 Gone', async ({ baseURL }) => {
  const ctx = await request.newContext({ baseURL });
  const res = await ctx.get('/appie/auth/verify', { maxRedirects: 0 });
  expect(res.status()).toBe(410);
});
