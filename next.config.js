/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['zxcskcblupyveqqyaiel.supabase.co', 'lh3.googleusercontent.com'],
  },
};

const config = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = {
  ...nextConfig,
  ...config,
};
