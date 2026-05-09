import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Lock,
  Sparkles,
  ShieldCheck,
  Clock,
  MessageCircle,
  ArrowRight,
  Database,
  ServerCog,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import BetaSignupForm from './BetaSignupForm';

export const metadata: Metadata = {
  title: 'Instant Appie BETA - €250/mo locked',
  description:
    'Jouw volledig managed Techwiz op Telegram. 5-10 plekken, €250/mo voor altijd. 14 dagen geld-terug. 1-op-1 onboarding met Seyed.',
  alternates: { canonical: 'https://weblyfe.ai/beta' },
  openGraph: {
    title: 'Instant Appie BETA - €250/mo voor altijd',
    description:
      'Volledig managed Techwiz. Telegram dag 1, agenda, inbox, CRM. 5-10 plekken.',
    url: 'https://weblyfe.ai/beta',
    type: 'website',
    images: [
      {
        url: '/agents/appie-3d.jpg',
        width: 1200,
        height: 630,
        alt: 'Instant Appie BETA - €250/mo locked',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instant Appie BETA - €250/mo locked',
    description:
      'Volledig managed Techwiz. Telegram dag 1, agenda, inbox, CRM. 5-10 plekken.',
    images: ['/agents/appie-3d.jpg'],
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Instant Appie BETA',
  description:
    'Volledig managed persoonlijke Techwiz op Telegram, inbox, agenda en CRM. 5-10 beta-plekken.',
  brand: { '@type': 'Brand', name: 'Weblyfe' },
  image: 'https://weblyfe.ai/agents/appie-3d.jpg',
  offers: {
    '@type': 'Offer',
    price: '250',
    priceCurrency: 'EUR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '250',
      priceCurrency: 'EUR',
      unitText: 'MONTH',
    },
    availability: 'https://schema.org/LimitedAvailability',
    url: 'https://weblyfe.ai/beta',
    seller: { '@type': 'Organization', name: 'Weblyfe' },
  },
};

type PricingRow = {
  title: string;
  price: string;
  note?: string;
  body: string;
  accent: boolean;
};

const PRICING_ROWS: ReadonlyArray<PricingRow> = [
  {
    title: 'DIY ChatGPT',
    price: '€20/mo',
    body: 'Chatbot. Geen geheugen. Jij typt alles.',
    accent: false,
  },
  {
    title: 'Instant Appie BETA',
    price: '€250/mo',
    note: 'locked voor altijd',
    body: 'Volledig managed Techwiz. Telegram dag 1.',
    accent: true,
  },
  {
    title: 'Instant Appie (full launch)',
    price: '€488/mo',
    body: 'WhatsApp + alle connectors.',
    accent: false,
  },
  {
    title: 'NL VA (8 uur)',
    price: '€550/mo',
    body: 'Mens. 8u/week. Vakantie-opvang niet inbegrepen.',
    accent: false,
  },
  {
    title: 'Executive Assistant (fulltime)',
    price: '€5.000+/mo',
    body: 'Menselijk. Schaalt niet.',
    accent: false,
  },
];

const WHAT_IS_BULLETS = [
  {
    icon: ServerCog,
    title: 'Eigen dedicated server',
    body: 'Hetzner EU, privacy-compliant. Jouw data verlaat nooit Europa.',
  },
  {
    icon: MessageCircle,
    title: 'Telegram, inbox, agenda en CRM',
    body: 'Vanaf dag 1 verbonden met de tools waar jouw werk al loopt.',
  },
  {
    icon: Database,
    title: 'Persistent geheugen',
    body: 'Onthoudt klanten, afspraken en voorkeuren. Begint nooit bij nul.',
  },
  {
    icon: Clock,
    title: '24/7 actief',
    body: 'Werkt door terwijl jij slaapt. Lead om 22:14 wordt om 22:14 gekwalificeerd.',
  },
];

const BETA_BENEFITS = [
  {
    icon: Sparkles,
    title: '1-op-1 onboarding met Seyed',
    body: 'Seyed bouwt en configureert jouw Appie persoonlijk samen met jou. 60-90 minuten sessie.',
  },
  {
    icon: MessageCircle,
    title: 'Telegram vanaf dag 1',
    body: 'Inbox-triage, agendabeheer, CRM en lead-notificaties. Allemaal in 1 chat.',
  },
  {
    icon: Lock,
    title: '€250/mo voor altijd',
    body: 'Zelfs als we naar €488 gaan bij de publieke launch. Locked-in beta-prijs.',
  },
  {
    icon: ShieldCheck,
    title: '14 dagen geld-terug',
    body: 'Niet tevreden? Geld terug, geen gedoe. Daarna maandelijks opzegbaar.',
  },
  {
    icon: Sparkles,
    title: 'Lifetime updates',
    body: 'Elke nieuwe feature en connector die we bouwen, krijg jij ook. Inclusief WhatsApp Q3 2026.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Aanmelden',
    body: 'Vul het formulier in. We lezen je use case en motivatie persoonlijk.',
  },
  {
    step: '02',
    title: 'Call met Seyed',
    body: 'Binnen 24 uur plant Seyed een korte intake. Past de beta bij jou en jouw bedrijf?',
  },
  {
    step: '03',
    title: 'Onboarding sessie',
    body: '60-90 minuten 1-op-1. Seyed bouwt jouw Techwiz live mee, met jouw stem en workflows.',
  },
  {
    step: '04',
    title: 'Live op Telegram',
    body: 'Binnen 24-48 uur na onboarding draait jouw Appie. Briefing in Telegram elke ochtend.',
  },
];

const SOCIAL_PROOF = [
  {
    name: 'Eva',
    client: 'Dubai-Property.nl',
    quote:
      'Appie is live op Telegram, beantwoordt leads binnen 30 seconden. Weblyfe heeft de hele setup gedaan.',
    image: '/agents/eva.jpg',
  },
  {
    name: 'Privanotify',
    client: 'Privacy SaaS',
    quote: '3 Appies draaien 50+ taken per dag voor GDPR-monitoring en compliance-audit. Setup volledig door Weblyfe.',
    image: '/screenshots/privanotify-fresh.jpg',
  },
  {
    name: 'Ben de Voorman',
    client: 'Coach + content',
    quote:
      'Contentproductie van 4 uur naar 15 minuten per stuk. Mijn Appie draait dag en nacht.',
    image: '/agents/ben.jpg',
  },
];

const BETA_FAQ = [
  {
    q: 'Wat is het verschil tussen de beta en de publieke launch?',
    a: 'In de beta krijg je Telegram, inbox, agenda en CRM. WhatsApp + extra connectors komen erbij bij de publieke launch (€488/mo). Beta-klanten betalen altijd €250, ook daarna.',
  },
  {
    q: 'Wat als ik later wil upgraden naar full launch?',
    a: 'Niets. Je beta-prijs blijft €250/mo, ook als we WhatsApp en alle connectors toevoegen bij de publieke launch. Je krijgt alles wat nieuwe klanten krijgen, voor jouw locked-in prijs.',
  },
  {
    q: 'Kan ik stoppen als het niets voor mij is?',
    a: 'Ja. 14 dagen geld-terug garantie zonder vragen. Daarna maandelijks opzegbaar, geen jaarcontract.',
  },
  {
    q: 'Hoe snel ben ik live?',
    a: 'Binnen 24-48 uur na de onboarding met Seyed ben je live op Telegram. De 1-op-1 sessie zelf duurt 60-90 minuten.',
  },
  {
    q: 'Heb ik technische kennis nodig?',
    a: 'Nee. Seyed regelt de hele setup. Jij geeft aan wat je wil; hij configureert.',
  },
  {
    q: 'Welke tools kan Appie verbinden?',
    a: 'Telegram (dag 1), Gmail/Outlook, Google Calendar, Notion, Brevo, Moneybird, HubSpot, Airtable, TidyCal. WhatsApp Business in Q3 2026.',
  },
  {
    q: 'Is mijn data veilig?',
    a: 'Appie draait op een dedicated private server in de EU (Hetzner, Falkenstein of Helsinki). Je data verlaat nooit de EU en traint geen publieke AI-modellen.',
  },
  {
    q: 'Wat als Appie iets verkeerd doet?',
    a: 'Risico-acties pingen jou eerst in Telegram. Je hebt altijd override-controle. Seyed is bereikbaar voor de beta-groep.',
  },
  {
    q: 'Hoeveel plekken zijn er?',
    a: '5 tot 10. Als de plekken vol zijn, sluit de beta. Er komt een publieke wachtlijst, maar die heeft geen €250 lock-in.',
  },
];

export default function BetaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full bg-[#DFB771]/10 blur-3xl pointer-events-none" />
          <div className="absolute top-32 right-1/4 w-[420px] h-[420px] rounded-full bg-[#247459]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <p className="text-[#DFB771]/80 text-xs font-mono uppercase tracking-widest mb-4">
                BETA . 5-10 plekken . €250/mo locked
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
                Jouw persoonlijke Techwiz.
                <span className="block text-[#DFB771]">Volledig voor je gebouwd.</span>
              </h1>
              <p className="text-[#F6FEFC]/75 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Instant Appie BETA: op Telegram vanaf dag 1, met agenda, inbox en CRM.
                Voor een select groep van 5-10 ondernemers: €250/mo voor altijd. Zelfs
                als de prijs naar €488 gaat.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                <a
                  href="#beta-form"
                  className="group inline-flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-bold px-7 py-4 rounded-xl transition-colors"
                >
                  <Lock className="w-5 h-5" />
                  Lock mijn €250 prijs
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#vergelijk"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#247459]/60 hover:border-[#DFB771] text-[#F6FEFC] font-semibold px-7 py-4 rounded-xl transition-colors"
                >
                  Vergelijk met DIY en VA
                </a>
              </div>

              <p className="text-sm text-[#DFB771] font-semibold">
                Nog maar 5-10 plekken. Beta sluit als de plekken vol zijn.
              </p>
            </div>

            <div className="relative mx-auto lg:mx-0 w-full max-w-md">
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-[#DFB771]/40 shadow-[0_0_60px_-15px_rgba(223,183,113,0.5)]">
                <Image
                  src="/agents/appie-3d.jpg"
                  alt="Appie - jouw persoonlijke Techwiz"
                  fill
                  sizes="(min-width: 1024px) 420px, 80vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 -left-3 flex flex-col gap-2">
                <div className="bg-[#031D16]/80 border border-[#DFB771]/40 px-3 py-2 rounded-xl text-xs font-mono">
                  <span className="text-[#DFB771]">[Telegram]</span> 23 mails afgehandeld
                </div>
                <div className="bg-[#031D16]/80 border border-[#247459]/40 px-3 py-2 rounded-xl text-xs font-mono">
                  <span className="text-[#247459]">[Calendar]</span> 4 calls geboekt
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING COMPARISON */}
        <section
          id="vergelijk"
          className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Vergelijk zelf
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                €250/mo locked.{' '}
                <span className="text-[#DFB771]">Voor altijd.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRICING_ROWS.map((row) => (
                <div
                  key={row.title}
                  className={
                    row.accent
                      ? 'rounded-2xl bg-gradient-to-br from-[#DFB771]/15 to-[#247459]/10 border-2 border-[#DFB771] p-6 lg:scale-105 shadow-xl'
                      : 'rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6'
                  }
                >
                  <p
                    className={
                      row.accent
                        ? 'text-[#DFB771] text-xs font-mono uppercase tracking-wider mb-2'
                        : 'text-[#F6FEFC]/55 text-xs font-mono uppercase tracking-wider mb-2'
                    }
                  >
                    {row.accent ? 'Beta-prijs' : 'Optie'}
                  </p>
                  <h3 className="font-bold text-lg mb-2">{row.title}</h3>
                  <p
                    className={
                      row.accent ? 'text-3xl font-bold text-[#DFB771] mb-1' : 'text-2xl font-bold mb-1'
                    }
                  >
                    {row.price}
                  </p>
                  {row.note && (
                    <p className="text-[#DFB771] text-xs font-semibold mb-2 uppercase tracking-wider">
                      {row.note}
                    </p>
                  )}
                  <p className="text-[#F6FEFC]/65 text-sm leading-relaxed mt-2">
                    {row.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-3xl mx-auto rounded-2xl bg-[#DFB771]/10 border border-[#DFB771]/30 p-6 text-center">
              <p className="text-[#F6FEFC] text-base md:text-lg font-medium">
                De beta-prijs van €250 is voor altijd van jou.{' '}
                <span className="text-[#DFB771]">
                  Zelfs na de publieke launch naar €488.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* WAT IS INSTANT APPIE */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Wat is Instant Appie
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Volledig managed.{' '}
                <span className="text-[#DFB771]">Geen setup.</span>
              </h2>
              <p className="text-[#F6FEFC]/70 text-lg max-w-3xl mx-auto leading-relaxed">
                Instant Appie is een volledig managed Techwiz die Weblyfe voor je
                bouwt, instelt en draait op een dedicated server. Geen setup, geen
                technische kennis nodig. Je geeft aan wat je wil, wij regelen de rest.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHAT_IS_BULLETS.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/30 flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5 text-[#DFB771]" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{b.title}</h3>
                  <p className="text-[#F6FEFC]/65 text-sm leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAT KRIJG JE IN DE BETA */}
        <section className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Wat krijg je
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Wat krijg je als beta-klant?
              </h2>
            </div>

            <div className="space-y-4">
              {BETA_BENEFITS.map((b, i) => (
                <div
                  key={b.title}
                  className="flex items-start gap-5 rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-5 md:p-6 hover:border-[#DFB771]/40 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/30 flex items-center justify-center">
                      <b.icon className="w-6 h-6 text-[#DFB771]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#DFB771] text-xs font-mono uppercase tracking-wider mb-1">
                      Voordeel {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-bold text-lg md:text-xl mb-2">{b.title}</h3>
                    <p className="text-[#F6FEFC]/70 text-sm md:text-base leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[#F6FEFC]/55 text-sm mt-8 max-w-2xl mx-auto">
              WhatsApp is geplanned voor Q3 2026 (publieke launch). Beta-klanten worden
              als eerste toegevoegd aan de WhatsApp-rollout.
            </p>
          </div>
        </section>

        {/* HOE HET WERKT */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Hoe het werkt
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Van aanmelding tot live in 4 stappen.
              </h2>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HOW_IT_WORKS.map((s) => (
                <li
                  key={s.step}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6 relative"
                >
                  <p className="font-mono text-4xl font-bold text-[#DFB771]/30 mb-3">
                    {s.step}
                  </p>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-[#F6FEFC]/65 text-sm leading-relaxed">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Echte klanten
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Volledig managed.{' '}
                <span className="text-[#DFB771]">Door ons gebouwd.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SOCIAL_PROOF.map((c) => (
                <article
                  key={c.name}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors overflow-hidden"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.client}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-[#031D16]/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-1">{c.name}</h3>
                    <p className="text-[#F6FEFC]/55 text-xs mb-3 uppercase tracking-wider">
                      {c.client}
                    </p>
                    <p className="text-[#F6FEFC]/80 text-sm leading-relaxed">
                      &ldquo;{c.quote}&rdquo;
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-center text-[#F6FEFC]/55 text-sm mt-10 max-w-2xl mx-auto">
              Alle huidige klanten zijn handmatig onboard gebracht. De beta-route maakt
              dit schaalbaar.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="py-20 md:py-28"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                FAQ
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Antwoorden op de meest gestelde vragen.
              </h2>
            </div>
            <FaqAccordion items={BETA_FAQ} />
          </div>
        </section>

        {/* SIGN-UP FORM */}
        <section
          id="beta-form"
          className="py-24 md:py-32 bg-gradient-to-b from-[#0a2e23]/60 to-[#031D16] border-t border-[#247459]/20"
        >
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Reserveer je plek
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Pak je plek voordat de beta sluit.
              </h2>
              <p className="text-[#F6FEFC]/70 text-base md:text-lg max-w-2xl mx-auto">
                Vul het formulier in. Seyed leest je motivatie persoonlijk en plant
                binnen 24 uur een korte intake.
              </p>
            </div>

            <BetaSignupForm />

            <ul className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-sm text-[#F6FEFC]/70">
              <li className="flex items-center gap-2 justify-center">
                <ShieldCheck className="w-4 h-4 text-[#DFB771]" />
                14 dagen geld-terug
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Lock className="w-4 h-4 text-[#DFB771]" />
                €250/mo voor altijd
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Sparkles className="w-4 h-4 text-[#DFB771]" />
                1-op-1 onboarding met Seyed
              </li>
            </ul>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
