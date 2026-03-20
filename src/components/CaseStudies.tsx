'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Clock, Zap, TrendingUp, MessageSquare, Shield, Mail, Calendar, Camera, Car, Bot, Building2, DollarSign, Users } from 'lucide-react';

// Counter animation component
function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    if (!isInView) {
      setDisplayValue('0');
      return;
    }
    
    const match = value.match(/^([<>€$]?)(\d+\.?\d*)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    
    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';
    
    const isDecimal = match[2].includes('.');
    const decimalPlaces = isDecimal ? (match[2].split('.')[1]?.length || 0) : 0;
    
    const duration = 1200;
    const steps = 30;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = targetNum * easeOut;
      
      if (currentStep >= steps) {
        setDisplayValue(`${prefix}${isDecimal ? targetNum.toFixed(decimalPlaces) : Math.round(targetNum)}${suffix}`);
        clearInterval(timer);
      } else {
        setDisplayValue(`${prefix}${isDecimal ? currentValue.toFixed(decimalPlaces) : Math.round(currentValue)}${suffix}`);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [isInView, value]);
  
  return <span ref={ref} className={className}>{displayValue}</span>;
}

const caseStudies = [
  {
    slug: 'cza-ben-de-voorman',
    title: 'CZA Ben de Voorman',
    subtitle: 'AI WhatsApp Lead Qualification',
    description: 'Construction company losing jobs to faster competitors. Now their AI qualifies leads instantly, scores them 0-100, and syncs everything to their CRM. They never miss an after-hours inquiry again.',
    image: '/screenshots/cza-fresh.jpg',
    stats: [
      { label: 'Faster Response', value: '99%', before: '4-24 hrs → 2 min' },
      { label: 'Weekly Hours Saved', value: '13+', icon: Clock },
      { label: 'More Leads Captured', value: '40%', icon: TrendingUp },
    ],
    tech: ['GPT-4.1', 'Gemini', 'WhatsApp API', 'Monday.com', 'Supabase', 'React'],
    quote: '"We used to lose jobs because we couldn\'t respond fast enough. Now leads get answers immediately."',
    author: 'Ben, Owner',
  },
  {
    slug: 'safesite-security',
    title: 'SAFESITE Security',
    subtitle: 'Voice-to-Website in 24 Hours',
    description: 'Military bodyguard launching a security firm. No time for design meetings or revision cycles. He sent voice notes describing his vision. The next morning, his website was live.',
    image: '/screenshots/safesite-fresh.jpg',
    stats: [
      { label: 'Faster Than Agency', value: '93%', before: '2 weeks → 1 day' },
      { label: 'Design Meetings', value: '0', icon: MessageSquare },
      { label: 'Revision Cycles', value: '0', icon: Zap },
    ],
    tech: ['Webflow', 'Claude AI', 'Telegram', 'WhatsApp', 'Faster Whisper'],
    quote: '"I just talked about what I needed. Next morning, the website was live."',
    author: 'Shay, Founder',
  },
  {
    slug: 'eva-dubai-property',
    title: 'Eva · Dubai Property',
    subtitle: 'AI Real Estate Operations Manager',
    description: 'Real estate company drowning in operational tasks. Eva now manages their website, analyzes CRM data, monitors all client messaging, transcribes sales calls, and builds custom dashboards on demand.',
    image: '/screenshots/eva-mission-control.jpg',
    stats: [
      { label: 'Tasks Automated', value: '80%', icon: Bot },
      { label: 'Response Time', value: '<5 min', before: '2-4 hrs' },
      { label: 'FTEs Replaced', value: '3', icon: Users },
    ],
    tech: ['Claude AI', 'CRM Integration', 'Call Analysis', 'Mission Control', 'Tailscale', 'Custom Dashboards'],
    quote: '"Eva handles what used to take 3 people. Website updates, lead follow-ups, reporting: all automated."',
    author: 'Dubai Property Team',
  },
  {
    slug: 'bot-farm-defense',
    title: 'Bot Farm Defense',
    subtitle: 'Automated Reputation Protection',
    description: 'Coordinated attack: 10 fake one-star reviews in one hour. Our AI investigated every account, found identical patterns, built an evidence file, and got 9 reviews removed by Google.',
    image: '/screenshots/botfarm.jpg',
    stats: [
      { label: 'Removal Rate', value: '100%', icon: Shield },
      { label: 'Faster Than Manual', value: '96%', before: '2 days → 2 hrs' },
      { label: 'Rating Restored', value: '4.8★', icon: TrendingUp },
    ],
    tech: ['OSINT Analysis', 'Google Account Analysis', 'Pattern Detection', 'Automated Reporting'],
    quote: '"The chance that 9 legitimate reviewers have the exact same profile is less than 0.000001%."',
    author: 'Analysis Report',
  },
  {
    slug: 'privanotify',
    title: 'PrivaNotify',
    subtitle: 'AI-Powered Anonymous Messaging SaaS',
    description: 'Platform for sending anonymous messages about sensitive topics. The AI rewrites every message to be empathetic and constructive while blocking 100% of abuse attempts. First deal closed for €3,000.',
    image: '/screenshots/privanotify-fresh.jpg',
    stats: [
      { label: 'Abuse Blocked', value: '100%', icon: Shield },
      { label: 'User Satisfaction', value: '98%', icon: TrendingUp },
      { label: 'First Deal', value: '€3k', icon: DollarSign },
    ],
    tech: ['Claude AI', 'Next.js', 'Twilio', 'Stripe', 'Supabase'],
    quote: '"The AI crafts messages that are caring and constructive. Exactly what we needed."',
    author: 'Hesam, Founder',
  },
  {
    slug: 'executive-assistant',
    title: 'Executive Assistant',
    subtitle: 'AI That Uses Your Computer',
    description: 'Appie and Garavito work as executive assistants with full computer access. They book appointments, fill out forms, send calendar invites, process refunds. Triggered by a voice note, screenshot, or forwarded message.',
    image: '/screenshots/team-dashboard.jpg',
    stats: [
      { label: 'Hours Saved Weekly', value: '15+', icon: Clock },
      { label: 'Admin Costs', value: '€0', icon: DollarSign },
      { label: 'Faster Than Manual', value: '97%', before: '30 min → 1 min' },
    ],
    tech: ['Browser Automation', 'Google Calendar', 'Voice Notes', 'Puppeteer', 'Form Filling'],
    quote: '"Forward a message, send a voice note, or drop a screenshot. Appie handles the rest: bookings, refunds, invites, whatever."',
    author: 'Seyed, CEO',
  },
  {
    slug: 'legal-email-automation',
    title: 'Legal Email Automation',
    subtitle: 'Domain Dispute Resolution',
    description: 'Months-long domain dispute. One voice instruction at 10:49 PM. AI searched Gmail, found the thread, identified all parties, wrote a professional email with payment link, and sent it. Dispute resolved.',
    image: '/screenshots/email.jpg',
    stats: [
      { label: 'Time to Send', value: '1 min', before: '30+ min' },
      { label: 'Faster Process', value: '97%', icon: Mail },
      { label: 'Dispute Resolved', value: '✓', icon: TrendingUp },
    ],
    tech: ['Gmail API', 'Claude AI', 'Thread Analysis', 'Stripe Payment Links'],
    quote: '"Find that email thread. Send them a message that I can\'t cash checks and give them this payment link."',
    author: 'Seyed, CEO',
  },
  {
    slug: 'boooth-booking',
    title: 'Boooth.me',
    subtitle: 'Photo Booth Rental Booking System',
    description: 'Photo booth company wasting hours on manual quotes. Now customers configure their perfect booth setup online, see live pricing with VAT, and book instantly. Conversions jumped 40%.',
    image: '/screenshots/boooth-home-fresh.jpg',
    stats: [
      { label: 'Conversion Lift', value: '40%', icon: TrendingUp },
      { label: 'Quote Admin Saved', value: '90%', icon: Clock },
      { label: 'Revenue Increase', value: '35%', icon: DollarSign },
    ],
    tech: ['Next.js', 'Stripe', 'Multi-step Forms', 'VAT Calculator', 'CRM Integration'],
    quote: '"Customers can now configure and book their perfect photo booth experience online, 24/7."',
    author: 'Client',
  },
  {
    slug: 'titan-transfers',
    title: 'Titan Transfers',
    subtitle: 'Limousine Booking Platform',
    description: 'Premium limousine service needed a booking experience as sleek as their vehicles. Four-step flow, dark theme, instant quotes. Bilingual support doubled their addressable market.',
    image: '/screenshots/titantransfers-booking-fresh.jpg',
    stats: [
      { label: 'Time to Book', value: '<2 min', icon: Clock },
      { label: 'Market Reach', value: '2x', before: 'NL only → EN + NL' },
      { label: 'Mobile Conversions', value: '65%', icon: TrendingUp },
    ],
    tech: ['Next.js', 'Booking Engine', 'Vehicle Selection', 'Multi-language', 'Dark Theme'],
    quote: '"Book Transfer. One-way or hourly. Airport pickups. Executive travel."',
    author: 'Titan Transfers',
  },
  {
    slug: 'appie-system',
    title: 'Appie System',
    subtitle: 'Digital Employee for Entrepreneurs',
    description: 'Three AI agents working 24/7: one orchestrates, one handles marketing, one manages engineering. They schedule, research, write content, update CRM, deploy code, and never miss a deadline.',
    image: '/screenshots/team-dashboard.jpg',
    stats: [
      { label: 'Always Working', value: '24/7', icon: Clock },
      { label: 'Deadlines Missed', value: '0', icon: Zap },
      { label: 'Value Created', value: '€50k+', icon: DollarSign },
    ],
    tech: ['Claude', 'OpenClaw', 'n8n', 'Notion', 'Google Workspace', 'Tailscale'],
    quote: '"Having Appie is like having a team that never sleeps. It just handles things."',
    author: 'Seyed, CEO',
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-16 sm:py-24 md:py-32 bg-[#031D16] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F6FEFC] to-transparent opacity-5" />
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-[#247459]/10 blur-3xl" />
      <div className="absolute bottom-40 left-0 w-80 h-80 rounded-full bg-[#DFB771]/5 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
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
            Not concepts. Not demos. Real AI systems running real businesses right now.
            Every stat is verifiable. Every client is reachable.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-12 sm:space-y-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-6 sm:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <Link href={`/case-studies/${study.slug}`} className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-3xl overflow-hidden border border-[#247459]/20 shadow-2xl shadow-[#000]/30 transition-transform group-hover:scale-[1.02]">
                  <div className="relative aspect-video">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/50 to-transparent" />
                    <div className="absolute inset-0 bg-[#DFB771]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#DFB771] text-[#031D16] px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                        View Full Case Study <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#DFB771]/20 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-[#247459]/20 blur-2xl" />
              </Link>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#247459]/20 text-[#DFB771] text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  {study.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F6FEFC] mb-3 sm:mb-4">
                  {study.title}
                </h3>
                <p className="text-[#F6FEFC]/60 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  {study.description}
                </p>

                {/* Stats with counter animation */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
                  {study.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0E3D31]/50 border border-[#247459]/20">
                      <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#DFB771]">
                        <CountUp value={stat.value} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-[#F6FEFC]/50 mt-1 leading-tight">{stat.label}</div>
                      {stat.before && (
                        <div className="text-[10px] sm:text-xs text-[#F6FEFC]/30 line-through mt-1">{stat.before}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                  {study.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-full bg-[#247459]/20 text-[#F6FEFC]/80 border border-[#247459]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 sm:border-l-4 border-[#DFB771] pl-4 sm:pl-5 py-2">
                  <p className="italic text-[#F6FEFC]/80 text-base sm:text-lg leading-relaxed">
                    {study.quote}
                  </p>
                  <footer className="text-xs sm:text-sm text-[#DFB771] mt-2 sm:mt-3 font-medium">
                    – {study.author}
                  </footer>
                </blockquote>

                {/* Read More Link */}
                <Link 
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-2 text-[#DFB771] hover:text-[#FFD99A] font-medium text-sm mt-4 group"
                >
                  Read full case study
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
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
