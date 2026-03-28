import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'
import { ExplainerSection } from '@/components/shared/explainer-section'
import { services } from '@/lib/services-data'

import { HeroMockup } from '@/components/home/hero-mockup'
import { ParticleBackground } from '@/components/home/particle-background'

export const metadata: Metadata = {
  title: 'Business Technology & Innovation Solutions',
  description:
    'Suritargets levert strategische bedrijfsondersteuning, web applicaties, en digitale oplossingen in Suriname.',
}

// SVG dot-grid background injected as a data-URI background-image
const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='1' cy='1' r='1' fill='%231E3050'/%3E%3C/svg%3E")`

const WHY_ITEMS = [
  {
    number: '01',
    title: 'Caribisch begrip',
    description:
      'Wij kennen de lokale markt, de regelgeving en de culturele context van Suriname en de bredere Caribische regio. Dat maakt het verschil tussen advies dat op papier klopt en advies dat écht werkt.',
  },
  {
    number: '02',
    title: 'Bewezen methoden',
    description:
      'Onze aanpak is gebaseerd op internationaal bewezen frameworks — van agile productontwikkeling tot forensische standaarden. Wij vertalen mondiale best practices naar uw lokale realiteit.',
  },
  {
    number: '03',
    title: 'Persoonlijke aanpak',
    description:
      'Geen accountmanagers, geen doorverbinden. U werkt rechtstreeks met de specialisten die uw project uitvoeren. Snelle lijnen, heldere communicatie, volledige betrokkenheid.',
  },
]


export default function HomePage() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f0f2ff 50%, #e8ecff 100%)' }}
        aria-label="Hero"
      >
        {/* Particle canvas */}
        <ParticleBackground />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[var(--section-padding-x)] pt-28 pb-0 text-center">
          {/* Mono slogan */}
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#2B3494] mb-6 opacity-60">
            Business Technology &amp; Innovation Solutions
          </p>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#0B1628] leading-[1.05] mb-6">
            Wij bouwen digitale tools
            <br />
            <span className="text-[#2B3494]">voor uw business</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Van dashboards en web applicaties tot ERP-systemen en AI-marketing —
            op maat gebouwd voor de Caribische markt.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <CtaButton href="/services" variant="primary">
              Bekijk onze diensten
            </CtaButton>
            <CtaButton href="/contact" variant="ghost">
              Gratis gesprek
            </CtaButton>
          </div>

          {/* App mockup — full width container */}
          <div className="w-full max-w-6xl mx-auto">
            <HeroMockup />
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #f9fafb)' }}
          aria-hidden="true"
        />
      </section>

      {/* ── 2. SERVICES GRID ────────────────────────────────────────── */}
      <AnimatedSection>
        <section
          className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]"
          aria-labelledby="services-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <SectionHeading
              label="DIENSTEN"
              title="Wat wij doen"
              titleEn="Our Services"
              description="Vijf gespecialiseerde clusters die samen de volledige bedrijfscyclus ondersteunen — van strategie tot uitvoering."
            />

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block h-full bg-surface border border-border p-8 transition-all duration-200
                               hover:border-gold focus-visible:border-gold
                               relative overflow-hidden"
                  >
                    {/* Gold left border accent on hover */}
                    <span
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold
                                 scale-y-0 group-hover:scale-y-100
                                 transition-transform duration-200 origin-bottom"
                      aria-hidden="true"
                    />

                    {/* Icon letter */}
                    <span className="font-mono text-4xl font-bold text-gold opacity-80 block mb-6 leading-none">
                      {service.slug.charAt(0).toUpperCase()}
                    </span>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Arrow */}
                    <span
                      className="mt-6 inline-flex items-center gap-1 font-mono text-xs tracking-widest uppercase
                                 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-hidden="true"
                    >
                      Meer info
                      <svg
                        className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h8M6 2l4 4-4 4" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </AnimatedSection>

      {/* ── 3. WHY SURITARGETS ──────────────────────────────────────── */}
      <AnimatedSection delay={60}>
        <section
          className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-t border-border"
          aria-labelledby="why-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <SectionHeading
              label="WAAROM"
              title="Lokale expertise, internationale standaard"
              titleEn="Why choose us"
            />

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-12 list-none p-0">
              {WHY_ITEMS.map((item) => (
                <li key={item.number} className="flex flex-col gap-4">
                  {/* Gold numbered label */}
                  <span className="font-mono text-xs tracking-[0.25em] text-gold">
                    {item.number}
                  </span>

                  {/* Divider */}
                  <div className="w-12 h-px bg-gold opacity-50" aria-hidden="true" />

                  <h3 className="text-xl font-bold text-foreground tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </AnimatedSection>

      {/* ── 4. EXPLAINER VIDEO ──────────────────────────────────────── */}
      <AnimatedSection delay={70}>
        <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-t border-border">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeading
              label="VIDEO"
              title="Wie zijn wij?"
              titleEn="Watch our explainer"
              className="mb-8"
            />
            <ExplainerSection />
          </div>
        </section>
      </AnimatedSection>

      {/* ── 5. PARTNERS ─────────────────────────────────────────────── */}
      <AnimatedSection delay={80}>
        <section
          className="bg-surface border-t border-b border-border
                     px-[var(--section-padding-x)] py-12"
          aria-label="Partners"
        >
          <div className="max-w-[1440px] mx-auto">
            <p className="text-center text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-8">
              Onze partners
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-32 h-10 rounded bg-border/60 animate-pulse"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ── 6. CTA BANNER ───────────────────────────────────────────── */}
      <AnimatedSection delay={100}>
        <section
          className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]
                     border-t border-b border-gold/30"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2
                id="cta-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-2"
              >
                Klaar om te groeien?
              </h2>
              <p className="font-mono text-sm text-gold opacity-80 tracking-wide">
                Ready to grow your business?
              </p>
            </div>

            <div className="shrink-0">
              <CtaButton href="/contact" variant="primary">
                Neem contact op
              </CtaButton>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}
