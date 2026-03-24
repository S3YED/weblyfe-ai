import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appnFsOtzH5LbsoF5';
const AIRTABLE_TABLE_NAME = encodeURIComponent('🧲 Leads');
const WAITLIST_ID = 18; // "Weblyfe.ai Appie Waitlist"
const CONFIRMATION_TEMPLATE_ID = 21; // "Your spot is saved ✅"

async function addToAirtable(name: string, email: string, phone: string) {
  if (!AIRTABLE_API_KEY) {
    console.error('AIRTABLE_API_KEY not configured');
    return;
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                'First Name': name || '',
                Email: email,
                Phone: phone || '',
                Status: 'Opt-In',
                'Marketing Channel': 'OpenClaw Waitlist',
                'Lead notes': 'Signed up via weblyfe.ai/openclaw waitlist',
                Created: new Date().toISOString(),
              },
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('Airtable error:', err);
    }
  } catch (error) {
    console.error('Airtable push failed:', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Run Brevo + Airtable in parallel
    const brevoPromise = (async () => {
      if (!BREVO_API_KEY) {
        console.error('BREVO_API_KEY not configured');
        return;
      }

      // Create/update contact in Brevo with list assignment
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
        if (contactData?.code === 'duplicate_parameter') {
          await fetch(
            `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
            {
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
            }
          );
        }
      }

      // Send confirmation email
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
    })();

    const airtablePromise = addToAirtable(name || '', email, phone || '');

    await Promise.all([brevoPromise, airtablePromise]);

    return NextResponse.json({ success: true, message: 'Spot saved' });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
