import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },

  // Sanity Studio (/studio) için güvenlik başlıkları
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: [
          // Studio'nun kendi iframe'leri çalışsın
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Sanity CDN kaynaklarına izin ver
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.sanity.io",
              "style-src 'self' 'unsafe-inline' https://cdn.sanity.io",
              "img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com",
              "font-src 'self' data: https://cdn.sanity.io",
              "connect-src 'self' https://*.api.sanity.io wss://*.api.sanity.io https://cdn.sanity.io",
              "worker-src 'self' blob:",
              "frame-src 'self' https://cdn.sanity.io",
            ].join("; "),
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
