import { Suspense } from 'react'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'
import ServicesClient from './services-client'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services.meta' })
  return { title: t('title'), description: t('description') }
}

function ServicesContent() {
  const t = useTranslations('services')

  return (
    <>
      {/* Hero */}
      <section className="px-[var(--section-padding-x)] pt-[var(--section-padding-y)] pb-16 border-b border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-4">{t('hero.label')}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl font-mono text-gold">{t('hero.subtitle')}</p>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{t('hero.body')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service cards with tab toggle */}
      <Suspense>
        <ServicesClient />
      </Suspense>

      {/* Bottom CTA */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-t border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="bg-surface border border-border p-10 md:p-16 text-center max-w-3xl mx-auto">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-6">{t('cta.label')}</p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">{t('cta.title')}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t('cta.body')}</p>
              <CtaButton href="/contact">{t('cta.button')}</CtaButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

export default function ServicesPage() {
  return <ServicesContent />
}
