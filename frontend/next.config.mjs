/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix cross-origin request warning for both local and Vercel deployment
  allowedDevOrigins: [
    '172.17.96.1',
    'localhost',
    '127.0.0.1',
    'manggad-thesis-repo.vercel.app',
    '*.vercel.app'
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.alias.canvas = false;

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  // Disable SES lockdown that causes intrinsics errors
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '127.0.0.1:3000',
        'https://manggad-thesis-repo.vercel.app',
        'https://*.vercel.app'
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
