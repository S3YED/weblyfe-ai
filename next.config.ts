import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Instant Appie / OpenClaw is superseded by Clark (getclark.app). Redirect the
  // old product routes there. Redirects run before routing, so these win even if
  // page files exist, and any button/link pointing at these paths lands on
  // getclark.app too. /pdf (the €65 PDF product) is intentionally preserved.
  async redirects() {
    const toClark = (source: string) => ({
      source,
      destination: "https://getclark.app",
      permanent: true,
    });
    return [
      toClark("/openclaw"),
      toClark("/openclaw/:path*"),
      toClark("/beta"),
      toClark("/beta/:path*"),
      toClark("/buy"),
      toClark("/buy/:path*"),
      toClark("/appie"),
      toClark("/appie/:path*"),
      toClark("/instant-appie"),
      toClark("/instant-appie/:path*"),
    ];
  },
};

export default nextConfig;
