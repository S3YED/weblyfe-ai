import { MetadataRoute } from 'next';

const baseUrl = 'https://weblyfe.ai';

// All static pages
const staticPages = [
  '',
  '/case-studies/openclaw',
  '/case-studies/super-assistant-employee',
  '/case-studies/safesite-security',
  '/case-studies/privanotify',
  '/case-studies/bot-farm-defense',
  '/case-studies/titan-transfers',
  '/case-studies/boooth-booking',
  '/case-studies/cza-ben-de-voorman',
  '/case-studies/eva-dubai-property',
  '/case-studies/appie-system',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'nl'];
  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      const url = locale === 'en' 
        ? `${baseUrl}${page}`
        : `${baseUrl}/${locale}${page}`;
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : page.includes('case-studies') ? 0.8 : 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}${page}`,
            nl: `${baseUrl}/nl${page}`,
          },
        },
      });
    }
  }

  return entries;
}
