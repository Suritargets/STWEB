import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about.meta' })
  return { title: t('title'), description: t('description') }
}

function AboutContent() {
  const t = useTranslations('about')

  const values = [0, 1, 2].map((i) => ({
    nl: t(`values.items.${i}.nl`),
    en: t(`values.items.${i}.en`),
    description: t(`values.items.${i}.description`),
  }))

  return (
    <>
      {/* Hero */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-b border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
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

      {/* Mission */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-b border-border">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <SectionHeading label={t('mission.label')} title={t('mission.title')} titleEn={t('mission.titleEn')} />
          </AnimatedSection>
          <AnimatedSection delay={120}>
            <div className="space-y-6 pt-2">
              <p className="text-lg text-foreground leading-relaxed">{t('mission.body1')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('mission.body2')}</p>
              <div className="pt-2 border-l-2 border-gold pl-6">
                <p className="text-foreground italic">&ldquo;{t('mission.quote')}&rdquo;</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Founding story */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] bg-surface border-b border-border">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <SectionHeading label={t('story.label')} title={t('story.title')} titleEn={t('story.titleEn')} />
          </AnimatedSection>
          <AnimatedSection delay={120}>
            <div className="space-y-5 pt-2">
              <p className="text-lg text-foreground leading-relaxed">{t('story.body1')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('story.body2')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('story.body3')}</p>
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={200}>
          <div className="max-w-[1440px] mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border overflow-hidden">
            {[
              { number: t('story.stat1number'), label: t('story.stat1label') },
              { number: t('story.stat2number'), label: t('story.stat2label') },
              { number: t('story.stat3number'), label: t('story.stat3label') },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface px-8 py-10">
                <p className="text-4xl font-bold font-mono text-gold">{stat.number}</p>
                <p className="mt-2 text-sm text-muted-foreground tracking-wide uppercase font-mono">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Values */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-b border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <SectionHeading
              label={t('values.label')}
              title={t('values.title')}
              titleEn={t('values.titleEn')}
              description={t('values.description')}
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {values.map((value, i) => (
              <AnimatedSection key={value.nl} delay={i * 80}>
                <div className="group h-full bg-surface border border-border p-8 flex flex-col gap-4 hover:border-gold transition-colors duration-200">
                  <span className="text-xs font-mono text-gold tracking-[0.2em]">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{value.nl}</h3>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5 tracking-widest uppercase">{value.en}</p>
                  </div>
                  <div className="w-8 h-px bg-gold" />
                  <p className="text-muted-foreground leading-relaxed flex-1">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team intro */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="max-w-2xl">
              <SectionHeading label={t('team.label')} title={t('team.title')} titleEn={t('team.titleEn')} />
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">{t('team.body')}</p>
              <CtaButton href="/contact" variant="primary">{t('team.cta')}</CtaButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

export default function AboutPage() {
  return <AboutContent />
}
