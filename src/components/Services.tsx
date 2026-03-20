'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  Workflow, 
  MessageSquare, 
  Brain, 
  Target, 
  UserCog,
  Zap,
  RefreshCw,
  BarChart3,
  Moon,
  Route,
  Phone,
  BookOpen,
  Sparkles,
  Lock,
  Mail,
  Bell,
  Users,
  Plug
} from 'lucide-react';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {
      icon: Workflow,
      title: t('workflow.title'),
      headline: t('workflow.headline'),
      description: t('workflow.description'),
      benefits: [
        { icon: Zap, text: t('workflow.benefit1') },
        { icon: RefreshCw, text: t('workflow.benefit2') },
        { icon: BarChart3, text: t('workflow.benefit3') },
      ],
    },
    {
      icon: MessageSquare,
      title: t('chatbots.title'),
      headline: t('chatbots.headline'),
      description: t('chatbots.description'),
      benefits: [
        { icon: Moon, text: t('chatbots.benefit1') },
        { icon: Route, text: t('chatbots.benefit2') },
        { icon: Phone, text: t('chatbots.benefit3') },
      ],
    },
    {
      icon: Brain,
      title: t('training.title'),
      headline: t('training.headline'),
      description: t('training.description'),
      benefits: [
        { icon: BookOpen, text: t('training.benefit1') },
        { icon: Sparkles, text: t('training.benefit2') },
        { icon: Lock, text: t('training.benefit3') },
      ],
    },
    {
      icon: Target,
      title: t('crm.title'),
      headline: t('crm.headline'),
      description: t('crm.description'),
      benefits: [
        { icon: Target, text: t('crm.benefit1') },
        { icon: Mail, text: t('crm.benefit2') },
        { icon: Bell, text: t('crm.benefit3') },
      ],
    },
    {
      icon: UserCog,
      title: t('employee.title'),
      headline: t('employee.headline'),
      description: t('employee.description'),
      benefits: [
        { icon: Users, text: t('employee.benefit1') },
        { icon: Plug, text: t('employee.benefit2') },
        { icon: BarChart3, text: t('employee.benefit3') },
      ],
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F6FEFC] relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-[#247459]/5 to-transparent blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#DFB771]/10 to-transparent blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-[#247459] text-sm font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
            {t('label')}
            <span className="w-2 h-2 bg-[#DFB771] rotate-45" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#031D16] mt-4 mb-6">
            {t('title')} <span className="text-[#247459]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[#031D16]/60 max-w-2xl mx-auto text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 group relative"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#247459] to-[#0E3D31] p-3.5 mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <service.icon className="w-full h-full text-[#F6FEFC]" />
              </div>

              {/* Title */}
              <span className="text-[#247459] text-sm font-semibold uppercase tracking-wider">
                {service.title}
              </span>
              <h3 className="text-xl font-bold text-[#031D16] mt-2 mb-3">
                {service.headline}
              </h3>

              {/* Description */}
              <p className="text-[#031D16]/60 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit.text} className="flex items-center gap-3 text-sm text-[#031D16]/80">
                    <span className="w-8 h-8 rounded-lg bg-[#DFB771]/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-[#247459]" />
                    </span>
                    {benefit.text}
                  </li>
                ))}
              </ul>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-[#DFB771] to-[#FFD99A] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="card-dark p-8 bg-gradient-to-br from-[#0E3D31] to-[#031D16] flex flex-col justify-center items-center text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#DFB771]/20 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-[#DFB771]" />
            </div>
            <h3 className="text-2xl font-bold text-[#F6FEFC] mb-3">
              {t('ctaTitle')}
            </h3>
            <p className="text-[#F6FEFC]/60 mb-6">
              {t('ctaText')}
            </p>
            <a href="#book" className="btn-primary">
              {t('ctaButton')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
