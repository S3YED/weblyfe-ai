'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CTA() {
  const t = useTranslations('cta');

  const benefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4'),
  ];

  return (
    <section id="final-cta" className="py-24 md:py-32 bg-gradient-to-br from-[#031D16] via-[#0E3D31] to-[#031D16] relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#DFB771]/10 blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#247459]/20 blur-3xl"
      />
      
      {/* Diamond decorations */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-[#DFB771] rotate-45 hidden md:block" />
      <div className="absolute bottom-20 right-20 w-4 h-4 bg-[#DFB771]/60 rotate-45 hidden md:block" />
      <div className="absolute top-1/2 right-10 w-2 h-2 bg-[#FFD99A] rotate-45 hidden md:block" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#DFB771]/40 bg-[#DFB771]/10 mb-8"
          >
            <Calendar className="w-4 h-4 text-[#DFB771]" />
            <span className="text-sm text-[#DFB771] font-medium">{t('badge')}</span>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F6FEFC] mb-6"
          >
            {t('title')}<br />
            <span className="text-gradient">{t('titleHighlight')}</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-[#F6FEFC]/70 max-w-2xl mx-auto mb-10"
          >
            {t('subtitle')}
          </motion.p>

          {/* Benefits */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {benefits.map((benefit) => (
              <div 
                key={benefit}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#247459]/20 border border-[#247459]/30"
              >
                <Check className="w-4 h-4 text-[#DFB771]" />
                <span className="text-[#F6FEFC]/80 text-sm">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://tidycal.com/weblyfe/discovery" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg group inline-flex"
            >
              {t('button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <p className="flex items-center justify-center gap-2 text-[#F6FEFC]/50 text-sm mt-4">
              <Clock className="w-4 h-4" />
              {t('microcopy')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
