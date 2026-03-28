import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { services } from '@/lib/services-data'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.description,
  }
}

const processSteps = [
  {
    number: '01',
    title: 'Intake',
    description: 'We beginnen met een vrijblijvend gesprek om uw doelen, context en verwachtingen helder te krijgen.',
  },
  {
    number: '02',
    title: 'Analyse',
    description: 'Grondige analyse van uw situatie en doelen, zodat we een aanpak op maat kunnen ontwerpen.',
  },
  {
    number: '03',
    title: 'Uitvoering',
    description: 'Vakkundige uitvoering met regelmatige voortgangsrapportage en directe communicatielijnen.',
  },
  {
    number: '04',
    title: 'Oplevering',
    description: 'Eindresultaat met nazorg en follow-up — we blijven beschikbaar nadat het project is afgerond.',
  },
]

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const serviceIndex = services.findIndex((s) => s.slug === slug)
  const label = String(serviceIndex + 1).padStart(2, '0')

  // Pick 2 related services (excluding current)
  const related = services.filter((s) => s.slug !== slug).slice(0, 2)

  return (
    <>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="px-[var(--section-padding-x)] pt-8 pb-0"
      >
        <div className="max-w-[1440px] mx-auto">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
            <li>
              <Link href="/" className="hover:text-gold transition-colors duration-200">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-border select-none">/</li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors duration-200">
                Diensten
              </Link>
            </li>
            <li aria-hidden="true" className="text-border select-none">/</li>
            <li className="text-foreground truncate max-w-[200px]" aria-current="page">
              {service.name}
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-3">
              {service.name}
            </h1>
            <p className="text-lg md:text-xl font-mono text-gold mb-8">
              {service.nameEn}
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {service.description}
            </p>
          </AnimatedSection>

          {/* Who is it for */}
          <AnimatedSection delay={120} className="mt-10">
            <div className="inline-block border-l-2 border-gold pl-6 py-1 max-w-2xl">
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-gold mb-2">
                Voor wie
              </p>
              <p className="text-foreground leading-relaxed">
                {service.whoIsItFor}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features — "Wat is inbegrepen" */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">
              Inbegrepen
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">
              Wat is inbegrepen
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.deliverables.map((feature, i) => (
              <AnimatedSection key={feature} delay={i * 70}>
                <div className="bg-surface border border-border hover:border-gold transition-colors duration-300 p-6 h-full">
                  <span className="block text-2xl font-bold font-mono text-gold mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-foreground font-medium leading-snug">
                    {feature}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process — 4 steps */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-t border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">
              Werkwijze
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">
              Hoe wij werken
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 80}>
                <div className="relative flex flex-col h-full">
                  {/* Connector line (desktop) */}
                  {i < processSteps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden xl:block absolute top-5 left-[calc(100%+0.75rem)] right-0 h-px bg-border w-6"
                    />
                  )}
                  <span className="text-5xl font-bold font-mono text-gold/20 mb-4 leading-none select-none">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {step.description}
                  </p>
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
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-3">
              Gerelateerd
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">
              Andere diensten
            </h2>
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
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-4">
                      {relLabel}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-gold transition-colors duration-200">
                      {rel.name}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mb-4">
                      {rel.nameEn}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {rel.shortDescription}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all duration-200">
                      Meer informatie <span aria-hidden="true">→</span>
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
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-6">
                Aan de slag
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                Start uw project
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Klaar om te beginnen met {service.name}? Neem contact op voor een
                vrijblijvend gesprek over uw situatie en doelen.
              </p>
              <div className="flex flex-wrap gap-4">
                <CtaButton href="/contact">Neem contact op</CtaButton>
                <CtaButton href="/services" variant="ghost">
                  Alle diensten
                </CtaButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
