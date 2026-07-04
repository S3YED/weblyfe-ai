import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Route handlers for the bring-your-own-token integrations flow. Auth + DB seams
// are mocked so the handler logic (validation, token-never-returned, encrypted
// storage) is tested without a live session or Postgres.

const NOTION_TOKEN = 'secret_abcdefghijklmnopqrstuvwxyz0123456789ABCD';
const AIRTABLE_PAT = 'patABCDEFG1234567.890abcdefghijklmnopqrstuvwxyz';

const getCurrentUserId = vi.fn();
vi.mock('../../src/lib/auth/session', () => ({
  getCurrentUserId: () => getCurrentUserId(),
}));

const dbQuery = vi.fn();
vi.mock('../../src/lib/db', () => ({
  withUserScope: async (_userId: unknown, fn: (client: unknown) => unknown) =>
    fn({ query: dbQuery }),
}));

import { POST as validatePOST } from '../../src/app/api/appie/integrations/[provider]/validate/route';
import { POST as connectPOST } from '../../src/app/api/appie/integrations/[provider]/connect/route';
import { POST as disconnectPOST } from '../../src/app/api/appie/integrations/[provider]/disconnect/route';

function req(body?: unknown): Request {
  return new Request('http://localhost/api/appie/integrations/x', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function ctx(provider: string) {
  return { params: Promise.resolve({ provider }) };
}

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as unknown as Response;
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

describe('validate route', () => {
  it('404 unknown provider', async () => {
    const res = await validatePOST(req({ token: NOTION_TOKEN }) as never, ctx('dropbox'));
    expect(res.status).toBe(404);
  });

  it('401 when unauthenticated', async () => {
    getCurrentUserId.mockResolvedValue(null);
    const res = await validatePOST(req({ token: NOTION_TOKEN }) as never, ctx('notion'));
    expect(res.status).toBe(401);
  });

  it('400 missing-token', async () => {
    const res = await validatePOST(req({}) as never, ctx('notion'));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('missing-token');
  });

  it('notion: returns label, never the token', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(
        jsonResponse(200, { object: 'user', bot: { workspace_name: 'Acme' } })
      ) as unknown as typeof fetch;
    const res = await validatePOST(req({ token: NOTION_TOKEN }) as never, ctx('notion'));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.label).toBe('Acme');
    expect(JSON.stringify(json)).not.toContain(NOTION_TOKEN);
  });
});

describe('connect route', () => {
  it('rejects invalid token without touching the DB', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(jsonResponse(401, {})) as unknown as typeof fetch;
    const res = await connectPOST(req({ token: NOTION_TOKEN }) as never, ctx('notion'));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('invalid-token');
    expect(dbQuery).not.toHaveBeenCalled();
  });

  it('notion: stores an ENCRYPTED token (Buffer), not the raw string', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValue(
        jsonResponse(200, { object: 'user', bot: { workspace_name: 'Acme' } })
      ) as unknown as typeof fetch;
    dbQuery
      .mockResolvedValueOnce({ rowCount: 0, rows: [] }) // SELECT existing
      .mockResolvedValueOnce({ rowCount: 1, rows: [] }) // INSERT
      .mockResolvedValueOnce({ rowCount: 1, rows: [] }); // audit

    const res = await connectPOST(req({ token: NOTION_TOKEN }) as never, ctx('notion'));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.label).toBe('Acme');
    expect(JSON.stringify(json)).not.toContain(NOTION_TOKEN);

    const insertCall = dbQuery.mock.calls.find((c) => /INSERT INTO appies/.test(c[0]));
    expect(insertCall).toBeTruthy();
    const params = insertCall![1] as unknown[];
    for (const p of params) expect(p).not.toBe(NOTION_TOKEN);
    expect(params.some((p) => Buffer.isBuffer(p))).toBe(true);
    // The insert targets the notion columns.
    expect(insertCall![0]).toContain('notion_token_enc');
  });

  it('airtable: updates existing row with airtable columns', async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(200, { id: 'u' })) // whoami
      .mockResolvedValueOnce(
        jsonResponse(200, { bases: [{ name: 'CRM' }] })
      ) as unknown as typeof fetch; // bases
    dbQuery
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 'appie-1' }] }) // SELECT existing
      .mockResolvedValueOnce({ rowCount: 1, rows: [] }) // UPDATE
      .mockResolvedValueOnce({ rowCount: 1, rows: [] }); // audit

    const res = await connectPOST(req({ token: AIRTABLE_PAT }) as never, ctx('airtable'));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.label).toBe('CRM');
    const updateCall = dbQuery.mock.calls.find((c) => /UPDATE appies/.test(c[0]));
    expect(updateCall![0]).toContain('airtable_token_enc');
  });
});

describe('disconnect route', () => {
  it('404 unknown provider', async () => {
    const res = await disconnectPOST(req() as never, ctx('dropbox'));
    expect(res.status).toBe(404);
  });

  it('nulls the provider columns + audits', async () => {
    dbQuery
      .mockResolvedValueOnce({ rowCount: 1, rows: [] }) // UPDATE
      .mockResolvedValueOnce({ rowCount: 1, rows: [] }); // audit
    const res = await disconnectPOST(req() as never, ctx('notion'));
    expect(res.status).toBe(200);
    const updateCall = dbQuery.mock.calls.find((c) => /UPDATE appies/.test(c[0]));
    expect(updateCall![0]).toContain('notion_token_enc = NULL');
  });
});
