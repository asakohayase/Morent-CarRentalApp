/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['zxcskcblupyveqqyaiel.supabase.co', 'lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        host: '**',
      },
    ],
  },
};

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['zxcskcblupyveqqyaiel.supabase.co', 'lh3.googleusercontent.com'],
  },
  ...nextConfig,
};
