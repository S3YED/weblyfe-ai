import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Wire the next-intl plugin so it picks up `src/i18n/request.ts`.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
