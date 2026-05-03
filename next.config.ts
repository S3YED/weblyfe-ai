import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback. next/image transcodes from any source on demand.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};

export default nextConfig;
