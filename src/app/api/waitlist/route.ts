import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_WEBLYFE_BASE_ID!;
const AIRTABLE_TABLE_ID = 'tblXjrB8K4Mc6U8Xu'; // 🧲 Leads (WeblyfeUniversity)

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const fields: Record<string, string> = {
      'First Name': name || '',
      'Email': email,
      'Marketing Channel': 'Waitlist University',
      'Status': 'Waitlist',
    };

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
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
