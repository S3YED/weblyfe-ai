/**
 * BRAND-CONSTANTS.ts — Single source of truth for weblyfe.ai
 *
 * Every customer-facing surface (homepage, /appie, emails, FAQ, dashboard,
 * thank-you page, success states, Stripe metadata, social meta) reads from
 * this file. Update one place = update everywhere.
 *
 * RULE: Never hard-code product version, price, key claim, or canonical URL
 * outside of this file. If you need a value somewhere, import it.
 *
 * Owner: Seyed Hosseini (Weblyfe)
 * Source: distilled from /Users/appie/clawd/docs/APPIE-PERSONA.md (voice),
 *         PRD-WEBLYFE-AI.md (decisions), 2026-04-28-canonical-resources.md (IDs).
 *
 * Place this file in the live repo at: src/lib/brand-constants.ts
 */

// ─── PRODUCT METADATA ────────────────────────────────────────────────────────

export const BRAND = {
  name: 'Weblyfe.ai',
  parent: 'Weblyfe',
  // Q4 lock: drop "Techwiz LLC" from customer-facing attribution.
  attribution: {
    creator: 'Weblyfe',
    publisher: 'Weblyfe',
  },
  domain: 'weblyfe.ai',
  siblingDomain: 'weblyfe.nl', // the agency
  emoji: '🧙🏽‍♂️', // Appie's wizard emoji (matches Seyed's IG bio)
  contactEmail: 'hello@weblyfe.ai',
  city: 'Rijswijk, NL',
} as const;

// ─── APPIE PERSONA SHORT-FORM ────────────────────────────────────────────────
// Long form lives in /Users/appie/clawd/docs/APPIE-PERSONA.md.
// These are the strings that ship in copy.

export const APPIE = {
  name: 'Appie',
  pronoun: 'she/her',
  // Q1 lock: drop "AI medewerker / AI employee" framing.
  // Use Techwiz / genius-employee phrasings instead.
  productFraming: {
    nl: {
      primary: 'Jouw persoonlijke Techwiz',
      secondary: 'Een geniale werknemer met de laagste kosten',
    },
    en: {
      primary: 'Your personal Techwiz',
      secondary: 'A genius employee at the lowest cost',
    },
  },
  hero: {
    nl: [
      'Hoi, ik ben Appie.',
      'Jouw persoonlijke Techwiz.',
      'Een geniale werknemer met de laagste kosten.',
      'Ik doe het werk dat je week opvreet. Inbox. Intake. Agenda. Admin.',
      'Jij bouwt. Ik houd de boel draaiend.',
    ],
    en: [
      "Hi, I'm Appie.",
      'Your personal Techwiz.',
      'A genius employee at the lowest cost.',
      'I handle the work eating your week. Inbox. Intake. Scheduling. Admin.',
      'You build. I keep the lights on.',
    ],
  },
  capabilities: [
    'inbox', // triage, drafts, sends low-risk replies
    'intake', // WhatsApp/form/email leads → qualify → CRM
    'scheduling', // finds slots, invites, reschedules
    'admin', // invoice reconciliation, expense logging, daily summaries
    'memory', // remembers customer-specific preferences across sessions
  ] as const,
} as const;

// ─── PRICING (CANONICAL) ─────────────────────────────────────────────────────
// Stripe price IDs verified live 2026-04-28 via Stripe API.

export const PRICING = {
  pdfGuide: {
    name: 'Build Your Own Appie',
    priceLabel: '€65',
    amountEur: 65,
    cadence: 'one-time' as const,
    stripePriceId: 'price_1TM1J8LNHXmj2NAspC30FrIe', // PDF-Guide-EUR (newest)
    stripePriceIdLegacy: 'price_1TFzgPLNHXmj2NAs1N95z1gu', // older fallback
    cta: { nl: 'Download de gids', en: 'Download the guide' },
    audience: 'builders / DIY / no-code',
  },
  instantAppie: {
    name: 'Instant Appie',
    priceLabel: '€250 / maand',
    priceLabelEn: '€250 / month',
    amountEur: 250,
    cadence: 'monthly' as const,
    stripePriceId: 'price_1TGIOmLNHXmj2NAshLF1rkJ1',
    cta: { nl: 'Begin met je Techwiz', en: 'Start with your Techwiz' },
    audience: 'owner-operator service businesses',
    isFlagship: true,
  },
  customAppie: {
    name: 'Custom Appie',
    priceLabel: 'vanaf €2.000 / maand',
    priceLabelEn: 'from €2,000 / month',
    amountEurStart: 2000,
    cadence: 'monthly-custom' as const,
    // Custom is sold via TidyCal call → custom Stripe invoice. The "from"
    // anchor SKU is only used for proposals/internal references.
    stripeAnchorPriceId: 'price_1TApb6LNHXmj2NAs3Jt8B0yl',
    cta: { nl: 'Plan een gesprek', en: 'Book a call' },
    ctaUrl: 'https://tidycal.com/weblyfe/discovery', // VERIFY exact path before launch
    audience: 'SMEs (5-50 employees) with bespoke pipelines',
  },
} as const;

// Add-on credits (Phase 2 — Instant Appie subscribers can top up usage).
export const CREDIT_ADDONS = {
  starter: {
    label: '€12 — Starter top-up',
    amountEur: 12,
    stripePriceId: 'price_1TJuL2LNHXmj2NAsWm6nIIzG',
  },
  professional: {
    label: '€29 — Professional top-up',
    amountEur: 29,
    stripePriceId: 'price_1TJuL2LNHXmj2NAsGYrCe9xG',
  },
  powerUser: {
    label: '€56 — Power User top-up',
    amountEur: 56,
    stripePriceId: 'price_1TJuL3LNHXmj2NAsMeUnVsDT',
  },
} as const;

// ─── GUARANTEE (Q5 lock — Hormozi Variant A "Time-Saved Promise") ────────────
// Picked by Seyed 2026-04-28 from 3 options in 2026-04-28-guarantees.md.
// Pattern: specific outcome (10 hours saved) + measurable threshold (month 1)
// + recourse with extra (€250 refund + €100 bonus). Hormozi "more than money back" lever.

export const GUARANTEE = {
  active: 'time-saved-promise',
  headline: {
    nl: 'Bespaart Appie je geen 10 uur in je eerste maand? Geld terug, plus €100 bovenop.',
    en: "If Appie doesn't save you 10 hours in your first month, you get your €250 back plus an extra €100.",
  },
  copy: {
    nl: 'Een Techwiz hoort werk uit je week te halen. Niet uit je portemonnee. Bewijst je urenlog na 30 dagen geen 10 uur winst? €250 terug + €100 bovenop. Eén bericht aan ons en het staat in gang.',
    en: "A Techwiz is supposed to take work out of your week. Not money out of your wallet. If your time log after 30 days doesn't show 10 hours saved, your €250 back plus €100 for your time. One message and it moves.",
  },
  mechanic: {
    nl: 'Vereist: minimaal 1 aangesloten kanaal + 5 wekelijkse taken via Appie. Triggervenster dag 25-35. Refund + bonus binnen 5 werkdagen.',
    en: 'Requires: ≥1 connected channel + 5 weekly tasks dispatched. Trigger window day 25-35. Refund + bonus within 5 business days.',
  },
};

// ─── SOCIAL ──────────────────────────────────────────────────────────────────

export const SOCIAL = {
  founder: {
    instagram: 'https://instagram.com/seyed.jpg',
    linkedin: 'https://www.linkedin.com/in/seyed-hosseini-1a077289/',
    twitter: 'https://x.com/seyed_txt',
    youtube: 'https://youtube.com/@weblyfenl',
  },
  appie: {
    instagram: 'https://instagram.com/appie.ai', // ⚠ token expired 2026-04-16, needs reconnect
  },
  weblyfe: {
    youtube: 'https://youtube.com/@weblyfenl',
    googleBusiness: 'Weblyfe (Veraartlaan 8, Rijswijk)',
  },
} as const;

// ─── CASE STUDIES (publishable metrics, sourced) ─────────────────────────────
// All metrics here MUST trace to a Notion delivery doc or client confirmation.
// If a number isn't sourced, add `metricPending: true` instead of inventing.

export const CASES = {
  cza: {
    client: 'CZA Bouwbedrijf',
    sector: 'Bouw / construction',
    appieName: 'Sjaak (Custom Appie)',
    capability: 'WhatsApp lead intake + CRM write-back',
    metrics: [
      { label: 'response time', before: '4-6 uur', after: '<30 sec' },
      { label: 'inquiry → site visit conversion', delta: '+23%' },
    ],
    source: 'Notion delivery doc — CZA project page',
  },
  dubaiProperty: {
    client: 'Dubai-Property.nl',
    sector: 'Real estate',
    appieName: 'Eva (Custom Appie)',
    capability: 'lead qualifier from 752-lead pipeline',
    metrics: [
      { label: 'hot leads auto-qualified', value: 160 },
      { label: 'first response', value: '<2 minutes' },
    ],
    source: 'Notion delivery doc — Dubai-Property project page',
  },
  // Third case: Seyed picks. Candidates: Anders Ecommerce, iOnlyBookVIP,
  // LPS Pilates. See 2026-04-28-case-studies.md.
} as const;

// ─── KPI TARGETS (90-day, from Master Plan) ──────────────────────────────────

export const KPI_90D = {
  uniqueVisitors: 5000,
  waitlistSignups: 500,
  pdfSales: 50,
  callsBooked: 50,
  instantAppieSubs: 20,
  revenueEur: 15000,
  heroCtaClickRatePct: 5,
  pageToCheckoutPct: 3,
} as const;

// ─── INTEGRATIONS — DO NOT BREAK ─────────────────────────────────────────────
// All confirmed LIVE 2026-04-28. Phase-1 work is additive only.

export const INTEGRATIONS = {
  stripe: { state: 'live', notes: 'Checkout + webhook for €65 PDF live; €250/mo subscription build in progress' },
  brevo: { state: 'live', notes: '17 templates wired, list 18 = waitlist' },
  airtable: { state: 'live', notes: 'leads + sales record' },
  tidycal: { state: 'live', notes: 'discovery call booking' },
  hetzner: { state: 'live', notes: 'Custom Appie provisioning via Hetzner Cloud API' },
  vercel: { state: 'live', notes: 'auto-deploy from main' },
  ga4: { state: 'not-wired', notes: 'GA property exists per Seyed; site-level tag not installed; Phase 2' },
  elevenlabs: { state: 'api-key-on-file', notes: 'use for hero voice clip + future voice features' },
} as const;

// ─── DOC POINTERS ────────────────────────────────────────────────────────────

export const DOCS = {
  appiePersona: '/Users/appie/clawd/docs/APPIE-PERSONA.md',
  prd: '/Users/appie/clawd/projects/weblyfe-ai-landing/PRD-WEBLYFE-AI.md',
  masterPlanNotion: 'https://www.notion.so/350c3321de608176b79afd0ed00a448e',
  tipsFramework: '/Users/appie/clawd/projects/weblyfe-ai-landing/2026-04-28-tips-framework.md',
  guarantees: '/Users/appie/clawd/projects/weblyfe-ai-landing/2026-04-28-guarantees.md',
  canonicalResources: '/Users/appie/clawd/projects/weblyfe-ai-landing/2026-04-28-canonical-resources.md',
} as const;

// ─── VERSION ─────────────────────────────────────────────────────────────────

export const VERSION = {
  pdf: '4.4',
  brand: '2.0', // Brand 2.0 from MASTER-PLAN §2 (#031D16 / #DFB771 / #247459)
  prd: '1.1', // 2026-04-28
  persona: '1.1', // 2026-04-28
  brandConstants: '1.0-draft', // this file
  lastUpdated: '2026-04-28',
} as const;

// ─── TYPE EXPORTS ────────────────────────────────────────────────────────────

export type PricingTier = keyof typeof PRICING;
export type CaseStudy = keyof typeof CASES;
export type Integration = keyof typeof INTEGRATIONS;
