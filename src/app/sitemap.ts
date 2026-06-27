import type { MetadataRoute } from 'next'
import { services } from '@/lib/services-data'
import { getAllSlugs } from '@/lib/mdx'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suritargets.com'

  const staticPages = [
    '', '/about', '/services', '/contact', '/pricing',
    '/portfolio',
    '/education',
    '/education/ai-hands-on-deck',
    '/education/finance-accounting-claude',
    '/education/ai-courses',
    '/education/trading-courses',
    '/education/it-courses',
    '/education/business-courses',
    '/education/knowledge-base-rag',
    '/education/research-development',
    '/education/data-aggregation',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : path.startsWith('/education') ? 0.8 : 0.8,
  }))

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const caseStudySlugs = getAllSlugs('case-studies').map((slug) => ({
    url: `${baseUrl}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const insightSlugs = getAllSlugs('insights').map((slug) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...caseStudySlugs, ...insightSlugs]
}
