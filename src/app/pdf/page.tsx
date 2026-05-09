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
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';

// Use TEST link in dev/preview, LIVE in production. Override via env var.
// Set NEXT_PUBLIC_STRIPE_PDF_CHECKOUT_URL in Vercel env (preview = test_, production = live)
const STRIPE_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_STRIPE_PDF_CHECKOUT_URL ||
  'https://buy.stripe.com/test_REPLACE_ME_BEFORE_PROD';

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
    name: 'HODM Dubai',
    client: 'Onderwijs',
    quote: '50+ taken per dag afgehandeld op 3 Appies.',
    metrics: [{ label: 'Dagelijkse taken', value: '50+ via 3 Appies' }],
    image: '/cases/beyondschool.avif',
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
    name: 'Luminaire Coaching',
    client: 'Coaching',
    quote: 'Inbox- en lead-loop volledig geautomatiseerd. 18 uur per week vrij.',
    metrics: [{ label: 'Tijd bespaard', value: '18 uur per week' }],
    image: '/cases/bali-with-flow.avif',
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
  'Case studies: Eva, Ben, HODM, CZA',
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

          <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <p className="text-[#DFB771]/80 text-xs font-mono uppercase tracking-widest mb-4">
                v4.5 . 100+ pagina&apos;s . 150+ skills . €65
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
                Bouw je eigen Techwiz
                <span className="block text-[#DFB771]">in een weekend.</span>
              </h1>
              <p className="text-[#F6FEFC]/75 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                De &quot;Build Your Own Techwiz&quot; PDF v4.5. 100+ pagina&apos;s
                stap-voor-stap, 150+ kant-en-klare skills en het complete Appie Kit.
                Werkt met Claude Opus 4.7 en OpenAI Codex 5.4. Geen vendor lock-in.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <a
                  href={STRIPE_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-bold px-7 py-4 rounded-xl transition-colors"
                >
                  Koop nu voor €65
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#247459]/60 hover:border-[#DFB771] text-[#F6FEFC] font-semibold px-7 py-4 rounded-xl transition-colors"
                >
                  Lees eerst de FAQ
                </a>
              </div>

              <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center lg:justify-start text-sm text-[#F6FEFC]/70">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DFB771]" />
                  Eenmalig. Geen abonnement.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DFB771]" />
                  Lifetime updates inbegrepen
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#DFB771]" />
                  150+ skills, drag-and-drop
                </li>
              </ul>
            </div>

            <div className="relative mx-auto lg:mx-0 w-full max-w-md">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#DFB771]/40 shadow-[0_0_60px_-15px_rgba(223,183,113,0.5)]">
                <Image
                  src="/appie-pdf-cover.jpg"
                  alt="Build Your Own Techwiz PDF v4.5"
                  fill
                  sizes="(min-width: 1024px) 420px, 80vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#DFB771] text-[#031D16] px-4 py-2 rounded-xl font-bold text-sm shadow-lg">
                v4.5 . LIVE
              </div>
            </div>
          </div>
        </section>

        {/* WAT KRIJG JE */}
        <section className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
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
              href={STRIPE_CHECKOUT_URL}
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
