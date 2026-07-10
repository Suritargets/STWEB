import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'
import { buildMetadata } from '@/lib/page-metadata'

const PROJECTS = [
  {
    key: 'vliet' as const,
    name: 'Vliet Accountants & Consultants',
    url: 'https://www.vlietaccountants.com/en',
    display: 'vlietaccountants.com',
    screenshot: '/portfolio/vliet-accountants.jpg',
    tags: ['Web Design', 'Development'],
  },
  {
    key: 'northresort' as const,
    name: 'North Resort',
    url: 'https://northresort.sr',
    display: 'northresort.sr',
    screenshot: '/portfolio/northresort.jpg',
    tags: ['Web Design', 'Development'],
  },
  {
    key: 'melkcentrale' as const,
    name: 'Melk Centrale',
    url: 'https://www.melk-centrale.sr',
    display: 'melk-centrale.sr',
    screenshot: '/portfolio/melk-centrale.jpg',
    tags: ['Web Design', 'Development'],
  },
  {
    key: 'edu' as const,
    name: 'Suritargets EDU',
    url: 'https://edu.suritargets.com',
    display: 'edu.suritargets.com',
    screenshot: '/portfolio/edu-suritargets.jpg',
    tags: ['Platform', 'E-learning'],
  },
  {
    key: 'logixlayer' as const,
    name: 'LogixLayer',
    url: 'https://logixlayer.com',
    display: 'logixlayer.com',
    screenshot: '/portfolio/logixlayer.jpg',
    tags: ['Web Design', 'Automation'],
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolio.meta' })
  return buildMetadata({ locale, path: 'portfolio', title: t('title'), description: t('description') })
}

function PortfolioContent() {
  const t = useTranslations('portfolio')

  return (
    <>
      {/* Hero */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
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

      {/* Projects grid */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <SectionHeading
              label={t('work.label')}
              title={t('work.title')}
              titleEn={t('work.titleEn')}
              className="mb-12"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <AnimatedSection key={project.url} delay={i * 40}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full bg-surface border border-border hover:border-gold transition-all duration-200 overflow-hidden relative"
                >
                  <span className="absolute left-0 top-0 bottom-0 w-0.75 bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-bottom" aria-hidden="true" />

                  <div className="overflow-hidden bg-border/30 aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.screenshot}
                      alt={`${t('screenshotAlt')} ${project.name}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-7">
                    <div className="flex gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono tracking-widest uppercase text-gold border border-gold/30 px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-foreground tracking-tight mb-2 group-hover:text-[#2B3494] transition-colors">
                      {project.name}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {t(`${project.key}.description`)}
                    </p>

                    <div className="mt-6 flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-gold">
                      <span>{project.display}</span>
                      <ExternalLink size={12} className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
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

export default function PortfolioPage() {
  return <PortfolioContent />
}
