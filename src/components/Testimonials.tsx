'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ben van der Berg',
    role: 'Owner, CZA Bouwbedrijf',
    quote: 'We used to lose jobs because we couldn\'t respond fast enough. Now leads get answers immediately, even at midnight.',
    rating: 5,
    avatar: '👷',
  },
  {
    name: 'Hesam M.',
    role: 'Founder, PrivaNotify',
    quote: 'The AI crafts messages that are caring and constructive. It\'s exactly what our sensitive use case needed.',
    rating: 5,
    avatar: '🚀',
  },
  {
    name: 'Lisa Jansen',
    role: 'Agency Owner',
    quote: 'Saved me 15+ hours a week on client communication. The automation pays for itself 10x over.',
    rating: 5,
    avatar: '💼',
  },
  {
    name: 'Mark de Vries',
    role: 'E-commerce Founder',
    quote: 'Customer support used to keep me up at night. Now the AI handles 90% of tickets automatically.',
    rating: 5,
    avatar: '🛒',
  },
  {
    name: 'Sarah Chen',
    role: 'Consultant',
    quote: 'The lead qualification bot books meetings for me while I sleep. Game changer for my consulting practice.',
    rating: 5,
    avatar: '📊',
  },
  {
    name: 'David Pietersen',
    role: 'SaaS Founder',
    quote: 'Weblyfe didn\'t just build a chatbot — they understood our business and built something that actually fits.',
    rating: 5,
    avatar: '💡',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#031D16] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#247459]/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#DFB771]/5 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#DFB771] text-sm font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
            Testimonials
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F6FEFC] mt-4 mb-6">
            What Our <span className="text-[#DFB771]">Clients Say</span>
          </h2>
          <p className="text-[#F6FEFC]/60 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it — hear from the founders and teams 
            who&apos;ve transformed their businesses with AI.
          </p>
        </motion.div>

        {/* Google Reviews Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0E3D31] border border-[#247459]/30">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#DFB771] text-[#DFB771]" />
              ))}
            </div>
            <span className="text-[#F6FEFC] font-semibold">5.0</span>
            <span className="text-[#F6FEFC]/60 text-sm">on Google Reviews</span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-dark p-6 bg-[#0E3D31]/50 border border-[#247459]/20 relative group"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#DFB771]/20 group-hover:text-[#DFB771]/40 transition-colors" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#DFB771] text-[#DFB771]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#F6FEFC]/80 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#247459]/30 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-[#F6FEFC] font-semibold">{testimonial.name}</div>
                  <div className="text-[#F6FEFC]/50 text-sm">{testimonial.role}</div>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-[#DFB771] to-[#FFD99A] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
