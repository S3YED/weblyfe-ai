import { NextRequest, NextResponse } from 'next/server';
import { locales, type Locale } from './i18n/config';

// IP-based geolocation defaults — NL → nl, everyone else → en.
// We do NOT prefix the URL with a locale segment; next-intl reads the
// NEXT_LOCALE cookie inside `i18n/request.ts` to render the correct messages.
//
// Order of precedence:
//   1. existing NEXT_LOCALE cookie (user's explicit choice via toggle) — respected as-is
//   2. Vercel geo header `x-vercel-ip-country` — sets cookie + lets request through
//
// Static assets, API routes, and files with extensions are skipped via matcher.

const isLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function middleware(req: NextRequest) {
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  if (isLocale(cookieLocale)) {
    return NextResponse.next();
  }

  // Vercel sets `x-vercel-ip-country` automatically on prod deployments.
  // In dev / non-Vercel environments the header is absent → fall through to 'en'.
  const country = req.headers.get('x-vercel-ip-country');
  const targetLocale: Locale = country === 'NL' ? 'nl' : 'en';

  const res = NextResponse.next();
  res.cookies.set('NEXT_LOCALE', targetLocale, {
    maxAge: ONE_YEAR_SECONDS,
    path: '/',
    sameSite: 'lax',
  });
  return res;
}

export const config = {
  // Skip api, _next, _vercel, and any path with a dot (static assets like .svg, .ico, .jpg).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
