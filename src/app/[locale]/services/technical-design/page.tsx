import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Ruler, Box, PencilRuler, FileText, ListChecks, Calculator, Check } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'
import { buildMetadata } from '@/lib/page-metadata'

const ITEM_ICONS = [Ruler, Box, PencilRuler, FileText, ListChecks, Calculator]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'technicalDesign.meta' })
  return buildMetadata({
    locale,
    path: 'services/technical-design',
    title: t('title'),
    description: t('description'),
  })
}

export default async function TechnicalDesignPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'technicalDesign' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const ts = await getTranslations({ locale, namespace: 'services.detail' })

  const items = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }))
  const process = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`process.${i}.title`),
    description: t(`process.${i}.description`),
  }))
  const pricingIncludes = [0, 1, 2, 3].map((i) => t(`pricingIncludes.${i}`))

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-(--section-padding-x) pt-8">
        <div className="max-w-360 mx-auto">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
            <li>
              <Link href="/"className="hover:text-gold transition-colors duration-200">{tc('home')}</Link>
            </li>
            <li aria-hidden="true" className="text-border select-none">/</li>
            <li>
              <Link href="/services"className="hover:text-gold transition-colors duration-200">{ts('breadcrumbServices')}</Link>
            </li>
            <li aria-hidden="true" className="text-border select-none">/</li>
            <li className="text-foreground truncate max-w-50" aria-current="page">{t('heroTitle')}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-(--section-padding-x) pt-12 pb-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-4">{t('label')}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B3494] mb-6 max-w-4xl">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">{t('heroSubtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* What's included */}
      <section className="px-(--section-padding-x) py-(--section-padding-y)">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{t('itemsLabel')}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">{t('itemsTitle')}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => {
              const Icon = ITEM_ICONS[i]
              return (
                <AnimatedSection key={item.title} delay={i * 60}>
                  <div className="bg-surface border border-border hover:border-gold transition-colors duration-300 p-6 h-full">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#2B3494]/8 text-[#2B3494] mb-5">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-t border-border bg-surface">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{t('processLabel')}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">{t('processTitle')}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 60}>
                <span className="block text-5xl font-bold font-mono text-gold/20 mb-4 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-t border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <div className="bg-surface border border-border p-8 md:p-12 max-w-3xl">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{t('pricingLabel')}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">{t('pricingTitle')}</h2>
              <p className="text-3xl font-bold font-mono text-[#2B3494] mb-6">{t('priceRange')}</p>
              <ul className="space-y-3 mb-6">
                {pricingIncludes.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-foreground">
                    <Check size={18} className="text-gold mt-0.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground leading-relaxed">{t('pricingNote')}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-t border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">{t('ctaTitle')}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">{t('ctaSubtitle')}</p>
            <div className="flex flex-wrap gap-4">
              <CtaButton href="/contact">{t('ctaButton')}</CtaButton>
              <CtaButton href="/services" variant="ghost">{t('ctaGhost')}</CtaButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
