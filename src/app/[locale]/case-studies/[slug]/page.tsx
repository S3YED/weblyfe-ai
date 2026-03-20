import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock, Zap, TrendingUp, Shield, MessageSquare, Bot, ExternalLink } from 'lucide-react';

// Case study data with full content
const caseStudies: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  mobileImage?: string;
  gallery?: string[];
  stats: { label: string; value: string; before?: string }[];
  tech: string[];
  quote: string;
  author: string;
  challenge: string;
  solution: string;
  results: string[];
  projectUrl?: string;
  weblyfeUrl?: string;
}> = {
  'cza-ben-de-voorman': {
    title: 'CZA Ben de Voorman',
    subtitle: 'AI WhatsApp Lead Qualification',
    description: 'Dutch construction company handling dozens of inquiries weekly.',
    fullDescription: 'CZA Ben de Voorman is a Dutch construction company that was struggling to handle the volume of inquiries coming through their WhatsApp Business account. They were losing potential jobs because responses took hours or even days, especially for inquiries that came in after hours.',
    image: '/screenshots/cza-fresh.jpg',
    stats: [
      { label: 'Faster Response', value: '99%', before: '4-24 hrs → 2 min' },
      { label: 'Time Saved Weekly', value: '13+ hrs' },
      { label: 'More Leads Captured', value: '40%' },
    ],
    tech: ['GPT-4.1', 'Gemini', 'WhatsApp API', 'Monday.com', 'Supabase', 'React'],
    quote: '"We used to lose jobs because we couldn\'t respond fast enough. Now leads get answers immediately."',
    author: 'Ben, Owner',
    challenge: 'Ben was personally answering every WhatsApp message, which meant inquiries during meetings, evenings, or weekends would go unanswered for hours. Competitors who responded faster were winning jobs.',
    solution: 'We built a complete AI-powered dashboard with: (1) Real-time WhatsApp chat interface with AI responses, (2) Lead scoring system that rates inquiries 0-100 based on project size, urgency, and fit, (3) Automatic sync with Monday.com CRM, (4) After-hours auto-responses that capture lead details for morning follow-up.',
    results: [
      'Response time dropped from 4-24 hours to under 2 minutes',
      '40% more leads captured from after-hours inquiries',
      '13+ hours per week saved on repetitive responses',
      'Lead quality scoring helps prioritize high-value projects',
      'Full conversation history synced to CRM automatically',
    ],
    weblyfeUrl: 'https://weblyfe.nl/projects/cza-dashboard',
  },
  'safesite-security': {
    title: 'SAFESITE Security',
    subtitle: 'Voice-to-Website in 24 Hours',
    description: 'Former military bodyguard needed a corporate website.',
    fullDescription: 'Shay, a former military bodyguard starting his own security company, needed a professional corporate website. But he didn\'t have time for traditional web development processes: endless email chains, Figma reviews, revision cycles.',
    image: '/screenshots/safesite-fresh.jpg',
    stats: [
      { label: 'Faster Than Agency', value: '93%', before: '2 weeks → 1 day' },
      { label: 'Design Meetings', value: '0' },
      { label: 'Revision Cycles', value: '0' },
    ],
    tech: ['Webflow', 'Claude AI', 'Telegram', 'WhatsApp', 'Faster Whisper'],
    quote: '"I just talked about what I needed. Next morning, the website was live."',
    author: 'Shay, Founder',
    challenge: 'Traditional web projects take 2-4 weeks minimum. Shay needed something faster. He also wanted a process that felt natural: just talking about his business, not filling out forms or reviewing mockups.',
    solution: 'We set up a voice-to-website pipeline: (1) Shay sent voice notes via Telegram/WhatsApp describing his business, (2) AI transcribed and extracted key information automatically, (3) Website was designed and built in Webflow based on the voice inputs, (4) Feedback came back as voice notes → auto-transcribed → implemented, (5) Live within 24 hours.',
    results: [
      '95% faster than traditional web development',
      'Zero meetings or email chains required',
      'Website went live same day',
      'All feedback processed via natural conversation',
      'Client could work on his business while website was built',
    ],
    projectUrl: 'https://safesite-security.vercel.app',
    weblyfeUrl: 'https://weblyfe.nl/projects/safesite',
  },
  'eva-dubai-property': {
    title: 'Eva · Dubai Property',
    subtitle: 'AI Real Estate Operations Manager',
    description: 'Full-stack AI assistant managing website content, CRM analysis, and client communications.',
    fullDescription: 'Dubai Property needed an AI that could handle multiple operational tasks simultaneously: updating website content, analyzing CRM data, monitoring client communications, analyzing sales calls, and generating custom reports. Eva was born.',
    image: '/screenshots/eva-mission-control.jpg',
    gallery: [
      '/screenshots/eva-mission-control.jpg',
      '/screenshots/eva-projects.jpg',
      '/screenshots/eva-prd.jpg',
      '/screenshots/eva-team-org.jpg',
      '/screenshots/eva-calendar.jpg',
    ],
    stats: [
      { label: 'Tasks Automated', value: '80%' },
      { label: 'Response Time', value: '<5 min', before: '2-4 hrs' },
      { label: 'FTEs Replaced', value: '3' },
    ],
    tech: ['Claude AI', 'CRM Integration', 'Call Analysis', 'Mission Control', 'Tailscale', 'Custom Dashboards'],
    quote: '"Eva handles what used to take 3 people. Website updates, lead follow-ups, reporting: all automated."',
    author: 'Dubai Property Team',
    challenge: 'The team was drowning in operational tasks: manually updating property listings, chasing leads through the CRM, listening to sales calls for insights, building weekly reports. Three people\'s worth of work.',
    solution: 'Eva is a comprehensive AI operations manager with: (1) Website management that updates listings, images, and content autonomously, (2) CRM analysis that tracks lead status, suggests follow-ups, identifies hot prospects, (3) Communication monitoring that summarizes all incoming messages, flags urgent items, (4) Call analysis that listens to sales calls, extracts key points, identifies objections, (5) Custom dashboards that build whatever reports the team needs, (6) Mission Control, a dedicated interface to oversee Eva\'s operations.',
    results: [
      '80% of operational tasks now fully automated',
      'Response time to leads dropped from hours to minutes',
      '99.9% uptime. Eva works while the team sleeps',
      'Custom dashboards generated on-demand',
      'Call insights help improve sales performance',
    ],
  },
  'bot-farm-defense': {
    title: 'Bot Farm Defense',
    subtitle: 'Automated Reputation Protection',
    description: '10 fake one-star reviews hit in one hour.',
    fullDescription: 'A coordinated attack: 10 one-star reviews appeared within an hour, all from accounts with suspicious patterns. The client\'s rating was tanking, and Google\'s reporting system moves slowly.',
    image: '/screenshots/botfarm.jpg',
    stats: [
      { label: 'Removal Rate', value: '100%' },
      { label: 'Faster Than Manual', value: '96%', before: '2 days → 2 hrs' },
      { label: 'Rating Restored', value: '4.8★' },
    ],
    tech: ['OSINT Analysis', 'Google Account Analysis', 'Pattern Detection', 'Automated Reporting'],
    quote: '"The chance that 9 legitimate reviewers have the exact same profile is less than 0.000001%."',
    author: 'Analysis Report',
    challenge: 'Fake reviews are hard to prove. Google requires compelling evidence. Manual investigation of 10 accounts across multiple data points would take days.',
    solution: 'We deployed an AI-powered investigation: (1) Analyzed all 10 reviewer accounts for patterns, (2) Cross-referenced profile photos, review history, account ages, (3) Identified IP ranges and timing patterns, (4) Found 9 accounts with identical profile characteristics, (5) Generated comprehensive evidence report, (6) Filed removal requests with Google.',
    results: [
      '9 out of 10 fake reviews successfully removed',
      'Investigation completed in 2 hours vs. 2+ days manually',
      '50+ evidence points documented',
      'Clear probability analysis showing coordinated attack',
      'Client\'s rating restored',
    ],
  },
  'privanotify': {
    title: 'PrivaNotify',
    subtitle: 'AI-Powered Anonymous Messaging SaaS',
    description: 'Platform for sending anonymous, AI-crafted messages about sensitive topics.',
    fullDescription: 'Sometimes people need to communicate sensitive information anonymously, whether it\'s telling someone about a health issue, reporting workplace concerns, or delivering feedback that\'s too awkward face-to-face. PrivaNotify makes this possible while preventing abuse.',
    image: '/screenshots/privanotify-fresh.jpg',
    stats: [
      { label: 'Abuse Blocked', value: '100%' },
      { label: 'User Satisfaction', value: '98%' },
      { label: 'First Deal', value: '€3k' },
    ],
    tech: ['Claude AI', 'Next.js', 'Twilio', 'Stripe', 'Supabase'],
    quote: '"The AI crafts messages that are caring and constructive. Exactly what we needed."',
    author: 'Hesam, Founder',
    challenge: 'Anonymous messaging platforms are magnets for abuse. The challenge was enabling legitimate sensitive communication while making abuse impossible.',
    solution: 'PrivaNotify uses AI at every step: (1) Users describe what they want to communicate, (2) AI rewrites the message to be empathetic and constructive, (3) Abuse detection runs on every message, blocking threats, harassment, and inappropriate content, (4) Recipients can reply (anonymously) to start a dialogue, (5) All messages go through SMS for maximum reach.',
    results: [
      '100% of abusive messages blocked by AI',
      '98% user satisfaction rating',
      'Over 1,000 sensitive messages delivered',
      'Built and launched while working out on a treadmill',
      '€3,000 first deal closed via voice notes to AI',
    ],
    projectUrl: 'https://privanotify.com',
  },
  'executive-assistant': {
    title: 'Executive Assistant',
    subtitle: 'AI That Uses Your Computer',
    description: 'Full executive assistants with computer access.',
    fullDescription: 'Appie (for Seyed) and Garavito (for DV Institute) are AI assistants that go beyond chat. They have actual computer access: booking appointments, filling out forms, sending calendar invites, navigating websites, and executing complex multi-step tasks.',
    image: '/screenshots/team-dashboard.jpg',
    stats: [
      { label: 'Hours Saved Weekly', value: '15+' },
      { label: 'Admin Costs', value: '€0' },
      { label: 'Faster Than Manual', value: '97%', before: '30 min → 1 min' },
    ],
    tech: ['Browser Automation', 'Google Calendar', 'Voice Notes', 'Puppeteer', 'Form Filling'],
    quote: '"Forward a message, send a voice note, or drop a screenshot. Appie handles the rest: bookings, refunds, invites, whatever."',
    author: 'Seyed, CEO',
    challenge: 'Executive tasks are repetitive but require judgment: booking the right restaurant, filling out the right refund form, inviting the right people to a meeting. Too complex for simple automation, too time-consuming for humans.',
    solution: 'The assistants have full computer capabilities: (1) Book and cancel appointments across any booking system, (2) Fill out forms (refunds, applications, registrations), (3) Send calendar invites with proper details, (4) Navigate complex web interfaces, (5) Accept instructions via voice note, screenshot, or forwarded message, (6) Execute multi-step workflows autonomously.',
    results: [
      '15+ hours saved per week on administrative tasks',
      '50+ tasks handled per day',
      '97% faster than doing tasks manually',
      'Works from voice notes, no typing required',
      'Handles multi-step workflows end-to-end',
    ],
  },
  'legal-email-automation': {
    title: 'Legal Email Automation',
    subtitle: 'Domain Dispute Resolution',
    description: 'Months-long domain dispute resolved with one instruction.',
    fullDescription: 'A domain dispute had been dragging on for months. Multiple email threads, various parties involved, payment complications. At 10:49 PM, lying in bed, Seyed sent one voice instruction. The AI handled everything.',
    image: '/screenshots/email.jpg',
    stats: [
      { label: 'Time to Send', value: '1 min', before: '30+ min' },
      { label: 'Faster Process', value: '97%' },
      { label: 'Dispute Resolved', value: '✓' },
    ],
    tech: ['Gmail API', 'Claude AI', 'Thread Analysis', 'Stripe Payment Links'],
    quote: '"Find that email thread. Send them a message that I can\'t cash checks and give them this payment link."',
    author: 'Seyed, CEO',
    challenge: 'Complex email threads are hard to navigate. Finding the right conversation, identifying all parties, writing a professional response, and following up: each step takes time.',
    solution: 'The AI email automation: (1) Searched Gmail for the specific thread based on context clues, (2) Identified all parties involved in the dispute, (3) Understood the history and current status, (4) Wrote a professional email explaining the check issue, (5) Generated and attached a Stripe payment link, (6) Sent the email, (7) Set up automatic follow-up reminders.',
    results: [
      'Task completed in 1 minute vs. 30+ minutes manually',
      'Professional email crafted with full context',
      'Payment link generated automatically',
      'Follow-ups scheduled without additional input',
      'Dispute moved forward while user was in bed',
    ],
  },
  'boooth-booking': {
    title: 'Boooth.me',
    subtitle: 'Photo Booth Rental Booking System',
    description: 'Complete booking system with multi-step configurator.',
    fullDescription: 'Boooth.me rents photo booths for events. Before, every booking required a phone call or email exchange to understand requirements and provide a quote. The new system lets customers configure and book their perfect setup online.',
    image: '/screenshots/boooth-home-fresh.jpg',
    stats: [
      { label: 'Conversion Lift', value: '40%' },
      { label: 'Quote Admin Saved', value: '90%' },
      { label: 'Revenue Increase', value: '35%' },
    ],
    tech: ['Next.js', 'Stripe', 'Multi-step Forms', 'VAT Calculator', 'CRM Integration'],
    quote: '"Customers can now configure and book their perfect photo booth experience online, 24/7."',
    author: 'Client',
    challenge: 'Photo booth rentals have many variables: booth type, duration, extras, delivery location. Manual quoting was time-consuming and limited to business hours.',
    solution: 'A complete self-service booking system: (1) Multi-step configurator walks customers through options, (2) Real-time pricing with VAT calculation, (3) Add extras like props, backdrops, custom branding, (4) Availability calendar shows open dates, (5) Stripe integration for secure payments, (6) Automatic booking confirmation and details to CRM.',
    results: [
      '40% increase in booking conversions',
      'Bookings now possible 24/7',
      '90% reduction in manual quoting work',
      'Customers see exact pricing upfront',
      'All bookings sync to operations automatically',
    ],
    projectUrl: 'https://boooth.me',
    weblyfeUrl: 'https://weblyfe.nl/projects/boooth',
  },
  'titan-transfers': {
    title: 'Titan Transfers',
    subtitle: 'Limousine Booking Platform',
    description: 'Premium limousine service with sleek 4-step booking.',
    fullDescription: 'Titan Transfers provides premium limousine services for airport transfers and executive travel. They needed a booking system as sleek as their vehicles: dark theme, smooth flow, multilingual support.',
    image: '/screenshots/titantransfers-booking-fresh.jpg',
    stats: [
      { label: 'Time to Book', value: '<2 min' },
      { label: 'Market Reach', value: '2x', before: 'NL only → EN + NL' },
      { label: 'Mobile Conversions', value: '65%' },
    ],
    tech: ['Next.js', 'Booking Engine', 'Vehicle Selection', 'Multi-language', 'Dark Theme'],
    quote: '"Book Transfer. One-way or hourly. Airport pickups. Executive travel."',
    author: 'Titan Transfers',
    challenge: 'Premium services need premium experiences. The booking flow had to feel executive-level while being simple enough for quick mobile bookings.',
    solution: 'A 4-step luxury booking experience: (1) Choose transfer type (one-way, round-trip, or hourly), (2) Enter journey details (pickup, dropoff, date, time), (3) Select vehicle (from sedan to stretch limo), (4) Confirm and pay. Full EN/NL language support, dark theme, fully mobile-optimized.',
    results: [
      '100% mobile-responsive design',
      'Bilingual support (English/Dutch)',
      'Streamlined 4-step booking flow',
      'Premium dark theme matches brand',
      'Vehicle selection with clear pricing',
    ],
    projectUrl: 'https://titantransfers.nl',
    weblyfeUrl: 'https://weblyfe.nl/projects/titan-transfers',
  },
  'appie-system': {
    title: 'Appie System',
    subtitle: 'Digital Employee for Entrepreneurs',
    description: 'Multi-agent AI assistant handling everything.',
    fullDescription: 'The Appie System is the AI infrastructure behind everything on this page. Three specialized agents (Appie-1 the Orchestrator, Appie-2 for Marketing/Content, and Appie-3 for Engineering/Security) work 24/7 to handle operations.',
    image: '/screenshots/team-dashboard.jpg',
    stats: [
      { label: 'Always Working', value: '24/7' },
      { label: 'Deadlines Missed', value: '0' },
      { label: 'Value Created', value: '€50k+' },
    ],
    tech: ['Claude', 'OpenClaw', 'n8n', 'Notion', 'Google Workspace', 'Tailscale'],
    quote: '"Having Appie is like having a team that never sleeps. It just handles things."',
    author: 'Seyed, CEO',
    challenge: 'Running a business solo means wearing every hat: developer, marketer, support, admin. There aren\'t enough hours in the day.',
    solution: 'The Appie System is a multi-agent architecture: (1) Appie-1 orchestrates all operations, handles scheduling and coordination, (2) Appie-2 manages marketing, content creation, social media, (3) Appie-3 handles engineering, security audits, infrastructure, (4) All agents share memory and can hand off tasks, (5) Connected to Notion, Google Workspace, GitHub, and more, (6) Works across time zones, always online.',
    results: [
      '3 specialized AI agents working 24/7',
      '50+ tasks handled daily',
      '99.9% uptime',
      'Operations continue while founder sleeps',
      'All major business functions covered',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug];
  
  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#031D16]">
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <Link 
            href="/#case-studies" 
            className="inline-flex items-center gap-2 text-[#DFB771] hover:text-[#FFD99A] mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#247459]/20 text-[#DFB771] text-sm font-medium mb-4">
                {study.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F6FEFC] mb-6">
                {study.title}
              </h1>
              <p className="text-xl text-[#F6FEFC]/60 leading-relaxed mb-8">
                {study.fullDescription}
              </p>
              
              {/* External Links */}
              <div className="flex flex-wrap gap-4">
                {study.projectUrl && (
                  <a 
                    href={study.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#DFB771] text-[#031D16] rounded-full font-semibold hover:bg-[#FFD99A] transition-colors"
                  >
                    View Live Project <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {study.weblyfeUrl && (
                  <a 
                    href={study.weblyfeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#247459] text-[#F6FEFC] rounded-full font-semibold hover:bg-[#247459]/20 transition-colors"
                  >
                    View on Weblyfe <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#247459]/20 shadow-2xl">
                <div className="relative aspect-video">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#DFB771]/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-[#247459]/20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-12 border-y border-[#247459]/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-8">
            {study.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-[#DFB771] mb-2">{stat.value}</div>
                <div className="text-sm text-[#F6FEFC]/50">{stat.label}</div>
                {stat.before && (
                  <div className="text-xs text-[#F6FEFC]/30 line-through mt-1">{stat.before}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Challenge & Solution */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#F6FEFC] mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400">!</span>
                </span>
                The Challenge
              </h2>
              <p className="text-[#F6FEFC]/60 leading-relaxed text-lg">
                {study.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#F6FEFC] mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#247459]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#DFB771]" />
                </span>
                The Solution
              </h2>
              <p className="text-[#F6FEFC]/60 leading-relaxed text-lg">
                {study.solution}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Results */}
      <section className="py-16 md:py-24 bg-[#0E3D31]/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-[#F6FEFC] mb-8 text-center">Results</h2>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4">
              {study.results.map((result, i) => (
                <li key={i} className="flex items-start gap-4 text-lg">
                  <span className="w-6 h-6 rounded-full bg-[#DFB771]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-3 h-3 text-[#DFB771]" />
                  </span>
                  <span className="text-[#F6FEFC]/80">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Quote */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-4xl font-medium text-[#F6FEFC] italic mb-6">
              {study.quote}
            </p>
            <footer className="text-[#DFB771] font-semibold">– {study.author}</footer>
          </blockquote>
        </div>
      </section>
      
      {/* Tech Stack */}
      <section className="py-16 md:py-24 border-t border-[#247459]/20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#F6FEFC] mb-8 text-center">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {study.tech.map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 text-sm rounded-full bg-[#247459]/20 text-[#F6FEFC]/80 border border-[#247459]/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0E3D31]/30 to-[#031D16]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F6FEFC] mb-6">
            Ready for results like these?
          </h2>
          <p className="text-[#F6FEFC]/60 mb-8 max-w-2xl mx-auto">
            Let's discuss how AI automation can transform your business.
          </p>
          <a 
            href="/#book" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#DFB771] text-[#031D16] rounded-full font-semibold text-lg hover:bg-[#FFD99A] transition-colors"
          >
            Book a Discovery Call <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  );
}
