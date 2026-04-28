'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { locales, localeFlags, type Locale } from '@/i18n/config';

// Tiny flag-button toggle that flips the NEXT_LOCALE cookie and reloads.
// Cookie write is direct (document.cookie); the next-intl request handler
// reads the new value on the subsequent request.

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const flipLocale = (current: Locale): Locale => (current === 'nl' ? 'en' : 'nl');

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const handleSwitch = () => {
    const next = flipLocale(currentLocale);
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
    startTransition(() => {
      window.location.reload();
    });
  };

  // Show the OTHER language as the click target — the language you'd switch to.
  const targetLocale = flipLocale(currentLocale);
  const targetLabel = targetLocale.toUpperCase();
  const targetFlag = localeFlags[targetLocale];

  return (
    <button
      type="button"
      onClick={handleSwitch}
      disabled={isPending}
      aria-label={`Switch to ${targetLabel}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#247459]/40 bg-[#247459]/10 text-[#F6FEFC]/80 hover:text-[#DFB771] hover:border-[#DFB771]/40 transition-colors text-xs font-semibold disabled:opacity-60 ${className}`}
    >
      <span aria-hidden="true">{targetFlag}</span>
      <span>{targetLabel}</span>
    </button>
  );
}

// Sanity check at module-load time: locales array shape matches our flip helper.
// (Compile-time only — strips in production via dead-code elimination.)
if (process.env.NODE_ENV !== 'production') {
  if (locales.length !== 2) {
    console.warn(
      '[LanguageToggle] expected exactly 2 locales for binary flip; got',
      locales.length
    );
  }
}
