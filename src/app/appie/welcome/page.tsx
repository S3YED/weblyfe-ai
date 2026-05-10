// Stripe Payment Link success landing.
// Buyers land here after Checkout. We tell them to check their inbox; the
// magic-link email is sent by the stripe-instant-appie webhook.
//
// Auto-redirects to /appie/auth/login after 5s so the customer never gets
// stuck on a static page.

import WelcomeView from '@/components/appie/WelcomeView';

export const metadata = {
  title: 'Bedankt | Instant Appie',
  robots: { index: false, follow: false },
};

export default async function WelcomePage({
  searchParams,
}: {
  searchParams?: Promise<{ session_id?: string; name?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  return <WelcomeView name={sp.name ?? null} sessionId={sp.session_id ?? null} />;
}
