import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales, type Locale } from './config';

// Resolves the active locale per request. Order of precedence:
//   1. NEXT_LOCALE cookie (explicit user choice from the language toggle)
//   2. Vercel geo header (x-vercel-ip-country) — NL → nl, others → en
//   3. defaultLocale fallback
//
// We intentionally do NOT consume the locale from the URL path; the homepage
// is locale-agnostic in routing. Pages read translations via `useTranslations`.

const isLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
  if (isLocale(cookieLocale)) {
    return {
      locale: cookieLocale,
      messages: (await import(`../../messages/${cookieLocale}.json`)).default,
    };
  }

  const country = headerStore.get('x-vercel-ip-country');
  const geoLocale: Locale = country === 'NL' ? 'nl' : 'en';
  const resolved: Locale = isLocale(geoLocale) ? geoLocale : defaultLocale;

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
