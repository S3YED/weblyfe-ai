'use client';

import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

export default function HeroReveal({
  text,
  className,
  delay = 0,
  stagger = 0.025,
}: Props) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              aria-hidden="true"
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.55,
                delay: delay + (wi * 0.05) + (ci * stagger),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
