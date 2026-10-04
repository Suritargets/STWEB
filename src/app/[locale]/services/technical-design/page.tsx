import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Ruler, Box, PencilRuler, FileText, ListChecks, Calculator, Check } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'
import { JsonLd } from '@/components/shared/json-ld'
import { buildMetadata } from '@/lib/page-metadata'
import { siteConfig } from '@/lib/site-config'

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
  const tiers = [0, 1, 2].map((i) => ({
    label: t(`pricingTiers.${i}.label`),
    title: t(`pricingTiers.${i}.title`),
    price: t(`pricingTiers.${i}.price`),
    description: t(`pricingTiers.${i}.description`),
    includes: t.raw(`pricingTiers.${i}.includes`) as string[],
    button: t(`pricingTiers.${i}.button`),
    featured: i === 1,
  }))

  const pageUrl = `${siteConfig.url}/${locale}/services/technical-design`
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('heroTitle'),
    description: t('meta.description'),
    url: pageUrl,
    inLanguage: locale,
    serviceType: 'Technical design and project support',
    areaServed: ['Suriname', 'Caribbean'],
    provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: 500,
      highPrice: 2500,
      url: pageUrl,
    },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tc('home'), item: `${siteConfig.url}/${locale}` },
      { '@type': 'ListItem', position: 2, name: ts('breadcrumbServices'), item: `${siteConfig.url}/${locale}/services` },
      { '@type': 'ListItem', position: 3, name: t('heroTitle'), item: pageUrl },
    ],
  }

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
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
        <div className="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-4">{t('label')}</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#2B3494] mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">{t('heroSubtitle')}</p>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <Image
              src="/services/technical-design/hero-site-review.jpg"
              alt={t('heroAlt')}
              width={2368}
              height={1776}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-4/3"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Example work */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{t('galleryLabel')}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">{t('galleryTitle')}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AnimatedSection>
              <Image
                src="/services/technical-design/drafting-desk.jpg"
                alt={t('deskAlt')}
                width={2368}
                height={1776}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-4/3"
              />
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <Image
                src="/services/technical-design/building-progress.jpg"
                alt={t('buildingAlt')}
                width={2688}
                height={2016}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-4/3"
              />
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
            <AnimatedSection>
              <Image
                src="/services/technical-design/kitchen-drawing-sheet.jpg"
                alt={t('drawingAlt')}
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="w-full h-auto border border-border shadow-lg"
              />
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <Image
                src="/services/technical-design/building-drawings-flyer.png"
                alt={t('flyerAlt')}
                width={1024}
                height={1536}
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="w-full max-w-md mx-auto lg:max-w-none h-auto border border-border shadow-lg"
              />
            </AnimatedSection>
          </div>
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
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{t('pricingLabel')}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">{t('pricingTitle')}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.title} delay={i * 80}>
                <div
                  className={`flex flex-col h-full p-8 border ${
                    tier.featured ? 'bg-surface border-[#2B3494] shadow-lg' : 'bg-surface border-border'
                  }`}
                >
                  <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{tier.label}</p>
                  <h3 className="text-xl font-bold text-foreground mb-4">{tier.title}</h3>
                  <p className="text-3xl font-bold font-mono text-[#2B3494] mb-4">{tier.price}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{tier.description}</p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {tier.includes.map((line) => (
                      <li key={line} className="flex items-start gap-3 text-sm text-foreground">
                        <Check size={16} className="text-gold mt-0.5 shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <CtaButton href="/contact" variant={tier.featured ? 'primary' : 'ghost'} className="justify-center">
                    {tier.button}
                  </CtaButton>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground leading-relaxed max-w-3xl">{t('pricingNote')}</p>
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
