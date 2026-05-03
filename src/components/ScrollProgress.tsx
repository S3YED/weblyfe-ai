'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gradient-to-r from-[#DFB771] via-[#F4D58D] to-[#DFB771] shadow-[0_0_8px_rgba(223,183,113,0.55)]"
    />
  );
}
