'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Zap, Bot, Shield, Brain, Calendar, Mail, Users, Clock, Wrench } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CaseStudySlider, { type CaseStudy } from './CaseStudySlider';
import BlogStrip from './BlogStrip';
import MagneticButton from './anim/MagneticButton';
import HeroReveal from './anim/HeroReveal';
import CountUp from './anim/CountUp';
import AppieTilt from './anim/AppieTilt';
import HairlineDivider from './anim/HairlineDivider';
import { getLatestPosts } from '@/content/blog/posts';

// IMU TIPS framework structures the page (Tempt → Influence → Persuade → Sell);
// labels never render. Per PRD-WEBLYFE-AI v1.3 §7.2 hard rule: visitor sees content,
// not framework jargon. Voice locked in APPIE-PERSONA v1.2.

const PDF_CHECKOUT_URL = 'https://buy.stripe.com/7sYaEYfAn30C8BncwJ3Je2I';

const TRANSFORMATION = {
  title: 'Hoi, ik ben Appie.',
  titleAccent: 'Jouw persoonlijke Techwiz.',
  subtitle:
    'Een geniale werknemer met de laagste kosten. Ik doe het werk dat je week opvreet — inbox, intake, agenda, admin. Jij bouwt. Ik houd de boel draaiend.',
};

const INGREDIENTS = [
  {
    icon: Bot,
    name: 'Een Techwiz, geen tool',
    detail:
      'Software automatiseert taken; een Techwiz neemt verantwoordelijkheid voor uitkomsten. Geen chatbot — een persistente, herinnerende digitale collega die op een eigen private server draait.',
  },
  {
    icon: Brain,
    name: 'Werkt in jouw week',
    detail:
      '08:00 een briefing van wat ik gisteren afhandelde en wat vandaag jouw aandacht nodig heeft. Verbonden met Google Workspace, Notion, Stripe, Telegram, WhatsApp — alles tegelijk.',
  },
  {
    icon: Shield,
    name: 'Werkt zichtbaar',
    detail:
      'Geen black box, geen "trust the AI". Reversibele taken: doen. Onomkeerbare taken: vragen. Je weet in de ochtend wat ik gisteren deed, je weet in de avond wat ik vandaag deed.',
  },
];

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Ik kom je workspace binnen',
    desc:
      'We zetten je private server op, koppelen je kanalen en stemmen mij af op jouw bedrijf. Binnen 24 uur draai ik mee.',
  },
  {
    n: '02',
    title: 'Ik leer hoe jij werkt',
    desc:
      'Ik lees je docs, leer je stem, connect je tools. Eerste week onthoud ik wat klanten willen, hoe je antwoordt, en welke beslissingen jou wakker houden.',
  },
  {
    n: '03',
    title: 'Jij bouwt, ik draai',
    desc:
      'Inbox triage, intake, scheduling, follow-ups, admin — afgehandeld. Jij houdt over wat alleen jij kan: bouwen, verkopen, beslissen.',
  },
];

// Real client cases per PRD-WEBLYFE-AI v1.3 §8.5 — only audit-able metrics ship.
// Older claims (BeyondSchool 200/dag, Stasher 3u→20min, Lost LeBlanc 14u→2u) are
// retired pending verification per PRD §2 risk register.
// Portraits = canonical /agents/*.jpg files already used by /openclaw (Seyed lock 2026-05-02).
const SOCIAL_PROOFS: CaseStudy[] = [
  {
    name: 'CZA Bouwbedrijf',
    role: 'WhatsApp intake — Ben de Voorman',
    quote:
      'Ben scoort leads 0-100 op WhatsApp en reageert binnen 2 minuten. Vroeger duurde een eerste reactie 4-6 uur, nu onder de 30 seconden. 40% van de leads komt buiten kantooruren binnen — die haakten voorheen af.',
    portrait: '/agents/ben.jpg',
    metric: { value: '<30s', label: 'eerste reactie' },
    audioSrc: '/audio/ben-intro.mp3',
  },
  {
    name: 'Dubai-Property.nl',
    role: 'Lead qualification — Eva',
    quote:
      'Eva kwalificeert property inquiries, plant viewings, en kwalificeert kopers. 24/7 op een eigen Mac Mini, Telegram en CRM aangesloten. Niemand meer wakker bellen voor een terugbelnotitie.',
    portrait: '/agents/eva.jpg',
    metric: { value: '24/7', label: 'altijd aan' },
    audioSrc: '/audio/eva-intro.mp3',
  },
  {
    name: 'Weblyfe zelf',
    role: 'Eigen fleet — Appie 1/2/3',
    quote:
      'Drie AI agents runnen Weblyfe over tijdzones. Ze handelen mails, deploys, client projects, CRM en content creation af. 50+ tasks per dag, 99,9% uptime. We schrijven over wat al maanden bij ons werkt — niet over wat we hopen te bouwen.',
    portrait: '/agents/appie.jpg',
    metric: { value: '99,9%', label: 'uptime' },
    audioSrc: '/audio/appie-intro.mp3',
  },
];

const RECENT_BUILDS: { name: string; href: string; image: string }[] = [
  { name: 'CZA Bouwbedrijf', href: 'https://cza.nl', image: '/screenshots/cza-fresh.jpg' },
  { name: 'Boooth', href: 'https://boooth.nl', image: '/screenshots/boooth-home-fresh.jpg' },
  { name: 'Privanotify', href: 'https://privanotify.com', image: '/screenshots/privanotify-fresh.jpg' },
  { name: 'Safesite', href: 'https://safesitestaff.com', image: '/screenshots/safesite-fresh.jpg' },
  { name: 'Titan Transfers', href: 'https://titantransfers.com', image: '/screenshots/titantransfers-home-fresh.jpg' },
  { name: 'LPS Pilates', href: 'https://lpspilates.nl', image: '/screenshots/lps-pilates-fresh.jpg' },
];

const TOOLS: { name: string; logo: string }[] = [
  { name: 'Google Workspace', logo: '/logos/google.svg' },
  { name: 'Notion', logo: '/logos/notion.svg' },
  { name: 'Telegram', logo: '/logos/telegram.svg' },
  { name: 'WhatsApp', logo: '/logos/whatsapp.svg' },
  { name: 'Stripe', logo: '/logos/stripe.svg' },
  { name: 'n8n', logo: '/logos/n8n.svg' },
  { name: 'Slack', logo: '/logos/slack.svg' },
  { name: 'HubSpot', logo: '/logos/hubspot.svg' },
  { name: 'Airtable', logo: '/logos/airtable.svg' },
  { name: 'Webflow', logo: '/logos/webflow.svg' },
];

const FAQS = [
  {
    q: 'Wat als ik een mens in de keten wil?',
    a: 'Altijd jij. Een Techwiz pakt het volume aan; jij neemt de besluiten. Ik handel nooit zelf een betaling, contract of nieuwe hire af zonder jou. Alles wat risicovol is laat ik eerst in Telegram zien. Je kunt elk onderwerp markeren als "eerst vragen", dan beslis ik daar nooit zelfstandig over.',
  },
  {
    q: 'Hoe is dit anders dan ChatGPT?',
    a: 'ChatGPT vergeet alles na elk gesprek. Een Techwiz heeft persistent geheugen, connect met jouw tools en acteert namens jou 24/7 — zonder dat je hem hoeft te prompten. Hij start de dag met een briefing en sluit af met een wrap-up.',
  },
  {
    q: 'Hoe lang duurt setup?',
    a: 'Instant Appie: 24 uur, wij doen het. Bouw zelf je Techwiz (€65 PDF gids): paar uur eigen werk.',
  },
  {
    q: 'Hoe veilig is mijn data?',
    a: 'Volledig. Je Techwiz draait op een dedicated private server. Je gesprekken en data trainen nooit een publiek model. Enterprise-grade security, persoonlijke aandacht.',
  },
  {
    q: 'Wat als Appie iets verkeerd doet?',
    a: 'Dan zegt-ie het. Eerlijk, kort, met wat-ik-nu-doe. Reversibele dingen lost ik zelf op; bij iets onomkeerbaars vraag ik vooraf. En ik leer ervan: dezelfde fout een tweede keer is een bug, niet een mens.',
  },
  {
    q: 'Kan ik na maand 1 stoppen?',
    a: 'Ja. Geen lock-in. Ik draai op jouw private server, jouw data blijft van jou. Tevreden of geld terug — als ik je niet meer tijd bespaar dan ik kost, betaal je niets.',
  },
];

export default function TIPSLanding() {
  return (
    <div className="min-h-screen bg-[#031D16] text-[#F6FEFC]">

      {/* ── SECTION ZERO: THE BRIDGE ── */}
      {/* Acknowledge the OLD way — the problem before the transformation */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div animate={{ opacity: [0.12, 0.25, 0.12] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#247459] blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-6">De week die je opvreet</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F6FEFC] leading-tight mb-8">
            Het is half zes.
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-4 max-w-2xl mx-auto mb-10">
            {[
              'Je hebt nog 47 ongelezen mails.',
              'Drie WhatsApp intakes wachten op een reactie.',
              'De agenda heeft een conflict, niemand zegt het.',
              'Het kantoor sluit, de week niet.',
            ].map(line => (
              <p key={line} className="text-[#F6FEFC]/50 text-lg md:text-xl leading-relaxed">{line}</p>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton href="#t" className="flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-8 py-4 rounded-xl transition-colors will-change-transform">
              Maak kennis met je Techwiz <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href={PDF_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/40 text-[#F6FEFC] font-semibold px-8 py-4 rounded-xl transition-colors will-change-transform">
              Bouw zelf je Techwiz · €65
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── HERO: APPIE PROTAGONIST ── */}
      <section id="t" className="relative py-24 bg-[#0E3D31] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.div animate={{ opacity: [0.10, 0.22, 0.10] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#DFB771]/30 blur-[120px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Maak kennis met Appie</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Pixar Appie hero render */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="order-2 lg:order-1 flex justify-center lg:justify-end">
              <AppieTilt className="relative" max={5}>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#DFB771]/20 to-[#247459]/30 blur-3xl rounded-full" />
                <Image
                  src="/agents/appie-iconic.png"
                  alt="Appie — jouw persoonlijke Techwiz"
                  width={704}
                  height={384}
                  priority
                  className="relative rounded-3xl shadow-2xl shadow-[#031D16]/60 ring-2 ring-[#DFB771]/30"
                />
              </AppieTilt>
            </motion.div>
            {/* Copy block */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="order-1 lg:order-2 text-center lg:text-left">
              <p className="text-[#F6FEFC] text-3xl md:text-5xl font-bold leading-[1.1] mb-3">
                <HeroReveal text={TRANSFORMATION.title} delay={0.05} />
              </p>
              <p className="text-[#DFB771] text-3xl md:text-5xl font-bold leading-[1.1] mb-8">
                <HeroReveal text={TRANSFORMATION.titleAccent} delay={0.5} />
              </p>
              <p className="text-[#F6FEFC]/70 text-lg md:text-xl leading-relaxed mb-8">
                {TRANSFORMATION.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <MagneticButton href="/openclaw#waitlist" className="flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-8 py-4 rounded-xl transition-colors will-change-transform">
                  Begin met je Techwiz <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton href={PDF_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-[#247459]/40 hover:border-[#247459] text-[#F6FEFC]/70 hover:text-[#F6FEFC] px-8 py-4 rounded-xl transition-colors text-sm will-change-transform">
                  Bouw zelf · €65 PDF
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT APPIE IS ── (was: "I = INGREDIENTS") */}
      <section className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#247459] text-sm font-semibold uppercase tracking-widest mb-3">Drie principes</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">Wat een Techwiz onderscheidt</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INGREDIENTS.map((ing, i) => (
              <motion.div key={ing.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 hover:border-[#247459]/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#247459]/15 flex items-center justify-center mb-6">
                  <ing.icon className="w-6 h-6 text-[#247459]" />
                </div>
                <h3 className="text-[#F6FEFC] font-bold text-xl mb-3">{ing.name}</h3>
                <p className="text-[#F6FEFC]/50 text-sm leading-relaxed">{ing.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOE HET WERKT ── (was: "P = PROCESS") */}
      <section className="py-24 bg-[#0E3D31]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Drie stappen</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">Van eerste handshake naar 24 uur draaien</h2>
          </motion.div>
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex gap-8 py-10 border-b border-[#247459]/20 last:border-0">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#DFB771]/10 border border-[#DFB771]/20 flex items-center justify-center">
                  <span className="text-[#DFB771] font-bold text-xl">{step.n}</span>
                </div>
                <div>
                  <h3 className="text-[#F6FEFC] font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-[#F6FEFC]/50 text-base leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECHTE KLANTEN ── (was: "S = SOCIAL PROOF") */}
      <section id="case-studies" className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#247459] text-sm font-semibold uppercase tracking-widest mb-3">Echt aan het werk</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">Wat klanten zien — en wat we zelf doen</h2>
          </motion.div>
          <CaseStudySlider studies={SOCIAL_PROOFS} />

          {/* Recent shipped — live websites from the same Techwiz fleet */}
          <div className="mt-20 pt-12 border-t border-[#247459]/15">
            <div className="text-center mb-10">
              <p className="text-[#247459] text-xs font-semibold uppercase tracking-widest mb-2">Recent gelanceerd</p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#F6FEFC]">Sites die live staan, met een Techwiz erachter</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {RECENT_BUILDS.map((build, i) => (
                <motion.a
                  key={build.name}
                  href={build.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#247459]/25 hover:border-[#DFB771]/50 bg-[#1a2e27]/40 transition-colors"
                >
                  <Image
                    src={build.image}
                    alt={`${build.name} screenshot`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-[#031D16]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-[#F6FEFC] font-semibold text-sm">{build.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#DFB771] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PDF GUIDE PROMO ── */}
      <section className="py-20 bg-[#0E3D31] border-y border-[#247459]/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
              <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-wider mb-3">PDF Gids · v4.4 · €65</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC] mb-4">Bouw zelf je 24/7 Techwiz</h2>
              <p className="text-[#F6FEFC]/50 text-base mb-6 leading-relaxed">
                10 hoofdstukken, 56 pagina&apos;s, echte code. Het complete blueprint van nul tot je eigen Techwiz. Lifetime updates. Eenmalig €65.
              </p>
              <a href={PDF_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-6 py-3.5 rounded-xl transition-colors">
                Koop de gids · €65 <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-shrink-0">
              <div className="bg-[#F6FEFC] rounded-2xl p-5 w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-12 bg-[#247459] rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#031D16] font-bold text-xs">Bouw zelf je Techwiz</p>
                    <p className="text-[#031D16]/60 text-xs">Build Your Own Appie v4.4</p>
                    <p className="text-[#031D16]/40 text-xs mt-1">56 pagina&apos;s · €65 · April 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DRIE MANIEREN ── */}
      <section id="tiers" className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">Drie manieren om je Techwiz te krijgen</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Bouw Zelf — €65 PDF */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 p-8">
              <p className="text-[#247459] text-xs font-bold uppercase tracking-wide mb-4">Bouw zelf</p>
              <h3 className="text-[#F6FEFC] font-bold text-xl mb-1">Bouw je eigen Techwiz</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-6">Voor builders en no-coders</p>
              <div className="mb-4"><span className="text-[#F6FEFC] font-bold text-3xl"><CountUp to={65} prefix="€" /></span><span className="text-[#F6FEFC]/40 text-sm ml-1">eenmalig</span></div>
              <ul className="space-y-2 mb-8">
                {['56-pagina PDF gids', 'Copy/paste templates', 'Eigen private server', '55+ skills library', 'Lifetime updates'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-sm"><Check className="w-4 h-4 text-[#247459] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <a href={PDF_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="block text-center w-full py-3 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/30 text-[#F6FEFC] font-semibold text-sm rounded-xl transition-colors">Koop de gids · €65</a>
            </motion.div>

            {/* Instant Appie — €250/mo */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative bg-gradient-to-b from-[#247459]/20 to-[#1a2e27]/50 rounded-2xl border-2 border-[#DFB771]/50 p-8 shadow-lg shadow-[#DFB771]/5">
              <div className="absolute -top-3 left-6 bg-[#DFB771] text-[#031D16] text-xs font-bold uppercase px-3 py-1 rounded-full">Meest populair</div>
              <p className="text-[#DFB771] text-xs font-bold uppercase tracking-wide mb-4">Managed</p>
              <h3 className="text-[#F6FEFC] font-bold text-xl mb-1">Instant Appie</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-6">Wij bouwen, wij draaien</p>
              <div className="mb-4"><span className="text-[#F6FEFC] font-bold text-3xl"><CountUp to={250} prefix="€" /></span><span className="text-[#F6FEFC]/40 text-sm ml-1">/maand</span></div>
              <ul className="space-y-2 mb-8">
                {['Alles uit de Bouw-zelf gids', 'Dedicated private server', 'Telegram + WhatsApp aangesloten', 'Persistent geheugen', '55+ skills library', '14 dagen tevreden of geld terug'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-sm"><Check className="w-4 h-4 text-[#DFB771] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/openclaw#waitlist" className="block text-center w-full py-3 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold text-sm rounded-xl transition-colors">Begin met je Techwiz →</Link>
            </motion.div>

            {/* Custom — €2,000+ */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 p-8">
              <p className="text-[#F6FEFC]/40 text-xs font-bold uppercase tracking-wide mb-4">Custom</p>
              <h3 className="text-[#F6FEFC] font-bold text-xl mb-1">Custom Appie</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-6">Bespoke voor jouw bedrijf</p>
              <div className="mb-4"><span className="text-[#F6FEFC] font-bold text-3xl">vanaf <CountUp to={2000} prefix="€" /></span><span className="text-[#F6FEFC]/40 text-sm ml-1">/maand</span></div>
              <ul className="space-y-2 mb-8">
                {['Alles uit Instant Appie', 'Multi-agent architectuur', 'Custom automations & workflows', 'CRM integraties (Brevo, Moneybird, Monday)', 'Doorlopende optimalisatie', 'Zoals Eva, Sjaak, Ben'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-sm"><Check className="w-4 h-4 text-[#247459] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/openclaw#waitlist" className="block text-center w-full py-3 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/30 text-[#F6FEFC] font-semibold text-sm rounded-xl transition-colors">Plan een gesprek</Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── TOOLS STRIP ── */}
      <section className="py-14 bg-[#0E3D31] border-y border-[#247459]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #DFB771 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <p className="text-[#DFB771]/70 text-xs uppercase tracking-widest mb-8 font-semibold">Werkt met je stack</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="group flex items-center gap-2.5"
                title={tool.name}
              >
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={26}
                  height={26}
                  className="h-6 w-6 opacity-50 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-[#F6FEFC]/50 group-hover:text-[#F6FEFC]/80 text-sm font-medium transition-colors">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG STRIP — Vanuit het brein van Appie ── */}
      <section id="blog" className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#247459] text-sm font-semibold uppercase tracking-widest mb-3">Vanuit het brein van Appie</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC]">Korte stukken, eerlijk geschreven</h2>
          </motion.div>
          <BlogStrip posts={getLatestPosts(3)} />
          <div className="text-center mt-12">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[#DFB771] hover:text-[#DFB771]/80 text-sm font-semibold transition-colors">
              Alle posts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 mt-20">
          <HairlineDivider />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-[#031D16]">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#F6FEFC]">Vragen die je nu hebt</h2>
          </motion.div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-6 bg-[#1a2e27]/50 rounded-xl border border-[#247459]/20">
                <h3 className="text-[#F6FEFC] font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-[#F6FEFC]/50 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-16 bg-[#0E3D31] border-t border-[#247459]/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F6FEFC] mb-4">Klaar om je Techwiz te ontmoeten?</h2>
          <p className="text-[#F6FEFC]/50 text-sm mb-8">Tevreden of geld terug — als ik je niet meer tijd bespaar dan ik kost, betaal je niets.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href="/openclaw#waitlist" className="bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-6 py-3 rounded-xl transition-colors will-change-transform">
              Begin met je Techwiz →
            </MagneticButton>
            <MagneticButton href={PDF_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="border border-[#247459]/40 hover:border-[#247459] text-[#F6FEFC]/70 hover:text-[#F6FEFC] px-6 py-3 rounded-xl transition-colors text-sm font-semibold will-change-transform">
              Bouw zelf je Techwiz · €65 PDF
            </MagneticButton>
          </div>
        </div>
      </section>

    </div>
  );
}
