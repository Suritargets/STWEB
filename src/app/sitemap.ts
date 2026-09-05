import type { MetadataRoute } from 'next'
import { services } from '@/lib/services-data'
import { getAllSlugs } from '@/lib/mdx'
import { routing } from '@/i18n/routing'

const LOCALES = routing.locales

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.suritargets.com'

  const staticPaths = [
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
  ]

  const servicePaths = services.map((s) => `/services/${s.slug}`)
  const caseStudyPaths = getAllSlugs('case-studies').map((slug) => `/case-studies/${slug}`)
  const insightPaths = getAllSlugs('insights').map((slug) => `/insights/${slug}`)

  const allPaths = [...staticPaths, ...servicePaths, ...caseStudyPaths, ...insightPaths]

  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    for (const path of allPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : path.startsWith('/education') ? 0.8 : 0.7,
      })
    }
  }

  return entries
}
