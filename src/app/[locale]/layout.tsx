import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-EN2ZLJGREJ';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#031D16" />
        <link rel="canonical" href={`https://weblyfe.ai${locale === 'nl' ? '/nl' : ''}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="alternate" hrefLang="en" href="https://weblyfe.ai" />
        <link rel="alternate" hrefLang="nl" href="https://weblyfe.ai/nl" />
        <link rel="alternate" hrefLang="x-default" href="https://weblyfe.ai" />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://weblyfe.ai/#organization',
              name: 'Weblyfe.ai',
              url: 'https://weblyfe.ai',
              logo: 'https://weblyfe.ai/logo-gold.svg',
              image: 'https://weblyfe.ai/og-image.jpg',
              description: locale === 'nl' 
                ? 'AI-automatisering bureau. Custom chatbots, workflow automatisering, en digitale medewerkers voor bedrijven.'
                : 'AI automation agency. Custom chatbots, workflow automation, and digital employees for businesses.',
              foundingDate: '2024',
              founder: {
                '@type': 'Person',
                name: 'Seyed Hosseini',
                url: 'https://instagram.com/seyed.jpg',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'NL',
              },
              sameAs: [
                'https://weblyfe.nl',
                'https://weblyfeuniversity.com',
                'https://instagram.com/seyed.jpg',
                'https://youtube.com/@weblyfenl',
                'https://linkedin.com/company/weblyfe',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Sales',
                email: 'hello@weblyfe.ai',
                availableLanguage: ['English', 'Dutch'],
              },
              knowsAbout: [
                'AI Automation',
                'Chatbot Development',
                'Workflow Automation',
                'Digital Employees',
                'Business Process Automation',
                'Claude AI',
                'OpenClaw',
                'WhatsApp Business API',
              ],
            }),
          }}
        />
        {/* Services Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'Service',
                  position: 1,
                  name: 'OpenClaw Setup',
                  description: 'Deploy your own AI operations platform with custom agents and integrations.',
                  provider: { '@id': 'https://weblyfe.ai/#organization' },
                  offers: {
                    '@type': 'Offer',
                    priceCurrency: 'EUR',
                    price: '2500',
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      minPrice: '2500',
                      maxPrice: '10000',
                      priceCurrency: 'EUR',
                    },
                  },
                },
                {
                  '@type': 'Service',
                  position: 2,
                  name: 'Super Assistant Employee',
                  description: 'AI assistant that replaces full-time hires. Works 24/7 across WhatsApp, Telegram, Email.',
                  provider: { '@id': 'https://weblyfe.ai/#organization' },
                  offers: {
                    '@type': 'Offer',
                    priceCurrency: 'EUR',
                    price: '1500',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: '1500',
                      priceCurrency: 'EUR',
                      billingDuration: 'P1M',
                    },
                  },
                },
                {
                  '@type': 'Service',
                  position: 3,
                  name: 'Business Foundation Fix',
                  description: 'Connect and optimize your entire tech stack with automation.',
                  provider: { '@id': 'https://weblyfe.ai/#organization' },
                  offers: {
                    '@type': 'Offer',
                    priceCurrency: 'EUR',
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      minPrice: '3000',
                      maxPrice: '15000',
                      priceCurrency: 'EUR',
                    },
                  },
                },
                {
                  '@type': 'Service',
                  position: 4,
                  name: 'AI-Powered Web Development',
                  description: 'Websites built by AI, supervised by humans. Next.js or Webflow.',
                  provider: { '@id': 'https://weblyfe.ai/#organization' },
                  offers: {
                    '@type': 'Offer',
                    priceCurrency: 'EUR',
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      minPrice: '2500',
                      maxPrice: '25000',
                      priceCurrency: 'EUR',
                    },
                  },
                },
                {
                  '@type': 'Service',
                  position: 5,
                  name: 'AI Marketing Operations',
                  description: 'Automated content, social media, and email marketing.',
                  provider: { '@id': 'https://weblyfe.ai/#organization' },
                  offers: {
                    '@type': 'Offer',
                    priceCurrency: 'EUR',
                    price: '1000',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: '1000',
                      priceCurrency: 'EUR',
                      billingDuration: 'P1M',
                    },
                  },
                },
              ],
            }),
          }}
        />
        {/* WebSite Schema for search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Weblyfe.ai',
              url: 'https://weblyfe.ai',
              inLanguage: [locale === 'nl' ? 'nl-NL' : 'en-US'],
              publisher: { '@id': 'https://weblyfe.ai/#organization' },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
        
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
