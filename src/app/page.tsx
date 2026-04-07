import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ThreePathsHero from '@/components/ThreePathsHero';
import GuideDownload from '@/components/GuideDownload';
import InstantAppiePricing from '@/components/InstantAppiePricing';
import CaseStudies from '@/components/CaseStudies';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AI Automation for Creators & Agencies',
  description:
    'Weblyfe builds custom AI agents, chatbots, and workflow automations that handle your leads, support, and operations 24/7. Save 20+ hours per week. No coding needed.',
  alternates: {
    canonical: 'https://weblyfe.ai',
  },
};

// FAQ structured data — mirrors FAQ component content for Google rich snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to build an AI automation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most projects take 2-4 weeks from kickoff to launch. Simple chatbots can be ready in 1-2 weeks, while complex multi-agent systems may take 4-6 weeks. We give you a clear timeline during the strategy call.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need technical knowledge to use these systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not at all. We build everything for you and create simple dashboards so you can monitor performance. Training is included, and we provide ongoing support to make sure you\'re comfortable.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the cost of AI automation services?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We\'re finalizing our launch packages. Sign up to get notified when pricing goes live — early supporters get exclusive launch pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will the AI sound like a robot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. We train AI on your brand voice, tone, and communication style. Most customers can\'t tell they\'re talking to AI. We fine-tune until it sounds exactly like your team would respond.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if something goes wrong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We build with failsafes. Complex queries route to humans, and you always have override controls. Plus, we include 30 days of support after launch, and offer ongoing maintenance packages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you integrate with my existing tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We work with 400+ apps including Notion, Slack, Gmail, HubSpot, Salesforce, Airtable, WhatsApp, and custom APIs. If it has an API, we can connect it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We follow industry best practices: encrypted connections, secure API handling, and we never store your data beyond what\'s needed. For sensitive industries, we can discuss additional security measures.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I need changes after launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Changes are normal! We include a revision period after launch. For ongoing tweaks, we offer support packages or you can make simple changes yourself through the dashboards we provide.',
      },
    },
  ],
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
      <main className="min-h-screen">
        <Navbar />
        <ThreePathsHero />
        <GuideDownload />
        <InstantAppiePricing />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
