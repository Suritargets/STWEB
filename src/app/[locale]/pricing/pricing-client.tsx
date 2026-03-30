'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { CtaButton } from '@/components/shared/cta-button'

const tiers = [
  { tier: 'Production', tagline: 'Creative & Assist Work / Support Services', rate: 15 },
  { tier: 'Technician', tagline: 'Technical Work / Onsite Services', rate: 35 },
  { tier: 'Consultant', tagline: 'Analysis Work / Advisory / Education', rate: 45, highlight: true },
  { tier: 'Developer', tagline: 'Taylor Made', rate: 65 },
]

const businessServices = [
  { name: 'Dashboarding & Data Visualisatie', slug: 'dashboarding', rate: 'Developer', rateValue: 65, comingSoon: false },
  { name: 'Web & Applicaties', slug: 'web-applications', rate: 'Developer', rateValue: 65, comingSoon: false },
  { name: 'Marketing met AI', slug: 'marketing-ai', rate: 'Consultant', rateValue: 45, comingSoon: false },
  { name: 'Forensics & Integriteit', slug: 'forensics', rate: 'Expert', rateValue: 130, startingFrom: true, comingSoon: false },
  { name: 'Education (Teams)', slug: 'education', rate: 'Consultant', rateValue: 45, comingSoon: false },
]

const individualServices = [
  { name: 'Education 1-op-1', slug: 'education-1op1', rate: 'Consultant', rateValue: 45, comingSoon: false },
  { name: 'Begeleiding in Innovation', slug: 'begeleiding-innovation', rate: 'Consultant', rateValue: 45, comingSoon: false },
  { name: 'Begeleiding in Blockchain', slug: 'begeleiding-blockchain', rate: 'Technician', rateValue: 35, comingSoon: false },
  { name: 'Digital Trail / Resume Social', slug: 'digital-trail', rate: 'Production', rateValue: 15, comingSoon: false },
  { name: 'Forensics & Integriteit', slug: 'forensics-personal', rate: 'Expert', rateValue: 65, startingFrom: true, comingSoon: false },
  { name: 'Fund Me Applicatie', slug: 'fund-me', rate: 'Developer', rateValue: 65, comingSoon: true },
]

const rateColor: Record<string, string> = {
  Production: 'text-[#2B3494]/60',
  Technician: 'text-[#2B3494]/80',
  Consultant: 'text-[#2B3494]',
  Developer: 'text-[#E8192C]',
  Expert: 'text-[#E8192C]',
}

type Tab = 'business' | 'individual'

export default function PricingClient() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>(
    searchParams.get('tab') === 'individual' ? 'individual' : 'business'
  )
  const t = useTranslations('pricing')
  const ts = useTranslations('servicesData')

  useEffect(() => {
    const v = searchParams.get('tab')
    if (v === 'individual' || v === 'business') setTab(v)
  }, [searchParams])

  const services = tab === 'business' ? businessServices : individualServices

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#2B3494] pt-24 pb-0 px-[var(--section-padding-x)]">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-white/60 mb-4">{t('hero.label')}</p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">{t('hero.title')}</h1>
          <p className="text-white/70 max-w-xl mx-auto text-base leading-relaxed mb-10">{t('hero.subtitle')}</p>
          <div className="inline-flex border border-white/20 rounded-sm overflow-hidden mb-0">
            <button
              onClick={() => setTab('business')}
              className={cn('px-8 py-3 text-sm font-semibold tracking-wide transition-colors',
                tab === 'business' ? 'bg-white text-[#2B3494]' : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {t('tabs.business')}
            </button>
            <button
              onClick={() => setTab('individual')}
              className={cn('px-8 py-3 text-sm font-semibold tracking-wide transition-colors',
                tab === 'individual' ? 'bg-white text-[#2B3494]' : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {t('tabs.individual')}
            </button>
          </div>
        </div>
      </section>

      {/* Rate reference bar */}
      <section className="bg-[#1e2570] px-[var(--section-padding-x)] py-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap justify-center gap-6 md:gap-12">
          {tiers.map((tier) => (
            <div key={tier.tier} className="flex items-baseline gap-2">
              <span className="text-white/50 text-[10px] font-mono tracking-widest uppercase">{tier.tier}</span>
              <span className="text-white font-black text-lg">USD {tier.rate}</span>
              <span className="text-white/40 text-xs">{t('perHour')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-[var(--section-padding-x)] bg-surface">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.slug}
                className={cn('bg-white border border-border rounded-sm flex flex-col', s.comingSoon && 'opacity-60')}
              >
                <div className="px-8 pt-8 pb-6 border-b border-border">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-base font-black text-foreground uppercase tracking-tight leading-tight">
                      {s.slug === 'fund-me' ? s.name : ts(`${s.slug}.name`)}
                    </h3>
                    {s.comingSoon && (
                      <span className="shrink-0 text-[9px] font-mono tracking-widest border border-muted-foreground/30 text-muted-foreground px-2 py-0.5 uppercase">
                        {t('soon')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.slug === 'fund-me' ? 'Een persoonlijke crowdfunding-pagina voor uw project, droom of initiatief.' : ts(`${s.slug}.shortDescription`)}
                  </p>
                </div>
                <div className="px-8 py-6 flex flex-col flex-1 gap-6">
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {s.slug !== 'fund-me' && (ts.raw(`${s.slug}.deliverables`) as string[]).slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 shrink-0 w-4 h-4 flex items-center justify-center rounded-full text-[10px] font-bold bg-[#2B3494]/10 text-[#2B3494]">✓</span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <span className={cn('text-[10px] font-mono tracking-widest uppercase', rateColor[s.rate])}>
                        {s.rate} {t('rateLabel')}
                      </span>
                      <p className="text-2xl font-black text-[#2B3494]">
                        {'startingFrom' in s && s.startingFrom && (
                          <span className="text-xs font-normal text-muted-foreground mr-1">{t('from')}</span>
                        )}
                        USD {s.rateValue}
                        <span className="text-xs font-normal text-muted-foreground ml-1">{t('perHour')}</span>
                      </p>
                    </div>
                    {!s.comingSoon && (
                      <CtaButton href="/contact" variant="ghost" className="text-xs py-2 px-4">
                        {t('contactButton')}
                      </CtaButton>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-[var(--section-padding-x)] border-t border-border">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {tab === 'business' ? t('cta.businessTitle') : t('cta.individualTitle')}
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg">
              {tab === 'business' ? t('cta.businessBody') : t('cta.individualBody')}
            </p>
          </div>
          <CtaButton href="/contact" variant="primary" className="shrink-0 text-xs py-2.5 px-6">
            {tab === 'business' ? t('cta.businessButton') : t('cta.individualButton')}
          </CtaButton>
        </div>
      </section>
    </div>
  )
}
