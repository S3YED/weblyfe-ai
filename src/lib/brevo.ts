// Brevo Transactional Email helper. Used to send the magic link email.
// Per PRD: subject "Je Instant Appie wachtwoordloze link"; sender seyed@weblyfe.ai.

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

export type SendMagicLinkArgs = {
  toEmail: string;
  toName?: string;
  magicLinkUrl: string;
};

export type SendResult =
  | { ok: true; messageId?: string }
  | { ok: false; status: number; body: string };

export async function sendMagicLinkEmail(
  args: SendMagicLinkArgs,
  apiKey: string | undefined = process.env.BREVO_API_KEY
): Promise<SendResult> {
  if (!apiKey) {
    // Graceful degradation in dev: log and pretend it succeeded.
    // eslint-disable-next-line no-console
    console.log(`[brevo:dev-stub] would email ${args.toEmail}: ${args.magicLinkUrl}`);
    return { ok: true, messageId: 'dev-stub' };
  }

  const body = {
    sender: { email: 'seyed@weblyfe.ai', name: 'Appie · Weblyfe' },
    to: [{ email: args.toEmail, name: args.toName ?? args.toEmail }],
    subject: 'Je Instant Appie wachtwoordloze link',
    htmlContent: renderMagicLinkHtml(args),
    textContent: renderMagicLinkText(args),
  };

  const res = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, status: res.status, body: text };
  }
  const data = (await res.json().catch(() => ({}))) as { messageId?: string };
  return { ok: true, messageId: data.messageId };
}

function renderMagicLinkText(args: SendMagicLinkArgs): string {
  return `Hoi,

Klik op deze link om je Instant Appie te activeren. De link werkt 15 minuten en kan maar één keer gebruikt worden.

${args.magicLinkUrl}

Heb je deze niet aangevraagd, negeer deze mail.

Tot zo,
Appie`;
}

function renderMagicLinkHtml(args: SendMagicLinkArgs): string {
  // Minimal table-based email layout. Brand: #031D16 + #DFB771.
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:40px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#031D16;border-radius:16px;overflow:hidden;">
          <tr><td style="padding:48px 40px 32px 40px;color:#ffffff;">
            <p style="font-size:14px;color:#DFB771;margin:0 0 8px 0;letter-spacing:1px;text-transform:uppercase;">Instant Appie</p>
            <h1 style="margin:0 0 16px 0;font-size:24px;line-height:1.3;color:#ffffff;">Je wachtwoordloze link</h1>
            <p style="margin:0 0 24px 0;font-size:16px;line-height:1.5;color:#cccccc;">Klik op de knop om je Appie te activeren. De link werkt 15 minuten en kan maar één keer gebruikt worden.</p>
            <p style="margin:0 0 32px 0;">
              <a href="${args.magicLinkUrl}" style="display:inline-block;background:#DFB771;color:#031D16;text-decoration:none;font-weight:700;padding:14px 24px;border-radius:8px;font-size:16px;">Activeer mijn Appie</a>
            </p>
            <p style="margin:0;font-size:12px;color:#888888;">Heb je deze niet aangevraagd? Negeer dan deze mail.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}
