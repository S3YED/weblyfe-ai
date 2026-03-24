'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Bot, Zap, Calendar, Mail, Globe, Shield, Brain, BarChart3, ChevronDown, Menu, X, Clock, Bell, Lock, Star, BookOpen, Server, Wrench } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import StickyCountdown from '@/components/StickyCountdown';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Brain,
    title: 'Persistent Memory',
    description: 'Remembers context across every conversation. No more repeating yourself.',
  },
  {
    icon: Bot,
    title: 'Multi-Agent Teams',
    description: 'Spawn specialized agents for complex tasks. One coordinates, others execute.',
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description: 'Connects to n8n, Zapier, and 500+ tools. Trigger flows from a chat message.',
  },
  {
    icon: Calendar,
    title: 'Calendar & Email',
    description: 'Full Google Workspace integration. Schedule, triage, draft replies automatically.',
  },
  {
    icon: Globe,
    title: 'Web Intelligence',
    description: 'Real-time research, competitor monitoring, content scraping. Always informed.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Runs on your own server. Your data never trains a public model.',
  },
  {
    icon: Mail,
    title: 'Telegram & WhatsApp',
    description: 'Chat with your AI on your favourite app. Available 24/7, responds in seconds.',
  },
  {
    icon: BarChart3,
    title: 'Command Center',
    description: 'Real-time dashboard for tasks, agent activity, and business metrics.',
  },
];

const tiers = [
  {
    icon: BookOpen,
    tag: 'DIY',
    title: 'Build It Yourself',
    description: 'Everything you need to set up your own AI agent.',
    items: [
      'Step-by-step PDF guide',
      'Video tutorials',
      'OpenClaw setup walkthrough',
      'Self-hosted on your server',
      'Community Discord access',
      'Template configs included',
    ],
    cta: 'Get the Guide',
  },
  {
    icon: Server,
    tag: 'Hosted',
    title: 'Done With You',
    description: 'We host and maintain your AI agent. You focus on your business.',
    featured: true,
    items: [
      'Pre-configured OpenClaw instance',
      'Telegram or WhatsApp connected',
      'Email & calendar integration',
      'Monthly subscription',
      'Ongoing updates & support',
      'Custom personality & memory',
    ],
    cta: 'Start Hosting',
  },
  {
    icon: Wrench,
    tag: 'Custom',
    title: 'Done For You',
    description: 'Full custom AI infrastructure built for your specific needs.',
    items: [
      'Everything in Hosted',
      'Multi-agent architecture',
      'Custom workflows & automations',
      'Command center dashboard',
      'CRM & pipeline integration',
      'Dedicated support & strategy',
    ],
    cta: 'Book a Strategy Call',
  },
];

const faqs = [
  {
    q: 'What is OpenClaw?',
    a: 'OpenClaw is an AI agent runtime that powers Appie, your custom digital employee. It runs 24/7 on your own server, connects to your tools, and handles business operations autonomously.',
  },
  {
    q: 'Do I need technical skills?',
    a: 'For the DIY guide, basic terminal knowledge helps. For Hosted and Custom plans, we handle everything. You just chat with your AI on Telegram or WhatsApp.',
  },
  {
    q: 'How is this different from ChatGPT?',
    a: 'ChatGPT is a chat window. OpenClaw is an operating system for your AI: persistent memory, tool access, file management, multi-agent coordination, and real business integrations.',
  },
  {
    q: 'Which tools does it connect to?',
    a: 'Google Workspace, Notion, Airtable, Webflow, Stripe, n8n, Zapier, Slack, WhatsApp, Telegram, and hundreds more via API or webhook.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your instance runs on a private server. Your data never trains public models and never leaves your infrastructure.',
  },
  {
    q: 'When do you launch?',
    a: 'Very soon. Sign up to get notified first and lock in exclusive launch pricing. Early supporters get the best deal.',
  },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function getLaunchTime() {
  if (typeof window === 'undefined') return Date.now() + 259200000;
  const stored = localStorage.getItem('weblyfe_launch_ts');
  if (stored) return parseInt(stored);
  const ts = Date.now() + 259200000; // 72h
  localStorage.setItem('weblyfe_launch_ts', String(ts));
  return ts;
}

const pad = (n: number) => String(n).padStart(2, '0');

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#0E3D31] rounded-2xl overflow-hidden cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between p-5 sm:p-6 bg-[#031D16]/50">
        <h3 className="font-semibold text-[#F6FEFC] text-base sm:text-lg pr-4">{q}</h3>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-[#DFB771] flex-shrink-0" />
        </motion.div>
      </div>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className="overflow-hidden">
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 text-[#F6FEFC]/70 leading-relaxed text-sm sm:text-base">{a}</p>
      </motion.div>
    </div>
  );
}

function InlineCountdown({ time }: { time: { d: number; h: number; m: number; s: number } }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 font-mono tabular-nums text-sm sm:text-base">
      {[
        { v: time.d, l: 'd' },
        { v: time.h, l: 'h' },
        { v: time.m, l: 'm' },
        { v: time.s, l: 's' },
      ].map((u, i) => (
        <span key={u.l} className="flex items-center gap-0.5">
          {i > 0 && <span className="text-[#DFB771]/30 mx-0.5">:</span>}
          <span className="bg-[#0E3D31] text-[#F6FEFC] font-bold px-2 py-1 rounded-md">{pad(u.v)}</span>
          <span className="text-[#F6FEFC]/40 text-xs">{u.l}</span>
        </span>
      ))}
    </div>
  );
}

function LeadCapture({ variant = 'dark', compact = false }: { variant?: 'dark' | 'light'; compact?: boolean }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });
    } catch (err) {
      console.error('Waitlist submit error:', err);
    }
    setLoading(false);
    setSubmitted(true);
  }

  const inputClass = variant === 'dark'
    ? 'bg-[#0E3D31] border border-[#247459]/30 text-[#F6FEFC] placeholder-[#F6FEFC]/30 focus:border-[#DFB771]/50 focus:ring-2 focus:ring-[#DFB771]/10'
    : 'bg-[#F6FEFC] border border-[#031D16]/10 text-[#031D16] placeholder-[#031D16]/30 focus:border-[#247459] focus:ring-2 focus:ring-[#247459]/10';

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`flex items-center justify-center gap-3 px-5 py-4 rounded-xl ${variant === 'dark' ? 'bg-[#247459]/20 border border-[#247459]/30' : 'bg-[#247459]/10 border border-[#247459]/20'}`}>
        <div className="w-7 h-7 rounded-full bg-[#247459] flex items-center justify-center flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <span className={`font-semibold text-sm block ${variant === 'dark' ? 'text-[#F6FEFC]' : 'text-[#031D16]'}`}>Your spot is saved! 🎉</span>
          <span className={`text-xs ${variant === 'dark' ? 'text-[#F6FEFC]/60' : 'text-[#031D16]/60'}`}>You&apos;ll be notified at launch via email.</span>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${inputClass}`} />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (WhatsApp)" className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all ${inputClass}`} />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className={`flex-1 px-4 py-3.5 rounded-xl text-sm focus:outline-none transition-all ${inputClass}`} />
        <button type="submit" disabled={loading} className="btn-primary text-sm whitespace-nowrap justify-center disabled:opacity-60">
          <Bell className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save My Spot'}
        </button>
      </div>
    </form>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function OpenClawPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [launchTime] = useState(getLaunchTime);
  const [time, setTime] = useState(getTimeLeft(launchTime));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(launchTime)), 1000);
    return () => clearInterval(id);
  }, [launchTime]);

  return (
    <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#031D16]/90 backdrop-blur-md border-b border-[#0E3D31]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={120} height={36} className="h-6 sm:h-7 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-[#F6FEFC]/70 hover:text-[#DFB771] transition-colors">Features</a>
            <a href="#packages" className="text-[#F6FEFC]/70 hover:text-[#DFB771] transition-colors">Packages</a>
            <a href="#faq" className="text-[#F6FEFC]/70 hover:text-[#DFB771] transition-colors">FAQ</a>
            <a href="https://tidycal.com/weblyfe/hey" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2.5 px-5">
              Book a Call
            </a>
          </div>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-[#F6FEFC] p-2 -mr-2" aria-label="Menu">
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-[#031D16] pt-20 px-6 md:hidden">
            <div className="flex flex-col gap-6">
              {[
                { label: 'Features', href: '#features' },
                { label: 'Packages', href: '#packages' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileMenu(false)} className="text-[#F6FEFC] text-2xl font-semibold hover:text-[#DFB771] transition-colors">
                  {link.label}
                </a>
              ))}
              <a href="https://tidycal.com/weblyfe/hey" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenu(false)} className="btn-primary text-center mt-4">
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
        {/* BG blobs */}
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-20 right-[15%] w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-gradient-to-br from-[#DFB771]/20 to-[#FFD99A]/10 blur-3xl pointer-events-none" />
        <motion.div animate={{ y: [0, 25, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} className="absolute bottom-32 left-[8%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-br from-[#247459]/25 to-[#0E3D31]/15 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Countdown badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 bg-[#DFB771]/10 border border-[#DFB771]/40 text-[#DFB771] text-xs sm:text-sm font-medium px-4 py-2 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              Launch pricing drops in
            </div>
            <InlineCountdown time={time} />
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-5 sm:mb-6">
            Your Own AI Employee,{' '}
            <span className="text-gradient">Running 24/7</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-xl md:text-2xl text-[#F6FEFC]/65 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Build it yourself, host one with us, or get a fully custom AI built for your business.{' '}
            <span className="text-[#DFB771] font-medium">Save 20+ hours per week.</span>
          </motion.p>

          {/* Email capture */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-md mx-auto mb-4">
            <LeadCapture variant="dark" />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-xs sm:text-sm text-[#F6FEFC]/40">
            Be first to access launch pricing · No spam, just the drop
          </motion.p>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} className="w-6 h-10 border-2 border-[#F6FEFC]/25 rounded-full flex justify-center pt-2">
            <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} className="w-1.5 h-1.5 bg-[#DFB771] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 5-STAR SOCIAL PROOF ── */}
      <section className="py-6 sm:py-8 border-y border-[#0E3D31]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#DFB771] text-[#DFB771]" />
              ))}
            </div>
            <span className="text-[#F6FEFC]/50 text-sm">Trusted by founders & agencies</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              {['Lost LeBlanc', 'BeyondSchool', 'Dubai Property', 'Stickx Arcade'].map((c) => (
                <span key={c} className="text-[#F6FEFC]/30 font-semibold text-xs sm:text-sm">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOL LOGO CAROUSEL ── */}
      <section className="py-8 sm:py-10 overflow-hidden">
        <p className="text-center text-[#F6FEFC]/40 text-xs sm:text-sm font-medium uppercase tracking-widest mb-6">
          Seamlessly automate with
        </p>
        <div className="relative">
          <div className="flex animate-scroll gap-10 sm:gap-14 items-center w-max">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-10 sm:gap-14 items-center">
                <div className="flex items-center gap-2.5 text-[#F6FEFC]/50 font-semibold text-xs sm:text-sm whitespace-nowrap">
                  <Image src="/openclaw-mark.svg" alt="OpenClaw" width={22} height={22} className="opacity-70" />
                  OpenClaw
                </div>
                {[
                  { name: 'Google', logo: '/logos/google.svg' },
                  { name: 'Notion', logo: '/logos/notion.svg' },
                  { name: 'Telegram', logo: '/logos/telegram.svg' },
                  { name: 'WhatsApp', logo: '/logos/whatsapp.svg' },
                  { name: 'Stripe', logo: '/logos/stripe.svg' },
                  { name: 'n8n', logo: '/logos/n8n.svg' },
                  { name: 'Webflow', logo: '/logos/webflow.svg' },
                  { name: 'Slack', logo: '/logos/slack.svg' },
                  { name: 'HubSpot', logo: '/logos/hubspot.svg' },
                  { name: 'Airtable', logo: '/logos/airtable.svg' },
                ].map((tool) => (
                  <span key={`${setIdx}-${tool.name}`} className="flex items-center gap-2 text-[#F6FEFC]/40 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    <Image src={tool.logo} alt={tool.name} width={20} height={20} className="opacity-50" />
                    {tool.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Capabilities</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Everything your business needs,<br className="hidden md:block" /> handled by AI
            </h2>
            <p className="text-[#F6FEFC]/60 text-base sm:text-lg max-w-2xl mx-auto">
              Appie connects to your tools, learns your workflows, and executes tasks through a simple chat interface.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className="bg-[#0E3D31]/30 border border-[#0E3D31] rounded-2xl p-5 sm:p-6 hover:border-[#247459] hover:bg-[#0E3D31]/50 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#247459]/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#247459]/30 transition-colors">
                  <f.icon className="w-5 h-5 text-[#DFB771]" />
                </div>
                <h3 className="font-bold text-[#F6FEFC] mb-1.5 sm:mb-2 text-sm sm:text-base">{f.title}</h3>
                <p className="text-[#F6FEFC]/55 text-xs sm:text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="py-20 sm:py-28 border-t border-[#0E3D31]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Built With OpenClaw</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Real results, real businesses</h2>
            <p className="text-[#F6FEFC]/60 text-base sm:text-lg max-w-2xl mx-auto">
              See what Appie has built for founders and companies just like yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                title: 'Eva — Dubai Property',
                subtitle: 'AI Real Estate Assistant',
                description: 'Dedicated AI employee for a real estate agency. Handles property inquiries, schedules viewings, qualifies buyers, and runs 24/7 on its own hardware.',
                image: '/screenshots/cza-fresh.jpg',
                stat: '24/7 lead response',
                highlights: ['Property matching', 'Viewing scheduling', 'Buyer qualification', 'Own Mac Mini'],
              },
              {
                title: 'Appie — Weblyfe',
                subtitle: 'Multi-Agent AI System',
                description: 'Three AI agents running across time zones. Orchestrator, Marketing Brain, and DevOps. Handles scheduling, content, CRM, code deployments, and operations.',
                image: '/screenshots/team-dashboard.jpg',
                stat: '3 agents, 50+ tasks/day',
                highlights: ['Multi-agent orchestration', 'Content & marketing', 'DevOps & deploys', '99.9% uptime'],
              },
              {
                title: 'CZA Ben de Voorman',
                subtitle: 'AI WhatsApp Lead Qualification',
                description: 'Dutch construction company handling dozens of inquiries weekly. AI scores leads 0-100, responds in under 2 minutes, and syncs with Monday CRM automatically.',
                image: '/screenshots/cza-fresh.jpg',
                stat: '<2 min response time',
                highlights: ['WhatsApp automation', 'Lead scoring (0-100)', 'Monday.com sync', '40% after-hours leads'],
              },
            ].map((cs, i) => (
              <motion.div key={cs.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group rounded-2xl overflow-hidden border border-[#0E3D31] hover:border-[#247459]/50 transition-all duration-300 flex flex-col">
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <Image src={cs.image} alt={cs.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-[#031D16]/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[#DFB771] text-[10px] sm:text-xs font-semibold uppercase tracking-wider">{cs.subtitle}</p>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#F6FEFC]">{cs.title}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-5 bg-[#0E3D31]/30 flex-1 flex flex-col">
                  <p className="text-[#F6FEFC]/50 text-xs sm:text-sm leading-relaxed mb-4 flex-1">{cs.description}</p>
                  <div className="space-y-2 mb-4">
                    {cs.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-[#F6FEFC]/65">
                        <Check className="w-3.5 h-3.5 text-[#247459] flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-[#247459]/20">
                    <span className="text-[#DFB771] font-bold text-sm">{cs.stat}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PATHS EXPLAINER ── */}
      <section className="py-20 sm:py-24 bg-[#031D16]/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Choose Your Path</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Three ways to get your AI employee</h2>
            <p className="text-[#F6FEFC]/60 text-base sm:text-lg max-w-2xl mx-auto">
              Whether you&apos;re a builder, a business owner, or scaling an enterprise — there&apos;s a perfect fit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: BookOpen,
                num: '01',
                tag: 'DIY',
                title: 'Build It Yourself',
                desc: 'Get the full setup guide, copy-paste config files, and sort the rest by yourself. Perfect for technical founders who want full control.',
                highlights: ['Complete setup guide', 'Copy-paste config files', 'Community Discord access', 'Self-hosted on your server'],
              },
              {
                icon: Server,
                num: '02',
                tag: 'Hosted',
                title: 'Employ Appie',
                desc: 'Rent your own dedicated and private Appie, spun up instantly for you. Personal guidance to link it with your devices.',
                highlights: ['Your own private Appie', 'Instant setup', 'Connected to your tools', 'Personal onboarding'],
                featured: true,
              },
              {
                icon: Wrench,
                num: '03',
                tag: 'Enterprise',
                title: 'Custom AI System',
                desc: 'We build your own fully customised AI system for your company, on your hardware. Multi-agent, custom workflows, dedicated support.',
                highlights: ['Fully custom build', 'Your own hardware', 'Multi-agent architecture', 'Dedicated support team'],
              },
            ].map((path, i) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 sm:p-8 border relative ${
                  path.featured
                    ? 'border-[#DFB771]/60 bg-gradient-to-br from-[#DFB771]/15 to-[#247459]/15 shadow-lg shadow-[#DFB771]/10'
                    : 'border-[#247459]/40 bg-[#0E3D31]/40'
                }`}
              >
                {path.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#DFB771] to-[#FFD99A] text-[#031D16] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${path.featured ? 'bg-[#DFB771]/20' : 'bg-[#247459]/20'}`}>
                    <path.icon className={`w-6 h-6 ${path.featured ? 'text-[#DFB771]' : 'text-[#247459]'}`} />
                  </div>
                  <div>
                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest block ${path.featured ? 'text-[#DFB771]' : 'text-[#247459]'}`}>{path.tag}</span>
                    <h3 className="font-extrabold text-lg sm:text-xl text-[#F6FEFC]">{path.title}</h3>
                  </div>
                </div>
                <p className="text-[#F6FEFC]/55 text-sm leading-relaxed mb-5">{path.desc}</p>
                <ul className="space-y-2.5">
                  {path.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-[#F6FEFC]/75">
                      <Check className={`w-4 h-4 flex-shrink-0 ${path.featured ? 'text-[#DFB771]' : 'text-[#247459]'}`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE-TIER PACKAGES (BLURRED) ── */}
      <section id="packages" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Choose Your Path</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Three ways to get started</h2>
            <p className="text-[#F6FEFC]/60 text-base sm:text-lg max-w-xl mx-auto">
              Whether you&apos;re a builder, a business owner, or scaling an agency, there&apos;s a perfect fit.
            </p>
          </motion.div>

          <div className="relative">
            {/* Tier cards (blurred) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto filter blur-md brightness-75 select-none pointer-events-none" aria-hidden="true">
              {tiers.map((tier) => (
                <div key={tier.title} className={`rounded-3xl p-6 sm:p-8 border ${tier.featured ? 'border-[#DFB771] bg-gradient-to-br from-[#DFB771]/10 to-[#247459]/10' : 'border-[#0E3D31] bg-[#0E3D31]/30'}`}>
                  <div className="w-10 h-10 bg-[#247459]/20 rounded-xl flex items-center justify-center mb-4">
                    <tier.icon className="w-5 h-5 text-[#DFB771]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#247459] mb-2 block">{tier.tag}</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold mb-2">{tier.title}</h3>
                  <p className="text-[#F6FEFC]/55 text-sm mb-5">{tier.description}</p>
                  <div className="text-4xl font-bold text-[#DFB771] mb-5">€???</div>
                  <ul className="space-y-2.5 mb-6">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#F6FEFC]/80">
                        <Check className="w-4 h-4 flex-shrink-0 text-[#247459]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="h-12 bg-[#247459] rounded-xl" />
                </div>
              ))}
            </div>

            {/* Overlay */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="absolute inset-0 flex items-center justify-center p-4">
              <div className="bg-[#031D16]/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-[#DFB771]/20 text-center max-w-lg shadow-2xl shadow-[#DFB771]/5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#DFB771] to-[#FFD99A] flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-lg">
                  <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-[#031D16]" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F6FEFC] mb-3">
                  Pricing Drops Soon
                </h3>
                <p className="text-[#F6FEFC]/60 mb-3 leading-relaxed text-sm sm:text-base">
                  Three tiers: <span className="text-[#DFB771] font-semibold">Build It Yourself</span>, <span className="text-[#DFB771] font-semibold">Hosted With Us</span>, or <span className="text-[#DFB771] font-semibold">Fully Custom</span>.
                </p>
                <p className="text-[#F6FEFC]/50 mb-6 sm:mb-8 text-sm">
                  Sign up to get notified first and lock in exclusive launch pricing.
                </p>

                <div className="max-w-sm mx-auto mb-4">
                  <LeadCapture variant="dark" />
                </div>

                <div className="flex justify-center">
                  <InlineCountdown time={time} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tier labels below blur */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mt-8 sm:mt-10">
            {tiers.map((tier) => (
              <motion.div key={tier.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                <tier.icon className={`w-6 h-6 mx-auto mb-2 ${tier.featured ? 'text-[#DFB771]' : 'text-[#247459]'}`} />
                <p className="font-bold text-xs sm:text-sm text-[#F6FEFC]/80">{tier.title}</p>
                <p className="text-[10px] sm:text-xs text-[#F6FEFC]/40 mt-0.5">{tier.tag}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Common questions</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0E3D31] to-[#031D16]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Ready to meet your AI employee?
            </h2>
            <p className="text-[#F6FEFC]/60 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Get notified when we launch, or book a free strategy call to explore what&apos;s possible.
            </p>

            <div className="max-w-md mx-auto mb-6">
              <LeadCapture variant="dark" />
            </div>

            <div className="flex items-center justify-center gap-3 text-sm text-[#F6FEFC]/40">
              <span>or</span>
              <a href="https://tidycal.com/weblyfe/hey" target="_blank" rel="noopener noreferrer" className="text-[#DFB771] hover:text-[#FFD99A] transition-colors font-medium inline-flex items-center gap-1.5">
                Book a free call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[#F6FEFC]/35 text-xs sm:text-sm mt-6">No commitment. No hard sell. Just clarity.</p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#0E3D31]/50 py-8 sm:py-10 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={100} height={30} className="h-5 sm:h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </Link>
          <p className="text-[#F6FEFC]/30 text-xs sm:text-sm text-center">
            © 2026 Weblyfe.ai · A Weblyfe by Techwiz LLC company
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-[#F6FEFC]/40">
            <a href="mailto:hello@weblyfe.ai" className="hover:text-[#DFB771] transition-colors">hello@weblyfe.ai</a>
            <Link href="/" className="hover:text-[#DFB771] transition-colors">← Home</Link>
          </div>
        </div>
      </footer>

      <StickyCountdown />
    </main>
  );
}
