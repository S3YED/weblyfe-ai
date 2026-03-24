import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://weblyfe.ai/sitemap.xml',
    host: 'https://weblyfe.ai',
  };
}
