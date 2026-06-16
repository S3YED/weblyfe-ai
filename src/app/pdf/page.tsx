import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Check,
  Sparkles,
  Layers,
  Shield,
  Zap,
  RefreshCcw,
  Github,
  Mail,
  Calendar,
  Inbox,
  Video,
  Users,
  ArrowRight,
  Clock,
  FileText,
  LockKeyhole,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';

// Production-safe default. Optional env override for experiments/previews.
const STRIPE_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_STRIPE_PDF_CHECKOUT_URL ||
  'https://buy.stripe.com/7sYaEYfAn30C8BncwJ3Je2I';

const CHECKOUT_TRACKING_URL = `${STRIPE_CHECKOUT_URL}${STRIPE_CHECKOUT_URL.includes('?') ? '&' : '?'}utm_source=weblyfe-ai&utm_medium=pdf-page&utm_campaign=appie-guide-v45`;

export const metadata: Metadata = {
  title: 'Build Your Own Techwiz PDF v4.5 - €65',
  description:
    '100+ pagina PDF + 150+ skills voor OpenClaw of Hermes Agent. Werkt met Claude Opus 4.7 en OpenAI Codex 5.4. Eenmalig €65, lifetime updates.',
  alternates: { canonical: 'https://weblyfe.ai/pdf' },
  openGraph: {
    title: 'Build Your Own Techwiz - €65 PDF + Appie Kit',
    description:
      "Bouw je eigen Techwiz in een weekend. 100+ pagina's, 150+ skills, geen vendor lock-in.",
    url: 'https://weblyfe.ai/pdf',
    type: 'website',
    images: [
      {
        url: '/appie-pdf-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Build Your Own Techwiz PDF v4.5',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Your Own Techwiz - €65',
    description:
      "Bouw je eigen Techwiz in een weekend. 100+ pagina's, 150+ skills, geen vendor lock-in.",
    images: ['/appie-pdf-cover.jpg'],
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Build Your Own Techwiz PDF v4.5',
  description:
    "100+ pagina PDF + 150+ skills voor OpenClaw of Hermes Agent. Werkt met Claude Opus 4.7 en OpenAI Codex 5.4.",
  brand: { '@type': 'Brand', name: 'Weblyfe' },
  image: 'https://weblyfe.ai/appie-pdf-cover.jpg',
  offers: {
    '@type': 'Offer',
    price: '65',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: 'https://weblyfe.ai/pdf',
    seller: { '@type': 'Organization', name: 'Weblyfe' },
  },
};

const HERO_STATS = [
  { value: '100+', label: "pagina's" },
  { value: '150+', label: 'skills' },
  { value: '€65', label: 'eenmalig' },
];

const TRUST_SIGNALS = [
  { icon: Clock, label: 'Directe levering', detail: 'PDF + repo toegang in je inbox' },
  { icon: RefreshCcw, label: 'Lifetime updates', detail: 'v5.0 en latere versies inbegrepen' },
  { icon: LockKeyhole, label: 'Veilig via Stripe', detail: 'Eenmalig betalen, geen abonnement' },
];

const PACKAGE_BULLETS = [
  {
    icon: Layers,
    title: "100+ pagina's PDF",
    body: 'Stap-voor-stap van nul naar werkende Appie. Elke stap met screenshots en uitleg.',
  },
  {
    icon: Sparkles,
    title: '150+ kant-en-klare skills',
    body: 'Drag-and-drop in OpenClaw of Hermes Agent. Elke skill maakt jouw Techwiz meetbaar slimmer.',
  },
  {
    icon: Zap,
    title: 'Claude Opus 4.7 of OpenAI Codex 5.4',
    body: 'Kies zelf je model. v4.5 is de eerste versie zonder vendor lock-in.',
  },
  {
    icon: Shield,
    title: 'OpenClaw of Hermes Agent',
    body: 'Beide platforms ondersteund. Wissel zonder je skills opnieuw te bouwen.',
  },
  {
    icon: Github,
    title: 'Toegang tot de Appie Kit repo',
    body: 'Private GitHub-repository. Fork, pas aan, push. YAML + Markdown, geen lock-in.',
  },
  {
    icon: Inbox,
    title: 'Inbox + agenda + leads',
    body: 'E-mailtriage, agendabeheer, lead-capture en CRM-koppeling, allemaal in de gids.',
  },
  {
    icon: Video,
    title: 'Video-generatie via fal.ai',
    body: '1440x1440 video in 3-4 minuten. Workflow staat in stap 9 van de gids.',
  },
  {
    icon: RefreshCcw,
    title: 'Lifetime updates',
    body: 'v4.5 is nu live. v5.0 in Q3 2026. Eén keer kopen, alle toekomstige versies erbij.',
  },
];

const CASE_STUDIES = [
  {
    name: 'Eva',
    client: 'Dubai-Property.nl',
    quote:
      'Appie beantwoordt leads binnen 30 seconden, 24 uur per dag. E-mailrespons van 2-4 uur naar onder de 5 minuten.',
    metrics: [
      { label: 'Lead-capture', value: '3 min naar <2 sec' },
      { label: 'E-mailrespons', value: '2-4 uur naar <5 min' },
    ],
    image: '/cases/dubai-property.avif',
  },
  {
    name: 'Ben de Voorman',
    client: 'Coach + content',
    quote: 'Contentproductie van 4 uur naar 15 minuten per stuk.',
    metrics: [
      { label: 'Content per stuk', value: '4 uur naar 15 min' },
    ],
    image: '/agents/ben.jpg',
  },
  {
    name: 'Privanotify',
    client: 'Privacy SaaS',
    quote: '50+ taken per dag afgehandeld op 3 Appies. GDPR-monitoring, alerts, compliance-audit volledig geautomatiseerd.',
    metrics: [{ label: 'Dagelijkse taken', value: '50+ via 3 Appies' }],
    image: '/screenshots/privanotify-fresh.jpg',
  },
  {
    name: 'CZA Bouwbedrijf',
    client: 'Bouw',
    quote: 'Setup in een weekend, resultaat vanaf dag 1.',
    metrics: [
      { label: 'WhatsApp-respons', value: '4-6 uur naar <30 sec' },
      { label: 'Conversie', value: '+23%' },
    ],
    image: '/cases/cza-bouwbedrijf.jpg',
  },
  {
    name: 'BeyondSchool',
    client: 'Onderwijs',
    quote: 'Diagnose: 14 uur per week aan handmatige rapportages. Nu doet de Techwiz het automatisch.',
    metrics: [{ label: 'Tijd bespaard', value: '14 uur per week' }],
    image: '/cases/beyondschool.avif',
  },
  {
    name: 'Luminaire Coaching · Hamid Zahedi',
    client: 'Spiritual coaching',
    quote: 'Artemis doet readings, esoterische kennis, content creation en business building. 18 uur per week vrij voor klantgesprekken.',
    metrics: [{ label: 'Tijd bespaard', value: '18 uur per week' }],
    image: '/agents/artemis.jpg',
  },
];

const AUDIENCES = [
  {
    icon: Users,
    title: 'Builders',
    body: 'Je weet je weg in een terminal en wil precies snappen hoe een Techwiz werkt. Fork de repo, pas skills aan, ship.',
  },
  {
    icon: Sparkles,
    title: 'Starters',
    body: "Je hebt nog nooit een regel code geschreven, maar je wil zelf bouwen. De PDF leest als een receptenboek. 150+ skills sleep je drag-and-drop in OpenClaw.",
  },
  {
    icon: Calendar,
    title: 'Coaches en service-bedrijven',
    body: 'Je vult je week met klantgesprekken, niet met inbox-triage. Zelfde setup als bij Eva, Ben en Luminaire.',
  },
];

const TOC = [
  'Introductie - wat Appie is en wat hij voor jou doet',
  'Setup van je eigen server (OpenClaw of Hermes Agent)',
  'Model kiezen - Claude Opus 4.7 vs OpenAI Codex 5.4',
  'Je eerste skill installeren (15-minuten onboarding)',
  'Appie Kit: de 150+ skills catalogus',
  'Inbox-triage en e-mailintegratie',
  'Agendabeheer (Google Calendar + Notion)',
  'Lead capture + CRM-koppeling',
  'Content-productie en video-generatie',
  'Geavanceerde configuratie - memory, SOUL.md, persona-afstemming',
  'Case studies: Eva, Ben, Privanotify, CZA',
  'Troubleshooting + FAQ',
  'Roadmap en updates (v4.5+)',
];

const PDF_FAQ = [
  {
    q: 'Werkt de PDF ook met OpenAI als ik geen Claude wil?',
    a: 'Ja. v4.5 is de eerste versie die volledig werkt met zowel Claude Opus 4.7 als OpenAI Codex 5.4. Je kiest je model in stap 3 van de setup.',
  },
  {
    q: 'Heb ik technische kennis nodig?',
    a: 'Basiskennis van een terminal is handig, maar de PDF is geschreven voor niet-programmeurs. Elke stap heeft screenshots en uitleg.',
  },
  {
    q: 'Wat is het verschil tussen de PDF en Instant Appie?',
    a: 'Met de PDF bouw je Appie zelf (eenmalig €65). Met Instant Appie bouwt Weblyfe alles voor je en draait het fully managed (€250/mo in de beta). De PDF is de DIY-route.',
  },
  {
    q: 'Wat zijn lifetime updates precies?',
    a: 'Elke nieuwe versie van de PDF en het Appie Kit krijg je automatisch. v4.5 is nu live. v5.0 staat op de planning voor Q3 2026 en is ook voor jou.',
  },
  {
    q: 'Hoe krijg ik de PDF na aankoop?',
    a: 'Je krijgt direct een e-mail met de downloadlink en toegang tot de private GitHub-repo van het Appie Kit.',
  },
  {
    q: 'Kan ik de skills aanpassen?',
    a: 'Ja. De skills zijn gewone tekstbestanden (YAML + Markdown). Fork de repo, pas aan, push. Alles staat in de README.',
  },
  {
    q: 'Wat als het niet werkt voor mij?',
    a: 'Stuur een e-mail naar seyed@weblyfe.nl met je vraag of blocker. We horen het graag en lossen het op.',
  },
];

export default function PdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/appie-pdf-hero-higgsfield.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25 saturate-125"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,rgba(223,183,113,0.24),transparent_28%),linear-gradient(90deg,#031D16_0%,rgba(3,29,22,0.94)_34%,rgba(3,29,22,0.68)_66%,#031D16_100%)]" />
            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)',
                backgroundSize: '64px 64px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DFB771]/30 bg-[#031D16]/70 px-4 py-2 text-[#DFB771] text-xs font-mono uppercase tracking-[0.22em] mb-5 shadow-[0_12px_60px_rgba(0,0,0,0.25)]">
                <FileText className="w-3.5 h-3.5" />
                v4.5 live · DIY Techwiz blueprint
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] mb-6 tracking-[-0.055em] text-balance">
                Bouw je eigen AI assistent
                <span className="block text-[#DFB771]">dit weekend.</span>
              </h1>
              <p className="text-[#F6FEFC]/78 text-lg md:text-xl mb-7 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                De complete Weblyfe blueprint voor je eigen Techwiz: 100+ pagina&apos;s,
                150+ kant-en-klare skills, Appie Kit toegang en lifetime updates.
                Geen abonnement. Geen vendor lock-in.
              </p>

              <div className="grid grid-cols-3 gap-2.5 max-w-xl mx-auto lg:mx-0 mb-7">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#247459]/35 bg-[#031D16]/70 px-4 py-3 backdrop-blur">
                    <p className="text-2xl md:text-3xl font-bold text-[#DFB771] leading-none">{stat.value}</p>
                    <p className="mt-1 text-[11px] md:text-xs uppercase tracking-wider text-[#F6FEFC]/55">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                <a
                  href={CHECKOUT_TRACKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-black px-8 py-4 rounded-2xl transition-all shadow-[0_18px_55px_-20px_rgba(223,183,113,0.95)] hover:-translate-y-0.5"
                >
                  Koop de gids · €65
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contents"
                  className="inline-flex items-center justify-center gap-2 border border-[#F6FEFC]/16 bg-[#F6FEFC]/6 hover:bg-[#F6FEFC]/10 text-[#F6FEFC] font-semibold px-8 py-4 rounded-2xl transition-colors backdrop-blur"
                >
                  Bekijk wat je krijgt
                </a>
              </div>

              <p className="text-sm text-[#F6FEFC]/58">
                Direct geleverd via e-mail · veilig betalen via Stripe · zelf bouwen of later upgraden naar Instant Appie
              </p>
            </div>

            <div className="relative mx-auto lg:mx-0 w-full max-w-lg">
              <div className="absolute -inset-6 rounded-[2.25rem] bg-[#DFB771]/18 blur-3xl" />
              <div className="relative rounded-[2rem] border border-[#DFB771]/28 bg-[#071f18]/78 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-[#DFB771]/25 bg-[#031D16]">
                  <Image
                    src="/appie-pdf-hero-higgsfield.webp"
                    alt="Premium Weblyfe AI guide scene"
                    fill
                    sizes="(min-width: 1024px) 520px, 92vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/75 via-transparent to-transparent" />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-[0.72fr_1fr] items-stretch">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#DFB771]/30 bg-[#F6FEFC]">
                    <Image
                      src="/appie-pdf-cover.jpg"
                      alt="Build Your Own Techwiz PDF v4.5 cover"
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-2xl border border-[#247459]/35 bg-[#031D16]/72 p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-2">Vandaag bouwen</p>
                      <h2 className="text-xl font-bold leading-tight">Van nul naar een werkende Techwiz setup.</h2>
                    </div>
                    <ul className="mt-5 space-y-2 text-sm text-[#F6FEFC]/70">
                      <li className="flex gap-2"><Check className="w-4 h-4 text-[#DFB771] mt-0.5 flex-shrink-0" />OpenClaw of Hermes Agent</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-[#DFB771] mt-0.5 flex-shrink-0" />Private Appie Kit repo</li>
                      <li className="flex gap-2"><Check className="w-4 h-4 text-[#DFB771] mt-0.5 flex-shrink-0" />Lifetime updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#071f18] border-y border-[#247459]/20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-4">
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal.label} className="flex items-start gap-3 rounded-2xl border border-[#247459]/24 bg-[#1a2e27]/45 p-5">
                <div className="w-10 h-10 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/25 flex items-center justify-center flex-shrink-0">
                  <signal.icon className="w-5 h-5 text-[#DFB771]" />
                </div>
                <div>
                  <h2 className="text-base font-bold">{signal.label}</h2>
                  <p className="mt-1 text-sm text-[#F6FEFC]/62 leading-relaxed">{signal.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WAT KRIJG JE */}
        <section id="contents" className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Wat zit er in het pakket
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Alles wat ik bij Weblyfe gebruik,
                <span className="block text-[#DFB771]">in 1 doorlopend document.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PACKAGE_BULLETS.map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6 hover:border-[#DFB771]/40 transition-colors"
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

        {/* USP v4.5 */}
        <section className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
              v4.5 USP
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Geen vendor lock-in.
              <span className="block text-[#DFB771]">
                Claude Opus 4.7 of OpenAI Codex 5.4. OpenClaw of Hermes.
              </span>
            </h2>
            <p className="text-[#F6FEFC]/70 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
              v4.5 is de eerste versie waar jouw Techwiz draait op zowel Claude Opus
              4.7 als OpenAI Codex 5.4. Op zowel OpenClaw als Hermes Agent. Wissel van
              model zonder je skills opnieuw te bouwen. Wat in 2025 nog drie aparte
              builds was, is nu één doorlopende stack.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6">
                <p className="text-xs font-mono uppercase tracking-wider text-[#DFB771] mb-2">
                  Modellen
                </p>
                <p className="text-2xl font-bold mb-1">Claude Opus 4.7</p>
                <p className="text-2xl font-bold text-[#F6FEFC]/60">OpenAI Codex 5.4</p>
              </div>
              <div className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6">
                <p className="text-xs font-mono uppercase tracking-wider text-[#DFB771] mb-2">
                  Platforms
                </p>
                <p className="text-2xl font-bold mb-1">OpenClaw</p>
                <p className="text-2xl font-bold text-[#F6FEFC]/60">Hermes Agent</p>
              </div>
            </div>
          </div>
        </section>

        {/* APPIE KIT SHOWCASE */}
        <section className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                De Appie Kit
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                150+ skills.{' '}
                <span className="text-[#DFB771]">Drag-and-drop.</span>
              </h2>
              <p className="text-[#F6FEFC]/70 max-w-2xl mx-auto text-lg">
                Sleep een skill in OpenClaw of Hermes Agent en je Techwiz wordt direct
                10 keer slimmer. Zelfde skills die nu draaien bij CZA, BeyondSchool en
                Luminaire.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                'Inbox triage',
                'Lead capture',
                'CRM sync',
                'Calendar booking',
                'Voicenote → tekst',
                'Content draft',
                'Video via fal.ai',
                'Invoice match',
                'WhatsApp intake',
                'Daily briefing',
                'Memory pipeline',
                'Telegram alerts',
                'Notion writeback',
                'Brevo segmentatie',
                'Stripe events',
                'Hetzner deploy',
                'Skill loader',
                'Persona tuning',
              ].map((skill) => (
                <div
                  key={skill}
                  className="rounded-xl bg-[#031D16]/60 border border-[#247459]/30 px-3 py-3 text-center hover:border-[#DFB771]/40 hover:-translate-y-0.5 transition-all"
                >
                  <p className="text-[#F6FEFC]/85 text-xs md:text-sm font-medium">
                    {skill}
                  </p>
                </div>
              ))}
              <div className="col-span-2 md:col-span-4 lg:col-span-6 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/40 px-4 py-3 text-center">
                <p className="text-[#DFB771] font-semibold text-sm md:text-base">
                  + 130 meer skills, allemaal in de private repo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Echte resultaten
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Echte klanten.{' '}
                <span className="text-[#DFB771]">Echte cijfers.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CASE_STUDIES.map((c) => (
                <article
                  key={c.name}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors overflow-hidden flex flex-col"
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
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-1">{c.name}</h3>
                    <p className="text-[#F6FEFC]/55 text-xs mb-3 uppercase tracking-wider">
                      {c.client}
                    </p>
                    <p className="text-[#F6FEFC]/80 text-sm mb-4 leading-relaxed">
                      &ldquo;{c.quote}&rdquo;
                    </p>
                    <ul className="space-y-2 mt-auto">
                      {c.metrics.map((m) => (
                        <li
                          key={m.label}
                          className="flex items-center justify-between gap-3 text-xs"
                        >
                          <span className="text-[#F6FEFC]/55 uppercase tracking-wider">
                            {m.label}
                          </span>
                          <span className="text-[#DFB771] font-semibold">
                            {m.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* AUDIENCES */}
        <section className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Voor wie
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Voor wie is de PDF?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {AUDIENCES.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/30 flex items-center justify-center mb-4">
                    <a.icon className="w-6 h-6 text-[#DFB771]" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{a.title}</h3>
                  <p className="text-[#F6FEFC]/65 text-sm leading-relaxed">{a.body}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-10 max-w-4xl mx-auto">
              <div className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6">
                <h3 className="font-bold text-lg mb-3 text-[#DFB771]">Dit is voor jou als</h3>
                <ul className="space-y-2 text-[#F6FEFC]/75 text-sm">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-[#DFB771] mt-0.5 flex-shrink-0" />Je zelf wil bouwen en leren hoe het werkt</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-[#DFB771] mt-0.5 flex-shrink-0" />Je weet: dit is geen hype, dit is infrastructuur</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-[#DFB771] mt-0.5 flex-shrink-0" />Je een weekend wil investeren voor een tool die jaren werkt</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-[#DFB771] mt-0.5 flex-shrink-0" />Je liever eenmalig betaalt dan maandelijks</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6">
                <h3 className="font-bold text-lg mb-3 text-[#F6FEFC]/70">Dit is niet voor jou als</h3>
                <ul className="space-y-2 text-[#F6FEFC]/60 text-sm">
                  <li>Je wil dat iemand anders alles regelt (dan is /beta je pad)</li>
                  <li>Je verwacht plug-and-play zonder eigen setup-tijd</li>
                  <li>Je al een full-service Appie hebt via Instant Appie</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TOC */}
        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                Inhoudsopgave
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Wat zit er in de PDF?
              </h2>
            </div>
            <ol className="space-y-3">
              {TOC.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-xl bg-[#1a2e27]/40 border border-[#247459]/20 p-4 hover:border-[#DFB771]/30 transition-colors"
                >
                  <span className="font-mono text-[#DFB771] text-sm mt-0.5 min-w-[2rem]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#F6FEFC]/85 text-sm md:text-base">{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                FAQ
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Vragen die elke koper stelt.
              </h2>
            </div>
            <FaqAccordion items={PDF_FAQ} />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#247459]/20 via-transparent to-[#DFB771]/10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Klaar om te beginnen?
            </h2>
            <p className="text-[#F6FEFC]/70 text-lg mb-10 max-w-2xl mx-auto">
              Eenmalig €65. Lifetime updates. Binnen 5 minuten heb je de PDF en
              GitHub-toegang in je inbox.
            </p>
            <a
              href={CHECKOUT_TRACKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-bold px-9 py-5 rounded-2xl text-lg transition-colors"
            >
              Koop nu voor €65
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <ul className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-sm text-[#F6FEFC]/70">
              <li className="flex items-center gap-2 justify-center">
                <Shield className="w-4 h-4 text-[#DFB771]" />
                100% veilig via Stripe
              </li>
              <li className="flex items-center gap-2 justify-center">
                <RefreshCcw className="w-4 h-4 text-[#DFB771]" />
                Eenmalig betalen, lifetime updates
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Mail className="w-4 h-4 text-[#DFB771]" />
                Binnen 5 minuten in je inbox
              </li>
            </ul>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
