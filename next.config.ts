import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sampleswap.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "archive.org",
      },
    ]
  },
  allowedDevOrigins: ["*"],
  experimental: {
    cssChunking: "strict",
    scrollRestoration: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
          {
            // this header prevents the browser from attempting to guess the type of content if the Content-Type header is not explicitly set (can prevent XSS exploits)
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // this header indicates whether the site should be allowed to be displayed within an iframe (can prevent against clickjacking attacks)
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // this header controls how much info the browser includes when navigating cross origin
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // {
          //     key: "Content-Security-Policy",
          //     value: "default-src *; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://va.vercel-scripts.com; frame-ancestors 'self' https://elselog.vercel.app"
          //     // value: "default-src 'self' 'https://elselog.vercel.com'; image-src 'https://unsplash.com'; script-src 'self' https://www.google-analytics.com; font-src 'self' 'https://fonts.googleapis.com' frame-ancestors self https://elselog.vercel.app",
          // },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
