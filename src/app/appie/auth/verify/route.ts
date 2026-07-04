// GET /appie/auth/verify?token=...
// Atomic UPDATE-with-RETURNING per PRD section "Magic-link verification".
// 303 redirect strips token from URL; Referrer-Policy: no-referrer prevents leak.

import { NextRequest } from 'next/server';
import { withUserScope } from '@/lib/db';
import { consumeMagicLink } from '@/lib/auth/magic-link';
import { buildSessionCookie, signSessionJwt, SESSION_TTL_MS } from '@/lib/auth/tokens';
import { logInfo, logWarn } from '@/lib/log';
import { __testStore__, isE2eMode } from '@/lib/test-store';
import { renderExpiredLinkHtml, renderInternalErrorHtml } from '@/lib/auth/expired-page';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return new Response(renderExpiredLinkHtml(), {
      status: 410,
      headers: {
        'Referrer-Policy': 'no-referrer',
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  let userId: string | null = null;
  if (isE2eMode()) {
    // In E2E mode use the in-memory store with the same atomic semantics.
    const row = __testStore__.magicTokens.get(token);
    const now = new Date();
    if (row && row.usedAt === null && row.expiresAt.getTime() > now.getTime()) {
      row.usedAt = now;
      userId = row.userId;
    }
  } else {
    try {
      userId = await withUserScope(null, async (client) => {
        const r = await consumeMagicLink(client, token);
        return r?.userId ?? null;
      });
    } catch (err) {
      logWarn('magic-link.verify-error', { error: String(err) });
      return new Response(renderInternalErrorHtml(), {
        status: 500,
        headers: {
          'Referrer-Policy': 'no-referrer',
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }
  }

  if (!userId) {
    return new Response(renderExpiredLinkHtml(), {
      status: 410,
      headers: {
        'Referrer-Policy': 'no-referrer',
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const jwt = signSessionJwt(userId, expiresAt);
  const cookie = buildSessionCookie(jwt, expiresAt);

  // Decide where to redirect based on whether the user has an appie row.
  let redirect = '/appie/dashboard';
  if (isE2eMode()) {
    const appie = __testStore__.appies.get(userId);
    if (!appie || appie.status === 'pending_setup') redirect = '/appie/setup';
    else if (appie.status === 'provisioning') redirect = '/appie/setup/provisioning';
    else redirect = '/appie/dashboard';
  } else {
    try {
      await withUserScope(userId, async (client) => {
        const r = await client.query(
          `SELECT status FROM appies WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
          [userId]
        );
        const status = r.rows[0]?.status;
        if (!status || status === 'pending_setup') {
          redirect = '/appie/setup';
        } else if (status === 'provisioning') {
          redirect = '/appie/setup/provisioning';
        } else {
          redirect = '/appie/dashboard';
        }
      });
    } catch {
      // ignore - fall back to default
    }
  }

  logInfo('magic-link.verified', { redirect });

  return new Response(null, {
    status: 303,
    headers: {
      Location: redirect,
      'Referrer-Policy': 'no-referrer',
      'Set-Cookie': cookie,
    },
  });
}
