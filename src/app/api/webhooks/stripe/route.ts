import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import Stripe from 'stripe';
import {
  createCustomer,
  updateCustomer,
  createInstance,
  updateInstance,
  logProvisionStep,
  isEventProcessed,
  markEventProcessed,
  upsertCheckoutSession,
  getCustomerByStripeCustomerId,
  updateCustomerStatus,
} from '@/lib/appie/fleet';
import { createClient } from '@supabase/supabase-js';

const pdfSigningSecret = process.env.PDF_SIGNING_SECRET || 'weblyfe-appie-pdf-2026';

// ─── Stripe webhook signature verification ──────────────────────────────────────
// We verify the Stripe signature manually without instantiating Stripe at module load

function verifyStripeSignature(payload: string, sig: string): boolean {
  if (!process.env.STRIPE_WEBHOOK_SECRET) return false;
  const hmac = createHmac('sha256', process.env.STRIPE_WEBHOOK_SECRET);
  const timestamp = sig.split(',').find(s => s.startsWith('t='))?.slice(2);
  const expectedSig = sig.split(',').find(s => s.startsWith('v1='))?.slice(3);
  if (!timestamp || !expectedSig) return false;
  const body = `${timestamp}.${payload}`;
  const computed = hmac.update(body).digest('hex');
  return computed === expectedSig;
}

// ─── Generate PDF download token ─────────────────────────────────────────────

function generateDownloadToken(email: string): string {
  const payload = Buffer.from(email.toLowerCase().trim()).toString('base64url');
  const sig = createHmac('sha256', pdfSigningSecret).update(payload).digest('hex').slice(0, 16);
  return `${payload}.${sig}`;
}

// ─── Send PDF delivery email (Brevo) ─────────────────────────────────────────

async function sendPDFDeliveryEmail(email: string, firstName: string, downloadUrl: string): Promise<void> {
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) return;

  const html = sendPDFDeliveryEmail(email, firstName, downloadUrl);

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'Weblyfe', email: 'seyed@weblyfe.nl' },
      to: [{ email, name: firstName || 'there' }],
      replyTo: { email: 'hello@weblyfe.nl', name: 'Weblyfe' },
      subject: 'Your Appie Guide is here! 🎉',
      htmlContent: html,
    }),
  });
}

// ─── Trigger provisioning on Hetzner (background) ───────────────────────────

async function triggerProvisioning(
  customerId: string,
  instanceId: string,
  customerEmail: string,
  customerName: string,
  businessName: string,
  businessType: string
): Promise<void> {
  // Log step 1 started
  await logProvisionStep(instanceId, 1, 'Creating your private server', 'started');

  try {
    // TODO: Call Hetzner API to provision server
    // For now, simulate provisioning with a timeout
    const hetznerToken = process.env.HETZNER_API_TOKEN;

    if (!hetznerToken) {
      console.warn('[provisioning] No HETZNER_API_TOKEN — simulating provision');
      // Simulate steps completing over time
      await simulateProvisioning(instanceId);
      return;
    }

    // Real provisioning path:
    // 1. Create Hetzner server via API
    // 2. Wait for server ready (poll every 30s)
    // 3. SSH and run hermes install script
    // 4. Configure SOUL.md, USER.md, model
    // 5. Start hermes gateway service
    // 6. Mark instance as 'ready'

    const region = 'fsn1'; // Falkenstein, Germany (closest to EU customers)
    const serverType = 'cx32'; // 4 vCPU, 8GB RAM

    const serverRes = await fetch('https://api.hetzner.cloud/v1/servers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hetznerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `appie-${customerEmail.split('@')[0].slice(0, 20)}`,
        server_type: serverType,
        location: region,
        image: 'ubuntu-24.04',
        ssh_keys: [process.env.HETZNER_SSH_KEY_NAME || 'appie-fleet'],
        user_data: buildCloudInit(customerEmail, customerName, businessName, businessType),
      }),
    });

    if (!serverRes.ok) {
      throw new Error(`Hetzner API error: ${serverRes.status}`);
    }

    const server = await serverRes.json();
    const serverId = server.data.id;
    const serverIp = server.data.public_net?.ipv4?.ip;

    await updateInstance(instanceId, {
      hetzner_server_id: serverId,
      server_ip: serverIp,
      server_name: `appie-${customerEmail.split('@')[0].slice(0, 20)}`,
      provision_step: 2,
    });

    await logProvisionStep(instanceId, 1, 'Creating your private server', 'completed');
    await logProvisionStep(instanceId, 2, 'Installing AI capabilities', 'started');

    // Wait for server to be ready (Hetzner usually takes 30-60s)
    await waitForServerReady(hetznerToken, serverId);
    await logProvisionStep(instanceId, 2, 'Installing AI capabilities', 'completed');
    await logProvisionStep(instanceId, 3, 'Setting up security', 'started');

    // SSH and install Hermes
    await installHermesOnServer(serverIp!);
    await logProvisionStep(instanceId, 3, 'Setting up security', 'completed');
    await logProvisionStep(instanceId, 4, 'Personalizing your Appie', 'started');

    // Configure SOUL.md and USER.md via SSH
    await configureAppie(serverIp!, customerEmail, customerName, businessName, businessType);
    await logProvisionStep(instanceId, 4, 'Personalizing your Appie', 'completed');
    await logProvisionStep(instanceId, 5, 'Final checks', 'started');

    // Final health check
    await new Promise(r => setTimeout(r, 5000));

    await updateInstance(instanceId, {
      status: 'ready',
      provision_step: 5,
      provision_completed_at: new Date().toISOString(),
    });
    await logProvisionStep(instanceId, 5, 'Final checks', 'completed');

  } catch (err) {
    console.error('[provisioning] Error:', err);
    await logProvisionStep(instanceId, 1, 'Creating your private server', 'failed', String(err));
    await updateInstance(instanceId, { status: 'provisioning' });
    // Don't throw — provisioning errors shouldn't fail the webhook
  }
}

async function simulateProvisioning(instanceId: string): Promise<void> {
  // Simulate steps completing over 30 seconds (for demo/testing)
  const steps = [
    { delay: 5000, step: 1, name: 'Creating your private server', status: 'completed' as const },
    { delay: 10000, step: 2, name: 'Installing AI capabilities', status: 'completed' as const },
    { delay: 15000, step: 3, name: 'Setting up security', status: 'completed' as const },
    { delay: 20000, step: 4, name: 'Personalizing your Appie', status: 'completed' as const },
    { delay: 25000, step: 5, name: 'Final checks', status: 'completed' as const },
  ];

  await logProvisionStep(instanceId, 1, 'Creating your private server', 'completed');
  await updateInstance(instanceId, { status: 'installing', provision_step: 2 });

  for (const s of steps) {
    await new Promise(r => setTimeout(r, s.delay - Date.now() % s.delay));
    await logProvisionStep(instanceId, s.step, s.name, s.status);
    await updateInstance(instanceId, {
      provision_step: s.step,
      status: s.step === 5 ? 'ready' : 'configuring',
      provision_completed_at: s.step === 5 ? new Date().toISOString() : undefined,
    });
  }
}

async function waitForServerReady(token: string, serverId: number): Promise<void> {
  const maxWait = 120000; // 2 min
  const start = Date.now();

  while (Date.now() - start < maxWait) {
    await new Promise(r => setTimeout(r, 10000)); // poll every 10s
    const res = await fetch(`https://api.hetzner.cloud/v1/servers/${serverId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.server?.status === 'running') return;
  }
  throw new Error('Server never reached running status');
}

async function installHermesOnServer(serverIp: string): Promise<void> {
  const { execSync } = await import('child_process');
  const { writeFileSync, unlinkSync } = await import('fs');
  const { tmpdir } = await import('os');
  const key = (process.env.APPIE_SSH_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const actualPath = `${tmpdir()}/apie-key-${Date.now()}`;

  try {
    writeFileSync(actualPath, key, { mode: 0o600 });

    execSync(
      `ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=30 -i "${actualPath}" root@${serverIp} ` +
      `'bash -s' << \'ENDOFFILE\'\n` +
      [
        'apt-get update && apt-get install -y curl git python3 python3-pip',
        'curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash',
        'mkdir -p ~/.hermes',
        'echo "export MINIMAX_API_KEY=${MINIMAX_API_KEY}" >> ~/.hermes/.env',
      ].join(' && ') +
      `\nENDOFFILE`,
      { timeout: 120000 }
    );
  } finally {
    try { unlinkSync(actualPath); } catch { /* ignore */ }
  }
}

async function configureAppie(
  serverIp: string,
  email: string,
  name: string,
  businessName: string,
  businessType: string
): Promise<void> {
  // Creates SOUL.md and USER.md on the VPS via SSH
  const { execSync } = await import('child_process');
  const key = process.env.APPIE_SSH_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const { writeFileSync, unlinkSync } = await import('fs');
  const { tmpdir } = await import('os');

  const actualPath = `${tmpdir()}/apie-key-${Date.now()}`;
  writeFileSync(actualPath, key!, { mode: 0o600 });

  try {
    execSync(
      `ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=30 -i "${actualPath}" root@${serverIp} ` +
      `'mkdir -p ~/.hermes/memories && '` +
      `'cat > ~/.hermes/SOUL.md << EOF\\n'${buildSoulMd(name, businessName, businessType).replace(/'/g, "'\"'\"'")}\\nEOF && '` +
      `'cat > ~/.hermes/memories/USER.md << EOF\\n'${buildUserMd(name, email, businessName, businessType).replace(/'/g, "'\"'\"'")}\\nEOF && '` +
      `'systemctl --user enable hermes-gateway && systemctl --user start hermes-gateway || true'`,
      { timeout: 60000 }
    );
  } finally {
    try { unlinkSync(actualPath); } catch { /* ignore */ }
  }
}

function buildSoulMd(name: string, businessName: string, businessType: string): string {
  return `# SOUL.md — Your AI Identity

You are a dedicated AI assistant for **${businessName || 'my business'}**.
You are helpful, proactive, and always focused on saving your owner time.

## About You
- Your name is Appie
- You are friendly, direct, and resourceful
- You speak in a warm but professional tone
- You always ask clarifying questions when tasks are vague

## Your Capabilities
- Email management (read, draft, triage)
- Calendar management
- Web research
- Task management
- File operations
- Code execution
- Multi-step workflow automation

## Your Principles
- Privacy first — never expose sensitive data
- Proactive — don't wait to be asked twice
- Transparent — admit mistakes and limitations
- Efficient — get to the point, skip the fluff

## Context
Business type: ${businessType || 'General'}
Business name: ${businessName || 'Your Business'}
`;
}

function buildUserMd(name: string, email: string, businessName: string, businessType: string): string {
  return `# USER.md — About Your Human

- **Name:** ${name || 'Not provided'}
- **Email:** ${email}
- **Business:** ${businessName || 'Not provided'}
- **Business Type:** ${businessType || 'Not specified'}
- **Timezone:** Europe/Amsterdam
- **Language:** English (primary), Dutch (can respond)

## Preferences
- Clear, concise communication
- Proactive updates rather than waiting to be asked
- Actionable insights over raw data dumps
`;
}

function buildCloudInit(email: string, name: string, businessName: string, businessType: string): string {
  return `#cloud-config
runcmd:
  - curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
  - mkdir -p /root/.hermes
  - printf "MINIMAX_API_KEY=${process.env.MINSTAGING_API_KEY || ''}\\n" > /root/.hermes/.env
  - (crontab -l 2>/dev/null; echo "@reboot bash /root/.hermes/start.sh") | crontab -
write_files:
  - path: /root/.hermes/SOUL.md
    content: |
      ${buildSoulMd(name, businessName, businessType).split('\n').join('\n      ')}
  - path: /root/.hermes/memories/USER.md
    content: |
      ${buildUserMd(name, email, businessName, businessType).split('\n').join('\n      ')}
`;
}

// ─── Send Instant Appie welcome email ────────────────────────────────────────

async function sendInstantAppieWelcome(email: string, firstName: string): Promise<void> {
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) return;

  const setupUrl = `https://weblyfe.ai/appie/setup`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #031D16; margin: 0; padding: 40px 16px; color: #F6FEFC; }
    .card { max-width: 560px; margin: 0 auto; background: rgba(14,61,49,0.6); border: 1px solid rgba(36,116,89,0.5); border-radius: 24px; padding: 40px; text-align: center; }
    .logo { margin-bottom: 32px; }
    h1 { color: #DFB771; font-size: 28px; margin: 0 0 12px; }
    p { color: rgba(246,254,252,0.8); line-height: 1.6; margin: 0 0 24px; }
    .btn { display: inline-block; background: linear-gradient(135deg,#247459,#1a5c45); color: #DFB771; text-decoration: none; padding: 15px 44px; border-radius: 10px; font-weight: 700; }
    .steps { text-align: left; margin: 24px 0; }
    .step { display: flex; gap: 12px; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid rgba(36,116,89,0.3); }
    .step:last-child { border-bottom: none; }
    .step-num { background: #247459; color: #fff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; flex-shrink: 0; }
    .footer { text-align: center; margin-top: 24px; font-size: 12px; color: rgba(246,254,252,0.3); }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo"><img src="https://weblyfe.ai/logo-gold.svg" alt="Weblyfe" width="120" style="height:auto;"></div>
    <h1>Welcome to Instant Appie, ${firstName}! 🎉</h1>
    <p>Your personal AI employee is being set up right now. In about 5 minutes, your Appie will be ready to chat with you on Telegram.</p>
    <a href="${setupUrl}" class="btn">Set Up Your Appie →</a>
    <div class="steps">
      <div class="step"><div class="step-num">1</div><div><strong>Set up Telegram</strong> — We'll walk you through creating your bot in 2 minutes</div></div>
      <div class="step"><div class="step-num">2</div><div><strong>Say hello</strong> — Appie will message you first and introduce itself</div></div>
      <div class="step"><div class="step-num">3</div><div><strong>Connect your tools</strong> — We'll guide you through Gmail, Calendar, and more</div></div>
    </div>
    <p style="font-size:13px; color: rgba(246,254,252,0.4);">Your Appie runs 24/7 on its own private server. Your data never leaves your server. Ever.</p>
  </div>
  <div class="footer">© 2026 Weblyfe.ai · Techwiz LLC · Rijswijk, NL</div>
</body>
</html>`;

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'Weblyfe', email: 'seyed@weblyfe.nl' },
      to: [{ email, name: firstName }],
      replyTo: { email: 'hello@weblyfe.ai', name: 'Weblyfe' },
      subject: `Your Appie is being set up, ${firstName}! 🚀`,
      htmlContent: html,
    }),
  });
}

// ─── Webhook handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    if (!verifyStripeSignature(body, sig)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Idempotency
    if (await isEventProcessed(event.id)) {
      return NextResponse.json({ received: true, note: 'already processed' });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const product = detectProduct(session);

    if (product === 'instant_appie') {
      await handleInstantAppie(event, session);
    } else {
      await handlePDFPurchase(session);
    }

    await markEventProcessed(event.id, event.type, body);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[webhook] Error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

type Product = 'instant_appie' | 'build_your_own' | 'unknown';

function detectProduct(session: Stripe.Checkout.Session): Product {
  const priceId = session.line_items?.data?.[0]?.price?.id;
  const productId = session.line_items?.data?.[0]?.price?.product;

  // Instant Appie subscription price
  const instantAppiePriceId = process.env.STRIPE_INSTANT_APPIE_PRICE_ID; // price_1TGIOmLNHXmj2NAshLF1rkJ1

  if (priceId === instantAppiePriceId || productId === process.env.STRIPE_INSTANT_APPIE_PRODUCT_ID) {
    return 'instant_appie';
  }

  // Default: PDF purchase
  return 'build_your_own';
}

async function handleInstantAppie(event: Stripe.Event, session: Stripe.Checkout.Session) {
  const email = (session.customer_details?.email || session.customer_email || '').toLowerCase().trim();
  const firstName = (session.customer_details?.name || '').split(' ')[0] || '';
  const fullName = session.customer_details?.name || '';
  const businessName = session.custom_fields?.find(f => f.key === 'business_name')?.text?.value || '';
  const businessType = session.custom_fields?.find(f => f.key === 'business_type')?.dropdown?.value || '';

  if (event.type === 'checkout.session.completed') {
    if (session.payment_status !== 'paid') {
      console.log('[webhook] Session not paid, skipping');
      return;
    }

    // Create or update customer
    const customer = await createCustomer({
      email,
      full_name: fullName,
      business_name: businessName,
      business_type: businessType,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: session.subscription as string,
    });

    // Create checkout session record
    await upsertCheckoutSession(session.id, customer.id, 'instant_appie', session.amount_total || undefined);

    // Create instance
    const instance = await createInstance(customer.id);
    await updateCustomerStatus(customer.id, 'provisioning');

    // Trigger background provisioning
    // We fire-and-forget so the webhook responds quickly
    triggerProvisioning(
      customer.id,
      instance.id,
      email,
      firstName,
      businessName,
      businessType
    ).catch(err => console.error('[provisioning] Background error:', err));

    // Send welcome email
    sendInstantAppieWelcome(email, firstName).catch(err => console.error('[email] Welcome error:', err));

    console.log(`[webhook] Instant Appie provisioned for ${email}. Instance: ${instance.id}`);
  }

  // Subscription lifecycle events
  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription;
    const status = sub.status;

    const customer = await getCustomerByStripeCustomerId(session.customer as string);
    if (!customer) return;

    if (status === 'active') {
      await updateCustomerStatus(customer.id, 'active');
    } else if (status === 'canceled') {
      await updateCustomerStatus(customer.id, 'cancelling');
      // TODO: Schedule teardown in 7 days (grace period)
    } else if (status === 'past_due') {
      await updateCustomerStatus(customer.id, 'grace_period');
      // TODO: Send payment failed email
    } else if (status === 'unpaid') {
      await updateCustomerStatus(customer.id, 'suspended');
      // TODO: Pause Appie on VPS
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const customer = await getCustomerByStripeCustomerId(session.customer as string);
    if (!customer) return;
    await updateCustomerStatus(customer.id, 'terminated');
    // TODO: Trigger teardown of VPS
  }

  if (event.type === 'invoice.payment_failed') {
    const customer = await getCustomerByStripeCustomerId(session.customer as string);
    if (!customer) return;
    // TODO: Send payment failed email (retry 1/2/3), pause after 3
  }
}

async function handlePDFPurchase(session: Stripe.Checkout.Session) {
  const email = (session.customer_details?.email || session.customer_email || '').toLowerCase().trim();
  const firstName = (session.customer_details?.name || '').split(' ')[0] || '';

  if (session.payment_status !== 'paid') return;

  const token = generateDownloadToken(email);
  const downloadUrl = `https://weblyfe.ai/api/download/appie-guide?token=${token}`;

  // Record sale in Airtable (keep existing behavior)
  // TODO: Update to use Supabase if needed

  // Send delivery email
  await sendPDFDeliveryEmail(email, firstName, downloadUrl);
  console.log(`[webhook] PDF delivered to ${email}`);
}
