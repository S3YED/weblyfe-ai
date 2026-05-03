import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import TIPSLanding from '@/components/TIPSLanding';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { FAQS } from '@/content/faqs';
// Removed v2026-05-02 (Phase-1 rewrite): Testimonials, FAQ, and CTA were duplicating
// content that already lives inside TIPSLanding (real cases, FAQ, closing CTA).
// Keeping them rendered after TIPSLanding produced a duplicate FAQ section and
// stale testimonial copy on the same page. They remain in /components for reuse.

export const metadata: Metadata = {
  title: 'Appie - Jouw persoonlijke Techwiz | Weblyfe',
  description:
    'Hoi, ik ben Appie. Jouw persoonlijke Techwiz. Een geniale werknemer met de laagste kosten, die het werk doet dat je week opvreet. Bouw zelf vanaf €65 of kies Instant Appie vanaf €250/mo.',
  alternates: {
    canonical: 'https://weblyfe.ai',
  },
};

// FAQ structured data - single-source from src/content/faqs.ts so the
// rich-snippet schema and the visible FAQ section never drift apart.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Automation Services',
  provider: { '@id': 'https://weblyfe.ai/#organization' },
  name: 'AI Automation for Creators & Agencies',
  description:
    'Custom AI agents, chatbots, workflow automation, and digital employees built for creators, agencies, and service businesses.',
  url: 'https://weblyfe.ai',
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Automation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Workflow Automation',
          description: 'Connect your tools and automate repetitive tasks using n8n and Zapier integrations.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Chatbots',
          description: 'Custom AI chatbots trained on your brand voice for lead qualification and customer support.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Employee (Appie)',
          description: 'A fully autonomous AI agent powered by OpenClaw that handles emails, calendar, research, and operations 24/7.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI-Powered CRM',
          description: 'Automated lead tracking, follow-ups, and pipeline management integrated with your existing CRM.',
        },
      },
    ],
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://weblyfe.ai/#seyed',
  name: 'Seyed Hosseini',
  jobTitle: 'Founder, Weblyfe',
  url: 'https://weblyfe.ai',
  image: 'https://weblyfe.ai/screenshots/seyed-founder.png',
  worksFor: { '@id': 'https://weblyfe.ai/#organization' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'American University of Dubai',
  },
  sameAs: [
    'https://instagram.com/seyed.jpg',
    'https://linkedin.com/in/seyedhosseini',
    'https://weblyfeuniversity.com',
  ],
  description:
    'Seyed Hosseini is the founder of Weblyfe and Weblyfe University. He has worked with 100+ companies, lectured digital strategy at the American University of Dubai, and built Appie, an AI Techwiz that takes over your work week.',
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': 'https://weblyfe.ai/#appie',
  name: 'Appie - Jouw persoonlijke Techwiz',
  description:
    'Een geniale werknemer met de laagste kosten. Een AI Techwiz die je inbox, intake en agenda overneemt op een eigen private server.',
  brand: { '@id': 'https://weblyfe.ai/#organization' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Bouw zelf je Techwiz (PDF Gids)',
      price: '65',
      priceCurrency: 'EUR',
      url: 'https://buy.stripe.com/7sYaEYfAn30C8BncwJ3Je2I',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Instant Appie (Managed)',
      price: '250',
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'UnitPriceSpecification', price: '250', priceCurrency: 'EUR', billingDuration: 'P1M' },
      availability: 'https://schema.org/PreOrder',
    },
    {
      '@type': 'Offer',
      name: 'Custom Appie',
      price: '2000',
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'UnitPriceSpecification', price: '2000', priceCurrency: 'EUR', billingDuration: 'P1M' },
      url: 'https://weblyfe.ai/discovery-call',
      availability: 'https://schema.org/InStock',
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="min-h-screen">
        <ScrollProgress />
        <Navbar />
        <TIPSLanding />
        <Footer />
      </main>
    </>
  );
}
