'use client';

import { motion } from 'framer-motion';
import { Phone, FileText, Rocket, TrendingUp, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      icon: Phone,
      number: '01',
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      icon: FileText,
      number: '02',
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      icon: Rocket,
      number: '03',
      title: t('step3.title'),
      description: t('step3.description'),
    },
    {
      icon: TrendingUp,
      number: '04',
      title: t('step4.title'),
      description: t('step4.description'),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#031D16] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F6FEFC] to-transparent opacity-5" />
      <div className="absolute top-40 left-0 w-96 h-96 rounded-full bg-[#247459]/10 blur-3xl" />
      <div className="absolute bottom-40 right-0 w-80 h-80 rounded-full bg-[#DFB771]/5 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-[#DFB771] text-sm font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
            {t('label')}
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F6FEFC] mt-4 mb-6">
            {t('title')} <span className="text-[#DFB771]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[#F6FEFC]/60 max-w-2xl mx-auto text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#247459] to-transparent" />
              )}
              
              <div className="card-dark p-8 bg-[#0E3D31]/50 border border-[#247459]/20 relative group hover:border-[#DFB771]/30 transition-colors h-full flex flex-col">
                {/* Number badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#DFB771] flex items-center justify-center font-bold text-[#031D16]">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#247459]/20 flex items-center justify-center mb-6 group-hover:bg-[#247459]/30 transition-colors flex-shrink-0">
                  <step.icon className="w-8 h-8 text-[#DFB771]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#F6FEFC] mb-3 flex-shrink-0">
                  {step.title}
                </h3>
                <p className="text-[#F6FEFC]/60 leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="#book" 
            className="btn-primary text-lg group inline-flex"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
