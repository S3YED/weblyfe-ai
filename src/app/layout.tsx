import type { Metadata, Viewport } from 'next';
import { Rethink_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

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
    default: 'AI Automation for Creators & Agencies | Weblyfe.ai',
    template: '%s | Weblyfe.ai',
  },
  description:
    'We build custom AI agents, chatbots, and workflow automations that handle your leads, support, and operations 24/7. Clients save 20+ hours per week. No coding needed.',
  keywords: [
    'AI automation agency',
    'custom AI agent',
    'AI chatbot for business',
    'workflow automation',
    'AI lead qualification',
    'n8n automation',
    'digital employee',
    'AI business automation Netherlands',
    'Weblyfe',
    'OpenClaw',
    'no-code automation',
    'AI for agencies',
    'AI for creators',
  ],
  authors: [{ name: 'Weblyfe', url: 'https://weblyfe.ai' }],
  creator: 'Weblyfe by Techwiz LLC',
  publisher: 'Weblyfe by Techwiz LLC',
  category: 'Technology',
  openGraph: {
    title: 'AI Automation That Actually Works | Weblyfe.ai',
    description:
      'Custom AI chatbots, workflow automation, and digital employees for creators, agencies, and service businesses. Clients save 20+ hours per week.',
    type: 'website',
    url: 'https://weblyfe.ai',
    siteName: 'Weblyfe.ai',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Weblyfe.ai — AI Automation for Creators & Agencies',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@weblyfenl',
    creator: '@weblyfenl',
    title: 'AI Automation That Actually Works | Weblyfe.ai',
    description:
      'Custom AI agents, chatbots, and workflow automation. Save 20+ hours per week.',
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
  name: 'Weblyfe.ai',
  url: 'https://weblyfe.ai',
  logo: {
    '@type': 'ImageObject',
    url: 'https://weblyfe.ai/logo-gold.svg',
    width: 180,
    height: 60,
  },
  description:
    'Weblyfe builds custom AI agents, chatbots, and workflow automations for creators, agencies, and service businesses.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${rethinkSans.variable}`}>
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
