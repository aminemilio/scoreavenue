/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api-football-v1.p.rapidapi.com' },
      { protocol: 'https', hostname: 'media.api-sports.io' },
    ],
  },
};

export default nextConfig;