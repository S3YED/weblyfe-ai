import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const PDF_SIGNING_SECRET = process.env.PDF_SIGNING_SECRET || 'weblyfe-appie-pdf-2026';
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_WEBLYFE_BASE_ID!;
const AIRTABLE_LEADS_TABLE = 'tblXjrB8K4Mc6U8Xu';
const AIRTABLE_SALES_TABLE = 'tbl4ghEabTQzC84hV';

// ─── Stripe Signature Verification ─────────────────────────────────────────────

function verifyStripeSignature(payload: string, signature: string): boolean {
  const elements = signature.split(',');
  const timestamp = elements.find((e) => e.startsWith('t='))?.split('=')[1];
  const v1Sig = elements.find((e) => e.startsWith('v1='))?.split('=')[1];

  if (!timestamp || !v1Sig) return false;

  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp);
  if (age > 300) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSig = createHmac('sha256', STRIPE_WEBHOOK_SECRET)
    .update(signedPayload)
    .digest('hex');

  // Use timing-safe comparison
  try {
    return timingSafeEqual(Buffer.from(expectedSig), Buffer.from(v1Sig));
  } catch {
    return false;
  }
}

// ─── Generate Signed Download URL ──────────────────────────────────────────────

function generateDownloadToken(email: string): string {
  const payload = Buffer.from(email.toLowerCase().trim()).toString('base64url');
  const sig = createHmac('sha256', PDF_SIGNING_SECRET)
    .update(payload)
    .digest('hex')
    .slice(0, 16);
  return `${payload}.${sig}`;
}

// ─── Fetch Customer Email from Stripe ──────────────────────────────────────────

async function getCustomerEmail(session: {
  customer_email?: string;
  customer_details?: { email?: string; name?: string };
  customer?: string;
}): Promise<string | null> {
  if (session.customer_email) return session.customer_email;
  if (session.customer_details?.email) return session.customer_details.email;

  if (session.customer) {
    try {
      const res = await fetch(`https://api.stripe.com/v1/customers/${session.customer}`, {
        headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
      });
      if (res.ok) {
        const customer = await res.json();
        return customer.email || null;
      }
    } catch { /* fall through */ }
  }
  return null;
}

// ─── Airtable: Find or Create Lead, Create Sale ────────────────────────────────

async function airtableFetch(table: string, options: { method?: string; body?: unknown; params?: string } = {}) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}${options.params ? `?${options.params}` : ''}`;
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });
  return res.json();
}

async function findLeadByEmail(email: string): Promise<{ id: string; fields: Record<string, unknown> } | null> {
  const formula = encodeURIComponent(`LOWER({Email}) = "${email.toLowerCase().trim()}"`);
  const data = await airtableFetch(AIRTABLE_LEADS_TABLE, { params: `filterByFormula=${formula}&maxRecords=1` });
  const records = data.records || [];
  return records.length > 0 ? records[0] : null;
}

async function createLead(email: string, fullName: string, phone?: string): Promise<string> {
  const nameParts = (fullName || '').trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const fields: Record<string, unknown> = {
    'First Name': firstName,
    'Email': email.toLowerCase().trim(),
    'Marketing Channel': 'Stripe',
    'Status': 'Close',
    'Lead Heat': 'Hot',
    'Sign-up Date': new Date().toISOString(),
    'Lead notes': 'Auto-created from Stripe PDF purchase (Build Your Own Appie v4.1)',
  };
  if (lastName) fields['Last Name'] = lastName;
  if (phone) fields['Phone'] = phone;

  const data = await airtableFetch(AIRTABLE_LEADS_TABLE, {
    method: 'POST',
    body: { fields, typecast: true },
  });
  return data.id;
}

async function createSale(
  leadId: string,
  email: string,
  fullName: string,
  amount: number,
  currency: string,
  discountCode?: string,
  invoiceId?: string,
  receiptUrl?: string,
  stripeFee?: number,
): Promise<string> {
  const fields: Record<string, unknown> = {
    'Full Name': fullName,
    'Email': email.toLowerCase().trim(),
    'Payment Date': new Date().toISOString(),
    'Lead': [leadId],
    'Currency': currency,
    'Amount': amount,
    'Product': 'UPI PDF',
    'Payment Status': 'complete',
    'Link Stripe': true,
  };
  if (discountCode) fields['Discount Code'] = discountCode;
  if (invoiceId) fields['Invoice'] = invoiceId;
  if (receiptUrl) fields['Receipt URL'] = receiptUrl;
  if (stripeFee) fields['Stripe Fee'] = stripeFee;

  const data = await airtableFetch(AIRTABLE_SALES_TABLE, {
    method: 'POST',
    body: { fields, typecast: true },
  });
  return data.id;
}

async function recordSaleInAirtable(session: {
  customer_details?: { email?: string; name?: string; phone?: string };
  customer_email?: string;
  amount_total?: number;
  currency?: string;
  total_details?: { amount_discount?: number };
  invoice?: string;
  payment_intent?: string;
  id: string;
}): Promise<void> {
  const email = (session.customer_details?.email || session.customer_email || '').toLowerCase().trim();
  const fullName = session.customer_details?.name || '';
  const phone = session.customer_details?.phone || undefined;
  const amount = (session.amount_total || 0) / 100;
  const currency = (session.currency || 'eur').toLowerCase();

  if (!email) {
    console.error('Airtable: no email, skipping sale recording');
    return;
  }

  // 1. Find existing lead or create new one
  let leadId: string;
  const existingLead = await findLeadByEmail(email);

  if (existingLead) {
    leadId = existingLead.id;
    console.log(`Airtable: found existing lead ${leadId} for ${email}`);
  } else {
    leadId = await createLead(email, fullName, phone);
    console.log(`Airtable: created new lead ${leadId} for ${email}`);
  }

  // 2. Get discount code if any (from Stripe line items)
  let discountCode: string | undefined;
  try {
    const lineItems = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session.id}/line_items?expand[]=data.discounts`,
      { headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` } }
    );
    const items = await lineItems.json();
    const discount = items.data?.[0]?.discounts?.[0];
    if (discount?.discount?.promotion_code) {
      // Fetch the promo code to get the human-readable code
      const promoRes = await fetch(
        `https://api.stripe.com/v1/promotion_codes/${discount.discount.promotion_code}`,
        { headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` } }
      );
      const promo = await promoRes.json();
      discountCode = promo.code || undefined;
    }
  } catch (err) {
    console.error('Airtable: error fetching discount code:', err);
  }

  // 3. Get Stripe fee from balance transaction
  let stripeFee: number | undefined;
  let receiptUrl: string | undefined;
  try {
    if (session.payment_intent) {
      const piRes = await fetch(
        `https://api.stripe.com/v1/payment_intents/${session.payment_intent}?expand[]=latest_charge`,
        { headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` } }
      );
      const pi = await piRes.json();
      const charge = pi.latest_charge;
      if (charge) {
        receiptUrl = charge.receipt_url || undefined;
        if (charge.balance_transaction && typeof charge.balance_transaction === 'string') {
          const btRes = await fetch(
            `https://api.stripe.com/v1/balance_transactions/${charge.balance_transaction}`,
            { headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` } }
          );
          const bt = await btRes.json();
          stripeFee = (bt.fee || 0) / 100;
        }
      }
    }
  } catch (err) {
    console.error('Airtable: error fetching Stripe fee:', err);
  }

  // 4. Create the sale record
  const saleId = await createSale(
    leadId, email, fullName, amount, currency,
    discountCode, session.invoice || undefined, receiptUrl, stripeFee
  );
  console.log(`Airtable: created sale ${saleId} for ${email} (€${amount}, ${discountCode || 'no discount'})`);
}

// ─── Email HTML Template ───────────────────────────────────────────────────────

function generateEmailHTML(firstName: string, password: string, downloadUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Your Appie Guide is Here</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    :root { color-scheme: light dark; }
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; }
    
    /* Dark mode overrides */
    @media (prefers-color-scheme: dark) {
      .email-wrapper { background-color: #031D16 !important; }
      .email-card { background-color: #0E3D31 !important; border-color: #247459 !important; }
      .text-dark { color: #F6FEFC !important; }
      .text-mid { color: rgba(246,254,252,0.75) !important; }
      .text-light { color: rgba(246,254,252,0.5) !important; }
      .step-box { background-color: #031D16 !important; border-color: #247459 !important; }
      .password-box { background-color: #0E3D31 !important; border-color: #DFB771 !important; }
      .divider-line { border-color: #247459 !important; }
      .cta-btn { background: linear-gradient(135deg, #247459, #0E3D31) !important; }
      .footer-text { color: rgba(246,254,252,0.4) !important; }
      .footer-link { color: #247459 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.6;">

  <!-- Wrapper -->
  <div class="email-wrapper" style="background-color:#f4f7f6;padding:40px 16px;">
    <div style="max-width:560px;margin:0 auto;">
      
      <!-- Logo -->
      <div style="text-align:center;margin-bottom:32px;">
        <img src="https://weblyfe.ai/logo-gold.svg" alt="Weblyfe" width="130" style="height:auto;" />
      </div>

      <!-- Card -->
      <div class="email-card" style="background-color:#ffffff;border-radius:16px;border:1px solid #e2e8f0;padding:40px 28px;">
        
        <!-- Header -->
        <div style="text-align:center;margin-bottom:28px;">
          <div style="font-size:48px;margin-bottom:8px;">🎉</div>
          <h1 class="text-dark" style="color:#031D16;font-size:26px;font-weight:800;margin:0 0 6px;">
            Hey ${firstName}, welcome!
          </h1>
          <p class="text-mid" style="color:#4a5568;font-size:15px;margin:0;">
            Your copy of <strong>Build Your Own Appie v4.1</strong> is ready to download.
          </p>
        </div>

        <!-- Divider -->
        <hr class="divider-line" style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

        <!-- Steps -->
        <p class="text-dark" style="color:#031D16;font-size:16px;font-weight:700;margin:0 0 16px;">
          Three steps to get started:
        </p>

        <!-- Step 1 -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:10px;">
          <tr>
            <td class="step-box" style="background:#f7faf9;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:top;padding-right:12px;">
                    <div style="background:#247459;color:#fff;width:26px;height:26px;border-radius:50%;text-align:center;line-height:26px;font-size:13px;font-weight:700;">1</div>
                  </td>
                  <td>
                    <p class="text-dark" style="color:#031D16;margin:0;font-size:14px;font-weight:600;">Click the download button below</p>
                    <p class="text-mid" style="color:#718096;margin:3px 0 0;font-size:13px;">Save the PDF to your device.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Step 2 -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:10px;">
          <tr>
            <td class="step-box" style="background:#f7faf9;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:top;padding-right:12px;">
                    <div style="background:#247459;color:#fff;width:26px;height:26px;border-radius:50%;text-align:center;line-height:26px;font-size:13px;font-weight:700;">2</div>
                  </td>
                  <td>
                    <p class="text-dark" style="color:#031D16;margin:0;font-size:14px;font-weight:600;">Open the PDF and start reading</p>
                    <p class="text-mid" style="color:#718096;margin:3px 0 0;font-size:13px;">62 pages of step-by-step instructions to build your AI employee.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Step 3 -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
          <tr>
            <td class="step-box" style="background:#f7faf9;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:top;padding-right:12px;">
                    <div style="background:#247459;color:#fff;width:26px;height:26px;border-radius:50%;text-align:center;line-height:26px;font-size:13px;font-weight:700;">3</div>
                  </td>
                  <td>
                    <p class="text-dark" style="color:#031D16;margin:0;font-size:14px;font-weight:600;">Follow the guide and build your Appie</p>
                    <p class="text-mid" style="color:#718096;margin:3px 0 0;font-size:13px;">Start from Chapter 1 and work your way through. Join our Discord if you need help.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA Button -->
        <div style="text-align:center;margin-bottom:20px;">
          <a href="${downloadUrl}" class="cta-btn" style="display:inline-block;background:linear-gradient(135deg,#247459,#1a5c45);color:#DFB771;text-decoration:none;padding:15px 44px;border-radius:10px;font-size:15px;font-weight:700;letter-spacing:0.3px;">
            &#128229;&nbsp; Download Your Guide
          </a>
        </div>

        <p class="text-light" style="color:#a0aec0;font-size:12px;text-align:center;margin:0;">
          This link is personal to your purchase. Please don't share it.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align:center;padding:24px 0 0;">
        <p class="footer-text" style="color:#718096;font-size:12px;margin:0 0 6px;">
          Questions? Reply to this email or contact <a href="mailto:hello@weblyfe.ai" class="footer-link" style="color:#247459;text-decoration:none;">hello@weblyfe.ai</a>
        </p>
        <p class="footer-text" style="color:#a0aec0;font-size:11px;margin:0;">
          &copy; 2026 Weblyfe.ai &middot; Techwiz LLC &middot; Rijswijk, NL
        </p>
      </div>

    </div>
  </div>
</body>
</html>`;
}

// ─── Send PDF Delivery Email ───────────────────────────────────────────────────

async function sendPDFDeliveryEmail(email: string, firstName: string): Promise<void> {
  const password = email.toLowerCase().trim();
  const token = generateDownloadToken(email);
  const downloadUrl = `https://weblyfe.ai/api/download/appie-guide?token=${token}`;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Weblyfe', email: 'seyed@weblyfe.nl' },
      to: [{ email, name: firstName || 'there' }],
      replyTo: { email: 'hello@weblyfe.ai', name: 'Weblyfe' },
      subject: 'Your Appie Guide is here! 🎉',
      htmlContent: generateEmailHTML(firstName || 'there', password, downloadUrl),
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error('Brevo send error:', err);
    throw new Error(`Brevo error: ${res.status}`);
  }
}

// ─── Webhook Handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    if (!verifyStripeSignature(body, signature)) {
      console.error('Stripe webhook: invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      if (session.payment_status !== 'paid') {
        console.log('Webhook: session not paid, skipping:', session.id);
        return NextResponse.json({ received: true });
      }

      const email = await getCustomerEmail(session);
      if (!email) {
        console.error('Webhook: no email for session:', session.id);
        return NextResponse.json({ error: 'No customer email' }, { status: 400 });
      }

      const fullName = session.customer_details?.name || '';
      const firstName = fullName.split(/\s+/)[0] || '';

      console.log(`Webhook: delivering PDF to ${email} (${firstName})`);

      // Record sale in Airtable (find/create lead + create sale)
      try {
        await recordSaleInAirtable(session);
      } catch (airtableErr) {
        console.error('Webhook: Airtable error (non-blocking):', airtableErr);
      }

      // Send delivery email
      await sendPDFDeliveryEmail(email.toLowerCase().trim(), firstName);
      console.log(`Webhook: delivery email sent to ${email}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
