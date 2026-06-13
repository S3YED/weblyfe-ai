import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of Weblyfe Appie.',
  alternates: { canonical: 'https://weblyfe.ai/terms' },
};

const UPDATED = '13 June 2026';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24 text-[#0c2a22]">
        <h1 className="text-3xl font-bold sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm opacity-70">Last updated: {UPDATED}</p>

        <div className="prose prose-slate mt-10 max-w-none space-y-6 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold">1. Agreement</h2>
            <p>
              These terms govern your use of Appie and related services provided
              by Weblyfe B.V. (&quot;Weblyfe&quot;). By creating an account or using the
              service you agree to them. If you use the service for an
              organization, you confirm you may bind that organization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. The service</h2>
            <p>
              Appie is a personal AI assistant that performs tasks you ask of it
              across messaging and the connected tools you authorize. Features may
              evolve. Appie can make mistakes; you are responsible for reviewing
              important actions and outputs before relying on them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3. Your responsibilities</h2>
            <ul className="list-disc pl-6">
              <li>Provide accurate account information and keep access secure.</li>
              <li>Only connect accounts and data you are authorized to use.</li>
              <li>
                Do not use the service for unlawful, harmful, or abusive purposes,
                or in violation of a connected provider&apos;s terms.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Connected services</h2>
            <p>
              When you connect a third party (e.g. Google, Notion, Telegram,
              WhatsApp), you authorize Appie to act on your behalf within the
              scopes you grant. Your use of those services remains subject to their
              own terms. You can disconnect at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Plans &amp; payment</h2>
            <p>
              Paid plans are billed via Stripe on a recurring basis until
              cancelled. Beta pricing, where offered, is honored for the terms
              stated at signup. Taxes may apply. Except where required by law or
              expressly stated, fees are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Cancellation</h2>
            <p>
              You may cancel at any time from the dashboard; access continues
              until the end of the current billing period. We may suspend or
              terminate accounts that breach these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Disclaimers &amp; liability</h2>
            <p>
              The service is provided &quot;as is&quot; without warranties of any kind. To
              the extent permitted by law, Weblyfe is not liable for indirect or
              consequential damages, and our total liability is limited to the
              fees you paid in the 3 months before the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Governing law</h2>
            <p>
              These terms are governed by the laws of the Netherlands. Disputes
              are subject to the competent courts in the Netherlands.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9. Contact</h2>
            <p>
              Questions? <a href="mailto:seyed@weblyfe.nl">seyed@weblyfe.nl</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
