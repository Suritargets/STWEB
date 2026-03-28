'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
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
    name: 'Education 1-op-1',
    description: 'U heeft een vraag of wil iets begrijpen — wij leggen het uit in uw eigen tempo, op uw niveau.',
    rate: 'Consultant',
    rateValue: 45,
    items: ['AI & Technologie', 'Trading met AI', 'Blockchain & Development'],
    comingSoon: false,
  },
  {
    name: 'Begeleiding in Innovation',
    description: 'U heeft een idee maar weet niet waar te beginnen — wij begeleiden u van concept tot eerste stap.',
    rate: 'Consultant',
    rateValue: 45,
    items: ['Uw idee uitwerken', 'Validatie & haalbaarheid', 'Eerste stappen bepalen'],
    comingSoon: false,
  },
  {
    name: 'Begeleiding in Blockchain',
    description: 'Wil u begrijpen hoe blockchain werkt en wat het voor u kan betekenen? Wij leggen het praktisch uit.',
    rate: 'Technician',
    rateValue: 35,
    items: ['Blockchain basics begrijpen', 'Crypto & Web3 praktisch', 'Uw eigen use case verkennen'],
    comingSoon: false,
  },
  {
    name: 'Digital Trail / Resume Social',
    description: 'Uw professionele aanwezigheid online opbouwen — zodat u gevonden wordt door de juiste mensen.',
    rate: 'Production',
    rateValue: 15,
    items: ['LinkedIn profiel optimaliseren', 'Digitale portfolio opzet', 'Online reputatie opbouwen'],
    comingSoon: false,
  },
  {
    name: 'Forensics & Integriteit',
    description: 'Heeft u een persoonlijke situatie waarbij discretie en onderzoek nodig zijn? Wij helpen vertrouwelijk.',
    rate: 'Expert',
    rateValue: 65,
    startingFrom: true,
    items: ['Persoonlijk forensisch advies', 'Vertrouwelijk onderzoek', 'Discrete rapportage'],
    comingSoon: false,
  },
  {
    name: 'Fund Me Applicatie',
    description: 'Een persoonlijke crowdfunding-pagina voor uw project, droom of initiatief — volledig op maat.',
    rate: 'Developer',
    rateValue: 65,
    items: ['Persoonlijke fund-me pagina', 'Betalingen & donaties', 'Campagne dashboard'],
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
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>(
    searchParams.get('tab') === 'individual' ? 'individual' : 'business'
  )

  useEffect(() => {
    const t = searchParams.get('tab')
    if (t === 'individual' || t === 'business') setTab(t)
  }, [searchParams])

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
