// Stripe webhook signature verification (timing-safe). Mirrors logic in the
// existing /api/webhooks/stripe route, factored out so it's testable and reusable.

import { createHmac, timingSafeEqual } from 'node:crypto';

export type VerifyResult = { ok: true } | { ok: false; reason: string };

export function verifyStripeSignature(
  payload: string,
  signatureHeader: string | null,
  secret: string,
  toleranceSeconds = 300,
  now: number = Math.floor(Date.now() / 1000)
): VerifyResult {
  if (!signatureHeader) return { ok: false, reason: 'missing-header' };
  if (!secret) return { ok: false, reason: 'missing-secret' };

  const elements = signatureHeader.split(',');
  const timestamp = elements.find((e) => e.startsWith('t='))?.split('=')[1];
  const v1Sig = elements.find((e) => e.startsWith('v1='))?.split('=')[1];
  if (!timestamp || !v1Sig) return { ok: false, reason: 'malformed-header' };

  const ts = parseInt(timestamp, 10);
  if (!Number.isFinite(ts)) return { ok: false, reason: 'malformed-timestamp' };
  if (Math.abs(now - ts) > toleranceSeconds) return { ok: false, reason: 'timestamp-out-of-tolerance' };

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSig = createHmac('sha256', secret).update(signedPayload).digest('hex');

  const a = Buffer.from(expectedSig);
  const b = Buffer.from(v1Sig);
  if (a.length !== b.length) return { ok: false, reason: 'length-mismatch' };
  try {
    if (!timingSafeEqual(a, b)) return { ok: false, reason: 'signature-mismatch' };
  } catch {
    return { ok: false, reason: 'compare-failed' };
  }
  return { ok: true };
}
