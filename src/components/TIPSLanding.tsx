'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Zap, Bot, Shield, Brain, Calendar, Mail, Users, Clock, Wrench, Code2, Palette, Clapperboard, Send, Network } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CaseStudySlider, { type CaseStudy } from './CaseStudySlider';
import ProjectsSlider, { type Project } from './ProjectsSlider';
import BlogStrip from './BlogStrip';
import FaqAccordion from './FaqAccordion';
import MagneticButton from './anim/MagneticButton';
import HeroReveal from './anim/HeroReveal';
import CountUp from './anim/CountUp';
import AppieTilt from './anim/AppieTilt';
import HairlineDivider from './anim/HairlineDivider';
import LottieIcon from './anim/LottieIcon';
import { getLatestPosts } from '@/content/blog/posts';
import { FAQS_BY_LOCALE } from '@/content/faqs';
import { useI18n } from '@/i18n/I18nProvider';

// IMU TIPS framework structures the page (Tempt → Influence → Persuade → Sell);
// labels never render. Per PRD-WEBLYFE-AI v1.3 §7.2 hard rule: visitor sees content,
// not framework jargon. Voice locked in APPIE-PERSONA v1.2.

const PDF_CHECKOUT_URL = 'https://buy.stripe.com/7sYaEYfAn30C8BncwJ3Je2I';

type Ingredient = {
  lottie: string;
  fallbackIcon: typeof Bot;
  nameKey: 'ing.1.name' | 'ing.2.name' | 'ing.3.name';
  detailKey: 'ing.1.detail' | 'ing.2.detail' | 'ing.3.detail';
};

const INGREDIENTS: Ingredient[] = [
  { lottie: '/lottie/techwiz-bot.json', fallbackIcon: Bot, nameKey: 'ing.1.name', detailKey: 'ing.1.detail' },
  { lottie: '/lottie/techwiz-pulse.json', fallbackIcon: Brain, nameKey: 'ing.2.name', detailKey: 'ing.2.detail' },
  { lottie: '/lottie/techwiz-shield.json', fallbackIcon: Shield, nameKey: 'ing.3.name', detailKey: 'ing.3.detail' },
];

type ProcessStep = {
  n: string;
  titleKey: 'process.1.title' | 'process.2.title' | 'process.3.title';
  descKey: 'process.1.desc' | 'process.2.desc' | 'process.3.desc';
};

const PROCESS_STEPS: ProcessStep[] = [
  { n: '01', titleKey: 'process.1.title', descKey: 'process.1.desc' },
  { n: '02', titleKey: 'process.2.title', descKey: 'process.2.desc' },
  { n: '03', titleKey: 'process.3.title', descKey: 'process.3.desc' },
];

// Real client cases per PRD-WEBLYFE-AI v1.3 §8.5 - only audit-able metrics ship.
// Older claims (BeyondSchool 200/dag, Stasher 3u→20min, Lost LeBlanc 14u→2u) are
// retired pending verification per PRD §2 risk register.
// Portraits = canonical /agents/*.jpg files already used by /openclaw (Seyed lock 2026-05-02).
const SOCIAL_PROOFS: CaseStudy[] = [
  {
    name: 'CZA Bouwbedrijf',
    role: 'WhatsApp intake · Ben de Voorman',
    quote:
      'Ben scoort leads 0-100 op WhatsApp en reageert binnen 2 minuten. Vroeger duurde een eerste reactie 4-6 uur, nu onder de 30 seconden. 40% van de leads komt buiten kantooruren binnen. Die haakten voorheen af.',
    portrait: '/agents/ben.jpg',
    metric: { value: '<30s', label: 'eerste reactie' },
    audioSrc: '/audio/ben-intro.mp3',
  },
  {
    name: 'Dubai-Property.nl',
    role: 'Lead qualification · Eva',
    quote:
      'Eva kwalificeert property inquiries, plant viewings, en kwalificeert kopers. 24/7 op een eigen Mac Mini, Telegram en CRM aangesloten. Niemand meer wakker bellen voor een terugbelnotitie.',
    portrait: '/agents/eva.jpg',
    metric: { value: '24/7', label: 'altijd aan' },
    audioSrc: '/audio/eva-intro.mp3',
  },
  {
    name: 'Weblyfe zelf',
    role: 'Eigen fleet · Appie 1/2/3',
    quote:
      'Drie AI agents runnen Weblyfe over tijdzones. Ze handelen mails, deploys, client projects, CRM en content creation af. 50+ tasks per dag, 99,9% uptime. We schrijven over wat al maanden bij ons werkt, niet over wat we hopen te bouwen.',
    portrait: '/agents/appie.jpg',
    metric: { value: '99,9%', label: 'uptime' },
    audioSrc: '/audio/appie-intro.mp3',
  },
];

const PROJECTS: Project[] = [
  {
    name: 'CZA Bouwbedrijf',
    url: 'https://czabouwbedrijf.nl/',
    image: '/screenshots/cza-fresh.jpg',
    industry: 'Bouw',
    scope: 'Volledige website-bouw + WhatsApp lead intake door Ben de Voorman. Eerste reactie binnen 30 seconden, 24/7.',
    highlight: 'Reactietijd: 4-6 uur → onder 30 seconden',
  },
  {
    name: 'Dubai-Property.nl',
    url: 'https://dubai-property.nl',
    image: '/screenshots/dubai-property.jpg',
    industry: 'Real Estate',
    scope: 'Lead-qualification site + Eva: 24/7 multilingual property inquiries, viewing scheduling, buyer kwalificatie.',
    highlight: '550+ woningen verkocht via het team',
  },
  {
    name: 'StickX Arcade · Investeren',
    url: 'https://investeren.stickxarcade.com',
    image: '/screenshots/stickxarcade-investeren.jpg',
    industry: 'Investing',
    scope: 'Investor-site met pitchdeck integration en lead capture. Volledige funnel inclusief KYC-flow.',
  },
  {
    name: 'Boooth',
    url: 'https://boooth.nl',
    image: '/screenshots/boooth-configurator.jpg',
    industry: 'Events',
    scope: 'Photobooth verhuurplatform met booking-engine + automatische factuurflow via n8n.',
  },
  {
    name: 'Privanotify',
    url: 'https://privanotify.com',
    image: '/screenshots/privanotify-fresh.jpg',
    industry: 'Privacy SaaS',
    scope: 'GDPR-monitoring app met dashboard, alerts en compliance-audit voor MKB.',
  },
  {
    name: 'Safesite',
    url: 'https://safesite-security.vercel.app/',
    image: '/screenshots/safesite-fresh.jpg',
    industry: 'Construction Safety',
    scope: 'Site-management platform voor bouwprojecten: incident reporting, staff scheduling, compliance docs.',
  },
  {
    name: 'Titan Transfers',
    url: 'https://titantransfers.com',
    image: '/screenshots/titantransfers-home-fresh.jpg',
    industry: 'Transport',
    scope: 'Premium transfer-service site met booking-flow, fleet showcase en chauffeur portal.',
  },
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

export default function TIPSLanding() {
  const { t, locale } = useI18n();
  const faqs = FAQS_BY_LOCALE[locale];
  return (
    <div className="min-h-screen bg-[#031D16] text-[#F6FEFC]">

      {/* ── MAIN HERO ── (TIPS T = Tempt; visitor-egocentric outcome + 3-stat proof + price-free CTA) */}
      <section id="t" className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.10, 0.22, 0.10] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full bg-[#DFB771]/25 blur-[140px] pointer-events-none"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Stat strip - TIPS authority block, lifted above headline per Dropship-Academy / Lost-LeBlanc pattern */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-xs md:text-sm text-[#F6FEFC]/60 mb-8 uppercase tracking-widest font-semibold"
          >
            <span className="inline-flex items-center gap-2"><span className="text-[#DFB771]">●</span> {t('hero.stat1')}</span>
            <span className="hidden md:inline text-[#247459]">/</span>
            <span className="inline-flex items-center gap-2"><span className="text-[#DFB771]">●</span> {t('hero.stat2')}</span>
            <span className="hidden md:inline text-[#247459]">/</span>
            <span className="inline-flex items-center gap-2"><span className="text-[#DFB771]">●</span> {t('hero.stat3')}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Copy block - left 7 cols on desktop, full on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <h1 key={`hero-h1-${locale}`} className="text-[#F6FEFC] text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.02] mb-6 tracking-tight">
                <HeroReveal text={t('hero.h1.line1')} delay={0.1} />
                <span className="block">
                  <HeroReveal text={t('hero.h1.line2')} delay={0.4} />
                </span>
                <span className="block text-[#DFB771] mt-2">
                  <HeroReveal text={t('hero.h1.line3')} delay={0.85} />
                </span>
              </h1>
              <p className="text-[#F6FEFC]/75 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
                {t('hero.sub')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center lg:justify-start mb-6">
                <MagneticButton href="#tiers" className="inline-flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-8 py-4 rounded-xl transition-colors will-change-transform shadow-lg shadow-[#DFB771]/20">
                  {t('hero.cta.primary')} <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <a
                  href="#t-meet"
                  className="text-[#F6FEFC]/70 hover:text-[#DFB771] text-sm font-semibold underline-offset-4 hover:underline transition-colors"
                >
                  {t('hero.cta.secondary')}
                </a>
              </div>
              <p className="text-[#F6FEFC]/40 text-xs md:text-sm">
                {t('hero.trust')}
              </p>
            </motion.div>

            {/* Pixar Appie hero render - right 5 cols on desktop, above on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center lg:justify-end order-first lg:order-last"
            >
              <AppieTilt className="relative" max={5}>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#DFB771]/30 to-[#247459]/40 blur-3xl rounded-full" />
                <Image
                  src="/agents/appie-iconic.png"
                  alt={t('hero.imgAlt')}
                  width={704}
                  height={384}
                  priority
                  className="relative rounded-3xl shadow-2xl shadow-[#031D16]/60 ring-2 ring-[#DFB771]/30"
                />
              </AppieTilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SEYED ── (founder section, track record + named collaborators) */}
      <section id="about" className="relative py-20 md:py-24 bg-[#0E3D31]/60 border-y border-[#247459]/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left mb-12 md:mb-14"
          >
            <p className="text-[#DFB771] text-xs font-semibold uppercase tracking-widest mb-3">{t('about.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC] max-w-3xl">
              {t('about.h2')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:col-span-5"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src="/screenshots/seyed-founder.png"
                  alt="Seyed Hosseini aan het werk: presenteren, content maken, op podcast en gastdocent"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="md:col-span-7"
            >
              <div className="space-y-5 text-[#F6FEFC]/80 text-base md:text-lg leading-relaxed">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
              </div>
            </motion.div>
          </div>

          {/* Track record stat row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px mt-14 md:mt-16 bg-[#247459]/20 rounded-2xl overflow-hidden border border-[#247459]/25"
          >
            {[
              { value: <CountUp to={100} suffix="+" />, label: t('about.stat1.label') },
              { value: <CountUp to={7} suffix={t('about.stat2.suffix')} />, label: t('about.stat2.label') },
              { value: <span><CountUp to={20} prefix="€" suffix="M+" /></span>, label: t('about.stat3.label') },
              { value: <span className="text-2xl md:text-3xl">AUD</span>, label: t('about.stat4.label') },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0E3D31] py-7 px-5 text-center">
                <div className="text-[#DFB771] text-3xl md:text-4xl font-bold mb-2 leading-none">{stat.value}</div>
                <div className="text-[#F6FEFC]/55 text-xs md:text-sm leading-snug">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Named collaborators strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 md:mt-14 text-center"
          >
            <p className="text-[#247459] text-xs font-semibold uppercase tracking-widest mb-5">{t('about.collabs.eyebrow')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Roslan Bendenia', label: 'EKO Evolved' },
                { name: 'Lost LeBlanc', label: 'Travel creator' },
                { name: 'Salar Azimi', label: 'Ondernemer' },
                { name: 'Hesam Zahedi', label: 'CZA Bouwbedrijf' },
                { name: 'Rabi Adli', label: 'Geld Instituut' },
                { name: 'Vanessa Nantes', label: 'Creator' },
                { name: 'Joshua Kaats', label: 'Dropship Academy' },
                { name: 'Dounia', label: 'LPS Pilates' },
              ].map((collab, i) => (
                <motion.span
                  key={collab.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 220, damping: 18 }}
                  whileHover={{ y: -2, scale: 1.03 }}
                  className="px-4 py-2 rounded-full bg-[#031D16]/60 border border-[#247459]/30 hover:border-[#DFB771]/40 text-sm transition-colors"
                >
                  <span className="text-[#F6FEFC] font-semibold">{collab.name}</span>
                  <span className="text-[#F6FEFC]/40 ml-2 text-xs">{collab.label}</span>
                </motion.span>
              ))}
              <span className="px-4 py-2 rounded-full bg-[#031D16]/30 border border-[#247459]/20 text-sm text-[#F6FEFC]/40 italic">
                {t('about.collabs.more')}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ECHTE KLANTEN ── (case study slider with Eva/Ben/Appie + Projects, moved here right after About Seyed per Seyed's narrative ordering) */}
      <section id="case-studies" className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#247459] text-sm font-semibold uppercase tracking-widest mb-3">{t('cases.eyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">{t('cases.h2')}</h2>
          </motion.div>
          <CaseStudySlider studies={SOCIAL_PROOFS} />

          {/* Projects slider - live websites built by Weblyfe (separate from the case-study quote slider) */}
          <div id="projects" className="mt-20 pt-12 border-t border-[#247459]/15">
            <div className="text-center mb-10">
              <p className="text-[#247459] text-xs font-semibold uppercase tracking-widest mb-2">{t('cases.projects.eyebrow')}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#F6FEFC]">{t('cases.projects.h3')}</h3>
            </div>
            <ProjectsSlider projects={PROJECTS} />
          </div>
        </div>
      </section>

      {/* ── WHAT APPIE IS ── (was: "I = INGREDIENTS") */}
      <section id="t-meet" className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#247459] text-sm font-semibold uppercase tracking-widest mb-3">{t('ing.eyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">{t('ing.h2')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INGREDIENTS.map((ing, i) => (
              <motion.div key={ing.nameKey} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 hover:border-[#247459]/50 transition-all">
                <LottieIcon
                  src={ing.lottie}
                  className="w-20 h-20 -ml-2 -mt-2 mb-3"
                  fallback={<div className="w-12 h-12 rounded-2xl bg-[#247459]/15 flex items-center justify-center"><ing.fallbackIcon className="w-6 h-6 text-[#DFB771]" /></div>}
                />
                <h3 className="text-[#F6FEFC] font-bold text-xl mb-3">{t(ing.nameKey)}</h3>
                <p className="text-[#F6FEFC]/50 text-sm leading-relaxed">{t(ing.detailKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── (Phase 2: full-stack Appie, 5 lanes) */}
      <section id="capabilities" className="py-24 bg-[#0E3D31]/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">{t('caps.eyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC] mb-5">{t('caps.h2')}</h2>
            <p className="text-[#F6FEFC]/60 text-base md:text-lg leading-relaxed">{t('caps.sub')}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { Icon: Code2, titleKey: 'caps.develop.title' as const, detailKey: 'caps.develop.detail' as const },
              { Icon: Palette, titleKey: 'caps.design.title' as const, detailKey: 'caps.design.detail' as const },
              { Icon: Clapperboard, titleKey: 'caps.create.title' as const, detailKey: 'caps.create.detail' as const },
              { Icon: Send, titleKey: 'caps.distribute.title' as const, detailKey: 'caps.distribute.detail' as const },
              { Icon: Network, titleKey: 'caps.manage.title' as const, detailKey: 'caps.manage.detail' as const },
            ].map((cap, i) => (
              <motion.div
                key={cap.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 18 }}
                whileHover={{ y: -3 }}
                className="bg-[#1a2e27]/60 hover:bg-[#1a2e27] border border-[#247459]/25 hover:border-[#DFB771]/40 rounded-2xl p-5 md:p-6 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/20 flex items-center justify-center mb-4">
                  <cap.Icon className="w-5 h-5 text-[#DFB771]" />
                </div>
                <h3 className="text-[#F6FEFC] font-bold text-base mb-2">{t(cap.titleKey)}</h3>
                <p className="text-[#F6FEFC]/55 text-sm leading-relaxed">{t(cap.detailKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOE HET WERKT ── (was: "P = PROCESS") */}
      <section className="py-24 bg-[#0E3D31]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">{t('process.eyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">{t('process.h2')}</h2>
          </motion.div>
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex gap-8 py-10 border-b border-[#247459]/20 last:border-0">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.15 + 0.1, type: 'spring', stiffness: 180, damping: 14 }}
                  className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#DFB771]/10 border border-[#DFB771]/20 flex items-center justify-center"
                >
                  <CountUp to={parseInt(step.n)} padTo={2} duration={1.0} className="text-[#DFB771] font-bold text-xl" />
                </motion.div>
                <div>
                  <h3 className="text-[#F6FEFC] font-bold text-xl mb-2">{t(step.titleKey)}</h3>
                  <p className="text-[#F6FEFC]/50 text-base leading-relaxed">{t(step.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PDF GUIDE PROMO ── */}
      <section className="py-20 bg-[#0E3D31] border-y border-[#247459]/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
              <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-wider mb-3">{t('pdf.eyebrow')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC] mb-4">{t('pdf.h2')}</h2>
              <p className="text-[#F6FEFC]/50 text-base mb-6 leading-relaxed">
                {t('pdf.body')}
              </p>
              <a href={PDF_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-6 py-3.5 rounded-xl transition-colors">
                {t('pdf.cta')} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -6, rotate: 1 }}
              className="flex-shrink-0 relative"
            >
              <Image
                src="/screenshots/appie-pdf-book-mockup.png"
                alt={`${t('pdf.h2')} - ${t('pdf.card.subtitle')}`}
                width={360}
                height={480}
                sizes="(max-width: 768px) 60vw, 360px"
                className="rounded-2xl drop-shadow-[0_20px_60px_rgba(223,183,113,0.25)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DRIE MANIEREN ── */}
      <section id="tiers" className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">{t('tiers.h2')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

            {/* Bouw Zelf - €65 PDF */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col h-full bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 p-8">
              <p className="text-[#247459] text-xs font-bold uppercase tracking-wide mb-4">{t('tier.byo.eyebrow')}</p>
              <h3 className="text-[#F6FEFC] font-bold text-xl mb-1">{t('tier.byo.title')}</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-6">{t('tier.byo.subtitle')}</p>
              <div className="mb-4"><span className="text-[#F6FEFC] font-bold text-3xl"><CountUp to={65} prefix="€" /></span><span className="text-[#F6FEFC]/40 text-sm ml-1">{t('tier.byo.priceSuffix')}</span></div>
              <ul className="space-y-2 mb-8 flex-1">
                {t('tier.byo.features').split('|').map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-sm"><Check className="w-4 h-4 text-[#247459] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <a href={PDF_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="mt-auto block text-center w-full py-3 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/30 text-[#F6FEFC] font-semibold text-sm rounded-xl transition-colors">{t('tier.byo.cta')}</a>
            </motion.div>

            {/* Instant Appie - €250/mo - COMING SOON */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative flex flex-col h-full bg-gradient-to-b from-[#247459]/20 to-[#1a2e27]/50 rounded-2xl border-2 border-[#DFB771]/50 p-8 shadow-lg shadow-[#DFB771]/5">
              <div className="absolute -top-3 left-6 bg-[#DFB771] text-[#031D16] text-xs font-bold uppercase px-3 py-1 rounded-full">{t('tier.instant.badge')}</div>
              <p className="text-[#DFB771] text-xs font-bold uppercase tracking-wide mb-4">{t('tier.instant.eyebrow')}</p>
              <h3 className="text-[#F6FEFC] font-bold text-xl mb-1">{t('tier.instant.title')}</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-6">{t('tier.instant.subtitle')}</p>
              <div className="mb-4"><span className="text-[#F6FEFC] font-bold text-3xl"><CountUp to={250} prefix="€" /></span><span className="text-[#F6FEFC]/40 text-sm ml-1">{t('tier.instant.priceSuffix')}</span></div>
              <ul className="space-y-2 mb-8 flex-1">
                {t('tier.instant.features').split('|').map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-sm"><Check className="w-4 h-4 text-[#DFB771] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <button disabled className="mt-auto block text-center w-full py-3 bg-[#DFB771]/30 text-[#031D16]/60 font-bold text-sm rounded-xl cursor-not-allowed">{t('tier.instant.cta')}</button>
            </motion.div>

            {/* Custom - €2,000+ */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col h-full bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 p-8">
              <p className="text-[#F6FEFC]/40 text-xs font-bold uppercase tracking-wide mb-4">{t('tier.custom.eyebrow')}</p>
              <h3 className="text-[#F6FEFC] font-bold text-xl mb-1">{t('tier.custom.title')}</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-6">{t('tier.custom.subtitle')}</p>
              <div className="mb-4"><span className="text-[#F6FEFC] font-bold text-3xl">{t('tier.custom.pricePrefix')}<CountUp to={2000} prefix="€" /></span><span className="text-[#F6FEFC]/40 text-sm ml-1">{t('tier.custom.priceSuffix')}</span></div>
              <ul className="space-y-2 mb-8 flex-1">
                {t('tier.custom.features').split('|').map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-sm"><Check className="w-4 h-4 text-[#247459] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/discovery-call" className="mt-auto block text-center w-full py-3 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/30 text-[#F6FEFC] font-semibold text-sm rounded-xl transition-colors">{t('tier.custom.cta')}</Link>
            </motion.div>

          </div>

          {/* Post-checkout callout (Phase 2 Stap B) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 max-w-3xl mx-auto rounded-2xl border border-[#DFB771]/25 bg-gradient-to-r from-[#DFB771]/8 via-[#247459]/15 to-[#DFB771]/8 p-6 md:p-7 text-center"
          >
            <p className="text-[#DFB771] text-xs font-semibold uppercase tracking-widest mb-2">{t('checkout.callout.eyebrow')}</p>
            <h3 className="text-[#F6FEFC] font-bold text-lg md:text-xl mb-2">{t('checkout.callout.h3')}</h3>
            <p className="text-[#F6FEFC]/65 text-sm md:text-base leading-relaxed">{t('checkout.callout.body')}</p>
          </motion.div>
        </div>
      </section>

      {/* ── PDF PREVIEW (devices mockup, after pricing) ── */}
      <section className="py-20 bg-[#0E3D31]/40 border-y border-[#247459]/15 relative overflow-hidden">
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full bg-[#DFB771]/30 blur-[120px] pointer-events-none"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <p className="text-[#DFB771] text-xs font-semibold uppercase tracking-widest mb-3">{t('pdfPreview.eyebrow')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC] mb-5 leading-tight">{t('pdfPreview.h2')}</h2>
              <p className="text-[#F6FEFC]/65 text-base md:text-lg leading-relaxed mb-7">
                {t('pdfPreview.sub')}
              </p>
              <a href={PDF_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-6 py-3.5 rounded-xl transition-colors">
                {t('pdfPreview.cta')} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 90 }}
              className="lg:col-span-7 flex justify-center lg:justify-end"
            >
              <Image
                src="/screenshots/appie-pdf-devices.png"
                alt={t('pdfPreview.imgAlt')}
                width={780}
                height={520}
                sizes="(max-width: 1024px) 90vw, 700px"
                className="rounded-2xl drop-shadow-[0_30px_80px_rgba(223,183,113,0.18)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TOOLS STRIP ── */}
      <section className="py-14 bg-[#0E3D31] border-y border-[#247459]/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #DFB771 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <p className="text-[#DFB771]/70 text-xs uppercase tracking-widest mb-8 font-semibold">{t('tools.eyebrow')}</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 22, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 220, damping: 18, mass: 0.6 }}
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

      {/* ── BLOG STRIP - Vanuit het brein van Appie ── */}
      <section id="blog" className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#247459] text-sm font-semibold uppercase tracking-widest mb-3">{t('blog.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC]">{t('blog.h2')}</h2>
          </motion.div>
          <BlogStrip posts={getLatestPosts(3, locale)} />
          <div className="text-center mt-12">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[#DFB771] hover:text-[#DFB771]/80 text-sm font-semibold transition-colors">
              {t('blog.viewAll')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 mt-20">
          <HairlineDivider />
        </div>
      </section>

      {/* ── FAQ ── (collapsible accordion) */}
      <section id="faq" className="py-20 bg-[#031D16]">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#DFB771] text-xs font-semibold uppercase tracking-widest mb-3">{t('faq.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC]">{t('faq.h2')}</h2>
          </motion.div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-16 bg-[#0E3D31] border-t border-[#247459]/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F6FEFC] mb-4">{t('close.h2')}</h2>
          <p className="text-[#F6FEFC]/50 text-sm mb-8">{t('close.sub')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href="/discovery-call" className="bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-6 py-3 rounded-xl transition-colors will-change-transform">
              {t('close.cta.primary')}
            </MagneticButton>
            <MagneticButton href={PDF_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="border border-[#247459]/40 hover:border-[#247459] text-[#F6FEFC]/70 hover:text-[#F6FEFC] px-6 py-3 rounded-xl transition-colors text-sm font-semibold will-change-transform">
              {t('close.cta.secondary')}
            </MagneticButton>
          </div>
        </div>
      </section>

    </div>
  );
}
