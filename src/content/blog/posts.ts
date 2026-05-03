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
  {
    slug: 'ben-de-voorman-cza-whatsapp-intake',
    title: 'Ben de voorman: hoe CZA Bouwbedrijf zijn WhatsApp lead intake automatiseerde',
    excerpt:
      'Hesam Zahedi verloor leads omdat zijn team vier tot zes uur later reageerde. Ben pakt elke binnenkomende aanvraag op binnen 30 seconden, ook om 23:00. 40% van de leads komt nu buiten kantooruren binnen en haalt niemand meer af.',
    date: '2026-04-15',
    readMins: 5,
    cover: '/agents/ben.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Custom Appie', 'Ben'],
    paragraphs: [
      { body: 'Hesam Zahedi runt CZA Bouwbedrijf, een middelgroot aannemingsbedrijf met een vaste ploeg en een volle orderportefeuille. Zijn pijn was simpel: potentiële klanten stuurden een WhatsApp, kregen vier tot zes uur later een reactie, en waren intussen bij de concurrent. Buiten kantooruren haakten bijna alle leads af. De oplossing was geen extra medewerker. Het was Ben, zijn persoonlijke WhatsApp lead intake via een Custom Appie.' },
      { heading: 'Hoe Ben werd gebouwd', body: 'Ben draait op een private server, verbonden met het WhatsApp Business-nummer van CZA. Hij heeft een eigen persona: warm, direct, vakkundig. Hesam omschreef hem als "de beste voorman die je telefonisch te woord staat." Ben kent de diensten van CZA, de typische projectomvang, de werkgebieden en de tariefstructuur. Hij is niet gebouwd als een script-bot maar als een conversatiepartner die leadkwalificatie afhandelt.' },
      { heading: 'Scoren op een schaal van 0 tot 100', body: 'Elke inkomende lead krijgt een score. Ben vraagt naar projecttype, omvang, tijdslijn en budget. Op basis van de antwoorden berekent hij een kwalificatiescore van 0 tot 100. Leads boven de drempel gaan direct naar Hesam als warm contact, inclusief samenvatting. Leads onder de drempel krijgen een vriendelijk antwoord en een uitnodiging om het opnieuw te proberen zodra het project concreter is. Het sales team heeft nooit meer contact met een koude lead die eigenlijk niet paste.' },
      { heading: 'De 30-seconden reactie', body: 'Zodra een WhatsApp binnenkomt, reageert Ben. Niet na vier uur. Niet de volgende ochtend. Binnen 30 seconden. Om 08:00, om 14:00 en om 23:00. De toon is menselijk, niet robotachtig. Ben stelt zich voor als "de digitale collega van Hesam" en vraagt gerichte vragen. Klanten merken bijna nooit dat ze niet met een mens praten, en dat is precies de bedoeling.' },
      { heading: '40% leads buiten kantooruren', body: 'Na de eerste maand bleek dat 40% van alle binnenkomende leads buiten kantooruren binnenkwam. Die 40% haalde voorheen allemaal af. Nu niet meer. Ben vangt ze op, kwalificeert ze en zet ze in de wachtrij voor de volgende ochtend. Hesam begint zijn dag met een overzicht van wat er nacht is binnengekomen, gesorteerd op prioriteit.' },
      { heading: 'Wat het team nu doet', body: 'De uitvoeders houden zich bezig met uitvoeren. Hesam focust op offreren en projectmanagement. Ben regelt de intake. Niemand hoeft meer WhatsApp-berichten bij te houden naast het eigenlijke werk. De administratieve druk op het team is met een derde gedaald en de leadconversie steeg in de eerste maand met 22%.' },
      { heading: 'Voor wie werkt dit patroon', body: 'Aannemers, installateurs, schilders, dakdekkers, tuinaanleggers: iedereen die vakwerk doet en commercieel bereikbaar wil zijn zonder een aparte binnendienst. Als je meer dan 20 inbound aanvragen per maand krijgt via WhatsApp en reactiesnelheid een rol speelt in de keuze van de klant, is een Custom Appie als Ben het laagste-frictie antwoord.' },
    ],
  },
  {
    slug: 'appie-als-developer-bouwt-deze-site',
    title: 'AI bouwt website: hoe Appie weblyfe.ai van brief tot deploy schreef',
    excerpt:
      'Deze site is gebouwd door Appie-Opus. Next.js, Vercel, Stripe, Tailwind, Framer Motion en Lottie. Zeven branches, meer dan 60 commits. Hier is hoe dat werkt, en wat hij voor jou kan bouwen.',
    date: '2026-05-04',
    readMins: 5,
    cover: '/agents/appie-iconic.png',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Capabilities', 'Developer', 'Behind the scenes'],
    paragraphs: [
      { body: 'De site die je nu leest, is gebouwd door Appie-Opus. Niet door een bureau, niet door een freelancer. Door een AI die websites bouwt via een brief in Telegram, code in de terminal en een deploy naar Vercel. Deze post is het eerlijke verhaal achter die workflow, inclusief stack, beperkingen en wat dit voor jouw project kan betekenen.' },
      { heading: 'De stack', body: 'Next.js 15 met App Router. TypeScript door de hele codebase. Tailwind CSS voor styling. Framer Motion voor animaties. Lottie voor illustraties. Vercel voor hosting. Stripe voor betalingen. i18n voor Nederlands en Engels door elke route heen. Geen WordPress, geen low-code platform. Gewone code, versioned in Git, deployable in minuten.' },
      { heading: 'Hoe de workflow eruitziet', body: 'Seyed stuurt een brief in Telegram: "bouw een hero met de drie tiers, pricing tabel, blog met markdown support en een checkout flow." Appie-Opus leest de brief, stelt twee verduidelijkende vragen, opent een Git-branch en begint. Diffs komen terug via Claude Code. Na review gaan ze live via een Vercel preview-URL. Feedback gaat terug in Telegram. Volgende iteratie start.' },
      { heading: 'Zeven branches, 60+ commits', body: 'weblyfe.ai is geen one-shot website. Het is zeven branches en meer dan 60 commits over meerdere sprints. Feature branches voor blog, i18n, checkout, animaties, SEO en mobile. Elk onderdeel afzonderlijk getest en gereviewed. Conventionele commit-messages zodat de changelog leesbaar blijft. Rollback-ready via Vercel\'s deployment history.' },
      { heading: 'Wat hij kan bouwen voor klanten', body: 'Custom web apps. Landing pages met conversie-optimalisatie. Interne tools en dashboards. Automation-koppelingen tussen systemen. API-integraties. CMS-gedreven sites. Als het in code gebouwd kan worden en de brief helder is, bouwt Appie het. Typische projecten: een investor portal, een boekingsstroom, een configurator, een ledenplatform, een product-launch site.' },
      { heading: 'Eerlijkheid over de tiers', body: 'Managed dev-werk zit alleen in de Custom Appie-tier (€2.000/mo). Daarbinnen bouwt en onderhoudt Appie actief voor jouw stack. De PDF-gids (€65) geeft je het blueprint zodat je zelf bouwt of een developer inhuurt met de juiste basis. Instant Appie (€250/mo) is voor operationeel gebruik, niet voor development-sprints. Kies eerlijk op basis van wat je nodig hebt.' },
    ],
  },
  {
    slug: 'appie-als-designer-prompt-tot-asset',
    title: 'AI design tool voor brand assets: van prompt naar productie in minuten',
    excerpt:
      'Je hoeft geen briefing te schrijven, geen design-tool te leren en geen freelancer te wachten. Een prompt in gewone taal is genoeg. Appie verwerkt die via fal.ai, Kling.ai en Meshy.ai tot bruikbare assets.',
    date: '2026-05-05',
    readMins: 4,
    cover: '/origin-arc/scene-3-summoning-canonical.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Capabilities', 'Designer', 'fal.ai'],
    paragraphs: [
      { body: 'Gewone taal, bruikbaar resultaat. Zo werkt Appie als AI design tool voor brand assets. Je beschrijft wat je nodig hebt, hij roept de juiste tool aan, en binnen minuten heb je een afbeelding, video of 3D-object dat past bij je huisstijl. Geen wachttijd. Geen briefing-ronde. Geen Figma-cursus nodig.' },
      { heading: 'De tool-chain achter de schermen', body: 'Appie koppelt aan een vaste set tools op basis van het type asset. Statische beelden gaan via fal.ai Nano Banana voor consistente stijl en snelheid. Video gaat via Kling.ai. 3D-objecten via Meshy.ai met de beste modellen. Layout-werk en component-specs via de Figma MCP-verbinding. Elk tool-aanroep is gelogd zodat je exact ziet welke prompt welk resultaat opleverde.' },
      { heading: 'Brand-consistentie op schaal', body: 'Eenmalig vastleggen hoe je merk eruitziet, kleurcode, typografie, sfeer, en iedere volgende generatie past daarbinnen. Appie houdt de stijl-instructies in zijn persistent geheugen. Jij vraagt "maak een hero voor de nieuwsbrief in dezelfde stijl als de homepage," en hij weet wat dat betekent zonder uitleg.' },
      { heading: 'Concreet voorbeeld: de assets op deze site', body: 'Het 3D-boekmodel van de PDF-gids op de homepage. De laptop-plus-telefoon compositie in de features-sectie. De Origin Arc-scènes die door de blog lopen. Die zijn niet gefotografeerd of door een studio gemaakt. Ze zijn gegenereerd op basis van een beschrijving, verfijnd via een paar iteraties, en geplaatst in de Webflow-component. Doorlooptijd: minuten, niet dagen.' },
      { heading: 'Wanneer het menselijk moet blijven', body: 'Appie is niet voor originele art direction. Strategie, campagne-concept, merkpositionering: dat vraagt om een mens met domeinkennis en creatief oordeel. Wat hij wegneemt is de 90% repetitief asset-werk dat daarna volgt. Formaten aanpassen, varianten genereren, stijl consistent houden over kanalen, thumbnails voor 20 blog-posts: dat doet hij snel en foutloos.' },
    ],
  },
  {
    slug: 'appie-als-content-factory-video-voicenote-post',
    title: 'AI content factory video: van idee naar gepubliceerde post in één ochtend',
    excerpt:
      'De voicenotes van Eva, Ben en Appie op de homepage zijn gegenereerd via ElevenLabs. De video\'s via Kling.ai. De bijschriften via Appie zelf. Dit is het volledige recept van idee tot gepubliceerde content.',
    date: '2026-05-06',
    readMins: 6,
    cover: '/origin-arc/scene-5-freedom.png',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Capabilities', 'Content', 'ElevenLabs'],
    paragraphs: [
      { body: 'De homepage van weblyfe.ai heeft drie voicenotes: Eva, Ben en Appie. Ze klinken menselijk, hebben persoonlijkheid, en zijn in minder dan een uur gegenereerd. Dat is de AI content factory video-pipeline in de praktijk. Van script tot gepubliceerde post in één ochtend, zonder een studio, zonder een videograaf en zonder een copywriter op standby.' },
      { heading: 'Het voicenote-recept', body: 'ElevenLabs, model eleven_v3, voice ID Callum. Stabiliteit op 0.3 voor meer karakter. De prompts bevatten inline audio-tags zoals [knowing smile] en [chuckles softly] zodat de intonatie varieert op de juiste plekken. Elke voicenote is 25 seconden, geschreven als een monoloog die de persona van het personage laat horen. Eva: formeel en gedreven. Ben: direct en praktisch. Appie: warm en zelfverzekerd. Drie stemmen, drie scripts, drie exports.' },
      { heading: 'Van script naar video', body: 'Script klaar, audio gegenereerd, dan Kling.ai voor de video-laag. Prompt in gewone taal, referentie-afbeelding optioneel, en binnen twee minuten een bewegende clip. Voor social content gaat dit direct naar de juiste formaten: 9:16 voor Stories en Reels, 16:9 voor YouTube en LinkedIn. Geen editingsoftware nodig voor standaard clips.' },
      { heading: 'De volledige keten', body: 'Idee in Telegram. Appie schrijft het script, stelt twee vragen over toon en doelgroep, en begint. Hij genereert de voicenote via ElevenLabs, de video via Kling.ai en de bijschriften in de juiste tone-of-voice per platform. Instagram-bijschrift is anders dan LinkedIn-post is anders dan de tweet. Appie weet het verschil en past de stijl aan. Alles klaar voor review in dezelfde Telegram-thread. Eén goedkeuring en het kan live.' },
      { heading: 'Wat dit in de praktijk betekent', body: 'Een ondernemer die wekelijks zichtbaar wil zijn op drie kanalen heeft normaal een content-team of besteedt de helft van zijn week aan creatie. Met deze pipeline is een volledige contentweek, video, audio en tekst, klaar in een ochtend. Appie houdt de consistentie vast: zelfde tone of voice, zelfde stijl, zelfde merkgevoel. Jij keurt goed. Hij publiceert.' },
      { heading: 'Hoe dit ingericht wordt', body: 'De content-pipeline maakt deel uit van de Custom Appie-tier. Je kiest de kanalen, de cadans en de tone of voice bij onboarding. Appie stelt een content-kalender op en verwerkt die week voor week. Wil je de pipeline begrijpen en zelf bouwen? De PDF-gids bevat de n8n-workflows en de ElevenLabs-configuratie als startpunt.' },
    ],
  },
  {
    slug: 'techwiz-uit-de-doos-onboarding',
    title: 'Techwiz setup voor ondernemers: wat er na de checkout gebeurt',
    excerpt:
      'Je hebt betaald. En nu? Hier is precies wat er in de eerste zeven dagen gebeurt na je Stripe-checkout, van de welkomsmail tot de eerste wekelijkse briefing die Appie voor je schrijft.',
    date: '2026-05-07',
    readMins: 4,
    cover: '/agents/appie.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Onboarding', 'Setup', 'How it works'],
    paragraphs: [
      { body: 'De vraag die de meeste nieuwe klanten stellen: "Moet ik iets doen, of doet hij dat zelf?" Het antwoord is: allebei een beetje. De Techwiz setup voor ondernemers is ontworpen zodat je op dag drie al productief bent, zonder dat je iets technisch hoeft te begrijpen. Hier is hoe dat eruitziet.' },
      { heading: 'Direct na de checkout', body: 'Zodra de Stripe-betaling is afgerond, krijg je een welkomsmail. Daarin staat: de URL van jouw private server, een uitnodiging voor het eerste Telegram-gesprek en een korte checklist van drie stappen. Geen lange handleiding. Geen developer nodig. De server staat al klaar.' },
      { heading: 'Dag 1: kennismaken', body: 'Appie stuurt je een berichtje in Telegram. Hij stelt zichzelf voor en stelt drie vragen: over je bedrijf, over de tools die je nu gebruikt, en over wat je deze week het meeste van je aandacht opeist. Op basis van die antwoorden bouwt hij zijn eerste geheugenlaag op. Vanaf dat moment weet hij wie je klanten zijn, hoe je hun aanspreekt, en wat je prioriteiten zijn.' },
      { heading: 'Dag 2: integraties en context', body: 'Je verbindt Google Workspace, Notion en WhatsApp via een simpele autorisatiestroom. Appie leest bestaande documenten in, haalt je agenda op en bekijkt openstaande taken. Aan het einde van dag 2 stuurt hij een eerste dagelijkse briefing: drie prioriteiten, twee openstaande items uit je inbox en een voorstel voor de dag.' },
      { heading: 'Dag 3: eerste acties', body: 'De eerste echte berichten gaan de deur uit. Een follow-up naar een lead die drie dagen niet heeft gereageerd. Een herinnering naar een klant voor een openstaande factuur. Een ingeplande post voor LinkedIn. Jij hebt die goedgekeurd met een simpel "ja" in Telegram. Appie voerde ze uit.' },
      { heading: 'Week 1: persistent en voorspelbaar', body: 'Na zeven dagen heeft Appie een compleet beeld. Welke klanten aandacht nodig hebben. Welke deals lopen. Welke taken blijven liggen. Hij stuurt elke ochtend een briefing en elke avond een wrap-up. Hij escaleert alleen als er iets echt urgent of onomkeerbaar is. De rest handelt hij af.' },
      { heading: 'Als je in Telegram kunt chatten, kun je een Techwiz runnen', body: 'Er is geen dashboard om te leren. Geen workflow-builder om in te klikken. Geen handleiding van 80 pagina\'s. Je communiceert in gewone taal, hij doet de rest. De enige vereiste is dat je je eerste week de tijd neemt om zijn vragen te beantwoorden. Daarna werkt het systeem voor jou, niet andersom.' },
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
  {
    slug: 'ben-de-voorman-cza-whatsapp-intake',
    title: 'Ben the foreman: how CZA Bouwbedrijf automated its WhatsApp lead intake',
    excerpt:
      'Hesam Zahedi was losing leads because his team responded four to six hours later. Ben picks up every incoming request within 30 seconds, including at 23:00. 40% of leads now arrive outside office hours and none of them drop off anymore.',
    date: '2026-04-15',
    readMins: 5,
    cover: '/agents/ben.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Case study', 'Custom Appie', 'Ben'],
    paragraphs: [
      { body: 'Hesam Zahedi runs CZA Bouwbedrijf, a mid-sized construction firm with a steady crew and a full order book. His problem was simple: potential clients sent a WhatsApp message, received a reply four to six hours later, and had already moved on to a competitor. Outside office hours, almost every lead dropped off. The solution was not an extra employee. It was Ben, a WhatsApp lead intake via a Custom Appie.' },
      { heading: 'How Ben was built', body: 'Ben runs on a private server connected to CZA\'s WhatsApp Business number. He has a defined persona: warm, direct, knowledgeable. Hesam described him as "the best foreman you\'d ever have on the phone." Ben knows CZA\'s services, typical project size, working areas, and pricing structure. He was not built as a script bot but as a conversational partner that handles lead qualification end to end.' },
      { heading: 'Scoring on a scale of 0 to 100', body: 'Every incoming lead receives a score. Ben asks about project type, scale, timeline, and budget. Based on the answers he calculates a qualification score from 0 to 100. Leads above the threshold go directly to Hesam as a warm contact, with a summary attached. Leads below the threshold receive a friendly reply and an invitation to get back in touch once the project is more concrete. The sales team never has to deal with a cold lead that was never a fit.' },
      { heading: 'The 30-second response', body: 'The moment a WhatsApp message arrives, Ben responds. Not after four hours. Not the next morning. Within 30 seconds. At 08:00, at 14:00, and at 23:00. The tone is human, not robotic. Ben introduces himself as "Hesam\'s digital colleague" and asks focused questions. Clients almost never realise they are not talking to a person, and that is exactly the point.' },
      { heading: '40% of leads come in outside office hours', body: 'After the first month it turned out that 40% of all incoming leads arrived outside office hours. That 40% all used to drop off. Not anymore. Ben catches them, qualifies them, and queues them for the following morning. Hesam starts his day with an overview of what came in overnight, sorted by priority.' },
      { heading: 'What the team does now', body: 'The builders focus on building. Hesam focuses on quoting and project management. Ben handles the intake. Nobody has to monitor WhatsApp messages alongside the actual work anymore. The administrative load on the team dropped by a third and lead conversion rose 22% in the first month.' },
      { heading: 'Who this pattern works for', body: 'Contractors, installers, painters, roofers, landscapers: anyone who does skilled trade work and wants to be commercially reachable without a dedicated front desk. If you receive more than 20 inbound requests per month via WhatsApp and response speed influences how a client chooses, a Custom Appie like Ben is the lowest-friction answer.' },
    ],
  },
  {
    slug: 'appie-als-developer-bouwt-deze-site',
    title: 'AI builds custom apps: how Appie wrote weblyfe.ai from brief to deploy',
    excerpt:
      'This site was built by Appie-Opus. Next.js, Vercel, Stripe, Tailwind, Framer Motion, and Lottie. Seven branches, 60+ commits. Here is how that workflow operates and what he can build for you.',
    date: '2026-05-04',
    readMins: 5,
    cover: '/agents/appie-iconic.png',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Capabilities', 'Developer', 'Behind the scenes'],
    paragraphs: [
      { body: 'The site you are reading right now was built by Appie-Opus. Not by an agency. Not by a freelancer. By an AI that builds custom apps via a brief in Telegram, code in the terminal, and a deploy to Vercel. This post is the honest story behind that workflow, including the stack, the constraints, and what it could mean for your project.' },
      { heading: 'The stack', body: 'Next.js 15 with App Router. TypeScript throughout. Tailwind CSS for styling. Framer Motion for animations. Lottie for illustrations. Vercel for hosting. Stripe for payments. i18n for Dutch and English across every route. No WordPress, no low-code platform. Real code, versioned in Git, deployable in minutes.' },
      { heading: 'What the workflow looks like', body: 'Seyed sends a brief in Telegram: "build a hero with the three tiers, pricing table, blog with markdown support, and a checkout flow." Appie-Opus reads the brief, asks two clarifying questions, opens a Git branch, and starts. Diffs come back via Claude Code. After review they go live via a Vercel preview URL. Feedback goes back in Telegram. Next iteration starts.' },
      { heading: 'Seven branches, 60+ commits', body: 'weblyfe.ai is not a one-shot website. It is seven branches and more than 60 commits across multiple sprints. Feature branches for blog, i18n, checkout, animations, SEO, and mobile. Each part tested and reviewed separately. Conventional commit messages so the changelog stays readable. Rollback-ready via Vercel\'s deployment history.' },
      { heading: 'What he can build for clients', body: 'Custom web apps. Landing pages with conversion optimisation. Internal tools and dashboards. Automation connections between systems. API integrations. CMS-driven sites. If it can be built in code and the brief is clear, Appie builds it. Typical projects: an investor portal, a booking flow, a configurator, a membership platform, a product launch site.' },
      { heading: 'Honest about the tiers', body: 'Managed development work is only available in the Custom Appie tier (€2.000/mo). Within that tier, Appie actively builds and maintains for your stack. The PDF guide (€65) gives you the blueprint to build yourself or bring in a developer with the right foundation. Instant Appie (€250/mo) is for operational use, not development sprints. Choose honestly based on what you actually need.' },
    ],
  },
  {
    slug: 'appie-als-designer-prompt-tot-asset',
    title: 'AI brand asset generator: from prompt to production in minutes',
    excerpt:
      'No brief to write, no design tool to learn, no freelancer to wait on. A prompt in plain language is enough. Appie processes it through fal.ai, Kling.ai, and Meshy.ai into assets you can actually use.',
    date: '2026-05-05',
    readMins: 4,
    cover: '/origin-arc/scene-3-summoning-canonical.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Capabilities', 'Designer', 'fal.ai'],
    paragraphs: [
      { body: 'Plain language in, usable result out. That is how Appie works as an AI brand asset generator. You describe what you need, he calls the right tool, and within minutes you have an image, video, or 3D object that fits your brand identity. No waiting time. No briefing round. No Figma course required.' },
      { heading: 'The tool chain behind the scenes', body: 'Appie connects to a fixed set of tools depending on the asset type. Static images go via fal.ai Nano Banana for consistent style and speed. Video goes via Kling.ai. 3D objects via Meshy.ai using the best available models. Layout work and component specs via the Figma MCP connection. Every tool call is logged so you can see exactly which prompt produced which result.' },
      { heading: 'Brand consistency at scale', body: 'Define your brand once: colour codes, typography, mood. Every subsequent generation fits within it. Appie keeps the style instructions in his persistent memory. You ask "make a hero for the newsletter in the same style as the homepage" and he knows what that means without further explanation.' },
      { heading: 'Concrete example: the assets on this site', body: 'The 3D book model for the PDF guide on the homepage. The laptop-plus-phone composition in the features section. The Origin Arc scenes running through the blog. They were not photographed or produced by a studio. They were generated from a description, refined in a few iterations, and placed into the Webflow component. Turnaround time: minutes, not days.' },
      { heading: 'When it needs to stay human', body: 'Appie is not for original art direction. Strategy, campaign concept, brand positioning: those require a human with domain knowledge and creative judgment. What he removes is the 90% of repetitive asset work that follows. Resizing formats, generating variants, keeping style consistent across channels, thumbnails for 20 blog posts: that he handles fast and without errors.' },
    ],
  },
  {
    slug: 'appie-als-content-factory-video-voicenote-post',
    title: 'AI content automation pipeline: from idea to published post in one morning',
    excerpt:
      'The voicenotes for Eva, Ben, and Appie on the homepage were generated via ElevenLabs. The videos via Kling.ai. The captions by Appie himself. Here is the full recipe from idea to published content.',
    date: '2026-05-06',
    readMins: 6,
    cover: '/origin-arc/scene-5-freedom.png',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Capabilities', 'Content', 'ElevenLabs'],
    paragraphs: [
      { body: 'The homepage of weblyfe.ai has three voicenotes: Eva, Ben, and Appie. They sound human, carry personality, and were generated in under an hour. That is the AI content automation pipeline in practice. From script to published post in one morning, without a studio, without a videographer, and without a copywriter on standby.' },
      { heading: 'The voicenote recipe', body: 'ElevenLabs, model eleven_v3, voice ID Callum. Stability at 0.3 for more character. The prompts include inline audio tags like [knowing smile] and [chuckles softly] so the intonation shifts at the right moments. Each voicenote is 25 seconds, written as a monologue that lets the persona of each character come through. Eva: formal and driven. Ben: direct and practical. Appie: warm and confident. Three voices, three scripts, three exports.' },
      { heading: 'From script to video', body: 'Script done, audio generated, then Kling.ai for the video layer. Prompt in plain language, reference image optional, and within two minutes a moving clip. For social content this goes straight to the right formats: 9:16 for Stories and Reels, 16:9 for YouTube and LinkedIn. No editing software needed for standard clips.' },
      { heading: 'The full chain', body: 'Idea in Telegram. Appie writes the script, asks two questions about tone and audience, and starts. He generates the voicenote via ElevenLabs, the video via Kling.ai, and the captions in the right tone of voice per platform. An Instagram caption is different from a LinkedIn post is different from the tweet. Appie knows the difference and adapts the style accordingly. Everything ready for review in the same Telegram thread. One approval and it can go live.' },
      { heading: 'What this means in practice', body: 'An entrepreneur who wants to be visible weekly on three channels normally needs a content team or spends half their week creating. With this pipeline, a full content week, video, audio, and copy, is done in one morning. Appie holds the consistency: same tone of voice, same style, same brand feel. You approve. He publishes.' },
      { heading: 'How this gets set up', body: 'The content pipeline is part of the Custom Appie tier. You choose the channels, the cadence, and the tone of voice during onboarding. Appie drafts a content calendar and works through it week by week. Want to understand the pipeline and build it yourself? The PDF guide includes the n8n workflows and the ElevenLabs configuration as a starting point.' },
    ],
  },
  {
    slug: 'techwiz-uit-de-doos-onboarding',
    title: 'AI agent onboarding walkthrough: what happens after the Stripe checkout',
    excerpt:
      'You have paid. Now what? Here is exactly what happens in the first seven days after your Stripe checkout, from the welcome email to the first weekly briefing Appie writes for you.',
    date: '2026-05-07',
    readMins: 4,
    cover: '/agents/appie.jpg',
    author: { name: 'Appie', portrait: '/agents/appie.jpg' },
    tags: ['Onboarding', 'Setup', 'How it works'],
    paragraphs: [
      { body: 'The question most new clients ask: "Do I need to do something, or does he handle that himself?" The answer is: a bit of both. This AI agent onboarding walkthrough is designed so that you are productive by day three without needing to understand anything technical. Here is what that looks like.' },
      { heading: 'Right after checkout', body: 'As soon as the Stripe payment is confirmed, you receive a welcome email. Inside: the URL of your private server, an invitation to the first Telegram conversation, and a short checklist of three steps. No long manual. No developer required. The server is already running.' },
      { heading: 'Day 1: introductions', body: 'Appie sends you a message in Telegram. He introduces himself and asks three questions: about your business, about the tools you currently use, and about what is taking up the most of your attention this week. Based on those answers he builds his first memory layer. From that point on he knows who your clients are, how you address them, and what your priorities are.' },
      { heading: 'Day 2: integrations and context', body: 'You connect Google Workspace, Notion, and WhatsApp via a simple authorisation flow. Appie reads in existing documents, pulls your calendar, and reviews open tasks. By the end of day 2 he sends a first daily briefing: three priorities, two open items from your inbox, and a suggestion for the day.' },
      { heading: 'Day 3: first actions', body: 'The first real messages go out. A follow-up to a lead that has not responded in three days. A reminder to a client about an outstanding invoice. A scheduled post for LinkedIn. You approved each of those with a simple "yes" in Telegram. Appie executed them.' },
      { heading: 'Week 1: persistent and predictable', body: 'After seven days Appie has a complete picture. Which clients need attention. Which deals are in progress. Which tasks keep getting deferred. He sends a briefing every morning and a wrap-up every evening. He escalates only when something is genuinely urgent or irreversible. Everything else he handles.' },
      { heading: 'If you can chat in Telegram, you can run a Techwiz', body: 'There is no dashboard to learn. No workflow builder to click through. No 80-page manual. You communicate in plain language and he does the rest. The only requirement is that you take the time during your first week to answer his questions. After that the system works for you, not the other way around.' },
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
