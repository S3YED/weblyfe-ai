// i18n configuration — single source of truth for locales.
// Default flipped to `nl` since NL traffic is primary; geo-detect promotes
// non-NL visitors to `en` via middleware.

export const locales = ['nl', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'nl';

export const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  nl: '🇳🇱',
  en: '🇬🇧',
};
