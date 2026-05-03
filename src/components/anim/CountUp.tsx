'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  separator?: string;
  padTo?: number;
  className?: string;
};

export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1.4,
  decimals = 0,
  separator = '.',
  padTo,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const rounded = Math.round(value);
  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : padTo
      ? rounded.toString().padStart(padTo, '0')
      : rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
