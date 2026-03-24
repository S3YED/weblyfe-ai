import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const WAITLIST_ID = 18; // "Weblyfe.ai Appie Waitlist"
const CONFIRMATION_TEMPLATE_ID = 21; // "Your spot is saved ✅"

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Step 1: Create/update contact in Brevo with list assignment
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name || '',
          SMS: phone || '',
        },
        listIds: [WAITLIST_ID],
        updateEnabled: true,
      }),
    });

    const contactData = await contactRes.json().catch(() => ({}));

    if (!contactRes.ok && contactRes.status !== 204) {
      // Contact might already exist, try update
      if (contactData?.code === 'duplicate_parameter') {
        await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: {
            'api-key': BREVO_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            attributes: {
              FIRSTNAME: name || '',
              SMS: phone || '',
            },
            listIds: [WAITLIST_ID],
          }),
        });
      }
    }

    // Step 2: Send confirmation email via template
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        templateId: CONFIRMATION_TEMPLATE_ID,
        to: [{ email, name: name || '' }],
        params: {
          FIRSTNAME: name || 'there',
        },
      }),
    });

    if (!emailRes.ok) {
      console.error('Confirmation email failed:', await emailRes.text());
    }

    return NextResponse.json({ success: true, message: 'Spot saved' });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
