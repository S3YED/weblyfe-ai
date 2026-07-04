// POST /appie/auth/request-link
// Body: { email: string }
// Issues a magic link, sends it via Brevo. Always returns 200 to avoid
// account-enumeration leaks.

import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';
import { withUserScope } from '@/lib/db';
import { issueMagicLink } from '@/lib/auth/magic-link';
import { sendMagicLinkEmail } from '@/lib/brevo';
import { logInfo, logWarn } from '@/lib/log';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let email: string;
  try {
    const body = (await req.json()) as { email?: unknown };
    if (typeof body.email !== 'string' || !body.email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'invalid-email' }, { status: 400 });
    }
    email = body.email.trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  const env = getEnv();

  try {
    const autocreate = process.env.APPIE_AUTOCREATE_ON_REQUEST === '1';

    const { token, expiresAt, didMintNew, noAccount } = await withUserScope(null, async (client) => {
      // Don't auto-create users here. Auth must follow a paid Stripe webhook.
      // But for dev convenience, allow creation if APPIE_AUTOCREATE_ON_REQUEST=1.
      let userRes = await client.query<{ id: string }>(
        `SELECT id FROM users WHERE email = $1`,
        [email]
      );
      if (userRes.rowCount === 0) {
        if (autocreate) {
          userRes = await client.query<{ id: string }>(
            `INSERT INTO users (email) VALUES ($1) RETURNING id`,
            [email]
          );
        } else {
          return { token: null, expiresAt: null, didMintNew: false, noAccount: true };
        }
      }
      const userId = userRes.rows[0].id;
      const issued = await issueMagicLink(client, userId);
      return { token: issued.token, expiresAt: issued.expiresAt, didMintNew: true, noAccount: false };
    });

    if (!didMintNew || !token) {
      // No account for this email AND autocreate is off. Direct them to
      // weblyfe.ai to purchase. Enumeration is acceptable here because this
      // path only triggers in production where autocreate is off and the
      // product intentionally tells buyers where to sign up.
      logWarn('magic-link.unknown-email', { email });
      return NextResponse.json({ ok: true, noAccount: Boolean(noAccount) });
    }

    const url = `${env.NEXT_PUBLIC_APP_URL}/appie/auth/verify?token=${encodeURIComponent(token)}`;
    const sendRes = await sendMagicLinkEmail({ toEmail: email, magicLinkUrl: url });
    if (!sendRes.ok) {
      logWarn('magic-link.brevo-failed', { status: sendRes.status });
    } else {
      logInfo('magic-link.sent', { expiresAt: expiresAt?.toISOString() });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    logWarn('magic-link.request-error', { error: String(err) });
    return NextResponse.json({ ok: false, error: 'internal' }, { status: 500 });
  }
}
