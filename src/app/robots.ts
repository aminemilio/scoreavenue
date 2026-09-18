import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/auth', '/search'] }],
    sitemap: 'https://scoreavenue.com/sitemap.xml',
    host: 'https://scoreavenue.com',
  }
}