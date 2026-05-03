'use client';

import { motion } from 'framer-motion';

type Props = {
  className?: string;
};

export default function HairlineDivider({ className }: Props) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: '0% 50%' }}
      className={`h-px bg-gradient-to-r from-transparent via-[#DFB771]/60 to-transparent ${className ?? ''}`}
    />
  );
}
