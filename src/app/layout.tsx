import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://weblyfe.ai'),
  title: {
    default: 'AI Automation for Creators & Agencies | Weblyfe.ai',
    template: '%s | Weblyfe.ai',
  },
  description: 'We build AI systems that handle your leads, support, and operations 24/7. Custom chatbots, workflow automation, and digital employees. No coding needed.',
  keywords: [
    'AI automation',
    'custom chatbot',
    'AI for small business',
    'workflow automation',
    'AI lead qualification',
    'n8n automation',
    'digital employee',
    'AI business automation',
    'Weblyfe',
    'no-code automation',
    'OpenClaw',
    'AI assistant',
    'business automation',
    'WhatsApp bot',
    'Telegram bot',
    'AI agency',
    'Dutch AI company',
  ],
  authors: [{ name: 'Weblyfe.ai', url: 'https://weblyfe.ai' }],
  creator: 'Weblyfe.ai',
  publisher: 'Weblyfe.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AI Automation That Actually Works | Weblyfe.ai',
    description: 'Custom AI chatbots, workflow automation, and digital employees for creators, agencies, and service businesses.',
    type: 'website',
    url: 'https://weblyfe.ai',
    siteName: 'Weblyfe.ai',
    locale: 'en_US',
    alternateLocale: 'nl_NL',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Weblyfe.ai - AI Automation Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation That Actually Works | Weblyfe.ai',
    description: 'Custom AI chatbots, workflow automation, and digital employees.',
    images: ['/og-image.jpg'],
    creator: '@seyedjpg',
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
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: 'mOzmrISDHb-uo3ODrholfcvz_a1CyCfz4HfKh31UeY4',
  },
  alternates: {
    canonical: 'https://weblyfe.ai',
    languages: {
      'en': 'https://weblyfe.ai',
      'nl': 'https://weblyfe.ai/nl',
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
