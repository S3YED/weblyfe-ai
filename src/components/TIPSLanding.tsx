'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Inbox,
  Calendar,
  FileText,
  BrainCircuit,
  Phone,
  ChevronDown,
  Play,
  BadgeCheck,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect, useMemo, type MouseEvent as ReactMouseEvent } from 'react';
import { APPIE, PRICING, GUARANTEE, SOCIAL } from '@/lib/brand-constants';
import { Spotlight } from '@/components/ui/spotlight';
import { Particles } from '@/components/ui/particles';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { BorderBeam } from '@/components/ui/border-beam';
import { Marquee } from '@/components/ui/marquee';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { cn } from '@/lib/utils';

// Homepage structured by IMU TIPS funnel (T → I → P → S).
// Phase labels are NEVER rendered. Section names describe content.
// Polish: Awwwards-tier per 2026-04-29-design-polish-plan.md.

// Custom cubic-bezier , reads premium, not bouncy.
const SMOOTH = [0.16, 1, 0.3, 1] as const;

// ─── DATA ────────────────────────────────────────────────────────────────────

const APPIE_BUBBLES = [
  { when: '08:00', text: 'Goedemorgen. 23 mails afgehandeld vannacht (drafts in Verzonden). 4 hebben jou nodig: 2 prijsvragen, 1 partnership, 1 factuurgeschil.' },
  { when: '11:14', text: 'Sandra wil donderdag verzetten. Geen conflict , verschoven naar 14:00, om bevestiging gevraagd.' },
  { when: '14:30', text: 'WhatsApp van Mark over een keukenrenovatie in Rotterdam, budget 25k. Binnen service-radius. Lead in Brevo + Monday gezet, intake-vragen op afstand.' },
  { when: '16:48', text: '6 facturen in Moneybird verwerkt. Geen verschillen. Reageer met "laat zien" + onderwerp als je context wil.' },
];

const CUSTOMER_OUTCOMES = [
  { icon: Inbox, label: 'Inbox', desc: 'Triage, drafts, antwoorden op laag-risico mails. Risico\'s pingen jou eerst in Telegram.' },
  { icon: Phone, label: 'Intake', desc: 'WhatsApp / formulieren / mail leads kwalificeren en wegschrijven naar je CRM.' },
  { icon: Calendar, label: 'Agenda', desc: 'Slots vinden, uitnodigingen sturen, verplaatsen, beleefd afhouden.' },
  { icon: FileText, label: 'Admin', desc: 'Facturen reconciliëren in Moneybird, uitgaven loggen, dagelijkse samenvatting.' },
  { icon: BrainCircuit, label: 'Memory', desc: 'Onthoudt klant-voorkeuren, jouw toon, eerdere beslissingen , dwars door sessies heen.' },
];

const TOP_CASES = [
  {
    client: 'CZA Bouwbedrijf',
    sector: 'Bouw',
    appieName: 'Sjaak',
    headline: 'WhatsApp-intake die niet meer slaapt.',
    body: 'Aanvragen via WhatsApp werden vroeger pas na 4-6 uur beantwoord. Sjaak , een Custom Appie , pakt ze nu in seconden op, kwalificeert binnen ±50 km service-radius, en schrijft de lead direct weg naar Brevo, Monday en Moneybird tegelijk.',
    outcome: '+23% conversie',
    image: '/cases/cza-bouwbedrijf.png',
    large: true,
  },
  {
    client: 'Dubai-Property.nl',
    sector: 'Vastgoed',
    appieName: 'Eva',
    headline: 'Lead-kwalificatie voor 752 inkomende leads.',
    body: 'Eva is de Custom Appie voor Dubai-Property. Ze beoordeelt nieuwe inkomende leads, kwalificeert tegen de ICP en routeert hot leads naar het sales team , eerste reactie binnen minuten, dag en nacht.',
    outcome: '<2 min response',
    image: '/cases/dubai-property.avif',
  },
  {
    client: 'SafeSite Security',
    sector: 'Security · B2B',
    appieName: "Shay's Appie",
    headline: 'Hele site gebouwd in één dag, via voicenotes.',
    body: 'Shay vertelde Appie wat zijn business deed via Telegram-voicenotes. Een dag later stond er een complete bedrijfssite live. Geen designer-handoff, geen meetings , alleen brief, build, ship.',
    outcome: '1 dag → live',
    image: '/screenshots/safesite-fresh.jpg',
  },
];

const CUSTOM_APPIES = [
  { name: 'Sjaak', client: 'CZA Bouwbedrijf', role: 'WhatsApp-intake voor de bouw', avatar: '/agents/ben.jpg', hue: '#D97706' },
  { name: 'Eva', client: 'Dubai-Property.nl', role: 'Lead-kwalificatie vastgoed', avatar: '/agents/eva.jpg', hue: '#0EA5E9' },
  { name: "Shay's Appie", client: 'SafeSite Security', role: 'Voice-to-website builder', avatar: '/agents/appie.jpg', hue: '#DFB771' },
  { name: 'Appie-2', client: 'Weblyfe (intern)', role: 'Marketing & comms herald', avatar: '/agents/appie.jpg', hue: '#EC4899' },
  { name: 'Appie-3', client: 'Weblyfe (intern)', role: 'CTO / DevOps', avatar: '/agents/appie.jpg', hue: '#A78BFA' },
  { name: 'Wolfie', client: 'WolfieDiddy', role: 'Eerste externe OpenClaw deploy', avatar: '/agents/appie.jpg', hue: '#94A3B8' },
];

const PORTFOLIO = [
  { name: 'TitanTransfers', img: '/cases/titan-transfers.avif' },
  { name: 'Boooth', img: '/cases/boooth.avif' },
  { name: 'CZA Bouwbedrijf', img: '/cases/cza-bouwbedrijf.png' },
  { name: 'Dubai-Property', img: '/cases/dubai-property.avif' },
  { name: 'Beyondschool', img: '/cases/beyondschool.avif' },
  { name: 'Bali with Flow', img: '/cases/bali-with-flow.avif' },
  { name: 'Crypto Stasher', img: '/cases/crypto-stasher.avif' },
  { name: 'Datawinst', img: '/cases/datawinst.avif' },
  { name: 'Batia Mosa', img: '/cases/batia-mosa.avif' },
];

const FAQS = [
  { q: 'Hoe verschilt Appie van ChatGPT?', a: 'ChatGPT is een chatvenster zonder geheugen. Appie heeft persistent geheugen, draait op je eigen server, en doet werk uit zichzelf , zonder dat je elke keer een prompt hoeft in te tikken.' },
  { q: 'Hoe veilig is mijn data?', a: 'Appie draait op een dedicated private server. Je gesprekken en data trainen geen publieke modellen. Encrypted connecties, secure API handling, geen onnodige opslag.' },
  { q: 'Wat als ik een mens in de keten wil?', a: 'Altijd jij. Appie handelt nooit zelf een betaling, contract of nieuwe hire af zonder jou. Alles wat risicovol is laat ik eerst in Telegram zien. Je kunt elk onderwerp markeren als "eerst vragen".' },
  { q: 'Kan ik na maand 1 stoppen?', a: 'Ja. Maandelijks opzegbaar, geen contract. En als de tevreden-of-geld-terug garantie geldt, krijg je je €250 retour zonder gedoe.' },
  { q: 'Hoe lang duurt de setup?', a: 'Instant Appie staat binnen 24 uur live , wij regelen alles. Build Your Own Appie kost je een paar uur eigen tijd met de PDF.' },
  { q: 'Met welke tools werkt Appie samen?', a: 'Google Workspace, Notion, Telegram, WhatsApp, Stripe, Brevo, Moneybird, Monday, HubSpot, Airtable, n8n, Webflow. Heeft een tool een API? Dan praat Appie ermee.' },
  { q: 'Wat als Appie iets verkeerd doet?', a: 'Failsafes ingebouwd. Risico-acties pingen jou eerst, complexe edge cases routen naar mens, en je hebt altijd override controls. Plus 30 dagen support na launch.' },
  { q: 'Wat als ik al tools heb staan?', a: 'Appie wordt de laag die alles verbindt. Geen vervanging , een orchestrator die jouw bestaande stack opslokt en bedient.' },
];

// ─── HERO PORTRAIT (3D tilt + magic dust) ────────────────────────────────────

function MagicDustPortrait() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (reduced || !portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    mouseX.set(cx * 2 - 1);
    mouseY.set(cy * 2 - 1);
  }

  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // Magic dust particles , different damping per particle for comet-tail feel
  const dustConfig = useMemo(
    () => Array.from({ length: 8 }, (_, i) => ({
      damping: 20 + i * 5,
      offsetX: (i - 4) * 8,
      offsetY: ((i % 3) - 1) * 6,
      size: 4 + (i % 3) * 2,
    })),
    []
  );

  return (
    <motion.div
      ref={portraitRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="relative mx-auto lg:mx-0 w-[18rem] sm:w-[20rem] aspect-square"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: SMOOTH }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-[#DFB771]/40 shadow-[0_0_60px_-15px_rgba(223,183,113,0.5)]"
      >
        <Image
          src="/agents/appie-3d.jpg"
          alt={APPIE.name}
          fill
          sizes="(min-width: 1024px) 320px, 288px"
          className="object-cover"
          priority
        />
        <BorderBeam size={120} duration={10} colorFrom="#DFB771" colorTo="#247459" />
      </motion.div>

      {/* Magic dust particles , float around portrait following cursor */}
      {!reduced && dustConfig.map((cfg, i) => (
        <DustParticle key={i} mouseX={springX} mouseY={springY} {...cfg} />
      ))}
    </motion.div>
  );
}

function DustParticle({
  mouseX,
  mouseY,
  damping,
  offsetX,
  offsetY,
  size,
}: {
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
  damping: number;
  offsetX: number;
  offsetY: number;
  size: number;
}) {
  // Re-spring with looser damping for trailing effect
  const x = useSpring(mouseX, { stiffness: 60, damping });
  const y = useSpring(mouseY, { stiffness: 60, damping });
  const tx = useTransform(x, [-1, 1], [-30 + offsetX, 30 + offsetX]);
  const ty = useTransform(y, [-1, 1], [-30 + offsetY, 30 + offsetY]);

  return (
    <motion.div
      style={{
        x: tx,
        y: ty,
        width: size,
        height: size,
        backgroundColor: '#DFB771',
        mixBlendMode: 'screen',
      }}
      className="absolute top-1/2 left-1/2 rounded-full blur-[3px] pointer-events-none"
      animate={{ opacity: [0.3, 0.7, 0.4] }}
      transition={{ duration: 2 + (size % 3), repeat: Infinity, repeatType: 'reverse' }}
    />
  );
}

// ─── HEADLINE STAGGER ────────────────────────────────────────────────────────

function StaggerWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.04, delayChildren: delay }}
      className={cn('inline-block', className)}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: SMOOTH } },
          }}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── CASE CARD (3D tilt + image) ─────────────────────────────────────────────

function CaseCard({ c, index }: { c: typeof TOP_CASES[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });
  const rotateY = useTransform(springX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(springY, [-1, 1], [6, -6]);

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }
  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: SMOOTH, delay: index * 0.1 }}
      className={cn(
        'group relative bg-[#1a2e27]/50 rounded-3xl border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors overflow-hidden',
        c.large && 'md:col-span-2 md:row-span-2'
      )}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full flex flex-col"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={c.image}
            alt={c.client}
            fill
            sizes={c.large ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-[#031D16]/40 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#031D16]/70 text-[#DFB771] border border-[#DFB771]/30">
              {c.sector}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#DFB771] text-[#031D16]">
              {c.outcome}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl font-bold mb-1">{c.client}</h3>
          <p className="text-[#F6FEFC]/40 text-xs mb-3">Appie: {c.appieName}</p>
          <p className="text-[#F6FEFC]/85 text-base font-semibold mb-3">{c.headline}</p>
          <p className="text-[#F6FEFC]/55 text-sm leading-relaxed flex-1">{c.body}</p>
          <p className="text-[#F6FEFC]/30 text-xs mt-4 font-mono">Volledige cijfers op de case page →</p>
        </div>
      </motion.div>
    </motion.article>
  );
}

// ─── CUSTOM APPIE TILE ───────────────────────────────────────────────────────

function CustomAppieTile({ a }: { a: typeof CUSTOM_APPIES[number] }) {
  return (
    <div
      className="group relative shrink-0 w-[260px] mx-3 p-5 bg-[#031D16]/60 rounded-2xl border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors"
      style={{ background: `linear-gradient(135deg, ${a.hue}10, transparent 60%), #031D1690` }}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: `${a.hue}80` }}>
          <Image src={a.avatar} alt={a.name} fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm truncate">{a.name}</p>
          <p className="text-[10px] uppercase tracking-wider truncate" style={{ color: a.hue }}>
            {a.client}
          </p>
        </div>
        {/* status pulse */}
        <motion.div
          className="ml-auto w-2 h-2 rounded-full bg-[#DFB771] flex-shrink-0"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      </div>
      <p className="text-[#F6FEFC]/55 text-xs mt-3">{a.role}</p>
    </div>
  );
}

// ─── BUBBLE WITH TYPING INDICATOR ────────────────────────────────────────────

function ChatBubble({ when, text, isLast }: { when: string; text: string; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="flex gap-3 max-w-xl"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#247459]/30 flex items-center justify-center text-lg">
        🧙🏽‍♂️
      </div>
      <div className="relative bg-[#1a2e27] rounded-2xl rounded-tl-sm px-5 py-3 flex-1">
        <p className="text-[#DFB771]/70 text-xs mb-1 font-mono">{when}</p>
        <p className="text-[#F6FEFC]/85 text-sm leading-relaxed">{text}</p>
        {isLast && (
          <BorderBeam size={80} duration={6} colorFrom="#DFB771" colorTo="#247459" delay={2} />
        )}
      </div>
    </motion.div>
  );
}

// ─── FAQ ACCORDION ───────────────────────────────────────────────────────────

function AccordionItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: 2 }}
      className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold text-base pr-4">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: SMOOTH }}>
          <ChevronDown className="w-5 h-5 text-[#DFB771] flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: SMOOTH }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[#F6FEFC]/65 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function TIPSLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const [openFaq, setOpenFaq] = useState(0);

  // Make sure hydration warning doesn't trip on client-only motion
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
      {/* ── HERO (T) ─────────────────────────────────────────────────── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative overflow-hidden pt-28 pb-24"
      >
        {/* Background grid + spotlight */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#DFB771" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-center">
          <MagicDustPortrait />

          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-5 tracking-tight">
              <StaggerWords text="Hoi, ik ben Appie." />
              <span className="block mt-3">
                <StaggerWords text="Jouw persoonlijke" delay={0.4} />{' '}
                <AnimatedGradientText className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  Techwiz.
                </AnimatedGradientText>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: SMOOTH }}
              className="text-[#F6FEFC]/75 text-lg md:text-xl mb-3 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Een geniale werknemer met de laagste kosten. Ik doe het werk dat je week opvreet.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8"
            >
              {['Inbox', 'Intake', 'Agenda', 'Admin'].map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.08, ease: SMOOTH }}
                  className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#DFB771]/10 border border-[#DFB771]/30 text-[#DFB771]"
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4, ease: SMOOTH }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <Link
                  href="#aanbod"
                  className="flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/95 text-[#031D16] font-bold px-7 py-4 rounded-xl transition-colors"
                >
                  {PRICING.instantAppie.cta.nl} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#aanbod"
                  className="flex items-center justify-center gap-2 bg-[#247459]/15 hover:bg-[#247459]/25 border border-[#247459]/40 hover:border-[#DFB771]/50 text-[#F6FEFC] font-semibold px-7 py-4 rounded-xl transition-colors"
                >
                  Bouw zelf , €65
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="text-[#F6FEFC]/40 text-xs mt-5 text-center lg:text-left max-w-md mx-auto lg:mx-0"
            >
              {GUARANTEE.headline.nl}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* ── BRIDGE (T → I) ───────────────────────────────────────────── */}
      <section className="py-20 bg-[#0E3D31]/40 border-y border-[#247459]/20">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: SMOOTH }}
            className="text-[#F6FEFC]/70 text-xl md:text-2xl leading-relaxed font-mono"
          >
            17:30.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: SMOOTH, delay: 0.15 }}
            className="text-[#F6FEFC]/70 text-xl md:text-2xl leading-relaxed"
          >
            Je hebt nog 47 ongelezen mails.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: SMOOTH, delay: 0.3 }}
            className="text-[#F6FEFC]/50 text-lg md:text-xl"
          >
            Het kantoor sluit. De week niet.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: SMOOTH, delay: 0.5 }}
            className="text-[#DFB771] text-xl md:text-2xl pt-3 font-semibold"
          >
            Daar kwam Appie voor.
          </motion.p>
        </div>
      </section>

      {/* ── MEET APPIE , Telegram bubbles (I) ─────────────────────────── */}
      <section className="py-24 bg-[#031D16]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: SMOOTH }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[#247459]/20 border border-[#247459]/40">
              <motion.span
                className="w-2 h-2 rounded-full bg-[#DFB771]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DFB771]">Live · vandaag</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Zo klinkt een dag met Appie</h2>
            <p className="text-[#F6FEFC]/50 mt-3 text-base">Vier echte berichten uit een klant-Telegram. Niets gescript.</p>
          </motion.div>

          <div className="space-y-4">
            {APPIE_BUBBLES.map((b, i) => (
              <ChatBubble key={i} when={b.when} text={b.text} isLast={i === APPIE_BUBBLES.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ORIGIN (I) ───────────────────────────────────────── */}
      <section className="py-20 bg-[#0E3D31]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: SMOOTH }}
            className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center"
          >
            <motion.div whileHover={{ rotate: [0, -3, 3, 0] }} transition={{ duration: 0.6 }} className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-[#DFB771]/40">
                <Image src="/founder/seyed-techwiz.avif" alt="Seyed Hosseini" fill sizes="160px" className="object-cover" />
              </div>
            </motion.div>
            <div>
              <p className="text-[#DFB771]/70 text-xs font-mono uppercase tracking-widest mb-2">
                Founder · Ex-zorg · Bangkok ↔ Rijswijk
              </p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Seyed Hosseini</h3>
              <TextGenerateEffect
                words="Ik begon in de medische wereld. Daarna een bureau gestart , Weblyfe , om de juiste verhalen te bouwen voor groeiende merken. Drie jaar later draait ons hele bureau op een eigen vloot Techwizes. Appie is wat overblijft als je dat aan klanten verkoopt , dezelfde flow die onze eigen inbox, intake en admin draait."
                className="text-[#F6FEFC]/75 text-base md:text-lg leading-relaxed mb-5"
              />
              <div className="flex flex-wrap gap-3 text-sm">
                {[
                  ['LinkedIn', SOCIAL.founder.linkedin],
                  ['Instagram', SOCIAL.founder.instagram],
                  ['YouTube', SOCIAL.founder.youtube],
                  ['X', SOCIAL.founder.twitter],
                ].map(([label, href]) => (
                  <motion.a
                    key={label as string}
                    href={href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="text-[#DFB771] hover:text-[#FFD99A] underline-offset-4 hover:underline transition-colors"
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CUSTOMER CASES , Bento (I → P) ────────────────────────────── */}
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

          <div className="grid md:grid-cols-3 md:grid-rows-2 gap-5 md:auto-rows-fr">
            {TOP_CASES.map((c, i) => (
              <CaseCard key={c.client} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM APPIES , Marquee (€2k tier) ────────────────────────── */}
      <section id="custom-appies" className="py-20 bg-[#0E3D31] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-[#DFB771] text-xs font-bold uppercase tracking-widest mb-3">
              Custom-built Appies
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Onze vloot. En een paar van onze klanten s.
            </h2>
            <p className="text-[#F6FEFC]/55 max-w-2xl mx-auto">
              Zes Custom Appies. Allemaal wakker. Nu. Vanaf €2.000/mnd bouwen we de jouwe.
            </p>
          </motion.div>
        </div>

        <Marquee pauseOnHover className="[--duration:50s] py-2">
          {CUSTOM_APPIES.map((a) => (
            <CustomAppieTile key={a.name} a={a} />
          ))}
        </Marquee>

        <div className="text-center mt-10">
          <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link
              href={PRICING.customAppie.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#247459]/15 hover:bg-[#247459]/25 border border-[#247459]/40 hover:border-[#DFB771]/50 text-[#F6FEFC] font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {PRICING.customAppie.cta.nl} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PORTFOLIO STRIP ─────────────────────────────────────────── */}
      <section className="py-16 bg-[#031D16] border-y border-[#247459]/15 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-8 text-center">
          <p className="text-[#F6FEFC]/30 text-xs uppercase tracking-widest font-semibold">
            We bouwen al jaren websites die werken
          </p>
        </div>
        <Marquee pauseOnHover className="[--duration:60s] [--gap:1.5rem]">
          {PORTFOLIO.map((p) => (
            <div
              key={p.name}
              className="relative shrink-0 w-[280px] aspect-[16/9] rounded-xl overflow-hidden border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors"
            >
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 text-xs font-semibold text-[#F6FEFC]">{p.name}</p>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ── WAT APPIE DOET (P) ───────────────────────────────────────── */}
      <section className="py-24 bg-[#0E3D31]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Vijf dingen die ze doet zonder jou erbij</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CUSTOMER_OUTCOMES.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: SMOOTH }}
                whileHover={{ y: -4 }}
                className="p-5 bg-[#031D16]/60 rounded-2xl border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors"
              >
                <p className="font-mono text-xs text-[#DFB771] uppercase tracking-widest mb-3">{`0${i + 1}`}</p>
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
              Twee minuten. Eén klant. Geen acteurs.
            </h2>
            <p className="text-[#F6FEFC]/50 mb-8 max-w-xl mx-auto">
              Loom-opname van een live workflow , komt binnen Phase 1.5.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: SMOOTH }}
            className="relative aspect-video rounded-2xl overflow-hidden border border-[#247459]/30 group cursor-pointer"
          >
            <Image
              src="/screenshots/titantransfers-booking-fresh.jpg"
              alt="Demo poster"
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-[#031D16]/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-full bg-[#DFB771] text-[#031D16] flex items-center justify-center shadow-2xl"
              >
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AANBOD (S) ──────────────────────────────────────────────── */}
      <section id="aanbod" className="py-24 bg-[#0E3D31]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Drie manieren. Eén Appie.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* DIY PDF */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ease: SMOOTH, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors p-7 flex flex-col"
            >
              <p className="text-[#247459] text-xs font-bold uppercase tracking-wide mb-3">Build it yourself</p>
              <h3 className="font-bold text-xl mb-1">{PRICING.pdfGuide.name}</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-5">PDF guide v4.4 , 75 pagina's</p>
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
                  <li key={f} className="flex items-start gap-2 text-[#F6FEFC]/65 text-sm">
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

            {/* Instant Appie , flagship with always-on border-beam */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ease: SMOOTH, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="relative bg-gradient-to-b from-[#247459]/25 to-[#1a2e27]/50 rounded-2xl border-2 border-[#DFB771]/50 p-7 shadow-xl shadow-[#DFB771]/10 flex flex-col overflow-hidden"
            >
              <BorderBeam size={250} duration={8} colorFrom="#DFB771" colorTo="#FFD99A" />
              <div className="absolute -top-3 left-6 bg-[#DFB771] text-[#031D16] text-xs font-bold uppercase px-3 py-1 rounded-full z-10">
                Onze keuze
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
                  'Persistent geheugen',
                  '55+ skills library',
                  '10 uur bespaard of geld terug',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[#F6FEFC]/75 text-sm">
                    <Check className="w-4 h-4 text-[#DFB771] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/buy/instant"
                className="block text-center w-full py-3 bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-bold text-sm rounded-xl transition-colors"
              >
                {PRICING.instantAppie.cta.nl} →
              </Link>
            </motion.div>

            {/* Custom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease: SMOOTH, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors p-7 flex flex-col"
            >
              <p className="text-[#F6FEFC]/40 text-xs font-bold uppercase tracking-wide mb-3">Custom-built</p>
              <h3 className="font-bold text-xl mb-1">{PRICING.customAppie.name}</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-5">Eva, Sjaak, Shay's Appie , wij bouwen jouw versie</p>
              <div className="mb-5">
                <span className="font-bold text-3xl">start €2k</span>
                <span className="text-[#F6FEFC]/40 text-sm ml-1">/ mnd · op maat</span>
              </div>
              <ul className="space-y-2 mb-7 flex-1">
                {[
                  'Alles uit Instant Appie',
                  'Maatwerk workflows + integraties',
                  'Industrie-specifieke kwalificatie',
                  'Multi-agent architectuur',
                  '30 dagen dedicated support',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[#F6FEFC]/65 text-sm">
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

          {/* Guarantee callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: SMOOTH }}
            className="mt-12 max-w-3xl mx-auto text-center p-7 bg-[#031D16]/70 rounded-2xl border border-[#DFB771]/40 relative overflow-hidden"
          >
            <BorderBeam size={300} duration={10} delay={1} colorFrom="#DFB771" colorTo="#FFD99A" />
            <div className="flex items-center justify-center gap-2 mb-3">
              <BadgeCheck className="w-5 h-5 text-[#DFB771]" />
              <p className="text-[#DFB771] text-xs font-semibold uppercase tracking-widest">Garantie</p>
            </div>
            <p className="text-[#F6FEFC] text-lg md:text-xl font-bold mb-3">{GUARANTEE.headline.nl}</p>
            <p className="text-[#F6FEFC]/70 text-sm md:text-base">{GUARANTEE.copy.nl}</p>
            <p className="text-[#F6FEFC]/40 text-xs mt-3 font-mono">{GUARANTEE.mechanic.nl}</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ (S) ─────────────────────────────────────────────────── */}
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
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA (S) ─────────────────────────────────────────── */}
      <section className="relative py-24 bg-[#0E3D31] border-t border-[#247459]/20 overflow-hidden">
        {mounted && (
          <Particles
            className="absolute inset-0"
            quantity={50}
            staticity={40}
            color="#DFB771"
          />
        )}
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            <StaggerWords text="Wakker je eerste Appie." />
          </h2>
          <p className="text-[#F6FEFC]/60 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            {GUARANTEE.copy.nl}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/buy/instant"
                className="flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-bold px-8 py-4 rounded-xl transition-colors"
              >
                {PRICING.instantAppie.cta.nl} → €250/mnd
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/buy/pdf"
                className="flex items-center justify-center gap-2 bg-[#247459]/15 hover:bg-[#247459]/25 border border-[#247459]/40 hover:border-[#DFB771]/50 text-[#F6FEFC] font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                {PRICING.pdfGuide.cta.nl} , €65
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
