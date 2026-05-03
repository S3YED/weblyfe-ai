'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';
import { useI18n } from '@/i18n/I18nProvider';
import type { MessageKey } from '@/i18n/messages';

type NavLink = { labelKey: MessageKey; href: string };

const navLinks: NavLink[] = [
  { labelKey: 'nav.meet', href: '/#t-meet' },
  { labelKey: 'nav.projects', href: '/#projects' },
  { labelKey: 'nav.pricing', href: '/#tiers' },
  { labelKey: 'nav.blog', href: '/blog' },
  { labelKey: 'nav.faq', href: '/#faq' },
  { labelKey: 'nav.book', href: '/discovery-call' },
];

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => setLocale(locale === 'nl' ? 'en' : 'nl');

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#031D16]/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="Weblyfe.ai homepage">
            <Image
              src="/logo-gold.svg"
              alt="Weblyfe.ai"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                className="text-[#F6FEFC]/80 hover:text-[#DFB771] transition-colors font-medium text-sm"
              >
                {t(link.labelKey)}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={t('nav.toggleLanguageAria')}
              className="flex items-center gap-1.5 text-[#F6FEFC]/60 hover:text-[#DFB771] text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {locale === 'nl' ? 'EN' : 'NL'}
            </button>
            <a href="/#tiers" className="btn-primary text-sm py-3 px-6">
              {t('nav.cta')}
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={t('nav.toggleLanguageAria')}
              className="flex items-center gap-1 text-[#F6FEFC]/70 hover:text-[#DFB771] text-xs font-semibold uppercase tracking-widest transition-colors px-2"
            >
              <Globe className="w-3.5 h-3.5" />
              {locale === 'nl' ? 'EN' : 'NL'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#F6FEFC] p-2"
              aria-label={isMobileMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#031D16] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#F6FEFC] text-2xl font-semibold hover:text-[#DFB771] transition-colors"
                >
                  {t(link.labelKey)}
                </a>
              ))}
              <a
                href="/#tiers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center mt-4"
              >
                {t('nav.cta')}
              </a>
            </div>
            <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-[#247459]/20 blur-3xl" />
            <div className="absolute bottom-40 right-10 w-24 h-24 rounded-full bg-[#DFB771]/20 blur-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
