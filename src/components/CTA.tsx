'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section id="book" className="py-24 bg-[#050508] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Free 30-Minute Strategy Call</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Put Your Business on{' '}
            <span className="text-gradient">Autopilot?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-10">
            Book a free call. We&apos;ll show you exactly how AI can save you 20+ hours 
            per week — tailored to your specific business.
          </p>

          {/* What you get */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 text-sm">✓</span>
              </div>
              <span className="text-gray-300">Custom automation audit</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 text-sm">✓</span>
              </div>
              <span className="text-gray-300">ROI projection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 text-sm">✓</span>
              </div>
              <span className="text-gray-300">No obligations</span>
            </div>
          </div>

          {/* CTA Button */}
          <a 
            href="https://cal.com/weblyfe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 text-lg group"
          >
            <Calendar className="w-5 h-5" />
            Book Your Free Strategy Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Trust signal */}
          <p className="text-sm text-gray-500 mt-6">
            Join 50+ businesses already automating their growth
          </p>
        </motion.div>
      </div>
    </section>
  );
}
