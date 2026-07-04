// GET /api/appie/google/callback?code=...&state=...
// Google Calendar OAuth callback. Exchanges code -> tokens, encrypts at rest,
// stores on the appies row.
// Scope: calendar.events (NOT gmail.readonly per PRD).
// PKCE expected; state cookie verified against the cookie set on /appie/api/google/start.

import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth/session';
import { withUserScope } from '@/lib/db';
import { encryptToBuffers } from '@/lib/secretbox';
import { logInfo, logWarn } from '@/lib/log';

export const runtime = 'nodejs';

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.redirect(new URL('/appie/setup', req.url));

  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const cookieState = req.cookies.get('appie_google_state')?.value;
  const codeVerifier = req.cookies.get('appie_google_verifier')?.value;

  if (!code || !state || !cookieState || state !== cookieState || !codeVerifier) {
    logWarn('google.oauth.bad-state', {});
    return NextResponse.redirect(new URL('/appie/dashboard?google=err', req.url));
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/appie/google/callback`;

  if (!clientId || !clientSecret) {
    logWarn('google.oauth.not-configured', {});
    return NextResponse.redirect(new URL('/appie/dashboard?google=not-configured', req.url));
  }

  const tokenRes = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code_verifier: codeVerifier,
    }),
  });
  if (!tokenRes.ok) {
    logWarn('google.oauth.token-exchange-failed', { status: tokenRes.status });
    return NextResponse.redirect(new URL('/appie/dashboard?google=err', req.url));
  }

  const data = (await tokenRes.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };

  const accessEnc = encryptToBuffers(data.access_token);
  const refreshEnc = data.refresh_token ? encryptToBuffers(data.refresh_token) : null;

  await withUserScope(userId, async (client) => {
    await client.query(
      `UPDATE appies
       SET google_access_token_enc = $2, google_access_token_nonce = $3,
           google_refresh_token_enc = COALESCE($4, google_refresh_token_enc),
           google_refresh_token_nonce = COALESCE($5, google_refresh_token_nonce)
       WHERE user_id = $1`,
      [
        userId,
        accessEnc.ciphertext,
        accessEnc.nonce,
        refreshEnc?.ciphertext ?? null,
        refreshEnc?.nonce ?? null,
      ]
    );
    await client.query(
      `INSERT INTO audit_log (user_id, event, payload)
       VALUES ($1, 'google.oauth.connected', '{}'::jsonb)`,
      [userId]
    );
  });

  logInfo('google.oauth.connected', { userId });
  const res = NextResponse.redirect(new URL('/appie/dashboard?google=ok', req.url));
  // Clear PKCE cookies.
  res.cookies.set('appie_google_state', '', { maxAge: 0, path: '/' });
  res.cookies.set('appie_google_verifier', '', { maxAge: 0, path: '/' });
  return res;
}
