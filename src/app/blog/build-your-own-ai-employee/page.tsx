import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'I Built 3 AI Employees for $146/Month. Here\'s Everything.',
  description:
    'I went from medical doctor to running a web design agency powered by 3 AI employees. This is the full story, the real numbers, and the open-source kit to build your own.',
  alternates: {
    canonical: 'https://weblyfe.ai/blog/build-your-own-ai-employee',
  },
  openGraph: {
    title: 'I Built 3 AI Employees for $146/Month. Here\'s Everything.',
    description:
      '50 won proposals. 756 leads captured. 3 AI employees running 24/7 for $146/month. The full story and the open-source kit to build your own.',
    url: 'https://weblyfe.ai/blog/build-your-own-ai-employee',
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'I Built 3 AI Employees for $146/Month. Here\'s Everything.',
  author: { '@type': 'Person', name: 'Seyed', url: 'https://weblyfe.ai' },
  publisher: {
    '@type': 'Organization',
    name: 'Weblyfe.ai',
    logo: { '@type': 'ImageObject', url: 'https://weblyfe.ai/logo-gold.svg' },
  },
  datePublished: '2026-03-26',
  description:
    'The full story of going from medical doctor to running 3 AI employees for $146/month — plus the open-source Appie Kit to build your own.',
  mainEntityOfPage: 'https://weblyfe.ai/blog/build-your-own-ai-employee',
};

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#031D16]/95 backdrop-blur-md shadow-lg py-4">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={120} height={36} className="h-7 w-auto" />
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/blog" className="text-[#DFB771] font-medium text-sm">
                ← All Posts
              </Link>
              <Link href="/openclaw#waitlist" className="btn-primary text-sm py-2 px-5">
                Join Waitlist
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#DFB771] bg-[#DFB771]/10 px-3 py-1 rounded-full border border-[#DFB771]/20">
                Automation
              </span>
              <span className="text-[#F6FEFC]/40 text-sm">March 26, 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              I Built 3 AI Employees for{' '}
              <span className="text-[#DFB771]">$146/Month</span>.{' '}
              Here&apos;s Everything.
            </h1>
            <p className="text-[#F6FEFC]/70 text-xl leading-relaxed">
              I went from medical doctor to running a web design agency powered by 3 AI employees.
              This is the full story, the real numbers, and the open-source kit to build your own.
            </p>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-[#247459]/30">
              {[
                { value: '50', label: 'Won proposals' },
                { value: '756', label: 'Leads captured' },
                { value: '$146/mo', label: '3 AI employees' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-[#DFB771]">{stat.value}</div>
                  <div className="text-xs text-[#F6FEFC]/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Article body */}
        <article className="px-6 pb-24">
          <div className="max-w-2xl mx-auto space-y-8 text-[#F6FEFC]/85 text-[17px] leading-relaxed">

            <p className="text-xl text-[#F6FEFC] font-medium">
              What if your business ran itself while you slept?
            </p>

            <p>
              Not in a vague, someday-maybe way. Actually ran itself. Responded to leads within 2
              seconds. Sent proposals, followed up, captured contacts. Ran security scans on your
              servers. Kept your content pipeline moving. All while you were in bed.
            </p>

            <p>
              That&apos;s what my business looks like now. And I want to show you exactly how I built it.
            </p>

            <hr className="border-[#247459]/30" />

            <h2 className="text-2xl font-bold text-[#F6FEFC] mt-12">I Was Not Supposed to Be Doing This</h2>

            <p>
              My original plan was medicine. I studied it, trained for it. And then, somewhere along
              the way, I started building websites on the side.
            </p>

            <p>
              The websites turned into a company. The company is Weblyfe. We build story-driven
              websites and automations for businesses. We&apos;ve worked with YouTubers with millions of
              subscribers, Dubai property developers, software startups, educators, retail brands.
            </p>

            <p>
              But running a creative agency is relentless. Emails coming in at 2am. Proposals to
              write. Leads to follow up with. Clients to keep updated. Content to publish. Invoices
              to chase. Systems to monitor.
            </p>

            <p>
              I was drowning in operational overhead. The kind of work that&apos;s necessary but not
              meaningful. The kind of work that steals your creative energy and leaves you too tired
              to do the things that actually matter.
            </p>

            <p>
              I had a choice: hire more people, or build something smarter. I chose to build.
            </p>

            <hr className="border-[#247459]/30" />

            <h2 className="text-2xl font-bold text-[#F6FEFC] mt-12">Enter Appie</h2>

            <p>
              About a year ago, I started building what I now call Appie. Not an app. Not a chatbot.
              An actual AI employee.
            </p>

            <p>
              Appie runs on a stack of tools I stitched together: OpenClaw (the AI agent framework),
              Claude (the brain), Telegram (the interface), Webflow, Airtable, Brevo, Offorte, and
              n8n as the workflow engine underneath.
            </p>

            <p>
              The first version was clunky. It forgot context. It hallucinated. It sent messages I
              had to manually fix.
            </p>

            <p>
              But I kept iterating. Fixed things. Wrote better prompts. Built better memory systems.
              Added tools. Gave it a proper soul.
            </p>

            <p>And then it started working. Really working.</p>

            <p>Today I run three Appies:</p>

            <div className="bg-[#0E3D31]/50 rounded-2xl p-6 border border-[#247459]/30 space-y-3">
              {[
                { name: 'Appie-1', role: 'Mac Mini at home. The orchestrator. Manages the other two.' },
                { name: 'Appie-2', role: 'DigitalOcean VPS. The CMO. Handles marketing, content, and client communications.' },
                { name: 'Appie-3', role: 'DigitalOcean VPS. The CTO. Monitors infrastructure, runs security checks, handles DevOps.' },
              ].map((a) => (
                <div key={a.name} className="flex gap-3">
                  <span className="text-[#DFB771] font-bold shrink-0">{a.name}</span>
                  <span className="text-[#F6FEFC]/70">{a.role}</span>
                </div>
              ))}
            </div>

            <p>
              Together they handle 200+ tasks daily across 5+ companies. For{' '}
              <strong className="text-[#F6FEFC]">$146/month</strong> in infrastructure costs.
            </p>

            <p>
              A human assistant with even a fraction of these capabilities costs $3,000 to $5,000
              per month. Minimum.
            </p>

            <hr className="border-[#247459]/30" />

            <h2 className="text-2xl font-bold text-[#F6FEFC] mt-12">The Numbers Are Real</h2>

            <p>
              I want to be specific, because vague claims are everywhere and I hate them. Here&apos;s
              what the Appie system has produced:
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '50', label: 'Won proposals tracked in Offorte' },
                { value: '756', label: 'Leads captured in Airtable' },
                { value: '300+', label: 'Contacts managed automatically' },
                { value: '$146/mo', label: 'Total infrastructure cost' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#0E3D31]/50 rounded-xl p-5 border border-[#247459]/30"
                >
                  <div className="text-3xl font-bold text-[#DFB771]">{item.value}</div>
                  <div className="text-sm text-[#F6FEFC]/60 mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            <p>These aren&apos;t projections. They&apos;re the actual numbers from my actual business.</p>

            <hr className="border-[#247459]/30" />

            <h2 className="text-2xl font-bold text-[#F6FEFC] mt-12">What Appie Actually Does</h2>

            <p>
              People ask me what an AI employee does that a chatbot can&apos;t. The difference is agency.
              A chatbot waits. Appie acts.
            </p>

            {[
              {
                title: 'Lead capture in 2 seconds',
                body: "When someone fills out a form on a Webflow site, Appie receives the webhook, logs the lead to Airtable, sends a personalised reply email via Brevo, and notifies me on Telegram. All within 2 seconds. No human in the loop unless I want one.",
              },
              {
                title: 'Daily infrastructure monitoring',
                body: "Every morning, Appie-3 runs a security scan on the servers. Checks SSH logs, open ports, service health, disk usage. Sends a summary to a Telegram channel. If something is wrong, it alerts me immediately.",
              },
              {
                title: 'Content pipeline',
                body: "Appie-2 manages our content calendar in Notion, drafts social posts based on recent projects, and tracks what's been published. It doesn't replace my voice. It handles the logistics so I can focus on the actual writing.",
              },
              {
                title: 'Proposal intelligence',
                body: "When a new proposal goes into Offorte, Appie tracks its status. If a proposal has been viewed but not signed after 3 days, it flags it for follow-up. Nothing falls through the cracks.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-[#DFB771]/50 pl-5">
                <h3 className="font-bold text-[#F6FEFC] mb-2">{item.title}</h3>
                <p className="text-[#F6FEFC]/70">{item.body}</p>
              </div>
            ))}

            <hr className="border-[#247459]/30" />

            <h2 className="text-2xl font-bold text-[#F6FEFC] mt-12">Why I&apos;m Publishing Everything</h2>

            <p>
              I spent months building this system. Debugging it at 2am. Writing and rewriting the
              prompts. Figuring out which tools to connect and how.
            </p>

            <p>
              And I kept thinking: other people could use this. Not just big companies with AI
              budgets. Small agencies. Freelancers. Founders who are doing everything themselves and
              slowly burning out.
            </p>

            <p>
              So I packaged everything up into{' '}
              <strong className="text-[#F6FEFC]">Appie Kit</strong> and published it on GitHub. Free.
              Open.
            </p>

            <div className="bg-[#0E3D31]/50 rounded-2xl p-6 border border-[#247459]/30 space-y-3">
              {[
                'Drag-and-drop workspace files (SOUL.md, MEMORY.md, USER.md, TOOLS.md)',
                '6 battle-tested tools including stealth browser, CAPTCHA solver, and Whisper STT',
                '3 real case studies from my actual business',
                '4 prompt libraries (lead response, content, proposals, DevOps)',
                'One-command installer',
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="text-[#DFB771] mt-0.5 shrink-0">✓</span>
                  <span className="text-[#F6FEFC]/80">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://github.com/S3YED/appie-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0E3D31] hover:bg-[#247459] border border-[#247459] text-[#F6FEFC] font-medium px-6 py-3 rounded-xl transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View Appie Kit on GitHub
            </a>

            <hr className="border-[#247459]/30" />

            <h2 className="text-2xl font-bold text-[#F6FEFC] mt-12">How to Start (5 Steps)</h2>

            <div className="space-y-4">
              {[
                { step: '1', title: 'Clone the repo', code: 'git clone https://github.com/S3YED/appie-kit.git\ncd appie-kit' },
                { step: '2', title: 'Run the installer', code: './install.sh' },
                { step: '3', title: 'Customize 3 files', code: '# SOUL.md — give your Appie a personality\n# USER.md — tell it who you are\n# TOOLS.md — connect it to your stack' },
                { step: '4', title: 'Start your Appie', code: 'openclaw start' },
                { step: '5', title: 'Talk to it on Telegram', code: null },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#DFB771] text-[#031D16] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#F6FEFC] mb-2">{item.title}</div>
                    {item.code && (
                      <pre className="bg-[#031D16] border border-[#247459]/30 rounded-xl p-4 text-sm text-[#F6FEFC]/80 overflow-x-auto font-mono">
                        <code>{item.code}</code>
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-[#247459]/30" />

            <h2 className="text-2xl font-bold text-[#F6FEFC] mt-12">This Is Not Magic. It&apos;s Infrastructure.</h2>

            <p>
              I want to be honest with you about something. Appie is not magic. It makes mistakes.
              It occasionally does the wrong thing. It needs supervision, especially at the start.
            </p>

            <p>
              But so does a human employee. The difference is that Appie improves with every prompt
              you write. Every correction you make gets embedded into its memory. Every new tool you
              connect expands what it can do.
            </p>

            <p>
              After a few weeks of working with it, it starts to feel less like a tool and more like
              a colleague. One that never complains, never calls in sick, and genuinely wants to help.
            </p>

            <hr className="border-[#247459]/30" />

            <h2 className="text-2xl font-bold text-[#F6FEFC] mt-12">Three Ways to Build</h2>

            <div className="grid gap-4">
              {[
                {
                  name: 'DIY',
                  desc: 'The GitHub repo plus the full PDF guide. Everything you need to build it yourself.',
                  tag: 'Free to start',
                },
                {
                  name: 'Managed',
                  desc: 'We build your Appie for you. Customize it to your business, connect it to your tools, train it on your workflows.',
                  tag: 'Done for you',
                },
                {
                  name: 'Enterprise',
                  desc: 'A full Appie fleet. Multiple agents with defined roles, shared memory, coordinated tasks.',
                  tag: 'Full fleet',
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className="bg-[#0E3D31]/50 rounded-xl p-5 border border-[#247459]/30 flex items-start gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-[#F6FEFC]">{tier.name}</span>
                      <span className="text-xs text-[#DFB771] bg-[#DFB771]/10 px-2 py-0.5 rounded-full border border-[#DFB771]/20">
                        {tier.tag}
                      </span>
                    </div>
                    <p className="text-[#F6FEFC]/65 text-sm">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#0E3D31] to-[#031D16] rounded-2xl p-8 border border-[#247459]/40 text-center mt-12">
              <h2 className="text-2xl font-bold text-[#F6FEFC] mb-3">Join the Waitlist</h2>
              <p className="text-[#F6FEFC]/70 mb-6 max-w-md mx-auto">
                Get early access to OpenClaw, the Appie Kit PDF guide (62 pages), and invites to live
                build sessions.
              </p>
              <Link
                href="/openclaw#waitlist"
                className="inline-block bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-bold px-8 py-4 rounded-xl transition-colors text-lg"
              >
                Get Early Access
              </Link>
              <p className="text-[#F6FEFC]/40 text-sm mt-4">
                From doctor to automation architect. If I can build this, you can too.
              </p>
            </div>

          </div>
        </article>
      </div>
    </>
  );
}
