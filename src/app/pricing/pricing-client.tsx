'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CtaButton } from '@/components/shared/cta-button'

/* ─── Pricing tiers ─────────────────────────────────────────── */
const tiers = [
  {
    tier: 'Production',
    tagline: 'Creative & Assist Work / Support Services',
    rate: 15,
  },
  {
    tier: 'Technician',
    tagline: 'Technical Work / Onsite Services',
    rate: 35,
  },
  {
    tier: 'Consultant',
    tagline: 'Analysis Work / Advisory / Education',
    rate: 45,
    highlight: true,
  },
  {
    tier: 'Developer',
    tagline: 'Taylor Made',
    rate: 65,
  },
]

/* ─── Business services ──────────────────────────────────────── */
const businessServices: Array<{ name: string; description: string; rate: string; rateValue: number; items: string[]; comingSoon: boolean; startingFrom?: boolean }> = [
  {
    name: 'Dashboarding & Data Visualisatie',
    description: 'Op maat gemaakte dashboards en BI-platformen voor betere besluitvorming.',
    rate: 'Developer',
    rateValue: 65,
    items: ['Custom dashboard ontwikkeling', 'Real-time KPI-overzichten', 'ERP & systeem koppelingen'],
    comingSoon: false,
  },
  {
    name: 'Web & Applicaties',
    description: 'Van concept tot live platform — custom web- en business applicaties.',
    rate: 'Developer',
    rateValue: 65,
    items: ['Web applicaties & platforms', 'ERP-systemen op maat', 'Financiële applicaties'],
    comingSoon: false,
  },
  {
    name: 'Marketing met AI',
    description: 'Slimmere marketing met AI — content, campagnes en analyse.',
    rate: 'Consultant',
    rateValue: 45,
    items: ['AI contentcreatie & copywriting', 'Campagnestrategie', 'Doelgroepanalyse met AI'],
    comingSoon: false,
  },
  {
    name: 'Forensics & Integriteit',
    description: 'Digitaal forensisch onderzoek en compliance-audits voor organisaties.',
    rate: 'Expert',
    rateValue: 125,
    startingFrom: true,
    items: ['Forensisch onderzoek', 'Compliance-audit', 'Incident response'],
    comingSoon: false,
  },
  {
    name: 'Education (Teams)',
    description: 'Trainingen en workshops voor teams en organisaties.',
    rate: 'Consultant',
    rateValue: 45,
    items: ['AI & automatisering workshops', 'Vibe Coding trainingen', 'ERP implementatie begeleiding'],
    comingSoon: false,
  },
]

/* ─── Individual services ────────────────────────────────────── */
const individualServices: Array<{ name: string; description: string; rate: string; rateValue: number; items: string[]; comingSoon: boolean; startingFrom?: boolean }> = [
  {
    name: 'Forensics & Integrity',
    description: 'Persoonlijk forensisch advies en integriteitsonderzoek voor particulieren.',
    rate: 'Expert',
    rateValue: 65,
    startingFrom: true,
    items: ['Persoonlijk forensisch advies', 'Integriteitsreviews', 'Vertrouwelijke rapportage'],
    comingSoon: false,
  },
  {
    name: 'Education 1-op-1',
    description: 'Persoonlijke begeleiding in AI, tech en moderne vaardigheden.',
    rate: 'Consultant',
    rateValue: 45,
    items: ['AI praktijktraining', 'Trading met AI', 'Vibe Coding & applicatieontwikkeling'],
    comingSoon: false,
  },
  {
    name: 'Begeleiding in Innovation',
    description: 'Individuele coaching bij het ontwikkelen en lanceren van innovatieve ideeën.',
    rate: 'Consultant',
    rateValue: 45,
    items: ['Idee naar businesscase', 'Marktvalidatie', 'Launch begeleiding'],
    comingSoon: false,
  },
  {
    name: 'Begeleiding in Blockchain Tech',
    description: 'Praktische begeleiding bij blockchain technologie en Web3 toepassingen.',
    rate: 'Technician',
    rateValue: 35,
    items: ['Blockchain fundamentals', 'Web3 strategie', 'Smart contract basics'],
    comingSoon: false,
  },
  {
    name: 'Digital Trail / Resume Social',
    description: 'Opzet van uw digitale aanwezigheid — professioneel profiel en online spoor.',
    rate: 'Production',
    rateValue: 15,
    items: ['LinkedIn & social setup', 'Professioneel online profiel', 'Digitale portfolio opzet'],
    comingSoon: false,
  },
  {
    name: 'Fund Me Applicatie',
    description: 'Persoonlijke crowd-funding applicatie — volledig op maat gebouwd.',
    rate: 'Developer',
    rateValue: 65,
    items: ['Custom fund-me platform', 'Betalingsintegratie', 'Campagnebeheer dashboard'],
    comingSoon: true,
  },
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
  const [tab, setTab] = useState<Tab>('business')

  const services = tab === 'business' ? businessServices : individualServices

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#2B3494] pt-24 pb-0 px-[var(--section-padding-x)]">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-white/60 mb-4">
            Transparante tarieven
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Pricing
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-base leading-relaxed mb-10">
            Vaste uurtarieven per type dienstverlening. Geen verborgen kosten — u weet altijd waar u aan toe bent.
          </p>

          {/* Toggle */}
          <div className="inline-flex border border-white/20 rounded-sm overflow-hidden mb-0">
            <button
              onClick={() => setTab('business')}
              className={cn(
                'px-8 py-3 text-sm font-semibold tracking-wide transition-colors',
                tab === 'business'
                  ? 'bg-white text-[#2B3494]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              Voor Bedrijven
            </button>
            <button
              onClick={() => setTab('individual')}
              className={cn(
                'px-8 py-3 text-sm font-semibold tracking-wide transition-colors',
                tab === 'individual'
                  ? 'bg-white text-[#2B3494]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              Voor Individuen
            </button>
          </div>
        </div>
      </section>

      {/* Rate reference bar */}
      <section className="bg-[#1e2570] px-[var(--section-padding-x)] py-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap justify-center gap-6 md:gap-12">
          {tiers.map((t) => (
            <div key={t.tier} className="flex items-baseline gap-2">
              <span className="text-white/50 text-[10px] font-mono tracking-widest uppercase">{t.tier}</span>
              <span className="text-white font-black text-lg">USD {t.rate}</span>
              <span className="text-white/40 text-xs">/uur</span>
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
                key={s.name}
                className={cn(
                  'bg-white border border-border rounded-sm flex flex-col',
                  s.comingSoon && 'opacity-60'
                )}
              >
                <div className="px-8 pt-8 pb-6 border-b border-border">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-base font-black text-foreground uppercase tracking-tight leading-tight">
                      {s.name}
                    </h3>
                    {s.comingSoon && (
                      <span className="shrink-0 text-[9px] font-mono tracking-widest border border-muted-foreground/30 text-muted-foreground px-2 py-0.5 uppercase">
                        soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
                <div className="px-8 py-6 flex flex-col flex-1 gap-6">
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 shrink-0 w-4 h-4 flex items-center justify-center rounded-full text-[10px] font-bold bg-[#2B3494]/10 text-[#2B3494]">
                          ✓
                        </span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <span className={cn('text-[10px] font-mono tracking-widest uppercase', rateColor[s.rate])}>
                        {s.rate} rate
                      </span>
                      <p className="text-2xl font-black text-[#2B3494]">
                        {s.startingFrom && <span className="text-xs font-normal text-muted-foreground mr-1">vanaf</span>}
                        USD {s.rateValue}
                        <span className="text-xs font-normal text-muted-foreground ml-1">/uur</span>
                      </p>
                    </div>
                    {!s.comingSoon && (
                      <CtaButton href="/contact" variant="ghost" className="text-xs py-2 px-4">
                        Contact
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
              {tab === 'business'
                ? 'Groot project of langdurige samenwerking?'
                : 'Klaar om te starten?'}
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg">
              {tab === 'business'
                ? 'Voor trajecten van meerdere weken of vaste samenwerking maken wij graag een maatwerkofferte.'
                : 'Plan een gratis kennismakingsgesprek en ontdek wat wij voor u kunnen betekenen.'}
            </p>
          </div>
          <CtaButton href="/contact" variant="primary" className="shrink-0 text-xs py-2.5 px-6">
            {tab === 'business' ? 'Offerte aanvragen' : 'Gratis gesprek'}
          </CtaButton>
        </div>
      </section>
    </div>
  )
}
