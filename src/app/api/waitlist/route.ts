import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_WEBLYFE_BASE_ID!;
const AIRTABLE_TABLE_ID = 'tblXjrB8K4Mc6U8Xu'; // 🧲 Leads (Weblyfe University)

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, package: pkg } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Split name into first/last if possible
    const nameParts = (name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Map package to a readable note
    const packageLabels: Record<string, string> = {
      diy: 'DIY - Build Your Own Appie (€59)',
      managed: 'Managed Setup - We Deploy For You ($280)',
      enterprise: 'Full AI Infrastructure (€2,000+/mo)',
      general: 'General Waitlist Signup',
    };
    const packageNote = packageLabels[pkg] || packageLabels.general;

    const fields: Record<string, unknown> = {
      'First Name': firstName,
      'Email': email,
      'Marketing Channel': { name: 'Waitlist Page' },
      'Status': { name: 'Waitlist' },
      'Lead Heat': { name: 'Warm' },
      'Lead notes': `OpenClaw Waitlist Signup\nPackage: ${packageNote}\nSource: weblyfe.ai/openclaw`,
    };

    if (lastName) fields['Last Name'] = lastName;
    if (phone) fields['Phone'] = phone;

    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error('Airtable error:', err);

      // Handle duplicate email (Airtable doesn't have unique constraint, but check anyway)
      if (err?.error?.type === 'INVALID_REQUEST_UNKNOWN') {
        return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
      }

      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
