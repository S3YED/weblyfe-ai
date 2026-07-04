import { redirect } from 'next/navigation';
import { PDF_CHECKOUT_URL, appendTrackingParams } from '@/lib/appie-guide-funnel';

export default async function BuyPdfPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const value = (key: string) => {
    const raw = params[key];
    return Array.isArray(raw) ? raw[0] : raw;
  };

  redirect(appendTrackingParams(PDF_CHECKOUT_URL, {
    utm_source: value('utm_source'),
    utm_medium: value('utm_medium'),
    utm_campaign: value('utm_campaign'),
    utm_content: value('utm_content'),
  }));
}
