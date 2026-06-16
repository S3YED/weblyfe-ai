import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import {
  Check,
  Sparkles,
  Layers,
  Shield,
  Zap,
  RefreshCcw,
  Github,
  Mail,
  Calendar,
  Inbox,
  Video,
  Users,
  ArrowRight,
  Clock,
  FileText,
  LockKeyhole,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/i18n/messages';

// Production-safe default. Optional env override for experiments/previews.
const STRIPE_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_STRIPE_PDF_CHECKOUT_URL ||
  'https://buy.stripe.com/7sYaEYfAn30C8BncwJ3Je2I';

const CHECKOUT_TRACKING_URL = `${STRIPE_CHECKOUT_URL}${STRIPE_CHECKOUT_URL.includes('?') ? '&' : '?'}utm_source=weblyfe-ai&utm_medium=pdf-page&utm_campaign=appie-guide-v45`;

type PdfCopy = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  productDescription: string;
  badge: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  primaryCta: string;
  secondaryCta: string;
  heroTrust: string;
  heroImageAlt: string;
  cardEyebrow: string;
  cardTitle: string;
  cardBullets: string[];
  heroStats: { value: string; label: string }[];
  trustSignals: { icon: typeof Clock; label: string; detail: string }[];
  packageEyebrow: string;
  packageHeading1: string;
  packageHeading2: string;
  packageBullets: { icon: typeof Layers; title: string; body: string }[];
  uspEyebrow: string;
  uspHeading1: string;
  uspHeading2: string;
  uspBody: string;
  modelLabel: string;
  platformLabel: string;
  kitEyebrow: string;
  kitHeading1: string;
  kitHeading2: string;
  kitBody: string;
  skillTags: string[];
  moreSkills: string;
  caseEyebrow: string;
  caseHeading1: string;
  caseHeading2: string;
  caseStudies: {
    name: string;
    client: string;
    quote: string;
    metrics: { label: string; value: string }[];
    image: string;
  }[];
  audienceEyebrow: string;
  audienceHeading: string;
  audiences: { icon: typeof Users; title: string; body: string }[];
  forYouTitle: string;
  forYouBullets: string[];
  notForYouTitle: string;
  notForYouBullets: string[];
  tocEyebrow: string;
  tocHeading: string;
  toc: string[];
  faqEyebrow: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
  finalHeading: string;
  finalBody: string;
  finalCta: string;
  finalTrust: string[];
};

async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  return (LOCALES as readonly string[]).includes(cookieLocale ?? '')
    ? (cookieLocale as Locale)
    : DEFAULT_LOCALE;
}

const PDF_COPY: Record<Locale, PdfCopy> = {
  nl: {
    meta: {
      title: 'Build Your Own Techwiz PDF v4.5 - €65',
      description:
        '100+ pagina PDF + 150+ skills voor OpenClaw of Hermes Agent. Werkt met Claude Opus 4.7 en OpenAI Codex 5.4. Eenmalig €65, lifetime updates.',
      ogTitle: 'Build Your Own Techwiz - €65 PDF + Appie Kit',
      ogDescription:
        "Bouw je eigen Techwiz in een weekend. 100+ pagina's, 150+ skills, geen vendor lock-in.",
      twitterTitle: 'Build Your Own Techwiz - €65',
      twitterDescription:
        "Bouw je eigen Techwiz in een weekend. 100+ pagina's, 150+ skills, geen vendor lock-in.",
    },
    productDescription:
      '100+ pagina PDF + 150+ skills voor OpenClaw of Hermes Agent. Werkt met Claude Opus 4.7 en OpenAI Codex 5.4.',
    badge: 'v4.5 live · DIY Techwiz blueprint',
    heroLine1: 'Bouw je eigen AI assistent',
    heroLine2: 'dit weekend.',
    heroSub:
      "De complete Weblyfe blueprint voor je eigen Techwiz: 100+ pagina's, 150+ kant-en-klare skills, Appie Kit toegang en lifetime updates. Geen abonnement. Geen vendor lock-in.",
    primaryCta: 'Koop de gids · €65',
    secondaryCta: 'Bekijk wat je krijgt',
    heroTrust:
      'Direct geleverd via e-mail · veilig betalen via Stripe · zelf bouwen of later upgraden naar Instant Appie',
    heroImageAlt: 'Premium Weblyfe AI gids scene',
    cardEyebrow: 'Vandaag bouwen',
    cardTitle: 'Van nul naar een werkende Techwiz setup.',
    cardBullets: ['OpenClaw of Hermes Agent', 'Private Appie Kit repo', 'Lifetime updates'],
    heroStats: [
      { value: '100+', label: "pagina's" },
      { value: '150+', label: 'skills' },
      { value: '€65', label: 'eenmalig' },
    ],
    trustSignals: [
      { icon: Clock, label: 'Directe levering', detail: 'PDF + repo toegang in je inbox' },
      { icon: RefreshCcw, label: 'Lifetime updates', detail: 'v5.0 en latere versies inbegrepen' },
      { icon: LockKeyhole, label: 'Veilig via Stripe', detail: 'Eenmalig betalen, geen abonnement' },
    ],
    packageEyebrow: 'Wat zit er in het pakket',
    packageHeading1: 'Alles wat ik bij Weblyfe gebruik,',
    packageHeading2: 'in 1 doorlopend document.',
    packageBullets: [
      { icon: Layers, title: "100+ pagina's PDF", body: 'Stap-voor-stap van nul naar werkende Appie. Elke stap met screenshots en uitleg.' },
      { icon: Sparkles, title: '150+ kant-en-klare skills', body: 'Drag-and-drop in OpenClaw of Hermes Agent. Elke skill maakt jouw Techwiz meetbaar slimmer.' },
      { icon: Zap, title: 'Claude Opus 4.7 of OpenAI Codex 5.4', body: 'Kies zelf je model. v4.5 is de eerste versie zonder vendor lock-in.' },
      { icon: Shield, title: 'OpenClaw of Hermes Agent', body: 'Beide platforms ondersteund. Wissel zonder je skills opnieuw te bouwen.' },
      { icon: Github, title: 'Toegang tot de Appie Kit repo', body: 'Private GitHub-repository. Fork, pas aan, push. YAML + Markdown, geen lock-in.' },
      { icon: Inbox, title: 'Inbox + agenda + leads', body: 'E-mailtriage, agendabeheer, lead-capture en CRM-koppeling, allemaal in de gids.' },
      { icon: Video, title: 'Video-generatie via fal.ai', body: '1440x1440 video in 3-4 minuten. Workflow staat in stap 9 van de gids.' },
      { icon: RefreshCcw, title: 'Lifetime updates', body: 'v4.5 is nu live. v5.0 in Q3 2026. Eén keer kopen, alle toekomstige versies erbij.' },
    ],
    uspEyebrow: 'v4.5 USP',
    uspHeading1: 'Geen vendor lock-in.',
    uspHeading2: 'Claude Opus 4.7 of OpenAI Codex 5.4. OpenClaw of Hermes.',
    uspBody:
      'v4.5 is de eerste versie waar jouw Techwiz draait op zowel Claude Opus 4.7 als OpenAI Codex 5.4. Op zowel OpenClaw als Hermes Agent. Wissel van model zonder je skills opnieuw te bouwen. Wat in 2025 nog drie aparte builds was, is nu één doorlopende stack.',
    modelLabel: 'Modellen',
    platformLabel: 'Platforms',
    kitEyebrow: 'De Appie Kit',
    kitHeading1: '150+ skills.',
    kitHeading2: 'Drag-and-drop.',
    kitBody:
      'Sleep een skill in OpenClaw of Hermes Agent en je Techwiz wordt direct 10 keer slimmer. Zelfde skills die nu draaien bij CZA, BeyondSchool en Luminaire.',
    skillTags: [
      'Inbox triage', 'Lead capture', 'CRM sync', 'Calendar booking', 'Voicenote → tekst', 'Content draft',
      'Video via fal.ai', 'Invoice match', 'WhatsApp intake', 'Daily briefing', 'Memory pipeline',
      'Telegram alerts', 'Notion writeback', 'Brevo segmentatie', 'Stripe events', 'Hetzner deploy',
      'Skill loader', 'Persona tuning',
    ],
    moreSkills: '+ 130 meer skills, allemaal in de private repo',
    caseEyebrow: 'Echte resultaten',
    caseHeading1: 'Echte klanten.',
    caseHeading2: 'Echte cijfers.',
    caseStudies: [
      { name: 'Eva', client: 'Dubai-Property.nl', quote: 'Appie beantwoordt leads binnen 30 seconden, 24 uur per dag. E-mailrespons van 2-4 uur naar onder de 5 minuten.', metrics: [{ label: 'Lead-capture', value: '3 min naar <2 sec' }, { label: 'E-mailrespons', value: '2-4 uur naar <5 min' }], image: '/cases/dubai-property.avif' },
      { name: 'Ben de Voorman', client: 'Coach + content', quote: 'Contentproductie van 4 uur naar 15 minuten per stuk.', metrics: [{ label: 'Content per stuk', value: '4 uur naar 15 min' }], image: '/agents/ben.jpg' },
      { name: 'Privanotify', client: 'Privacy SaaS', quote: '50+ taken per dag afgehandeld op 3 Appies. GDPR-monitoring, alerts, compliance-audit volledig geautomatiseerd.', metrics: [{ label: 'Dagelijkse taken', value: '50+ via 3 Appies' }], image: '/screenshots/privanotify-fresh.jpg' },
      { name: 'CZA Bouwbedrijf', client: 'Bouw', quote: 'Setup in een weekend, resultaat vanaf dag 1.', metrics: [{ label: 'WhatsApp-respons', value: '4-6 uur naar <30 sec' }, { label: 'Conversie', value: '+23%' }], image: '/cases/cza-bouwbedrijf.jpg' },
      { name: 'BeyondSchool', client: 'Onderwijs', quote: 'Diagnose: 14 uur per week aan handmatige rapportages. Nu doet de Techwiz het automatisch.', metrics: [{ label: 'Tijd bespaard', value: '14 uur per week' }], image: '/cases/beyondschool.avif' },
      { name: 'Luminaire Coaching · Hamid Zahedi', client: 'Spiritual coaching', quote: 'Artemis doet readings, esoterische kennis, content creation en business building. 18 uur per week vrij voor klantgesprekken.', metrics: [{ label: 'Tijd bespaard', value: '18 uur per week' }], image: '/agents/artemis.jpg' },
    ],
    audienceEyebrow: 'Voor wie',
    audienceHeading: 'Voor wie is de PDF?',
    audiences: [
      { icon: Users, title: 'Builders', body: 'Je weet je weg in een terminal en wil precies snappen hoe een Techwiz werkt. Fork de repo, pas skills aan, ship.' },
      { icon: Sparkles, title: 'Starters', body: 'Je hebt nog nooit een regel code geschreven, maar je wil zelf bouwen. De PDF leest als een receptenboek. 150+ skills sleep je drag-and-drop in OpenClaw.' },
      { icon: Calendar, title: 'Coaches en service-bedrijven', body: 'Je vult je week met klantgesprekken, niet met inbox-triage. Zelfde setup als bij Eva, Ben en Luminaire.' },
    ],
    forYouTitle: 'Dit is voor jou als',
    forYouBullets: [
      'Je zelf wil bouwen en leren hoe het werkt',
      'Je weet: dit is geen hype, dit is infrastructuur',
      'Je een weekend wil investeren voor een tool die jaren werkt',
      'Je liever eenmalig betaalt dan maandelijks',
    ],
    notForYouTitle: 'Dit is niet voor jou als',
    notForYouBullets: [
      'Je wil dat iemand anders alles regelt (dan is /beta je pad)',
      'Je verwacht plug-and-play zonder eigen setup-tijd',
      'Je al een full-service Appie hebt via Instant Appie',
    ],
    tocEyebrow: 'Inhoudsopgave',
    tocHeading: 'Wat zit er in de PDF?',
    toc: [
      'Introductie - wat Appie is en wat hij voor jou doet',
      'Setup van je eigen server (OpenClaw of Hermes Agent)',
      'Model kiezen - Claude Opus 4.7 vs OpenAI Codex 5.4',
      'Je eerste skill installeren (15-minuten onboarding)',
      'Appie Kit: de 150+ skills catalogus',
      'Inbox-triage en e-mailintegratie',
      'Agendabeheer (Google Calendar + Notion)',
      'Lead capture + CRM-koppeling',
      'Content-productie en video-generatie',
      'Geavanceerde configuratie - memory, SOUL.md, persona-afstemming',
      'Case studies: Eva, Ben, Privanotify, CZA',
      'Troubleshooting + FAQ',
      'Roadmap en updates (v4.5+)',
    ],
    faqEyebrow: 'FAQ',
    faqHeading: 'Vragen die elke koper stelt.',
    faq: [
      { q: 'Werkt de PDF ook met OpenAI als ik geen Claude wil?', a: 'Ja. v4.5 is de eerste versie die volledig werkt met zowel Claude Opus 4.7 als OpenAI Codex 5.4. Je kiest je model in stap 3 van de setup.' },
      { q: 'Heb ik technische kennis nodig?', a: 'Basiskennis van een terminal is handig, maar de PDF is geschreven voor niet-programmeurs. Elke stap heeft screenshots en uitleg.' },
      { q: 'Wat is het verschil tussen de PDF en Instant Appie?', a: 'Met de PDF bouw je Appie zelf (eenmalig €65). Met Instant Appie bouwt Weblyfe alles voor je en draait het fully managed (€250/mo in de beta). De PDF is de DIY-route.' },
      { q: 'Wat zijn lifetime updates precies?', a: 'Elke nieuwe versie van de PDF en het Appie Kit krijg je automatisch. v4.5 is nu live. v5.0 staat op de planning voor Q3 2026 en is ook voor jou.' },
      { q: 'Hoe krijg ik de PDF na aankoop?', a: 'Je krijgt direct een e-mail met de downloadlink en toegang tot de private GitHub-repo van het Appie Kit.' },
      { q: 'Kan ik de skills aanpassen?', a: 'Ja. De skills zijn gewone tekstbestanden (YAML + Markdown). Fork de repo, pas aan, push. Alles staat in de README.' },
      { q: 'Wat als het niet werkt voor mij?', a: 'Stuur een e-mail naar seyed@weblyfe.nl met je vraag of blocker. We horen het graag en lossen het op.' },
    ],
    finalHeading: 'Klaar om te beginnen?',
    finalBody: 'Eenmalig €65. Lifetime updates. Binnen 5 minuten heb je de PDF en GitHub-toegang in je inbox.',
    finalCta: 'Koop nu voor €65',
    finalTrust: ['100% veilig via Stripe', 'Eenmalig betalen, lifetime updates', 'Binnen 5 minuten in je inbox'],
  },
  en: {
    meta: {
      title: 'Build Your Own Techwiz PDF v4.5 - €65',
      description:
        '100+ page PDF + 150+ skills for OpenClaw or Hermes Agent. Works with Claude Opus 4.7 and OpenAI Codex 5.4. One-time €65, lifetime updates.',
      ogTitle: 'Build Your Own Techwiz - €65 PDF + Appie Kit',
      ogDescription:
        'Build your own Techwiz in one weekend. 100+ pages, 150+ skills, no vendor lock-in.',
      twitterTitle: 'Build Your Own Techwiz - €65',
      twitterDescription:
        'Build your own Techwiz in one weekend. 100+ pages, 150+ skills, no vendor lock-in.',
    },
    productDescription:
      '100+ page PDF + 150+ skills for OpenClaw or Hermes Agent. Works with Claude Opus 4.7 and OpenAI Codex 5.4.',
    badge: 'v4.5 live · DIY Techwiz blueprint',
    heroLine1: 'Build your own AI assistant',
    heroLine2: 'this weekend.',
    heroSub:
      'The complete Weblyfe blueprint for your own Techwiz: 100+ pages, 150+ ready-made skills, Appie Kit access and lifetime updates. No subscription. No vendor lock-in.',
    primaryCta: 'Buy the guide · €65',
    secondaryCta: 'See what you get',
    heroTrust:
      'Delivered by email instantly · secure Stripe checkout · build it yourself or upgrade to Instant Appie later',
    heroImageAlt: 'Premium Weblyfe AI guide scene',
    cardEyebrow: 'Build today',
    cardTitle: 'From zero to a working Techwiz setup.',
    cardBullets: ['OpenClaw or Hermes Agent', 'Private Appie Kit repo', 'Lifetime updates'],
    heroStats: [
      { value: '100+', label: 'pages' },
      { value: '150+', label: 'skills' },
      { value: '€65', label: 'one-time' },
    ],
    trustSignals: [
      { icon: Clock, label: 'Instant delivery', detail: 'PDF + repo access in your inbox' },
      { icon: RefreshCcw, label: 'Lifetime updates', detail: 'v5.0 and later versions included' },
      { icon: LockKeyhole, label: 'Secure via Stripe', detail: 'Pay once, no subscription' },
    ],
    packageEyebrow: 'What is inside the package',
    packageHeading1: 'Everything I use at Weblyfe,',
    packageHeading2: 'in one continuous document.',
    packageBullets: [
      { icon: Layers, title: '100+ page PDF', body: 'Step by step from zero to a working Appie. Every step includes screenshots and explanation.' },
      { icon: Sparkles, title: '150+ ready-made skills', body: 'Drag-and-drop into OpenClaw or Hermes Agent. Every skill makes your Techwiz measurably smarter.' },
      { icon: Zap, title: 'Claude Opus 4.7 or OpenAI Codex 5.4', body: 'Choose your own model. v4.5 is the first version without vendor lock-in.' },
      { icon: Shield, title: 'OpenClaw or Hermes Agent', body: 'Both platforms are supported. Switch without rebuilding your skills.' },
      { icon: Github, title: 'Access to the Appie Kit repo', body: 'Private GitHub repository. Fork, adjust, push. YAML + Markdown, no lock-in.' },
      { icon: Inbox, title: 'Inbox + calendar + leads', body: 'Email triage, calendar management, lead capture and CRM connection, all in the guide.' },
      { icon: Video, title: 'Video generation via fal.ai', body: '1440x1440 video in 3-4 minutes. The workflow is in step 9 of the guide.' },
      { icon: RefreshCcw, title: 'Lifetime updates', body: 'v4.5 is live now. v5.0 arrives in Q3 2026. Buy once, get every future version.' },
    ],
    uspEyebrow: 'v4.5 USP',
    uspHeading1: 'No vendor lock-in.',
    uspHeading2: 'Claude Opus 4.7 or OpenAI Codex 5.4. OpenClaw or Hermes.',
    uspBody:
      'v4.5 is the first version where your Techwiz runs on both Claude Opus 4.7 and OpenAI Codex 5.4. On both OpenClaw and Hermes Agent. Switch models without rebuilding your skills. What took three separate builds in 2025 is now one continuous stack.',
    modelLabel: 'Models',
    platformLabel: 'Platforms',
    kitEyebrow: 'The Appie Kit',
    kitHeading1: '150+ skills.',
    kitHeading2: 'Drag-and-drop.',
    kitBody:
      'Drop a skill into OpenClaw or Hermes Agent and your Techwiz becomes 10 times smarter instantly. The same skills now running for CZA, BeyondSchool and Luminaire.',
    skillTags: [
      'Inbox triage', 'Lead capture', 'CRM sync', 'Calendar booking', 'Voicenote → text', 'Content draft',
      'Video via fal.ai', 'Invoice match', 'WhatsApp intake', 'Daily briefing', 'Memory pipeline',
      'Telegram alerts', 'Notion writeback', 'Brevo segmentation', 'Stripe events', 'Hetzner deploy',
      'Skill loader', 'Persona tuning',
    ],
    moreSkills: '+ 130 more skills, all in the private repo',
    caseEyebrow: 'Real results',
    caseHeading1: 'Real clients.',
    caseHeading2: 'Real numbers.',
    caseStudies: [
      { name: 'Eva', client: 'Dubai-Property.nl', quote: 'Appie answers leads within 30 seconds, 24 hours a day. Email response time went from 2-4 hours to under 5 minutes.', metrics: [{ label: 'Lead capture', value: '3 min to <2 sec' }, { label: 'Email response', value: '2-4 hrs to <5 min' }], image: '/cases/dubai-property.avif' },
      { name: 'Ben de Voorman', client: 'Coach + content', quote: 'Content production went from 4 hours to 15 minutes per piece.', metrics: [{ label: 'Content per piece', value: '4 hrs to 15 min' }], image: '/agents/ben.jpg' },
      { name: 'Privanotify', client: 'Privacy SaaS', quote: '50+ tasks per day handled across 3 Appies. GDPR monitoring, alerts and compliance audits fully automated.', metrics: [{ label: 'Daily tasks', value: '50+ via 3 Appies' }], image: '/screenshots/privanotify-fresh.jpg' },
      { name: 'CZA Bouwbedrijf', client: 'Construction', quote: 'Setup in one weekend, results from day one.', metrics: [{ label: 'WhatsApp response', value: '4-6 hrs to <30 sec' }, { label: 'Conversion', value: '+23%' }], image: '/cases/cza-bouwbedrijf.jpg' },
      { name: 'BeyondSchool', client: 'Education', quote: 'Diagnosis: 14 hours per week spent on manual reporting. Now the Techwiz does it automatically.', metrics: [{ label: 'Time saved', value: '14 hrs per week' }], image: '/cases/beyondschool.avif' },
      { name: 'Luminaire Coaching · Hamid Zahedi', client: 'Spiritual coaching', quote: 'Artemis handles readings, esoteric knowledge, content creation and business building. 18 hours per week freed up for client conversations.', metrics: [{ label: 'Time saved', value: '18 hrs per week' }], image: '/agents/artemis.jpg' },
    ],
    audienceEyebrow: 'Who it is for',
    audienceHeading: 'Who is the PDF for?',
    audiences: [
      { icon: Users, title: 'Builders', body: 'You know your way around a terminal and want to understand exactly how a Techwiz works. Fork the repo, adjust skills, ship.' },
      { icon: Sparkles, title: 'Starters', body: 'You have never written a line of code, but you want to build it yourself. The PDF reads like a recipe book. Drag and drop 150+ skills into OpenClaw.' },
      { icon: Calendar, title: 'Coaches and service businesses', body: 'You fill your week with client calls, not inbox triage. The same setup as Eva, Ben and Luminaire.' },
    ],
    forYouTitle: 'This is for you if',
    forYouBullets: [
      'You want to build it yourself and learn how it works',
      'You know this is not hype, this is infrastructure',
      'You want to invest a weekend in a tool that works for years',
      'You prefer a one-time payment over a monthly subscription',
    ],
    notForYouTitle: 'This is not for you if',
    notForYouBullets: [
      'You want someone else to handle everything (then /beta is your path)',
      'You expect plug-and-play without setup time of your own',
      'You already have a full-service Appie through Instant Appie',
    ],
    tocEyebrow: 'Table of contents',
    tocHeading: 'What is in the PDF?',
    toc: [
      'Introduction - what Appie is and what he does for you',
      'Set up your own server (OpenClaw or Hermes Agent)',
      'Choose your model - Claude Opus 4.7 vs OpenAI Codex 5.4',
      'Install your first skill (15-minute onboarding)',
      'Appie Kit: the 150+ skills catalog',
      'Inbox triage and email integration',
      'Calendar management (Google Calendar + Notion)',
      'Lead capture + CRM connection',
      'Content production and video generation',
      'Advanced configuration - memory, SOUL.md, persona tuning',
      'Case studies: Eva, Ben, Privanotify, CZA',
      'Troubleshooting + FAQ',
      'Roadmap and updates (v4.5+)',
    ],
    faqEyebrow: 'FAQ',
    faqHeading: 'Questions every buyer asks.',
    faq: [
      { q: 'Does the PDF also work with OpenAI if I do not want Claude?', a: 'Yes. v4.5 is the first version that fully works with both Claude Opus 4.7 and OpenAI Codex 5.4. You choose your model in step 3 of the setup.' },
      { q: 'Do I need technical knowledge?', a: 'Basic terminal knowledge helps, but the PDF is written for non-programmers. Every step includes screenshots and explanation.' },
      { q: 'What is the difference between the PDF and Instant Appie?', a: 'With the PDF, you build Appie yourself (one-time €65). With Instant Appie, Weblyfe builds everything for you and runs it fully managed (€250/mo in beta). The PDF is the DIY route.' },
      { q: 'What exactly are lifetime updates?', a: 'You automatically get every new version of the PDF and Appie Kit. v4.5 is live now. v5.0 is planned for Q3 2026 and is included for you.' },
      { q: 'How do I get the PDF after purchase?', a: 'You receive an email immediately with the download link and access to the private GitHub repo for the Appie Kit.' },
      { q: 'Can I adjust the skills?', a: 'Yes. The skills are plain text files (YAML + Markdown). Fork the repo, adjust, push. Everything is in the README.' },
      { q: 'What if it does not work for me?', a: 'Email seyed@weblyfe.nl with your question or blocker. We want to hear it and will help fix it.' },
    ],
    finalHeading: 'Ready to start?',
    finalBody: 'One-time €65. Lifetime updates. Within 5 minutes you have the PDF and GitHub access in your inbox.',
    finalCta: 'Buy now for €65',
    finalTrust: ['100% secure via Stripe', 'Pay once, lifetime updates', 'In your inbox within 5 minutes'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const copy = PDF_COPY[locale];

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: { canonical: 'https://weblyfe.ai/pdf' },
    openGraph: {
      title: copy.meta.ogTitle,
      description: copy.meta.ogDescription,
      url: 'https://weblyfe.ai/pdf',
      type: 'website',
      images: [
        {
          url: '/appie-pdf-cover.jpg',
          width: 1200,
          height: 630,
          alt: 'Build Your Own Techwiz PDF v4.5',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.meta.twitterTitle,
      description: copy.meta.twitterDescription,
      images: ['/appie-pdf-cover.jpg'],
    },
  };
}

function makeProductSchema(copy: PdfCopy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Build Your Own Techwiz PDF v4.5',
    description: copy.productDescription,
    brand: { '@type': 'Brand', name: 'Weblyfe' },
    image: 'https://weblyfe.ai/appie-pdf-cover.jpg',
    offers: {
      '@type': 'Offer',
      price: '65',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 'https://weblyfe.ai/pdf',
      seller: { '@type': 'Organization', name: 'Weblyfe' },
    },
  };
}

export default async function PdfPage() {
  const locale = await resolveLocale();
  const copy = PDF_COPY[locale];
  const productSchema = makeProductSchema(copy);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/appie-pdf-hero-higgsfield.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25 saturate-125"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,rgba(223,183,113,0.24),transparent_28%),linear-gradient(90deg,#031D16_0%,rgba(3,29,22,0.94)_34%,rgba(3,29,22,0.68)_66%,#031D16_100%)]" />
            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)',
                backgroundSize: '64px 64px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DFB771]/30 bg-[#031D16]/70 px-4 py-2 text-[#DFB771] text-xs font-mono uppercase tracking-[0.22em] mb-5 shadow-[0_12px_60px_rgba(0,0,0,0.25)]">
                <FileText className="w-3.5 h-3.5" />
                {copy.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] mb-6 tracking-[-0.055em] text-balance">
                {copy.heroLine1}
                <span className="block text-[#DFB771]">{copy.heroLine2}</span>
              </h1>
              <p className="text-[#F6FEFC]/78 text-lg md:text-xl mb-7 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {copy.heroSub}
              </p>

              <div className="grid grid-cols-3 gap-2.5 max-w-xl mx-auto lg:mx-0 mb-7">
                {copy.heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[#247459]/35 bg-[#031D16]/70 px-4 py-3 backdrop-blur">
                    <p className="text-2xl md:text-3xl font-bold text-[#DFB771] leading-none">{stat.value}</p>
                    <p className="mt-1 text-[11px] md:text-xs uppercase tracking-wider text-[#F6FEFC]/55">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                <a
                  href={CHECKOUT_TRACKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-black px-8 py-4 rounded-2xl transition-all shadow-[0_18px_55px_-20px_rgba(223,183,113,0.95)] hover:-translate-y-0.5"
                >
                  {copy.primaryCta}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contents"
                  className="inline-flex items-center justify-center gap-2 border border-[#F6FEFC]/16 bg-[#F6FEFC]/6 hover:bg-[#F6FEFC]/10 text-[#F6FEFC] font-semibold px-8 py-4 rounded-2xl transition-colors backdrop-blur"
                >
                  {copy.secondaryCta}
                </a>
              </div>

              <p className="text-sm text-[#F6FEFC]/58">
                {copy.heroTrust}
              </p>
            </div>

            <div className="relative mx-auto lg:mx-0 w-full max-w-lg">
              <div className="absolute -inset-6 rounded-[2.25rem] bg-[#DFB771]/18 blur-3xl" />
              <div className="relative rounded-[2rem] border border-[#DFB771]/28 bg-[#071f18]/78 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-[#DFB771]/25 bg-[#031D16]">
                  <Image
                    src="/appie-pdf-hero-higgsfield.webp"
                    alt={copy.heroImageAlt}
                    fill
                    sizes="(min-width: 1024px) 520px, 92vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/75 via-transparent to-transparent" />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-[0.72fr_1fr] items-stretch">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#DFB771]/30 bg-[#F6FEFC]">
                    <Image
                      src="/appie-pdf-cover.jpg"
                      alt="Build Your Own Techwiz PDF v4.5 cover"
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-2xl border border-[#247459]/35 bg-[#031D16]/72 p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-2">{copy.cardEyebrow}</p>
                      <h2 className="text-xl font-bold leading-tight">{copy.cardTitle}</h2>
                    </div>
                    <ul className="mt-5 space-y-2 text-sm text-[#F6FEFC]/70">
                      {copy.cardBullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <Check className="w-4 h-4 text-[#DFB771] mt-0.5 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#071f18] border-y border-[#247459]/20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-4">
            {copy.trustSignals.map((signal) => (
              <div key={signal.label} className="flex items-start gap-3 rounded-2xl border border-[#247459]/24 bg-[#1a2e27]/45 p-5">
                <div className="w-10 h-10 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/25 flex items-center justify-center flex-shrink-0">
                  <signal.icon className="w-5 h-5 text-[#DFB771]" />
                </div>
                <div>
                  <h2 className="text-base font-bold">{signal.label}</h2>
                  <p className="mt-1 text-sm text-[#F6FEFC]/62 leading-relaxed">{signal.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WAT KRIJG JE */}
        <section id="contents" className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {copy.packageEyebrow}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {copy.packageHeading1}
                <span className="block text-[#DFB771]">{copy.packageHeading2}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {copy.packageBullets.map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6 hover:border-[#DFB771]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/30 flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5 text-[#DFB771]" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{b.title}</h3>
                  <p className="text-[#F6FEFC]/65 text-sm leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* USP v4.5 */}
        <section className="py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
              {copy.uspEyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              {copy.uspHeading1}
              <span className="block text-[#DFB771]">
                {copy.uspHeading2}
              </span>
            </h2>
            <p className="text-[#F6FEFC]/70 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
              {copy.uspBody}
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6">
                <p className="text-xs font-mono uppercase tracking-wider text-[#DFB771] mb-2">
                  {copy.modelLabel}
                </p>
                <p className="text-2xl font-bold mb-1">Claude Opus 4.7</p>
                <p className="text-2xl font-bold text-[#F6FEFC]/60">OpenAI Codex 5.4</p>
              </div>
              <div className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6">
                <p className="text-xs font-mono uppercase tracking-wider text-[#DFB771] mb-2">
                  {copy.platformLabel}
                </p>
                <p className="text-2xl font-bold mb-1">OpenClaw</p>
                <p className="text-2xl font-bold text-[#F6FEFC]/60">Hermes Agent</p>
              </div>
            </div>
          </div>
        </section>

        {/* APPIE KIT SHOWCASE */}
        <section className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {copy.kitEyebrow}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                {copy.kitHeading1}{' '}
                <span className="text-[#DFB771]">{copy.kitHeading2}</span>
              </h2>
              <p className="text-[#F6FEFC]/70 max-w-2xl mx-auto text-lg">
                {copy.kitBody}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {copy.skillTags.map((skill) => (
                <div
                  key={skill}
                  className="rounded-xl bg-[#031D16]/60 border border-[#247459]/30 px-3 py-3 text-center hover:border-[#DFB771]/40 hover:-translate-y-0.5 transition-all"
                >
                  <p className="text-[#F6FEFC]/85 text-xs md:text-sm font-medium">
                    {skill}
                  </p>
                </div>
              ))}
              <div className="col-span-2 md:col-span-4 lg:col-span-6 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/40 px-4 py-3 text-center">
                <p className="text-[#DFB771] font-semibold text-sm md:text-base">
                  {copy.moreSkills}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {copy.caseEyebrow}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {copy.caseHeading1}{' '}
                <span className="text-[#DFB771]">{copy.caseHeading2}</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {copy.caseStudies.map((c) => (
                <article
                  key={c.name}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.client}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-[#031D16]/40 to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-1">{c.name}</h3>
                    <p className="text-[#F6FEFC]/55 text-xs mb-3 uppercase tracking-wider">
                      {c.client}
                    </p>
                    <p className="text-[#F6FEFC]/80 text-sm mb-4 leading-relaxed">
                      &ldquo;{c.quote}&rdquo;
                    </p>
                    <ul className="space-y-2 mt-auto">
                      {c.metrics.map((m) => (
                        <li
                          key={m.label}
                          className="flex items-center justify-between gap-3 text-xs"
                        >
                          <span className="text-[#F6FEFC]/55 uppercase tracking-wider">
                            {m.label}
                          </span>
                          <span className="text-[#DFB771] font-semibold">
                            {m.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* AUDIENCES */}
        <section className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {copy.audienceEyebrow}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {copy.audienceHeading}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {copy.audiences.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/30 flex items-center justify-center mb-4">
                    <a.icon className="w-6 h-6 text-[#DFB771]" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{a.title}</h3>
                  <p className="text-[#F6FEFC]/65 text-sm leading-relaxed">{a.body}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-10 max-w-4xl mx-auto">
              <div className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6">
                <h3 className="font-bold text-lg mb-3 text-[#DFB771]">{copy.forYouTitle}</h3>
                <ul className="space-y-2 text-[#F6FEFC]/75 text-sm">
                  {copy.forYouBullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <Check className="w-4 h-4 text-[#DFB771] mt-0.5 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6">
                <h3 className="font-bold text-lg mb-3 text-[#F6FEFC]/70">{copy.notForYouTitle}</h3>
                <ul className="space-y-2 text-[#F6FEFC]/60 text-sm">
                  {copy.notForYouBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TOC */}
        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {copy.tocEyebrow}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {copy.tocHeading}
              </h2>
            </div>
            <ol className="space-y-3">
              {copy.toc.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-xl bg-[#1a2e27]/40 border border-[#247459]/20 p-4 hover:border-[#DFB771]/30 transition-colors"
                >
                  <span className="font-mono text-[#DFB771] text-sm mt-0.5 min-w-[2rem]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#F6FEFC]/85 text-sm md:text-base">{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {copy.faqEyebrow}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {copy.faqHeading}
              </h2>
            </div>
            <FaqAccordion items={copy.faq} />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#247459]/20 via-transparent to-[#DFB771]/10 pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {copy.finalHeading}
            </h2>
            <p className="text-[#F6FEFC]/70 text-lg mb-10 max-w-2xl mx-auto">
              {copy.finalBody}
            </p>
            <a
              href={CHECKOUT_TRACKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-bold px-9 py-5 rounded-2xl text-lg transition-colors"
            >
              {copy.finalCta}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <ul className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-sm text-[#F6FEFC]/70">
              <li className="flex items-center gap-2 justify-center">
                <Shield className="w-4 h-4 text-[#DFB771]" />
                {copy.finalTrust[0]}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <RefreshCcw className="w-4 h-4 text-[#DFB771]" />
                {copy.finalTrust[1]}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Mail className="w-4 h-4 text-[#DFB771]" />
                {copy.finalTrust[2]}
              </li>
            </ul>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
