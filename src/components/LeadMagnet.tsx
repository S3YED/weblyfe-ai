'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, CheckCircle, ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';

const benefits = [
  { icon: Zap, text: '5 AI automations you can implement today' },
  { icon: Clock, text: 'Save 10+ hours per week on repetitive tasks' },
  { icon: TrendingUp, text: 'Real examples from €1M+ businesses' },
];

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // TODO: Connect to email service (ConvertKit, Mailchimp, etc.)
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_magnet_download', {
          event_category: 'conversion',
          event_label: 'ai_automation_guide',
        });
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#031D16] via-[#0E3D31] to-[#031D16] relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#DFB771]/10 blur-3xl"
      />
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-flex items-center gap-2 text-[#DFB771] text-sm font-semibold uppercase tracking-wider mb-4">
                    <Download className="w-4 h-4" />
                    Free Guide
                  </span>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    The AI Automation Playbook
                  </h2>
                  
                  <p className="text-white/70 mb-6">
                    Learn how businesses like yours are saving 20+ hours per week 
                    with AI — without hiring developers or learning to code.
                  </p>

                  <ul className="space-y-3 mb-6">
                    {benefits.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-center gap-3 text-white/80">
                        <Icon className="w-5 h-5 text-[#DFB771] flex-shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Right: Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-[#247459] rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Check your inbox!
                      </h3>
                      <p className="text-white/70">
                        The playbook is on its way. Check your spam folder if you don&apos;t see it.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === 'error') setStatus('idle');
                          }}
                          placeholder="Your email address"
                          className={`w-full px-5 py-4 rounded-xl bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#DFB771] transition-all ${
                            status === 'error' ? 'border-red-500' : 'border-white/20'
                          }`}
                        />
                        {status === 'error' && errorMsg && (
                          <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full btn-primary text-lg group disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {status === 'loading' ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <>
                            Get the Free Playbook
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <p className="text-white/40 text-xs text-center">
                        No spam. Unsubscribe anytime.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
