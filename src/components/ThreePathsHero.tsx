'use client';

import { motion } from 'framer-motion';
import { Download, ArrowRight, Zap, Users, Wrench, MessageSquare, Bot, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ThreePathsHero() {
  return (
    <section className="relative min-h-screen bg-[#031D16] flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow accents */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#247459] blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#DFB771] blur-[120px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="inline-flex items-center gap-2 text-[#DFB771] text-sm font-semibold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#DFB771] animate-pulse" />
            By Seyed Hosseini · Weblyfe.ai
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F6FEFC] leading-[1.05] tracking-tight mb-6"
        >
          Your own 24/7
          <br />
          <span className="text-[#DFB771]">AI employee.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#F6FEFC]/60 text-lg md:text-xl max-w-xl mb-4 leading-relaxed"
        >
          Built for OpenClaw and Hermes Agent. Powered by MiniMax M2.7.
          From absolute beginner to expert — step by step.
        </motion.p>

        {/* Download badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-[#F6FEFC]/40 text-xs">Free guide v4.4</span>
          <span className="px-3 py-1 bg-[#DFB771]/10 border border-[#DFB771]/20 rounded-full text-[#DFB771] text-xs font-semibold">
            Updated April 2026
          </span>
        </motion.div>

        {/* Three Paths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-12"
        >
          <p className="text-[#F6FEFC]/40 text-sm uppercase tracking-widest mb-5 font-semibold">
            Three ways to get your Appie
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Path 1: DIY */}
            <div className="group relative bg-[#0E3D31]/60 border border-[#247459]/30 rounded-2xl p-6 hover:border-[#247459]/60 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-[#247459]/20 border border-[#247459]/30 flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5 text-[#247459]" />
              </div>
              <h3 className="text-[#F6FEFC] font-bold text-lg mb-1">Build it yourself</h3>
              <p className="text-[#F6FEFC]/50 text-sm mb-4 leading-relaxed">
                Step-by-step guide. Copy/paste templates. Everything you need to build your own.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#DFB771] font-bold">Free guide</span>
                <Link href="#guide" className="text-[#F6FEFC]/40 hover:text-[#DFB771] transition-colors">
                  <Download className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Path 2: Instant Appie */}
            <div className="group relative bg-gradient-to-b from-[#247459]/20 to-[#0E3D31]/60 border border-[#DFB771]/40 rounded-2xl p-6 hover:border-[#DFB771]/70 transition-all hover:-translate-y-1 shadow-lg shadow-[#DFB771]/5">
              <div className="absolute -top-3 left-4 px-3 py-1 bg-[#DFB771] rounded-full text-[#031D16] text-xs font-bold uppercase tracking-wide">
                Most popular
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#DFB771]/20 border border-[#DFB771]/30 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5 text-[#DFB771]" />
              </div>
              <h3 className="text-[#F6FEFC] font-bold text-lg mb-1">Rent an Appie</h3>
              <p className="text-[#F6FEFC]/50 text-sm mb-4 leading-relaxed">
                We build and manage everything. Your own AI employee, deployed in 24 hours.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#DFB771] font-bold">€250<span className="text-[#F6FEFC]/40 text-sm font-normal">/mo</span></span>
                <Link href="#instant" className="text-[#F6FEFC]/40 hover:text-[#DFB771] transition-colors flex items-center gap-1 text-sm">
                  Get started <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Path 3: High-ticket */}
            <div className="group relative bg-[#0E3D31]/60 border border-[#247459]/30 rounded-2xl p-6 hover:border-[#247459]/60 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-[#F6FEFC]/5 border border-[#F6FEFC]/10 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-[#F6FEFC]/60" />
              </div>
              <h3 className="text-[#F6FEFC] font-bold text-lg mb-1">Custom build</h3>
              <p className="text-[#F6FEFC]/50 text-sm mb-4 leading-relaxed">
                Full agency setup. Custom automations. Dedicated support and consulting.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[#F6FEFC]/60 text-sm">From €2,500</span>
                <Link href="#contact" className="text-[#F6FEFC]/40 hover:text-[#F6FEFC] transition-colors flex items-center gap-1 text-sm">
                  Let&apos;s talk <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-6 text-[#F6FEFC]/30 text-xs"
        >
          <span className="flex items-center gap-2">
            <Bot className="w-3.5 h-3.5" /> OpenClaw + Hermes Agent
          </span>
          <span>·</span>
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> 55+ Skills included
          </span>
          <span>·</span>
          <span className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" /> UFW + Tailscale secured
          </span>
          <span>·</span>
          <span className="flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5" /> Telegram + WhatsApp
          </span>
        </motion.div>

      </div>
    </section>
  );
}
