import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_BETA_LIST_ID = Number(process.env.BREVO_BETA_LIST_ID || 19);
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_ALERT_CHAT_ID = process.env.TELEGRAM_ALERT_CHAT_ID;
const BREVO_BETA_TEMPLATE_ID = process.env.BREVO_BETA_TEMPLATE_ID
  ? Number(process.env.BREVO_BETA_TEMPLATE_ID)
  : null;

const ALLOWED_USE_CASES = new Set([
  'E-mail en inbox beheren',
  'Lead-opvolging en CRM',
  'Agendabeheer en afspraken',
  'Content en social media',
  'Financiele admin (facturen, herinneringen)',
  'Combinatie van bovenstaande',
]);

type SignupBody = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  primary_use_case?: unknown;
  telegram_handle?: unknown;
  why_5_plekken?: unknown;
};

type ValidationError = { field: string; message: string };

function validate(body: SignupBody): {
  ok: boolean;
  errors: ValidationError[];
  data: {
    name: string;
    email: string;
    company: string;
    primary_use_case: string;
    telegram_handle: string | null;
    why_5_plekken: string;
  };
} {
  const errors: ValidationError[] = [];

  const nameRaw = typeof body.name === 'string' ? body.name.trim() : '';
  if (nameRaw.length < 2) errors.push({ field: 'name', message: 'Vul je voor- en achternaam in.' });

  const emailRaw = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!emailRaw || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
    errors.push({ field: 'email', message: 'Ongeldig e-mailadres.' });
  }

  const companyRaw = typeof body.company === 'string' ? body.company.trim() : '';
  if (companyRaw.length < 2) errors.push({ field: 'company', message: 'Bedrijfsnaam is verplicht.' });

  const useCaseRaw =
    typeof body.primary_use_case === 'string' ? body.primary_use_case.trim() : '';
  if (!ALLOWED_USE_CASES.has(useCaseRaw)) {
    errors.push({ field: 'primary_use_case', message: 'Kies een use case.' });
  }

  let telegramRaw =
    typeof body.telegram_handle === 'string' ? body.telegram_handle.trim() : '';
  if (telegramRaw.startsWith('@')) telegramRaw = telegramRaw.slice(1);
  if (telegramRaw.length > 64) {
    errors.push({ field: 'telegram_handle', message: 'Telegram-handle te lang.' });
  }

  const whyRaw =
    typeof body.why_5_plekken === 'string' ? body.why_5_plekken.trim() : '';
  if (whyRaw.length < 30 || whyRaw.length > 500) {
    errors.push({
      field: 'why_5_plekken',
      message: 'Schrijf 30 tot 500 tekens over waarom jij in de beta wil.',
    });
  }

  return {
    ok: errors.length === 0,
    errors,
    data: {
      name: nameRaw,
      email: emailRaw,
      company: companyRaw,
      primary_use_case: useCaseRaw,
      telegram_handle: telegramRaw || null,
      why_5_plekken: whyRaw,
    },
  };
}

async function addToBrevo(payload: {
  name: string;
  email: string;
  company: string;
  primary_use_case: string;
  telegram_handle: string | null;
  why_5_plekken: string;
}) {
  if (!BREVO_API_KEY) {
    throw new Error('BREVO_API_KEY not configured');
  }
  const nameParts = payload.name.split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        COMPANY: payload.company,
        PRIMARY_USE_CASE: payload.primary_use_case,
        TELEGRAM_HANDLE: payload.telegram_handle || '',
        WHY_5_PLEKKEN: payload.why_5_plekken,
        SOURCE: 'beta-landing',
      },
      listIds: [BREVO_BETA_LIST_ID],
      updateEnabled: true,
    }),
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text().catch(() => '');
    throw new Error(`Brevo contact failed: ${res.status} ${text}`);
  }
}

async function sendTelegramAlert(payload: {
  name: string;
  email: string;
  company: string;
  primary_use_case: string;
  telegram_handle: string | null;
  why_5_plekken: string;
}): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ALERT_CHAT_ID) {
    return;
  }
  const text = [
    'Nieuwe beta-aanmelding:',
    `Naam: ${payload.name}`,
    `Email: ${payload.email}`,
    `Bedrijf: ${payload.company}`,
    `Use case: ${payload.primary_use_case}`,
    `Telegram: ${payload.telegram_handle || 'niet opgegeven'}`,
    `Motivatie: ${payload.why_5_plekken}`,
  ].join('\n');

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_ALERT_CHAT_ID,
      text,
      disable_web_page_preview: true,
    }),
  });
}

async function sendConfirmationEmail(payload: { email: string; name: string }) {
  if (!BREVO_API_KEY) return;

  const subject = 'We hebben je aanmelding ontvangen';
  const firstName = payload.name.split(/\s+/)[0] || 'daar';
  const htmlContent = `
    <p>Hoi ${firstName},</p>
    <p>Bedankt voor je aanmelding voor de Instant Appie beta. Seyed neemt persoonlijk binnen 24 uur contact met je op om te kijken of je past bij de eerste 5-10 plekken.</p>
    <p>Tot snel,<br/>Seyed - Weblyfe</p>
  `.trim();

  if (BREVO_BETA_TEMPLATE_ID) {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        templateId: BREVO_BETA_TEMPLATE_ID,
        to: [{ email: payload.email, name: payload.name }],
        params: { FIRSTNAME: firstName },
      }),
    });
    return;
  }

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Seyed - Weblyfe', email: 'seyed@weblyfe.nl' },
      to: [{ email: payload.email, name: payload.name }],
      subject,
      htmlContent,
    }),
  });
}

export async function POST(req: NextRequest) {
  let body: SignupBody = {};
  try {
    body = (await req.json()) as SignupBody;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { ok, errors, data } = validate(body);
  if (!ok) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  try {
    await addToBrevo(data);
  } catch (err) {
    console.error('Brevo signup failed:', err);
    return NextResponse.json(
      { success: false, message: 'Internal error' },
      { status: 500 }
    );
  }

  // Non-blocking side effects (do not fail the request if these break)
  sendTelegramAlert(data).catch((err) =>
    console.error('Telegram alert failed (non-blocking):', err)
  );
  sendConfirmationEmail({ email: data.email, name: data.name }).catch((err) =>
    console.error('Confirmation email failed (non-blocking):', err)
  );

  return NextResponse.json({
    success: true,
    message: 'Aanmelding ontvangen',
  });
}
