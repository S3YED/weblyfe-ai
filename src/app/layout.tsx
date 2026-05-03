import type { Metadata, Viewport } from 'next';
import { Rethink_Sans } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import { I18nProvider } from '@/i18n/I18nProvider';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/i18n/messages';

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-rethink',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#031D16',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://weblyfe.ai'),
  title: {
    default: 'Appie - Jouw persoonlijke Techwiz | Weblyfe.ai',
    template: '%s | Weblyfe.ai',
  },
  description:
    'Hoi, ik ben Appie. Jouw persoonlijke Techwiz - een geniale werknemer met de laagste kosten. Ik doe het werk dat je week opvreet: inbox, intake, agenda, admin. Bouw zelf vanaf €65 of kies Instant Appie vanaf €250/mo.',
  keywords: [
    'Techwiz',
    'persoonlijke AI',
    'AI medewerker Nederland',
    'AI agent voor MKB',
    'workflow automation',
    'AI lead qualification',
    'WhatsApp intake',
    'n8n automation',
    'OpenClaw',
    'Weblyfe',
    'AI voor agencies',
    'AI voor creators',
    'digitale werknemer',
    'inbox automation',
  ],
  authors: [{ name: 'Weblyfe', url: 'https://weblyfe.ai' }],
  creator: 'Weblyfe by Techwiz LLC',
  publisher: 'Weblyfe by Techwiz LLC',
  category: 'Technology',
  openGraph: {
    title: 'Appie - Jouw persoonlijke Techwiz | Weblyfe.ai',
    description:
      'Een geniale werknemer met de laagste kosten - die het werk doet dat je week opvreet. Bouw zelf vanaf €65 of kies Instant Appie vanaf €250/mo.',
    type: 'website',
    url: 'https://weblyfe.ai',
    siteName: 'Weblyfe.ai',
    locale: 'nl_NL',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/agents/appie-iconic.png',
        width: 1408,
        height: 768,
        alt: 'Appie - jouw persoonlijke Techwiz',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@weblyfenl',
    creator: '@weblyfenl',
    title: 'Appie - Jouw persoonlijke Techwiz | Weblyfe.ai',
    description:
      'Een geniale werknemer met de laagste kosten. Inbox, intake, agenda, admin - Appie pakt het op.',
    images: ['/agents/appie-iconic.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://weblyfe.ai',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  verification: {
    // Add Google Search Console / Bing verif tokens here when ready
    // google: 'xxx',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://weblyfe.ai/#organization',
  name: 'Weblyfe.ai',
  url: 'https://weblyfe.ai',
  logo: {
    '@type': 'ImageObject',
    url: 'https://weblyfe.ai/logo-gold.svg',
    width: 180,
    height: 60,
  },
  description:
    'Weblyfe bouwt persoonlijke Techwizes - geniale digitale werknemers met de laagste kosten - voor creators, agencies en service businesses.',
  foundingDate: '2022',
  areaServed: 'Worldwide',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'hello@weblyfe.ai',
    availableLanguage: ['English', 'Dutch'],
  },
  sameAs: [
    'https://instagram.com/seyed.jpg',
    'https://youtube.com/@weblyfenl',
    'https://linkedin.com/company/weblyfe',
    'https://weblyfe.nl',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://weblyfe.ai/#website',
  url: 'https://weblyfe.ai',
  name: 'Weblyfe.ai',
  description: 'AI Automation for Creators & Agencies',
  publisher: { '@id': 'https://weblyfe.ai/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://weblyfe.ai/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  const locale: Locale = (LOCALES as readonly string[]).includes(cookieLocale ?? '')
    ? (cookieLocale as Locale)
    : DEFAULT_LOCALE;
  return (
    <html lang={locale} className={`scroll-smooth ${rethinkSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`antialiased ${rethinkSans.className}`}>
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
