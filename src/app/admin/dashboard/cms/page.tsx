export const dynamic = 'force-dynamic'

const locales = ['nl', 'en', 'es', 'pt-BR', 'fr']

type PageStatus = 'live' | 'stub' | 'coming-soon'

const pages: {
  name: string
  route: string
  source: string
  status: PageStatus
  locales: string[]
  note?: string
}[] = [
  { name: 'Homepage',                   route: '/',                                         source: 'next-intl JSON', status: 'live',         locales },
  { name: 'About',                      route: '/about',                                    source: 'next-intl JSON', status: 'live',         locales },
  { name: 'Contact',                    route: '/contact',                                  source: 'next-intl JSON', status: 'live',         locales },
  { name: 'Services hub',               route: '/services',                                 source: 'next-intl JSON', status: 'live',         locales },
  { name: 'Service detail (13 routes)', route: '/services/[slug]',                          source: 'next-intl JSON', status: 'live',         locales },
  { name: 'Pricing',                    route: '/pricing',                                  source: 'next-intl JSON', status: 'live',         locales },
  { name: 'Portfolio',                  route: '/portfolio',                                source: 'next-intl JSON', status: 'live',         locales },
  { name: 'Case Studies hub',           route: '/case-studies',                             source: 'MDX',            status: 'coming-soon',  locales: ['nl', 'en'], note: 'MDX files not yet created' },
  { name: 'Case Study detail',          route: '/case-studies/[slug]',                      source: 'MDX',            status: 'coming-soon',  locales: ['nl', 'en'], note: 'Waiting for CMS or MDX files' },
  { name: 'Insights hub',               route: '/insights',                                 source: 'MDX',            status: 'coming-soon',  locales: ['nl', 'en'], note: 'MDX files not yet created' },
  { name: 'Insight detail',             route: '/insights/[slug]',                          source: 'MDX',            status: 'coming-soon',  locales: ['nl', 'en'], note: 'Waiting for CMS or MDX files' },
  { name: 'Education hub',              route: '/education',                                source: 'next-intl JSON', status: 'live',         locales },
  { name: 'Education courses (7)',      route: '/education/[slug]',                         source: 'next-intl JSON', status: 'live',         locales },
  { name: 'AI – Hands On Deck',         route: '/education/ai-hands-on-deck',               source: 'Hard-coded',     status: 'live',         locales: ['nl', 'en'], note: 'es/fr/pt-BR still see English' },
  { name: 'Finance & Accounting',       route: '/education/finance-accounting-claude',      source: 'Hard-coded',     status: 'live',         locales: ['nl', 'en'], note: 'es/fr/pt-BR still see English' },
]

const STATUS: Record<PageStatus, { label: string; cls: string }> = {
  live:         { label: 'Live',         cls: 'bg-emerald-50 text-emerald-700' },
  stub:         { label: 'Stub',         cls: 'bg-amber-50 text-amber-700' },
  'coming-soon':{ label: 'Coming Soon',  cls: 'bg-zinc-100 text-zinc-500' },
}

const livePct = Math.round(pages.filter(p => p.status === 'live').length / pages.length * 100)

export default function CmsPage() {
  return (
    <div className="p-8 max-w-350">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">CMS</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Overzicht van alle pagina&apos;s en hun contentstatus</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-zinc-200 rounded-xl p-5">
          <p className="text-3xl font-bold text-zinc-900">{pages.filter(p => p.status === 'live').length}</p>
          <p className="text-sm text-zinc-500 mt-1">Live pagina&apos;s</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-5">
          <p className="text-3xl font-bold text-amber-600">{pages.filter(p => p.status === 'coming-soon').length}</p>
          <p className="text-sm text-zinc-500 mt-1">Nog te bouwen</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-5">
          <p className="text-3xl font-bold text-[#2B3494]">{livePct}%</p>
          <p className="text-sm text-zinc-500 mt-1">Compleet</p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#2B3494]/5 border border-[#2B3494]/20 rounded-xl p-4 mb-6">
        <p className="text-sm text-[#2B3494]">
          <strong>Content beheer:</strong> De meeste pagina&apos;s worden beheerd via de vertaalbestanden in{' '}
          <code className="bg-[#2B3494]/10 px-1 rounded">/messages/*.json</code>.
          Case studies en insights wachten nog op MDX-bestanden of een database-gedreven CMS.
        </p>
      </div>

      {/* Pages table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="text-base font-semibold text-zinc-900">Pagina-inventaris</h2>
          <p className="text-xs text-zinc-400 mt-0.5">{pages.length} routes in totaal</p>
        </div>
        <div className="divide-y divide-zinc-100">
          {pages.map((page) => (
            <div key={page.route} className="px-6 py-3.5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900">{page.name}</p>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">{page.route}</p>
                {page.note && <p className="text-xs text-amber-600 mt-0.5">⚠ {page.note}</p>}
              </div>
              <div className="flex gap-1 shrink-0">
                {page.locales.map((locale) => (
                  <span key={locale} className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded font-mono">
                    {locale}
                  </span>
                ))}
              </div>
              <span className="text-xs text-zinc-500 bg-zinc-50 px-2 py-1 rounded font-mono shrink-0">
                {page.source}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded shrink-0 ${STATUS[page.status].cls}`}>
                {STATUS[page.status].label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div className="mt-6 bg-white border border-zinc-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-zinc-900 mb-4">Volgende stappen</h2>
        <ul className="space-y-2">
          {[
            'Vertaal ai-hands-on-deck en finance-accounting-claude naar es / fr / pt-BR',
            'Maak MDX-bestanden voor case studies (of voeg case_studies tabel toe aan DB)',
            'Maak MDX-bestanden voor insights (of voeg insights tabel toe aan DB)',
            'Voeg Q4 2026 edition toe aan AI Hands On Deck (kwartaalupdate)',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
              <span className="text-[#2B3494] font-bold shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
