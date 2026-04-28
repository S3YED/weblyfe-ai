'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Inbox,
  Calendar,
  FileText,
  BrainCircuit,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { APPIE, PRICING, GUARANTEE, SOCIAL } from '@/lib/brand-constants';

// Homepage structured by IMU TIPS funnel (T → I → P → S).
// Phase labels are NEVER rendered — visitors see content names only.
// Source of truth for copy: docs/APPIE-PERSONA.md (v1.1) + brand-constants.ts.

// ─── DATA ────────────────────────────────────────────────────────────────────

const APPIE_BUBBLES = [
  {
    when: '08:00',
    text: 'Goedemorgen. 23 mails afgehandeld vannacht (drafts in Verzonden). 4 hebben jou nodig: 2 prijsvragen, 1 partnership, 1 factuurgeschil.',
  },
  {
    when: '11:14',
    text: 'Sandra wil donderdag verzetten. Geen conflict — verschoven naar 14:00, om bevestiging gevraagd.',
  },
  {
    when: '14:30',
    text: 'WhatsApp van Mark over een keukenrenovatie in Rotterdam, budget 25k. Binnen service-radius. Lead in Brevo + Monday gezet, intake-vragen op afstand.',
  },
  {
    when: '16:48',
    text: '6 facturen in Moneybird verwerkt. Geen verschillen. Reageer met "laat zien" + onderwerp als je context wil.',
  },
];

const CUSTOMER_OUTCOMES = [
  { icon: Inbox, label: 'Inbox', desc: 'Triage, drafts, antwoorden op laag-risico mails. Risico\'s pingen jou eerst in Telegram.' },
  { icon: Phone, label: 'Intake', desc: 'WhatsApp / formulieren / mail leads kwalificeren en wegschrijven naar je CRM.' },
  { icon: Calendar, label: 'Agenda', desc: 'Slots vinden, uitnodigingen sturen, verplaatsen, beleefd afhouden.' },
  { icon: FileText, label: 'Admin', desc: 'Facturen reconciliëren in Moneybird, uitgaven loggen, dagelijkse samenvatting.' },
  { icon: BrainCircuit, label: 'Memory', desc: 'Onthoudt klant-voorkeuren, jouw toon, eerdere beslissingen — dwars door sessies heen.' },
];

const TOP_CASES = [
  {
    client: 'CZA Bouwbedrijf',
    sector: 'Bouw',
    appieName: 'Sjaak',
    headline: 'WhatsApp-intake die niet meer slaapt.',
    body:
      'Aanvragen via WhatsApp werden vroeger pas na 4-6 uur beantwoord. Sjaak — een Custom Appie — pakt ze nu in seconden op, kwalificeert binnen ±50 km service-radius, en schrijft de lead direct weg naar Brevo, Monday en Moneybird tegelijk.',
    metricsPending: true,
    metricsNote: 'Resultaten in opvraag bij Hesam — komen op de definitieve case page.',
  },
  {
    client: 'Dubai-Property.nl',
    sector: 'Vastgoed',
    appieName: 'Eva',
    headline: 'Lead-kwalificatie voor 752 inkomende leads.',
    body:
      'Eva is de Custom Appie voor Dubai-Property. Ze beoordeelt nieuwe inkomende leads, kwalificeert tegen de ICP en routeert hot leads naar het sales team — eerste reactie binnen minuten, dag en nacht.',
    metricsPending: true,
    metricsNote: 'Klant-quote en harde cijfers worden bevestigd door Sandjai en Priscilla.',
  },
  {
    client: 'SafeSite Security',
    sector: 'Security / B2B',
    appieName: "Shay's Appie",
    headline: 'Hele site gebouwd in één dag, via voicenotes.',
    body:
      'Shay vertelde Appie wat zijn business deed via Telegram-voicenotes. Een dag later stond er een complete bedrijfssite live. Geen designer-handoff, geen meetings — alleen brief, build, ship.',
    metricsPending: true,
    metricsNote: 'Quote in opvraag bij Shay.',
  },
];

const CUSTOM_APPIES = [
  { name: 'Sjaak', client: 'CZA Bouwbedrijf', role: 'WhatsApp-intake voor de bouw' },
  { name: 'Eva', client: 'Dubai-Property.nl', role: 'Lead-kwalificatie vastgoed' },
  { name: "Shay's Appie", client: 'SafeSite Security', role: 'Voice-to-website builder' },
  { name: 'Appie-2', client: 'Weblyfe (intern)', role: 'Marketing & comms herald' },
  { name: 'Appie-3', client: 'Weblyfe (intern)', role: 'CTO / DevOps' },
  { name: 'Wolfie', client: 'WolfieDiddy', role: 'Eerste externe OpenClaw deploy' },
];

const PORTFOLIO = [
  { name: 'Confettimaker', sector: 'Events', url: 'https://confettimaker.com' },
  { name: 'SafeSite Security', sector: 'Security', url: '#' },
  { name: 'Privanotify', sector: 'SaaS / Privacy', url: 'https://privanotify.com' },
  { name: 'Boooth', sector: 'Photo booth', url: 'https://boooth.nl' },
  { name: 'LPS Pilates', sector: 'Wellness', url: 'https://lpspilates.nl' },
  { name: 'Multronic', sector: 'B2B industrieel', url: 'https://multronic.be' },
  { name: 'iOnlyBookVIP', sector: 'Luxury travel', url: 'https://ionlybookvip.com' },
  { name: 'Dubai-Property', sector: 'Vastgoed', url: 'https://dubai-property.nl' },
];

const FAQS = [
  {
    q: 'Hoe verschilt Appie van ChatGPT?',
    a: 'ChatGPT is een chatvenster zonder geheugen. Appie heeft persistent geheugen, draait op je eigen server, en doet werk uit zichzelf — zonder dat je elke keer een prompt hoeft in te tikken.',
  },
  {
    q: 'Wat als ik een mens in de keten wil?',
    a: 'Altijd jij. Appie handelt nooit zelf een betaling, contract of nieuwe hire af zonder jou. Alles wat risicovol is laat ik eerst in Telegram zien. Je kunt elk onderwerp markeren als "eerst vragen".',
  },
  {
    q: 'Hoe veilig is mijn data?',
    a: 'Appie draait op een dedicated private server. Je gesprekken en data trainen geen publieke modellen. Encrypted connecties, secure API handling, geen onnodige opslag.',
  },
  {
    q: 'Hoe lang duurt de setup?',
    a: 'Instant Appie staat binnen 24 uur live — wij regelen alles. Build Your Own Appie kost je een paar uur eigen tijd met de PDF.',
  },
  {
    q: 'Met welke tools werkt Appie samen?',
    a: 'Google Workspace, Notion, Telegram, WhatsApp, Stripe, Brevo, Moneybird, Monday, HubSpot, Airtable, n8n, Webflow. Heeft een tool een API? Dan praat Appie ermee.',
  },
  {
    q: 'Wat als Appie iets verkeerd doet?',
    a: 'Failsafes ingebouwd. Risico-acties pingen jou eerst, complexe edge cases routen naar mens, en je hebt altijd override controls. Plus 30 dagen support na launch.',
  },
  {
    q: 'Kan ik na maand 1 stoppen?',
    a: 'Ja. Maandelijks opzegbaar, geen contract. En als de tevreden-of-geld-terug garantie geldt, krijg je je €250 retour zonder gedoe.',
  },
  {
    q: 'Wat als ik al tools heb staan?',
    a: 'Appie wordt de laag die alles verbindt. Geen vervanging — een orchestrator die jouw bestaande stack opslokt en bedient.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function TIPSLanding() {
  return (
    <div className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
      {/* ── HERO (T — Tempt) ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          animate={{ opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#247459] blur-[100px]"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 grid lg:grid-cols-[auto_1fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#DFB771]/40 shadow-[0_0_40px_-10px_rgba(223,183,113,0.4)]">
              <Image
                src="/agents/appie.jpg"
                alt={APPIE.name}
                width={224}
                height={224}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute bottom-2 right-2 text-3xl">{APPIE.productFraming.nl ? '🧙🏽‍♂️' : ''}</div>
            </div>
          </motion.div>

          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] mb-4"
            >
              Hoi, ik ben Appie.
              <span className="block text-[#DFB771] mt-2">Jouw persoonlijke Techwiz.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#F6FEFC]/70 text-lg md:text-xl mb-3 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Een geniale werknemer met de laagste kosten. Ik doe het werk dat je week
              opvreet. Inbox. Intake. Agenda. Admin.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[#F6FEFC]/50 text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Jij bouwt. Ik houd de boel draaiend.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="#aanbod"
                className="flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-7 py-4 rounded-xl transition-colors"
              >
                {PRICING.instantAppie.cta.nl} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#aanbod"
                className="flex items-center justify-center gap-2 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/40 text-[#F6FEFC] font-semibold px-7 py-4 rounded-xl transition-colors"
              >
                {PRICING.pdfGuide.cta.nl} — €65
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[#F6FEFC]/40 text-xs mt-4 text-center lg:text-left"
            >
              {GUARANTEE.copy.nl}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── BRIDGE (T → I) ───────────────────────────────────────────── */}
      <section className="py-16 bg-[#0E3D31]/40 border-y border-[#247459]/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <p className="text-[#F6FEFC]/70 text-xl md:text-2xl leading-relaxed">
              Het is half zes. Je hebt nog 47 ongelezen mails.
            </p>
            <p className="text-[#F6FEFC]/50 text-lg md:text-xl">
              Het kantoor sluit. De week niet.
            </p>
            <p className="text-[#DFB771]/80 text-lg md:text-xl pt-2">
              Daar kwam Appie voor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MEET APPIE (I — Influence) ───────────────────────────────── */}
      <section className="py-24 bg-[#031D16]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Zo klinkt een dag met Appie
            </h2>
            <p className="text-[#F6FEFC]/50 mt-3 text-base">
              Vier echte berichten uit een klant-Telegram. Niets gescript.
            </p>
          </motion.div>

          <div className="space-y-3">
            {APPIE_BUBBLES.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3 max-w-xl"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#247459]/30 flex items-center justify-center text-lg">
                  🧙🏽‍♂️
                </div>
                <div className="bg-[#1a2e27] rounded-2xl rounded-tl-sm px-5 py-3 flex-1">
                  <p className="text-[#DFB771]/70 text-xs mb-1">{b.when}</p>
                  <p className="text-[#F6FEFC]/85 text-sm leading-relaxed">{b.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ORIGIN (I) ───────────────────────────────────────── */}
      <section className="py-20 bg-[#0E3D31]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-[1fr_2fr] gap-8 items-start"
          >
            <div className="text-center md:text-left">
              <p className="text-[#DFB771] text-xs font-semibold uppercase tracking-widest mb-3">
                Wie heeft Appie gebouwd
              </p>
              <h3 className="text-2xl font-bold mb-3">Seyed Hosseini</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href={SOCIAL.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DFB771] hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href={SOCIAL.founder.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DFB771] hover:underline"
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL.founder.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DFB771] hover:underline"
                >
                  YouTube
                </a>
              </div>
            </div>
            <div className="text-[#F6FEFC]/70 text-base md:text-lg leading-relaxed space-y-3">
              <p>
                Ik begon in de medische wereld. Daarna een bureau gestart — Weblyfe — om
                de juiste verhalen te bouwen voor groeiende merken. Drie jaar later draait
                ons hele bureau op een eigen vloot AI medewerkers.
              </p>
              <p>
                Appie is de afgeleide. De versie die ik aan klanten verkoop. Wat hier
                staat? Hetzelfde dat onze eigen inbox, intake en admin draait.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CUSTOMER CASES (I → P) ───────────────────────────────────── */}
      <section className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Appie bij klanten</h2>
            <p className="text-[#F6FEFC]/50 mt-3">Drie verhalen die al draaien.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TOP_CASES.map((c, i) => (
              <motion.div
                key={c.client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 flex flex-col"
              >
                <p className="text-[#DFB771] text-xs font-bold uppercase tracking-wider mb-1">
                  {c.sector}
                </p>
                <h3 className="text-xl font-bold mb-1">{c.client}</h3>
                <p className="text-[#F6FEFC]/40 text-xs mb-4">Appie: {c.appieName}</p>
                <p className="text-[#F6FEFC]/85 text-base font-semibold mb-3">{c.headline}</p>
                <p className="text-[#F6FEFC]/55 text-sm leading-relaxed mb-4 flex-1">
                  {c.body}
                </p>
                {c.metricsPending && (
                  <p className="text-[#F6FEFC]/30 text-xs italic">{c.metricsNote}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM APPIES GRID (I → P, anchors €2k tier) ────────────── */}
      <section id="custom-appies" className="py-20 bg-[#0E3D31]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#DFB771] text-xs font-bold uppercase tracking-widest mb-3">
              Custom-built Appies
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Voor specifieke setups bouwen we 'm op maat
            </h2>
            <p className="text-[#F6FEFC]/50 max-w-xl mx-auto">
              Zes voorbeelden van Custom Appies die nu draaien voor klanten en intern.
              Vanaf €2.000/mnd. Wat zou jouw Techwiz doen?
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CUSTOM_APPIES.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 bg-[#031D16]/60 rounded-xl border border-[#247459]/20 text-center"
              >
                <div className="text-3xl mb-2">🧙🏽‍♂️</div>
                <p className="text-[#F6FEFC] font-bold">{a.name}</p>
                <p className="text-[#DFB771]/70 text-xs mt-1">{a.client}</p>
                <p className="text-[#F6FEFC]/55 text-xs mt-2">{a.role}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href={PRICING.customAppie.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/40 text-[#F6FEFC] font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {PRICING.customAppie.cta.nl} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO STRIP (Q8 — proof of build chops) ─────────────── */}
      <section className="py-12 bg-[#031D16] border-y border-[#247459]/15">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[#F6FEFC]/30 text-xs uppercase tracking-widest mb-6 font-semibold">
            We bouwden ook deze
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PORTFOLIO.map((p) => (
              <a
                key={p.name}
                href={p.url === '#' ? undefined : p.url}
                target={p.url === '#' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1a2e27]/40 border border-[#247459]/20 rounded-full text-[#F6FEFC]/65 text-xs font-medium hover:border-[#DFB771]/50 hover:text-[#F6FEFC] transition-colors"
              >
                {p.name} <span className="text-[#F6FEFC]/30">· {p.sector}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAT APPIE DOET (P — Persuade) ───────────────────────────── */}
      <section className="py-24 bg-[#0E3D31]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Wat Appie voor je doet</h2>
            <p className="text-[#F6FEFC]/50 mt-3">
              Vijf gebieden waar je Techwiz zelfstandig draait.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CUSTOMER_OUTCOMES.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-5 bg-[#031D16]/60 rounded-xl border border-[#247459]/20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#DFB771]/15 flex items-center justify-center mb-3">
                  <o.icon className="w-5 h-5 text-[#DFB771]" />
                </div>
                <h3 className="font-bold mb-2">{o.label}</h3>
                <p className="text-[#F6FEFC]/55 text-xs leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO (P → S) ────────────────────────────────────────── */}
      <section className="py-20 bg-[#031D16]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Twee minuten met een echte klant
            </h2>
            <p className="text-[#F6FEFC]/50 mb-8 max-w-xl mx-auto">
              Geen demo. Geen scripted prospect. Loom-opname van een live workflow.
            </p>
          </motion.div>

          <div className="aspect-video rounded-2xl border border-[#247459]/30 bg-[#0E3D31]/50 flex items-center justify-center text-[#F6FEFC]/40 text-sm italic">
            Loom embed komt hier — Phase 1.5
          </div>

          <p className="text-[#F6FEFC]/30 text-xs mt-3">
            Voice clip placeholder · lokale OSS TTS (Coqui XTTS-v2) wordt gewired
          </p>
        </div>
      </section>

      {/* ── AANBOD (S — Sell) ───────────────────────────────────────── */}
      <section id="aanbod" className="py-24 bg-[#0E3D31]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Drie manieren om Appie te krijgen</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* DIY PDF */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 p-7 flex flex-col"
            >
              <p className="text-[#247459] text-xs font-bold uppercase tracking-wide mb-3">
                Build it yourself
              </p>
              <h3 className="font-bold text-xl mb-1">{PRICING.pdfGuide.name}</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-5">PDF guide v4.4 — 75 pagina's</p>
              <div className="mb-5">
                <span className="font-bold text-3xl">{PRICING.pdfGuide.priceLabel}</span>
                <span className="text-[#F6FEFC]/40 text-sm ml-1">eenmalig</span>
              </div>
              <ul className="space-y-2 mb-7 flex-1">
                {[
                  'Compleet 75-pagina blueprint',
                  '50+ copy-paste code snippets',
                  'Eigen server, eigen Appie',
                  '3 branded diagrams + cheatsheet',
                  'Werkt met Mac of VPS',
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[#F6FEFC]/65 text-sm"
                  >
                    <Check className="w-4 h-4 text-[#247459] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/buy/pdf"
                className="block text-center w-full py-3 bg-[#247459]/15 hover:bg-[#247459]/25 border border-[#247459]/40 font-semibold text-sm rounded-xl transition-colors"
              >
                {PRICING.pdfGuide.cta.nl}
              </Link>
            </motion.div>

            {/* Instant Appie */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative bg-gradient-to-b from-[#247459]/20 to-[#1a2e27]/50 rounded-2xl border-2 border-[#DFB771]/50 p-7 shadow-lg shadow-[#DFB771]/5 flex flex-col"
            >
              <div className="absolute -top-3 left-6 bg-[#DFB771] text-[#031D16] text-xs font-bold uppercase px-3 py-1 rounded-full">
                Most popular
              </div>
              <p className="text-[#DFB771] text-xs font-bold uppercase tracking-wide mb-3">
                Managed flagship
              </p>
              <h3 className="font-bold text-xl mb-1">{PRICING.instantAppie.name}</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-5">Wij bouwen + draaien</p>
              <div className="mb-5">
                <span className="font-bold text-3xl">€250</span>
                <span className="text-[#F6FEFC]/40 text-sm ml-1">/ maand</span>
              </div>
              <ul className="space-y-2 mb-7 flex-1">
                {[
                  'Volledig managed setup binnen 24u',
                  'Eigen private server (Hetzner CX33)',
                  '$50/mnd AI-budget inbegrepen',
                  'Telegram + WhatsApp aangesloten',
                  'Persistent geheugen + memory',
                  '55+ skills library',
                  GUARANTEE.copy.nl,
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[#F6FEFC]/65 text-sm"
                  >
                    <Check className="w-4 h-4 text-[#DFB771] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/buy/instant"
                className="block text-center w-full py-3 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold text-sm rounded-xl transition-colors"
              >
                {PRICING.instantAppie.cta.nl} <span className="ml-1">→</span>
              </Link>
            </motion.div>

            {/* Custom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 p-7 flex flex-col"
            >
              <p className="text-[#F6FEFC]/40 text-xs font-bold uppercase tracking-wide mb-3">
                Custom-built
              </p>
              <h3 className="font-bold text-xl mb-1">{PRICING.customAppie.name}</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-5">Eva, Sjaak, Shay's Appie — wij bouwen jouw versie</p>
              <div className="mb-5">
                <span className="font-bold text-3xl">vanaf €2.000</span>
                <span className="text-[#F6FEFC]/40 text-sm ml-1">/ maand</span>
              </div>
              <ul className="space-y-2 mb-7 flex-1">
                {[
                  'Alles uit Instant Appie',
                  'Maatwerk workflows + integraties',
                  'Industrie-specifieke kwalificatie',
                  'Multi-agent architectuur',
                  '30 dagen dedicated support',
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-[#F6FEFC]/65 text-sm"
                  >
                    <Check className="w-4 h-4 text-[#247459] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={PRICING.customAppie.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-3 bg-[#247459]/15 hover:bg-[#247459]/25 border border-[#247459]/40 font-semibold text-sm rounded-xl transition-colors"
              >
                {PRICING.customAppie.cta.nl}
              </Link>
            </motion.div>
          </div>

          {/* Guarantee callout under offer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 max-w-2xl mx-auto text-center p-6 bg-[#031D16]/60 rounded-xl border border-[#DFB771]/30"
          >
            <p className="text-[#DFB771] text-xs font-semibold uppercase tracking-widest mb-2">
              Garantie
            </p>
            <p className="text-[#F6FEFC] text-lg font-semibold mb-3">{GUARANTEE.headline.nl}</p>
            <p className="text-[#F6FEFC]/70 text-sm">{GUARANTEE.copy.nl}</p>
            <p className="text-[#F6FEFC]/40 text-xs mt-3">{GUARANTEE.mechanic.nl}</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ (S) ──────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-[#031D16]">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold">Vragen</h2>
          </motion.div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 bg-[#1a2e27]/50 rounded-xl border border-[#247459]/20"
              >
                <h3 className="font-semibold text-base mb-2">{faq.q}</h3>
                <p className="text-[#F6FEFC]/55 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA (S) ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#0E3D31] border-t border-[#247459]/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Begin met je Techwiz.
          </h2>
          <p className="text-[#F6FEFC]/60 text-base md:text-lg mb-8 max-w-xl mx-auto">
            {GUARANTEE.copy.nl}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/buy/instant"
              className="flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-7 py-4 rounded-xl transition-colors"
            >
              {PRICING.instantAppie.cta.nl} → €250/mnd
            </Link>
            <Link
              href="/buy/pdf"
              className="flex items-center justify-center gap-2 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/40 text-[#F6FEFC] font-semibold px-7 py-4 rounded-xl transition-colors"
            >
              {PRICING.pdfGuide.cta.nl} — €65
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
