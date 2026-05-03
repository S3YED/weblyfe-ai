'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Image from 'next/image';
import AppieTilt from './anim/AppieTilt';

export type CaseStudy = {
  name: string;
  role: string;
  quote: string;
  portrait?: string;
  metric?: { value: string; label: string };
  audioSrc?: string;
};

type Props = {
  studies: CaseStudy[];
};

export default function CaseStudySlider({ studies }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement | undefined;
    if (!card) return;
    const offset = card.offsetLeft - track.offsetLeft;
    track.scrollTo({ left: offset, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      if (cards.length === 0) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let nearestDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2 - track.offsetLeft;
        const dist = Math.abs(center - cardCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = i;
        }
      });
      setActiveIndex(nearest);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(studies.length - 1, activeIndex + 1));

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {studies.map((sp, i) => (
          <motion.article
            key={sp.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="snap-center shrink-0 w-[88%] sm:w-[70%] md:w-[55%] lg:w-[42%]"
          >
            <AppieTilt max={4} className="bg-gradient-to-b from-[#1a2e27]/80 to-[#0E3D31]/40 rounded-3xl border border-[#247459]/30 p-8 md:p-10 hover:border-[#DFB771]/50 transition-colors h-full">
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + s * 0.08, type: 'spring', stiffness: 220, damping: 14 }}
                  >
                    <Star className="w-4 h-4 text-[#DFB771] fill-[#DFB771]" />
                  </motion.span>
                ))}
              </div>
              {sp.metric && (
                <div className="text-right">
                  <p className="text-[#DFB771] text-2xl font-bold leading-none">{sp.metric.value}</p>
                  <p className="text-[#F6FEFC]/40 text-xs uppercase tracking-wider mt-1">{sp.metric.label}</p>
                </div>
              )}
            </div>

            <Quote className="w-8 h-8 text-[#DFB771]/30 mb-3" />
            <p className="text-[#F6FEFC]/85 text-base md:text-lg leading-relaxed mb-7 min-h-[140px]">
              {sp.quote}
            </p>

            {sp.audioSrc && (
              <div className="mb-6">
                <audio controls preload="none" className="w-full h-10">
                  <source src={sp.audioSrc} type="audio/mpeg" />
                </audio>
              </div>
            )}

            <div className="flex items-center gap-4 pt-5 border-t border-[#247459]/20">
              {sp.portrait ? (
                <Image
                  src={sp.portrait}
                  alt={`${sp.name} portret`}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#DFB771]/40"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#247459]/20 flex items-center justify-center">
                  <span className="text-[#247459] font-bold">{sp.name[0]}</span>
                </div>
              )}
              <div>
                <p className="text-[#F6FEFC] font-semibold">{sp.name}</p>
                <p className="text-[#F6FEFC]/50 text-sm">{sp.role}</p>
              </div>
            </div>
            </AppieTilt>
          </motion.article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          aria-label="Vorige case"
          className="w-11 h-11 rounded-full bg-[#247459]/20 hover:bg-[#247459]/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-[#F6FEFC] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {studies.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ga naar case ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? 'w-8 bg-[#DFB771]' : 'w-2 bg-[#247459]/40 hover:bg-[#247459]/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeIndex === studies.length - 1}
          aria-label="Volgende case"
          className="w-11 h-11 rounded-full bg-[#247459]/20 hover:bg-[#247459]/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-[#F6FEFC] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
