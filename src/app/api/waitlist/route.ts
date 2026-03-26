import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_WEBLYFE_BASE_ID!;
const AIRTABLE_TABLE_ID = 'tblXjrB8K4Mc6U8Xu'; // 🧲 Leads (Weblyfe University)
const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const BREVO_LIST_ID = 18; // Weblyfe.ai Appie Waitlist

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, package: pkg } = await req.json();

    // Normalize email
    const normalizedEmail = (email || '').toLowerCase().trim();
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Normalize phone (strip spaces, ensure + prefix)
    let normalizedPhone = (phone || '').replace(/[\s\-\(\)]/g, '').trim();
    if (normalizedPhone && !normalizedPhone.startsWith('+')) {
      normalizedPhone = '+' + normalizedPhone;
    }

    // Split name into first/last
    const nameParts = (name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Map package to a readable note
    const packageLabels: Record<string, string> = {
      diy: 'DIY - Build Your Own Appie (€65)',
      managed: 'Instant Appie - Done With You (€250/mo)',
      enterprise: 'Custom Solution - Done For You (€2,000+)',
      general: 'General Waitlist Signup',
    };
    const packageNote = packageLabels[pkg] || packageLabels.general;

    // --- 1. Airtable: Create lead ---
    const airtableFields: Record<string, unknown> = {
      'First Name': firstName,
      'Email': normalizedEmail,
      'Marketing Channel': 'Appie Waitlist',
      'Status': 'Waitlist',
      'Lead Heat': 'Warm',
      'Sign-up Date': new Date().toISOString().split('T')[0],
      'Lead notes': `OpenClaw Waitlist Signup\nPackage: ${packageNote}\nSource: weblyfe.ai/openclaw`,
    };
    if (lastName) airtableFields['Last Name'] = lastName;
    if (phone) airtableFields['Phone'] = phone;

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: airtableFields, typecast: true }),
      }
    );

    if (!airtableRes.ok) {
      const err = await airtableRes.json();
      console.error('Airtable error:', err);
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    // --- 2. Brevo: Add to waitlist ---
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          attributes: {
            FIRSTNAME: firstName,
            LASTNAME: lastName,
            ...(phone ? { SMS: normalizedPhone } : {}),
          },
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
        }),
      });
    } catch (brevoErr) {
      console.error('Brevo error (non-blocking):', brevoErr);
    }

    // --- 3. Brevo: Send confirmation email (template #21) ---
    try {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: 21,
          to: [{ email: normalizedEmail, name: firstName || 'there' }],
          params: {
            FIRSTNAME: firstName || 'there',
            PACKAGE: packageNote,
          },
        }),
      });
    } catch (emailErr) {
      console.error('Confirmation email error (non-blocking):', emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
