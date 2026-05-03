import { type NextRequest, NextResponse } from 'next/server';

const NL_COUNTRIES = new Set(['NL', 'BE', 'SR']);

export function middleware(req: NextRequest) {
  const existing = req.cookies.get('locale')?.value;
  const res = NextResponse.next();
  if (existing === 'nl' || existing === 'en') return res;

  const country = (req.headers.get('x-vercel-ip-country') ?? '').toUpperCase();
  const acceptLang = req.headers.get('accept-language') ?? '';
  const dutchByCountry = NL_COUNTRIES.has(country);
  const dutchByAccept = /(^|,)\s*nl\b/i.test(acceptLang);
  const locale = dutchByCountry || dutchByAccept ? 'nl' : 'en';

  res.cookies.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return res;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|lottie|audio|screenshots|agents|origin-arc|outcomes|logos).*)',
};
