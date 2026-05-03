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
    cover: '/screenshots/boooth-home-fresh.jpg',
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
