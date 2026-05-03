'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export type Project = {
  name: string;
  url: string;
  image: string;
  industry: string;
  scope: string;
  highlight?: string;
};

type Props = {
  projects: Project[];
};

export default function ProjectsSlider({ projects }: Props) {
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
  const next = () => scrollToIndex(Math.min(projects.length - 1, activeIndex + 1));

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {projects.map((project, i) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="snap-center shrink-0 w-[88%] sm:w-[72%] md:w-[58%] lg:w-[46%]"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#1a2e27]/70 hover:bg-[#1a2e27] rounded-3xl overflow-hidden border border-[#247459]/30 hover:border-[#DFB771]/60 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} - live website`}
                  fill
                  sizes="(max-width: 768px) 88vw, 46vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/85 via-[#031D16]/30 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#031D16]/70 backdrop-blur-sm border border-[#DFB771]/30 text-[#DFB771] text-xs font-semibold uppercase tracking-widest">
                  {project.industry}
                </div>
              </div>
              <div className="p-7 md:p-8">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-[#F6FEFC] font-bold text-xl md:text-2xl leading-tight">
                    {project.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-[#F6FEFC]/40 group-hover:text-[#DFB771] mt-1 transition-colors flex-shrink-0" />
                </div>
                <p className="text-[#F6FEFC]/65 text-sm md:text-base leading-relaxed mb-4">
                  {project.scope}
                </p>
                {project.highlight && (
                  <div className="pt-4 border-t border-[#247459]/25">
                    <p className="text-[#DFB771] text-sm font-semibold">{project.highlight}</p>
                  </div>
                )}
              </div>
            </a>
          </motion.article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          aria-label="Vorig project"
          className="w-11 h-11 rounded-full bg-[#247459]/20 hover:bg-[#247459]/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-[#F6FEFC] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ga naar project ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? 'w-8 bg-[#DFB771]' : 'w-2 bg-[#247459]/40 hover:bg-[#247459]/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeIndex === projects.length - 1}
          aria-label="Volgend project"
          className="w-11 h-11 rounded-full bg-[#247459]/20 hover:bg-[#247459]/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-[#F6FEFC] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
