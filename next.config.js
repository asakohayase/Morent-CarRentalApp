/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['zxcskcblupyveqqyaiel.supabase.co', 'lh3.googleusercontent.com'],
  },
  nextConfig,
  images: {
    domains: ['zxcskcblupyveqqyaiel.supabase.co', 'lh3.googleusercontent.com'],
  },
};
