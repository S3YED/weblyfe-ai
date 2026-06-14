import type { Metadata } from 'next';
import Image from 'next/image';
import { cookies } from 'next/headers';
import {
  Lock,
  Sparkles,
  ShieldCheck,
  Clock,
  MessageCircle,
  ArrowRight,
  Database,
  ServerCog,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import ScrollProgress from '@/components/ScrollProgress';
import BetaSignupForm from './BetaSignupForm';
import { LOCALES, DEFAULT_LOCALE, type Locale, tFn } from '@/i18n/messages';

// ---------------------------------------------------------------------------
// Locale resolution (same pattern as layout.tsx)
// ---------------------------------------------------------------------------
async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  return (LOCALES as readonly string[]).includes(cookieLocale ?? '')
    ? (cookieLocale as Locale)
    : DEFAULT_LOCALE;
}

// ---------------------------------------------------------------------------
// Metadata - generated per-locale
// ---------------------------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const t = tFn(locale);
  return {
    title: t('beta.meta.title'),
    description: t('beta.meta.description'),
    alternates: { canonical: 'https://weblyfe.ai/beta' },
    openGraph: {
      title: t('beta.meta.og.title'),
      description: t('beta.meta.og.description'),
      url: 'https://weblyfe.ai/beta',
      type: 'website',
      images: [
        {
          url: '/agents/appie-iconic.png',
          width: 1200,
          height: 630,
          alt: t('beta.meta.og.imgAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('beta.meta.tw.title'),
      description: t('beta.meta.tw.description'),
      images: ['/agents/appie-iconic.png'],
    },
  };
}

// ---------------------------------------------------------------------------
// Static data (titles, prices, client names stay language-neutral;
// body copy and notes are translated at render time via t())
// ---------------------------------------------------------------------------
const PRICING_ROWS = [
  { id: 'diy', title: 'DIY ChatGPT', price: '€20/mo', bodyKey: 'beta.row.diy.body' as const, accent: false },
  {
    id: 'instant',
    title: 'Instant Appie BETA',
    price: '€250/mo',
    noteKey: 'beta.row.instant.note' as const,
    bodyKey: 'beta.row.instant.body' as const,
    accent: true,
  },
  { id: 'full', title: 'Instant Appie (full launch)', price: '€488/mo', bodyKey: 'beta.row.full.body' as const, accent: false },
  { id: 'va', title: 'NL VA (8 uur)', price: '€550/mo', bodyKey: 'beta.row.va.body' as const, accent: false },
  { id: 'ea', title: 'Executive Assistant (fulltime)', price: '€5.000+/mo', bodyKey: 'beta.row.ea.body' as const, accent: false },
] as const;

const WHAT_IS_BULLETS = [
  { id: 'server', icon: ServerCog, titleKey: 'beta.what.bullet1.title' as const, bodyKey: 'beta.what.bullet1.body' as const },
  { id: 'telegram', icon: MessageCircle, titleKey: 'beta.what.bullet2.title' as const, bodyKey: 'beta.what.bullet2.body' as const },
  { id: 'memory', icon: Database, titleKey: 'beta.what.bullet3.title' as const, bodyKey: 'beta.what.bullet3.body' as const },
  { id: 'clock', icon: Clock, titleKey: 'beta.what.bullet4.title' as const, bodyKey: 'beta.what.bullet4.body' as const },
] as const;

const BETA_BENEFITS = [
  { id: 'onboarding', icon: Sparkles, titleKey: 'beta.benefits.b1.title' as const, bodyKey: 'beta.benefits.b1.body' as const },
  { id: 'telegram', icon: MessageCircle, titleKey: 'beta.benefits.b2.title' as const, bodyKey: 'beta.benefits.b2.body' as const },
  { id: 'price', icon: Lock, titleKey: 'beta.benefits.b3.title' as const, bodyKey: 'beta.benefits.b3.body' as const },
  { id: 'guarantee', icon: ShieldCheck, titleKey: 'beta.benefits.b4.title' as const, bodyKey: 'beta.benefits.b4.body' as const },
  { id: 'updates', icon: Sparkles, titleKey: 'beta.benefits.b5.title' as const, bodyKey: 'beta.benefits.b5.body' as const },
] as const;

const HOW_IT_WORKS = [
  { step: '01', titleKey: 'beta.how.s1.title' as const, bodyKey: 'beta.how.s1.body' as const },
  { step: '02', titleKey: 'beta.how.s2.title' as const, bodyKey: 'beta.how.s2.body' as const },
  { step: '03', titleKey: 'beta.how.s3.title' as const, bodyKey: 'beta.how.s3.body' as const },
  { step: '04', titleKey: 'beta.how.s4.title' as const, bodyKey: 'beta.how.s4.body' as const },
] as const;

const SOCIAL_PROOF = [
  { id: 'eva', name: 'Eva', client: 'Dubai-Property.nl', quoteKey: 'beta.social.proof1.quote' as const, image: '/agents/eva.jpg' },
  { id: 'priva', name: 'Privanotify', client: 'Privacy SaaS', quoteKey: 'beta.social.proof2.quote' as const, image: '/screenshots/privanotify-fresh.jpg' },
  { id: 'ben', name: 'Ben de Voorman', client: 'Coach + content', quoteKey: 'beta.social.proof3.quote' as const, image: '/agents/ben.jpg' },
] as const;

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Instant Appie BETA',
  description:
    'Volledig managed persoonlijke Techwiz op Telegram, inbox, agenda en CRM. 5-10 beta-plekken.',
  brand: { '@type': 'Brand', name: 'Weblyfe' },
  image: 'https://weblyfe.ai/agents/appie-iconic.png',
  offers: {
    '@type': 'Offer',
    price: '250',
    priceCurrency: 'EUR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '250',
      priceCurrency: 'EUR',
      unitText: 'MONTH',
    },
    availability: 'https://schema.org/LimitedAvailability',
    url: 'https://weblyfe.ai/beta',
    seller: { '@type': 'Organization', name: 'Weblyfe' },
  },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BetaPage() {
  const locale = await resolveLocale();
  const t = tFn(locale);

  const betaFaqItems = [
    { q: t('beta.faq.q1'), a: t('beta.faq.a1') },
    { q: t('beta.faq.q2'), a: t('beta.faq.a2') },
    { q: t('beta.faq.q3'), a: t('beta.faq.a3') },
    { q: t('beta.faq.q4'), a: t('beta.faq.a4') },
    { q: t('beta.faq.q5'), a: t('beta.faq.a5') },
    { q: t('beta.faq.q6'), a: t('beta.faq.a6') },
    { q: t('beta.faq.q7'), a: t('beta.faq.a7') },
    { q: t('beta.faq.q8'), a: t('beta.faq.a8') },
    { q: t('beta.faq.q9'), a: t('beta.faq.a9') },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ScrollProgress />
      <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
        <Navbar />

        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#DFB771 1px, transparent 1px), linear-gradient(90deg, #DFB771 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full bg-[#DFB771]/10 blur-3xl pointer-events-none" />
          <div className="absolute top-32 right-1/4 w-[420px] h-[420px] rounded-full bg-[#247459]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <p className="text-[#DFB771]/80 text-xs font-mono uppercase tracking-widest mb-4">
                {t('beta.hero.eyebrow')}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
                {t('beta.hero.h1.line1')}
                <span className="block text-[#DFB771]">{t('beta.hero.h1.line2')}</span>
              </h1>
              <p className="text-[#F6FEFC]/75 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t('beta.hero.sub')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                <a
                  href="#beta-form"
                  className="group inline-flex items-center justify-center gap-2 bg-[#DFB771] hover:bg-[#FFD99A] text-[#031D16] font-bold px-7 py-4 rounded-xl transition-colors"
                >
                  <Lock className="w-5 h-5" />
                  {t('beta.hero.cta.primary')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#vergelijk"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#247459]/60 hover:border-[#DFB771] text-[#F6FEFC] font-semibold px-7 py-4 rounded-xl transition-colors"
                >
                  {t('beta.hero.cta.secondary')}
                </a>
              </div>

              <p className="text-sm text-[#DFB771] font-semibold">
                {t('beta.hero.urgency')}
              </p>
            </div>

            <div className="relative mx-auto lg:mx-0 w-full max-w-md">
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-[#DFB771]/40 shadow-[0_0_60px_-15px_rgba(223,183,113,0.5)]">
                <Image
                  src="/agents/appie-iconic.png"
                  alt={t('beta.hero.imgAlt')}
                  fill
                  sizes="(min-width: 1024px) 420px, 80vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031D16]/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 -left-3 flex flex-col gap-2">
                <div className="bg-[#031D16]/80 border border-[#DFB771]/40 px-3 py-2 rounded-xl text-xs font-mono">
                  <span className="text-[#DFB771]">[Telegram]</span>{' '}
                  {locale === 'nl' ? '23 mails afgehandeld' : '23 emails handled'}
                </div>
                <div className="bg-[#031D16]/80 border border-[#247459]/40 px-3 py-2 rounded-xl text-xs font-mono">
                  <span className="text-[#247459]">[Calendar]</span>{' '}
                  {locale === 'nl' ? '4 calls geboekt' : '4 calls booked'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING COMPARISON */}
        <section
          id="vergelijk"
          className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {t('beta.compare.eyebrow')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {t('beta.compare.h2.line1')}{' '}
                <span className="text-[#DFB771]">{t('beta.compare.h2.line2')}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRICING_ROWS.map((row) => (
                <div
                  key={row.id}
                  className={
                    row.accent
                      ? 'rounded-2xl bg-gradient-to-br from-[#DFB771]/15 to-[#247459]/10 border-2 border-[#DFB771] p-6 lg:scale-105 shadow-xl'
                      : 'rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6'
                  }
                >
                  <p
                    className={
                      row.accent
                        ? 'text-[#DFB771] text-xs font-mono uppercase tracking-wider mb-2'
                        : 'text-[#F6FEFC]/55 text-xs font-mono uppercase tracking-wider mb-2'
                    }
                  >
                    {row.accent ? t('beta.compare.card.label.accent') : t('beta.compare.card.label.default')}
                  </p>
                  <h3 className="font-bold text-lg mb-2">{row.title}</h3>
                  <p
                    className={
                      row.accent ? 'text-3xl font-bold text-[#DFB771] mb-1' : 'text-2xl font-bold mb-1'
                    }
                  >
                    {row.price}
                  </p>
                  {'noteKey' in row && row.noteKey && (
                    <p className="text-[#DFB771] text-xs font-semibold mb-2 uppercase tracking-wider">
                      {t(row.noteKey)}
                    </p>
                  )}
                  <p className="text-[#F6FEFC]/65 text-sm leading-relaxed mt-2">
                    {t(row.bodyKey)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-3xl mx-auto rounded-2xl bg-[#DFB771]/10 border border-[#DFB771]/30 p-6 text-center">
              <p className="text-[#F6FEFC] text-base md:text-lg font-medium">
                {t('beta.compare.footnote').split('€488').map((part, i) =>
                  i === 0 ? (
                    <span key={i}>{part}</span>
                  ) : (
                    <span key={i}>
                      <span className="text-[#DFB771]">€488{part}</span>
                    </span>
                  )
                )}
              </p>
            </div>
          </div>
        </section>

        {/* WAT IS INSTANT APPIE */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {t('beta.what.eyebrow')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                {t('beta.what.h2.line1')}{' '}
                <span className="text-[#DFB771]">{t('beta.what.h2.line2')}</span>
              </h2>
              <p className="text-[#F6FEFC]/70 text-lg max-w-3xl mx-auto leading-relaxed">
                {t('beta.what.sub')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHAT_IS_BULLETS.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/30 flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5 text-[#DFB771]" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{t(b.titleKey)}</h3>
                  <p className="text-[#F6FEFC]/65 text-sm leading-relaxed">{t(b.bodyKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WAT KRIJG JE IN DE BETA */}
        <section className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {t('beta.benefits.eyebrow')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {t('beta.benefits.h2')}
              </h2>
            </div>

            <div className="space-y-4">
              {BETA_BENEFITS.map((b, i) => (
                <div
                  key={b.id}
                  className="flex items-start gap-5 rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-5 md:p-6 hover:border-[#DFB771]/40 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[#DFB771]/10 border border-[#DFB771]/30 flex items-center justify-center">
                      <b.icon className="w-6 h-6 text-[#DFB771]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#DFB771] text-xs font-mono uppercase tracking-wider mb-1">
                      {t('beta.benefits.label')} {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-bold text-lg md:text-xl mb-2">{t(b.titleKey)}</h3>
                    <p className="text-[#F6FEFC]/70 text-sm md:text-base leading-relaxed">
                      {t(b.bodyKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[#F6FEFC]/55 text-sm mt-8 max-w-2xl mx-auto">
              {t('beta.benefits.whatsapp.footnote')}
            </p>
          </div>
        </section>

        {/* HOE HET WERKT */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {t('beta.how.eyebrow')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {t('beta.how.h2')}
              </h2>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {HOW_IT_WORKS.map((s) => (
                <li
                  key={s.step}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 p-6 relative"
                >
                  <p className="font-mono text-4xl font-bold text-[#DFB771]/30 mb-3">
                    {s.step}
                  </p>
                  <h3 className="font-bold text-lg mb-2">{t(s.titleKey)}</h3>
                  <p className="text-[#F6FEFC]/65 text-sm leading-relaxed">{t(s.bodyKey)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-20 md:py-28 bg-[#0a2e23]/40 border-y border-[#247459]/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {t('beta.social.eyebrow')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {t('beta.social.h2.line1')}{' '}
                <span className="text-[#DFB771]">{t('beta.social.h2.line2')}</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SOCIAL_PROOF.map((c) => (
                <article
                  key={c.id}
                  className="rounded-2xl bg-[#1a2e27]/50 border border-[#247459]/20 hover:border-[#DFB771]/40 transition-colors overflow-hidden"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.client}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-[#031D16]/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-1">{c.name}</h3>
                    <p className="text-[#F6FEFC]/55 text-xs mb-3 uppercase tracking-wider">
                      {c.client}
                    </p>
                    <p className="text-[#F6FEFC]/80 text-sm leading-relaxed">
                      &ldquo;{t(c.quoteKey)}&rdquo;
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-center text-[#F6FEFC]/55 text-sm mt-10 max-w-2xl mx-auto">
              {t('beta.social.footnote')}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {t('beta.faq.eyebrow')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {t('beta.faq.h2')}
              </h2>
            </div>
            <FaqAccordion items={betaFaqItems} />
          </div>
        </section>

        {/* SIGN-UP FORM */}
        <section
          id="beta-form"
          className="py-24 md:py-32 bg-gradient-to-b from-[#0a2e23]/60 to-[#031D16] border-t border-[#247459]/20"
        >
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-[#DFB771] text-xs font-mono uppercase tracking-widest mb-3">
                {t('beta.form.eyebrow')}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                {t('beta.form.h2')}
              </h2>
              <p className="text-[#F6FEFC]/70 text-base md:text-lg max-w-2xl mx-auto">
                {t('beta.form.sub')}
              </p>
            </div>

            <BetaSignupForm />

            <ul className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-sm text-[#F6FEFC]/70">
              <li className="flex items-center gap-2 justify-center">
                <ShieldCheck className="w-4 h-4 text-[#DFB771]" />
                {t('beta.form.trust1')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Lock className="w-4 h-4 text-[#DFB771]" />
                {t('beta.form.trust2')}
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Sparkles className="w-4 h-4 text-[#DFB771]" />
                {t('beta.form.trust3')}
              </li>
            </ul>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
