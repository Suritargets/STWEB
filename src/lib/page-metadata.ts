import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { siteConfig } from '@/lib/site-config'

/**
 * Next.js does not deep-merge nested metadata objects between a layout and a
 * child page — a child that only returns { title, description } silently
 * inherits the parent layout's entire openGraph/alternates object, including
 * its url and canonical. This wraps every route's generateMetadata so
 * openGraph, twitter, and canonical always point at that route's own URL.
 */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
}: {
  locale: string
  path?: string
  title: string
  description: string
}): Metadata {
  const suffix = path ? `/${path}` : ''
  const url = `${siteConfig.url}/${locale}${suffix}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale.replace('-', '_'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${siteConfig.url}/${l}${suffix}`])
      ),
    },
  }
}
