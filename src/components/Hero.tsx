'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#031D16]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#031D16] via-[#0E3D31] to-[#031D16]" />
      
      {/* Animated organic shapes */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-[#DFB771]/30 to-[#FFD99A]/20 blur-3xl"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-[#247459]/30 to-[#0E3D31]/20 blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#247459]/10 to-transparent blur-3xl"
      />

      {/* Diamond decorations */}
      <div className="absolute top-40 left-20 w-3 h-3 bg-[#DFB771] rotate-45 hidden md:block" />
      <div className="absolute bottom-40 right-32 w-2 h-2 bg-[#DFB771] rotate-45 hidden md:block" />
      <div className="absolute top-1/3 right-20 w-4 h-4 bg-[#FFD99A]/60 rotate-45 hidden md:block" />
      
      <div className="container relative z-10 text-center px-6 pt-20">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#DFB771]/40 bg-[#DFB771]/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#DFB771]" />
          <span className="text-sm text-[#DFB771] font-medium">{t('badge')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#F6FEFC] mb-6 leading-[1.1]"
        >
          {t('title1')}<br />
          <span className="text-gradient">{t('title2')}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-[#F6FEFC]/70 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {t('subtitle')}{' '}
          <span className="text-[#DFB771] font-medium">
            {t('highlight')}
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#book" 
            className="btn-primary group text-lg"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#how-it-works" 
            className="btn-secondary group text-lg"
          >
            <Play className="w-5 h-5" />
            {t('ctaSecondary')}
          </a>
        </motion.div>

        {/* Microcopy */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm text-[#F6FEFC]/50 mt-8"
        >
          {t('microcopy')}
        </motion.p>

        {/* Google Maps Rating - Trust Signal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-6"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#DFB771] text-[#DFB771]" />
            ))}
          </div>
          <span className="text-[#F6FEFC]/70 text-sm font-medium">
            5.0 on Google Maps
          </span>
          <span className="text-[#F6FEFC]/40 text-sm">
            · 50+ reviews
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[#F6FEFC]/30 rounded-full flex justify-center pt-2"
          >
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#DFB771] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical brand watermark */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="text-[#F6FEFC]/10 text-xs font-bold tracking-[0.3em] writing-mode-vertical transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
          WEBLYFE.AI
        </span>
      </div>
    </section>
  );
}
