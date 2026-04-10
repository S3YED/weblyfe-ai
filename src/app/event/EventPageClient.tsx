'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, Zap, Check, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const PDF_CHECKOUT_URL = 'https://buy.stripe.com/7sYaEYfAn30C8BncwJ3Je2I';

const WHAT_YOU_LEARN = [
  { title: 'How OpenClaw actually works under the hood', desc: 'Not just demos — the architecture that makes agents reliable at scale.' },
  { title: 'Build vs buy: when to use agents vs automation', desc: 'The decision framework we use with every client before writing a single line of code.' },
  { title: 'The Agentic Agency model', desc: 'How to run a services business where AI does 80% of the delivery.' },
  { title: 'Live build: Appie from scratch', desc: 'Watch us set up a real working agent in under 15 minutes on stage.' },
  { title: 'Your own AI stack in 2025–2026', desc: 'The tools, models, and infra decisions that actually matter right now.' },
];

const WHAT_INCLUDED = [
  '2-hour masterclass (14:00–16:00)',
  'Full lunch & open bar',
  'Networking with other builders',
  'Q&A with Seyed directly',
  'Post-event resource pack (slides + notes)',
  'First-access to future Weblyfe workshops',
];

const SOCIAL_PROOF = [
  { quote: 'This changed how I think about my entire business model.', name: 'Ravi S.', role: 'Agency owner, Dubai' },
  { quote: 'I came for the technical stuff, stayed for the business model. Seyed doesn\'t hold back.', name: 'Marie V.', role: 'Freelance developer, Amsterdam' },
  { quote: 'Best € I\'ve spent on my education this year. No contest.', name: 'Thomas K.', role: 'Founder, SaaS startup' },
];

export default function EventPageClient() {
  return (
    <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#031D16]/90 backdrop-blur-md border-b border-[#0E3D31]/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={120} height={36} className="h-7 w-auto" />
          </Link>
          <a
            href={PDF_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2.5 px-5"
          >
            Get Your PDF →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 right-[12%] w-80 h-80 rounded-full bg-gradient-to-br from-[#DFB771]/20 to-[#FFD99A]/10 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-20 left-[8%] w-96 h-96 rounded-full bg-gradient-to-br from-[#247459]/25 to-[#0E3D31]/15 blur-3xl pointer-events-none"
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#247459]/20 border border-[#247459]/40 text-[#DFB771] text-sm font-semibold px-5 py-2 rounded-full mb-8"
          >
            <Calendar className="w-4 h-4" />
            <span>Saturday, April 12th · Rotterdam</span>
          </motion.div>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            The TechwizZ Assembly
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            OpenClaw &<br />
            <span className="text-[#DFB771]">The Agentic Agency</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#F6FEFC]/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            What happens when you stop doing everything yourself and start building AI agents that work for you?
          </motion.p>

          {/* Event details grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: MapPin, text: 'Rotterdam' },
              { icon: Clock, text: 'Doors 13:00 · Masterclass 14:00–16:00' },
              { icon: Users, text: 'Limited seats' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-[#0E3D31]/50 border border-[#247459]/30 text-[#F6FEFC]/80 text-sm px-4 py-2.5 rounded-full">
                <Icon className="w-4 h-4 text-[#DFB771]" />
                {text}
              </div>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={PDF_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group text-lg px-8 py-4 flex items-center gap-2"
            >
              Get the PDF — Your Entry Ticket
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-[#F6FEFC]/40 text-sm max-w-xs">
              Showing the PDF is your entry ticket to the assembly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS THIS ── */}
      <section className="py-20 bg-gradient-to-b from-[#031D16] to-[#0E3D31]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Not a webinar. Not a Zoom call.</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">First Assembly.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: '🏙️',
                title: 'Rotterdam',
                desc: 'An actual room. Actual people. Real conversations you can\'t have over a screen.',
              },
              {
                emoji: '⚡',
                title: 'No fluff',
                desc: 'No pitch decks. No "I\'m also an entrepreneur" energy. Just real architecture and real models.',
              },
              {
                emoji: '🍽️',
                title: 'Fully hosted',
                desc: 'Lunch, drinks, and 2 hours of dense content. Stay for the networking. Or don\'t.',
              },
            ].map(({ emoji, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0E3D31]/40 border border-[#247459]/30 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-[#F6FEFC]/55 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU LEARN ── */}
      <section className="py-20 bg-[#0E3D31]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">The Masterclass</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">What We&apos;re Covering</h2>
            <p className="text-[#F6FEFC]/60 text-lg">14:00 — 16:00 · No breaks. You can leave after.</p>
          </motion.div>

          <div className="space-y-4">
            {WHAT_YOU_LEARN.map(({ title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-[#031D16]/50 border border-[#247459]/25 rounded-xl p-6"
              >
                <div className="w-8 h-8 rounded-full bg-[#247459] text-[#F6FEFC] flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{title}</h3>
                  <p className="text-[#F6FEFC]/55 text-sm">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-20 bg-[#031D16]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">Included</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Food & Drinks</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {WHAT_INCLUDED.map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 bg-[#0E3D31]/50 border border-[#247459]/30 rounded-xl px-4 py-3 text-left"
              >
                <Check className="w-4 h-4 text-[#DFB771] flex-shrink-0" />
                <span className="text-sm text-[#F6FEFC]/80">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-20 bg-gradient-to-b from-[#031D16] to-[#0E3D31]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">From Previous Sessions</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">People Who Came</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOCIAL_PROOF.map(({ quote, name, role }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0E3D31]/40 border border-[#247459]/30 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 text-[#DFB771]" fill="#DFB771" />)}
                </div>
                <p className="text-[#F6FEFC]/80 text-sm leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
                <div>
                  <div className="font-bold text-sm">{name}</div>
                  <div className="text-[#F6FEFC]/40 text-xs">{role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SEYED ── */}
      <section className="py-20 bg-[#031D16]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="relative flex-shrink-0">
              <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-[#247459]/40">
                <Image
                  src="/agents/seyed-portrait.jpg"
                  alt="Seyed Hosseini - Techwiz"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#DFB771] text-[#031D16] text-xs font-bold px-3 py-1.5 rounded-full">
                🧙‍♂️ Techwiz
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-[#F6FEFC] mb-2">Seyed Hosseini</h3>
              <p className="text-[#DFB771] text-sm font-medium mb-4">Founder of Weblyfe · Techwiz · AI Agent Builder</p>
              <p className="text-[#F6FEFC]/70 text-base leading-relaxed mb-4">
                Doctor-turned-entrepreneur who built a multi-6-figure agency with AI & no-code tools. 
                Guest lecturer at the American University of Dubai. Built 6+ AI agents in the last 2 months 
                that now run his business 24/7.
              </p>
              <p className="text-[#F6FEFC]/50 text-sm">
                Over €500K generated for clients through Weblyfe. 5-star rated. Zero fluff.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-[#0E3D31] relative overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-[#DFB771]/15 to-[#FFD99A]/10 blur-3xl pointer-events-none"
        />

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-[#247459]/20 border border-[#247459]/40 text-[#DFB771] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              Limited seats · First Assembly
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Don&apos;t sleep on this.
            </h2>
            <p className="text-[#F6FEFC]/60 text-lg mb-8">
              April 12th. Rotterdam. Show up with the PDF on your phone — that&apos;s your ticket.
            </p>

            <a
              href={PDF_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group text-lg inline-flex items-center gap-2"
            >
              Get the PDF — Your Entry Ticket
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="text-[#F6FEFC]/30 text-xs mt-6">
              Showing the PDF is your entry ticket. No PDF = no entry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 bg-[#031D16] border-t border-[#0E3D31]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={100} height={30} className="h-6 w-auto opacity-50" />
          </Link>
          <p className="text-[#F6FEFC]/30 text-xs">© 2026 Weblyfe · seyed@weblyfe.nl</p>
        </div>
      </footer>
    </main>
  );
}
