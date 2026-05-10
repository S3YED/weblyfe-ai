// POST /api/webhooks/stripe-instant-appie
// Handles customer.subscription.created and invoice.payment_failed for the
// instant_appie_beta_250_locked product.
// Idempotent: webhook_events INSERT ON CONFLICT DO NOTHING; if 0 rows inserted,
// return 200 without re-processing (PRD security checklist item 8).

import { NextRequest, NextResponse } from 'next/server';
import { verifyStripeSignature } from '@/lib/stripe-webhook';
import { withUserScope } from '@/lib/db';
import { getEnv } from '@/lib/env';
import { issueMagicLink } from '@/lib/auth/magic-link';
import { sendMagicLinkEmail } from '@/lib/brevo';
import { logInfo, logWarn } from '@/lib/log';

export const runtime = 'nodejs';

type StripeEvent = {
  id: string;
  type: string;
  livemode: boolean;
  data: { object: Record<string, unknown> };
};

export async function POST(req: NextRequest) {
  const env = getEnv();
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  const verifyResult = verifyStripeSignature(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!verifyResult.ok) {
    logWarn('stripe.signature-invalid', { reason: verifyResult.reason });
    return NextResponse.json({ ok: false, error: 'invalid-signature' }, { status: 400 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return NextResponse.json({ ok: false, error: 'malformed-json' }, { status: 400 });
  }

  // Test/live mode separation: refuse mismatch.
  const isLiveSecret = env.STRIPE_WEBHOOK_SECRET.startsWith('whsec_live') ||
    process.env.STRIPE_LIVE === '1';
  if (event.livemode && !isLiveSecret) {
    logWarn('stripe.livemode-mismatch', { eventId: event.id });
    return NextResponse.json({ ok: false, error: 'livemode-mismatch' }, { status: 400 });
  }

  // Idempotency.
  const isReplay = await withUserScope(null, async (client) => {
    const r = await client.query(
      `INSERT INTO webhook_events (stripe_event_id) VALUES ($1) ON CONFLICT DO NOTHING`,
      [event.id]
    );
    return (r.rowCount ?? 0) === 0;
  });

  if (isReplay) {
    logInfo('stripe.replay-ignored', { eventId: event.id, type: event.type });
    return NextResponse.json({ ok: true, replayed: true });
  }

  try {
    if (event.type === 'customer.subscription.created') {
      await handleSubscriptionCreated(event);
    } else if (event.type === 'invoice.payment_failed') {
      await handlePaymentFailed(event);
    } else {
      logInfo('stripe.event-ignored', { type: event.type });
    }
  } catch (err) {
    logWarn('stripe.handler-error', { eventId: event.id, error: String(err) });
    // Return 200 to avoid Stripe retry storm; webhook_events already recorded.
  }

  return NextResponse.json({ ok: true });
}

async function handleSubscriptionCreated(event: StripeEvent) {
  const env = getEnv();
  const sub = event.data.object as {
    id: string;
    customer: string;
    status: string;
    metadata?: Record<string, string>;
  };

  const product = sub.metadata?.product;
  if (product !== 'instant_appie_beta_250_locked') {
    logInfo('stripe.product-not-instant-appie', { eventId: event.id, product });
    return;
  }

  const email = await fetchCustomerEmail(sub.customer);
  if (!email) {
    logWarn('stripe.no-customer-email', { eventId: event.id });
    return;
  }

  const { magicUrl } = await withUserScope(null, async (client) => {
    let userRes = await client.query<{ id: string }>(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );
    if (userRes.rowCount === 0) {
      userRes = await client.query<{ id: string }>(
        `INSERT INTO users (email) VALUES ($1) RETURNING id`,
        [email]
      );
    }
    const userId = userRes.rows[0].id;

    await client.query(
      `INSERT INTO subscriptions (user_id, stripe_subscription_id, status, tier, beta_locked_pricing)
       VALUES ($1, $2, $3, $4, TRUE)
       ON CONFLICT (stripe_subscription_id)
       DO UPDATE SET status = EXCLUDED.status`,
      [userId, sub.id, sub.status, 'instant_appie_beta_250_locked']
    );
    // Pre-create the appie row so the wizard knows the user is paid.
    await client.query(
      `INSERT INTO appies (user_id, status, onboarding_state)
       VALUES ($1, 'pending_setup', '{}'::jsonb)
       ON CONFLICT DO NOTHING`,
      [userId]
    );
    await client.query(
      `INSERT INTO audit_log (user_id, event, payload)
       VALUES ($1, 'subscription.created', $2)`,
      [userId, JSON.stringify({ stripe_subscription_id: sub.id })]
    );
    const issued = await issueMagicLink(client, userId);
    return {
      magicUrl: `${env.NEXT_PUBLIC_APP_URL}/appie/auth/verify?token=${encodeURIComponent(issued.token)}`,
    };
  });

  await sendMagicLinkEmail({ toEmail: email, magicLinkUrl: magicUrl });
  logInfo('stripe.magic-link-emitted', { eventId: event.id });
}

async function handlePaymentFailed(event: StripeEvent) {
  const inv = event.data.object as {
    id: string;
    customer: string;
    subscription?: string;
    amount_due: number;
  };
  await withUserScope(null, async (client) => {
    if (!inv.subscription) return;
    await client.query(
      `UPDATE subscriptions SET status = 'past_due' WHERE stripe_subscription_id = $1`,
      [inv.subscription]
    );
    await client.query(
      `INSERT INTO audit_log (user_id, event, payload)
       VALUES (NULL, 'payment.failed', $1)`,
      [JSON.stringify({ stripe_subscription_id: inv.subscription, invoice_id: inv.id })]
    );
  });
  logInfo('stripe.payment-failed.recorded', { eventId: event.id });
}

async function fetchCustomerEmail(customerId: string): Promise<string | null> {
  if (!customerId) return null;
  const env = getEnv();
  if (!env.STRIPE_SECRET_KEY) return null;
  try {
    const res = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { email?: string };
    return data.email ?? null;
  } catch {
    return null;
  }
}
