import { describe, it, expect, beforeEach } from 'vitest';
import { createHmac } from 'node:crypto';
import { verifyStripeSignature } from '../../src/lib/stripe-webhook';
import { makeFakeStore, makeFakeClient, type FakeStore } from '../helpers/fake-pg';

const SECRET = 'whsec_test_dummy';

function signPayload(payload: string, secret = SECRET, ts = Math.floor(Date.now() / 1000)) {
  const sig = createHmac('sha256', secret).update(`${ts}.${payload}`).digest('hex');
  return `t=${ts},v1=${sig}`;
}

describe('stripe-webhook signature verification', () => {
  it('accepts a valid signature within tolerance', () => {
    const payload = '{"id":"evt_1"}';
    const r = verifyStripeSignature(payload, signPayload(payload), SECRET);
    expect(r.ok).toBe(true);
  });

  it('rejects a tampered payload (signature mismatch)', () => {
    const payload = '{"id":"evt_1"}';
    const sig = signPayload(payload);
    const r = verifyStripeSignature('{"id":"evt_2"}', sig, SECRET);
    expect(r.ok).toBe(false);
  });

  it('rejects a missing header', () => {
    const r = verifyStripeSignature('{}', null, SECRET);
    expect(r.ok).toBe(false);
  });

  it('rejects timestamps outside tolerance', () => {
    const payload = '{}';
    const r = verifyStripeSignature(payload, signPayload(payload, SECRET, 0), SECRET);
    expect(r.ok).toBe(false);
  });

  it('rejects when secret is empty', () => {
    const r = verifyStripeSignature('{}', 't=1,v1=abc', '');
    expect(r.ok).toBe(false);
  });
});

describe('webhook_events idempotency', () => {
  let store: FakeStore;
  let client: ReturnType<typeof makeFakeClient>;

  beforeEach(() => {
    store = makeFakeStore();
    client = makeFakeClient(store);
  });

  // Mirrors the INSERT ... ON CONFLICT DO NOTHING path used in the real handler.
  async function recordEvent(eventId: string): Promise<boolean /* didProcess */> {
    const r = await client.query(
      `INSERT INTO webhook_events (stripe_event_id) VALUES ($1) ON CONFLICT DO NOTHING`,
      [eventId]
    );
    return (r.rowCount ?? 0) > 0;
  }

  it('replaying the same event 5x results in only one DB row', async () => {
    const id = 'evt_subscription_created_xyz';
    let processedCount = 0;
    for (let i = 0; i < 5; i++) {
      const didProcess = await recordEvent(id);
      if (didProcess) processedCount++;
    }
    expect(processedCount).toBe(1);
    expect(store.webhook_events.size).toBe(1);
  });

  it('different event IDs each get a row', async () => {
    await recordEvent('evt_a');
    await recordEvent('evt_b');
    await recordEvent('evt_c');
    expect(store.webhook_events.size).toBe(3);
  });
});
