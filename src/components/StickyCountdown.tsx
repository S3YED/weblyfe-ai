'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Bell } from 'lucide-react';

function getTimeLeft(target: number) {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  return {
    d: Math.floor(diff / (1000 * 60 * 60 * 24)),
    h: Math.floor((diff / (1000 * 60 * 60)) % 24),
    m: Math.floor((diff / (1000 * 60)) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

// Fixed launch date: March 30, 2026 23:59 CET (Amsterdam)
const LAUNCH_DATE = new Date('2026-03-30T23:59:00+01:00').getTime();

function getLaunchTime() {
  return LAUNCH_DATE;
}

export default function StickyCountdown() {
  const [launchTime] = useState(getLaunchTime);
  const [time, setTime] = useState(getTimeLeft(launchTime));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(launchTime)), 1000);
    return () => clearInterval(id);
  }, [launchTime]);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#031D16]/95 backdrop-blur-md border-t border-[#247459]/30 safe-bottom"
        >
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            {/* Timer */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#DFB771] flex-shrink-0" />
              <div className="flex items-center gap-1 text-[#F6FEFC] font-mono text-sm font-bold tabular-nums">
                <span className="bg-[#0E3D31] px-1.5 py-0.5 rounded">{pad(time.d)}d</span>
                <span className="text-[#DFB771]/40">:</span>
                <span className="bg-[#0E3D31] px-1.5 py-0.5 rounded">{pad(time.h)}h</span>
                <span className="text-[#DFB771]/40">:</span>
                <span className="bg-[#0E3D31] px-1.5 py-0.5 rounded">{pad(time.m)}m</span>
                <span className="text-[#DFB771]/40">:</span>
                <span className="bg-[#0E3D31] px-1.5 py-0.5 rounded">{pad(time.s)}s</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#pricing"
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#DFB771] to-[#FFD99A] text-[#031D16] text-xs font-bold px-4 py-2.5 rounded-full whitespace-nowrap shadow-lg shadow-[#DFB771]/15 hover:scale-105 transition-transform"
            >
              <Bell className="w-3.5 h-3.5" />
              Get Launch Price
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
