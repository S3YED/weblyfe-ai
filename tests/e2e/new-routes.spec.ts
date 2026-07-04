import { test, expect, request } from '@playwright/test';

test('/appie/auth/login returns 200 and renders a magic-link form', async ({ baseURL }) => {
  const ctx = await request.newContext({ baseURL });
  const res = await ctx.get('/appie/auth/login');
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain('login-email');
});

test('/appie/welcome returns 200 and renders the bedankt hero', async ({ baseURL }) => {
  const ctx = await request.newContext({ baseURL });
  const res = await ctx.get('/appie/welcome');
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body.toLowerCase()).toContain('bedankt');
});
