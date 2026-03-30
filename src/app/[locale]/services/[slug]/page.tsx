import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { services } from '@/lib/services-data'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  const ts = await getTranslations({ locale, namespace: 'servicesData' })
  return {
    title: ts(`${slug}.name`),
    description: ts(`${slug}.description`),
  }
}

function ServiceDetailContent({ slug }: { slug: string }) {
  const t = useTranslations('services.detail')
  const tc = useTranslations('common')
  const ts = useTranslations('servicesData')

  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const serviceIndex = services.findIndex((s) => s.slug === slug)
  const label = String(serviceIndex + 1).padStart(2, '0')
  const related = services.filter((s) => s.slug !== slug && s.type === service.type).slice(0, 2)

  const processSteps = [0, 1, 2, 3].map((i) => ({
    number: t(`processSteps.${i}.number`),
    title: t(`processSteps.${i}.title`),
    description: t(`processSteps.${i}.description`),
  }))

  const deliverables = ts.raw(`${slug}.deliverables`) as string[]

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-[var(--section-padding-x)] pt-8 pb-0">
        <div className="max-w-[1440px] mx-auto">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
            <li>
              <Link href="/" className="hover:text-gold transition-colors duration-200">{tc('home')}</Link>
            </li>
            <li aria-hidden="true" className="text-border select-none">/</li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-200">{t('breadcrumbServices')}</Link>
            </li>
            <li aria-hidden="true" className="text-border select-none">/</li>
            <li className="text-foreground truncate max-w-[200px]" aria-current="page">
              {ts(`${slug}.name`)}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-[var(--section-padding-x)] pt-12 pb-[var(--section-padding-y)] border-b border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-4">
              {label} — Suritargets
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B3494] mb-3">
              {ts(`${slug}.name`)}
            </h1>
            <p className="text-lg md:text-xl font-mono text-gold mb-8">
              {ts(`${slug}.nameEn`)}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {ts(`${slug}.description`)}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={120} className="mt-10">
            <div className="inline-block border-l-2 border-gold pl-6 py-1 max-w-2xl">
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-gold mb-2">{t('forWhom')}</p>
              <p className="text-foreground leading-relaxed">{ts(`${slug}.whoIsItFor`)}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{t('included')}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">{t('whatsIncluded')}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliverables.map((feature, i) => (
              <AnimatedSection key={feature} delay={i * 70}>
                <div className="bg-surface border border-border hover:border-gold transition-colors duration-300 p-6 h-full">
                  <span className="block text-2xl font-bold font-mono text-gold mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-foreground font-medium leading-snug">{feature}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-t border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{t('process')}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">{t('howWeWork')}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 80}>
                <div className="relative flex flex-col h-full">
                  {i < processSteps.length - 1 && (
                    <div aria-hidden="true" className="hidden xl:block absolute top-5 left-[calc(100%+0.75rem)] right-0 h-px bg-border w-6" />
                  )}
                  <span className="text-5xl font-bold font-mono text-gold/20 mb-4 leading-none select-none">{step.number}</span>
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-t border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">{t('related')}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">{t('otherServices')}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((rel, i) => {
              const relIndex = services.findIndex((s) => s.slug === rel.slug)
              const relLabel = String(relIndex + 1).padStart(2, '0')
              return (
                <AnimatedSection key={rel.slug} delay={i * 100}>
                  <Link
                    href={`/services/${rel.slug}`}
                    className="group flex flex-col bg-surface border border-border hover:border-gold transition-colors duration-300 p-8 h-full"
                  >
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-4">{relLabel}</span>
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-gold transition-colors duration-200">
                      {ts(`${rel.slug}.name`)}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mb-4">{ts(`${rel.slug}.nameEn`)}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{ts(`${rel.slug}.shortDescription`)}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all duration-200">
                      {t('moreInfo')} <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-t border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="bg-surface border border-border p-10 md:p-16 max-w-3xl">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-6">{t('ctaLabel')}</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">{t('ctaTitle')}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">{t('ctaBody')}</p>
              <div className="flex flex-wrap gap-4">
                <CtaButton href="/contact">{t('ctaButton')}</CtaButton>
                <CtaButton href="/services" variant="ghost">{t('ctaGhost')}</CtaButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  return <ServiceDetailContent slug={slug} />
}
