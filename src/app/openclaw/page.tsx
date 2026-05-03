import type { Metadata } from 'next';
import OpenClawClient from './OpenClawClient';

export const metadata: Metadata = {
  title: 'OpenClaw - Your AI Employee',
  description:
    'Deploy Appie, your custom AI employee powered by OpenClaw. Handles emails, calendar, leads, and business operations 24/7 through Telegram or WhatsApp. Private, secure, fully managed.',
  keywords: [
    'OpenClaw AI agent',
    'AI employee',
    'autonomous AI assistant',
    'AI for business',
    'Appie AI',
    'AI automation Telegram',
    'custom AI agent Netherlands',
  ],
  alternates: {
    canonical: 'https://weblyfe.ai/openclaw',
  },
  openGraph: {
    title: 'OpenClaw - Your AI Employee | Weblyfe.ai',
    description:
      'Deploy an autonomous AI employee that handles your emails, calendar, leads, and operations 24/7. Save 20+ hours per week.',
    url: 'https://weblyfe.ai/openclaw',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OpenClaw AI Employee - Weblyfe.ai',
      },
    ],
  },
};

const openClawFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is OpenClaw?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "OpenClaw is an AI agent runtime that powers Appie - Weblyfe's custom digital employee. It runs 24/7 on your own server, connects to your tools, and handles business operations autonomously.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need technical skills to run this?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Weblyfe handles the full setup - server provisioning, configuration, integrations. You just chat with your AI on Telegram or WhatsApp like you would with a team member.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatGPT is a chat interface. OpenClaw is an operating system for your AI - persistent memory, tool use, file access, multi-agent coordination, and real business integrations baked in.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my data private?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Your instance runs on a private server - your own DigitalOcean, AWS, or Mac Mini. Your data is never used to train public models and never leaves your infrastructure.',
      },
    },
  ],
};

export default function OpenClawPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(openClawFaqSchema) }}
      />
      <OpenClawClient />
    </>
  );
}
