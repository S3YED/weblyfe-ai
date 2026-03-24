/**
 * OpenClaw Landing Page Content
 * ─────────────────────────────
 * All copywriting and data for the /openclaw page lives here.
 * Edit this file to change text without touching component code.
 *
 * DO NOT import React components (icons) here — those stay in the component.
 */

export const FEATURES = [
  { iconKey: 'Brain', title: 'Persistent Memory', description: 'Remembers context across every conversation. No more repeating yourself.' },
  { iconKey: 'Bot', title: 'Multi-Agent Teams', description: 'Spawn specialized agents for complex tasks. One coordinates, others execute.' },
  { iconKey: 'Zap', title: 'Workflow Automation', description: 'Connects to n8n, Zapier, and 500+ tools. Trigger flows from a chat message.' },
  { iconKey: 'Calendar', title: 'Calendar & Email', description: 'Full Google Workspace integration. Schedule, triage, draft replies automatically.' },
  { iconKey: 'Globe', title: 'Web Intelligence', description: 'Real-time research, competitor monitoring, content scraping. Always informed.' },
  { iconKey: 'Shield', title: 'Private & Secure', description: 'Runs on your own server. Your data never trains a public model.' },
  { iconKey: 'Mail', title: 'Telegram & WhatsApp', description: 'Chat with your AI on your favourite app. Available 24/7, responds in seconds.' },
  { iconKey: 'BarChart3', title: 'Command Center', description: 'Real-time dashboard for tasks, agent activity, and business metrics.' },
] as const;

export const TIERS: readonly { iconKey: string; tag: string; title: string; description: string; featured?: boolean; items: readonly string[]; cta: string }[] = [
  {
    iconKey: 'BookOpen',
    tag: 'DIY',
    title: 'Build It Yourself',
    description: 'Everything you need to set up your own AI agent.',
    items: ['Step-by-step PDF guide', 'Video tutorials', 'OpenClaw setup walkthrough', 'Self-hosted on your server', 'Community Discord access', 'Template configs included'],
    cta: 'Get the Guide',
  },
  {
    iconKey: 'Server',
    tag: 'Hosted',
    title: 'Done With You',
    description: 'We host and maintain your AI agent. You focus on your business.',
    featured: true,
    items: ['Pre-configured OpenClaw instance', 'Telegram or WhatsApp connected', 'Email & calendar integration', 'Monthly subscription', 'Ongoing updates & support', 'Custom personality & memory'],
    cta: 'Start Hosting',
  },
  {
    iconKey: 'Wrench',
    tag: 'Custom',
    title: 'Done For You',
    description: 'Full custom AI infrastructure built for your specific needs.',
    items: ['Everything in Hosted', 'Multi-agent architecture', 'Custom workflows & automations', 'Command center dashboard', 'CRM & pipeline integration', 'Dedicated support & strategy'],
    cta: 'Book a Strategy Call',
  },
];

export const FAQS = [
  { q: 'What is OpenClaw?', a: 'OpenClaw is an AI agent runtime that powers Appie, your custom digital employee. It runs 24/7 on your own server, connects to your tools, and handles business operations autonomously.' },
  { q: 'Do I need technical skills?', a: 'For the DIY guide, basic terminal knowledge helps. For Hosted and Custom plans, we handle everything. You just chat with your AI on Telegram or WhatsApp.' },
  { q: 'How is this different from ChatGPT?', a: 'ChatGPT is a chat window. OpenClaw is an operating system for your AI: persistent memory, tool access, file management, multi-agent coordination, and real business integrations.' },
  { q: 'Which tools does it connect to?', a: 'Google Workspace, Notion, Airtable, Webflow, Stripe, n8n, Zapier, Slack, WhatsApp, Telegram, and hundreds more via API or webhook.' },
  { q: 'Is my data private?', a: 'Yes. Your instance runs on a private server. Your data never trains public models and never leaves your infrastructure.' },
  { q: 'When do you launch?', a: 'Very soon. Sign up to get notified first and lock in exclusive launch pricing. Early supporters get the best deal.' },
] as const;

export const CASE_STUDIES = [
  {
    title: 'Eva — Dubai Property',
    subtitle: 'AI Real Estate Assistant',
    description: 'Dedicated AI employee for a real estate agency. Handles property inquiries, schedules viewings, qualifies buyers, and runs 24/7 on its own hardware.',
    image: '/screenshots/cza-fresh.jpg',
    stat: '24/7 lead response',
    highlights: ['Property matching', 'Viewing scheduling', 'Buyer qualification', 'Own Mac Mini'],
  },
  {
    title: 'Appie — Weblyfe',
    subtitle: 'Multi-Agent AI System',
    description: 'Three AI agents running across time zones. Orchestrator, Marketing Brain, and DevOps. Handles scheduling, content, CRM, code deployments, and operations.',
    image: '/screenshots/team-dashboard.jpg',
    stat: '3 agents, 50+ tasks/day',
    highlights: ['Multi-agent orchestration', 'Content & marketing', 'DevOps & deploys', '99.9% uptime'],
  },
  {
    title: 'CZA Ben de Voorman',
    subtitle: 'AI WhatsApp Lead Qualification',
    description: 'Dutch construction company handling dozens of inquiries weekly. AI scores leads 0-100, responds in under 2 minutes, and syncs with Monday CRM automatically.',
    image: '/screenshots/cza-fresh.jpg',
    stat: '<2 min response time',
    highlights: ['WhatsApp automation', 'Lead scoring (0-100)', 'Monday.com sync', '40% after-hours leads'],
  },
] as const;

export const TOOLS = [
  { name: 'Google', logo: '/logos/google.svg' },
  { name: 'Notion', logo: '/logos/notion.svg' },
  { name: 'Telegram', logo: '/logos/telegram.svg' },
  { name: 'WhatsApp', logo: '/logos/whatsapp.svg' },
  { name: 'Stripe', logo: '/logos/stripe.svg' },
  { name: 'n8n', logo: '/logos/n8n.svg' },
  { name: 'Webflow', logo: '/logos/webflow.svg' },
  { name: 'Slack', logo: '/logos/slack.svg' },
  { name: 'HubSpot', logo: '/logos/hubspot.svg' },
  { name: 'Airtable', logo: '/logos/airtable.svg' },
] as const;

export const TRUSTED_CLIENTS = ['Lost LeBlanc', 'BeyondSchool', 'Dubai Property', 'Stickx Arcade'] as const;

export const THREE_PATHS: readonly { iconKey: string; num: string; tag: string; title: string; desc: string; highlights: readonly string[]; featured?: boolean }[] = [
  {
    iconKey: 'BookOpen',
    num: '01',
    tag: 'DIY',
    title: 'Build It Yourself',
    desc: 'Get the full setup guide, copy-paste config files, and sort the rest by yourself. Perfect for technical founders who want full control.',
    highlights: ['Complete setup guide', 'Copy-paste config files', 'Community Discord access', 'Self-hosted on your server'],
  },
  {
    iconKey: 'Server',
    num: '02',
    tag: 'Hosted',
    title: 'Employ Appie',
    desc: 'Rent your own dedicated and private Appie, spun up instantly for you. Personal guidance to link it with your devices.',
    highlights: ['Your own private Appie', 'Instant setup', 'Connected to your tools', 'Personal onboarding'],
    featured: true,
  },
  {
    iconKey: 'Wrench',
    num: '03',
    tag: 'Enterprise',
    title: 'Custom AI System',
    desc: 'We build your own fully customised AI system for your company, on your hardware. Multi-agent, custom workflows, dedicated support.',
    highlights: ['Fully custom build', 'Your own hardware', 'Multi-agent architecture', 'Dedicated support team'],
  },
] as const;
