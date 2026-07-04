'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { GOOGLE_REVIEWS, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_PLACE_URL } from './data/google-reviews';

export default function GoogleReviewsSlider() {
  const [current, setCurrent] = useState(0);
  const reviews = GOOGLE_REVIEWS.filter(r => r.text); // skip empty reviews
  const total = reviews.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // Update if reviews length changes
  useEffect(() => {
    if (current >= total) setCurrent(0);
  }, [current, total]);

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-[#031D16] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#DFB771]/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Section title */}
        <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-3">What Clients Say</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#F6FEFC]">
          Trusted by 59+ clients
        </h2>

        {/* Google badge */}
        <a
          href={GOOGLE_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#F6FEFC] text-[#031D16] rounded-full px-5 py-2.5 mb-12 hover:shadow-lg hover:shadow-[#DFB771]/10 transition-all duration-300"
        >
          {/* Google G logo (inline SVG) */}
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>

          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
            <span className="text-sm font-semibold">
              {GOOGLE_RATING} · {GOOGLE_REVIEW_COUNT} Google reviews
            </span>
          </div>
        </a>

        {/* Review cards - sliding */}
        <div className="relative">
          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-[#0E3D31]/60 backdrop-blur border border-[#247459]/30 flex items-center justify-center text-[#F6FEFC]/60 hover:text-[#DFB771] hover:border-[#DFB771]/50 transition-all"
            aria-label="Previous review"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-[#0E3D31]/60 backdrop-blur border border-[#247459]/30 flex items-center justify-center text-[#F6FEFC]/60 hover:text-[#DFB771] hover:border-[#DFB771]/50 transition-all"
            aria-label="Next review"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Cards container */}
          <div className="overflow-hidden px-8">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 text-left max-w-2xl mx-auto"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-[#F6FEFC]/90 text-lg leading-relaxed mb-8 italic">
                &ldquo;{reviews[current].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={reviews[current].photo}
                  alt={reviews[current].author}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full border-2 border-[#DFB771]/30 object-cover"
                  unoptimized
                />
                <div>
                  <p className="text-[#F6FEFC] font-semibold text-sm">{reviews[current].author}</p>
                  <p className="text-[#F6FEFC]/40 text-xs">{reviews[current].time} via Google</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-[#DFB771] w-6'
                    : 'bg-[#F6FEFC]/20 hover:bg-[#F6FEFC]/40'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View all link */}
        <a
          href={GOOGLE_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#F6FEFC]/50 hover:text-[#DFB771] text-sm mt-10 transition-colors"
        >
          View all 59 reviews on Google
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
    </section>
  );
}