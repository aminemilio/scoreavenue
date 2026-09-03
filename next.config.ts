import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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

export default withNextIntl(nextConfig);