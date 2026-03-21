'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, ExternalLink } from 'lucide-react';

// Testimonials data (from case studies + projects)
const testimonials = [
  {
    name: "Ben",
    company: "CZA Bouwbedrijf",
    role: "Owner",
    quote: "We used to lose jobs because we couldn't respond fast enough. Now leads get answers immediately.",
    project: "AI WhatsApp Lead Qualification",
    rating: 5,
    avatar: "/screenshots/cza-fresh.jpg"
  },
  {
    name: "Shay",
    company: "SAFESITE Security",
    role: "Founder", 
    quote: "I just talked about what I needed. Next morning, the website was live.",
    project: "Voice-to-Website",
    rating: 5,
    avatar: "/screenshots/safesite-hero.jpg"
  },
  {
    name: "Hesam",
    company: "PrivaNotify",
    role: "Founder",
    quote: "The AI crafts messages that are caring and constructive. Exactly what we needed.",
    project: "AI Anonymous Messaging SaaS",
    rating: 5,
    avatar: "/screenshots/privanotify-hero.jpg"
  },
  {
    name: "Dubai Property Team",
    company: "Dubai Property",
    role: "Team",
    quote: "Eva handles what used to take 3 people. Website updates, lead follow-ups, reporting: all automated.",
    project: "AI Operations Manager",
    rating: 5,
    avatar: "/images/clients/67d557d164b93f2ad6f75ae3_Dubai%20Property.avif"
  },
  {
    name: "Christian LeBlanc",
    company: "Lost LeBlanc",
    role: "Creator",
    quote: "Weblyfe crafted a bold and vibrant website that inspires creators to build lasting success.",
    project: "Full Service Website",
    rating: 5,
    avatar: "/images/clients/67607185e920f466a0f743e3_Lost%20LeBlanc.avif"
  },
  {
    name: "Kosso",
    company: "BeyondSchool",
    role: "Founder",
    quote: "Weblyfe delivered a complete solution: bold branding, engaging web development, and smart automations.",
    project: "Full Service",
    rating: 5,
    avatar: "/images/clients/670b899e08151b0e8126c356_BeyondSchool.avif"
  },
];

export default function GoogleReviews() {
  return (
    <section className="py-16 sm:py-24 bg-[#031D16] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-80 h-80 rounded-full bg-[#DFB771]/5 blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full bg-[#247459]/10 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#DFB771] text-[#DFB771]" />
              ))}
            </div>
            <span className="text-2xl font-bold text-[#F6FEFC]">5.0</span>
            <span className="text-[#F6FEFC]/50">on Google</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6FEFC] mb-4"
          >
            What Our Clients Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#F6FEFC]/60 max-w-2xl mx-auto"
          >
            Real results from real businesses. See why entrepreneurs trust Weblyfe.ai for their AI automation needs.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0E3D31]/40 border border-[#247459]/20 rounded-2xl p-6 hover:bg-[#0E3D31]/60 transition-colors"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#DFB771] text-[#DFB771]" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-[#F6FEFC]/80 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden relative bg-[#247459]/20">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-[#F6FEFC] font-medium">{testimonial.name}</div>
                  <div className="text-[#F6FEFC]/50 text-sm">{testimonial.company}</div>
                </div>
              </div>
              
              {/* Project tag */}
              <div className="mt-4 pt-4 border-t border-[#247459]/20">
                <span className="text-xs text-[#DFB771]">{testimonial.project}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://maps.app.goo.gl/bEjMyLjaaiZweryN8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#DFB771] hover:text-[#FFD99A] transition-colors"
          >
            See all reviews on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
