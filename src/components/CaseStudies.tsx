'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Clock, Zap, TrendingUp, MessageSquare } from 'lucide-react';

const caseStudies = [
  {
    title: 'CZA Ben de Voorman',
    subtitle: 'AI WhatsApp Lead Qualification',
    description: 'Construction company handling dozens of inquiries weekly. We built a 24/7 AI assistant that qualifies leads automatically via WhatsApp.',
    image: '/screenshots/appie-command-center.jpg',
    stats: [
      { label: 'Response Time', value: '<2 min', before: '4-24 hrs' },
      { label: 'Time Saved', value: '13+ hrs/week', icon: Clock },
      { label: 'After-Hours Leads', value: '40%', icon: TrendingUp },
    ],
    tech: ['GPT-4', 'Gemini', 'WhatsApp API', 'Monday.com', 'n8n'],
    quote: '"We used to lose jobs because we couldn\'t respond fast enough. Now leads get answers immediately."',
    author: 'Ben, Owner',
  },
  {
    title: 'PrivaNotify',
    subtitle: 'AI-Powered Anonymous Messaging',
    description: 'SaaS platform that lets users send anonymous, AI-crafted messages about sensitive topics — with kindness built in.',
    image: '/screenshots/privanotify-wizard.jpg',
    stats: [
      { label: 'AI Messages/Month', value: '1,000+', icon: MessageSquare },
      { label: 'Abuse Blocked', value: '100%', icon: Zap },
      { label: 'User Satisfaction', value: '98%', icon: TrendingUp },
    ],
    tech: ['Claude AI', 'Next.js', 'Twilio', 'Stripe', 'Supabase'],
    quote: '"The AI crafts messages that are caring and constructive — exactly what we needed."',
    author: 'Hesam, Founder',
  },
  {
    title: 'Appie System',
    subtitle: 'Digital Employee for Entrepreneurs',
    description: 'Multi-agent AI assistant handling scheduling, research, content, CRM, and operations — working 24/7 across time zones.',
    image: '/screenshots/appie-command-center.jpg',
    stats: [
      { label: 'Agents Working', value: '3', icon: Zap },
      { label: 'Tasks/Day', value: '50+', icon: TrendingUp },
      { label: 'Uptime', value: '99.9%', icon: Clock },
    ],
    tech: ['Claude', 'n8n', 'Notion', 'Google Workspace', 'Tailscale'],
    quote: '"Having Appie is like having a team that never sleeps. It just handles things."',
    author: 'Seyed, CEO',
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 md:py-32 bg-[#031D16] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F6FEFC] to-transparent opacity-5" />
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[#247459]/10 blur-3xl" />
      <div className="absolute bottom-40 left-0 w-80 h-80 rounded-full bg-[#DFB771]/5 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-[#DFB771] text-sm font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
            Case Studies
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F6FEFC] mt-4 mb-6">
            Real Results, <span className="text-[#DFB771]">Real Clients</span>
          </h2>
          <p className="text-[#F6FEFC]/60 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it. See how we&apos;ve helped businesses 
            automate their operations and scale faster.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-3xl overflow-hidden border border-[#247459]/20 shadow-2xl shadow-[#000]/30">
                  <div className="relative aspect-video">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/50 to-transparent" />
                  </div>
                </div>
                {/* Decorative shapes */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#DFB771]/20 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-[#247459]/20 blur-2xl" />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#247459]/20 text-[#DFB771] text-sm font-medium mb-4">
                  {study.subtitle}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-[#F6FEFC] mb-4">
                  {study.title}
                </h3>
                <p className="text-[#F6FEFC]/60 mb-8 text-lg leading-relaxed">
                  {study.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {study.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-5 rounded-2xl bg-[#0E3D31]/50 border border-[#247459]/20">
                      <div className="text-2xl md:text-3xl font-bold text-[#DFB771]">{stat.value}</div>
                      <div className="text-xs text-[#F6FEFC]/50 mt-1">{stat.label}</div>
                      {stat.before && (
                        <div className="text-xs text-[#F6FEFC]/30 line-through mt-1">{stat.before}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {study.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1.5 text-xs rounded-full bg-[#247459]/20 text-[#F6FEFC]/80 border border-[#247459]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="border-l-4 border-[#DFB771] pl-5 py-2">
                  <p className="italic text-[#F6FEFC]/80 text-lg">
                    {study.quote}
                  </p>
                  <footer className="text-sm text-[#DFB771] mt-3 font-medium">
                    — {study.author}
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a 
            href="#book" 
            className="inline-flex items-center gap-2 text-[#DFB771] hover:text-[#FFD99A] font-semibold text-lg group"
          >
            Ready to be our next success story?
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
