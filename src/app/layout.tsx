import type { Metadata, Viewport } from 'next';
import { Rethink_Sans, Geist } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-rethink',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://weblyfe.ai'),
  title: {
    default: 'Appie — Jouw persoonlijke Techwiz | Weblyfe.ai',
    template: '%s | Weblyfe.ai',
  },
  description:
    'Hoi, ik ben Appie. Jouw persoonlijke Techwiz. Een geniale werknemer met de laagste kosten — ik doe het werk dat je week opvreet. Inbox, intake, agenda, admin. Vanaf €65.',
  keywords: [
    'Appie',
    'Techwiz',
    'AI medewerker',
    'AI employee',
    'AI agent Nederland',
    'persoonlijke AI assistent',
    'inbox automation',
    'lead intake',
    'WhatsApp AI agent',
    'OpenClaw',
    'Weblyfe',
    'Build Your Own Appie',
    'Instant Appie',
  ],
  authors: [{ name: 'Weblyfe', url: 'https://weblyfe.ai' }],
  creator: 'Weblyfe',
  publisher: 'Weblyfe',
  category: 'Technology',
  openGraph: {
    title: 'Appie — Jouw persoonlijke Techwiz | Weblyfe.ai',
    description:
      'Een geniale werknemer met de laagste kosten. Inbox, intake, agenda, admin — Appie doet het werk dat je week opvreet, jij bouwt verder.',
    type: 'website',
    url: 'https://weblyfe.ai',
    siteName: 'Weblyfe.ai',
    locale: 'nl_NL',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Appie — Jouw persoonlijke Techwiz | Weblyfe.ai',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@weblyfenl',
    creator: '@seyed_txt',
    title: 'Appie — Jouw persoonlijke Techwiz',
    description:
      'Een geniale werknemer met de laagste kosten. Vanaf €65 zelf bouwen, of €250/mnd volledig managed.',
    images: ['/og-image.jpg'],
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
  name: 'Weblyfe',
  url: 'https://weblyfe.ai',
  logo: {
    '@type': 'ImageObject',
    url: 'https://weblyfe.ai/logo-gold.svg',
    width: 180,
    height: 60,
  },
  description:
    'Weblyfe builds Appie — a personal Techwiz that handles your inbox, intake, scheduling and admin. Built and run by Weblyfe in the Netherlands.',
  foundingDate: '2019',
  areaServed: 'Worldwide',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'hello@weblyfe.ai',
    availableLanguage: ['Dutch', 'English'],
  },
  sameAs: [
    'https://instagram.com/seyed.jpg',
    'https://www.linkedin.com/in/seyed-hosseini-1a077289/',
    'https://x.com/seyed_txt',
    'https://youtube.com/@weblyfenl',
    'https://weblyfe.nl',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://weblyfe.ai/#website',
  url: 'https://weblyfe.ai',
  name: 'Weblyfe.ai',
  description: 'Appie — Jouw persoonlijke Techwiz',
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
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={cn("scroll-smooth", rethinkSans.variable, "font-sans", geist.variable)}>
      <head>
        <meta name="theme-color" content="#031D16" />
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
