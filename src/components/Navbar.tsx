'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t('instantAppie'), href: '#t' },
    { label: t('howItWorks'), href: '#how-it-works' },
    { label: t('pricing'), href: '#tiers' },
    { label: t('freeGuide'), href: '/guide/Build-Your-Own-Appie-v4.pdf' },
    { label: t('faq'), href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/logo-gold.svg"
              alt="Weblyfe.ai"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#F6FEFC]/80 hover:text-[#DFB771] transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
            <LanguageToggle />
            <a
              href="#book"
              className="btn-primary text-sm py-3 px-6"
            >
              {t('bookACall')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F6FEFC] p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
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
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#F6FEFC] text-2xl font-semibold hover:text-[#DFB771] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center mt-4"
              >
                {t('bookACall')}
              </a>
              <div className="mt-2 flex justify-center">
                <LanguageToggle />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-[#247459]/20 blur-3xl" />
            <div className="absolute bottom-40 right-10 w-24 h-24 rounded-full bg-[#DFB771]/20 blur-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
