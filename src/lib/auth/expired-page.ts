// Inline HTML for the 410 Gone and 500 Internal responses on /appie/auth/verify.
// We return a real HTML body (not a redirect) so the existing E2E test that
// asserts status 410 keeps passing while customers see a branded page instead
// of plain text.

export function renderInternalErrorHtml(): string {
  return renderInline({
    kicker: '500 · Server hapert',
    title: 'Er ging iets mis',
    body: 'We konden je link nu niet verwerken. Probeer het zo opnieuw, of vraag een nieuwe link aan.',
    cta: { href: '/appie/auth/login', label: 'Nieuwe link aanvragen' },
  });
}

export function renderExpiredLinkHtml(): string {
  return renderInline({
    kicker: '410 · Link niet meer geldig',
    title: 'Deze link is verlopen<br/>of al gebruikt.',
    body: "Geen probleem. Vraag een nieuwe link aan en we sturen 'm direct naar je inbox.",
    cta: { href: '/appie/auth/login', label: 'Vraag een nieuwe link aan' },
  });
}

type InlineArgs = {
  kicker: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
};

function renderInline(args: InlineArgs): string {
  return _renderShell(args);
}

function _renderShell(args: InlineArgs): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="theme-color" content="#031D16" />
<title>${args.kicker.replace(/<[^>]+>/g, '')} | Instant Appie</title>
<style>
  *,*::before,*::after{box-sizing:border-box}
  html,body{margin:0;padding:0;background:#031D16;color:#F6FEFC;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
  body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px 20px;position:relative;overflow:hidden}
  .glow1,.glow2{position:absolute;border-radius:50%;filter:blur(120px);pointer-events:none}
  .glow1{top:-180px;right:-180px;width:520px;height:520px;background:radial-gradient(circle,rgba(223,183,113,0.18) 0%,transparent 65%)}
  .glow2{bottom:-180px;left:-180px;width:520px;height:520px;background:radial-gradient(circle,rgba(36,116,89,0.22) 0%,transparent 65%)}
  .card{position:relative;max-width:520px;width:100%;text-align:center;border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.025);border-radius:28px;padding:48px 32px;backdrop-filter:blur(24px)}
  .icon{display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:24px;background:rgba(223,183,113,0.12);border:1px solid rgba(223,183,113,0.3);margin-bottom:28px}
  .icon svg{width:30px;height:30px;color:#DFB771;stroke:#DFB771}
  .kicker{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#DFB771;font-weight:600;margin:0 0 12px}
  h1{margin:0;font-size:32px;line-height:1.1;letter-spacing:-0.5px;font-weight:700}
  p{font-size:15px;line-height:1.55;color:rgba(246,254,252,0.6);margin:16px 0 0}
  a.cta{display:inline-flex;align-items:center;gap:10px;margin-top:32px;padding:0 28px;height:54px;border-radius:999px;background:#DFB771;color:#031D16;font-weight:700;text-decoration:none;font-size:14px;letter-spacing:-0.2px;box-shadow:0 18px 50px -15px rgba(223,183,113,0.7);transition:transform .2s ease,background .2s ease}
  a.cta:hover{background:#e8c889;transform:translateY(-2px)}
  .meta{margin-top:24px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(246,254,252,0.3)}
</style>
</head>
<body>
  <div class="glow1"></div>
  <div class="glow2"></div>
  <main class="card">
    <span class="icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    </span>
    <p class="kicker">${args.kicker}</p>
    <h1>${args.title}</h1>
    <p>${args.body}</p>
    <a class="cta" href="${args.cta.href}">${args.cta.label} &nbsp;&rarr;</a>
    <p class="meta">Weblyfe.ai · Instant Appie</p>
  </main>
</body>
</html>`;
}
