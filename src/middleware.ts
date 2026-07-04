import { type NextRequest, NextResponse } from 'next/server';

const NL_COUNTRIES = new Set(['NL', 'BE', 'SR']);

export function middleware(req: NextRequest) {
  // Root redirect: dash.weblyfe.ai/ is the app entry, not a marketing page.
  // Logged-in (has session cookie) -> dashboard; otherwise -> login.
  // We only check cookie *presence* here (Edge runtime has no node:crypto);
  // the destination pages verify the session server-side and bounce tampered
  // or expired cookies, so this is safe.
  if (req.nextUrl.pathname === '/') {
    const hasSession = Boolean(req.cookies.get('appie_session')?.value);
    const dest = hasSession ? '/appie/dashboard' : '/appie/auth/login';
    return NextResponse.redirect(new URL(dest, req.url));
  }

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
