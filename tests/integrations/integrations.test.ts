import { describe, it, expect, vi } from 'vitest';
import {
  isWellFormedNotionToken,
  isWellFormedAirtablePat,
  validateNotionToken,
  validateAirtablePat,
  validateIntegrationToken,
} from '../../src/lib/integrations';

const NOTION_TOKEN = 'secret_abcdefghijklmnopqrstuvwxyz0123456789ABCD';
const NTN_TOKEN = 'ntn_abcdefghijklmnopqrstuvwxyz0123456789ABCD';
const AIRTABLE_PAT = 'patABCDEFG1234567.890abcdefghijklmnopqrstuvwxyz';

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as unknown as Response;
}

describe('token shape guards', () => {
  it('accepts secret_ and ntn_ Notion tokens', () => {
    expect(isWellFormedNotionToken(NOTION_TOKEN)).toBe(true);
    expect(isWellFormedNotionToken(NTN_TOKEN)).toBe(true);
  });
  it('rejects short / empty Notion tokens', () => {
    expect(isWellFormedNotionToken('')).toBe(false);
    expect(isWellFormedNotionToken('secret_x')).toBe(false);
  });
  it('accepts pat-prefixed Airtable PATs', () => {
    expect(isWellFormedAirtablePat(AIRTABLE_PAT)).toBe(true);
  });
  it('rejects non-pat Airtable tokens', () => {
    expect(isWellFormedAirtablePat('keyABCDEF1234567')).toBe(false);
    expect(isWellFormedAirtablePat('')).toBe(false);
  });
});

describe('validateNotionToken', () => {
  it('malformed without a network call', async () => {
    const fetchImpl = vi.fn();
    const res = await validateNotionToken('nope', fetchImpl as unknown as typeof fetch);
    expect(res).toEqual({ ok: false, error: 'malformed' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('returns the workspace label on success and sends the right headers', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse(200, {
        object: 'user',
        bot: { workspace_name: 'Acme HQ' },
      })
    );
    const res = await validateNotionToken(NOTION_TOKEN, fetchImpl as unknown as typeof fetch);
    expect(res).toEqual({ ok: true, label: 'Acme HQ' });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://api.notion.com/v1/users/me');
    expect((init as RequestInit).headers).toMatchObject({
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
    });
  });

  it('invalid-token on 401', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(401, {}));
    const res = await validateNotionToken(NOTION_TOKEN, fetchImpl as unknown as typeof fetch);
    expect(res).toEqual({ ok: false, error: 'invalid-token' });
  });

  it('network on fetch throw', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('down'));
    const res = await validateNotionToken(NOTION_TOKEN, fetchImpl as unknown as typeof fetch);
    expect(res).toEqual({ ok: false, error: 'network' });
  });
});

describe('validateAirtablePat', () => {
  it('malformed without a network call', async () => {
    const fetchImpl = vi.fn();
    const res = await validateAirtablePat('nope', fetchImpl as unknown as typeof fetch);
    expect(res).toEqual({ ok: false, error: 'malformed' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('whoami ok + single base -> base name label', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(200, { id: 'usr123' }))
      .mockResolvedValueOnce(jsonResponse(200, { bases: [{ id: 'app1', name: 'CRM' }] }));
    const res = await validateAirtablePat(AIRTABLE_PAT, fetchImpl as unknown as typeof fetch);
    expect(res).toEqual({ ok: true, label: 'CRM', detail: undefined });
  });

  it('whoami ok + multiple bases -> count label + detail', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(200, { id: 'usr123' }))
      .mockResolvedValueOnce(
        jsonResponse(200, { bases: [{ name: 'CRM' }, { name: 'Leads' }] })
      );
    const res = await validateAirtablePat(AIRTABLE_PAT, fetchImpl as unknown as typeof fetch);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.label).toBe('2 bases');
      expect(res.detail).toBe('CRM, Leads');
    }
  });

  it('whoami ok but bases 403 -> still connected, generic label', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(200, { id: 'usr123' }))
      .mockResolvedValueOnce(jsonResponse(403, {}));
    const res = await validateAirtablePat(AIRTABLE_PAT, fetchImpl as unknown as typeof fetch);
    expect(res).toEqual({ ok: true, label: 'Airtable account', detail: undefined });
  });

  it('invalid-token when whoami 401', async () => {
    const fetchImpl = vi.fn().mockResolvedValueOnce(jsonResponse(401, {}));
    const res = await validateAirtablePat(AIRTABLE_PAT, fetchImpl as unknown as typeof fetch);
    expect(res).toEqual({ ok: false, error: 'invalid-token' });
  });
});

describe('validateIntegrationToken dispatch', () => {
  it('routes notion + airtable', async () => {
    const notionFetch = vi.fn().mockResolvedValue(
      jsonResponse(200, { object: 'user', bot: { workspace_name: 'W' } })
    );
    expect(
      await validateIntegrationToken('notion', NOTION_TOKEN, notionFetch as unknown as typeof fetch)
    ).toEqual({ ok: true, label: 'W' });

    const atFetch = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(200, { id: 'u' }))
      .mockResolvedValueOnce(jsonResponse(200, { bases: [] }));
    expect(
      await validateIntegrationToken('airtable', AIRTABLE_PAT, atFetch as unknown as typeof fetch)
    ).toEqual({ ok: true, label: 'Airtable account', detail: undefined });
  });
});
