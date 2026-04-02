import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'From Voice Agents to AI Employees: Everything We've Built at Weblyfe',
  description: 'How we built AI employees that handle sales qualification, construction inquiries, GDPR compliance, and internal operations 24/7 for €45/month. The full story, tech stack, and real results.',
  alternates: { canonical: 'https://weblyfe.ai/blog/voice-agents-to-ai-employees' },
  openGraph: {
    title: 'From Voice Agents to AI Employees: Everything We've Built at Weblyfe',
    description: 'How we built AI employees that handle sales qualification, construction inquiries, GDPR compliance, and internal operations 24/7 for €45/month.',
    images: ['/blog/voice-agents-cover.jpg'],
  },
};

export default function VoiceAgentsArticle() {
  return (
    <div className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#031D16]/95 backdrop-blur-md shadow-lg py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={120} height={36} className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-[#F6FEFC]/70 hover:text-[#DFB771] text-sm font-medium transition-colors">
              Blog
            </Link>
            <Link href="/" className="text-[#F6FEFC]/70 hover:text-[#DFB771] text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/openclaw#waitlist" className="btn-primary text-sm py-2 px-5">
              Join Waitlist
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-24 pb-24 px-6">
        {/* Cover Image */}
        <div className="max-w-4xl mx-auto mb-12">
          <Image
            src="/blog/voice-agents-cover.jpg"
            alt="From Voice Agents to AI Employees"
            width={1920}
            height={1080}
            className="w-full rounded-2xl"
            priority
          />
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto prose prose-invert prose-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#F6FEFC]">
            From Voice Agents to AI Employees: Everything We've Built at Weblyfe
          </h1>

          <div className="flex items-center gap-4 mb-8 text-[#F6FEFC]/60 text-sm">
            <span>April 2, 2026</span>
            <span>•</span>
            <span>15 min read</span>
            <span>•</span>
            <span className="text-[#DFB771]">Case Study</span>
          </div>

          <div className="text-[#F6FEFC]/80 leading-relaxed space-y-6">
            <p>
              I started Weblyfe as a web design agency. Clean websites, good branding, Webflow builds. That was the plan.
            </p>
            <p>
              Three years later, we're running AI employees that handle sales qualification, construction inquiries, GDPR compliance pipelines, and our own internal operations, 24/7, for €45/month total. No salaries. No sick days. No "can we reschedule?"
            </p>
            <p>
              This is the full story of what we've built, how we built it, and what it actually costs.
            </p>

            <hr className="border-[#247459]/30 my-12" />

            <h2 className="text-3xl font-bold text-[#DFB771] mt-12 mb-6">
              Part 1: Voice Agents: When Clients Stop Typing and Start Talking
            </h2>

            <p>
              The first time a client sent me a voice note on Telegram to trigger an automation, I knew we were onto something.
            </p>
            <p>
              Most AI agents assume people type. But if you watch how people actually communicate, especially business owners, contractors, field teams, they don't type. They record a 45-second voice note while driving to a job site. They say "add this to the project list" while walking between meetings. They voice-message their team 20 times a day.
            </p>
            <p>
              So we built for that.
            </p>
            <p>
              We integrated voice-activated AI agents across Telegram and WhatsApp. The pipeline is straightforward but powerful: client sends a voice message, it gets picked up by the agent, transcribed, understood, and acted on. No typing required.
            </p>
            <p>
              The transcription layer is built on <strong>Faster-Whisper</strong>. We started with the base model: fast, cheap, good enough for most use cases. Word Error Rate (WER) around 15%. That sounds okay until you realize 15% errors on a 100-word voice message means 15 words wrong. For an automation pipeline, that's catastrophic if those words are numbers, names, or action words.
            </p>
            <p>
              We moved to large-v3. WER dropped to 7%. That's the difference between "schedule a meeting with Jan at 3" and "schedule a meeting with Jan at tree." It matters.
            </p>
            <p>
              For voice responses, we use <strong>Piper TTS</strong>. Open source, runs locally, sounds natural enough that people don't immediately clock it as a robot. We've played with ElevenLabs for higher-stakes client interactions, but for internal automations, Piper does the job.
            </p>

            <div className="bg-[#0E3D31]/50 border border-[#247459]/30 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-[#DFB771] mb-4">Real use cases:</h3>
              <ul className="space-y-3 text-[#F6FEFC]/80">
                <li>Field contractor sends voice note: "Job on Keizersgracht done, needs invoice." Agent parses, creates invoice in Airtable, sends to client.</li>
                <li>Sales rep sends voice note: "Lead from yesterday, Ahmad, score him hot, follow up Friday." Agent updates CRM, schedules reminder.</li>
                <li>Business owner says "what's my pipeline today?" Agent reads back pipeline summary from Monday CRM in natural language.</li>
              </ul>
            </div>

            <p>
              This isn't science fiction. This is what we're running right now.
            </p>

            <hr className="border-[#247459]/30 my-12" />

            <h2 className="text-3xl font-bold text-[#DFB771] mt-12 mb-6">
              Part 2: Lead Qualification at Scale
            </h2>

            <p>
              Let me tell you about a problem that sounds simple until you're in it.
            </p>
            <p>
              Dubai Property (dubai-property.nl) was getting <strong>752 leads</strong> in their pipeline. Real people, real interest in real estate deals in Dubai. The problem? Qualifying them.
            </p>
            <p>
              A good real estate lead qualification call takes 10-15 minutes. You figure out budget, timeline, what they're looking for, whether they're a serious buyer or just browsing. Then you route them to the right agent.
            </p>
            <p>
              Do the math: 752 leads × 10 minutes = 7,520 minutes. That's <strong>125 hours of calls</strong>. Just to qualify. Before any actual selling happens.
            </p>
            <p>
              Their team was drowning. Leads were going cold because nobody had time to call them fast enough. A lead that doesn't hear from you in the first hour? You've lost them 60% of the time. That's real money.
            </p>
            <p>
              We built <strong>Eva</strong>.
            </p>
            <p>
              Eva de Vries is an AI sales agent. She has a full personality: professional Dutch real estate agent, knows the Dubai market, speaks to leads in their language (Dutch, English, Arabic; she handles all three). She handles inbound leads 24/7, qualifies them based on our criteria, assigns them to the right human agent, and sends reminders when follow-ups are needed.
            </p>

            <div className="bg-[#0E3D31]/50 border border-[#247459]/30 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-[#DFB771] mb-4">Technical stack:</h3>
              <ul className="space-y-2 text-[#F6FEFC]/80">
                <li>• Telegram as the communication layer</li>
                <li>• Monday CRM for lead management and routing</li>
                <li>• Webflow API to pull live property listings</li>
              </ul>
            </div>

            <div className="bg-[#247459]/20 border-l-4 border-[#DFB771] pl-6 py-4 my-8">
              <h3 className="text-xl font-bold text-[#DFB771] mb-3">Results after deployment:</h3>
              <ul className="space-y-2 text-[#F6FEFC]">
                <li>• <strong>160 HOT leads</strong> auto-qualified. No human touch for first qualification.</li>
                <li>• Average first response time: <strong>under 2 minutes</strong>. Down from hours.</li>
                <li>• Human agents now only talk to pre-qualified leads. Their close rate went up.</li>
              </ul>
            </div>

            <p>
              The insight that made this work wasn't the technology. It was the <strong>personality</strong>.
            </p>
            <p>
              We could have built a generic chatbot that asks "What is your budget?" in a robotic sequence. But leads disengage from that immediately. Eva doesn't feel like a bot. She follows up naturally, she acknowledges what you said, she makes connections between your answers.
            </p>
            <p>
              Personality is not a nice-to-have. It's the difference between a 40% engagement rate and an 80% engagement rate.
            </p>

            <hr className="border-[#247459]/30 my-12" />

            <h2 className="text-3xl font-bold text-[#DFB771] mt-12 mb-6">
              Part 3: Business Automations Beyond Sales
            </h2>

            <p>
              Lead qualification gets the headlines, but the automations that save the most time are the boring ones nobody talks about.
            </p>
            <p>
              <strong>Ben de Voorman</strong> is our AI agent for CZA Bouwbedrijf, a Dutch construction company. Construction is a world where everything happens via WhatsApp. Clients message at 7am about a quote. Subcontractors send updates at 10pm. Project managers are on-site all day.
            </p>
            <p>
              We built Ben to handle all of that.
            </p>

            <div className="bg-[#0E3D31]/50 border border-[#247459]/30 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-[#DFB771] mb-4">Ben handles:</h3>
              <ul className="space-y-3 text-[#F6FEFC]/80">
                <li>• <strong>Project inquiries:</strong> "Can you give me a quote for a kitchen renovation in Rotterdam?"</li>
                <li>• <strong>Site visit scheduling:</strong> "I'd like someone to come look at the property on Thursday."</li>
                <li>• <strong>FAQ responses:</strong> hours, service areas, typical timelines, what's included in a quote.</li>
              </ul>
            </div>

            <p>
              Ben speaks Dutch. Professional construction tone, no corporate fluff, no overly formal language, the way a Dutch tradesman actually talks.
            </p>
            <p>
              Before Ben, average response time to an inquiry was 4-6 hours. After Ben: <strong>under 30 seconds</strong>. Same quality, same tone, zero manual work for routine inquiries.
            </p>

            <hr className="border-[#247459]/30 my-12" />

            <h2 className="text-3xl font-bold text-[#DFB771] mt-12 mb-6">
              Part 4: The Appie Fleet: Our Own AI Employees
            </h2>

            <p>
              Here's the part that gets people.
            </p>
            <p>
              We didn't just build AI employees for clients. We built our own.
            </p>
            <p>
              Three AI employees running 24/7 to operate Weblyfe:
            </p>

            <div className="bg-[#0E3D31]/50 border border-[#247459]/30 rounded-xl p-6 my-8 space-y-4">
              <div>
                <h4 className="text-lg font-bold text-[#DFB771]">Appie-1 (Orchestrator)</h4>
                <p className="text-[#F6FEFC]/80">Runs on a Mac Mini in the office. The brain. Receives directives, breaks them into tasks, delegates to Appie-2 and Appie-3, monitors execution, reports back.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#DFB771]">Appie-2 (CMO/Herald)</h4>
                <p className="text-[#F6FEFC]/80">Runs on DigitalOcean. Marketing, content, communications. Writing articles like this one. Managing the content calendar. Drafting email sequences.</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#DFB771]">Appie-3 (CTO/DevOps)</h4>
                <p className="text-[#F6FEFC]/80">Also on DigitalOcean. Technical execution. Deploys code, monitors systems, manages infrastructure, handles technical client requests.</p>
              </div>
            </div>

            <p>
              The framework we built is called <strong>DOE</strong>: Directive, Orchestration, Execution.
            </p>

            <div className="bg-[#247459]/20 border-l-4 border-[#DFB771] pl-6 py-4 my-8">
              <p className="text-2xl font-bold text-[#DFB771] mb-2">€45/month</p>
              <p className="text-[#F6FEFC]/80">Three AI employees, running 24/7, handling 800+ tasks per month. That's hosting costs on DigitalOcean plus API costs.</p>
            </div>

            <p>
              The thing that surprised us most wasn't efficiency. It was the <strong>Self-Annealing Loop</strong>.
            </p>
            <p>
              When something breaks (and things always break), the system is designed to get smarter from it. When an error occurs, it gets logged, analyzed, and the root cause gets documented. The next time something similar happens, the system has context. Over time, the system improves not despite failures, but because of them.
            </p>

            <hr className="border-[#247459]/30 my-12" />

            <h2 className="text-3xl font-bold text-[#DFB771] mt-12 mb-6">
              The Stack
            </h2>

            <div className="bg-[#0E3D31]/50 border border-[#247459]/30 rounded-xl p-6 my-8 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-[#DFB771] mb-2">Infrastructure</h4>
                  <ul className="space-y-1 text-[#F6FEFC]/80 text-sm">
                    <li>• OpenClaw (orchestration)</li>
                    <li>• DigitalOcean (hosting)</li>
                    <li>• n8n (workflow automation)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#DFB771] mb-2">AI & Voice</h4>
                  <ul className="space-y-1 text-[#F6FEFC]/80 text-sm">
                    <li>• Claude (Anthropic)</li>
                    <li>• Faster-Whisper (STT)</li>
                    <li>• Piper TTS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#DFB771] mb-2">Communication</h4>
                  <ul className="space-y-1 text-[#F6FEFC]/80 text-sm">
                    <li>• Telegram</li>
                    <li>• WhatsApp Business API</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-[#DFB771] mb-2">Data & CRM</h4>
                  <ul className="space-y-1 text-[#F6FEFC]/80 text-sm">
                    <li>• Airtable</li>
                    <li>• Monday CRM</li>
                    <li>• Notion</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="border-[#247459]/30 my-12" />

            <h2 className="text-3xl font-bold text-[#DFB771] mt-12 mb-6">
              What's Next
            </h2>

            <p>
              This isn't the end. It's the beginning.
            </p>
            <p>
              We're building <strong>weblyfe.ai</strong> to package all of this for other agencies and businesses. The same AI employees. The same infrastructure. The same frameworks. But pre-built, tested, and ready to deploy.
            </p>
            <p>
              If you want to run AI employees in your business without hiring a dev team, that's what we're building.
            </p>

            <div className="bg-[#247459]/20 border border-[#DFB771]/50 rounded-2xl p-8 my-12 text-center">
              <h3 className="text-2xl font-bold text-[#DFB771] mb-4">Want to build your own AI employee?</h3>
              <p className="text-[#F6FEFC]/80 mb-6">Join the waitlist for early access to the platform.</p>
              <Link href="/openclaw#waitlist" className="btn-primary inline-block">
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
