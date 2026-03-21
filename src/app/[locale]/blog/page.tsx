import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | AI Automation Insights',
  description: 'Learn about AI automation, digital employees, workflow optimization, and real case studies from Weblyfe.ai.',
};

// Blog posts data (will be moved to MDX/CMS later)
const posts = [
  {
    slug: 'what-is-openclaw',
    title: 'What is OpenClaw? The AI Operations Platform Explained',
    titleNl: 'Wat is OpenClaw? Het AI Operations Platform Uitgelegd',
    description: 'A deep dive into OpenClaw, the infrastructure powering autonomous AI agents for business operations.',
    category: 'ai',
    date: '2026-03-21',
    readingTime: 8,
    image: '/screenshots/team-dashboard.jpg',
    featured: true,
  },
  {
    slug: 'ai-assistant-vs-human-employee',
    title: 'AI Assistant vs Human Employee: The Real Comparison',
    titleNl: 'AI Assistent vs Menselijke Medewerker: De Echte Vergelijking',
    description: 'When does it make sense to deploy an AI assistant? A practical framework for the decision.',
    category: 'opinion',
    date: '2026-03-20',
    readingTime: 12,
    image: '/screenshots/eva-mission-control.jpg',
    featured: true,
  },
  {
    slug: 'how-we-built-eva',
    title: 'How We Built Eva: An AI That Runs a Real Estate Company',
    titleNl: 'Hoe We Eva Bouwden: Een AI Die Een Vastgoedbedrijf Runt',
    description: 'The complete story of building Eva, the AI operations manager for Dubai Property.',
    category: 'case-study',
    date: '2026-03-19',
    readingTime: 15,
    image: '/screenshots/eva-mission-control.jpg',
    featured: false,
  },
  {
    slug: 'whatsapp-business-automation-guide',
    title: 'WhatsApp Business Automation: Complete Guide',
    titleNl: 'WhatsApp Business Automatisering: Complete Gids',
    description: 'Everything you need to know about automating WhatsApp Business for lead qualification and support.',
    category: 'tutorial',
    date: '2026-03-18',
    readingTime: 10,
    image: '/screenshots/cza-fresh.jpg',
    featured: false,
  },
  {
    slug: 'protecting-business-from-fake-reviews',
    title: 'Protecting Your Business from Fake Reviews',
    titleNl: 'Je Bedrijf Beschermen tegen Neprecensies',
    description: 'How we used AI to detect and remove a coordinated fake review attack.',
    category: 'case-study',
    date: '2026-03-17',
    readingTime: 7,
    image: '/screenshots/botfarm.jpg',
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  ai: 'bg-purple-500/20 text-purple-300',
  automation: 'bg-blue-500/20 text-blue-300',
  'case-study': 'bg-green-500/20 text-green-300',
  tutorial: 'bg-yellow-500/20 text-yellow-300',
  opinion: 'bg-red-500/20 text-red-300',
};

const categoryLabels: Record<string, string> = {
  ai: 'AI',
  automation: 'Automation',
  'case-study': 'Case Study',
  tutorial: 'Tutorial',
  opinion: 'Opinion',
};

export default function BlogPage() {
  const featuredPosts = posts.filter(p => p.featured);
  const recentPosts = posts.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-[#031D16]">
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F6FEFC] mb-6">
              AI Automation <span className="text-[#DFB771]">Insights</span>
            </h1>
            <p className="text-xl text-[#F6FEFC]/60 leading-relaxed">
              Practical guides, case studies, and opinions on building AI systems that actually work.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-sm uppercase tracking-wider text-[#DFB771] mb-8">Featured</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link 
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-[#247459]/20 bg-[#0E3D31]/30 hover:bg-[#0E3D31]/50 transition-all"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031D16] via-[#031D16]/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[post.category]}`}>
                        {categoryLabels[post.category]}
                      </span>
                      <span className="text-[#F6FEFC]/40 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readingTime} min
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#F6FEFC] mb-2 group-hover:text-[#DFB771] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[#F6FEFC]/60 line-clamp-2">{post.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-sm uppercase tracking-wider text-[#DFB771] mb-8">All Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl overflow-hidden border border-[#247459]/20 bg-[#0E3D31]/20 hover:bg-[#0E3D31]/40 transition-all"
              >
                <div className="aspect-video relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[post.category]}`}>
                      {categoryLabels[post.category]}
                    </span>
                    <span className="text-[#F6FEFC]/40 text-sm">{post.readingTime} min</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#F6FEFC] mb-2 group-hover:text-[#DFB771] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[#F6FEFC]/50 text-sm line-clamp-2">{post.description}</p>
                  <div className="mt-4 flex items-center text-[#DFB771] text-sm font-medium group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-r from-[#247459]/30 to-[#DFB771]/10 border border-[#247459]/30 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F6FEFC] mb-4">
              Get AI insights in your inbox
            </h2>
            <p className="text-[#F6FEFC]/60 mb-6 max-w-lg mx-auto">
              Weekly updates on AI automation, case studies, and practical guides. No spam.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-[#031D16] border border-[#247459]/30 text-[#F6FEFC] placeholder:text-[#F6FEFC]/30 focus:outline-none focus:border-[#DFB771]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#DFB771] text-[#031D16] rounded-lg font-semibold hover:bg-[#FFD99A] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
