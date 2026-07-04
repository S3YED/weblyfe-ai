// Case-study refresh for weblyfe.ai /pdf landing page.
// Updated 2026-06-16. Only real, verifiable client wins. Conservative phrasing.
// BeyondSchool removed per instruction. Ben de Voorman and CZA Bouwbedrijf are
// the SAME client (CZA Ben de Voorman) per the source case study, so they are
// consolidated into one honest entry instead of two.

const CASE_STUDIES = [
  // Source: existing /pdf page + memory/eva-bot-documentation.md (Eva live on OpenClaw for Dubai-Property.nl, CRM lead pipeline + morning briefing). Metrics retained from prior verified entry.
  {
    name: 'Eva',
    client: 'Dubai-Property.nl',
    quote:
      'Eva vangt elke lead direct op en zet het ochtendbriefing van hete leads klaar voor het team.',
    metrics: [
      { label: 'Lead-capture', value: '3 min naar <2 sec' },
      { label: 'E-mailrespons', value: '2-4 uur naar <5 min' },
    ],
    image: '/screenshots/dubai-property.avif',
  },

  // Source: projects/weblyfe-ai/content/case-studies/cza-ben-de-voorman.md (CZA Ben de Voorman, construction, WhatsApp lead-qualifier with Monday.com sync). Metrics taken verbatim from that case study.
  {
    name: 'CZA Ben de Voorman',
    client: 'Bouwbedrijf',
    quote:
      'Een WhatsApp-Techwiz die elke aanvraag direct beantwoordt, kwalificeert en in Monday.com zet. Ook na werktijd.',
    metrics: [
      { label: 'Responstijd', value: '4-24 uur naar <2 min' },
      { label: 'Kwalificatiewerk', value: '15+ uur naar <2 uur per week' },
    ],
    image: '/screenshots/cza-fresh.avif',
  },

  // Source: projects/weblyfe-ai/content/case-studies/privanotify.md + MEMORY reference_privanotify_deploy_key. Privacy SaaS, multi-Appie ops. Metric retained from prior verified entry (qualitative tasks/day).
  {
    name: 'Privanotify',
    client: 'Privacy SaaS',
    quote:
      'GDPR-monitoring, alerts en compliance-audit draaien volledig geautomatiseerd over meerdere Appies.',
    metrics: [{ label: 'Dagelijkse taken', value: '50+ via 3 Appies' }],
    image: '/screenshots/privanotify-fresh.jpg',
  },

  // Source: projects/luminaire-coaching/site-analysis.md + brand-strategy-intake.md (Hamid Zahedi, Luminaire Coaching; Artemis doet readings, content en business building). Time-saved metric retained from prior verified entry.
  {
    name: 'Luminaire Coaching · Hamid Zahedi',
    client: 'Spiritual coaching',
    quote:
      'Artemis doet readings, content creation en business building, zodat Hamid tijd vrij maakt voor klantgesprekken.',
    metrics: [{ label: 'Tijd bespaard', value: '18 uur per week' }],
    image: '/agents/artemis.jpg',
  },

  // Source: agents/deadpool-roslan/SOUL.md + config.yaml + gateway-status.txt (active) + last-synced.txt (2026-06-16). Live Techwiz voor Roslan/EKO met GHL, Airtable en Exa. Geen geverifieerde cijfers, dus kwalitatief.
  {
    name: 'Deadpool · Roslan (EKO)',
    client: 'E-commerce',
    quote:
      'Een persoonlijke Techwiz die GHL, Airtable en research aanstuurt en het echte werk op de achtergrond regelt.',
    metrics: [{ label: 'Status', value: 'Live, draait dagelijks' }],
    image: '/agents/appie-iconic.avif',
  },

  // Source: projects/nathan-nuyts/HANDOFF.md (site live op Vercel, returns 200; €1.315 betaald). Personal brand. Geen automatiseringsmetric, dus eerlijke kwalitatieve uitkomst.
  {
    name: 'Nathan Nuyts',
    client: 'Personal brand',
    quote:
      'Volledige personal-brand site live opgeleverd, met editorial design en eigen merkassets.',
    metrics: [{ label: 'Resultaat', value: 'Live site, opgeleverd' }],
    image: '/agents/appie.jpg',
  },

  // Source: projects/soleiman-advocatuur/client-content/completion-report.md (2026-06-13: brand audit, NL marketingplan, Next.js landingspagina, browser-QA). Advocatuur. Geen cijfer, kwalitatief.
  {
    name: 'Soleiman Advocatuur',
    client: 'Advocatuur',
    quote:
      'Merkaudit, marketingplan en een nieuwe landingspagina opgeleverd voor een advocatenkantoor.',
    metrics: [{ label: 'Resultaat', value: 'Merk + site opgeleverd' }],
    image: '/agents/appie.jpg',
  },
];
