/**
 * OpenClaw Landing Page Content
 * ─────────────────────────────
 * All copywriting and data for the /openclaw page lives here.
 * Edit this file to change text without touching component code.
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

export const OUTCOMES = [
  {
    iconKey: 'Mail',
    title: 'Your Inbox, Sorted',
    description: 'AI reads, prioritizes, and drafts replies. You only handle what matters.',
    persona: 'For Coaches',
  },
  {
    iconKey: 'Zap',
    title: 'Never Miss a Lead',
    description: 'Instant response to every inquiry, 24/7. Qualify, book, follow up automatically.',
    persona: 'For Real Estate & Agencies',
  },
  {
    iconKey: 'Calendar',
    title: 'Your Calendar, Managed',
    description: 'Meetings scheduled, conflicts resolved, prep notes ready before every call.',
    persona: 'For Executives',
  },
  {
    iconKey: 'Globe',
    title: 'Content on Autopilot',
    description: 'Research, draft, schedule posts across platforms. Your voice, zero effort.',
    persona: 'For Creators',
  },
  {
    iconKey: 'BarChart3',
    title: 'Operations That Scale',
    description: 'CRM updates, invoice tracking, team coordination. No more spreadsheet chaos.',
    persona: 'For Agencies',
  },
  {
    iconKey: 'Shield',
    title: 'Private & Secure',
    description: 'Runs on YOUR server. Your data never leaves your infrastructure. Enterprise-grade.',
    persona: 'For Everyone',
  },
] as const;

export const AGENTS = [
  {
    name: 'Appie',
    tagline: 'The Original',
    industry: 'Creative Agency',
    description: 'Three AI agents running Weblyfe across time zones. Handles emails, deployments, client projects, CRM, and content creation.',
    image: '/agents/appie.jpg',
    stats: [
      { label: 'Tasks/day', value: '50+' },
      { label: 'Agents', value: '3' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
  {
    name: 'Eva',
    tagline: 'The Property Agent',
    industry: 'Real Estate',
    description: 'Dedicated AI employee for a Dubai real estate agency. Property inquiries, viewing schedules, buyer qualification, running 24/7 on its own hardware.',
    image: '/agents/eva.jpg',
    stats: [
      { label: 'Lead response', value: '24/7' },
      { label: 'Hardware', value: 'Own Mac Mini' },
      { label: 'Channels', value: 'Telegram + CRM' },
    ],
  },
  {
    name: 'Ben de Voorman',
    tagline: 'The Foreman',
    industry: 'Construction',
    description: 'Dutch construction company. AI scores leads 0-100 on WhatsApp, responds in under 2 minutes, syncs with Monday CRM automatically.',
    image: '/agents/ben.jpg',
    stats: [
      { label: 'Response time', value: '<2 min' },
      { label: 'Time saved', value: '13+ hrs/wk' },
      { label: 'After-hours leads', value: '40%' },
    ],
  },
] as const;

export const TIERS = [
  {
    tag: 'SELF-SERVE',
    title: 'Build Your Own Appie',
    price: '€65',
    priceNote: 'one-time',
    description: 'Everything you need to set up your own AI agent.',
    featured: false,
    light: true,
    items: [
      '62-page PDF setup guide',
      'Video tutorials',
      'OpenClaw setup walkthrough',
      'Template configs included',
      'Community Discord access',
      'Lifetime updates',
    ],
    package: 'diy',
  },
  {
    tag: 'DONE WITH YOU',
    title: 'Instant Appie',
    price: '€250',
    priceNote: '/month',
    description: 'We host and maintain your AI agent. You focus on your business.',
    featured: true,
    light: false,
    items: [
      'Pre-configured OpenClaw instance',
      'Telegram or WhatsApp connected',
      'Email & calendar integration',
      'Custom personality & memory',
      'Ongoing updates & support',
      '30-day onboarding',
    ],
    package: 'managed',
  },
  {
    tag: 'DONE FOR YOU',
    title: 'Custom Solution',
    price: '€2,000+',
    priceNote: '',
    description: 'Full custom AI infrastructure built for your specific needs.',
    featured: false,
    light: false,
    items: [
      'Everything in Instant Appie',
      'Multi-agent architecture',
      'Custom workflows & automations',
      'Command center dashboard',
      'CRM & pipeline integration',
      'NemoClaw security: industry-grade sandboxing, 4-layer protection & policy enforcement',
      'Dedicated support & strategy',
    ],
    package: 'enterprise',
  },
] as const;

export const FAQS = [
  { q: 'What is OpenClaw?', a: 'OpenClaw is an AI agent runtime that powers Appie, your custom digital employee. It runs 24/7 on your own server, connects to your tools, and handles business operations autonomously.' },
  { q: 'Do I need technical skills?', a: 'For the DIY guide, basic terminal knowledge helps. For Hosted and Custom plans, we handle everything. You just chat with your AI on Telegram or WhatsApp.' },
  { q: 'How is this different from ChatGPT?', a: 'ChatGPT is a chat window. OpenClaw is an operating system for your AI: persistent memory, tool access, file management, multi-agent coordination, and real business integrations.' },
  { q: 'Which tools does it connect to?', a: 'Google Workspace, Notion, Airtable, Webflow, Stripe, n8n, Zapier, Slack, WhatsApp, Telegram, and hundreds more via API or webhook.' },
  { q: 'Is my data private?', a: 'Yes. Your instance runs on a private server. Your data never trains public models and never leaves your infrastructure.' },
  { q: 'When do you launch?', a: 'Very soon. Sign up to get notified first and lock in exclusive launch pricing. Early supporters get the best deal.' },
  { q: 'Why is there a waitlist?', a: 'Limited spots for managed setup to ensure quality for each client. We onboard in batches so every Appie gets the attention it deserves.' },
  { q: 'What happens after I sign up?', a: 'You get a confirmation email with next steps. When we launch, waitlist members get first access and exclusive pricing before anyone else.' },
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

export const STATS = [
  { value: '20+', label: 'Hours saved weekly' },
  { value: '24/7', label: 'Always running' },
  { value: '€10K+', label: 'Revenue generated' },
  { value: '500+', label: 'Tool integrations' },
] as const;
