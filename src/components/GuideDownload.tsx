'use client';

import { motion } from 'framer-motion';
import { Download, FileText, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const chapters = [
  'Hardware & Server Setup (Hetzner)',
  'OpenClaw Installation & Configuration',
  'Hermes Agent Migration Guide',
  'MiniMax M2.7 + OpenRouter Integration',
  'Telegram & WhatsApp Bot Setup',
  'Skills Library (55+ Skills)',
  'UFW, Tailscale & Security Hardening',
  'Memory, SOUL.md & Identity Design',
  'Appie Kit GitHub Starter',
  'Monitoring, Backups & Recovery',
];

export default function GuideDownload() {
  return (
    <section id="guide" className="py-24 md:py-32 bg-[#0E3D31] relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#DFB771] text-sm font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-4 h-4" />
            The Complete Guide
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F6FEFC] mb-4">
            Build Your Own 24/7 AI Employee
          </h2>
          <p className="text-[#F6FEFC]/50 text-lg max-w-xl mx-auto">
            v4.4 — Updated April 2026. By Seyed Hosseini · Weblyfe.ai
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: What's inside */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#F6FEFC] font-bold text-xl mb-6">What&apos;s inside (10 chapters)</h3>
            <div className="space-y-3">
              {chapters.map((ch, i) => (
                <div key={ch} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#247459]/30 border border-[#247459]/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#DFB771] text-xs font-bold">{i + 1}</span>
                  </span>
                  <span className="text-[#F6FEFC]/70 text-sm">{ch}</span>
                </div>
              ))}
            </div>

            {/* What's new badge */}
            <div className="mt-8 p-4 bg-[#DFB771]/10 border border-[#DFB771]/20 rounded-xl">
              <p className="text-[#DFB771] text-xs font-bold uppercase tracking-wide mb-2">New in v4.4</p>
              <ul className="space-y-1.5">
                {['Hermes Agent migration guide', 'MiniMax M2.7 (17x cheaper)', 'fal.ai + RunPod toolkit', 'Playwright browser automation', 'UI/UX Pro Max design suite'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-[#F6FEFC]/60 text-xs">
                    <Check className="w-3 h-3 text-[#DFB771] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Download card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#031D16] rounded-3xl p-8 border border-[#247459]/20"
          >
            {/* PDF preview thumbnail */}
            <div className="bg-[#F6FEFC] rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-14 bg-[#247459] rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#031D16] font-bold text-sm leading-tight">Build Your Own</p>
                  <p className="text-[#031D16]/60 text-xs">24/7 AI Employee v4.4.pdf</p>
                  <p className="text-[#031D16]/40 text-xs mt-1">7.7 MB · 56 pages</p>
                </div>
              </div>
              <div className="space-y-1.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-2.5 bg-[#247459]/10 rounded-full" style={{ width: `${70 + i * 5}%` }} />
                ))}
              </div>
            </div>

            {/* What's included */}
            <div className="mb-6">
              <p className="text-[#F6FEFC]/40 text-xs uppercase tracking-wide mb-3">Also includes</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Copy/paste templates',
                  'Appie Kit GitHub starter',
                  'OpenRouter $50 free credit',
                  'Community Discord access',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-[#F6FEFC]/60 text-xs">
                    <Check className="w-3 h-3 text-[#247459] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-4 text-center">
              <span className="text-[#F6FEFC]/40 line-through text-sm">€47</span>
              <span className="text-[#F6FEFC] font-bold text-3xl ml-2">Free</span>
            </div>

            {/* CTA */}
            <Link
              href="/guide/Build-Your-Own-Appie-v4.pdf"
              download
              className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold rounded-xl transition-all"
            >
              <Download className="w-5 h-5" />
              Download free PDF guide
            </Link>

            <p className="text-center text-[#F6FEFC]/30 text-xs mt-3">
              No email required · Instant download · v4.4 April 2026
            </p>

            {/* Hetzner affiliate nudge */}
            <div className="mt-6 pt-6 border-t border-[#247459]/20">
              <p className="text-[#F6FEFC]/40 text-xs text-center mb-2">
                Need a server? Use our Hetzner link — €20 free credit
              </p>
              <Link
                href="https://console.hetzner.com/refer/..."
                className="flex items-center justify-center gap-1 text-[#DFB771] hover:underline text-xs"
              >
                Get free Hetzner credit →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
