import { NextRequest, NextResponse } from 'next/server';
import { buildTrackedOpenClawUrl } from '@/lib/appie-guide-funnel';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_WEBLYFE_BASE_ID;
const AIRTABLE_TABLE_ID = 'tblXjrB8K4Mc6U8Xu';
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = Number(process.env.BREVO_APPIE_GUIDE_LIST_ID || 18);
const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const APPIE_GUIDE_LEAD_SECRET = process.env.APPIE_GUIDE_LEAD_SECRET;

type LeadBody = {
  email?: unknown;
  name?: unknown;
  video_id?: unknown;
  source?: unknown;
  medium?: unknown;
  campaign?: unknown;
  content?: unknown;
  primary_pain?: unknown;
};

type LeadData = {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  videoId: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  primaryPain: string;
  trackedUrl: string;
};

function stringValue(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function validate(body: LeadBody): { ok: true; data: LeadData } | { ok: false; error: string } {
  const email = stringValue(body.email).toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Valid email required' };
  }

  const name = stringValue(body.name);
  const nameParts = name.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || 'daar';
  const lastName = nameParts.slice(1).join(' ');
  const videoId = stringValue(body.video_id, 'unknown').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'unknown';
  const source = stringValue(body.source, 'instagram_dm_appie').slice(0, 80);
  const medium = stringValue(body.medium, 'email').slice(0, 80);
  const campaign = stringValue(body.campaign, 'appie_ai_guide_3day_test').slice(0, 120);
  const content = stringValue(body.content, videoId === 'unknown' ? 'dm_appie_email_bridge' : videoId).slice(0, 120);
  const primaryPain = stringValue(body.primary_pain, '').slice(0, 300);
  const trackedUrl = buildTrackedOpenClawUrl({ source, medium, campaign, content });

  return {
    ok: true,
    data: { email, name, firstName, lastName, videoId, source, medium, campaign, content, primaryPain, trackedUrl },
  };
}

async function upsertBrevoContact(lead: LeadData) {
  if (!BREVO_API_KEY) {
    console.log(`[brevo:dev-stub] would add guide lead ${lead.email}`);
    return;
  }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: lead.email,
      attributes: {
        FIRSTNAME: lead.firstName,
        LASTNAME: lead.lastName,
        SOURCE: lead.source,
        UTM_SOURCE: lead.source,
        UTM_MEDIUM: lead.medium,
        UTM_CAMPAIGN: lead.campaign,
        UTM_CONTENT: lead.content,
        VIDEO_ID: lead.videoId,
        PRIMARY_PAIN: lead.primaryPain,
      },
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    }),
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text().catch(() => '');
    throw new Error(`Brevo contact failed: ${res.status} ${text}`);
  }
}

async function createAirtableLead(lead: LeadData) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.log(`[airtable:dev-stub] would create guide lead ${lead.email}`);
    return;
  }

  const fields: Record<string, unknown> = {
    'First Name': lead.firstName,
    'Email': lead.email,
    'Marketing Channel': 'Instagram DM Appie',
    'Status': 'Guide Requested',
    'Lead Heat': 'Warm',
    'Sign-up Date': new Date().toISOString().split('T')[0],
    'Lead notes': [
      'Appie guide requested from DM Appie bridge',
      `Video: ${lead.videoId}`,
      `Source: ${lead.source}`,
      `Medium: ${lead.medium}`,
      `Campaign: ${lead.campaign}`,
      `Content: ${lead.content}`,
      lead.primaryPain ? `Pain: ${lead.primaryPain}` : null,
      `Tracked funnel link: ${lead.trackedUrl}`,
    ].filter(Boolean).join('\n'),
  };
  if (lead.lastName) fields['Last Name'] = lead.lastName;

  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields, typecast: true }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Airtable lead failed: ${res.status} ${text}`);
  }
}

function renderGuideEmailText(lead: LeadData) {
  return `Hoi ${lead.firstName},

Hier is de Appie guide:
${lead.trackedUrl}

Je ziet hoe ik een AI employee bouw die inbox, leads, content, dashboards en follow-ups kan overnemen.

Mijn advies: open de pagina, koop de guide, en reply op deze mail met wat jij als eerste door Appie wil laten overnemen: leads, admin, content, support of operations.

Tot zo,
Seyed · Weblyfe.ai`;
}

function renderGuideEmailHtml(lead: LeadData) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Je Appie guide</title>
</head>
<body style="margin:0;padding:0;background:#020e0a;font-family:Helvetica,Arial,sans-serif;color:#F6FEFC;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#020e0a;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#031D16;border:1px solid rgba(223,183,113,0.2);border-radius:24px;overflow:hidden;">
          <tr><td style="padding:36px 36px 8px 36px;color:#DFB771;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">Weblyfe · Appie</td></tr>
          <tr><td style="padding:12px 36px 0 36px;"><h1 style="margin:0;color:#F6FEFC;font-size:32px;line-height:1.12;">Je Appie guide staat klaar.</h1></td></tr>
          <tr><td style="padding:20px 36px 0 36px;"><p style="margin:0;color:#c8d4cf;font-size:16px;line-height:1.55;">Hoi ${lead.firstName}, hier is de guide waarmee je je eigen AI employee kunt bouwen. Inbox, leads, content, dashboards en follow-ups. Praktisch, niet theoretisch.</p></td></tr>
          <tr><td style="padding:30px 36px 8px 36px;"><a href="${lead.trackedUrl}" style="display:inline-block;background:#DFB771;color:#031D16;text-decoration:none;font-weight:800;border-radius:999px;padding:16px 28px;">Open de Appie guide →</a></td></tr>
          <tr><td style="padding:20px 36px 0 36px;"><div style="background:#020e0a;border:1px solid rgba(223,183,113,0.14);border-radius:16px;padding:18px 20px;"><p style="margin:0 0 6px 0;color:#DFB771;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Snelle vraag</p><p style="margin:0;color:#c8d4cf;font-size:15px;line-height:1.55;">Reply op deze mail met wat jij als eerste door Appie wil laten overnemen: leads, admin, content, support of operations.</p></div></td></tr>
          <tr><td style="padding:22px 36px 36px 36px;"><p style="margin:0;color:#7a8983;font-size:12px;line-height:1.55;">Werkt de knop niet? Plak deze link in je browser:<br/><a href="${lead.trackedUrl}" style="color:#DFB771;word-break:break-all;text-decoration:none;">${lead.trackedUrl}</a></p></td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendGuideEmail(lead: LeadData) {
  if (!BREVO_API_KEY) {
    console.log(`[brevo:dev-stub] would send Appie guide link to ${lead.email}: ${lead.trackedUrl}`);
    return;
  }

  const res = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: 'seyed@weblyfe.ai', name: 'Seyed · Weblyfe' },
      to: [{ email: lead.email, name: lead.name || lead.email }],
      subject: 'Je Appie guide staat klaar',
      htmlContent: renderGuideEmailHtml(lead),
      textContent: renderGuideEmailText(lead),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Brevo email failed: ${res.status} ${text}`);
  }
}

export async function POST(req: NextRequest) {
  if (APPIE_GUIDE_LEAD_SECRET) {
    const providedSecret = req.headers.get('x-appie-guide-secret');
    if (providedSecret !== APPIE_GUIDE_LEAD_SECRET) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
  }

  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const result = validate(body);
  if (result.ok === false) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  }

  const { data } = result;
  try {
    await upsertBrevoContact(data);
    await createAirtableLead(data);
    await sendGuideEmail(data);
  } catch (err) {
    console.error('Appie guide lead failed:', err);
    return NextResponse.json({ success: false, error: 'Could not send guide link' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Guide link sent',
    trackedUrl: data.trackedUrl,
  });
}
