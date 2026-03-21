import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoCarousel from '@/components/LogoCarousel';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import LeadMagnet from '@/components/LeadMagnet';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import GoogleReviews from '@/components/GoogleReviews';
import FAQ from '@/components/FAQ';
import BookingEmbed from '@/components/BookingEmbed';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LogoCarousel />
      <Services />
      <CaseStudies />
      <LeadMagnet />
      <HowItWorks />
      <Testimonials />
      <GoogleReviews />
      <FAQ />
      <BookingEmbed />
      <CTA />
      <Footer />
    </main>
  );
}
