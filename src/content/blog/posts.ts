export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMins: number;
  cover?: string;
  author: { name: string; portrait: string };
  tags: string[];
  paragraphs: { heading?: string; body: string }[];
};

export const POSTS: BlogPost[] = [
  {
    slug: 'wat-een-techwiz-wel-en-niet-doet',
    title: 'Wat een Techwiz wél (en niet) doet',
    excerpt:
      'Een Techwiz is geen chatbot, geen tool en geen AI-medewerker. Wat wel? Een digitale collega die verantwoordelijkheid neemt voor uitkomsten — en de saaie helft van je week opvreet.',
    date: '2026-05-03',
    readMins: 4,
    cover: '/origin-arc/scene-3-summoning-canonical.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Techwiz', 'Persona', 'Hoe het werkt'],
    paragraphs: [
      {
        body:
          'Iedere week komt het terug. Dezelfde inbox-puzzel, dezelfde intake-vragen, dezelfde admin die niemand wil doen. Een Techwiz pakt die laag van je werk over — niet door slimmer te zijn dan jou, maar door nooit moe te worden, nooit afgeleid te raken, en nooit een zondag te willen.',
      },
      {
        heading: 'Wel: verantwoordelijkheid voor uitkomsten',
        body:
          'Een tool voert een opdracht uit. Een Techwiz neemt eigenaarschap over een uitkomst. "Reageer op deze mail" is een opdracht. "Zorg dat onze offertes binnen 24 uur de deur uit zijn" is een uitkomst. Het verschil zit in wie nadenkt over de randgevallen — en bij een Techwiz ben jij dat niet meer.',
      },
      {
        heading: 'Wel: persistent geheugen',
        body:
          'ChatGPT vergeet alles na elk gesprek. Een Techwiz onthoudt wie je klanten zijn, hoe je ze aanspreekt, welke deals lopen, en waar je gisteren mee bezig was. Hij start de werkdag met een briefing en sluit hem af met een wrap-up.',
      },
      {
        heading: 'Wel: connect met jouw stack',
        body:
          'Google Workspace, Notion, Stripe, Telegram, WhatsApp, je CRM. Niet één tegelijk — alles tegelijk. Een Techwiz beweegt tussen je systemen zoals jij dat doet, alleen 24/7.',
      },
      {
        heading: 'Niet: een chatbot',
        body:
          'Chatbots wachten tot je iets vraagt. Een Techwiz wacht niet. Hij ziet dat een lead is binnengekomen om 23:14 en reageert. Hij ziet dat een factuur drie weken oud is en stuurt een herinnering. Hij ziet dat je agenda een conflict heeft en lost het op voor jij het merkt.',
      },
      {
        heading: 'Niet: een vervanging voor jou',
        body:
          'Jij bouwt. Jij beslist. Een Techwiz handelt het volume af zodat je hoofd vrij blijft voor de dingen die echt om jou vragen. Bij iets onomkeerbaars vraagt hij eerst — altijd jij aan de knoppen.',
      },
      {
        heading: 'Niet: een AI-medewerker',
        body:
          'Dat woord doet hem geen recht. Een AI-medewerker klinkt als een goedkope tweederangs collega. Een Techwiz is een geniale werknemer met de laagste kosten — een digitale collega die op een eigen private server draait, jouw data nooit deelt, en alleen voor jou werkt.',
      },
    ],
  },
  {
    slug: 'de-65-euro-pdf-in-3-minuten',
    title: 'De €65 PDF gids in 3 minuten',
    excerpt:
      'Tien hoofdstukken, 56 pagina\'s, echte code. Wat zit er precies in de Bouw-zelf gids — en voor wie is hij bedoeld?',
    date: '2026-05-02',
    readMins: 3,
    cover: '/appie-pdf-cover.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['PDF gids', 'Bouw zelf', 'Pricing'],
    paragraphs: [
      {
        body:
          'De gids "Build Your Own Appie v4.4" is het complete blueprint van nul tot je eigen Techwiz die op een private server draait. Geen marketingtaal, geen filler — copy/paste templates, configuratiebestanden en de exacte stappen die wij intern volgen.',
      },
      {
        heading: 'Voor wie',
        body:
          'Builders en no-coders die willen leren hoe het in elkaar zit. Als je ooit een Make-flow of Zapier-zap hebt opgezet, kun je hier doorheen. Niet als je verwacht dat het zonder werk klaar staat — daarvoor hebben we Instant Appie (€250/mo).',
      },
      {
        heading: 'Wat zit erin',
        body:
          '10 hoofdstukken: persona-design, server setup, MCP servers, geheugen-architectuur, Telegram + WhatsApp integratie, n8n workflows, skills library (55+), Brevo + Stripe + Notion connectors, security & rotaties, en een launch-checklist.',
      },
      {
        heading: 'Lifetime updates',
        body:
          'Eenmalig €65, voor altijd. Iedere keer als we de gids updaten (gemiddeld 1x/maand), krijg je de nieuwe versie automatisch in je mail. Geen abo, geen verlengingen.',
      },
      {
        heading: 'Wat het niet is',
        body:
          'Geen cursus met video\'s, geen Discord-community. Het is een PDF + de bijbehorende code. Je werkt op je eigen tempo, in je eigen terminal. Vragen? Stuur ze naar hello@weblyfe.ai — we reageren persoonlijk.',
      },
    ],
  },
  {
    slug: 'hoe-eva-24-7-dubai-property-runt',
    title: 'Hoe Eva 24/7 Dubai-Property runt',
    excerpt:
      'Eva is een Custom Appie die voor Dubai-Property.nl property inquiries afhandelt, viewings inplant en kopers kwalificeert — terwijl iedereen slaapt.',
    date: '2026-05-01',
    readMins: 5,
    cover: '/agents/eva.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Custom Appie', 'Eva'],
    paragraphs: [
      {
        body:
          'Eva is geen chatbot. Eva is een 24/7 lead qualifier voor Dubai-Property.nl die op een eigen Mac Mini in Rotterdam draait. Ze leest binnenkomende inquiries, kwalificeert kopers via een vragenlijst, plant viewings in de agenda, en stuurt warme leads door naar het sales team — in real-time, met persistent geheugen.',
      },
      {
        heading: 'De setup',
        body:
          'Mac Mini M2 als persoonlijke server. OpenClaw runtime. Verbonden met Telegram, WhatsApp, Brevo en de Notion CRM van Dubai-Property. Eva heeft een eigen persoonlijkheid — formeel, geduldig, meertalig — en spreekt Engels, Nederlands, Russisch en Arabisch.',
      },
      {
        heading: 'Wat ze doet',
        body:
          'Inquiry binnen via WhatsApp Business: Eva reageert binnen 30 seconden, kwalificeert budget en tijdslijn, vraagt naar specifieke voorkeuren (locatie, type, off-plan vs ready), en plant een viewing in. Buiten kantooruren? Geen probleem — ze nodigt de lead uit voor een tijdslot het volgende werkmoment.',
      },
      {
        heading: 'Het verschil',
        body:
          'Vroeger lagen leads tot de volgende ochtend te wachten. Nu is de eerste reactie binnen 30 seconden, 24/7. 40% van de inquiries komt buiten Nederlandse kantooruren binnen — die haakten voorheen af.',
      },
      {
        heading: 'Wat dit niet is',
        body:
          'Eva is geen WhatsApp auto-responder met scripts. Ze leest context. Een lead die schrijft "I saw the apartment in Marina, still available?" krijgt een ander pad dan iemand die "Looking for off-plan, 2BR, Q4 2027 ready" schrijft. Eva onthoudt waar het gesprek gisteren eindigde en pakt het vandaag op.',
      },
      {
        heading: 'Voor wie is een Custom Appie',
        body:
          'Voor bedrijven met genoeg volume om de €2.000/mo te rechtvaardigen — typisch 50+ leads per maand of een specifieke flow die je menselijke collega\'s nu beslag op legt. Boutique projecten zoals Eva bouwen we van A tot Z, custom voor jouw stack en stem.',
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return POSTS.map(p => p.slug);
}

export function getLatestPosts(n: number): BlogPost[] {
  return [...POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, n);
}
