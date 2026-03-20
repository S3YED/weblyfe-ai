'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, Loader2, BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LeadMagnet() {
  const t = useTranslations('leadMagnet');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const benefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call - replace with actual email service integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Integrate with ConvertKit/Mailchimp
    console.log('Email captured:', email);
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0E3D31] to-[#031D16] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#DFB771]/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-[#247459]/20 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DFB771]/20 text-[#DFB771] text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4" />
                {t('badge')}
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC] mb-4">
                {t('title')}
              </h2>
              
              <p className="text-[#F6FEFC]/60 mb-6">
                {t('subtitle')}
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-6">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-[#F6FEFC]/80">
                    <span className="w-5 h-5 rounded-full bg-[#DFB771]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#DFB771]" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-[#247459]/20"
            >
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#247459]/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#DFB771]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F6FEFC] mb-2">Check your inbox!</h3>
                  <p className="text-[#F6FEFC]/60">The playbook is on its way.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('placeholder')}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#247459]/30 text-[#F6FEFC] placeholder-[#F6FEFC]/40 focus:outline-none focus:border-[#DFB771]/50 transition-colors"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full btn-primary justify-center disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        {t('cta')}
                      </>
                    )}
                  </button>

                  <p className="text-xs text-[#F6FEFC]/40 text-center">
                    {t('privacy')}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
