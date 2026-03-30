import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getAllSlugs, getPostBySlug } from '@/lib/mdx'
import { CtaButton } from '@/components/shared/cta-button'

export async function generateStaticParams() {
  const slugs = getAllSlugs('case-studies')
  const locales = ['nl', 'en', 'es', 'pt-BR', 'fr']
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostBySlug('case-studies', slug, locale)
  if (!post) return {}
  return { title: post.title, description: post.summary }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getPostBySlug('case-studies', slug, locale)
  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'caseStudies' })
  const tc = await getTranslations({ locale, namespace: 'common' })

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  })

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="px-[var(--section-padding-x)] pt-8 max-w-[1440px] mx-auto">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-gold transition-colors">{tc('home')}</Link>
          <span>/</span>
          <Link href={`/${locale}/case-studies`} className="hover:text-gold transition-colors">{t('breadcrumb')}</Link>
          <span>/</span>
          <span aria-current="page" className="text-foreground">{post.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="max-w-[1440px] mx-auto max-w-3xl">
          <p className="text-xs font-mono text-muted-foreground mb-4">
            {new Date(post.date).toLocaleDateString(locale === 'nl' ? 'nl-NL' : locale, { year: 'numeric', month: 'long' })}
            {' · '}{post.readingTime}
            {post.client && ` · ${post.client}`}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{post.title}</h1>
          {post.titleEn && (
            <p className="text-base font-mono text-muted-foreground mb-6">{post.titleEn}</p>
          )}
          <p className="text-lg text-muted-foreground mb-8">{post.summary}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono border border-gold text-gold px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
          <div className="border-t border-border" />
        </div>
      </section>

      {/* MDX Content */}
      <section className="px-[var(--section-padding-x)] pb-[var(--section-padding-y)]">
        <div className="max-w-[1440px] mx-auto">
          <article className="prose prose-invert prose-gold max-w-3xl
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:text-gold prose-h3:mt-8
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-strong:text-foreground
            prose-a:text-gold hover:prose-a:text-[var(--gold-hover)]">
            {content}
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[var(--section-padding-x)] py-16 border-t border-border">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t('ctaTitle')}</h2>
            <p className="text-muted-foreground mt-1">{t('ctaBody')}</p>
          </div>
          <div className="flex gap-4">
            <CtaButton href={`/${locale}/contact`} variant="primary">{t('ctaButton')}</CtaButton>
            <CtaButton href={`/${locale}/case-studies`} variant="ghost">{t('ctaGhost')}</CtaButton>
          </div>
        </div>
      </section>
    </div>
  )
}
