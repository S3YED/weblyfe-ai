// Brevo Transactional Email helper. Used to send the magic link email.
// Subject "Je Instant Appie wacht op je" (refreshed 2026-05-08); sender seyed@weblyfe.ai.

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
    subject: 'Je Instant Appie wacht op je',
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

Je Instant Appie wacht op je. Klik onderstaande link om je Techwiz op te zetten. De link werkt 15 minuten en kan één keer gebruikt worden.

${args.magicLinkUrl}

Heb je deze niet aangevraagd, negeer deze mail.

Tot zo,
Appie · Weblyfe.ai`;
}

function renderMagicLinkHtml(args: SendMagicLinkArgs): string {
  // Dark-mode-by-default magazine-style email. Brand: #031D16 + #DFB771.
  // All inline styles for client compatibility (Outlook + Gmail + Apple Mail).
  // Bulletproof button: padding on the <a> + a fallback table for Outlook.
  const safeUrl = args.magicLinkUrl;
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark light" />
<title>Je Instant Appie wacht op je</title>
</head>
<body style="margin:0;padding:0;background:#020e0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#F6FEFC;">
  <span style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    Je wachtwoordloze setup-link wacht op je. Werkt 15 minuten.
  </span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#020e0a;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#031D16;border-radius:24px;overflow:hidden;border:1px solid rgba(223,183,113,0.18);">
          <tr>
            <td style="padding:40px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:3px;color:#DFB771;text-transform:uppercase;font-weight:600;">
                    Weblyfe · Instant Appie
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 8px 40px;">
              <h1 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:34px;line-height:1.1;font-weight:700;color:#F6FEFC;letter-spacing:-0.4px;">
                Je Instant Appie<br/>wacht op je.
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 0 40px;">
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#c8d4cf;">
                Klik op de knop om je Techwiz op te zetten. De link werkt 15 minuten en kan één keer gebruikt worden.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 8px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#DFB771" style="border-radius:999px;">
                    <a href="${safeUrl}" style="display:inline-block;padding:16px 32px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;letter-spacing:-0.2px;color:#031D16;text-decoration:none;border-radius:999px;background:#DFB771;">
                      Start setup &nbsp;&rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 8px 40px;">
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.55;color:#7a8983;">
                Werkt de knop niet? Plak deze link in je browser:<br/>
                <a href="${safeUrl}" style="color:#DFB771;text-decoration:none;word-break:break-all;">${safeUrl}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 0 40px;">
              <div style="height:1px;background:rgba(223,183,113,0.18);"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 40px 40px;">
              <p style="margin:0 0 6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.55;color:#7a8983;">
                Heb je dit niet aangevraagd? Negeer dan deze mail. Niemand kan zonder de link bij je Appie.
              </p>
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1px;color:#3f5048;text-transform:uppercase;">
                Weblyfe.ai · Persoonlijke Techwiz
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#3f5048;">
          Vragen? Reply op deze mail. We lezen mee.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
