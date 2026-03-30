'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { services } from '@/lib/services-data'

type Tab = 'business' | 'individual'

export default function ServicesClient() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>(
    searchParams.get('tab') === 'individual' ? 'individual' : 'business'
  )
  const t = useTranslations('services')
  const ts = useTranslations('servicesData')
  const tc = useTranslations('common')

  useEffect(() => {
    const v = searchParams.get('tab')
    if (v === 'individual' || v === 'business') setTab(v)
  }, [searchParams])

  const filtered = services.filter((s) => s.type === tab)

  return (
    <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
      <div className="max-w-[1440px] mx-auto">
        {/* Tab toggle */}
        <div className="flex items-center gap-0 border border-border rounded-sm overflow-hidden w-fit mb-10">
          <button
            onClick={() => setTab('business')}
            className={cn(
              'px-7 py-2.5 text-sm font-semibold tracking-wide transition-colors',
              tab === 'business'
                ? 'bg-[#2B3494] text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface'
            )}
          >
            {t('tabs.business')}
          </button>
          <button
            onClick={() => setTab('individual')}
            className={cn(
              'px-7 py-2.5 text-sm font-semibold tracking-wide transition-colors',
              tab === 'individual'
                ? 'bg-[#2B3494] text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-surface'
            )}
          >
            {t('tabs.individual')}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          {filtered.map((service, index) => {
            const label = String(index + 1).padStart(2, '0')
            return (
              <article
                key={service.slug}
                className="group flex flex-col h-full bg-surface border border-border hover:border-gold transition-colors duration-300 p-8 xl:p-10"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs font-mono tracking-[0.2em] uppercase text-gold">{label}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-1">
                  {ts(`${service.slug}.name`)}
                </h2>
                <p className="text-sm font-mono text-gold mb-4">{ts(`${service.slug}.nameEn`)}</p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {ts(`${service.slug}.shortDescription`)}
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {(ts.raw(`${service.slug}.deliverables`) as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-border">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-[var(--gold-hover)] transition-colors duration-200 group-hover:gap-3"
                  >
                    {tc('moreInformation')}
                    <span aria-hidden="true" className="transition-all duration-200">→</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
