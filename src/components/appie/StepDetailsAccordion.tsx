'use client';

// Expandable "Wat gebeurt er nu?" panel below the timeline.
// Educates the customer with a one-paragraph technical explanation per step.

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DETAILS: { id: string; title: string; body: string }[] = [
  {
    id: 'server-creating',
    title: '1. Server reserveren',
    body:
      'We claimen voor jou een Hetzner CX32 in Helsinki, EU-data only. Eigen vCPU, eigen schijf, eigen IP. Niemand deelt jouw Appie.',
  },
  {
    id: 'network-attaching',
    title: '2. Netwerk en firewall',
    body:
      'Tailscale mesh komt erop, firewall sluit alles dicht behalve SSH (alleen Weblyfe sleutels) en uitgaand verkeer naar Telegram en je tools.',
  },
  {
    id: 'cloud-init-running',
    title: '3. Cloud-init',
    body:
      'Ubuntu 24.04 wordt gebakken met onze Hermes-image: Node, Python, ffmpeg, secrets, logging, SSL voor je toekomstige domein.',
  },
  {
    id: 'telegram-bot-leasing',
    title: '4. Telegram bot leasen',
    body:
      'Je krijgt een bot uit onze Bot-pool. Eigen username, eigen token, alleen jij kunt hem aanspreken. Geen gedeelde threads.',
  },
  {
    id: 'agent-starting',
    title: '5. Persoonlijke Techwiz instellen',
    body:
      'De Hermes agent boot up met jouw naam, doelklant en stem. Vanaf nu schrijft Appie zoals jij dat wil, in jouw taal en toon.',
  },
  {
    id: 'first-ping',
    title: '6. Eerste briefing',
    body:
      'Appie stuurt je een eerste persoonlijke ping op Telegram. Je antwoordt, en hij is wakker. Vanaf hier is hij van jou.',
  },
];

export default function StepDetailsAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#DFB771]">Educatie</span>
          <p className="mt-1 text-sm font-semibold text-white">Wat gebeurt er nu?</p>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} className="text-white/55" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-5 pb-5">
              {DETAILS.map((d) => (
                <div key={d.id} className="border-l border-[#DFB771]/30 pl-4">
                  <p className="text-sm font-semibold text-white">{d.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">{d.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
