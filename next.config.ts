import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        // Service worker must be served as JS and never cached at the HTTP
        // layer — otherwise browsers cling to the old SW on deploy.
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
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },
  async redirects() {
    // Canonical host is app.thewonderwarrior.com. Any request arriving on the
    // bare apex or www subdomain gets 308-redirected to the same path on app.
    // 308 preserves method and body, so POSTs to e.g. /api/* still work.
    const target = "https://app.thewonderwarrior.com/:path*";
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "thewonderwarrior.com" }],
        destination: target,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.thewonderwarrior.com" }],
        destination: target,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
