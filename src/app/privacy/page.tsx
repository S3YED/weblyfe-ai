import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Weblyfe processes your data and data accessed via Google APIs, including Google Limited Use compliance.',
  alternates: { canonical: 'https://weblyfe.ai/privacy' },
};

const UPDATED = '13 June 2026';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24 text-[#0c2a22]">
        <h1 className="text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm opacity-70">Last updated: {UPDATED}</p>

        <div className="prose prose-slate mt-10 max-w-none space-y-6 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold">1. Who we are</h2>
            <p>
              Weblyfe B.V. (&quot;Weblyfe&quot;, &quot;we&quot;, &quot;us&quot;) operates Appie, a
              personal AI assistant delivered over messaging platforms and the
              dashboard at <strong>dash.weblyfe.ai</strong>. We are the data
              controller for the personal data described here. Contact:{' '}
              <a href="mailto:seyed@weblyfe.nl">seyed@weblyfe.nl</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2. Data we process</h2>
            <ul className="list-disc pl-6">
              <li>Account data: name, email, billing details (via Stripe).</li>
              <li>
                Content you send to your Appie (messages, files, voice notes) so
                it can do the work you ask.
              </li>
              <li>
                Data from services you explicitly connect (e.g. Google, Notion,
                Airtable, GitHub), used only to perform the actions you request.
              </li>
              <li>Operational logs needed to run and secure the service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              3. Google user data &amp; Limited Use
            </h2>
            <p>
              If you connect a Google account, we request only the scopes needed
              for the features you enable (for example Drive files you open with
              Appie, and, where you opt in, Calendar and Gmail). We access this
              data solely to provide those features to you.
            </p>
            <p>
              <strong>
                Weblyfe&apos;s use and transfer of information received from
                Google APIs to any other app will adhere to the{' '}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </strong>
            </p>
            <p>
              We do not sell Google user data, do not use it for advertising, and
              do not use it to train generalized AI/ML models. Humans do not read
              your Google data except where you explicitly ask for support, where
              required for security, or to comply with law. You can disconnect
              Google at any time in the dashboard, which revokes our access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4. Sub-processors</h2>
            <p>We share data only with providers needed to run the service:</p>
            <ul className="list-disc pl-6">
              <li>Hosting &amp; infrastructure (Vercel, Hetzner).</li>
              <li>Payments (Stripe).</li>
              <li>Model inference (OpenRouter and selected model providers).</li>
              <li>Messaging delivery (Telegram, and WhatsApp where you connect it).</li>
            </ul>
            <p>
              Each processes data only on our instructions. Voice transcription
              and text-to-speech run on local open-source models where possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Retention</h2>
            <p>
              We keep data while your account is active and delete or anonymize it
              within a reasonable period after you close your account or
              disconnect a service, unless we must retain it for legal reasons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Your rights (GDPR)</h2>
            <p>
              You can request access, correction, deletion, export, or restriction
              of your personal data, and object to certain processing. Email{' '}
              <a href="mailto:seyed@weblyfe.nl">seyed@weblyfe.nl</a>. You may also
              lodge a complaint with the Dutch Data Protection Authority
              (Autoriteit Persoonsgegevens).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Security</h2>
            <p>
              Connected-service tokens are stored encrypted. Access is restricted
              and audited. No method is perfectly secure, but we take reasonable
              technical and organizational measures to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8. Changes</h2>
            <p>
              We may update this policy; material changes will be notified via the
              dashboard or email. Continued use after an update means you accept
              the revised policy.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
