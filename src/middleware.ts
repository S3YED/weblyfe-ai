import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Only show locale in URL for non-default
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files
  ) {
    return NextResponse.next();
  }

  // Check if user already has a locale preference cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE');
  if (localeCookie) {
    return intlMiddleware(request);
  }

  // Detect locale from various sources
  let detectedLocale = defaultLocale;

  // 1. Check Vercel's geo headers (IP-based detection)
  // Vercel sets x-vercel-ip-country header automatically
  const country = request.headers.get('x-vercel-ip-country');
  if (country === 'NL' || country === 'BE') {
    // Netherlands or Belgium -> Dutch
    detectedLocale = 'nl';
  }

  // 2. Check Accept-Language header (browser preference)
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, qValue] = lang.trim().split(';q=');
        return {
          code: code.split('-')[0].toLowerCase(), // Get base language code
          q: qValue ? parseFloat(qValue) : 1,
        };
      })
      .sort((a, b) => b.q - a.q);

    // Check if Dutch is preferred
    const prefersDutch = languages.some(
      (lang) => lang.code === 'nl' && lang.q >= 0.5
    );
    if (prefersDutch) {
      detectedLocale = 'nl';
    }
  }

  // If we detected Dutch and the path doesn't have a locale, redirect
  if (detectedLocale === 'nl' && !pathname.startsWith('/nl')) {
    const url = request.nextUrl.clone();
    url.pathname = `/nl${pathname}`;
    
    const response = NextResponse.redirect(url);
    // Set cookie so we don't redirect again
    response.cookies.set('NEXT_LOCALE', 'nl', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
    return response;
  }

  // Use the default intl middleware for everything else
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /static (static files)
  // - .*\\..*$ (files with extensions)
  matcher: ['/((?!api|_next|static|.*\\..*).*)'],
};
