import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Route handlers for the bring-your-own-bot flow. We mock the auth + DB seams so
// the handler logic (validation, token-never-returned, webhook wiring) is tested
// without a live cookie session or Postgres.

const GOOD_TOKEN = '1234567:AAEhBP0abcdefghijklmnopqrstuvwxyz123';

// ── Mocks ────────────────────────────────────────────────────────────────
const getCurrentUserId = vi.fn();
vi.mock('../../src/lib/auth/session', () => ({
  getCurrentUserId: () => getCurrentUserId(),
}));

// In-memory withUserScope: hand the callback a fake pg client.
const dbQuery = vi.fn();
vi.mock('../../src/lib/db', () => ({
  withUserScope: async (_userId: unknown, fn: (client: unknown) => unknown) =>
    fn({ query: dbQuery }),
}));

// telegram-bind: deterministic token + deep-link, no DB.
vi.mock('../../src/lib/telegram-bind', () => ({
  issueBindToken: async () => ({ token: 'bind_test_token', expiresAt: new Date() }),
  buildBindDeepLink: (username: string, token: string) =>
    `https://t.me/${username}?start=${token}`,
}));

// Import after mocks are registered.
import { POST as validatePOST } from '../../src/app/api/appie/bot/validate/route';
import { POST as connectPOST } from '../../src/app/api/appie/bot/connect/route';

function req(body: unknown): Request {
  return new Request('http://localhost/api/appie/bot/x', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const realFetch = globalThis.fetch;

beforeEach(() => {
  getCurrentUserId.mockReset().mockResolvedValue('user-1');
  dbQuery.mockReset();
});

afterEach(() => {
  globalThis.fetch = realFetch;
  vi.restoreAllMocks();
});

describe('POST /api/appie/bot/validate', () => {
  it('401 when not authenticated', async () => {
    getCurrentUserId.mockResolvedValue(null);
    const res = await validatePOST(req({ token: GOOD_TOKEN }) as never);
    expect(res.status).toBe(401);
  });

  it('400 missing-token', async () => {
    const res = await validatePOST(req({}) as never);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('missing-token');
  });

  it('returns the bot username and NEVER the token', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true, result: { id: 1234567, username: 'my_appie_bot' } }),
    }) as unknown as typeof fetch;
    const res = await validatePOST(req({ token: GOOD_TOKEN }) as never);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json).toEqual({ ok: true, username: 'my_appie_bot' });
    expect(JSON.stringify(json)).not.toContain(GOOD_TOKEN);
  });

  it('400 invalid-token on a bad token', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({}),
    }) as unknown as typeof fetch;
    const res = await validatePOST(req({ token: GOOD_TOKEN }) as never);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('invalid-token');
  });

  it('502 on network error', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('down')) as unknown as typeof fetch;
    const res = await validatePOST(req({ token: GOOD_TOKEN }) as never);
    expect(res.status).toBe(502);
  });
});

describe('POST /api/appie/bot/connect', () => {
  it('401 when not authenticated', async () => {
    getCurrentUserId.mockResolvedValue(null);
    const res = await connectPOST(req({ token: GOOD_TOKEN }) as never);
    expect(res.status).toBe(401);
  });

  it('rejects an invalid token without touching the DB', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({}),
    }) as unknown as typeof fetch;
    const res = await connectPOST(req({ token: GOOD_TOKEN }) as never);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('invalid-token');
    expect(dbQuery).not.toHaveBeenCalled();
  });

  it('validates, sets per-appie webhook, stores encrypted, returns username + deep-link', async () => {
    // getMe ok, then setWebhook ok.
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ ok: true, result: { id: 1234567, username: 'my_appie_bot' } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ ok: true }),
      }) as unknown as typeof fetch;

    // DB flow now: txn1 SELECT existing (none) -> INSERT returns id;
    // then setWebhook; then txn2 issueBindToken (mocked) -> audit insert.
    const appieId = '11111111-1111-4111-8111-111111111111';
    dbQuery
      .mockResolvedValueOnce({ rowCount: 0, rows: [] }) // SELECT existing
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: appieId }] }) // INSERT
      .mockResolvedValueOnce({ rowCount: 1, rows: [] }); // audit_log INSERT

    const res = await connectPOST(req({ token: GOOD_TOKEN }) as never);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.username).toBe('my_appie_bot');
    expect(json.webhookSet).toBe(true);
    expect(json.telegramDeepLink).toBe('https://t.me/my_appie_bot?start=bind_test_token');
    expect(JSON.stringify(json)).not.toContain(GOOD_TOKEN);

    // The webhook URL must carry the appie id (per-tenant isolation).
    const calls = (globalThis.fetch as unknown as { mock: { calls: unknown[][] } }).mock.calls;
    const setWebhookCall = calls.find((c) => /setWebhook/.test(String(c[0])));
    expect(setWebhookCall).toBeTruthy();
    const sentBody = JSON.parse((setWebhookCall![1] as RequestInit).body as string);
    expect(sentBody.url).toContain(`/api/appie/bot/webhook/${appieId}`);

    // The INSERT must carry an encrypted token (Buffer), not the raw string.
    const insertCall = dbQuery.mock.calls.find((c) => /INSERT INTO appies/.test(c[0]));
    expect(insertCall).toBeTruthy();
    const params = insertCall![1] as unknown[];
    for (const p of params) {
      expect(p).not.toBe(GOOD_TOKEN);
    }
    expect(params.some((p) => Buffer.isBuffer(p))).toBe(true);
  });

  it('502 webhook-failed when setWebhook fails', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ ok: true, result: { id: 1, username: 'b' } }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ ok: false }),
      }) as unknown as typeof fetch;

    const appieId = '22222222-2222-4222-8222-222222222222';
    dbQuery
      .mockResolvedValueOnce({ rowCount: 0, rows: [] }) // SELECT existing
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: appieId }] }); // INSERT

    const res = await connectPOST(req({ token: GOOD_TOKEN }) as never);
    expect(res.status).toBe(502);
    expect((await res.json()).error).toBe('webhook-failed');
  });
});
