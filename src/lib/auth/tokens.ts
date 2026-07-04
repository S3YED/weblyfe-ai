// Magic-link token generation + session JWT signing.
// Per PRD: 32-byte CSPRNG, base64url, 15-min TTL, single-use.

import { randomBytes, createHmac, timingSafeEqual } from 'node:crypto';
import { getEnv } from '@/lib/env';

export const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function generateMagicLinkToken(): string {
  return randomBytes(32).toString('base64url');
}

// Minimal HS256 JWT (header.payload.signature, all base64url).
export function signSessionJwt(userId: string, expiresAt: Date): string {
  const env = getEnv();
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(expiresAt.getTime() / 1000),
  };
  const enc = (obj: unknown) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url');
  const headerEnc = enc(header);
  const payloadEnc = enc(payload);
  const data = `${headerEnc}.${payloadEnc}`;
  const sig = createHmac('sha256', env.JWT_SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifySessionJwt(jwt: string): { userId: string } | null {
  try {
    const env = getEnv();
    const [headerEnc, payloadEnc, sig] = jwt.split('.');
    if (!headerEnc || !payloadEnc || !sig) return null;
    const data = `${headerEnc}.${payloadEnc}`;
    const expected = createHmac('sha256', env.JWT_SECRET).update(data).digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const payload = JSON.parse(Buffer.from(payloadEnc, 'base64url').toString());
    if (typeof payload.sub !== 'string') return null;
    if (typeof payload.exp !== 'number' || payload.exp * 1000 < Date.now()) return null;
    return { userId: payload.sub };
  } catch {
    return null;
  }
}

export function buildSessionCookie(jwt: string, expiresAt: Date): string {
  const parts = [
    `appie_session=${jwt}`,
    `Path=/`,
    `Expires=${expiresAt.toUTCString()}`,
    `HttpOnly`,
    `SameSite=Lax`,
  ];
  if (process.env.NODE_ENV === 'production') parts.push('Secure');
  return parts.join('; ');
}
