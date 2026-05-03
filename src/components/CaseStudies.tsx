'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Clock, Zap, TrendingUp, MessageSquare, Shield, Mail, Calendar, Camera, Car } from 'lucide-react';

const caseStudies = [
  {
    title: 'CZA Ben de Voorman',
    subtitle: 'AI WhatsApp Lead Qualification',
    description: 'Dutch construction company handling dozens of inquiries weekly. We built a complete dashboard with real-time chat interface, AI that scores leads 0-100, and automatic sync with Monday CRM.',
    image: '/screenshots/cza-fresh.jpg',
    stats: [
      { label: 'Response Time', value: '<2 min', before: '4-24 hrs' },
      { label: 'Time Saved', value: '13+ hrs/week', icon: Clock },
      { label: 'After-Hours Leads', value: '40%', icon: TrendingUp },
    ],
    tech: ['GPT-4.1', 'Gemini', 'WhatsApp API', 'Monday.com', 'Supabase', 'React'],
    quote: '"We used to lose jobs because we couldn\'t respond fast enough. Now leads get answers immediately."',
    author: 'Ben, Owner',
  },
  {
    title: 'SAFESITE Security',
    subtitle: 'Website Built Via Voice Notes',
    description: 'Former military bodyguard needed a corporate website. The entire site was built by talking to an AI agent via Telegram voice notes. Feedback from WhatsApp was auto-transcribed and implemented.',
    image: '/screenshots/safesite-fresh.jpg',
    stats: [
      { label: 'Build Time', value: '1 day', before: '2 weeks' },
      { label: 'Voice Notes Used', value: '50+', icon: MessageSquare },
      { label: 'Revisions', value: 'Real-time', icon: Zap },
    ],
    tech: ['Webflow', 'Claude AI', 'Telegram', 'WhatsApp Timelines API', 'Faster Whisper'],
    quote: '"That tone of voice really is Shay. Needs to look corporate professional."',
    author: 'Amir, Business Partner',
  },
  {
    title: 'Bot Farm Defense',
    subtitle: 'Automated Reputation Protection',
    description: '10 fake one-star reviews hit in one hour. AI agent analyzed all accounts, found patterns (same IP ranges, identical profiles), documented evidence, and we got all 9 fake reviews removed by Google.',
    image: '/screenshots/botfarm.jpg',
    stats: [
      { label: 'Fake Reviews', value: '9 removed', icon: Shield },
      { label: 'Analysis Time', value: '2 hours', before: '2 days' },
      { label: 'Evidence Points', value: '50+', icon: TrendingUp },
    ],
    tech: ['OSINT Analysis', 'Google Account Analysis', 'Pattern Detection', 'Automated Reporting'],
    quote: '"The chance that 9 legitimate reviewers have the exact same profile is less than 0.000001%."',
    author: 'Analysis Report',
  },
  {
    title: 'PrivaNotify',
    subtitle: 'AI-Powered Anonymous Messaging',
    description: 'SaaS platform that lets users send anonymous, AI-crafted messages about sensitive topics. Built while on the treadmill, closed a €3,000 deal via voice notes to the AI agent.',
    image: '/screenshots/privanotify-fresh.jpg',
    stats: [
      { label: 'AI Messages/Month', value: '1,000+', icon: MessageSquare },
      { label: 'Abuse Blocked', value: '100%', icon: Zap },
      { label: 'User Satisfaction', value: '98%', icon: TrendingUp },
    ],
    tech: ['Claude AI', 'Next.js', 'Twilio', 'Stripe', 'Supabase'],
    quote: '"The AI crafts messages that are caring and constructive. Exactly what we needed."',
    author: 'Hesam, Founder',
  },
  {
    title: 'LAVA Booking',
    subtitle: 'Automated Restaurant Reservations',
    description: 'Needed a dinner reservation at LAVA Fire Grill Bangkok. Sent one message to the AI agent. It opened the booking site with Puppeteer, filled the form, submitted, and returned confirmation.',
    image: '/screenshots/lava-booking.jpg',
    stats: [
      { label: 'Time to Book', value: '30 sec', before: '5 min' },
      { label: 'Manual Steps', value: '0', icon: Zap },
      { label: 'Confirmation', value: 'Instant', icon: Calendar },
    ],
    tech: ['Puppeteer', 'Browser Automation', 'Telegram', 'Form Detection'],
    quote: '"Book LAVA for tonight at 11 PM, 2 people." Done. I never even saw the website.',
    author: 'Seyed, CEO',
  },
  {
    title: 'Legal Email Automation',
    subtitle: 'Domain Dispute Resolution',
    description: 'Months-long domain dispute. Lying in bed at 10:49 PM, sent one instruction. AI searched Gmail, found the thread, identified all parties, wrote professional email with payment link, and sent it.',
    image: '/screenshots/email.jpg',
    stats: [
      { label: 'Time Spent', value: '1 min', before: '30 min' },
      { label: 'Email Written', value: 'AI', icon: Mail },
      { label: 'Follow-ups', value: 'Auto', icon: TrendingUp },
    ],
    tech: ['Gmail API', 'Claude AI', 'Thread Analysis', 'Stripe Payment Links'],
    quote: '"Find that email thread. Send them a message that I can\'t cash checks and give them this payment link."',
    author: 'Seyed, CEO',
  },
  {
    title: 'Boooth.me',
    subtitle: 'Photo Booth Rental Booking System',
    description: 'Photo booth rental company needed a complete booking system. We built a multi-step configurator: choose booth type, customize options, add extras, see VAT breakdown, and complete booking. All integrated with their operations.',
    image: '/screenshots/boooth-home-fresh.jpg',
    stats: [
      { label: 'Booth Options', value: '5+', icon: Camera },
      { label: 'Booking Steps', value: '5', icon: TrendingUp },
      { label: 'Conversion', value: '+40%', before: 'Manual quotes' },
    ],
    tech: ['Next.js', 'Stripe', 'Multi-step Forms', 'VAT Calculator', 'CRM Integration'],
    quote: '"Customers can now configure and book their perfect photo booth experience online, 24/7."',
    author: 'Client',
  },
  {
    title: 'Titan Transfers',
    subtitle: 'Limousine Booking Platform',
    description: 'Premium limousine service needed a sleek booking flow. Built a 4-step booking system: choose transfer type (one-way or hourly), set journey details, select vehicle, and confirm. Multilingual with EN/NL support.',
    image: '/screenshots/titantransfers-booking-fresh.jpg',
    stats: [
      { label: 'Booking Steps', value: '4', icon: Car },
      { label: 'Languages', value: '2', icon: Zap },
      { label: 'Mobile Ready', value: '100%', icon: TrendingUp },
    ],
    tech: ['Next.js', 'Booking Engine', 'Vehicle Selection', 'Multi-language', 'Dark Theme'],
    quote: '"Book Transfer. One-way or hourly. Airport pickups. Executive travel."',
    author: 'Titan Transfers',
  },
  {
    title: 'Appie System',
    subtitle: 'Digital Employee for Entrepreneurs',
    description: 'Multi-agent AI assistant handling scheduling, research, content, CRM, and operations. Three agents working 24/7 across time zones. The backbone of everything else on this page.',
    image: '/screenshots/team-dashboard.jpg',
    stats: [
      { label: 'Agents Working', value: '3', icon: Zap },
      { label: 'Tasks/Day', value: '50+', icon: TrendingUp },
      { label: 'Uptime', value: '99.9%', icon: Clock },
    ],
    tech: ['Claude', 'OpenClaw', 'n8n', 'Notion', 'Google Workspace', 'Tailscale'],
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
            From fighting bot farms to booking dinner reservations. See how AI agents 
            handle real tasks for real businesses.
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
                      quality={90}
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
                    - {study.author}
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
