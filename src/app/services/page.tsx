import Link from 'next/link'
import type { Metadata } from 'next'
import { services } from '@/lib/services-data'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'

export const metadata: Metadata = {
  title: 'Diensten',
  description:
    'Vijf kerngebieden: bedrijfsondersteuning, web applicaties, onderzoek, forensisch accountancy en educatie.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-[var(--section-padding-x)] pt-[var(--section-padding-y)] pb-16 border-b border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-4">
              Suritargets
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4">
              Onze diensten
            </h1>
            <p className="text-xl md:text-2xl font-mono text-gold">
              Vijf kerngebieden. Één partner.
            </p>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Van business strategie tot forensisch onderzoek — elk traject is
              maatwerk, ontworpen voor uw specifieke context en doelen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service cards grid */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            {services.map((service, index) => {
              const label = String(index + 1).padStart(2, '0')
              return (
                <AnimatedSection key={service.slug} delay={index * 80}>
                  <article className="group flex flex-col h-full bg-surface border border-border hover:border-gold transition-colors duration-300 p-8 xl:p-10">
                    {/* Label + number */}
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-xs font-mono tracking-[0.2em] uppercase text-gold">
                        {label}
                      </span>
                    </div>

                    {/* Names */}
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">
                      {service.name}
                    </h2>
                    <p className="text-sm font-mono text-gold mb-4">
                      {service.nameEn}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 mb-8 flex-1">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-foreground"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Link */}
                    <div className="pt-6 border-t border-border">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-[var(--gold-hover)] transition-colors duration-200 group-hover:gap-3"
                      >
                        Meer informatie
                        <span aria-hidden="true" className="transition-all duration-200">→</span>
                      </Link>
                    </div>
                  </article>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-t border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="bg-surface border border-border p-10 md:p-16 text-center max-w-3xl mx-auto">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-6">
                Maatwerk
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
                Elke dienst is maatwerk.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Neem contact op om uw situatie te bespreken.
              </p>
              <CtaButton href="/contact">Neem contact op</CtaButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
