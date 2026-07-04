export const PDF_CHECKOUT_URL = 'https://buy.stripe.com/7sYaEYfAn30C8BncwJ3Je2I';

export const APPIE_DM_SOURCE = 'instagram_dm_appie';
export const APPIE_DM_CAMPAIGN = 'appie_ai_guide_3day_test';

export function buildTrackedOpenClawUrl({
  baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://weblyfe.ai',
  source = APPIE_DM_SOURCE,
  medium = 'email',
  campaign = APPIE_DM_CAMPAIGN,
  content = 'dm_appie_email_bridge',
}: {
  baseUrl?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
} = {}) {
  const url = new URL('/openclaw', baseUrl);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', campaign);
  url.searchParams.set('utm_content', content);
  return url.toString();
}

export function appendTrackingParams(
  targetUrl: string,
  params: Record<string, string | null | undefined>
) {
  const url = new URL(targetUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}
