import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import TIPSLanding from '@/components/TIPSLanding';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Appie , Jouw persoonlijke Techwiz | Weblyfe.ai',
  description:
    'Hoi, ik ben Appie. Een geniale werknemer met de laagste kosten. Ik doe het werk dat je week opvreet , inbox, intake, agenda, admin. Vanaf €65 zelf bouwen, of €250/mnd volledig managed.',
  alternates: {
    canonical: 'https://weblyfe.ai',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoe verschilt Appie van ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatGPT is een chatvenster zonder geheugen. Appie heeft persistent geheugen, draait op je eigen server, en doet werk uit zichzelf , zonder dat je elke keer een prompt hoeft in te tikken.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat als ik een mens in de keten wil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Altijd jij. Appie handelt nooit zelf een betaling, contract of nieuwe hire af zonder jou. Alles wat risicovol is laat ik eerst in Telegram zien. Je kunt elk onderwerp markeren als "eerst vragen".',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe veilig is mijn data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Appie draait op een dedicated private server. Je gesprekken en data trainen geen publieke modellen. Encrypted connecties, secure API handling, geen onnodige opslag.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe lang duurt de setup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instant Appie staat binnen 24 uur live , wij regelen alles. Build Your Own Appie kost je een paar uur eigen tijd met de PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Met welke tools werkt Appie samen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Google Workspace, Notion, Telegram, WhatsApp, Stripe, Brevo, Moneybird, Monday, HubSpot, Airtable, n8n, Webflow. Heeft een tool een API? Dan praat Appie ermee.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat als Appie iets verkeerd doet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Failsafes ingebouwd. Risico-acties pingen jou eerst, complexe edge cases routen naar mens, en je hebt altijd override controls. Plus 30 dagen support na launch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kan ik na maand 1 stoppen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Maandelijks opzegbaar, geen contract. En als de tevreden-of-geld-terug garantie geldt, krijg je je €250 retour zonder gedoe.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat als ik al tools heb staan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Appie wordt de laag die alles verbindt. Geen vervanging , een orchestrator die jouw bestaande stack opslokt en bedient.',
      },
    },
  ],
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Appie , Jouw persoonlijke Techwiz',
  description:
    'Een AI Techwiz / geniale werknemer die je inbox, intake, agenda en admin overneemt. Beschikbaar als €65 DIY-gids, €250/maand managed Instant Appie, of vanaf €2.000/maand custom-built.',
  brand: { '@type': 'Brand', name: 'Weblyfe' },
  offers: [
    {
      '@type': 'Offer',
      name: 'Build Your Own Appie',
      price: '65',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 'https://weblyfe.ai/buy/pdf',
    },
    {
      '@type': 'Offer',
      name: 'Instant Appie',
      price: '250',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '250',
        priceCurrency: 'EUR',
        unitText: 'MONTH',
      },
      availability: 'https://schema.org/InStock',
      url: 'https://weblyfe.ai/buy/instant',
    },
    {
      '@type': 'Offer',
      name: 'Custom Appie',
      price: '2000',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '2000',
        priceCurrency: 'EUR',
        unitText: 'MONTH',
      },
      availability: 'https://schema.org/InStock',
      url: 'https://tidycal.com/weblyfe/discovery',
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="min-h-screen">
        <Navbar />
        <TIPSLanding />
        <Footer />
      </main>
    </>
  );
}
