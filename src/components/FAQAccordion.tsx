'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const SMOOTH = [0.16, 1, 0.3, 1] as const;

export type FAQItem = {
  q: string;
  a: string;
};

type Props = {
  items: ReadonlyArray<FAQItem>;
  defaultOpen?: number;
};

export default function FAQAccordion({ items, defaultOpen = -1 }: Props) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: SMOOTH }}
            className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#1a2e27]/70 transition-colors"
            >
              <span className="font-semibold text-base md:text-lg text-[#F6FEFC] pr-4">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: SMOOTH }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-[#DFB771]" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: SMOOTH }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[#F6FEFC]/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
