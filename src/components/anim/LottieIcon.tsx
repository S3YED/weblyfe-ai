'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react').then((m) => m.default), {
  ssr: false,
  loading: () => null,
});

type Props = {
  src: string;
  fallback?: ReactNode;
  className?: string;
  loop?: boolean;
};

export default function LottieIcon({
  src,
  fallback,
  className,
  loop = true,
}: Props) {
  const [data, setData] = useState<unknown | null>(null);
  const [reduced, setReduced] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    cancelledRef.current = false;
    fetch(src)
      .then((r) => r.json())
      .then((j) => {
        if (!cancelledRef.current) setData(j);
      })
      .catch(() => {
        // Silent fail; fallback renders.
      });
    return () => {
      cancelledRef.current = true;
    };
  }, [src, reduced]);

  return (
    <div className={className} aria-hidden="true">
      {reduced || !data ? (
        fallback ?? null
      ) : (
        <Lottie animationData={data} loop={loop} autoplay />
      )}
    </div>
  );
}
