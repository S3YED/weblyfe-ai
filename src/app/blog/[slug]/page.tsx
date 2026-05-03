import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { POSTS, getPost, getAllSlugs } from '@/content/blog/posts';

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Weblyfe Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://weblyfe.ai/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: 'Weblyfe',
      logo: { '@type': 'ImageObject', url: 'https://weblyfe.ai/logo-gold.svg' },
    },
    mainEntityOfPage: `https://weblyfe.ai/blog/${post.slug}`,
    image: post.cover ? `https://weblyfe.ai${post.cover}` : undefined,
    keywords: post.tags.join(', '),
  };

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
        <ScrollProgress />
        <Navbar />

        <article className="pt-28 pb-20">
          <div className="max-w-3xl mx-auto px-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[#F6FEFC]/50 hover:text-[#DFB771] text-sm transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-sm text-[#F6FEFC]/40 mb-5">
              <time dateTime={post.date}>
                {dateFormatter.format(new Date(post.date))}
              </time>
              <span className="text-[#247459]">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readMins} min lezen
              </span>
              <span className="text-[#247459]">·</span>
              <span>{post.tags.join(' · ')}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-[#F6FEFC]/60 text-lg leading-relaxed mb-10">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mb-10 pb-8 border-b border-[#247459]/20">
              <Image
                src={post.author.portrait}
                alt={post.author.name}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full ring-2 ring-[#DFB771]/40"
              />
              <div>
                <p className="text-[#F6FEFC] font-semibold text-sm">{post.author.name}</p>
                <p className="text-[#F6FEFC]/40 text-xs">Techwiz · Weblyfe</p>
              </div>
            </div>

            {post.cover && (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 ring-1 ring-[#247459]/30">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose-custom space-y-7">
              {post.paragraphs.map((p, i) => (
                <div key={i}>
                  {p.heading && (
                    <h2 className="text-2xl md:text-3xl font-bold text-[#F6FEFC] mb-3 mt-10">
                      {p.heading}
                    </h2>
                  )}
                  <p className="text-[#F6FEFC]/75 text-base md:text-lg leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-10 border-t border-[#247459]/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <p className="text-[#F6FEFC]/60">
                Begin met je eigen Techwiz vanaf €65.
              </p>
              <Link
                href="/#tiers"
                className="inline-flex items-center gap-2 bg-[#DFB771] hover:bg-[#DFB771]/90 text-[#031D16] font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Bekijk de tiers
              </Link>
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section className="py-16 bg-[#0E3D31] border-t border-[#247459]/20">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Lees verder</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="group block bg-[#031D16]/60 hover:bg-[#031D16] border border-[#247459]/25 hover:border-[#DFB771]/40 rounded-2xl p-6 transition-colors"
                  >
                    <h3 className="text-[#F6FEFC] font-bold text-lg mb-2 group-hover:text-[#DFB771] transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-[#F6FEFC]/55 text-sm leading-relaxed">
                      {other.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
}
