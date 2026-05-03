import type { Locale } from '@/i18n/messages';

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

const nl: BlogPost[] = [
  {
    slug: 'wat-een-techwiz-wel-en-niet-doet',
    title: 'Wat een Techwiz wél (en niet) doet',
    excerpt:
      'Een Techwiz is geen chatbot, geen tool en geen AI-medewerker. Wat wel? Een digitale collega die verantwoordelijkheid neemt voor uitkomsten - en de saaie helft van je week opvreet.',
    date: '2026-05-03',
    readMins: 4,
    cover: '/agents/appie-iconic.png',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Techwiz', 'Persona', 'Hoe het werkt'],
    paragraphs: [
      {
        body:
          'Iedere week komt het terug. Dezelfde inbox-puzzel, dezelfde intake-vragen, dezelfde admin die niemand wil doen. Een Techwiz pakt die laag van je werk over - niet door slimmer te zijn dan jou, maar door nooit moe te worden, nooit afgeleid te raken, en nooit een zondag te willen.',
      },
      {
        heading: 'Wel: verantwoordelijkheid voor uitkomsten',
        body:
          'Een tool voert een opdracht uit. Een Techwiz neemt eigenaarschap over een uitkomst. "Reageer op deze mail" is een opdracht. "Zorg dat onze offertes binnen 24 uur de deur uit zijn" is een uitkomst. Het verschil zit in wie nadenkt over de randgevallen - en bij een Techwiz ben jij dat niet meer.',
      },
      {
        heading: 'Wel: persistent geheugen',
        body:
          'ChatGPT vergeet alles na elk gesprek. Een Techwiz onthoudt wie je klanten zijn, hoe je ze aanspreekt, welke deals lopen, en waar je gisteren mee bezig was. Hij start de werkdag met een briefing en sluit hem af met een wrap-up.',
      },
      {
        heading: 'Wel: connect met jouw stack',
        body:
          'Google Workspace, Notion, Stripe, Telegram, WhatsApp, je CRM. Niet één tegelijk - alles tegelijk. Een Techwiz beweegt tussen je systemen zoals jij dat doet, alleen 24/7.',
      },
      {
        heading: 'Niet: een chatbot',
        body:
          'Chatbots wachten tot je iets vraagt. Een Techwiz wacht niet. Hij ziet dat een lead is binnengekomen om 23:14 en reageert. Hij ziet dat een factuur drie weken oud is en stuurt een herinnering. Hij ziet dat je agenda een conflict heeft en lost het op voor jij het merkt.',
      },
      {
        heading: 'Niet: een vervanging voor jou',
        body:
          'Jij bouwt. Jij beslist. Een Techwiz handelt het volume af zodat je hoofd vrij blijft voor de dingen die echt om jou vragen. Bij iets onomkeerbaars vraagt hij eerst - altijd jij aan de knoppen.',
      },
      {
        heading: 'Niet: een AI-medewerker',
        body:
          'Dat woord doet hem geen recht. Een AI-medewerker klinkt als een goedkope tweederangs collega. Een Techwiz is een geniale werknemer met de laagste kosten - een digitale collega die op een eigen private server draait, jouw data nooit deelt, en alleen voor jou werkt.',
      },
    ],
  },
  {
    slug: 'de-65-euro-pdf-in-3-minuten',
    title: 'De €65 PDF gids in 3 minuten',
    excerpt:
      'Tien hoofdstukken, 56 pagina\'s, echte code. Wat zit er precies in de Bouw-zelf gids - en voor wie is hij bedoeld?',
    date: '2026-05-02',
    readMins: 3,
    cover: '/appie-pdf-cover.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['PDF gids', 'Bouw zelf', 'Pricing'],
    paragraphs: [
      {
        body:
          'De gids "Build Your Own Appie v4.4" is het complete blueprint van nul tot je eigen Techwiz die op een private server draait. Geen marketingtaal, geen filler - copy/paste templates, configuratiebestanden en de exacte stappen die wij intern volgen.',
      },
      {
        heading: 'Voor wie',
        body:
          'Builders en no-coders die willen leren hoe het in elkaar zit. Als je ooit een Make-flow of Zapier-zap hebt opgezet, kun je hier doorheen. Niet als je verwacht dat het zonder werk klaar staat - daarvoor hebben we Instant Appie (€250/mo).',
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
          'Geen cursus met video\'s, geen Discord-community. Het is een PDF + de bijbehorende code. Je werkt op je eigen tempo, in je eigen terminal. Vragen? Stuur ze naar hello@weblyfe.ai - we reageren persoonlijk.',
      },
    ],
  },
  {
    slug: 'hoe-eva-24-7-dubai-property-runt',
    title: 'Hoe Eva 24/7 Dubai-Property runt',
    excerpt:
      'Eva is een Custom Appie die voor Dubai-Property.nl property inquiries afhandelt, viewings inplant en kopers kwalificeert - terwijl iedereen slaapt.',
    date: '2026-05-01',
    readMins: 5,
    cover: '/agents/eva.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Custom Appie', 'Eva'],
    paragraphs: [
      {
        body:
          'Eva is geen chatbot. Eva is een 24/7 lead qualifier voor Dubai-Property.nl die op een eigen Mac Mini in Rotterdam draait. Ze leest binnenkomende inquiries, kwalificeert kopers via een vragenlijst, plant viewings in de agenda, en stuurt warme leads door naar het sales team - in real-time, met persistent geheugen.',
      },
      {
        heading: 'De setup',
        body:
          'Mac Mini M2 als persoonlijke server. OpenClaw runtime. Verbonden met Telegram, WhatsApp, Brevo en de Notion CRM van Dubai-Property. Eva heeft een eigen persoonlijkheid - formeel, geduldig, meertalig - en spreekt Engels, Nederlands, Russisch en Arabisch.',
      },
      {
        heading: 'Wat ze doet',
        body:
          'Inquiry binnen via WhatsApp Business: Eva reageert binnen 30 seconden, kwalificeert budget en tijdslijn, vraagt naar specifieke voorkeuren (locatie, type, off-plan vs ready), en plant een viewing in. Buiten kantooruren? Geen probleem - ze nodigt de lead uit voor een tijdslot het volgende werkmoment.',
      },
      {
        heading: 'Het verschil',
        body:
          'Vroeger lagen leads tot de volgende ochtend te wachten. Nu is de eerste reactie binnen 30 seconden, 24/7. 40% van de inquiries komt buiten Nederlandse kantooruren binnen - die haakten voorheen af.',
      },
      {
        heading: 'Wat dit niet is',
        body:
          'Eva is geen WhatsApp auto-responder met scripts. Ze leest context. Een lead die schrijft "I saw the apartment in Marina, still available?" krijgt een ander pad dan iemand die "Looking for off-plan, 2BR, Q4 2027 ready" schrijft. Eva onthoudt waar het gesprek gisteren eindigde en pakt het vandaag op.',
      },
      {
        heading: 'Voor wie is een Custom Appie',
        body:
          'Voor bedrijven met genoeg volume om de €2.000/mo te rechtvaardigen - typisch 50+ leads per maand of een specifieke flow die je menselijke collega\'s nu beslag op legt. Boutique projecten zoals Eva bouwen we van A tot Z, custom voor jouw stack en stem.',
      },
    ],
  },
  {
    slug: 'boooth-custom-configurator',
    title: 'Boooth: een configurator die meedenkt',
    excerpt:
      'Boooth verhuurt premium photobooths op corporate events. Geen standaard boekingsformulier. Wij bouwden een configurator die complexe logica, live reiskosten en automatische offertes in één stroom samenvoegt.',
    date: '2026-04-20',
    readMins: 5,
    cover: '/screenshots/boooth-configurator.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Webflow', 'Automations'],
    paragraphs: [
      {
        body: 'Jason Tuhumena bouwde Boooth in twaalf jaar uit tot marktleider in premium photo marketing voor corporate events. Zijn klanten zijn Nike, KLM, Shell en Karl Lagerfeld. Op dat niveau is een standaard contactformulier geen optie. Complex productaanbod, tientallen maatwerkkeuzes, live reiskosten en directe offertes vragen om een systeem dat zo soepel werkt als de events zelf.',
      },
      {
        heading: 'Wat we bouwden',
        body: 'Weblyfe bouwde een volledig custom booking- en configuratorplatform op Webflow. De configurator loopt bezoekers stap voor stap door het aanbod: drie boothtypen (Open Air, Photo Booth, Mirror Booth), personalisatieopties, beeldmateriaal en capaciteiten. Op de achtergrond berekent het systeem automatisch de reiskosten op basis van postcode. Buiten de 50 km-grens rond Alphen aan den Rijn tikt de teller live mee: €0,40 per kilometer, direct zichtbaar in het overzicht.',
      },
      {
        heading: 'Van lead tot offerte: geen handmatig werk',
        body: 'Zodra een aanvraag binnenkomt, genereert de automation-stack automatisch een offerte via Offorte en stuurt die direct naar de klant. Zapier koppelt de boeking aan interne workflows. Het team bij Boooth hoeft nooit meer handmatig te rekenen of te kopiëren. Het systeem doet het, elke keer, zonder uitzondering. Geen verloren leads, geen foutieve prijzen, geen dubbele invoer.',
      },
      {
        heading: 'Wat dit voor Boooth betekent',
        body: 'Een marktleider met 5.000+ tevreden klanten en een 4.8/5-beoordeling op Google kan zich geen rommelig boekingsproces veroorloven. De custom configurator verlengt die reputatie naar het digitale kanaal. Bezoekers die via booking.boooth.nl een aanvraag doen, ervaren dezelfde kwaliteit als het event zelf: snel, helder, foutloos. Het systeem schaalt mee als Boooth groeit, zonder dat het team mee hoeft te schalen.',
      },
      {
        heading: 'Wat we onderhouden',
        body: 'De Webflow-site is opgebouwd zodat Jason en zijn team zelf teksten, foto\'s en opties kunnen bijwerken via een eenvoudige editor. Wij beheren de achterliggende configuratorlogica en automation-koppelingen. Werkt er iets anders door een nieuw boothtype of aangepaste tarievenstructuur? Dan past het systeem zich aan zonder dat de hele site opnieuw gebouwd wordt.',
      },
      {
        heading: 'Voor wie is dit patroon geschikt',
        body: 'Bedrijven die complexe diensten of producten verkopen waarbij prijs afhangt van variabelen als locatie, duur, personalisatie of groepsgrootte. Verhuurplatformen, event- en cateringbedrijven, traiteurs, transportdiensten met maatwerk: overal waar een klant op je site moet configureren in plaats van alleen selecteren, loont een op maat gebouwde configurator met directe prijsberekening en automatische offerte.',
      },
    ],
  },
  {
    slug: 'titan-transfers-luxe-transport-platform',
    title: 'Titan Transfers: premium rijden, moeiteloos boeken',
    excerpt:
      'Grigor Sayadyan reed al presidenten rond voordat hij een website had. Weblyfe bouwde de digitale kant die bij die klasse past: merk, platform en boekingsstroom in zes weken live.',
    date: '2026-04-24',
    readMins: 5,
    cover: '/screenshots/titantransfers-home-fresh.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Webflow', 'Luxury'],
    paragraphs: [
      {
        body: 'Grigor Sayadyan begon Titan Transfers samen met zijn schoonvader en had al VIP-klanten op zijn lijst, inclusief staatshoofden, voordat zijn digitale aanwezigheid dat niveau weerspiegelde. Zakenlui, delegaties en event-organisatoren die premium chauffeursservice zoeken in België en Nederland verwachten op de website dezelfde klasse als in de auto. Dat gat wilden we dichten.',
      },
      {
        heading: 'Merk en identiteit eerst',
        body: 'We begonnen met een volledige merkstrategie en visueel identiteitssysteem: verfijnd kleurenpalet, elegante typografie, professionele vlootfotografie. Het logo en de huisstijl communiceren vertrouwen, luxe en persoonlijke service in één oogopslag. Alles is vastgelegd in een brandingguide die Grigor kan meenemen naar welk kanaal dan ook, van visitekaartje tot advertentiecampagne.',
      },
      {
        heading: 'De site en het boekingssysteem',
        body: 'Op Webflow bouwden we een drietalige site (Nederlands, Frans, Engels) met een intuïtieve boekingsmodule. Bezoekers kiezen hun route, voertuigklasse (van Economy sedan tot Luxury), datum en eventuele extras. Betalingen lopen via iDeal, Bancontact, Apple Pay, Mastercard, Visa en Amex. Na boeking gaat automatisch een bevestigingsmail naar de klant, en tegelijkertijd een notificatie naar Grigor en de chauffeur. Geen WhatsApp-heen-en-weer, geen handmatige invoer.',
      },
      {
        heading: 'Wat de klant ervaart',
        body: 'Een zakelijke reiziger die in vijf minuten een luchthaventransfer boekt, een bevestiging in zijn inbox heeft en de chauffeur ontmoet met een bordje bij aankomst: dat is de flow die de site levert. De dienstverlening van Titan Transfers begint niet op de luchthaven maar op de website. De UX is bewust simpel gehouden. Hoe minder klikken naar een boeking, hoe eerder een executive kiest voor een terugkeer.',
      },
      {
        heading: 'Schaalbaar naar nieuwe steden',
        body: 'Titan Transfers begint in België maar wil groeien. Het platform is opgebouwd met servicegebied-logica en een Webflow CMS dat nieuwe steden, voertuigen en routes toelaat zonder herprogrammeren. De SEO-structuur is ingericht per regio zodat organisch zoekverkeer meegroeit met het aanbod. Advertenties draaien direct op een pagina die converteert.',
      },
      {
        heading: 'Hetzelfde patroon werkt elders',
        body: 'Premium dienstverlening die op kwaliteit wil worden beoordeeld, niet op prijs. Conciërgeservices, privé-vliegtuigcharters, luxe wellness-centra, boutique advocatenkantoren: zodra de dienst zelf hoogwaardig is maar de digitale entree dat nog niet uitstraalt, is de kloof groter dan je denkt. Een sterk merk plus een frictieloze boeking dichten die kloof sneller dan advertentiebudget.',
      },
    ],
  },
  {
    slug: 'stickx-arcade-investeerder-platform',
    title: 'Stickx Arcade: een investeringspagina die vertrouwen verkoopt',
    excerpt:
      'Stickx Arcade haalt kapitaal op voor vier nieuwe locaties. Weblyfe bouwde de investor site met KYC-stroom, aandelen-configurator, juridische documentatie en een betaalflow. Alles in het Nederlands, alles AFM-conform.',
    date: '2026-04-28',
    readMins: 6,
    cover: '/screenshots/stickxarcade-investeren.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Investor', 'Webflow'],
    paragraphs: [
      {
        body: 'Stickx Arcade is een premium social-entertainment concept met arcades, sociale games en een sterke loyale community. De volgende stap is schaal: vier nieuwe locaties in Nederland en België. Om dat te financieren opende Stickx een participatieronde voor particuliere investeerders via certificaten van aandelen. Het probleem: een investeringssite voor particulieren vraagt om transparantie, juridische helderheid en een boekingsstroom die vertrouwen opbouwt vanaf de eerste klik.',
      },
      {
        heading: 'Wat we bouwden',
        body: 'Weblyfe bouwde investeren.stickxarcade.com, een dedicated investor landing page en app in Bolt.new en Webflow. De site heeft een duidelijke stroom: van merkintroductie en groeiverhaal, naar investeringsvoorwaarden, naar de daadwerkelijke instap. Bezoekers zien op elk punt exact waar ze zijn en wat de volgende stap is. De hero is bewust lichter en frisser gehouden dan het standaard Stickx-stijlblad. Dat maakt het platform betrouwbaarder voor een nieuw investeerderspubliek.',
      },
      {
        heading: 'Investeringsflow en betaling',
        body: 'Stap één: investeerder kiest het aantal certificaten. Instap vanaf €750 (100 certificaten), minimale deelname via de app vanaf €1.500 (200 certificaten). Stap twee: overzicht van rendement (7% jaarlijks dividend, per kwartaal uitgekeerd, plus potentiële waardestijging van de aandelen). Stap drie: betaling via iDeal, Bancontact of bankoverschrijving. Na afronding ontvangt de investeerder automatisch de certificaatbevestiging. Certificaten worden uitgegeven via Stickx STAK B.V.; de aandelen zijn niet-stemgerechtigd.',
      },
      {
        heading: 'Transparantie en juridische laag',
        body: 'Investeerders mogen vragen stellen. Stickx geeft antwoord, niet alleen via een FAQ maar via een volledig documentatiepakket: informatiememorandum, AFM-informatiedocument, FSMA-investeerdersnota, certificaatvoorwaarden, oprichtingsakte en KvK-registraties van Stickx en de holding. Alle documenten zijn downloadbaar of direct in de browser te bekijken. Het is geen kleine print; het is de hoofdtekst.',
      },
      {
        heading: 'Vertrouwen bouwen met content',
        body: 'Naast de documentatielaag heeft de site een sectie met de oprichter: foto, missie, persoonlijk verhaal. Een embedded video van een investeerder die haar eigen ervaring deelt. Marktpositionering die uitlegt waarom fysieke social entertainment groeit terwijl retail krimpt. Geen loze beloften, geen garantieclaims, wel de context waarmee een verstandige particulier zelf een afweging kan maken.',
      },
      {
        heading: 'Voor wie is dit patroon geschikt',
        body: 'Ondernemers die kapitaal ophalen via een semi-openbare ronde: crowdfundingplatformen, vastgoedontwikkelaars met participatietrajecten, sportclubs met ledenobligaties, energiecoöperaties. Zodra je particuliere investeerders wilt overtuigen via een website, zijn transparantie en gebruiksgemak je twee sterkste verkoopargumenten, niet het rendement op zich.',
      },
    ],
  },
];

const en: BlogPost[] = [
  {
    slug: 'wat-een-techwiz-wel-en-niet-doet',
    title: 'What a Techwiz Does (and Does Not) Do',
    excerpt:
      'A Techwiz is not a chatbot, not a tool, and not an AI worker. What is it then? A digital colleague that takes ownership of outcomes - and eats up the boring half of your week.',
    date: '2026-05-03',
    readMins: 4,
    cover: '/agents/appie-iconic.png',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Techwiz', 'Persona', 'How it works'],
    paragraphs: [
      { body: 'It comes back every week. The same inbox puzzle, the same intake questions, the same admin nobody wants to touch. A Techwiz takes that layer of work off your plate - not by being smarter than you, but by never getting tired, never getting distracted, and never wanting a Sunday off.' },
      { heading: 'Yes: ownership of outcomes', body: 'A tool executes a command. A Techwiz takes ownership of a result. "Reply to this email" is a command. "Make sure our quotes go out within 24 hours" is a result. The difference is who thinks about the edge cases - and with a Techwiz, that is no longer you.' },
      { heading: 'Yes: persistent memory', body: 'ChatGPT forgets everything after each conversation. A Techwiz remembers who your clients are, how you address them, which deals are in progress, and what you were working on yesterday. It starts the workday with a briefing and closes it with a wrap-up.' },
      { heading: 'Yes: connects to your stack', body: 'Google Workspace, Notion, Stripe, Telegram, WhatsApp, your CRM. Not one at a time - all at once. A Techwiz moves between your systems the way you do, just 24/7.' },
      { heading: 'Not: a chatbot', body: 'Chatbots wait for you to ask something. A Techwiz does not wait. It sees that a lead came in at 23:14 and responds. It sees that an invoice is three weeks old and sends a reminder. It sees that your calendar has a conflict and resolves it before you even notice.' },
      { heading: 'Not: a replacement for you', body: 'You build. You decide. A Techwiz handles the volume so your head stays free for the things that genuinely need you. With anything irreversible, it asks first - you are always at the controls.' },
      { heading: 'Not: an AI employee', body: 'That label does not do it justice. An AI employee sounds like a cheap second-tier colleague. A Techwiz is a brilliant worker at the lowest cost - a digital colleague running on its own private server, never sharing your data, working exclusively for you.' },
    ],
  },
  {
    slug: 'de-65-euro-pdf-in-3-minuten',
    title: 'The €65 PDF Guide in 3 Minutes',
    excerpt:
      'Ten chapters, 56 pages, real code. What exactly is inside the Build-it-yourself guide - and who is it for?',
    date: '2026-05-02',
    readMins: 3,
    cover: '/appie-pdf-cover.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['PDF guide', 'Build it yourself', 'Pricing'],
    paragraphs: [
      { body: 'The guide "Build Your Own Appie v4.4" is the complete blueprint from zero to your own Techwiz running on a private server. No marketing language, no filler - copy/paste templates, configuration files, and the exact steps we follow internally.' },
      { heading: 'Who it is for', body: 'Builders and no-coders who want to understand how it all fits together. If you have ever set up a Make flow or a Zapier zap, you can get through this. Not if you expect it to be ready without effort - for that, we have Instant Appie (€250/mo).' },
      { heading: 'What is inside', body: '10 chapters: persona design, server setup, MCP servers, memory architecture, Telegram and WhatsApp integration, n8n workflows, skills library (55+), Brevo, Stripe, and Notion connectors, security and key rotation, and a launch checklist.' },
      { heading: 'Lifetime updates', body: 'One-time €65, forever. Every time we update the guide (on average once a month), you get the new version automatically in your inbox. No subscription, no renewals.' },
      { heading: 'What it is not', body: 'No video course, no Discord community. It is a PDF plus the accompanying code. You work at your own pace, in your own terminal. Questions? Send them to hello@weblyfe.ai - we reply personally.' },
    ],
  },
  {
    slug: 'hoe-eva-24-7-dubai-property-runt',
    title: 'How Eva Runs Dubai-Property 24/7',
    excerpt:
      'Eva is a Custom Appie that handles property inquiries, schedules viewings, and qualifies buyers for Dubai-Property.nl - while everyone is asleep.',
    date: '2026-05-01',
    readMins: 5,
    cover: '/agents/eva.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Custom Appie', 'Eva'],
    paragraphs: [
      { body: 'Eva is not a chatbot. Eva is a 24/7 lead qualifier for Dubai-Property.nl running on a dedicated Mac Mini in Rotterdam. She reads incoming inquiries, qualifies buyers through a structured questionnaire, schedules viewings in the calendar, and forwards warm leads to the sales team - in real time, with persistent memory.' },
      { heading: 'The setup', body: 'Mac Mini M2 as a personal server. OpenClaw runtime. Connected to Telegram, WhatsApp, Brevo, and the Dubai-Property Notion CRM. Eva has her own personality - formal, patient, multilingual - and speaks English, Dutch, Russian, and Arabic.' },
      { heading: 'What she does', body: 'Inquiry arrives via WhatsApp Business: Eva responds within 30 seconds, qualifies budget and timeline, asks about specific preferences (location, type, off-plan vs ready), and schedules a viewing. Outside office hours? No problem - she invites the lead to pick a slot at the next available workday moment.' },
      { heading: 'The difference it makes', body: 'Before Eva, leads sat waiting until the next morning. Now the first response is within 30 seconds, 24/7. 40% of inquiries come in outside Dutch office hours - those used to drop off. They no longer do.' },
      { heading: 'What this is not', body: 'Eva is not a WhatsApp auto-responder with scripts. She reads context. A lead who writes "I saw the apartment in Marina, still available?" follows a different path than someone writing "Looking for off-plan, 2BR, Q4 2027 ready." Eva remembers where the conversation left off yesterday and picks it up today.' },
      { heading: 'Who a Custom Appie is for', body: 'For businesses with enough volume to justify €2.000/mo - typically 50+ leads per month or a specific flow that is currently occupying your human colleagues. Boutique projects like Eva we build from A to Z, custom for your stack and your voice.' },
    ],
  },
  {
    slug: 'boooth-custom-configurator',
    title: 'Boooth: A Configurator That Thinks Along',
    excerpt:
      'Boooth rents premium photo booths at corporate events. No standard booking form. We built a configurator that combines complex logic, live travel costs, and automatic quotes in one seamless flow.',
    date: '2026-04-20',
    readMins: 5,
    cover: '/screenshots/boooth-configurator.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Webflow', 'Automations'],
    paragraphs: [
      { body: 'Jason Tuhumena built Boooth over twelve years into the market leader in premium photo marketing for corporate events. His clients include Nike, KLM, Shell, and Karl Lagerfeld. At that level, a standard contact form is not an option. A complex product range, dozens of customisation choices, live travel costs, and instant quotes demand a system that runs as smoothly as the events themselves.' },
      { heading: 'What we built', body: 'Weblyfe built a fully custom booking and configurator platform on Webflow. The configurator walks visitors step by step through the offering: three booth types (Open Air, Photo Booth, Mirror Booth), personalisation options, imagery, and capacities. In the background, the system automatically calculates travel costs based on postal code. Beyond the 50 km boundary around Alphen aan den Rijn, the meter runs live: €0.40 per kilometre, visible in real time in the summary.' },
      { heading: 'From lead to quote: no manual work', body: 'As soon as a request comes in, the automation stack automatically generates a quote via Offorte and sends it directly to the client. Zapier connects the booking to internal workflows. The Boooth team never has to calculate or copy manually again. The system does it every time, without exception. No lost leads, no incorrect pricing, no double entry.' },
      { heading: 'What this means for Boooth', body: 'A market leader with 5.000+ satisfied clients and a 4.8/5 rating on Google cannot afford a messy booking process. The custom configurator extends that reputation into the digital channel. Visitors who submit a request via booking.boooth.nl experience the same quality as the event itself: fast, clear, flawless. The system scales with Boooth as it grows, without requiring the team to scale with it.' },
      { heading: 'What we maintain', body: 'The Webflow site is structured so that Jason and his team can update text, photos, and options themselves via a simple editor. We manage the underlying configurator logic and automation connections. If something changes because of a new booth type or revised pricing structure, the system adapts without rebuilding the entire site.' },
      { heading: 'Who this pattern fits', body: 'Businesses that sell complex services or products where price depends on variables like location, duration, personalisation, or group size. Rental platforms, event and catering companies, transport services with custom pricing: anywhere a client needs to configure rather than simply select, a purpose-built configurator with live pricing and automatic quotes pays for itself.' },
    ],
  },
  {
    slug: 'titan-transfers-luxe-transport-platform',
    title: 'Titan Transfers: Premium Rides, Effortless Booking',
    excerpt:
      'Grigor Sayadyan was already chauffeuring presidents before he had a website. Weblyfe built the digital side that matches that class: brand, platform, and booking flow live in six weeks.',
    date: '2026-04-24',
    readMins: 5,
    cover: '/screenshots/titantransfers-home-fresh.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Webflow', 'Luxury'],
    paragraphs: [
      { body: 'Grigor Sayadyan co-founded Titan Transfers with his father-in-law and already had VIP clients on his roster - including heads of state - before his digital presence reflected that level. Business travellers, delegations, and event organisers looking for premium chauffeur service in Belgium and the Netherlands expect the same quality on the website as in the car. That gap is what we came to close.' },
      { heading: 'Brand and identity first', body: 'We started with a full brand strategy and visual identity system: a refined colour palette, elegant typography, professional fleet photography. The logo and house style communicate trust, luxury, and personal service at a glance. Everything is captured in a branding guide that Grigor can take to any channel, from business card to ad campaign.' },
      { heading: 'The site and booking system', body: 'On Webflow we built a trilingual site (Dutch, French, English) with an intuitive booking module. Visitors choose their route, vehicle class (from Economy sedan to Luxury), date, and any extras. Payments run via iDeal, Bancontact, Apple Pay, Mastercard, Visa, and Amex. After booking, a confirmation email goes automatically to the client and a notification simultaneously to Grigor and the driver. No WhatsApp back-and-forth, no manual entry.' },
      { heading: 'What the client experiences', body: 'A business traveller who books an airport transfer in five minutes, has a confirmation in their inbox, and meets the driver with a sign at arrivals: that is the flow the site delivers. The service experience of Titan Transfers does not start at the airport - it starts on the website. The UX is deliberately kept simple. The fewer clicks to a booking, the more likely an executive is to come back.' },
      { heading: 'Built to scale into new cities', body: 'Titan Transfers starts in Belgium but plans to grow. The platform is built with service-area logic and a Webflow CMS that supports new cities, vehicles, and routes without reprogramming. The SEO structure is set up per region so that organic traffic grows alongside the offering. Ads run directly to a page that converts.' },
      { heading: 'The same pattern works elsewhere', body: 'Premium service businesses that want to be judged on quality, not price. Concierge services, private jet charters, luxury wellness centres, boutique law firms: whenever the service itself is high-end but the digital entrance does not yet reflect it, the gap is larger than you think. A strong brand plus a frictionless booking flow closes that gap faster than any ad budget.' },
    ],
  },
  {
    slug: 'stickx-arcade-investeerder-platform',
    title: 'Stickx Arcade: An Investment Page That Sells Trust',
    excerpt:
      'Stickx Arcade is raising capital for four new locations. Weblyfe built the investor site with KYC flow, share configurator, legal documentation, and a payment flow. Fully in Dutch, fully AFM-compliant.',
    date: '2026-04-28',
    readMins: 6,
    cover: '/screenshots/stickxarcade-investeren.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Investor', 'Webflow'],
    paragraphs: [
      { body: 'Stickx Arcade is a premium social entertainment concept built around arcades, social games, and a strong loyal community. The next step is scale: four new locations across the Netherlands and Belgium. To fund that, Stickx opened a participation round for private investors via certificates of shares. The challenge: an investment site for private individuals requires transparency, legal clarity, and a booking flow that builds trust from the very first click.' },
      { heading: 'What we built', body: 'Weblyfe built investeren.stickxarcade.com, a dedicated investor landing page and app in Bolt.new and Webflow. The site has a clear flow: from brand introduction and growth story, to investment terms, to the actual entry point. Visitors see exactly where they are and what the next step is at every stage. The hero is deliberately lighter and fresher than the standard Stickx style sheet. That makes the platform feel more trustworthy to a new investor audience.' },
      { heading: 'Investment flow and payment', body: 'Step one: the investor selects the number of certificates. Entry from €750 (100 certificates), minimum participation via the app from €1.500 (200 certificates). Step two: overview of returns (7% annual dividend, paid quarterly, plus potential share value appreciation). Step three: payment via iDeal, Bancontact, or bank transfer. After completion, the investor automatically receives the certificate confirmation. Certificates are issued through Stickx STAK B.V.; the shares carry no voting rights.' },
      { heading: 'Transparency and the legal layer', body: 'Investors are allowed to ask questions. Stickx provides answers - not only via a FAQ but through a complete documentation package: information memorandum, AFM information document, FSMA investor note, certificate terms, deed of incorporation, and KvK registrations for Stickx and the holding company. All documents are downloadable or viewable directly in the browser. This is not the fine print; it is the main text.' },
      { heading: 'Building trust through content', body: 'Alongside the documentation layer, the site features a section with the founder: photo, mission, personal story. An embedded video of an investor sharing her own experience. Market positioning that explains why physical social entertainment is growing while retail contracts. No empty promises, no guarantee claims - just the context a sensible private investor needs to make their own informed decision.' },
      { heading: 'Who this pattern fits', body: 'Entrepreneurs raising capital through a semi-public round: crowdfunding platforms, real estate developers with participation tracks, sports clubs with member bonds, energy cooperatives. The moment you want to convince private investors through a website, transparency and ease of use are your two strongest selling points - not the return figure itself.' },
    ],
  },
];

export const POSTS_BY_LOCALE: Record<Locale, BlogPost[]> = { nl, en };

// Back-compat: existing imports of POSTS default to NL.
export const POSTS: BlogPost[] = nl;

export function getPost(slug: string, locale: Locale = 'nl'): BlogPost | undefined {
  return POSTS_BY_LOCALE[locale].find((p) => p.slug === slug)
    ?? POSTS_BY_LOCALE.nl.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  // Slugs are locale-agnostic; nl set is canonical.
  return nl.map((p) => p.slug);
}

export function getLatestPosts(n: number, locale: Locale = 'nl'): BlogPost[] {
  return [...POSTS_BY_LOCALE[locale]]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, n);
}
