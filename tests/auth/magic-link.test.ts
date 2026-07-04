import { describe, it, expect, beforeEach } from 'vitest';
import { issueMagicLink, consumeMagicLink } from '../../src/lib/auth/magic-link';
import { makeFakeStore, makeFakeClient, type FakeStore } from '../helpers/fake-pg';

describe('magic-link', () => {
  let store: FakeStore;
  let client: ReturnType<typeof makeFakeClient>;

  beforeEach(() => {
    store = makeFakeStore();
    store.users.set('u1', { id: 'u1', email: 'a@b.com' });
    client = makeFakeClient(store);
  });

  it('issues a 32-byte base64url token with 15-minute TTL', async () => {
    const now = new Date('2026-05-09T10:00:00Z');
    const { token, expiresAt } = await issueMagicLink(client, 'u1', now);
    // base64url of 32 bytes is 43 chars (no padding).
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(token.length).toBeGreaterThanOrEqual(43);
    expect(expiresAt.getTime() - now.getTime()).toBe(15 * 60 * 1000);
  });

  it('atomically consumes a valid token, single-use', async () => {
    const { token } = await issueMagicLink(client, 'u1');
    const r1 = await consumeMagicLink(client, token);
    expect(r1?.userId).toBe('u1');
    const r2 = await consumeMagicLink(client, token);
    expect(r2).toBeNull();
  });

  it('rejects expired tokens', async () => {
    const t0 = new Date('2026-05-09T10:00:00Z');
    const { token } = await issueMagicLink(client, 'u1', t0);
    const tooLate = new Date(t0.getTime() + 16 * 60 * 1000);
    const r = await consumeMagicLink(client, token, tooLate);
    expect(r).toBeNull();
  });

  it('rejects unknown tokens', async () => {
    const r = await consumeMagicLink(client, 'definitely-not-a-real-token');
    expect(r).toBeNull();
  });

  it('invalidates prior unused tokens when a new one is requested', async () => {
    const first = await issueMagicLink(client, 'u1');
    const second = await issueMagicLink(client, 'u1');
    // First should now be unusable.
    const r1 = await consumeMagicLink(client, first.token);
    expect(r1).toBeNull();
    // Second should still work.
    const r2 = await consumeMagicLink(client, second.token);
    expect(r2?.userId).toBe('u1');
  });

  it('does not invalidate other users tokens', async () => {
    store.users.set('u2', { id: 'u2', email: 'c@d.com' });
    const u1 = await issueMagicLink(client, 'u1');
    await issueMagicLink(client, 'u2'); // does not touch u1
    const r1 = await consumeMagicLink(client, u1.token);
    expect(r1?.userId).toBe('u1');
  });

  it('replay attempt returns null even within TTL', async () => {
    const { token } = await issueMagicLink(client, 'u1');
    await consumeMagicLink(client, token);
    const replay = await consumeMagicLink(client, token);
    expect(replay).toBeNull();
  });
});
