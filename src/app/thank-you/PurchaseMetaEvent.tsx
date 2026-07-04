'use client';

import { useEffect } from 'react';
import { trackMetaEvent } from '@/components/MetaEvents';

export default function PurchaseMetaEvent() {
  useEffect(() => {
    trackMetaEvent('Purchase', {
      content_name: 'Build Your Own Appie',
      content_category: 'PDF Guide',
      value: 65,
      currency: 'EUR',
    });
  }, []);

  return null;
}
