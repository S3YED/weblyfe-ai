import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Automation for Creators & Agencies | Weblyfe.ai',
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
  ],
  openGraph: {
    title: 'AI Automation That Actually Works | Weblyfe.ai',
    description: 'Custom AI chatbots, workflow automation, and digital employees for creators, agencies, and service businesses.',
    type: 'website',
    url: 'https://weblyfe.ai',
    siteName: 'Weblyfe.ai',
    images: [
      {
        url: 'https://weblyfe.ai/og-image.jpg',
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
    images: ['https://weblyfe.ai/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#031D16" />
        <link rel="canonical" href="https://weblyfe.ai" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Weblyfe.ai',
              url: 'https://weblyfe.ai',
              logo: 'https://weblyfe.ai/logo-gold.svg',
              description: 'AI automation and chatbot services for creators and agencies',
              sameAs: [
                'https://instagram.com/seyed.jpg',
                'https://youtube.com/@weblyfenl',
                'https://linkedin.com/company/weblyfe',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Sales',
                email: 'hello@weblyfe.ai',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
