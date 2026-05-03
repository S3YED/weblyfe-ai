'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { LOCALES, messages, DEFAULT_LOCALE, type Locale, type MessageKey } from './messages';

type I18n = {
  locale: Locale;
  t: (key: MessageKey) => string;
  setLocale: (l: Locale) => void;
};

const I18nContext = createContext<I18n>({
  locale: DEFAULT_LOCALE,
  t: (k) => messages[DEFAULT_LOCALE][k] ?? k,
  setLocale: () => {},
});

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((l: Locale) => {
    if (!LOCALES.includes(l)) return;
    setLocaleState(l);
    if (typeof document !== 'undefined') {
      document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.lang = l;
    }
  }, []);

  const t = useCallback(
    (key: MessageKey) => messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key,
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18n {
  return useContext(I18nContext);
}
