'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Zap, Bot, Shield, Brain, Calendar, Mail, Users, Clock, Wrench } from 'lucide-react';
import Link from 'next/link';

// TIPS Framework for High-End Landing Pages
// T = Transformation | I = Ingredients | P = Process | S = Social Proof
// + Section Zero (The Bridge = acknowledge the OLD way)

const TRANSFORMATION = {
  title: 'Imagine your AI',
  titleAccent: 'handling everything.',
  subtitle: 'An AI that remembers everything, handles the chaos, and tells you what matters — every single morning.',
};

const INGREDIENTS = [
  {
    icon: Bot,
    name: 'OpenClaw Agent',
    detail: 'Your own AI employee, running 24/7 on a private server. Not a chatbot — a persistent, memory-equipped digital colleague.',
  },
  {
    icon: Brain,
    name: 'MiniMax M2.7 Intelligence',
    detail: 'Powered by one of the most capable models available. Connects to Google Workspace, Notion, Stripe, Telegram — all at once.',
  },
  {
    icon: Shield,
    name: 'Fully Private & Secure',
    detail: 'Runs on your own private server. Your data never touches a public model. Enterprise-grade security, personal attention.',
  },
];

const PROCESS_STEPS = [
  { n: '01', title: 'We configure your Appie', desc: 'We set up your server, connect your channels, and tune the AI for your business.' },
  { n: '02', title: 'Your AI learns your business', desc: 'It reads your docs, learns your voice, connects your tools. Within 24 hours it knows how you work.' },
  { n: '03', title: 'It runs, you scale', desc: 'Email triage, lead capture, scheduling, follow-ups — all handled. You focus on decisions only a human can make.' },
];

const DEPLOYED_AIS = [
  {
    name: 'Appie',
    role: 'Operations & Client Onboarding',
    tagline: 'Handles every client from first email to signed contract',
    metric: '200+ inquiries/day',
    icon: '🤖',
    color: '#10B981',
  },
  {
    name: 'Wolfie',
    role: 'E-commerce & Content Creation',
    tagline: 'Manages Shopify store, creates product photos, runs DMs',
    metric: '40+ products/week',
    icon: '🐺',
    color: '#F59E0B',
  },
  {
    name: 'Hera',
    role: 'Scheduling & Booking',
    tagline: 'Calendars, reschedules, sends reminders — automatically',
    metric: '100% missed calls recovered',
    icon: '📅',
    color: '#6366F1',
  },
  {
    name: 'Nemo',
    role: 'Finance & Billing',
    tagline: 'Invoicing, Stripe disputes, MRR tracking — no spreadsheets needed',
    metric: '€0 reconciliation errors',
    icon: '💳',
    color: '#EC4899',
  },
];

const TOOLS = ['Google Workspace', 'Notion', 'Telegram', 'WhatsApp', 'Stripe', 'n8n', 'Slack', 'HubSpot', 'Airtable', 'Webflow'];

const FAQS = [
  { q: "How is this different from ChatGPT?", a: "ChatGPT is stateless — it forgets everything after each conversation. Your Appie has persistent memory, connects to your tools, and acts on your behalf 24/7 without you prompting it." },
  { q: "How long does setup take?", a: "With our managed Instant Appie service: 24 hours. We handle everything. With the DIY guide: a few hours of your time." },
  { q: "Is my data private?", a: "Completely. Your Appie runs on a dedicated private server. Your conversations and data never train any public model." },
  { q: "What if I already have tools set up?", a: "We integrate with your existing stack. Google Workspace, Notion, Stripe, Slack — your Appie becomes the layer that connects everything." },
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
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-6">Before we begin</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F6FEFC] leading-tight mb-8">
            You know this feeling.
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-4 max-w-2xl mx-auto mb-10">
            {[
              'One task becomes five. Five become fifty.',
              'You hired contractors who don\'t know your business.',
              'You built systems that only you understand.',
              'You\'re the hub. The hub always fails.',
            ].map(line => (
              <p key={line} className="text-[#F6FEFC]/50 text-lg md:text-xl leading-relaxed">{line}</p>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#t" className="flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-8 py-4 rounded-xl transition-colors">
              See the transformation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/guide/Build-Your-Own-Appie-v4.pdf" download className="flex items-center justify-center gap-2 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/40 text-[#F6FEFC] font-semibold px-8 py-4 rounded-xl transition-colors">
              Get free PDF guide
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── T = TRANSFORMATION ── */}
      <section id="t" className="relative py-24 bg-[#0E3D31]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">The transformation</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">What changes when your AI works</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <p className="text-[#F6FEFC] text-3xl md:text-4xl font-bold leading-tight mb-6">Appie — your AI employee that works while you sleep.</p>
            <p className="text-[#F6FEFC]/60 text-lg md:text-xl leading-relaxed">
              {TRANSFORMATION.subtitle}
            </p>
          </motion.div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/openclaw#waitlist" className="flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-8 py-4 rounded-xl transition-colors">
              Get Instant Appie <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/guide/Build-Your-Own-Appie-v4.pdf" download className="flex items-center justify-center gap-2 border border-[#247459]/40 hover:border-[#247459] text-[#F6FEFC]/70 px-8 py-4 rounded-xl transition-colors text-sm">
              Download free PDF
            </Link>
          </div>
        </div>
      </section>

      {/* ── I = INGREDIENTS ── */}
      <section className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#247459] text-sm font-semibold uppercase tracking-widest mb-3">What makes it work</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">What makes it work</h2>
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

      {/* ── P = PROCESS ── */}
      <section className="py-24 bg-[#0E3D31]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">How the transformation happens</h2>
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

      {/* ── S = DEPLOYED AIs ── */}
      <section className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#247459] text-sm font-semibold uppercase tracking-widest mb-3">Proof</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">Meet our deployed AI employees</h2>
            <p className="text-[#F6FEFC]/50 text-base mt-4 max-w-2xl mx-auto">Four AI employees already running. Yours is next.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEPLOYED_AIS.map((ai, i) => (
              <motion.div
                key={ai.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 hover:border-[#247459]/50 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-xl" style={{ backgroundColor: ai.color }} />
                <div className="text-3xl mb-4">{ai.icon}</div>
                <h3 className="text-[#F6FEFC] font-bold text-lg mb-0.5">{ai.name}</h3>
                <p className="text-xs font-medium mb-3" style={{ color: ai.color }}>{ai.role}</p>
                <p className="text-[#F6FEFC]/50 text-xs leading-relaxed mb-4">{ai.tagline}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-[#247459]/20">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ai.color }} />
                  <span className="text-[#F6FEFC]/70 text-xs font-semibold">{ai.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-10">
            <Link href="/openclaw#waitlist" className="inline-flex items-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-8 py-4 rounded-xl transition-colors">
              Deploy your AI employee <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FREE PDF GUIDE ── */}
      <section className="py-20 bg-[#0E3D31] border-y border-[#247459]/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
              <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-wider mb-3">Free Guide · v4.4</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC] mb-4">Build Your Own 24/7 AI Employee</h2>
              <p className="text-[#F6FEFC]/50 text-base mb-6 leading-relaxed">
                10 chapters, 56 pages, real code. The complete blueprint from zero to your own AI employee. Updated April 2026.
              </p>
              <Link href="/guide/Build-Your-Own-Appie-v4.pdf" download className="inline-flex items-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-6 py-3.5 rounded-xl transition-colors">
                Download free PDF <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-shrink-0">
              <div className="bg-[#F6FEFC] rounded-2xl p-5 w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-12 bg-[#247459] rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#031D16] font-bold text-xs">Build Your Own</p>
                    <p className="text-[#031D16]/60 text-xs">24/7 AI Employee v4.4</p>
                    <p className="text-[#031D16]/40 text-xs mt-1">56 pages · April 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THREE TIERS ── */}
      <section id="tiers" className="py-24 bg-[#031D16]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">Three ways to get your Appie</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* DIY */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 p-8">
              <p className="text-[#247459] text-xs font-bold uppercase tracking-wide mb-4">DIY</p>
              <h3 className="text-[#F6FEFC] font-bold text-xl mb-1">Build it yourself</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-6">Free</p>
              <ul className="space-y-2 mb-8">
                {['Free 56-page PDF guide', 'Copy/paste templates', 'Your own server', '55+ skills library', 'Advanced AI models'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-sm"><Check className="w-4 h-4 text-[#247459] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/guide/Build-Your-Own-Appie-v4.pdf" download className="block text-center w-full py-3 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/30 text-[#F6FEFC] font-semibold text-sm rounded-xl transition-colors">Download free guide</Link>
            </motion.div>

            {/* Instant Appie */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative bg-gradient-to-b from-[#247459]/20 to-[#1a2e27]/50 rounded-2xl border-2 border-[#DFB771]/50 p-8 shadow-lg shadow-[#DFB771]/5">
              <div className="absolute -top-3 left-6 bg-[#DFB771] text-[#031D16] text-xs font-bold uppercase px-3 py-1 rounded-full">Most popular</div>
              <p className="text-[#DFB771] text-xs font-bold uppercase tracking-wide mb-4">Managed</p>
              <h3 className="text-[#F6FEFC] font-bold text-xl mb-1">Instant Appie</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-6">We build + manage everything</p>
              <div className="mb-4"><span className="text-[#F6FEFC] font-bold text-3xl">€250</span><span className="text-[#F6FEFC]/40 text-sm ml-1">/month</span></div>
              <ul className="space-y-2 mb-8">
                {['Everything in the DIY guide', 'Dedicated private server', '$50/mo AI budget', 'Telegram + WhatsApp connected', 'Persistent memory & context', '55+ skills library', 'Community access'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-sm"><Check className="w-4 h-4 text-[#DFB771] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="https://weblyfe.ai/openclaw#waitlist" className="block text-center w-full py-3 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold text-sm rounded-xl transition-colors">Get your Appie →</Link>
            </motion.div>

            {/* Custom */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 p-8">
              <p className="text-[#F6FEFC]/40 text-xs font-bold uppercase tracking-wide mb-4">Custom</p>
              <h3 className="text-[#F6FEFC] font-bold text-xl mb-1">Custom build</h3>
              <p className="text-[#F6FEFC]/40 text-xs mb-6">Full agency partnership</p>
              <div className="mb-4"><span className="text-[#F6FEFC] font-bold text-3xl">From €2,500</span></div>
              <ul className="space-y-2 mb-8">
                {['Everything in Instant Appie', 'Multi-agent architecture', 'Custom automations & workflows', 'Google Workspace + CRM integration', 'Enterprise-grade security', '30-day dedicated support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-sm"><Check className="w-4 h-4 text-[#247459] flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="https://weblyfe.ai/openclaw#contact" className="block text-center w-full py-3 bg-[#247459]/10 hover:bg-[#247459]/20 border border-[#247459]/30 text-[#F6FEFC] font-semibold text-sm rounded-xl transition-colors">Book a call</Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── TOOLS STRIP ── */}
      <section className="py-12 bg-[#0E3D31] border-y border-[#247459]/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[#F6FEFC]/20 text-xs uppercase tracking-widest mb-6 font-semibold">Works with your stack</p>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS.map(tool => <span key={tool} className="px-4 py-2 bg-[#031D16]/50 border border-[#247459]/20 rounded-full text-[#F6FEFC]/60 text-xs font-medium">{tool}</span>)}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-[#031D16]">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#F6FEFC]">Questions</h2>
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

      {/* ── FOOTER CTA ── */}
      <section className="py-16 bg-[#0E3D31] border-t border-[#247459]/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F6FEFC] mb-4">Ready to meet your Appie?</h2>
          <p className="text-[#F6FEFC]/50 text-sm mb-8">The transformation starts with one decision.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guide/Build-Your-Own-Appie-v4.pdf" download className="bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-6 py-3 rounded-xl transition-colors">
              Download free guide ↓
            </Link>
            <Link href="https://weblyfe.ai/openclaw#waitlist" className="border border-[#247459]/40 hover:border-[#247459] text-[#F6FEFC]/70 hover:text-[#F6FEFC] px-6 py-3 rounded-xl transition-colors text-sm font-semibold">
              Get Instant Appie →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
