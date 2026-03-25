'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Bot, Zap, Calendar, Mail, Globe, Shield, Brain, BarChart3, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import WaitlistForm from '@/components/WaitlistForm';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Brain,
    title: 'Persistent Memory',
    description: 'Remembers context across every conversation. No more repeating yourself — your AI grows smarter with every interaction.',
  },
  {
    icon: Bot,
    title: 'Multi-Agent Orchestration',
    description: 'Spawn specialized sub-agents for complex tasks. One Appie coordinates, others execute — like a full team on demand.',
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description: 'Connects to n8n, Zapier, and 500+ tools. Trigger flows, update CRMs, post content — all from a simple chat message.',
  },
  {
    icon: Calendar,
    title: 'Calendar & Email',
    description: 'Full Google Workspace integration. Schedule meetings, triage your inbox, draft replies — handled automatically.',
  },
  {
    icon: Globe,
    title: 'Web Intelligence',
    description: 'Real-time research, competitor monitoring, content scraping. Your AI stays informed so your decisions are sharp.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Runs on your own server or cloud. Your data never trains a public model. Enterprise-grade security by default.',
  },
  {
    icon: Mail,
    title: 'Telegram & WhatsApp',
    description: 'Chat with your AI on your favourite messaging app. Available 24/7, responds in seconds, handles complex requests.',
  },
  {
    icon: BarChart3,
    title: 'Command Center',
    description: 'Real-time dashboard to monitor tasks, agent activity, and business metrics — all in one place.',
  },
];

const offers = [
  {
    tag: 'Starter',
    title: 'OpenClaw Agent',
    description: 'Your personal AI assistant with core capabilities',
    featured: false,
    items: [
      'Custom AI agent setup',
      'Telegram or WhatsApp integration',
      'Email & calendar access',
      'Web research capabilities',
      'Basic automations',
      'Setup + onboarding included',
    ],
  },
  {
    tag: 'Full Stack',
    title: 'AI Infrastructure',
    description: 'Complete AI-powered business operations system',
    featured: true,
    items: [
      'Everything in OpenClaw Agent',
      'Multi-agent architecture',
      'Custom command center dashboard',
      'n8n workflow automations',
      'Notion / Airtable integration',
      'CRM & pipeline automation',
      'Ongoing support & optimization',
    ],
  },
];

const faqs = [
  {
    q: 'What is OpenClaw?',
    a: 'OpenClaw is an AI agent runtime that powers Appie — Weblyfe\'s custom digital employee. It runs 24/7 on your own server, connects to your tools, and handles business operations autonomously.',
  },
  {
    q: 'Do I need technical skills to run this?',
    a: 'No. Weblyfe handles the full setup — server provisioning, configuration, integrations. You just chat with your AI on Telegram or WhatsApp like you would with a team member.',
  },
  {
    q: 'How is this different from ChatGPT?',
    a: 'ChatGPT is a chat interface. OpenClaw is an operating system for your AI — persistent memory, tool use, file access, multi-agent coordination, and real business integrations baked in.',
  },
  {
    q: 'Which tools can it connect to?',
    a: 'Google Workspace (Gmail, Calendar, Drive, Docs), Notion, Airtable, Webflow, Stripe, n8n, Zapier, Slack, WhatsApp, Telegram, and hundreds more via API or webhook.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your instance runs on a private server — your own DigitalOcean, AWS, or Mac Mini. Your data is never used to train public models and never leaves your infrastructure.',
  },
  {
    q: 'Can I try it before committing?',
    a: 'Book a free strategy call. We\'ll demo Appie live and map out what your AI employee would handle in your business. No pitch, pure value.',
  },
];

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-[#0E3D31] rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-6 bg-[#031D16]/50">
        <h3 className="font-semibold text-[#F6FEFC] text-lg pr-4">{q}</h3>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-[#DFB771] flex-shrink-0" />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-6 pt-2 text-[#F6FEFC]/70 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function OpenClawPage() {
  return (
    <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#031D16]/90 backdrop-blur-md border-b border-[#0E3D31]/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={120} height={36} className="h-7 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-[#F6FEFC]/70 hover:text-[#DFB771] transition-colors">Features</a>
            <a href="#offers" className="text-[#F6FEFC]/70 hover:text-[#DFB771] transition-colors">Packages</a>
            <a href="#faq" className="text-[#F6FEFC]/70 hover:text-[#DFB771] transition-colors">FAQ</a>
            <a
              href="https://tidycal.com/weblyfe/hey"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-5"
            >
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* BG blobs */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[15%] w-80 h-80 rounded-full bg-gradient-to-br from-[#DFB771]/20 to-[#FFD99A]/10 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-32 left-[8%] w-96 h-96 rounded-full bg-gradient-to-br from-[#247459]/25 to-[#0E3D31]/15 blur-3xl pointer-events-none"
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#247459]/20 border border-[#247459]/40 text-[#DFB771] text-sm font-medium px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-[#DFB771] rounded-full animate-pulse" />
            Powered by OpenClaw Technology
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Your Business,{' '}
            <span className="text-gradient">Running on Autopilot</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#F6FEFC]/65 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            We deploy a custom AI agent — Appie — that handles your emails, calendar, leads, and automations 24/7.{' '}
            <span className="text-[#DFB771] font-medium">Clients save 20+ hours per week.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://tidycal.com/weblyfe/hey"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group text-base"
            >
              Book a Free Strategy Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features" className="btn-secondary text-base">
              See What It Does
            </a>
          </motion.div>

          {/* Microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-[#F6FEFC]/40 mt-6"
          >
            No coding required · Fully managed setup · Runs 24/7
          </motion.p>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-[#F6FEFC]/25 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-[#DFB771] rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-12 border-y border-[#0E3D31]/50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-[#F6FEFC]/40 text-sm mb-6 tracking-widest uppercase">
            Trusted by founders &amp; agencies
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {['Lost LeBlanc', 'BeyondSchool', 'Dubai Property', 'Stickx Arcade', 'IOnlyBookVIP'].map((c) => (
              <span key={c} className="text-[#F6FEFC]/30 font-semibold text-sm tracking-wide">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Capabilities</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Everything your business needs,<br className="hidden md:block" /> handled by AI
            </h2>
            <p className="text-[#F6FEFC]/60 text-lg max-w-2xl mx-auto">
              Appie connects to your tools, learns your workflows, and executes tasks — all through a simple chat interface.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-[#0E3D31]/30 border border-[#0E3D31] rounded-2xl p-6 hover:border-[#247459] hover:bg-[#0E3D31]/50 transition-all duration-300 group"
              >
                <div className="w-11 h-11 bg-[#247459]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#247459]/30 transition-colors">
                  <f.icon className="w-5 h-5 text-[#DFB771]" />
                </div>
                <h3 className="font-bold text-[#F6FEFC] mb-2">{f.title}</h3>
                <p className="text-[#F6FEFC]/55 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#031D16]/80">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">The Process</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Up and running in 2 weeks</h2>
            <p className="text-[#F6FEFC]/60 text-lg max-w-xl mx-auto">
              We handle everything — from setup to training. You focus on your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#247459] to-transparent" />

            {[
              { num: '01', title: 'Strategy Call', desc: 'We map your operations and identify automation wins' },
              { num: '02', title: 'Custom Build', desc: 'Your AI agent is configured and connected to your tools' },
              { num: '03', title: 'Training & Test', desc: 'We refine workflows until Appie works exactly as you want' },
              { num: '04', title: 'Go Live', desc: 'Your AI runs 24/7, we monitor and optimise continuously' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#DFB771] to-[#FFD99A] rounded-full flex items-center justify-center mx-auto mb-4 text-[#031D16] font-extrabold text-xl shadow-lg shadow-[#DFB771]/20">
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-[#F6FEFC]/55 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="offers" className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Packages</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Choose your AI setup</h2>
            <p className="text-[#F6FEFC]/60 text-lg max-w-xl mx-auto">
              Custom pricing based on your team size, tools, and automation needs. Book a call to get your quote.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-8 border ${
                  offer.featured
                    ? 'border-[#DFB771] bg-gradient-to-br from-[#DFB771]/10 to-[#247459]/10 relative'
                    : 'border-[#0E3D31] bg-[#0E3D31]/30'
                }`}
              >
                {offer.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#DFB771] to-[#FFD99A] text-[#031D16] text-xs font-bold px-4 py-1.5 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <span className={`text-xs font-bold uppercase tracking-widest mb-3 block ${offer.featured ? 'text-[#DFB771]' : 'text-[#247459]'}`}>
                  {offer.tag}
                </span>
                <h3 className="text-2xl font-extrabold mb-2">{offer.title}</h3>
                <p className="text-[#F6FEFC]/55 text-sm mb-6">{offer.description}</p>
                <ul className="space-y-3 mb-8">
                  {offer.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#F6FEFC]/80">
                      <Check className={`w-4 h-4 flex-shrink-0 ${offer.featured ? 'text-[#DFB771]' : 'text-[#247459]'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://tidycal.com/weblyfe/hey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={offer.featured ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
                >
                  Get a Custom Quote
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section className="py-20 border-t border-[#0E3D31]/50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Pricing Drops Soon</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              Get notified first
            </h2>
            <p className="text-[#F6FEFC]/55 text-base mb-8 max-w-md mx-auto">
              Sign up to lock in exclusive launch pricing across all three tiers.
            </p>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-[#0E3D31] to-[#031D16]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Book your free strategy call
            </h2>
            <p className="text-[#F6FEFC]/60 text-lg mb-8 max-w-xl mx-auto">
              In 30 minutes, we&apos;ll map out exactly how AI infrastructure can transform your business. Zero pitch, pure value.
            </p>
            <a
              href="https://tidycal.com/weblyfe/hey"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg inline-flex"
            >
              Schedule a Call — It&apos;s Free
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-[#F6FEFC]/35 text-sm mt-4">No commitment. No hard sell. Just clarity.</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-extrabold">Common questions</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#0E3D31]/50 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={100} height={30} className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </Link>
          <p className="text-[#F6FEFC]/30 text-sm text-center">
            © 2026 Weblyfe.ai · A Weblyfe by Techwiz LLC company
          </p>
          <div className="flex gap-6 text-sm text-[#F6FEFC]/40">
            <a href="mailto:hello@weblyfe.ai" className="hover:text-[#DFB771] transition-colors">hello@weblyfe.ai</a>
            <Link href="/" className="hover:text-[#DFB771] transition-colors">← Back to Home</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
