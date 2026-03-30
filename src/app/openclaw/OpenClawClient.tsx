'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Bot, Zap, Calendar, Mail, Globe, Shield, Brain, BarChart3, ChevronDown, BookOpen, Server, Wrench, Clock } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import WaitlistForm from '@/components/WaitlistForm';
// StickyCountdown removed - PDF is live, no countdown needed
import { PAINPOINTS, FEATURES, OUTCOMES, AGENTS, TIERS, FAQS, TOOLS, TRUSTED_CLIENTS, STATS } from './data/content';

// ─── ICON MAP ──────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Bot, Zap, Calendar, Mail, Globe, Shield, BarChart3, BookOpen, Server, Wrench, Clock,
};

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#0E3D31]/20 rounded-2xl overflow-hidden cursor-pointer bg-white" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between p-6">
        <h3 className="font-semibold text-[#031D16] text-lg pr-4">{q}</h3>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-[#DFB771] flex-shrink-0" />
        </motion.div>
      </div>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className="overflow-hidden">
        <p className="px-6 pb-6 pt-2 text-[#031D16]/70 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-[#247459]/20 border border-[#247459]/40 text-[#DFB771] text-sm font-medium px-4 py-2 rounded-full">
      <span className="w-2 h-2 bg-[#DFB771] rounded-full animate-pulse" />
      🔥 The Build Your Own Appie guide is LIVE — get yours for €65
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
          <Link href="/">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={120} height={36} className="h-7 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-[#F6FEFC]/70 hover:text-[#DFB771] transition-colors">Features</a>
            <a href="#offers" className="text-[#F6FEFC]/70 hover:text-[#DFB771] transition-colors">Packages</a>
            <a href="#faq" className="text-[#F6FEFC]/70 hover:text-[#DFB771] transition-colors">FAQ</a>
            <a href="#offers" className="btn-primary text-sm py-2.5 px-5">Get Started</a>
          </div>
        </div>
      </nav>

      {/* ── HERO (TEMPT) ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-20 right-[15%] w-80 h-80 rounded-full bg-gradient-to-br from-[#DFB771]/20 to-[#FFD99A]/10 blur-3xl pointer-events-none" />
        <motion.div animate={{ y: [0, 25, 0], rotate: [0, -4, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} className="absolute bottom-32 left-[8%] w-96 h-96 rounded-full bg-gradient-to-br from-[#247459]/25 to-[#0E3D31]/15 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* OpenClaw Logo */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="mb-4">
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <LiveBadge />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 mt-8">
            Your Personal TechWiz{' '}<br className="hidden md:block" /><span className="text-gradient">Ready in 24 Hours</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-xl md:text-2xl text-[#F6FEFC]/65 max-w-3xl mx-auto mb-10 leading-relaxed">
            An intelligent AI assistant that runs your customer service, automates your operations, and works 24/7. On Telegram, WhatsApp, or Discord.{' '}
            <span className="text-[#DFB771] font-medium">No coding required.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#offers" className="btn-primary group text-base">
              Start Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features" className="btn-secondary text-base">✦ How It Works</a>
          </motion.div>

          {/* Authority Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-wrap items-center justify-center gap-6 mt-10 mb-4">
            <span className="text-sm text-[#F6FEFC]/60">1,200+ Hours Saved</span>
            <span className="text-[#F6FEFC]/20">|</span>
            <span className="text-sm text-[#F6FEFC]/60">€50K+ Revenue Generated</span>
            <span className="text-[#F6FEFC]/20">|</span>
            <span className="text-sm text-[#F6FEFC]/60">3 Live Agents</span>
            <span className="text-[#F6FEFC]/20">|</span>
            <span className="text-sm text-[#F6FEFC]/60">99.9% Uptime</span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="space-y-2">
            <p className="text-sm text-[#F6FEFC]/40">
              No coding required · Fully managed setup · Runs 24/7
            </p>
            <p className="text-[#F6FEFC]/40 text-sm tracking-wide">Powered by OpenClaw</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} className="w-6 h-10 border-2 border-[#F6FEFC]/25 rounded-full flex justify-center pt-2">
            <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} className="w-1.5 h-1.5 bg-[#DFB771] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-12 border-y border-[#0E3D31]/50">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-[#F6FEFC]/40 text-sm mb-6 tracking-widest uppercase">Trusted by founders &amp; agencies</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-8">
            {TRUSTED_CLIENTS.map((c) => (
              <span key={c} className="text-[#F6FEFC]/30 font-semibold text-sm tracking-wide">{c}</span>
            ))}
          </div>
          {/* Tool logo carousel */}
          <div className="relative overflow-hidden">
            <div className="flex gap-12 animate-scroll">
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <div key={`${tool.name}-${i}`} className="flex items-center gap-2 flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity">
                  <Image src={tool.logo} alt={tool.name} width={20} height={20} className="w-5 h-5" />
                  <span className="text-[#F6FEFC]/40 text-xs font-medium whitespace-nowrap">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES (INFLUENCE) ── */}
            {/* ── PAIN POINTS (TEMPT) ── */}
      <section id="features" className="py-28 bg-[#F6FEFC]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Sound Familiar?</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#031D16]">Running a business shouldn&apos;t<br className="hidden md:block" /> feel like this</h2>
            <p className="text-[#031D16]/60 text-lg max-w-2xl mx-auto">You want agency-quality results without the agency price tag. But doing it all yourself? That&apos;s burning you out.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAINPOINTS.map((p, i) => {
              const Icon = iconMap[p.iconKey] || Brain;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className="bg-[#F6FEFC]/95 border border-[#0E3D31]/15 rounded-2xl p-6 hover:border-[#c0392b]/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-11 h-11 bg-[#0E3D31] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c0392b] transition-colors">
                    <Icon className="w-5 h-5 text-[#DFB771] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#031D16] mb-2">{p.title}</h3>
                  <p className="text-[#031D16]/70 text-sm leading-relaxed">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-center mt-12 text-[#031D16]/50 text-lg italic">
            What if one AI employee could handle all of this?
          </motion.p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 border-y border-[#0E3D31]/50 bg-[#0E3D31]/20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => {
              const Icon = iconMap[stat.icon];
              return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center flex flex-col items-center">
                {Icon && <div className="w-10 h-10 bg-[#247459]/30 rounded-xl flex items-center justify-center mb-3"><Icon className="w-5 h-5 text-[#DFB771]" /></div>}
                <div className="text-4xl md:text-5xl font-extrabold text-[#DFB771] mb-2">{stat.value}</div>
                <div className="text-[#F6FEFC]/50 text-sm">{stat.label}</div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT YOUR AI HANDLES (PERSUADE) ── */}
      <section className="py-28 bg-[#F6FEFC]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">The Outcome</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#031D16]">What Your AI Handles</h2>
            <p className="text-[#031D16]/60 text-lg max-w-2xl mx-auto">Real outcomes for real businesses. Your AI doesn&apos;t just chat — it works.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OUTCOMES.map((o, i) => {
              const Icon = iconMap[o.iconKey] || Zap;
              const imageMap: Record<string, string | null> = {
                'Your Inbox, Sorted': '/screenshots/email.jpg',
                'Never Miss a Lead': '/screenshots/cza-fresh.jpg',
                'Your Calendar, Managed': '/outcomes/calendar-managed.jpg',
                'Content on Autopilot': '/outcomes/content-autopilot.jpg',
                'Operations That Scale': '/screenshots/team-dashboard.jpg',
                'Private & Secure': null,
              };
              const imageSrc = imageMap[o.title];
              
              return (
                <motion.div key={o.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-[#F6FEFC]/95 border border-[#0E3D31]/20 rounded-2xl overflow-hidden hover:border-[#247459] hover:shadow-lg transition-all duration-300 group">
                  {/* Image or Gradient Placeholder */}
                  <div className="relative h-40 w-full overflow-hidden">
                    {imageSrc ? (
                      <Image src={imageSrc} alt={o.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#247459]/30 to-[#DFB771]/20 flex items-center justify-center">
                        <Icon className="w-12 h-12 text-[#247459]/40" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-[#0E3D31] rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#DFB771]" />
                      </div>
                      <span className="text-xs font-medium text-[#F6FEFC] bg-[#0E3D31] px-3 py-1 rounded-full">{o.persona}</span>
                    </div>
                    <h3 className="font-bold text-[#031D16] text-lg mb-2">{o.title}</h3>
                    <p className="text-[#031D16]/70 text-sm leading-relaxed">{o.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MEET THE AGENTS (INFLUENCE) ── */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Already Deployed</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Meet the Agents</h2>
            <p className="text-[#F6FEFC]/60 text-lg max-w-xl mx-auto">These AI agents are running right now, handling real business operations every day.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AGENTS.map((agent, i) => (
              <motion.div key={agent.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <a href="/#case-studies" className="block bg-[#0E3D31]/30 border border-[#0E3D31] rounded-3xl p-8 text-center hover:border-[#247459] transition-all duration-300 group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#DFB771]/20 to-[#247459]/20 mx-auto mb-5 flex items-center justify-center overflow-hidden border-2 border-[#247459]/30 group-hover:border-[#DFB771]/50 transition-colors">
                    <Image src={agent.image} alt={agent.name} width={80} height={80} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-extrabold mb-1">{agent.name}</h3>
                  <p className="text-[#DFB771] text-sm font-medium mb-2">{agent.tagline}</p>
                  <span className="text-xs font-medium text-[#F6FEFC] bg-[#0E3D31] px-3 py-1 rounded-full mb-4 inline-block">{agent.industry}</span>
                  <p className="text-[#F6FEFC]/55 text-sm leading-relaxed mb-5">{agent.description}</p>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#0E3D31]">
                    {agent.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-[#DFB771] font-bold text-sm">{stat.value}</div>
                        <div className="text-[#F6FEFC]/35 text-[10px] uppercase tracking-wider mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (SELL) ── */}
      <section id="offers" className="py-28 bg-[#031D16]/80">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Get Started Today</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Choose Your AI Setup</h2>
            <p className="text-[#F6FEFC]/60 text-lg max-w-xl mx-auto">The playbook is live. Start building your AI employee today.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-8 border relative ${
                  tier.featured && tier.light
                    ? 'border-[#DFB771] bg-[#F6FEFC] text-[#031D16]'
                    : tier.featured
                    ? 'border-[#DFB771] bg-gradient-to-br from-[#DFB771]/10 to-[#247459]/10'
                    : tier.light
                    ? 'border-[#F6FEFC]/20 bg-[#F6FEFC] text-[#031D16]'
                    : 'border-[#0E3D31] bg-[#0E3D31]/30'
                }`}
              >
                {tier.featured && !('comingSoon' in tier && (tier as any).comingSoon) && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#DFB771] to-[#FFD99A] text-[#031D16] text-xs font-bold px-4 py-1.5 rounded-full">AVAILABLE NOW</span>
                  </div>
                )}
                {('comingSoon' in tier && (tier as any).comingSoon) && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#0E3D31] border border-[#247459]/50 text-[#F6FEFC]/60 text-xs font-bold px-4 py-1.5 rounded-full">COMING SOON</span>
                  </div>
                )}
                <span className={`text-xs font-bold uppercase tracking-widest mb-3 block ${tier.featured ? 'text-[#DFB771]' : tier.light ? 'text-[#247459]' : 'text-[#247459]'}`}>
                  {tier.tag}
                </span>
                <h3 className={`text-2xl font-extrabold mb-2 ${tier.light ? 'text-[#031D16]' : ''}`}>{tier.title}</h3>
                <div className="mb-4">
                  <span className={`text-3xl font-extrabold ${tier.featured && tier.light ? 'text-[#247459]' : tier.featured ? 'text-[#DFB771]' : tier.light ? 'text-[#247459]' : 'text-[#DFB771]/80'}`}>{tier.price}</span>
                  {tier.priceNote && <span className={`text-sm ml-1 ${tier.light ? 'text-[#031D16]/50' : 'text-[#F6FEFC]/40'}`}>{tier.priceNote}</span>}
                </div>
                <p className={`text-sm mb-6 ${tier.light ? 'text-[#031D16]/60' : 'text-[#F6FEFC]/55'}`}>{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.items.map((item) => (
                    <li key={item} className={`flex items-center gap-3 text-sm ${tier.light ? 'text-[#031D16]/80' : 'text-[#F6FEFC]/80'}`}>
                      <Check className={`w-4 h-4 flex-shrink-0 ${tier.featured ? 'text-[#DFB771]' : 'text-[#247459]'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                {('comingSoon' in tier && (tier as any).comingSoon) ? (
                  <span className="w-full text-center block py-3.5 px-6 rounded-xl bg-[#0E3D31]/50 text-[#F6FEFC]/40 font-semibold cursor-not-allowed border border-[#247459]/20">
                    Coming Soon
                  </span>
                ) : (
                  <a 
                    href={tier.ctaHref} 
                    target={tier.ctaHref.startsWith('http') ? '_blank' : undefined}
                    rel={tier.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="btn-primary w-full text-center block"
                  >
                    {tier.cta}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (SELL) ── */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-[#0E3D31] to-[#031D16] relative overflow-hidden">
        {/* Decorative background elements */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} 
          className="absolute top-10 right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-[#DFB771]/15 to-[#FFD99A]/10 blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ y: [0, 25, 0], rotate: [0, -4, 0] }} 
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} 
          className="absolute bottom-10 left-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-[#247459]/20 to-[#0E3D31]/10 blur-3xl pointer-events-none" 
        />
        
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to build your AI employee?</h2>
            <p className="text-[#F6FEFC]/60 text-lg mb-8 max-w-xl mx-auto">
              The complete playbook is live. 62 pages. Real code. Real prompts. Everything you need to get started.
            </p>
            <a href="https://buy.stripe.com/7sYaEYfAn30C8BncwJ3Je2I" target="_blank" rel="noopener noreferrer" className="btn-primary group text-lg inline-flex items-center gap-2">
              Get the Guide Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-[#F6FEFC]/35 text-sm mt-6">€65 one-time. Lifetime updates. Instant delivery.</p>
            <div className="mt-8 pt-8 border-t border-[#F6FEFC]/10">
              <p className="text-[#F6FEFC]/40 text-sm mb-4">Want us to build it for you instead? Managed plans coming soon.</p>
              <WaitlistForm package="general" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ (SELL) ── */}
      <section id="faq" className="py-28 bg-[#F6FEFC]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-extrabold text-[#031D16]">Common questions</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#0E3D31]/50 py-10 pb-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={100} height={30} className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </Link>
          <p className="text-[#F6FEFC]/30 text-sm text-center">© 2026 Weblyfe.ai · A Weblyfe by Techwiz LLC company</p>
          <div className="flex gap-6 text-sm text-[#F6FEFC]/40">
            <a href="https://weblyfeuniversity.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#DFB771] transition-colors">Weblyfe University</a>
            <a href="mailto:hello@weblyfe.ai" className="hover:text-[#DFB771] transition-colors">hello@weblyfe.ai</a>
            <Link href="/" className="hover:text-[#DFB771] transition-colors">← Back to Home</Link>
          </div>
        </div>
      </footer>

      {/* Sticky countdown removed - PDF is live */}
    </main>
  );
}
