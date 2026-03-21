# Weblyfe.ai Blog PRD
## Building an Incredible Tech Blog

---

## Research: What Makes Tech Blogs Great

### Top Tech Blog Examples Analyzed

**1. Vercel Blog (vercel.com/blog)**
- Clean, minimal design
- Code snippets with syntax highlighting
- Author profiles
- Tags and categories
- Reading time estimates
- Social sharing
- Related posts

**2. Linear Blog (linear.app/blog)**
- Stunning visual design
- Long-form storytelling
- Product updates mixed with thought leadership
- Changelog integration

**3. Stripe Blog (stripe.com/blog)**
- Clear categorization (Engineering, Company, Startups)
- Deep technical dives
- Case studies
- Beautiful data visualizations

**4. Notion Blog (notion.so/blog)**
- Personal stories from team
- Use case showcases
- Product tips and tutorials

**5. OpenAI Blog (openai.com/blog)**
- Research papers made accessible
- Clear, educational writing
- Progressive disclosure of complexity

### Key Patterns for Success

1. **Content Mix**
   - 40% Educational (tutorials, how-tos)
   - 30% Thought leadership (trends, opinions)
   - 20% Case studies (client stories)
   - 10% Company updates

2. **SEO Essentials**
   - Long-form content (1500+ words)
   - Keyword targeting per post
   - Internal linking strategy
   - Schema markup (Article, FAQ)
   - Meta descriptions (155 chars)

3. **Engagement Features**
   - Reading time
   - Progress bar
   - Table of contents
   - Code copy buttons
   - Social sharing
   - Newsletter CTA

4. **Visual Excellence**
   - Custom OG images per post
   - In-article diagrams
   - Code screenshots
   - Author photos

---

## CMS Architecture

### Option 1: MDX (Recommended)
**Pros:** Version controlled, fast, free, developer friendly
**Cons:** Non-technical editors need training

### Option 2: Notion as CMS
**Pros:** Easy editing, real-time, familiar UI
**Cons:** API complexity, sync issues

### Option 3: Contentlayer + MDX
**Pros:** Best of both worlds, type-safe
**Cons:** Setup complexity

### Recommendation: MDX with Contentlayer

---

## File Structure

```
src/
├── content/
│   └── blog/
│       ├── what-is-openclaw.mdx
│       ├── ai-assistant-vs-human-employee.mdx
│       └── how-we-built-eva.mdx
├── app/
│   └── [locale]/
│       └── blog/
│           ├── page.tsx          # Blog index
│           └── [slug]/
│               └── page.tsx      # Individual post
└── components/
    └── blog/
        ├── BlogCard.tsx
        ├── BlogList.tsx
        ├── TableOfContents.tsx
        ├── ReadingProgress.tsx
        ├── CodeBlock.tsx
        ├── AuthorCard.tsx
        └── ShareButtons.tsx
```

---

## Content Schema

```typescript
type BlogPost = {
  slug: string;
  title: string;
  titleNl?: string;           // Dutch title
  description: string;
  descriptionNl?: string;     // Dutch description
  date: string;               // ISO date
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: 'ai' | 'automation' | 'case-study' | 'tutorial' | 'opinion';
  tags: string[];
  image: string;              // OG image
  readingTime: number;        // minutes
  featured: boolean;
  draft: boolean;
};
```

---

## Initial Content Plan

### Pillar Posts (Long-form, SEO focused)

1. **"What is OpenClaw? The AI Operations Platform Explained"**
   - Target: "openclaw", "ai operations platform"
   - Word count: 2000+
   - Type: Educational

2. **"AI Assistant vs Human Employee: The Real Comparison"**
   - Target: "ai assistant vs employee", "should I hire ai"
   - Word count: 2500+
   - Type: Thought leadership

3. **"How We Built Eva: An AI That Runs a Real Estate Company"**
   - Target: "ai for real estate", "ai operations case study"
   - Word count: 3000+
   - Type: Case study

4. **"Business Automation 101: Where to Start"**
   - Target: "business automation guide", "how to automate business"
   - Word count: 2000+
   - Type: Tutorial

5. **"The AI Agency of the Future (And Why We Built One)"**
   - Target: "ai agency", "future of agencies"
   - Word count: 1500+
   - Type: Opinion

### Supporting Posts

6. "5 Signs You Need an AI Assistant"
7. "WhatsApp Business Automation: Complete Guide"
8. "How to Qualify Leads with AI (CZA Case Study)"
9. "Voice to Website: The Future of Web Development"
10. "Protecting Your Business from Fake Reviews"

---

## Content Calendar

### Month 1: Foundation
- Week 1: Pillar 1 (OpenClaw)
- Week 2: Pillar 2 (AI vs Human)
- Week 3: Pillar 3 (Eva Case Study)
- Week 4: Supporting post + optimize

### Month 2: Growth
- Week 1: Pillar 4 (Automation 101)
- Week 2: Supporting posts x2
- Week 3: Pillar 5 (AI Agency Future)
- Week 4: Supporting posts + optimize

### Month 3: Scale
- 2 posts per week
- Guest posts
- Repurpose to social

---

## Technical Implementation

### Dependencies

```bash
npm install contentlayer next-contentlayer date-fns reading-time rehype-highlight rehype-slug
```

### contentlayer.config.ts

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    titleNl: { type: 'string' },
    description: { type: 'string', required: true },
    descriptionNl: { type: 'string' },
    date: { type: 'date', required: true },
    category: { type: 'enum', options: ['ai', 'automation', 'case-study', 'tutorial', 'opinion'], required: true },
    tags: { type: 'list', of: { type: 'string' } },
    image: { type: 'string', required: true },
    author: { type: 'string', default: 'Seyed Hosseini' },
    featured: { type: 'boolean', default: false },
    draft: { type: 'boolean', default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace('blog/', ''),
    },
    readingTime: {
      type: 'number',
      resolve: (post) => Math.ceil(post.body.raw.split(/\s+/).length / 200),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [rehypeHighlight, rehypeSlug],
  },
});
```

---

## Blog Components

### 1. Blog Index Page
- Hero with featured post
- Category filters
- Grid of posts
- Pagination
- Search (optional)

### 2. Blog Post Page
- Reading progress bar
- Table of contents (sidebar)
- Author card
- Share buttons
- Related posts
- Newsletter CTA

### 3. Code Blocks
- Syntax highlighting
- Copy button
- Language label
- Line numbers

---

## SEO Strategy

### Per Post
- [ ] Focus keyword in title
- [ ] Focus keyword in URL
- [ ] Focus keyword in first 100 words
- [ ] Focus keyword in H2
- [ ] Meta description (155 chars)
- [ ] Internal links (3+ per post)
- [ ] External authority link (1+)
- [ ] Image alt text
- [ ] Schema markup (Article)

### Site-wide
- [ ] Blog sitemap
- [ ] RSS feed
- [ ] Author pages
- [ ] Category pages
- [ ] Tag pages

---

## Distribution Strategy

1. **Publish** on weblyfe.ai/blog
2. **Syndicate** to:
   - LinkedIn (native article)
   - Medium (canonical back to blog)
   - Dev.to (for technical posts)
3. **Repurpose** to:
   - Twitter/X threads
   - Instagram carousels
   - YouTube scripts
   - Newsletter

---

## Metrics to Track

- Organic traffic per post
- Time on page
- Scroll depth
- Newsletter conversions
- Lead form submissions
- Keyword rankings
- Backlinks

---

## Implementation Timeline

### Phase 1: Setup (Day 1-2)
- [ ] Install Contentlayer
- [ ] Create blog structure
- [ ] Build blog index page
- [ ] Build post page
- [ ] Add basic components

### Phase 2: Polish (Day 3-4)
- [ ] Reading progress bar
- [ ] Table of contents
- [ ] Code blocks with copy
- [ ] Author cards
- [ ] Share buttons
- [ ] Related posts

### Phase 3: Content (Day 5-7)
- [ ] Write first pillar post
- [ ] Create OG images
- [ ] Add to sitemap
- [ ] Submit to Search Console

---

## Next Steps

1. Create blog folder structure
2. Install dependencies
3. Build components
4. Write first post

Ready to build?
