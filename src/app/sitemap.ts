import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/football', '/basketball', '/standings', '/news', '/about', '/contact', '/privacy', '/terms', '/cookies', '/disclaimer']
  return routes.map(route => ({ url: `https://scoreavenue.com${route}`, changeFrequency: route === '' ? 'hourly' as const : 'weekly' as const, priority: route === '' ? 1 : 0.7 }))
}