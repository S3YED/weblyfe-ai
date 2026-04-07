'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Bot, Users, FileText, Cpu, Shield, MessageSquare, Clock, CreditCard } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    id: 'diy',
    name: 'Build it yourself',
    icon: FileText,
    color: '#247459',
    price: 'Free',
    priceSub: 'download the guide',
    tagline: 'Step-by-step instructions',
    description: 'The complete blueprint to build your own Appie. Copy/paste templates, no fluff.',
    features: [
      'Complete build guide (PDF)',
      'OpenClaw + Hermes Agent setup',
      'Hetzner server provisioning',
      '55+ skills library',
      'MiniMax M2.7 integration',
      'Telegram + WhatsApp setup',
      'UFW + Tailscale hardening',
      'Appie Kit GitHub starter',
    ],
    cta: 'Download free guide',
    href: '#guide',
    highlight: false,
  },
  {
    id: 'instant',
    name: 'Instant Appie',
    icon: Bot,
    color: '#DFB771',
    price: '€250',
    priceSub: '/month',
    tagline: 'We build + manage everything',
    description: 'Your own dedicated AI employee. Deployed in 24 hours. Runs 24/7. You just talk to it.',
    features: [
      'Everything in DIY',
      'Dedicated Hetzner CX33 server',
      'Managed setup & configuration',
      '$50/mo OpenRouter AI budget',
      'Telegram + WhatsApp channels',
      'Persistent memory & long-term context',
      '55+ pre-installed skills',
      'Priority support via Telegram',
      'Pause & resume anytime',
    ],
    cta: 'Get your Appie',
    href: '#contact',
    highlight: true,
    badge: 'Most popular',
  },
  {
    id: 'custom',
    name: 'Custom build',
    icon: Users,
    color: '#247459',
    price: 'From €2,500',
    priceSub: 'one-time',
    tagline: 'Full agency partnership',
    description: 'Custom AI systems built for your specific workflows. Consulting, training, and ongoing support.',
    features: [
      'Discovery + strategy session',
      'Custom automation builds',
      'Multi-agent architecture',
      'Google Workspace integration',
      'CRM + marketing stack setup',
      'Team training & handoff',
      '30-day support included',
      'Ongoing retainer available',
    ],
    cta: 'Book a call',
    href: '#contact',
    highlight: false,
  },
];

const comparisonFeatures = [
  { label: 'Setup time', diy: 'DIY (your pace)', instant: '24 hours', custom: '2–4 weeks' },
  { label: 'Server included', diy: '❌', instant: '✅ CX33', custom: '✅ custom spec' },
  { label: 'AI budget', diy: 'Bring your own', instant: '$50/mo included', custom: 'Custom budget' },
  { label: 'Skills library', diy: '✅ 55+', instant: '✅ 55+', custom: '✅ custom-built' },
  { label: 'Telegram channel', diy: '✅', instant: '✅', custom: '✅' },
  { label: 'WhatsApp channel', diy: '✅', instant: '✅', custom: '✅' },
  { label: 'Managed by us', diy: '❌', instant: '✅', custom: '✅' },
  { label: 'Priority support', diy: 'Community', instant: 'Telegram direct', custom: 'Dedicated' },
];

export default function InstantAppiePricing() {
  return (
    <section id="instant" className="py-24 md:py-32 bg-[#F6FEFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#247459] text-sm font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
            Pricing
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#031D16] mt-4 mb-6">
            Choose your path
          </h2>
          <p className="text-[#031D16]/60 max-w-xl mx-auto text-lg">
            From free guide to fully managed AI employee. No hidden fees.
          </p>
        </motion.div>

        {/* 3-Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl border-2 overflow-hidden ${
                tier.highlight
                  ? 'border-[#DFB771] bg-white shadow-xl shadow-[#DFB771]/10'
                  : 'border-[#031D16]/10 bg-white'
              }`}
            >
              {tier.badge && (
                <div className="bg-[#DFB771] text-[#031D16] text-xs font-bold uppercase tracking-wide text-center py-2 px-4">
                  {tier.badge}
                </div>
              )}

              <div className="p-8">
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${tier.color}20`, border: `1px solid ${tier.color}40` }}
                  >
                    <tier.icon className="w-5 h-5" style={{ color: tier.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#031D16] text-base">{tier.name}</h3>
                    <p className="text-[#031D16]/40 text-xs">{tier.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#031D16]">{tier.price}</span>
                  <span className="text-[#031D16]/40 text-base ml-1">{tier.priceSub}</span>
                </div>

                {/* Description */}
                <p className="text-[#031D16]/60 text-sm leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                      <span className="text-[#031D16]/70">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.href}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all ${
                    tier.highlight
                      ? 'bg-[#DFB771] text-[#031D16] hover:bg-[#DFB771]/90'
                      : 'bg-[#031D16] text-[#F6FEFC] hover:bg-[#0E3D31]'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <h3 className="text-center text-[#031D16]/40 text-sm uppercase tracking-widest mb-6 font-semibold">
            Quick comparison
          </h3>
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-[#031D16]/10">
                <th className="text-left py-3 pr-4 text-[#031D16]/40 font-medium">Feature</th>
                <th className="text-center py-3 px-4 text-[#031D16]/60 font-semibold w-28">DIY</th>
                <th className="text-center py-3 px-4 text-[#DFB771] font-bold w-28">Instant Appie</th>
                <th className="text-center py-3 px-4 text-[#031D16]/60 font-semibold w-28">Custom</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, i) => (
                <tr key={row.label} className={`border-b border-[#031D16]/5 ${i % 2 === 0 ? 'bg-[#031D16]/[0.02]' : ''}`}>
                  <td className="py-3 pr-4 text-[#031D16]/60">{row.label}</td>
                  <td className="text-center py-3 px-4 text-[#031D16]/60">{row.diy}</td>
                  <td className="text-center py-3 px-4 font-semibold text-[#031D16]">{row.instant}</td>
                  <td className="text-center py-3 px-4 text-[#031D16]/60">{row.custom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* FAQ teaser */}
        <div className="mt-12 text-center">
          <p className="text-[#031D16]/40 text-sm mb-4">Questions?</p>
          <Link href="#faq" className="text-[#247459] font-semibold hover:underline text-sm">
            See FAQ below ↓
          </Link>
        </div>

      </div>
    </section>
  );
}
