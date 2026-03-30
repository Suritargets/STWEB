export const dynamic = 'force-dynamic'

const locales = ['nl', 'en', 'es', 'pt-BR', 'fr']

const pages = [
  { name: 'Homepage', route: '/', source: 'next-intl JSON', status: 'live' as const, locales: locales },
  { name: 'Services', route: '/services', source: 'next-intl JSON', status: 'live' as const, locales: locales },
  { name: 'Dashboarding', route: '/services/dashboarding', source: 'Component', status: 'live' as const, locales: locales },
  { name: 'Web Applicaties', route: '/services/web-applicaties', source: 'Component', status: 'live' as const, locales: locales },
  { name: 'Marketing AI', route: '/services/marketing-ai', source: 'Component', status: 'live' as const, locales: locales },
  { name: 'Forensics', route: '/services/forensics', source: 'Component', status: 'live' as const, locales: locales },
  { name: 'Education', route: '/services/education', source: 'Component', status: 'live' as const, locales: locales },
  { name: 'Pricing', route: '/pricing', source: 'next-intl JSON', status: 'live' as const, locales: locales },
  { name: 'Contact', route: '/contact', source: 'next-intl JSON', status: 'live' as const, locales: locales },
  { name: 'About', route: '/about', source: 'next-intl JSON', status: 'live' as const, locales: locales },
  { name: 'Case Studies', route: '/case-studies', source: 'MDX', status: 'coming-soon' as const, locales: ['nl', 'en'] },
  { name: 'Insights', route: '/insights', source: 'MDX', status: 'coming-soon' as const, locales: ['nl', 'en'] },
]

export default function CmsPage() {
  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">CMS</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Beheer de content van je website</p>
      </div>

      {/* Info note */}
      <div className="bg-[#2B3494]/5 border border-[#2B3494]/20 rounded-xl p-4 mb-8">
        <p className="text-sm text-[#2B3494]">
          Content wordt beheerd via vertaalbestanden (JSON) en MDX bestanden in de codebase.
        </p>
      </div>

      {/* Pages list */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">Pagina&apos;s</h2>
          <p className="text-sm text-zinc-500 mt-0.5">{pages.length} pagina&apos;s in totaal</p>
        </div>

        <div className="divide-y divide-zinc-100">
          {pages.map((page) => (
            <div key={page.route} className="px-6 py-4 flex items-center gap-4">
              {/* Page info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900">{page.name}</p>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">{page.route}</p>
              </div>

              {/* Locales */}
              <div className="flex gap-1 shrink-0">
                {page.locales.map((locale) => (
                  <span
                    key={locale}
                    className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded font-mono"
                  >
                    {locale}
                  </span>
                ))}
              </div>

              {/* Source */}
              <span className="text-xs text-zinc-500 bg-zinc-50 px-2 py-1 rounded shrink-0">
                {page.source}
              </span>

              {/* Status */}
              {page.status === 'live' ? (
                <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded shrink-0">
                  Live
                </span>
              ) : (
                <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-1 rounded shrink-0">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
