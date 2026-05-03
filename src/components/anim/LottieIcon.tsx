'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => null,
});

type Props = {
  src: string;
  fallback?: ReactNode;
  className?: string;
  loop?: boolean;
  playOnce?: boolean;
};

export default function LottieIcon({
  src,
  fallback,
  className,
  loop = true,
  playOnce = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<unknown | null>(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((j) => {
        if (!cancelled) setData(j);
      })
      .catch(() => {
        // Silent fail; fallback renders.
      });
    return () => {
      cancelled = true;
    };
  }, [src, reduced]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (playOnce) io.disconnect();
          } else if (!playOnce) {
            setInView(false);
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [playOnce]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {reduced || !data ? (
        fallback ?? null
      ) : (
        <Lottie animationData={data} loop={loop} autoplay={inView} />
      )}
    </div>
  );
}
