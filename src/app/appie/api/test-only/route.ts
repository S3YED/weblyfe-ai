// Test-only route. Mounts ONLY when APPIE_E2E=1.
// Used by Playwright to seed a session cookie + magic token for e2e flows
// without requiring a running Postgres.

import { NextRequest, NextResponse } from 'next/server';
import { signSessionJwt, buildSessionCookie, SESSION_TTL_MS, generateMagicLinkToken } from '@/lib/auth/tokens';
import { __testStore__ } from '@/lib/test-store';

export const runtime = 'nodejs';

function ensureEnabled() {
  if (process.env.APPIE_E2E !== '1') {
    return new Response('Not Found', { status: 404 });
  }
  return null;
}

export async function POST(req: NextRequest) {
  const guard = ensureEnabled();
  if (guard) return guard;

  const body = (await req.json().catch(() => ({}))) as {
    op?: 'mint-token' | 'expire-token' | 'session' | 'reset' | 'inspect';
    userId?: string;
    expiresInMs?: number;
  };

  if (body.op === 'reset') {
    __testStore__.reset();
    return NextResponse.json({ ok: true });
  }

  if (body.op === 'mint-token') {
    const userId = body.userId ?? 'e2e-user-1';
    const expiresInMs = body.expiresInMs ?? 15 * 60 * 1000;
    const token = generateMagicLinkToken();
    __testStore__.magicTokens.set(token, {
      userId,
      expiresAt: new Date(Date.now() + expiresInMs),
      usedAt: null,
    });
    return NextResponse.json({ token, userId });
  }

  if (body.op === 'expire-token') {
    const userId = body.userId ?? 'e2e-user-1';
    const token = generateMagicLinkToken();
    __testStore__.magicTokens.set(token, {
      userId,
      expiresAt: new Date(Date.now() - 1000),
      usedAt: null,
    });
    return NextResponse.json({ token, userId });
  }

  if (body.op === 'session') {
    const userId = body.userId ?? 'e2e-user-1';
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    const jwt = signSessionJwt(userId, expiresAt);
    const cookie = buildSessionCookie(jwt, expiresAt);
    return new Response(JSON.stringify({ ok: true, userId }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'Set-Cookie': cookie,
      },
    });
  }

  if (body.op === 'inspect') {
    return NextResponse.json({
      magicTokens: Array.from(__testStore__.magicTokens.entries()),
      appies: Array.from(__testStore__.appies.entries()),
      pings: __testStore__.pings,
    });
  }

  return NextResponse.json({ error: 'unknown-op' }, { status: 400 });
}
