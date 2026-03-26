import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog — Automation, AI Agents & Real Business Lessons',
  description:
    'Real stories, real numbers, and practical guides on building AI employees, automating your business, and running lean with OpenClaw.',
  alternates: { canonical: 'https://weblyfe.ai/blog' },
};

const posts = [
  {
    slug: 'build-your-own-ai-employee',
    title: 'I Built 3 AI Employees for $146/Month. Here\'s Everything.',
    excerpt:
      '50 won proposals. 756 leads captured. 3 Appies running 24/7. The full story and the open-source kit.',
    date: 'March 26, 2026',
    tag: 'Automation',
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#031D16] text-[#F6FEFC]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#031D16]/95 backdrop-blur-md shadow-lg py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-gold.svg" alt="Weblyfe.ai" width={120} height={36} className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[#F6FEFC]/70 hover:text-[#DFB771] text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/openclaw#waitlist" className="btn-primary text-sm py-2 px-5">
              Join Waitlist
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Blog</h1>
          <p className="text-[#F6FEFC]/60 mb-12 text-lg">
            Real stories. Real numbers. No fluff.
          </p>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-[#0E3D31]/50 hover:bg-[#0E3D31] border border-[#247459]/30 hover:border-[#247459]/60 rounded-2xl p-6 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#DFB771] bg-[#DFB771]/10 px-3 py-1 rounded-full border border-[#DFB771]/20">
                    {post.tag}
                  </span>
                  <span className="text-[#F6FEFC]/40 text-sm">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-[#F6FEFC] group-hover:text-[#DFB771] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-[#F6FEFC]/60">{post.excerpt}</p>
                <div className="mt-4 text-[#DFB771] text-sm font-medium">Read more →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
