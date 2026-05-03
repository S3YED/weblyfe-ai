import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { POSTS_BY_LOCALE } from '@/content/blog/posts';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/i18n/messages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Techwiz Blog - Nieuws en case studies over AI werknemers | Weblyfe',
  description:
    'Praktische verhalen over Techwizes, AI werknemers, automation, en case studies van CZA, Dubai-Property, Boooth en meer. Geschreven door Appie en het Weblyfe team.',
  keywords: ['Techwiz blog', 'AI werknemers', 'AI automation', 'case studies', 'Weblyfe', 'OpenClaw'],
  alternates: {
    canonical: 'https://weblyfe.ai/blog',
    languages: {
      'nl-NL': 'https://weblyfe.ai/blog',
      'en-US': 'https://weblyfe.ai/blog',
      'x-default': 'https://weblyfe.ai/blog',
    },
  },
  openGraph: {
    title: 'Techwiz Blog | Weblyfe',
    description: 'Nieuws, case studies en praktische tips over AI werknemers en automation.',
    url: 'https://weblyfe.ai/blog',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: ['en_US'],
    images: [{ url: '/agents/appie-iconic.png', width: 1408, height: 768, alt: 'Techwiz Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Techwiz Blog | Weblyfe',
    description: 'Nieuws, case studies en praktische tips over AI werknemers.',
    images: ['/agents/appie-iconic.png'],
  },
};

function makeDateFormatter(locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'nl' ? 'nl-NL' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const blogIndexSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': 'https://weblyfe.ai/blog#blog',
  name: 'Techwiz Blog',
  description:
    'Praktische verhalen over Techwizes, AI werknemers, automation en case studies.',
  url: 'https://weblyfe.ai/blog',
  publisher: { '@id': 'https://weblyfe.ai/#organization' },
  inLanguage: ['nl-NL', 'en-US'],
};

const blogBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://weblyfe.ai' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://weblyfe.ai/blog' },
  ],
};

export default async function BlogIndex() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  const locale: Locale = (LOCALES as readonly string[]).includes(cookieLocale ?? '')
    ? (cookieLocale as Locale)
    : DEFAULT_LOCALE;
  const dateFormatter = makeDateFormatter(locale);
  const posts = [...POSTS_BY_LOCALE[locale]].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumb) }}
      />
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
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <p className="text-[#DFB771] text-sm font-semibold uppercase tracking-widest mb-4">
            Vanuit het brein van Appie
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-[#F6FEFC]/60 text-lg max-w-2xl leading-relaxed">
            Korte stukken over Techwizes, automation, en de saaie helft van je werkweek.
            Eerlijk geschreven - geen marketingtaal.
          </p>
        </div>
      </section>

      <section className="py-12 pb-32">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-[#1a2e27]/40 hover:bg-[#1a2e27]/70 border border-[#247459]/25 hover:border-[#DFB771]/40 rounded-2xl overflow-hidden transition-colors h-full flex flex-col"
              >
                {post.cover && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-transparent to-transparent opacity-60" />
                  </div>
                )}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-[#F6FEFC]/40 mb-3">
                    <time dateTime={post.date}>
                      {dateFormatter.format(new Date(post.date))}
                    </time>
                    <span className="text-[#247459]">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readMins} min
                    </span>
                  </div>
                  <h2 className="text-[#F6FEFC] font-bold text-xl md:text-2xl leading-snug mb-3 group-hover:text-[#DFB771] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[#F6FEFC]/60 leading-relaxed mb-5 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[#DFB771] text-sm font-semibold">
                    Lees verder
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
