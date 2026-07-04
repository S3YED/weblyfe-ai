// Creates the test-mode Stripe product + price + Payment Link for Instant Appie BETA.
//
// Run: STRIPE_SECRET_KEY_TEST=sk_test_... npx tsx scripts/create-stripe-products.ts
//
// Production version would require:
//   1. STRIPE_LIVE_OK: setup_beta_product_and_price approval phrase from Seyed
//   2. STRIPE_SECRET_KEY (live key) sourced from ~/.weblyfe-secrets/.env, NOT committed
//   3. Per Stripe handling mandates v2: never hardcode live key; audit log to stripe-audit.log
//
// Critical: subscription_data.metadata is what Stripe propagates to webhook
// events for subscription products. Top-level Checkout Session / Payment Link
// metadata silently fails to propagate (confirmed Stripe behavior March 2025).

const STRIPE_API = 'https://api.stripe.com/v1';

async function stripeFetch(path: string, body: Record<string, string>) {
  const key = process.env.STRIPE_SECRET_KEY_TEST;
  if (!key) throw new Error('STRIPE_SECRET_KEY_TEST not set');
  if (!key.startsWith('sk_test_')) {
    throw new Error('Refusing to run with non-test key. STRIPE_SECRET_KEY_TEST must start with sk_test_.');
  }
  const res = await fetch(`${STRIPE_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(body).toString(),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Stripe ${path} ${res.status}: ${txt}`);
  }
  return res.json();
}

async function main() {
  console.log('[stripe] creating test-mode product Instant Appie BETA');
  const product = await stripeFetch('/products', {
    name: 'Instant Appie BETA',
    description: 'Persoonlijke Techwiz, beta-prijs vergrendeld voor altijd. Hetzner CX32 + Telegram bot + Hermes agent.',
    'metadata[product]': 'instant_appie_beta_250_locked',
  });
  console.log('[stripe] product:', product.id);

  const price = await stripeFetch('/prices', {
    product: product.id,
    unit_amount: '25000',
    currency: 'eur',
    'recurring[interval]': 'month',
    'metadata[product]': 'instant_appie_beta_250_locked',
  });
  console.log('[stripe] price:', price.id);

  // Critical: subscription_data.metadata, NOT top-level metadata.
  const link = await stripeFetch('/payment_links', {
    'line_items[0][price]': price.id,
    'line_items[0][quantity]': '1',
    'subscription_data[metadata][product]': 'instant_appie_beta_250_locked',
    'subscription_data[metadata][source]': 'beta_payment_link',
    after_completion: 'redirect',
    'after_completion[redirect][url]': `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/appie/welcome?session_id={CHECKOUT_SESSION_ID}`,
  });
  console.log('[stripe] payment link:', link.url);
  console.log('\nDone. Test the flow with the URL above.');
}

main().catch((err) => {
  console.error('[stripe] failed:', err.message);
  process.exit(1);
});
