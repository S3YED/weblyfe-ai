'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Youtube, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/seyed.jpg', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@weblyfenl', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com/company/weblyfe', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@weblyfe.ai', label: 'Email' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services');

  const footerLinks = {
    services: [
      { label: tServices('workflow.title'), href: '#services' },
      { label: tServices('chatbots.title'), href: '#services' },
      { label: tServices('training.title'), href: '#services' },
      { label: tServices('crm.title'), href: '#services' },
      { label: tServices('employee.title'), href: '#services' },
    ],
    company: [
      { label: t('caseStudies'), href: '#case-studies' },
      { label: tNav('howItWorks'), href: '#how-it-works' },
      { label: tNav('faq'), href: '#faq' },
      { label: t('contact'), href: 'mailto:hello@weblyfe.ai' },
    ],
  };

  return (
    <footer className="bg-[#031D16] pt-20 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#247459]/30 to-transparent" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-[#247459]/5 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-6">
              <Image
                src="/logo-gold.svg"
                alt="Weblyfe.ai"
                width={160}
                height={45}
                className="h-10 w-auto"
              />
            </a>
            <p className="text-[#F6FEFC]/60 mb-6 max-w-sm leading-relaxed">
              {t('tagline')}
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0E3D31] hover:bg-[#247459] flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-[#F6FEFC]/60 group-hover:text-[#F6FEFC]" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#F6FEFC] font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-[#F6FEFC]/60 hover:text-[#DFB771] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#F6FEFC] font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-[#F6FEFC]/60 hover:text-[#DFB771] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#247459]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F6FEFC]/40 text-sm">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#F6FEFC]/40 hover:text-[#F6FEFC]/60 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#F6FEFC]/40 hover:text-[#F6FEFC]/60 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
