import type { Metadata } from 'next'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'

export const metadata: Metadata = {
  title: 'Over ons',
  description:
    'Suritargets is gevestigd in Paramaribo en levert internationale kwaliteit voor Caribische bedrijven.',
}

const values = [
  {
    nl: 'Integriteit',
    en: 'Integrity',
    description:
      'Geen omwegen, geen verborgen agenda. Directe communicatie en eerlijk advies — ook als dat niet is wat u wilt horen.',
  },
  {
    nl: 'Vakmanschap',
    en: 'Craftsmanship',
    description:
      'Elk deliverable draagt onze naam. We leveren op het hoogste niveau of we leveren niet.',
  },
  {
    nl: 'Vertrouwen',
    en: 'Trust',
    description:
      'We bouwen langetermijnrelaties. Snelle wins zijn leuk; duurzame partnerships zijn ons doel.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] border-b border-border">
        <div className="max-w-[1440px] mx-auto">
          <AnimatedSection>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-6">
              Over Suritargets
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-3xl leading-[1.05]">
              Over Suritargets
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground font-mono max-w-xl">
              Gevestigd in Paramaribo. Gericht op de regio.
            </p>
          </AnimatedSection>

          {/* Decorative rule */}
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
            <SectionHeading
              label="MISSIE"
              title="Wij geloven in lokale kracht"
              titleEn="Our mission"
            />
          </AnimatedSection>
          <AnimatedSection delay={120}>
            <div className="space-y-6 pt-2">
              <p className="text-lg text-foreground leading-relaxed">
                Caribische bedrijven verdienen toegang tot dezelfde strategische
                intelligentie en digitale middelen als hun internationale
                concurrenten. Wij maken dat mogelijk — zonder concessies aan
                kwaliteit.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to equip Caribbean businesses with the strategic
                intelligence and digital capabilities needed to thrive.
              </p>
              <div className="pt-2 border-l-2 border-gold pl-6">
                <p className="text-foreground italic">
                  &ldquo;Internationale kwaliteit, lokale verankering.&rdquo;
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Founding story */}
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)] bg-surface border-b border-border">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <SectionHeading
              label="VERHAAL"
              title="Opgericht in Suriname"
              titleEn="Founded in Paramaribo"
            />
          </AnimatedSection>
          <AnimatedSection delay={120}>
            <div className="space-y-5 pt-2">
              <p className="text-lg text-foreground leading-relaxed">
                Suritargets werd opgericht in Paramaribo met een heldere visie:
                internationaal-niveau bedrijfsdiensten naar de Caribische markt
                brengen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Te vaak stonden lokale bedrijven voor een onmogelijke keuze:
                dure buitenlandse consultancies of ondergefinancierde lokale
                alternatieven. Wij overbruggen dat gat.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Met specialisten in business intelligence, softwareontwikkeling,
                juridisch onderzoek en educatie bouwen wij aan een fundament dat
                de regio structureel versterkt.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Stat strip */}
        <AnimatedSection delay={200}>
          <div className="max-w-[1440px] mx-auto mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border overflow-hidden">
            {[
              { number: '5', label: 'Dienstverleningen' },
              { number: 'SUR', label: 'Gevestigd in Paramaribo' },
              { number: '∞', label: 'Langetermijnvisie' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface px-8 py-10">
                <p className="text-4xl font-bold font-mono text-gold">{stat.number}</p>
                <p className="mt-2 text-sm text-muted-foreground tracking-wide uppercase font-mono">
                  {stat.label}
                </p>
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
              label="WAARDEN"
              title="Waar wij voor staan"
              titleEn="Our values"
              description="Drie principes die elke beslissing en elk deliverable sturen."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {values.map((value, i) => (
              <AnimatedSection key={value.nl} delay={i * 80}>
                <div className="group h-full bg-surface border border-border p-8 flex flex-col gap-4 hover:border-gold transition-colors duration-200">
                  {/* Number */}
                  <span className="text-xs font-mono text-gold tracking-[0.2em]">
                    0{i + 1}
                  </span>
                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{value.nl}</h3>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5 tracking-widest uppercase">
                      {value.en}
                    </p>
                  </div>
                  {/* Divider */}
                  <div className="w-8 h-px bg-gold" />
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {value.description}
                  </p>
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
              <SectionHeading
                label="ONS TEAM"
                title="Specialisten. Geen generalisten."
                titleEn="The people behind Suritargets"
              />
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Ons team bestaat uit specialisten in business intelligence,
                softwareontwikkeling, juridisch onderzoek en educatie. Elk
                project wordt begeleid door de juiste expertise — niet door wie
                beschikbaar is.
              </p>
              <CtaButton href="/contact" variant="primary">
                Neem contact op
              </CtaButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
