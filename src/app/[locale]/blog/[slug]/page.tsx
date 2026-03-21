import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter } from 'lucide-react';

// Blog posts data (same as index, will be moved to shared file)
const posts: Record<string, {
  title: string;
  titleNl: string;
  description: string;
  descriptionNl: string;
  category: string;
  date: string;
  readingTime: number;
  image: string;
  author: { name: string; role: string; avatar: string };
  content: string;
  contentNl?: string;
}> = {
  'weblyfe-ai-launch': {
    title: 'Introducing Weblyfe.ai: AI automation that actually works',
    titleNl: 'Introductie Weblyfe.ai: AI automatisering die echt werkt',
    description: 'We launched weblyfe.ai. Real AI systems running real businesses. From workflow automation to digital employees.',
    descriptionNl: 'We lanceren weblyfe.ai. Echte AI-systemen die echte bedrijven runnen. Van workflow automatisering tot digitale medewerkers.',
    category: 'announcement',
    date: '2026-03-22',
    readingTime: 4,
    image: '/images/team/67a46f77857a24b0e1beb865_Main%20Techwiz%20Seyed%20Hosseini%20from%20Weblyfe%20University%20building%20website%20high-end%20sophisticated.avif',
    author: {
      name: 'Seyed Hosseini',
      role: 'Founder, Weblyfe.ai',
      avatar: '/images/team/67a46d44541771441d3337d9_Seyed%20Hosseini%20Techwiz%20Lifestyle%20and%20results.avif',
    },
    content: `
## We just launched something we've been building for the past two years.

**Weblyfe.ai is live.**

## The problem we kept seeing

78% of businesses want AI automation. Most don't know where to start. And let's be honest: generic chatbots don't cut it anymore.

We've been building AI systems for clients since 2024. Custom workflows. AI assistants. Digital employees that actually do work. Not demos. Real systems running real businesses.

## What we built

Weblyfe.ai packages everything we've learned into services anyone can use:

### 1. Workflow automation
Connect your entire stack. CRM, email, calendar, Notion, Slack, and 400+ other apps. Zero manual handoffs. Real-time dashboards that show you what's happening.

### 2. AI chatbots
24/7 support that sounds like you. Not robotic responses. We train on YOUR brand voice, your processes, your FAQs. Most customers can't tell they're talking to AI.

### 3. Digital employees
This is the big one. AI assistants that actually use your computer. They book appointments, fill forms, update your CRM, send calendar invites. Unlimited tasks. No PTO.

## Real results

We're not selling dreams. We're showing receipts.

**CZA Bouwbedrijf** (Construction)
- Response time: 4 hours → 2 minutes
- 40% more leads captured
- 13 hours saved weekly

**Dubai Property** (Real Estate)
- 80% of tasks automated
- 3 full-time employees replaced
- AI assistant "Eva" works 24/7

**PrivaNotify** (SaaS)
- Built and launched while on a treadmill
- 100% abuse detection
- €3k first deal via voice notes

## How it works

1. **Discovery call** - We learn your business, no pitch
2. **Custom roadmap** - Clear milestones, timelines, expected ROI
3. **Build & launch** - Regular updates, no surprises
4. **Optimize & scale** - Your AI gets smarter over time

Most projects take 2-4 weeks.

## Ready to automate?

If you're still:
- Manually responding to leads
- Copy-pasting between apps
- Working weekends on admin

...we should talk.

[Book a free strategy call →](https://weblyfe.ai/#book)

No pitch. Just value. We'll identify 3 automation opportunities in your business.

---

*Questions? Email hello@weblyfe.ai or DM us on Instagram [@seyed.jpg](https://instagram.com/seyed.jpg)*
`,
    contentNl: `
## We lanceren vandaag iets waar we de afgelopen twee jaar aan hebben gebouwd.

**Weblyfe.ai is live.**

## Het probleem dat we steeds zagen

78% van de bedrijven wil AI automatisering. De meesten weten niet waar te beginnen. En laten we eerlijk zijn: generieke chatbots werken niet meer.

We bouwen sinds 2024 AI-systemen voor klanten. Custom workflows. AI assistenten. Digitale medewerkers die echt werk doen. Geen demo's. Echte systemen die echte bedrijven runnen.

## Wat we hebben gebouwd

Weblyfe.ai bundelt alles wat we hebben geleerd in diensten die iedereen kan gebruiken:

### 1. Workflow automatisering
Verbind je hele stack. CRM, e-mail, agenda, Notion, Slack en 400+ andere apps. Geen handmatige overdrachten. Real-time dashboards die laten zien wat er gebeurt.

### 2. AI chatbots
24/7 support die klinkt als jij. Geen robotachtige antwoorden. We trainen op JOUW merkstem, jouw processen, jouw FAQs. De meeste klanten weten niet dat ze met AI praten.

### 3. Digitale medewerkers
Dit is de grote. AI assistenten die daadwerkelijk je computer gebruiken. Ze boeken afspraken, vullen formulieren in, updaten je CRM, sturen agenda-uitnodigingen. Onbeperkte taken. Geen vrije dagen.

## Echte resultaten

We verkopen geen dromen. We tonen bonnetjes.

**CZA Bouwbedrijf** (Bouw)
- Reactietijd: 4 uur → 2 minuten
- 40% meer leads gevangen
- 13 uur per week bespaard

**Dubai Property** (Vastgoed)
- 80% van taken geautomatiseerd
- 3 fulltime medewerkers vervangen
- AI assistent "Eva" werkt 24/7

**PrivaNotify** (SaaS)
- Gebouwd en gelanceerd op de loopband
- 100% abuse detectie
- €3k eerste deal via voice notes

## Hoe het werkt

1. **Kennismakingsgesprek** - We leren je bedrijf kennen, geen pitch
2. **Custom stappenplan** - Duidelijke mijlpalen, tijdlijnen, verwachte ROI
3. **Bouwen & lanceren** - Regelmatige updates, geen verrassingen
4. **Optimaliseren & schalen** - Je AI wordt steeds slimmer

De meeste projecten duren 2-4 weken.

## Klaar om te automatiseren?

Als je nog steeds:
- Handmatig leads beantwoordt
- Tussen apps copy-paste
- Weekenden werkt aan admin

...moeten we praten.

[Plan een gratis strategiegesprek →](https://weblyfe.ai/#book)

Geen pitch. Alleen waarde. We identificeren 3 automatiseringskansen in je bedrijf.
`,
  },
  'what-is-openclaw': {
    title: 'What is OpenClaw? The AI Operations Platform Explained',
    titleNl: 'Wat is OpenClaw? Het AI Operations Platform Uitgelegd',
    description: 'A deep dive into OpenClaw, the infrastructure powering autonomous AI agents for business operations.',
    descriptionNl: 'Een diepgaande blik op OpenClaw, de infrastructuur die autonome AI agents voor bedrijfsoperaties aandrijft.',
    category: 'ai',
    date: '2026-03-21',
    readingTime: 8,
    image: '/screenshots/team-dashboard.jpg',
    author: {
      name: 'Seyed Hosseini',
      role: 'Founder, Weblyfe.ai',
      avatar: '/images/team/67a46d44541771441d3337d9_Seyed%20Hosseini%20Techwiz%20Lifestyle%20and%20results.avif',
    },
    content: `
## What is OpenClaw?

OpenClaw is an AI operations platform that enables businesses to deploy autonomous AI agents. These agents can handle everything from customer support to operations management, working 24/7 without human intervention.

## Why We Built It

Running a business means wearing many hats: developer, marketer, support agent, administrator. There simply are not enough hours in the day. We built OpenClaw to solve this problem.

## How It Works

OpenClaw operates on a three-layer architecture:

1. **Directives Layer**: Natural language instructions that define what the AI should do
2. **Orchestration Layer**: The AI makes intelligent decisions about tool usage
3. **Execution Layer**: Deterministic scripts that perform actual tasks

This separation ensures reliability. The AI handles judgment calls while scripts handle execution.

## Real World Results

Companies using OpenClaw have seen:

- 80% reduction in operational tasks
- 24/7 availability without hiring
- Response times under 2 minutes
- Significant cost savings vs full-time employees

## Case Studies

### Eva at Dubai Property

Eva manages an entire real estate operation: website updates, CRM analysis, client communications, and custom dashboards. She effectively replaces 3 full-time employees.

[Read the full Eva case study](/case-studies/eva-dubai-property)

### Ben at CZA

Ben handles WhatsApp lead qualification for a construction company. Response time dropped from 4 hours to 2 minutes, and they capture 40% more leads.

[Read the full CZA case study](/case-studies/cza-ben-de-voorman)

## Getting Started

Ready to deploy your own AI operations platform? Here is how to start:

1. **Book a Discovery Call**: We will assess your current operations
2. **Define Your Needs**: We identify which tasks can be automated
3. **Deploy Your Agent**: Custom AI trained on your business
4. **Monitor and Optimize**: Continuous improvement

[Book your call today](/book)

## The Future

AI agents are not replacing humans. They are handling the repetitive work so humans can focus on what matters: creativity, relationships, and strategy.

OpenClaw is the infrastructure making this possible for businesses of any size.

---

*Have questions about OpenClaw? [Contact us](/contact) or check our [FAQ](/faq).*
    `,
  },
  'ai-assistant-vs-human-employee': {
    title: 'AI Assistant vs Human Employee: The Real Comparison',
    titleNl: 'AI Assistent vs Menselijke Medewerker: De Echte Vergelijking',
    description: 'When does it make sense to deploy an AI assistant? A practical framework for the decision.',
    descriptionNl: 'Wanneer is het zinvol om een AI assistent in te zetten? Een praktisch framework voor de beslissing.',
    category: 'opinion',
    date: '2026-03-20',
    readingTime: 12,
    image: '/screenshots/eva-mission-control.jpg',
    author: {
      name: 'Seyed Hosseini',
      role: 'Founder, Weblyfe.ai',
      avatar: '/images/team/67a46d44541771441d3337d9_Seyed%20Hosseini%20Techwiz%20Lifestyle%20and%20results.avif',
    },
    content: `
## The Question Everyone Asks

"Should I hire a person or deploy an AI?"

It is the most common question we get. And the answer is not simple.

## When AI Wins

AI assistants excel at:

- **Repetitive tasks**: Data entry, form filling, scheduling
- **24/7 availability**: Customer support, lead capture
- **Speed**: Instant responses, parallel processing
- **Consistency**: Same quality every time
- **Scale**: Handle 100 inquiries as easily as 1

## When Humans Win

Humans are better at:

- **Creativity**: Novel solutions, emotional intelligence
- **Relationships**: Building trust, negotiation
- **Judgment**: Complex decisions, ethical considerations
- **Adaptability**: Handling truly unexpected situations

## The Framework

Ask these questions:

1. **Is the task repetitive?** AI
2. **Does it require emotional intelligence?** Human
3. **Is 24/7 availability important?** AI
4. **Does it involve complex judgment?** Human
5. **Will volume increase significantly?** AI

## Cost Comparison

| Factor | AI Assistant | Human Employee |
|--------|--------------|----------------|
| Monthly cost | 500 to 1500 EUR | 3000 to 5000 EUR |
| Availability | 24/7 | 40 hrs/week |
| Scaling | Instant | Months to hire |
| Sick days | 0 | 10+ per year |
| Training | Once | Ongoing |

## The Hybrid Approach

The best results come from combining both:

- AI handles initial contact, qualification, scheduling
- Humans handle complex conversations, negotiations, relationships
- AI handles follow-ups, reminders, documentation
- Humans handle strategy, creativity, leadership

## Our Recommendation

Start with AI for:

1. Lead qualification
2. Customer support (tier 1)
3. Scheduling and calendar management
4. Data entry and CRM updates
5. Follow-up sequences

Keep humans for:

1. Sales conversations
2. Complex problem solving
3. Relationship building
4. Creative work
5. Strategic decisions

---

*Need help deciding? [Book a call](/book) and we will assess your specific situation.*
    `,
  },
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = posts[slug];
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const title = locale === 'nl' ? post.titleNl : post.title;
  const description = locale === 'nl' ? post.descriptionNl : post.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}) {
  const { slug, locale } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  const title = locale === 'nl' ? post.titleNl : post.title;
  const content = locale === 'nl' && post.contentNl ? post.contentNl : post.content;

  const categoryColors: Record<string, string> = {
    ai: 'bg-purple-500/20 text-purple-300',
    automation: 'bg-blue-500/20 text-blue-300',
    'case-study': 'bg-green-500/20 text-green-300',
    tutorial: 'bg-yellow-500/20 text-yellow-300',
    opinion: 'bg-red-500/20 text-red-300',
  };

  return (
    <main className="min-h-screen bg-[#031D16]">
      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#DFB771] hover:text-[#FFD99A] mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded text-sm font-medium ${categoryColors[post.category]}`}>
                {post.category.replace('-', ' ')}
              </span>
              <span className="text-[#F6FEFC]/40 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readingTime} min read
              </span>
              <span className="text-[#F6FEFC]/40 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F6FEFC] mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-xl text-[#F6FEFC]/60 mb-8">
              {locale === 'nl' ? post.descriptionNl : post.description}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-[#F6FEFC] font-medium">{post.author.name}</div>
                <div className="text-[#F6FEFC]/50 text-sm">{post.author.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <article 
              className="prose prose-lg prose-invert prose-headings:text-[#F6FEFC] prose-p:text-[#F6FEFC] prose-li:text-[#F6FEFC] prose-a:text-[#DFB771] prose-strong:text-[#F6FEFC] prose-code:text-[#DFB771] prose-pre:bg-[#0E3D31] prose-pre:border prose-pre:border-[#247459]/20 max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          </div>
        </div>
      </section>

      {/* Share */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 py-6 border-t border-b border-[#247459]/20">
              <span className="text-[#F6FEFC]/50 text-sm">Share this post:</span>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://weblyfe.ai/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0E3D31] flex items-center justify-center text-[#F6FEFC]/60 hover:text-[#DFB771] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://weblyfe.ai/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0E3D31] flex items-center justify-center text-[#F6FEFC]/60 hover:text-[#DFB771] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-r from-[#247459]/30 to-[#DFB771]/10 border border-[#247459]/30 p-8 text-center">
            <h2 className="text-2xl font-bold text-[#F6FEFC] mb-4">
              Ready to automate your operations?
            </h2>
            <p className="text-[#F6FEFC]/60 mb-6">
              Book a free discovery call and see how AI can transform your business.
            </p>
            <a 
              href="/#book"
              className="inline-block px-6 py-3 bg-[#DFB771] text-[#031D16] rounded-lg font-semibold hover:bg-[#FFD99A] transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// Simple markdown renderer (for demo, use proper MDX in production)
function renderMarkdown(content: string): string {
  return content
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-10 mb-4">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline hover:no-underline">$1</a>')
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc my-4">$&</ul>')
    .replace(/\|(.*)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(c => c.trim());
      return `<tr>${cells.map(c => `<td class="border border-[#247459]/30 px-4 py-2">${c}</td>`).join('')}</tr>`;
    })
    .replace(/(<tr.*<\/tr>\n?)+/g, '<table class="w-full border-collapse my-6">$&</table>')
    .replace(/^(?!<[a-z])(.*$)/gm, (match) => {
      if (match.trim() === '' || match.trim() === '---') return match;
      return `<p class="my-4">${match}</p>`;
    })
    .replace(/---/g, '<hr class="border-[#247459]/30 my-8" />');
}
