'use client';

import { motion } from 'framer-motion';
import { Lock, Bell, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function PricingBlur() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    console.log('Pricing notify:', email);
    setSubmitted(true);
  }

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#F6FEFC] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#247459] text-sm font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
            Pricing
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#031D16] mt-4 mb-6">
            Plans & <span className="text-[#247459]">Pricing</span>
          </h2>
          <p className="text-[#031D16]/60 max-w-2xl mx-auto text-lg">
            Simple, transparent pricing for every stage of your business.
          </p>
        </motion.div>

        {/* Blurred Pricing Cards */}
        <div className="relative">
          {/* Fake blurred cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto filter blur-md select-none pointer-events-none" aria-hidden="true">
            {['Starter', 'Growth', 'Enterprise'].map((name, i) => (
              <div key={name} className="bg-white rounded-2xl p-8 border border-[#031D16]/10 shadow-lg">
                <p className="text-sm font-semibold text-[#247459] uppercase tracking-wider">{name}</p>
                <p className="text-5xl font-bold text-[#031D16] mt-4 mb-2">
                  €{i === 0 ? '2,500' : i === 1 ? '4,900' : '9,500'}
                </p>
                <p className="text-[#031D16]/40 text-sm mb-6">one-time setup</p>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="h-4 bg-[#031D16]/5 rounded-full" style={{ width: `${60 + j * 7}%` }} />
                  ))}
                </div>
                <div className="mt-8 h-12 bg-[#247459] rounded-xl" />
              </div>
            ))}
          </div>

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 md:p-14 shadow-2xl border border-[#031D16]/10 text-center max-w-lg">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#247459] to-[#0E3D31] flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Lock className="w-8 h-8 text-[#F6FEFC]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#031D16] mb-3">
                Pricing Coming Soon
              </h3>
              <p className="text-[#031D16]/60 mb-8 leading-relaxed">
                We&apos;re finalizing our launch packages. Sign up to get notified and unlock{' '}
                <span className="text-[#247459] font-semibold">exclusive early-bird pricing</span>.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3.5 rounded-xl bg-[#F6FEFC] border border-[#031D16]/10 text-[#031D16] placeholder-[#031D16]/30 text-sm focus:outline-none focus:border-[#247459] focus:ring-2 focus:ring-[#247459]/10 transition-all"
                  />
                  <button type="submit" className="btn-primary text-sm whitespace-nowrap">
                    <Bell className="w-4 h-4" />
                    Notify Me
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#247459]/10 border border-[#247459]/20 max-w-sm mx-auto">
                  <div className="w-6 h-6 rounded-full bg-[#247459] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[#031D16] font-medium text-sm">You&apos;re on the list!</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
