import type { Metadata } from 'next'
import type { ElementType } from 'react'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Sparkles, TrendingUp, Monitor, Briefcase, BookOpen, Compass, BarChart2, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'

const VALID_SLUGS = [
  'ai-courses', 'trading-courses', 'it-courses', 'business-courses',
  'knowledge-base-rag', 'research-development', 'data-aggregation',
] as const
type Slug = typeof VALID_SLUGS[number]

const SLUG_META: Record<Slug, { icon: ElementType; color: string; bg: string }> = {
  'ai-courses':           { icon: Sparkles,  color: 'text-gold',         bg: 'bg-gold/10'    },
  'trading-courses':      { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  'it-courses':           { icon: Monitor,   color: 'text-sky-600',      bg: 'bg-sky-50'     },
  'business-courses':     { icon: Briefcase, color: 'text-rose-600',     bg: 'bg-rose-50'    },
  'knowledge-base-rag':   { icon: BookOpen,  color: 'text-violet-600',   bg: 'bg-violet-50'  },
  'research-development': { icon: Compass,   color: 'text-amber-600',    bg: 'bg-amber-50'   },
  'data-aggregation':     { icon: BarChart2, color: 'text-teal-600',     bg: 'bg-teal-50'    },
}

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
  return {
    title: `${t(`${key}.title`)} — Suritargets`,
    description: t(`${key}.description`),
  }
}

function PageContent({ slug }: { slug: Slug }) {
  const t = useTranslations('education')
  const key = SLUG_KEY[slug]
  const { icon: Icon, color, bg } = SLUG_META[slug]
  const topics = t.raw(`${key}.topics`) as string[]

  return (
    <>
      {/* Hero */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${bg} ${color} mb-8`}>
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-6">
              {t('hero.label')}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.05]">
              {t(`${key}.title`)}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground font-mono max-w-xl">
              {t(`${key}.subtitle`)}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="mt-16 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <div className="w-2 h-2 rotate-45 bg-gold" />
              <div className="h-px w-12 bg-gold" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Topics / Features */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <SectionHeading
              label={t('topicsLabel')}
              title={t(`${key}.topicsTitle`)}
              titleEn={t(`${key}.topicsTitleEn`)}
              className="mb-12"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic, i) => (
              <AnimatedSection key={i} delay={i * 20}>
                <div className="flex items-start gap-4 p-5 border border-border bg-surface">
                  <CheckCircle size={18} className="text-gold shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{topic}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection>
        <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-gold/30">
          <div className="max-w-360 mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">
                {t('cta.label')}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground max-w-xl">
                {t('cta.title')}
              </h2>
              <p className="mt-3 text-muted-foreground max-w-md">{t('cta.body')}</p>
            </div>
            <CtaButton href="/contact">{t('cta.button')}</CtaButton>
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}

export default async function EducationSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  if (!VALID_SLUGS.includes(slug as Slug)) notFound()
  return <PageContent slug={slug as Slug} />
}
