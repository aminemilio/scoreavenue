import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api-football-v1.p.rapidapi.com' },
      { protocol: 'https', hostname: 'media.api-sports.io' },
      { protocol: 'https', hostname: '*.api-sports.io' },
    ],
  },
};

export default withNextIntl(nextConfig);