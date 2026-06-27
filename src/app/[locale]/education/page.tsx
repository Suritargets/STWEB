import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { GraduationCap, Sparkles, TrendingUp, Monitor, Briefcase, BookOpen, Compass, BarChart2, ArrowRight, Calculator, Zap } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'

const ICON_CLS = 'text-[#2B3494] bg-[#2B3494]/8 group-hover:bg-[#2B3494] group-hover:text-white'

const COURSES = [
  { slug: 'ai-courses',         icon: Sparkles,   navKey: 'aiCourses',        tKey: 'ai_courses',         badge: null      },
  { slug: 'ai-hands-on-deck',   icon: Zap,        navKey: 'aiHandsOnDeck',    tKey: 'ai_hands_on_deck',   badge: 'Q3 2026' },
  { slug: 'trading-courses',    icon: TrendingUp, navKey: 'tradingCourses',   tKey: 'trading_courses',    badge: null      },
  { slug: 'it-courses',         icon: Monitor,    navKey: 'itCourses',        tKey: 'it_courses',         badge: null      },
  { slug: 'business-courses',   icon: Briefcase,  navKey: 'businessCourses',  tKey: 'business_courses',   badge: null      },
] as const

const INHOUSE = [
  { href: '/education/finance-accounting-claude', icon: Calculator, tKey: 'finance_claude', badge: 'Claude Desktop + Excel' },
] as const

const SOFTWARE = [
  { href: '/education/knowledge-base-rag',   icon: BookOpen,  navKey: 'knowledgeBase',   tKey: 'knowledge_base_rag'   },
  { href: '/education/research-development', icon: Compass,   navKey: 'researchDev',     tKey: 'research_development' },
  { href: '/education/data-aggregation',     icon: BarChart2, navKey: 'dataAggregation', tKey: 'data_aggregation'     },
] as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'education.meta' })
  return { title: t('title'), description: t('description') }
}

function EducationContent() {
  const t = useTranslations('education')
  const tn = useTranslations('nav')

  return (
    <>
      {/* Hero */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#2B3494]/8 text-[#2B3494] mb-8">
              <GraduationCap size={26} strokeWidth={1.5} />
            </div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-6">{t('hero.label')}</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.05]">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground font-mono max-w-xl">
              {t('hero.subtitle')}
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

      {/* Courses section */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <SectionHeading
              label={tn('courses')}
              title={t('categories.title')}
              titleEn={t('categories.titleEn')}
              className="mb-12"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {COURSES.map((cat, i) => {
              const Icon = cat.icon
              return (
                <AnimatedSection key={cat.slug} delay={i * 30}>
                  <Link
                    href={`/education/${cat.slug}`}
                    className="group flex flex-col h-full bg-surface border border-border hover:border-gold transition-all duration-200 p-8 relative overflow-hidden"
                  >
                    <span className="absolute left-0 top-0 bottom-0 w-0.75 bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-bottom" aria-hidden="true" />
                    <span className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors mb-6 ${ICON_CLS}`}>
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                    {cat.badge && (
                      <span className="inline-flex self-start font-mono text-[9px] tracking-widest uppercase font-bold text-[#E8192C] bg-[#E8192C]/8 px-2 py-0.5 rounded-full mb-3">
                        {cat.badge}
                      </span>
                    )}
                    <h2 className="text-lg font-bold text-foreground tracking-tight mb-3 group-hover:text-[#2B3494] transition-colors">
                      {tn(cat.navKey)}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {t(`${cat.tKey}.description`)}
                    </p>
                    <div className="mt-6 flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-gold">
                      <span>{t('more')}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* In-house Training section */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border bg-surface">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <SectionHeading
              label="In-house Training"
              title={t('inhouse.title')}
              titleEn={t('inhouse.titleEn')}
              className="mb-12"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-6">
            {INHOUSE.map((item, i) => {
              const Icon = item.icon
              return (
                <AnimatedSection key={item.href} delay={i * 30}>
                  <Link
                    href={item.href}
                    className="group flex flex-col md:flex-row md:items-center gap-6 bg-[#2B3494] border border-[#2B3494]/20 hover:border-[#E8192C]/40 transition-all duration-200 p-8 relative overflow-hidden rounded-none"
                  >
                    <span className="absolute left-0 top-0 bottom-0 w-0.75 bg-[#E8192C] scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-bottom" aria-hidden="true" />
                    <span className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/10 text-white shrink-0">
                      <Icon size={26} strokeWidth={1.5} />
                    </span>
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />
                        <span className="font-mono text-[10px] tracking-widest uppercase text-white font-bold">{item.badge}</span>
                      </div>
                      <h2 className="text-xl font-bold text-white tracking-tight mb-2">
                        {t(`${item.tKey}.title`)}
                      </h2>
                      <p className="text-sm text-white/65 leading-relaxed max-w-2xl">
                        {t(`${item.tKey}.description`)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/70 group-hover:text-white transition-colors shrink-0">
                      <span>{t('more')}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Education Software section */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <SectionHeading
              label={tn('eduSoftwareLabel')}
              title={t('software.title')}
              titleEn={t('software.titleEn')}
              className="mb-12"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOFTWARE.map((item, i) => {
              const Icon = item.icon
              return (
                <AnimatedSection key={item.href} delay={i * 30}>
                  <Link
                    href={item.href}
                    className="group flex flex-col h-full bg-surface border border-border hover:border-gold transition-all duration-200 p-8 relative overflow-hidden"
                  >
                    <span className="absolute left-0 top-0 bottom-0 w-0.75 bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-bottom" aria-hidden="true" />
                    <span className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors mb-6 ${ICON_CLS}`}>
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                    <h2 className="text-lg font-bold text-foreground tracking-tight mb-3 group-hover:text-[#2B3494] transition-colors">
                      {tn(item.navKey)}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {t(`${item.tKey}.description`)}
                    </p>
                    <div className="mt-6 flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-gold">
                      <span>{t('more')}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection>
        <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-gold/30">
          <div className="max-w-360 mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{t('cta.label')}</p>
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

export default function EducationPage() {
  return <EducationContent />
}
