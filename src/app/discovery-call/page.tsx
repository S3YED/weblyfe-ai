import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata: Metadata = {
  title: 'Plan een discovery call met Seyed | Weblyfe',
  description:
    'Plan een gratis 45 minuten discovery call met Seyed Hosseini. We bespreken jouw bedrijf, je werkweek, en of een Custom Appie de juiste keuze is. Geen verkoop-script.',
  keywords: ['discovery call', 'Custom Appie', 'AI consultancy', 'Seyed Hosseini', 'Weblyfe'],
  alternates: {
    canonical: 'https://weblyfe.ai/discovery-call',
    languages: {
      'nl-NL': 'https://weblyfe.ai/discovery-call',
      'en-US': 'https://weblyfe.ai/discovery-call',
      'x-default': 'https://weblyfe.ai/discovery-call',
    },
  },
  openGraph: {
    title: 'Plan een discovery call met Seyed',
    description: '45 minuten, geen verkooppraat. Vertel mij over je bedrijf, ik luister.',
    url: 'https://weblyfe.ai/discovery-call',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: ['en_US'],
    images: [{ url: '/screenshots/seyed-founder.png', width: 1305, height: 1272, alt: 'Seyed Hosseini' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plan een discovery call met Seyed | Weblyfe',
    description: '45 minuten, geen verkooppraat.',
    images: ['/screenshots/seyed-founder.png'],
  },
  robots: { index: true, follow: true },
};

export default function DiscoveryCallPage() {
  return (
    <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
      <ScrollProgress />
      <Navbar />

      <section className="pt-32 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-4">
            Plan een gesprek
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            45 minuten, geen verkooppraat.
          </h1>
          <p className="text-[#F6FEFC]/65 text-lg leading-relaxed max-w-2xl mx-auto">
            Vertel mij over je bedrijf, je werkweek en wat je dwarszit. Ik kijk of een Custom Appie de juiste keuze is, en zo niet zeg ik dat ook gewoon. Geen verkoop-script, geen gedoe.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#1a2e27]/50 rounded-3xl border border-[#247459]/25 p-2 md:p-4">
            <div
              className="tidycal-embed rounded-2xl overflow-hidden bg-white"
              data-path="weblyfe/discovery-ai"
              style={{ minHeight: '720px' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center md:text-left">
              <p className="text-[#DFB771] text-sm font-semibold mb-2">Wat we bespreken</p>
              <p className="text-[#F6FEFC]/60 text-sm leading-relaxed">
                Jouw bedrijf, je systemen, waar tijd verloren gaat. Ik luister, jij praat.
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[#DFB771] text-sm font-semibold mb-2">Wat het kost</p>
              <p className="text-[#F6FEFC]/60 text-sm leading-relaxed">
                Niets. 45 minuten van mijn tijd. Geen verplichtingen, geen verborgen sales-trechter.
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[#DFB771] text-sm font-semibold mb-2">Wat erna</p>
              <p className="text-[#F6FEFC]/60 text-sm leading-relaxed">
                Of een Custom Appie offerte, of een eerlijk advies waarom het niet past. Allebei prima.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <Script
        src="https://asset-tidycal.b-cdn.net/js/embed.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
