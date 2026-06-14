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
  'hero.stat3': '€20M+ gerealiseerd voor klanten',
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
    'Inmiddels werkte Seyed samen met meer dan 100 bedrijven. Van Roslan Bendenia en Lost LeBlanc tot vastgoedondernemers, e-commerce founders en financieel coaches. Niet als uitvoerder, maar als de persoon die meekijkt, meedenkt en de lat legt. Zijn klanten genereerden samen meer dan 20 miljoen euro aan omzet sinds hij met ze werkt. Hij doceerde digitale strategie aan de American University of Dubai. En hij bouwde Appie: een AI-vloot die de werkweek overneemt zodat jij je kunt richten op wat telt.',
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
  'pdf.eyebrow': 'PDF Gids · v4.5 · €65',
  'pdf.h2': 'Bouw zelf je 24/7 Techwiz',
  'pdf.body':
    "10 hoofdstukken, 56 pagina's, echte code. Het complete blueprint van nul tot je eigen Techwiz. Lifetime updates. Eenmalig €65.",
  'pdf.cta': 'Koop de gids · €65',
  'pdf.card.title': 'Bouw zelf je Techwiz',
  'pdf.card.subtitle': 'Build Your Own Appie v4.5',
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

  // Beta page - metadata
  'beta.meta.title': 'Instant Appie BETA - €250/mo locked',
  'beta.meta.description':
    'Jouw volledig managed Techwiz op Telegram. 5-10 plekken, €250/mo voor altijd. 14 dagen geld-terug. 1-op-1 onboarding met Seyed.',
  'beta.meta.og.title': 'Instant Appie BETA - €250/mo voor altijd',
  'beta.meta.og.description':
    'Volledig managed Techwiz. Telegram dag 1, agenda, inbox, CRM. 5-10 plekken.',
  'beta.meta.og.imgAlt': 'Instant Appie BETA - €250/mo locked',
  'beta.meta.tw.title': 'Instant Appie BETA - €250/mo locked',
  'beta.meta.tw.description':
    'Volledig managed Techwiz. Telegram dag 1, agenda, inbox, CRM. 5-10 plekken.',

  // Beta page - hero
  'beta.hero.eyebrow': 'BETA . 5-10 plekken . €250/mo locked',
  'beta.hero.h1.line1': 'Jouw persoonlijke Techwiz.',
  'beta.hero.h1.line2': 'Volledig voor je gebouwd.',
  'beta.hero.sub':
    'Instant Appie BETA: op Telegram vanaf dag 1, met agenda, inbox en CRM. Voor een select groep van 5-10 ondernemers: €250/mo voor altijd. Zelfs als de prijs naar €488 gaat.',
  'beta.hero.cta.primary': 'Lock mijn €250 prijs',
  'beta.hero.cta.secondary': 'Vergelijk met DIY en VA',
  'beta.hero.urgency': 'Nog maar 5-10 plekken. Beta sluit als de plekken vol zijn.',
  'beta.hero.imgAlt': 'Appie - jouw persoonlijke Techwiz',
  'beta.hero.badge.telegram': '[Telegram] 23 mails afgehandeld',
  'beta.hero.badge.calendar': '[Calendar] 4 calls geboekt',

  // Beta page - pricing comparison
  'beta.compare.eyebrow': 'Vergelijk zelf',
  'beta.compare.h2.line1': '€250/mo locked.',
  'beta.compare.h2.line2': 'Voor altijd.',
  'beta.compare.card.label.accent': 'Beta-prijs',
  'beta.compare.card.label.default': 'Optie',
  'beta.compare.footnote':
    'De beta-prijs van €250 is voor altijd van jou. Zelfs na de publieke launch naar €488.',

  // Beta page - pricing rows (body + note; titles and prices stay hardcoded)
  'beta.row.diy.body': 'Chatbot. Geen geheugen. Jij typt alles.',
  'beta.row.instant.note': 'locked voor altijd',
  'beta.row.instant.body': 'Volledig managed Techwiz. Telegram dag 1.',
  'beta.row.full.body': 'WhatsApp + alle connectors.',
  'beta.row.va.body': 'Mens. 8u/week. Vakantie-opvang niet inbegrepen.',
  'beta.row.ea.body': 'Menselijk. Schaalt niet.',

  // Beta page - what is Instant Appie
  'beta.what.eyebrow': 'Wat is Instant Appie',
  'beta.what.h2.line1': 'Volledig managed.',
  'beta.what.h2.line2': 'Geen setup.',
  'beta.what.sub':
    'Instant Appie is een volledig managed Techwiz die Weblyfe voor je bouwt, instelt en draait op een dedicated server. Geen setup, geen technische kennis nodig. Je geeft aan wat je wil, wij regelen de rest.',
  'beta.what.bullet1.title': 'Eigen dedicated server',
  'beta.what.bullet1.body': 'Hetzner EU, privacy-compliant. Jouw data verlaat nooit Europa.',
  'beta.what.bullet2.title': 'Telegram, inbox, agenda en CRM',
  'beta.what.bullet2.body': 'Vanaf dag 1 verbonden met de tools waar jouw werk al loopt.',
  'beta.what.bullet3.title': 'Persistent geheugen',
  'beta.what.bullet3.body': 'Onthoudt klanten, afspraken en voorkeuren. Begint nooit bij nul.',
  'beta.what.bullet4.title': '24/7 actief',
  'beta.what.bullet4.body':
    'Werkt door terwijl jij slaapt. Lead om 22:14 wordt om 22:14 gekwalificeerd.',

  // Beta page - beta benefits
  'beta.benefits.eyebrow': 'Wat krijg je',
  'beta.benefits.h2': 'Wat krijg je als beta-klant?',
  'beta.benefits.label': 'Voordeel',
  'beta.benefits.b1.title': '1-op-1 onboarding met Seyed',
  'beta.benefits.b1.body':
    'Seyed bouwt en configureert jouw Appie persoonlijk samen met jou. 60-90 minuten sessie.',
  'beta.benefits.b2.title': 'Telegram vanaf dag 1',
  'beta.benefits.b2.body':
    'Inbox-triage, agendabeheer, CRM en lead-notificaties. Allemaal in 1 chat.',
  'beta.benefits.b3.title': '€250/mo voor altijd',
  'beta.benefits.b3.body':
    'Zelfs als we naar €488 gaan bij de publieke launch. Locked-in beta-prijs.',
  'beta.benefits.b4.title': '14 dagen geld-terug',
  'beta.benefits.b4.body':
    'Niet tevreden? Geld terug, geen gedoe. Daarna maandelijks opzegbaar.',
  'beta.benefits.b5.title': 'Lifetime updates',
  'beta.benefits.b5.body':
    'Elke nieuwe feature en connector die we bouwen, krijg jij ook. Inclusief WhatsApp Q3 2026.',
  'beta.benefits.whatsapp.footnote':
    'WhatsApp is geplanned voor Q3 2026 (publieke launch). Beta-klanten worden als eerste toegevoegd aan de WhatsApp-rollout.',

  // Beta page - how it works
  'beta.how.eyebrow': 'Hoe het werkt',
  'beta.how.h2': 'Van aanmelding tot live in 4 stappen.',
  'beta.how.s1.title': 'Aanmelden',
  'beta.how.s1.body': 'Vul het formulier in. We lezen je use case en motivatie persoonlijk.',
  'beta.how.s2.title': 'Call met Seyed',
  'beta.how.s2.body':
    'Binnen 24 uur plant Seyed een korte intake. Past de beta bij jou en jouw bedrijf?',
  'beta.how.s3.title': 'Onboarding sessie',
  'beta.how.s3.body':
    '60-90 minuten 1-op-1. Seyed bouwt jouw Techwiz live mee, met jouw stem en workflows.',
  'beta.how.s4.title': 'Live op Telegram',
  'beta.how.s4.body':
    'Binnen 24-48 uur na onboarding draait jouw Appie. Briefing in Telegram elke ochtend.',

  // Beta page - social proof
  'beta.social.eyebrow': 'Echte klanten',
  'beta.social.h2.line1': 'Volledig managed.',
  'beta.social.h2.line2': 'Door ons gebouwd.',
  'beta.social.proof1.quote':
    'Appie is live op Telegram, beantwoordt leads binnen 30 seconden. Weblyfe heeft de hele setup gedaan.',
  'beta.social.proof2.quote':
    '3 Appies draaien 50+ taken per dag voor GDPR-monitoring en compliance-audit. Setup volledig door Weblyfe.',
  'beta.social.proof3.quote':
    'Contentproductie van 4 uur naar 15 minuten per stuk. Mijn Appie draait dag en nacht.',
  'beta.social.footnote':
    'Alle huidige klanten zijn handmatig onboard gebracht. De beta-route maakt dit schaalbaar.',

  // Beta page - FAQ
  'beta.faq.eyebrow': 'FAQ',
  'beta.faq.h2': 'Antwoorden op de meest gestelde vragen.',
  'beta.faq.q1': 'Wat is het verschil tussen de beta en de publieke launch?',
  'beta.faq.a1':
    'In de beta krijg je Telegram, inbox, agenda en CRM. WhatsApp + extra connectors komen erbij bij de publieke launch (€488/mo). Beta-klanten betalen altijd €250, ook daarna.',
  'beta.faq.q2': 'Wat als ik later wil upgraden naar full launch?',
  'beta.faq.a2':
    'Niets. Je beta-prijs blijft €250/mo, ook als we WhatsApp en alle connectors toevoegen bij de publieke launch. Je krijgt alles wat nieuwe klanten krijgen, voor jouw locked-in prijs.',
  'beta.faq.q3': 'Kan ik stoppen als het niets voor mij is?',
  'beta.faq.a3':
    'Ja. 14 dagen geld-terug garantie zonder vragen. Daarna maandelijks opzegbaar, geen jaarcontract.',
  'beta.faq.q4': 'Hoe snel ben ik live?',
  'beta.faq.a4':
    'Binnen 24-48 uur na de onboarding met Seyed ben je live op Telegram. De 1-op-1 sessie zelf duurt 60-90 minuten.',
  'beta.faq.q5': 'Heb ik technische kennis nodig?',
  'beta.faq.a5': 'Nee. Seyed regelt de hele setup. Jij geeft aan wat je wil; hij configureert.',
  'beta.faq.q6': 'Welke tools kan Appie verbinden?',
  'beta.faq.a6':
    'Telegram (dag 1), Gmail/Outlook, Google Calendar, Notion, Brevo, Moneybird, HubSpot, Airtable, TidyCal. WhatsApp Business in Q3 2026.',
  'beta.faq.q7': 'Is mijn data veilig?',
  'beta.faq.a7':
    'Appie draait op een dedicated private server in de EU (Hetzner, Falkenstein of Helsinki). Je data verlaat nooit de EU en traint geen publieke AI-modellen.',
  'beta.faq.q8': 'Wat als Appie iets verkeerd doet?',
  'beta.faq.a8':
    'Risico-acties pingen jou eerst in Telegram. Je hebt altijd override-controle. Seyed is bereikbaar voor de beta-groep.',
  'beta.faq.q9': 'Hoeveel plekken zijn er?',
  'beta.faq.a9':
    '5 tot 10. Als de plekken vol zijn, sluit de beta. Er komt een publieke wachtlijst, maar die heeft geen €250 lock-in.',

  // Beta page - sign-up form section
  'beta.form.eyebrow': 'Reserveer je plek',
  'beta.form.h2': 'Pak je plek voordat de beta sluit.',
  'beta.form.sub':
    'Vul het formulier in. Seyed leest je motivatie persoonlijk en plant binnen 24 uur een korte intake.',
  'beta.form.trust1': '14 dagen geld-terug',
  'beta.form.trust2': '€250/mo voor altijd',
  'beta.form.trust3': '1-op-1 onboarding met Seyed',

  // Beta page - OUTCOMES section
  'beta.outcomes.eyebrow': 'Wat je krijgt',
  'beta.outcomes.h2.line1': 'Geen features.',
  'beta.outcomes.h2.line2': 'Resultaten.',
  'beta.outcomes.sub':
    'Je Appie neemt een takenpakket volledig over. Niet als tool die je aanstuurt, maar als verantwoordelijke collega.',
  'beta.outcomes.o1.before': 'Inbox van 200 mails, jij tript eroverheen',
  'beta.outcomes.o1.after': 'Inbox getriad, concepten klaar in jouw stem, jij opent wat telt',
  'beta.outcomes.o1.label': 'E-mailbeheer',
  'beta.outcomes.o2.before': 'Facturen zoekraken, cashflow een verrassing',
  'beta.outcomes.o2.after': 'Appie scant dagelijks je mail, parst facturen, houdt je cashflow bij. Typ "ik heb betaling ontvangen" en hij werkt de tracker bij',
  'beta.outcomes.o2.label': 'Financieel overzicht',
  'beta.outcomes.o3.before': 'Leads komen binnen, blijven liggen',
  'beta.outcomes.o3.after': 'Leads gekwalificeerd, gescoord, opgevolgd. Nooit meer koud worden',
  'beta.outcomes.o3.label': 'Lead-intelligence',
  'beta.outcomes.o4.before': 'Content maken kost uren per stuk',
  'beta.outcomes.o4.after': 'Brief erin, content eruit, in jouw stem, klaar voor publicatie',
  'beta.outcomes.o4.label': 'Content-automatisering',
  'beta.outcomes.o5.before': 'Shopify-store draait deels, rest is handwerk',
  'beta.outcomes.o5.after': 'Orders, reviews, voorraadupdates, klantvragen: afgehandeld',
  'beta.outcomes.o5.label': 'Shopify en e-com',

  // Beta page - REAL USE CASES section
  'beta.usecases.eyebrow': 'Fleet-wide al gedaan',
  'beta.usecases.h2.line1': 'Dit hebben we al gebouwd.',
  'beta.usecases.h2.line2': 'Voor echte klanten.',
  'beta.usecases.sub':
    'Geen roadmap-beloftes. Dit zijn dingen die de Weblyfe-fleet vandaag al levert.',
  'beta.usecases.uc1.title': 'Webflow-beheer',
  'beta.usecases.uc1.body': 'CMS-updates, pagina-aanpassingen, nieuwe secties bouwen zonder dat jij iets hoeft aan te raken.',
  'beta.usecases.uc2.title': 'SEO-scan en aanpassingen',
  'beta.usecases.uc2.body': 'Appie scant je site, maakt een rapport, en voert de technische SEO-fixes automatisch door.',
  'beta.usecases.uc3.title': 'Domeinbeheer',
  'beta.usecases.uc3.body': 'DNS, SSL, verlooptijden, redirects. Geregeld voordat jij het merkt.',
  'beta.usecases.uc4.title': 'Webdesign en funnel-bouw',
  'beta.usecases.uc4.body': 'Volledige funnel inclusief automations, integraties en back-end logica. Van brief tot live.',
  'beta.usecases.uc5.title': 'E-com store: ontwerp, beheer, bouw',
  'beta.usecases.uc5.body': 'Van ontwerp tot dynamic prompting voor productbeschrijvingen. Appie beheert, Appie bouwt, Appie draait.',

  // Beta page - CHATBOT vs APPIE-AGENT section
  'beta.chatbot.eyebrow': 'Chatbot vs. Appie-agent',
  'beta.chatbot.h2.line1': 'Een chatbot wacht.',
  'beta.chatbot.h2.line2': 'Een Appie handelt.',
  'beta.chatbot.chatbot.label': 'Chatbot',
  'beta.chatbot.chatbot.p1': 'Wacht tot jij iets typt.',
  'beta.chatbot.chatbot.p2': 'Geen geheugen. Elk gesprek begint opnieuw.',
  'beta.chatbot.chatbot.p3': 'Geeft output. Jij voert uit.',
  'beta.chatbot.chatbot.p4': 'Weet niks van jouw klanten, je stem, je workflows.',
  'beta.chatbot.chatbot.p5': 'Kan niet mailen, boeken, CRM bijwerken.',
  'beta.chatbot.agent.label': 'Appie-agent',
  'beta.chatbot.agent.p1': 'Handelt proactief. Briefing zonder dat jij vraagt.',
  'beta.chatbot.agent.p2': 'Persistent geheugen. Onthoud klanten, afspraken, context.',
  'beta.chatbot.agent.p3': 'Voert zelf uit. Toets alleen bij risicovolle acties.',
  'beta.chatbot.agent.p4': 'Kent jouw stem, jouw klanten, jouw grenzen.',
  'beta.chatbot.agent.p5': 'Verbonden met inbox, agenda, CRM, Telegram.',

  // Beta page - OUD vs NIEUW section
  'beta.oldnew.eyebrow': 'Oud vs. nieuw',
  'beta.oldnew.h2.line1': 'Jouw werkweek.',
  'beta.oldnew.h2.line2': 'Opnieuw ontworpen.',
  'beta.oldnew.old.label': 'Zonder Appie',
  'beta.oldnew.old.r1': 'Elke ochtend inbox doorspitten voordat je aan werk toekomt',
  'beta.oldnew.old.r2': 'Leads handmatig opvolgen, soms te laat',
  'beta.oldnew.old.r3': 'Facturen zoeken, sheet bijhouden, cashflow raden',
  'beta.oldnew.old.r4': 'Klanten antwoorden wachten tot jij tijd hebt',
  'beta.oldnew.old.r5': 'Tools los van elkaar, overal handmatig schakelen',
  'beta.oldnew.new.label': 'Met Appie',
  'beta.oldnew.new.r1': 'Ochtend-briefing klaar. Jij opent alleen wat jouw beslissing vraagt',
  'beta.oldnew.new.r2': 'Leads gekwalificeerd en opgevolgd terwijl jij sliep',
  'beta.oldnew.new.r3': 'Cashflow-tracker bijgewerkt. Facturen in Drive. Geen verrassing',
  'beta.oldnew.new.r4': 'Eerste reactie binnen 30 seconden, dag en nacht',
  'beta.oldnew.new.r5': 'Alle tools verbonden. Appie schakelt. Jij niet',

  // Beta page - VALUE STACK section
  'beta.value.eyebrow': 'De waarde-berekening',
  'beta.value.h2.line1': 'Wat je krijgt.',
  'beta.value.h2.line2': 'Wat je betaalt.',
  'beta.value.sub':
    'De prijs is €250/mo. De waarde is een voltijdse digitale collega die dag en nacht werkt, niet ziek wordt en niet op vakantie gaat.',
  'beta.value.dream': 'Meer tijd voor wat telt, minder operationeel gedoe',
  'beta.value.likelihood': 'Seyed onboardt je persoonlijk. We draaien dit al voor echte klanten.',
  'beta.value.delay': 'Live binnen 48 uur na je onboarding.',
  'beta.value.effort': 'Jij vult een formulier in. Wij bouwen de rest.',
  'beta.value.dream.label': 'Droom-uitkomst',
  'beta.value.likelihood.label': 'Kans op succes',
  'beta.value.delay.label': 'Tijd tot resultaat',
  'beta.value.effort.label': 'Jouw inspanning',
  'beta.value.stack.label': 'Wat je krijgt voor €250/mo',
  'beta.value.stack.i1': 'Managed Techwiz op dedicated EU-server',
  'beta.value.stack.i2': 'Persoonlijke 1-op-1 onboarding met Seyed',
  'beta.value.stack.i3': 'Telegram-koppeling dag 1, inbox, agenda, CRM',
  'beta.value.stack.i4': 'Persistent geheugen. Onthoudt alles.',
  'beta.value.stack.i5': 'Dagelijkse briefings, actief 24/7',
  'beta.value.stack.i6': 'Lifetime updates, WhatsApp in Q3 2026',
  'beta.value.stack.i7': '14 dagen geld-terug, maandelijks opzegbaar',
  'beta.value.vs': 'vs. €250/mo',
  'beta.value.cta': 'Lock mijn €250 prijs',

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
  'hero.stat3': '€20M+ generated for clients',
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
    'Today Seyed has worked with more than 100 companies. From Roslan Bendenia and Lost LeBlanc to real estate entrepreneurs, e-commerce founders and financial coaches. Not as an executor, but as the person who looks along, thinks along, and raises the bar. His clients have together generated more than 20 million euros in revenue since he started working with them. He has lectured on digital strategy at the American University of Dubai. And he built Appie: an AI fleet that takes over your work week so you can focus on what matters.',
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
  'pdf.eyebrow': 'PDF Guide · v4.5 · €65',
  'pdf.h2': 'Build your own 24/7 Techwiz',
  'pdf.body':
    '10 chapters, 56 pages, real code. The complete blueprint from zero to your own Techwiz. Lifetime updates. One-time €65.',
  'pdf.cta': 'Buy the guide · €65',
  'pdf.card.title': 'Build your own Techwiz',
  'pdf.card.subtitle': 'Build Your Own Appie v4.5',
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

  // Beta page - metadata
  'beta.meta.title': 'Instant Appie BETA - €250/mo locked',
  'beta.meta.description':
    'Your fully managed Techwiz on Telegram. 5-10 spots, €250/mo locked forever. 14-day money-back. 1-on-1 onboarding with Seyed.',
  'beta.meta.og.title': 'Instant Appie BETA - €250/mo forever',
  'beta.meta.og.description':
    'Fully managed Techwiz. On Telegram day one, calendar, inbox, CRM. 5-10 spots.',
  'beta.meta.og.imgAlt': 'Instant Appie BETA - €250/mo locked',
  'beta.meta.tw.title': 'Instant Appie BETA - €250/mo locked',
  'beta.meta.tw.description':
    'Fully managed Techwiz. On Telegram day one, calendar, inbox, CRM. 5-10 spots.',

  // Beta page - hero
  'beta.hero.eyebrow': 'BETA . 5-10 spots . €250/mo locked',
  'beta.hero.h1.line1': 'Your personal Techwiz.',
  'beta.hero.h1.line2': 'Fully built for you.',
  'beta.hero.sub':
    'Instant Appie BETA: on Telegram from day one, with calendar, inbox and CRM. For a select group of 5-10 entrepreneurs: €250/mo locked forever. Even when the price goes to €488.',
  'beta.hero.cta.primary': 'Lock my €250 price',
  'beta.hero.cta.secondary': 'Compare with DIY and VA',
  'beta.hero.urgency': 'Only 5-10 spots left. Beta closes when full.',
  'beta.hero.imgAlt': 'Appie - your personal Techwiz',
  'beta.hero.badge.telegram': '[Telegram] 23 emails handled',
  'beta.hero.badge.calendar': '[Calendar] 4 calls booked',

  // Beta page - pricing comparison
  'beta.compare.eyebrow': 'Compare for yourself',
  'beta.compare.h2.line1': '€250/mo locked.',
  'beta.compare.h2.line2': 'Forever.',
  'beta.compare.card.label.accent': 'Beta price',
  'beta.compare.card.label.default': 'Option',
  'beta.compare.footnote':
    'The beta price of €250 is yours forever. Even after the public launch at €488.',

  // Beta page - pricing rows (body + note)
  'beta.row.diy.body': 'Chatbot. No memory. You type everything.',
  'beta.row.instant.note': 'locked forever',
  'beta.row.instant.body': 'Fully managed Techwiz. On Telegram day one.',
  'beta.row.full.body': 'WhatsApp + all connectors.',
  'beta.row.va.body': 'Human. 8h/week. Holiday cover not included.',
  'beta.row.ea.body': 'Human. Does not scale.',

  // Beta page - what is Instant Appie
  'beta.what.eyebrow': 'What is Instant Appie',
  'beta.what.h2.line1': 'Fully managed.',
  'beta.what.h2.line2': 'Zero setup.',
  'beta.what.sub':
    'Instant Appie is a fully managed Techwiz that Weblyfe builds, configures and runs on a dedicated server. No setup, no technical knowledge needed. You say what you want - we handle the rest.',
  'beta.what.bullet1.title': 'Your own dedicated server',
  'beta.what.bullet1.body': 'Hetzner EU, privacy-compliant. Your data never leaves Europe.',
  'beta.what.bullet2.title': 'Telegram, inbox, calendar and CRM',
  'beta.what.bullet2.body': 'Connected from day one to the tools where your work already runs.',
  'beta.what.bullet3.title': 'Persistent memory',
  'beta.what.bullet3.body': 'Remembers clients, appointments and preferences. Never starts from zero.',
  'beta.what.bullet4.title': '24/7 active',
  'beta.what.bullet4.body':
    'Works while you sleep. Lead at 22:14 gets qualified at 22:14.',

  // Beta page - beta benefits
  'beta.benefits.eyebrow': 'What you get',
  'beta.benefits.h2': 'What do you get as a beta client?',
  'beta.benefits.label': 'Benefit',
  'beta.benefits.b1.title': '1-on-1 onboarding with Seyed',
  'beta.benefits.b1.body':
    'Seyed personally builds and configures your Appie with you. 60-90 minute session.',
  'beta.benefits.b2.title': 'Telegram from day one',
  'beta.benefits.b2.body':
    'Inbox triage, calendar management, CRM and lead notifications. All in one chat.',
  'beta.benefits.b3.title': '€250/mo forever',
  'beta.benefits.b3.body':
    'Even when we go to €488 at public launch. Locked-in beta price.',
  'beta.benefits.b4.title': '14-day money-back',
  'beta.benefits.b4.body':
    'Not happy? Full refund, no questions. Then cancel monthly after that.',
  'beta.benefits.b5.title': 'Lifetime updates',
  'beta.benefits.b5.body':
    'Every new feature and connector we build, you get too. Including WhatsApp Q3 2026.',
  'beta.benefits.whatsapp.footnote':
    'WhatsApp is planned for Q3 2026 (public launch). Beta clients are first in line for the WhatsApp rollout.',

  // Beta page - how it works
  'beta.how.eyebrow': 'How it works',
  'beta.how.h2': 'From sign-up to live in 4 steps.',
  'beta.how.s1.title': 'Sign up',
  'beta.how.s1.body': 'Fill in the form. We read your use case and motivation personally.',
  'beta.how.s2.title': 'Call with Seyed',
  'beta.how.s2.body':
    'Within 24 hours Seyed schedules a short intake. Is the beta a good fit for you and your business?',
  'beta.how.s3.title': 'Onboarding session',
  'beta.how.s3.body':
    '60-90 minutes 1-on-1. Seyed builds your Techwiz live with you, in your voice and workflows.',
  'beta.how.s4.title': 'Live on Telegram',
  'beta.how.s4.body':
    'Within 24-48 hours after onboarding your Appie is running. Daily briefing in Telegram every morning.',

  // Beta page - social proof
  'beta.social.eyebrow': 'Real clients',
  'beta.social.h2.line1': 'Fully managed.',
  'beta.social.h2.line2': 'Built by us.',
  'beta.social.proof1.quote':
    'Appie is live on Telegram, answering leads within 30 seconds. Weblyfe handled the entire setup.',
  'beta.social.proof2.quote':
    '3 Appies run 50+ tasks per day for GDPR monitoring and compliance audit. Setup fully by Weblyfe.',
  'beta.social.proof3.quote':
    'Content production from 4 hours to 15 minutes per piece. My Appie runs day and night.',
  'beta.social.footnote':
    'All current clients were onboarded manually. The beta route makes this scalable.',

  // Beta page - FAQ
  'beta.faq.eyebrow': 'FAQ',
  'beta.faq.h2': 'Answers to the most common questions.',
  'beta.faq.q1': 'What is the difference between the beta and the public launch?',
  'beta.faq.a1':
    'The beta includes Telegram, inbox, calendar and CRM. WhatsApp and extra connectors are added at public launch (€488/mo). Beta clients always pay €250, even after that.',
  'beta.faq.q2': 'What if I want to upgrade to the full launch later?',
  'beta.faq.a2':
    'Nothing changes. Your beta price stays €250/mo, even when we add WhatsApp and all connectors at public launch. You get everything new clients get, at your locked-in price.',
  'beta.faq.q3': 'Can I stop if it is not for me?',
  'beta.faq.a3':
    'Yes. 14-day money-back guarantee, no questions asked. Then cancel monthly - no annual contract.',
  'beta.faq.q4': 'How quickly am I live?',
  'beta.faq.a4':
    'Within 24-48 hours after onboarding with Seyed you are live on Telegram. The 1-on-1 session itself takes 60-90 minutes.',
  'beta.faq.q5': 'Do I need technical knowledge?',
  'beta.faq.a5': 'No. Seyed handles the entire setup. You say what you want; he configures it.',
  'beta.faq.q6': 'Which tools can Appie connect to?',
  'beta.faq.a6':
    'Telegram (day 1), Gmail/Outlook, Google Calendar, Notion, Brevo, Moneybird, HubSpot, Airtable, TidyCal. WhatsApp Business in Q3 2026.',
  'beta.faq.q7': 'Is my data safe?',
  'beta.faq.a7':
    'Appie runs on a dedicated private server in the EU (Hetzner, Falkenstein or Helsinki). Your data never leaves the EU and does not train public AI models.',
  'beta.faq.q8': 'What if Appie does something wrong?',
  'beta.faq.a8':
    'Risky actions ping you first in Telegram. You always have override control. Seyed is reachable for the beta group.',
  'beta.faq.q9': 'How many spots are there?',
  'beta.faq.a9':
    '5 to 10. When the spots fill up, the beta closes. There will be a public waitlist, but it does not carry the €250 lock-in.',

  // Beta page - sign-up form section
  'beta.form.eyebrow': 'Reserve your spot',
  'beta.form.h2': 'Grab your spot before the beta closes.',
  'beta.form.sub':
    'Fill in the form. Seyed reads your motivation personally and schedules a short intake within 24 hours.',
  'beta.form.trust1': '14-day money-back',
  'beta.form.trust2': '€250/mo forever',
  'beta.form.trust3': '1-on-1 onboarding with Seyed',

  // Beta page - OUTCOMES section
  'beta.outcomes.eyebrow': 'What you get',
  'beta.outcomes.h2.line1': 'Not features.',
  'beta.outcomes.h2.line2': 'Outcomes.',
  'beta.outcomes.sub':
    'Your Appie takes full ownership of a task area. Not as a tool you steer, but as a responsible colleague.',
  'beta.outcomes.o1.before': 'Inbox of 200 emails, you dread opening it',
  'beta.outcomes.o1.after': 'Inbox triaged, drafts ready in your voice, you open only what matters',
  'beta.outcomes.o1.label': 'Email management',
  'beta.outcomes.o2.before': 'Invoices lost, cashflow a constant surprise',
  'beta.outcomes.o2.after': 'Appie scans your email daily, parses invoices, tracks your cashflow. Type "payment received" and he updates the tracker',
  'beta.outcomes.o2.label': 'Financial overview',
  'beta.outcomes.o3.before': 'Leads come in and go cold',
  'beta.outcomes.o3.after': 'Leads qualified, scored, followed up. Never go cold again',
  'beta.outcomes.o3.label': 'Lead intelligence',
  'beta.outcomes.o4.before': 'Creating content takes hours per piece',
  'beta.outcomes.o4.after': 'Brief in, content out, in your voice, ready to publish',
  'beta.outcomes.o4.label': 'Content automation',
  'beta.outcomes.o5.before': 'Shopify store runs partly, rest is manual work',
  'beta.outcomes.o5.after': 'Orders, reviews, stock updates, customer questions: handled',
  'beta.outcomes.o5.label': 'Shopify and e-com',

  // Beta page - REAL USE CASES section
  'beta.usecases.eyebrow': 'Fleet-wide already done',
  'beta.usecases.h2.line1': 'This is what we have already built.',
  'beta.usecases.h2.line2': 'For real clients.',
  'beta.usecases.sub':
    'No roadmap promises. These are things the Weblyfe fleet delivers today.',
  'beta.usecases.uc1.title': 'Webflow management',
  'beta.usecases.uc1.body': 'CMS updates, page edits, new sections built without you touching anything.',
  'beta.usecases.uc2.title': 'SEO scan and fixes',
  'beta.usecases.uc2.body': 'Appie scans your site, produces a report, and applies the technical SEO fixes automatically.',
  'beta.usecases.uc3.title': 'Domain management',
  'beta.usecases.uc3.body': 'DNS, SSL, expiry dates, redirects. Handled before you even notice.',
  'beta.usecases.uc4.title': 'Web design and funnel build',
  'beta.usecases.uc4.body': 'Full funnel including automations, integrations and back-end logic. From brief to live.',
  'beta.usecases.uc5.title': 'E-com store: design, manage, build',
  'beta.usecases.uc5.body': 'From design to dynamic prompting for product descriptions. Appie manages, Appie builds, Appie runs.',

  // Beta page - CHATBOT vs APPIE-AGENT section
  'beta.chatbot.eyebrow': 'Chatbot vs. Appie agent',
  'beta.chatbot.h2.line1': 'A chatbot waits.',
  'beta.chatbot.h2.line2': 'An Appie acts.',
  'beta.chatbot.chatbot.label': 'Chatbot',
  'beta.chatbot.chatbot.p1': 'Waits until you type something.',
  'beta.chatbot.chatbot.p2': 'No memory. Every conversation starts fresh.',
  'beta.chatbot.chatbot.p3': 'Gives output. You execute.',
  'beta.chatbot.chatbot.p4': 'Knows nothing about your clients, your voice, your workflows.',
  'beta.chatbot.chatbot.p5': 'Cannot email, book, or update your CRM.',
  'beta.chatbot.agent.label': 'Appie agent',
  'beta.chatbot.agent.p1': 'Acts proactively. Morning briefing without being asked.',
  'beta.chatbot.agent.p2': 'Persistent memory. Remembers clients, appointments, context.',
  'beta.chatbot.agent.p3': 'Executes itself. Only checks with you on high-risk actions.',
  'beta.chatbot.agent.p4': 'Knows your voice, your clients, your boundaries.',
  'beta.chatbot.agent.p5': 'Connected to inbox, calendar, CRM, Telegram.',

  // Beta page - OUD vs NIEUW section
  'beta.oldnew.eyebrow': 'Before vs. after',
  'beta.oldnew.h2.line1': 'Your work week.',
  'beta.oldnew.h2.line2': 'Redesigned.',
  'beta.oldnew.old.label': 'Without Appie',
  'beta.oldnew.old.r1': 'Every morning sifting through your inbox before real work begins',
  'beta.oldnew.old.r2': 'Following up leads manually, sometimes too late',
  'beta.oldnew.old.r3': 'Hunting for invoices, maintaining a spreadsheet, guessing cashflow',
  'beta.oldnew.old.r4': 'Clients waiting for replies until you have time',
  'beta.oldnew.old.r5': 'Tools disconnected, manual context-switching everywhere',
  'beta.oldnew.new.label': 'With Appie',
  'beta.oldnew.new.r1': 'Morning briefing ready. You open only what needs your decision',
  'beta.oldnew.new.r2': 'Leads qualified and followed up while you slept',
  'beta.oldnew.new.r3': 'Cashflow tracker updated. Invoices in Drive. No surprises',
  'beta.oldnew.new.r4': 'First response in under 30 seconds, day and night',
  'beta.oldnew.new.r5': 'All tools connected. Appie switches context. You do not',

  // Beta page - VALUE STACK section
  'beta.value.eyebrow': 'The value equation',
  'beta.value.h2.line1': 'What you get.',
  'beta.value.h2.line2': 'What you pay.',
  'beta.value.sub':
    'The price is €250/mo. The value is a full-time digital colleague who works day and night, never gets sick and never takes vacation.',
  'beta.value.dream': 'More time for what matters, less operational noise',
  'beta.value.likelihood': 'Seyed onboards you personally. We already run this for real clients.',
  'beta.value.delay': 'Live within 48 hours of your onboarding.',
  'beta.value.effort': 'You fill in a form. We build the rest.',
  'beta.value.dream.label': 'Dream outcome',
  'beta.value.likelihood.label': 'Likelihood of success',
  'beta.value.delay.label': 'Time to results',
  'beta.value.effort.label': 'Your effort',
  'beta.value.stack.label': 'What you get for €250/mo',
  'beta.value.stack.i1': 'Managed Techwiz on dedicated EU server',
  'beta.value.stack.i2': 'Personal 1-on-1 onboarding with Seyed',
  'beta.value.stack.i3': 'Telegram connection day 1, inbox, calendar, CRM',
  'beta.value.stack.i4': 'Persistent memory. Remembers everything.',
  'beta.value.stack.i5': 'Daily briefings, active 24/7',
  'beta.value.stack.i6': 'Lifetime updates, WhatsApp in Q3 2026',
  'beta.value.stack.i7': '14-day money-back, cancel monthly',
  'beta.value.vs': 'vs. €250/mo',
  'beta.value.cta': 'Lock my €250 price',

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
