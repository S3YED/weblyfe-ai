'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/content/blog/posts';
import { useI18n } from '@/i18n/I18nProvider';

type Props = {
  posts: BlogPost[];
};

export default function BlogStrip({ posts }: Props) {
  const { locale } = useI18n();
  const dateFormatter = new Intl.DateTimeFormat(locale === 'nl' ? 'nl-NL' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <motion.article
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="group"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="block bg-[#1a2e27]/40 hover:bg-[#1a2e27]/70 border border-[#247459]/25 hover:border-[#DFB771]/40 rounded-2xl overflow-hidden transition-colors h-full flex flex-col"
          >
            {post.cover && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-transparent to-transparent opacity-60" />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
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
              <h3 className="text-[#F6FEFC] font-bold text-lg leading-snug mb-2 group-hover:text-[#DFB771] transition-colors">
                {post.title}
              </h3>
              <p className="text-[#F6FEFC]/60 text-sm leading-relaxed mb-5 flex-1">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-[#DFB771] text-sm font-semibold">
                {locale === 'nl' ? 'Lees verder' : 'Read more'}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
