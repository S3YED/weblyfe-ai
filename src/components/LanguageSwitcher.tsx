'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeFlags, localeNames, type Locale } from '@/i18n/config';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname if present
    let newPath = pathname;
    
    // If current path starts with /nl, remove it
    if (pathname.startsWith('/nl')) {
      newPath = pathname.replace('/nl', '') || '/';
    }
    
    // If switching to Dutch, add /nl prefix
    if (newLocale === 'nl') {
      newPath = `/nl${newPath === '/' ? '' : newPath}`;
    }

    // Set cookie for preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-[#F6FEFC]/80 hover:text-[#F6FEFC]"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">
          {localeFlags[locale as Locale]} {localeNames[locale as Locale]}
        </span>
        <span className="text-sm font-medium sm:hidden">
          {localeFlags[locale as Locale]}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-[#0E3D31] border border-[#247459]/30 shadow-xl overflow-hidden z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                loc === locale
                  ? 'bg-[#247459]/30 text-[#DFB771]'
                  : 'text-[#F6FEFC]/80 hover:bg-[#247459]/20 hover:text-[#F6FEFC]'
              }`}
            >
              <span className="text-lg">{localeFlags[loc]}</span>
              <span className="font-medium">{localeNames[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
