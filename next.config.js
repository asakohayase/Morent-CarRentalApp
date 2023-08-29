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
  images: {
    domains: ['zxcskcblupyveqqyaiel.supabase.co', 'lh3.googleusercontent.com'],
  },
};
