export const LOCALES = ['nl', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'nl';

type Dict = Record<string, string>;

const nl: Dict = {
  // Navbar
  'nav.meet': 'Maak kennis',
  'nav.projects': 'Projecten',
  'nav.pricing': 'Pricing',
  'nav.blog': 'Blog',
  'nav.faq': 'FAQ',
  'nav.book': 'Plan gesprek',
  'nav.cta': 'Begin met je Techwiz',
  'nav.toggleLanguageAria': 'Wissel taal',
  'nav.menuOpen': 'Open menu',
  'nav.menuClose': 'Sluit menu',

  // Hero
  'hero.stat1': '100+ bedrijven geholpen',
  'hero.stat2': '<30s eerste reactie',
  'hero.stat3': '€11M+ gerealiseerd voor klanten',
  'hero.h1.line1': 'Runt je agenda',
  'hero.h1.line2': 'je werkweek?',
  'hero.h1.line3': 'Vanaf nu niet meer.',
  'hero.sub':
    'Ontmoet Appie, jouw 24/7 Techwiz. Hij beheert je inbox, intake en agenda terwijl jij slaapt. Geen chatbot, geen tool. Een digitale collega die verantwoordelijkheid neemt voor uitkomsten.',
  'hero.cta.primary': 'Start je Appie',
  'hero.cta.secondary': 'of leer Appie eerst kennen →',
  'hero.trust': 'Tevreden of geld terug · Maandelijks opzegbaar · Jouw private server',
  'hero.imgAlt': 'Appie · jouw persoonlijke Techwiz',

  // About Seyed
  'about.eyebrow': 'Wie bouwt dit',
  'about.h2': 'Seyed Hosseini. Van geneeskunde naar digitaal vakmanschap.',
  'about.p1':
    'Seyed begon waar weinig ondernemers beginnen: in de geneeskunde. Niet als eindbestemming, maar als lens. Hij zag hoe systemen vastlopen, hoe communicatie mislukt, hoe goede intenties sneuvelen op slechte processen. In 2019 richtte hij Weblyfe op, gewapend met dezelfde diagnose-aanpak. Geen templates. Geen bureau-taal. Gewoon: wat is het échte probleem, en hoe bouwen we iets dat dat oplost.',
  'about.p2':
    'Inmiddels werkte Seyed samen met meer dan 100 bedrijven. Van Roslan Bendenia en Lost LeBlanc tot vastgoedondernemers, e-commerce founders en financieel coaches. Niet als uitvoerder, maar als de persoon die meekijkt, meedenkt en de lat legt. Zijn klanten genereerden aantoonbaar meer dan 11 miljoen euro. Hij doceerde digitale strategie aan de American University of Dubai. En hij bouwde Appie: een AI-vloot die de werkweek overneemt zodat jij je kunt richten op wat telt.',
  'about.stat1.label': 'bedrijven geholpen',
  'about.stat2.label': 'Weblyfe actief',
  'about.stat2.suffix': ' jaar',
  'about.stat3.label': 'gerealiseerd voor klanten',
  'about.stat4.label': 'gastdocent digitale strategie',
  'about.collabs.eyebrow': 'Eerder samengewerkt met',
  'about.collabs.more': 'en 90+ andere ondernemers',

  // Case studies section
  'cases.eyebrow': 'Echt aan het werk',
  'cases.h2': 'Wat klanten zien. En wat we zelf doen.',
  'cases.projects.eyebrow': 'Projecten',
  'cases.projects.h3': 'Sites die live staan, met een Techwiz erachter',

  // What Appie is (INGREDIENTS)
  'ing.eyebrow': 'Drie principes',
  'ing.h2': 'Wat een Techwiz onderscheidt',
  'ing.1.name': 'Een Techwiz, geen tool',
  'ing.1.detail':
    'Software automatiseert taken; een Techwiz neemt verantwoordelijkheid voor uitkomsten. Geen chatbot. Een persistente, herinnerende digitale collega die op een eigen private server draait.',
  'ing.2.name': 'Werkt in jouw week',
  'ing.2.detail':
    '08:00 een briefing van wat ik gisteren afhandelde en wat vandaag jouw aandacht nodig heeft. Verbonden met Google Workspace, Notion, Stripe, Telegram, WhatsApp. Alles tegelijk.',
  'ing.3.name': 'Werkt zichtbaar',
  'ing.3.detail':
    'Geen black box, geen "trust the AI". Reversibele taken: doen. Onomkeerbare taken: vragen. Je weet in de ochtend wat ik gisteren deed, je weet in de avond wat ik vandaag deed.',

  // Process steps
  'process.eyebrow': 'Drie stappen',
  'process.h2': 'Van eerste handshake naar 24 uur draaien',
  'process.1.title': 'Ik kom je workspace binnen',
  'process.1.desc':
    'We zetten je private server op, koppelen je kanalen en stemmen mij af op jouw bedrijf. Binnen 24 uur draai ik mee.',
  'process.2.title': 'Ik leer hoe jij werkt',
  'process.2.desc':
    'Ik lees je docs, leer je stem, connect je tools. Eerste week onthoud ik wat klanten willen, hoe je antwoordt, en welke beslissingen jou wakker houden.',
  'process.3.title': 'Jij bouwt, ik draai',
  'process.3.desc':
    'Inbox triage, intake, scheduling, follow-ups, admin: afgehandeld. Jij houdt over wat alleen jij kan: bouwen, verkopen, beslissen.',

  // PDF promo
  'pdf.eyebrow': 'PDF Gids · v4.4 · €65',
  'pdf.h2': 'Bouw zelf je 24/7 Techwiz',
  'pdf.body':
    "10 hoofdstukken, 56 pagina's, echte code. Het complete blueprint van nul tot je eigen Techwiz. Lifetime updates. Eenmalig €65.",
  'pdf.cta': 'Koop de gids · €65',
  'pdf.card.title': 'Bouw zelf je Techwiz',
  'pdf.card.subtitle': 'Build Your Own Appie v4.4',
  'pdf.card.meta': "56 pagina's · €65 · April 2026",

  // Pricing
  'tiers.h2': 'Drie manieren om je Techwiz te krijgen',
  'tier.byo.eyebrow': 'Bouw zelf',
  'tier.byo.title': 'Bouw je eigen Techwiz',
  'tier.byo.subtitle': 'Voor builders en no-coders',
  'tier.byo.priceSuffix': 'eenmalig',
  'tier.byo.cta': 'Koop de gids · €65',
  'tier.byo.features': '56-pagina PDF gids|Copy/paste templates|Eigen private server|55+ skills library|Lifetime updates',
  'tier.instant.badge': 'Coming soon',
  'tier.instant.eyebrow': 'Managed',
  'tier.instant.title': 'Instant Appie',
  'tier.instant.subtitle': 'Wij bouwen, wij draaien',
  'tier.instant.priceSuffix': '/maand',
  'tier.instant.cta': 'Coming soon',
  'tier.instant.features':
    'Alles uit de Bouw-zelf gids|Dedicated private server|Telegram + WhatsApp aangesloten|Persistent geheugen|55+ skills library|14 dagen tevreden of geld terug',
  'tier.custom.eyebrow': 'Custom',
  'tier.custom.title': 'Custom Appie',
  'tier.custom.subtitle': 'Bespoke voor jouw bedrijf',
  'tier.custom.pricePrefix': 'vanaf ',
  'tier.custom.priceSuffix': '/maand',
  'tier.custom.cta': 'Plan een gesprek',
  'tier.custom.features':
    'Alles uit Instant Appie|Multi-agent architectuur|Custom automations & workflows|CRM integraties (Brevo, Moneybird, Monday)|Doorlopende optimalisatie|Zoals Eva, Sjaak, Ben',

  // Tools strip
  'tools.eyebrow': 'Werkt met je stack',

  // Blog strip
  'blog.eyebrow': 'Techwiz Blog',
  'blog.h2': 'Nieuws en meer over AI werknemers',
  'blog.viewAll': 'Alle posts',

  // FAQ
  'faq.eyebrow': 'Veelgestelde vragen',
  'faq.h2': 'Vragen die je nu hebt',

  // Closing CTA
  'close.h2': 'Klaar om je Techwiz te ontmoeten?',
  'close.sub':
    'Tevreden of geld terug. Als ik je niet meer tijd bespaar dan ik kost, betaal je niets.',
  'close.cta.primary': 'Plan een gesprek →',
  'close.cta.secondary': 'Bouw zelf je Techwiz · €65 PDF',

  // Footer
  'footer.tagline':
    'AI automation services voor creators, agencies en service businesses. We bouwen systemen die je tijd besparen en je laten schalen.',
  'footer.col.services': 'Services',
  'footer.col.company': 'Bedrijf',
  'footer.col.resources': 'Resources',
  'footer.newsletter.h3': 'Wekelijkse Techwiz-tips in je inbox',
  'footer.newsletter.body':
    'Praktische tips over automation, AI en hoe je je werkweek terugwint. Geen spam.',
  'footer.newsletter.placeholder': 'jouw@email.nl',
  'footer.newsletter.cta': 'Aanmelden',
  'footer.copyright.suffix': ' · onderdeel van Weblyfe by Techwiz LLC',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
};

const en: Dict = {
  // Navbar
  'nav.meet': 'Meet Appie',
  'nav.projects': 'Projects',
  'nav.pricing': 'Pricing',
  'nav.blog': 'Blog',
  'nav.faq': 'FAQ',
  'nav.book': 'Book a call',
  'nav.cta': 'Start your Techwiz',
  'nav.toggleLanguageAria': 'Switch language',
  'nav.menuOpen': 'Open menu',
  'nav.menuClose': 'Close menu',

  // Hero
  'hero.stat1': '100+ businesses helped',
  'hero.stat2': '<30s first response',
  'hero.stat3': '€11M+ generated for clients',
  'hero.h1.line1': 'Is your calendar',
  'hero.h1.line2': 'running your week?',
  'hero.h1.line3': 'Not anymore.',
  'hero.sub':
    'Meet Appie, your 24/7 Techwiz. He runs your inbox, intake and calendar while you sleep. Not a chatbot, not a tool. A digital colleague who takes ownership of outcomes.',
  'hero.cta.primary': 'Start your Appie',
  'hero.cta.secondary': 'or get to know Appie first →',
  'hero.trust': 'Money-back guarantee · Cancel monthly · Your private server',
  'hero.imgAlt': 'Appie · your personal Techwiz',

  // About Seyed
  'about.eyebrow': 'Who builds this',
  'about.h2': 'Seyed Hosseini. From medicine to digital craftsmanship.',
  'about.p1':
    'Seyed started where few entrepreneurs do: in medicine. Not as a destination, but as a lens. He saw how systems break down, how communication fails, how good intentions die on bad processes. In 2019 he founded Weblyfe, armed with that same diagnostic approach. No templates. No agency-speak. Just: what is the real problem, and how do we build something that solves it.',
  'about.p2':
    'Today Seyed has worked with more than 100 companies. From Roslan Bendenia and Lost LeBlanc to real estate entrepreneurs, e-commerce founders and financial coaches. Not as an executor, but as the person who looks along, thinks along, and raises the bar. His clients have demonstrably generated more than 11 million euros. He has lectured on digital strategy at the American University of Dubai. And he built Appie: an AI fleet that takes over your work week so you can focus on what matters.',
  'about.stat1.label': 'businesses helped',
  'about.stat2.label': 'years running Weblyfe',
  'about.stat2.suffix': ' yrs',
  'about.stat3.label': 'generated for clients',
  'about.stat4.label': 'guest lecturer in digital strategy',
  'about.collabs.eyebrow': 'Previously worked with',
  'about.collabs.more': 'and 90+ other entrepreneurs',

  // Case studies
  'cases.eyebrow': 'Actually working',
  'cases.h2': 'What clients see. And what we run ourselves.',
  'cases.projects.eyebrow': 'Projects',
  'cases.projects.h3': 'Live websites, with a Techwiz behind them',

  // INGREDIENTS
  'ing.eyebrow': 'Three principles',
  'ing.h2': 'What sets a Techwiz apart',
  'ing.1.name': 'A Techwiz, not a tool',
  'ing.1.detail':
    "Software automates tasks; a Techwiz takes ownership of outcomes. Not a chatbot. A persistent, remembering digital colleague that runs on its own private server.",
  'ing.2.name': 'Works inside your week',
  'ing.2.detail':
    '08:00 a briefing on what I handled yesterday and what needs your attention today. Connected to Google Workspace, Notion, Stripe, Telegram, WhatsApp. All at once.',
  'ing.3.name': 'Works visibly',
  'ing.3.detail':
    'No black box, no "trust the AI". Reversible tasks: do them. Irreversible tasks: ask first. You know in the morning what I did yesterday, and in the evening what I did today.',

  // Process
  'process.eyebrow': 'Three steps',
  'process.h2': 'From first handshake to running 24/7',
  'process.1.title': 'I enter your workspace',
  'process.1.desc':
    'We set up your private server, connect your channels, and tune me to your business. Within 24 hours I am running with you.',
  'process.2.title': 'I learn how you work',
  'process.2.desc':
    'I read your docs, learn your voice, connect your tools. By the end of week one I remember what your clients want, how you respond, and which decisions keep you up.',
  'process.3.title': 'You build, I run',
  'process.3.desc':
    'Inbox triage, intake, scheduling, follow-ups, admin: handled. You keep what only you can do: build, sell, decide.',

  // PDF promo
  'pdf.eyebrow': 'PDF Guide · v4.4 · €65',
  'pdf.h2': 'Build your own 24/7 Techwiz',
  'pdf.body':
    '10 chapters, 56 pages, real code. The complete blueprint from zero to your own Techwiz. Lifetime updates. One-time €65.',
  'pdf.cta': 'Buy the guide · €65',
  'pdf.card.title': 'Build your own Techwiz',
  'pdf.card.subtitle': 'Build Your Own Appie v4.4',
  'pdf.card.meta': '56 pages · €65 · April 2026',

  // Pricing
  'tiers.h2': 'Three ways to get your Techwiz',
  'tier.byo.eyebrow': 'Build it yourself',
  'tier.byo.title': 'Build your own Techwiz',
  'tier.byo.subtitle': 'For builders and no-coders',
  'tier.byo.priceSuffix': 'one-time',
  'tier.byo.cta': 'Buy the guide · €65',
  'tier.byo.features': '56-page PDF guide|Copy/paste templates|Your own private server|55+ skills library|Lifetime updates',
  'tier.instant.badge': 'Coming soon',
  'tier.instant.eyebrow': 'Managed',
  'tier.instant.title': 'Instant Appie',
  'tier.instant.subtitle': 'We build it, we run it',
  'tier.instant.priceSuffix': '/month',
  'tier.instant.cta': 'Coming soon',
  'tier.instant.features':
    'Everything in Build-it-yourself|Dedicated private server|Telegram + WhatsApp connected|Persistent memory|55+ skills library|14-day money-back guarantee',
  'tier.custom.eyebrow': 'Custom',
  'tier.custom.title': 'Custom Appie',
  'tier.custom.subtitle': 'Bespoke for your business',
  'tier.custom.pricePrefix': 'from ',
  'tier.custom.priceSuffix': '/month',
  'tier.custom.cta': 'Book a call',
  'tier.custom.features':
    'Everything in Instant Appie|Multi-agent architecture|Custom automations & workflows|CRM integrations (Brevo, Moneybird, Monday)|Ongoing optimisation|Like Eva, Sjaak, Ben',

  // Tools strip
  'tools.eyebrow': 'Plays well with your stack',

  // Blog strip
  'blog.eyebrow': 'Techwiz Blog',
  'blog.h2': 'News and notes on AI employees',
  'blog.viewAll': 'View all posts',

  // FAQ
  'faq.eyebrow': 'Frequently asked',
  'faq.h2': 'Questions you have right now',

  // Closing CTA
  'close.h2': 'Ready to meet your Techwiz?',
  'close.sub':
    'Money-back guarantee. If I do not save you more time than I cost, you pay nothing.',
  'close.cta.primary': 'Book a call →',
  'close.cta.secondary': 'Build it yourself · €65 PDF',

  // Footer
  'footer.tagline':
    'AI automation services for creators, agencies and service businesses. We build systems that save you time and let you scale.',
  'footer.col.services': 'Services',
  'footer.col.company': 'Company',
  'footer.col.resources': 'Resources',
  'footer.newsletter.h3': 'Weekly Techwiz tips in your inbox',
  'footer.newsletter.body':
    'Practical tips on automation, AI, and getting your week back. No spam.',
  'footer.newsletter.placeholder': 'you@email.com',
  'footer.newsletter.cta': 'Subscribe',
  'footer.copyright.suffix': ' · part of Weblyfe by Techwiz LLC',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
};

export const messages: Record<Locale, Dict> = { nl, en };
export type MessageKey = keyof typeof nl;

export function tFn(locale: Locale): (key: MessageKey) => string {
  return (key) => messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key;
}
