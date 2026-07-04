'use client';

import { useEffect } from 'react';

type FbqEvent = 'ViewContent' | 'Lead' | 'InitiateCheckout' | 'Purchase';

declare global {
  interface Window {
    fbq?: (
      command: 'track' | 'trackCustom',
      event: string,
      params?: Record<string, unknown>,
      options?: Record<string, unknown>
    ) => void;
  }
}

export function trackMetaEvent(
  event: FbqEvent,
  params?: Record<string, unknown>,
  options?: Record<string, unknown>
) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', event, params, options);
}

export function MetaEvent({
  event,
  params,
}: {
  event: FbqEvent;
  params?: Record<string, unknown>;
}) {
  useEffect(() => {
    trackMetaEvent(event, params);
  }, [event, params]);

  return null;
}
