import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { SlugPageContent } from './_components/page-content'
import { buildMetadata } from '@/lib/page-metadata'

const VALID_SLUGS = [
  'ai-courses', 'trading-courses', 'it-courses', 'business-courses',
  'knowledge-base-rag', 'research-development', 'data-aggregation',
] as const
type Slug = typeof VALID_SLUGS[number]

const SLUG_KEY: Record<Slug, string> = {
  'ai-courses':           'ai_courses',
  'trading-courses':      'trading_courses',
  'it-courses':           'it_courses',
  'business-courses':     'business_courses',
  'knowledge-base-rag':   'knowledge_base_rag',
  'research-development': 'research_development',
  'data-aggregation':     'data_aggregation',
}

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!VALID_SLUGS.includes(slug as Slug)) return {}
  const t = await getTranslations({ locale, namespace: 'education' })
  const key = SLUG_KEY[slug as Slug]
  return buildMetadata({
    locale,
    path: `education/${slug}`,
    title: `${t(`${key}.title`)} — Suritargets`,
    description: t(`${key}.description`),
  })
}

export default async function EducationSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  if (!VALID_SLUGS.includes(slug as Slug)) notFound()
  return <SlugPageContent slug={slug as Slug} />
}
