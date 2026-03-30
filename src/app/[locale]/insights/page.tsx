import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getAllPosts } from '@/lib/mdx'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'insights.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'insights' })
  const posts = getAllPosts('insights')

  return (
    <div className="min-h-screen">
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="max-w-[1440px] mx-auto">
          <SectionHeading
            label={t('label')}
            title={t('title')}
            titleEn={t('titleEn')}
            description={t('description')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {posts.map((post) => (
              <AnimatedSection key={post.slug}>
                <Link
                  href={`/${locale}/insights/${post.slug}`}
                  className="block bg-surface border border-border p-8 hover:border-gold transition-colors group"
                >
                  {post.category && (
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gold border border-gold px-2 py-0.5 mb-4 inline-block">
                      {post.category}
                    </span>
                  )}
                  <p className="text-xs font-mono text-muted-foreground mb-2">
                    {new Date(post.date).toLocaleDateString(locale === 'nl' ? 'nl-NL' : locale, { year: 'numeric', month: 'long' })}
                    {' · '}{post.readingTime}
                  </p>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  {post.titleEn && (
                    <p className="text-xs font-mono text-muted-foreground mb-3">{post.titleEn}</p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono bg-background border border-border px-2 py-0.5 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
