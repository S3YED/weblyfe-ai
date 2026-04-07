'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const caseStudies = [
  {
    id: 'boooth',
    name: 'Boooth',
    tagline: 'AI-powered event booking for corporate branding',
    description:
      'An AI package configurator that recommends optimal event packages based on guest count, venue, and brand goals. Instant quotes, portfolio showcase, and automated follow-ups.',
    results: [
      { label: 'Manual quotes', value: '→ Instant booking' },
      { label: 'Time to quote', value: '48h → 2 min' },
      { label: 'Repositioned as', value: 'Strategic branding tool' },
    ],
    image: '/case-studies/boooth-main-fresh.png',
    screenshot: '/case-studies/booth-me.png',
    url: 'https://booking.booth.me',
    tags: ['AI Configurator', 'Event Booking', 'Webflow'],
    color: '#6366F1',
  },
  {
    id: 'lps-pilates',
    name: 'LPS Pilates',
    tagline: 'Smart scheduling for a boutique Reformer studio',
    description:
      'SimplyBook.me-powered booking with AI scheduling optimization, membership automation, and client re-engagement campaigns that run on autopilot.',
    results: [
      { label: 'Admin hours', value: '→ 15 min/week' },
      { label: 'First-timers', value: 'Seamless first booking' },
      { label: 'No-show rate', value: '↓ via smart reminders' },
    ],
    image: '/case-studies/lps-pilates-weblyfe-cdn.avif',
    screenshot: '/case-studies/lps-pilates.png',
    url: 'https://lpspilates.nl',
    tags: ['AI Scheduling', 'Memberships', 'Wellness'],
    color: '#EC4899',
  },
  {
    id: 'titan-transfers',
    name: 'Titan Transfers',
    tagline: 'Dynamic pricing & route optimization for luxury transport',
    description:
      'Instant booking platform for premium chauffeur services across Belgium and Netherlands. AI route optimization, dynamic pricing, and real-time fleet management.',
    results: [
      { label: 'Quote turnaround', value: '48h → Instant' },
      { label: 'Premium positioning', value: 'vs. generic taxis' },
      { label: 'Multi-country', value: 'BE + NL coverage' },
    ],
    image: '/case-studies/titan-transfers-weblyfe-cdn.avif',
    screenshot: '/case-studies/titan-transfers.png',
    url: 'https://book.titantransfers.be',
    tags: ['Route AI', 'Dynamic Pricing', 'Luxury Transport'],
    color: '#F59E0B',
  },
  {
    id: 'weblyfe',
    name: 'Weblyfe',
    tagline: 'Full-stack AI infrastructure for a digital agency',
    description:
      'Complete AI agent infrastructure powering a digital agency. 4 deployed AI employees handling scheduling, content, Stripe billing, and client onboarding — 24/7.',
    results: [
      { label: 'AI employees deployed', value: '4 simultaneous' },
      { label: 'Annual savings', value: '~$140K in labor' },
      { label: 'Client satisfaction', value: '↑ NPS +34 pts' },
    ],
    image: '/case-studies/weblyfe-nl-fresh.png',
    url: 'https://weblyfe.ai',
    tags: ['AI Agents', 'Agency Automation', 'Multi-agent'],
    color: '#10B981',
  },
];

export default function CaseStudies() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex(prev => (prev + 1) % caseStudies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => {
    setDirection(-1);
    setIndex(prev => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const next = () => {
    setDirection(1);
    setIndex(prev => (prev + 1) % caseStudies.length);
  };

  const cs = caseStudies[index];

  return (
    <section className="py-24 bg-[#031D16] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-[#247459] text-sm font-semibold uppercase tracking-widest mb-3">Our work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC]">Case studies</h2>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={cs.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4 }}
              className="bg-[#1a2e27]/50 rounded-2xl border border-[#247459]/20 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image side */}
                <div className="relative lg:w-1/2 h-64 lg:h-auto">
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${cs.color}22, #031D16)` }}
                  >
                    {cs.image.endsWith('.avif') ? (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${cs.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          opacity: 0.5,
                        }}
                      />
                    ) : (
                      <Image
                        src={cs.image}
                        alt={cs.name}
                        fill
                        className="object-cover"
                        style={{ opacity: 0.6 }}
                      />
                    )}
                  </div>
                  <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cs.tags.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full border border-[#247459]/30 text-[#F6FEFC]/60">{tag}</span>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1">{cs.name}</h3>
                      <p className="text-sm text-[#F6FEFC]/50">{cs.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[#F6FEFC]/70 text-sm leading-relaxed mb-6">{cs.description}</p>
                    <div className="space-y-3 mb-6">
                      {cs.results.map(r => (
                        <div key={r.label} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cs.color }} />
                          <div className="flex-1">
                            <span className="text-[#F6FEFC]/50 text-xs">{r.label}</span>
                            <span className="text-[#F6FEFC] text-sm font-semibold ml-2">{r.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {cs.url && (
                      <a
                        href={cs.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#F6FEFC]/60 hover:text-[#F6FEFC] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {cs.url.replace('https://', '')}
                      </a>
                    )}
                    <div className="flex gap-2">
                      <button onClick={prev} className="w-9 h-9 rounded-full border border-[#247459]/30 flex items-center justify-center text-[#F6FEFC]/60 hover:border-[#247459]/60 hover:text-[#F6FEFC] transition-colors" aria-label="Previous">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={next} className="w-9 h-9 rounded-full border border-[#247459]/30 flex items-center justify-center text-[#F6FEFC]/60 hover:border-[#247459]/60 hover:text-[#F6FEFC] transition-colors" aria-label="Next">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.id}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-[#DFB771]' : 'w-1.5 bg-[#247459]/40'}`}
              aria-label={`Go to ${cs.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
