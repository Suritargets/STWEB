export const dynamic = 'force-dynamic'

type Check = boolean | 'partial'

const seoPages: { name: string; route: string; title: Check; description: Check; og: Check; structured: Check; hreflang: Check }[] = [
  { name: 'Homepage',                     route: '/',                                    title: true, description: true, og: true,  structured: false,     hreflang: true },
  { name: 'About',                        route: '/about',                               title: true, description: true, og: true,  structured: false,     hreflang: true },
  { name: 'Contact',                      route: '/contact',                             title: true, description: true, og: true,  structured: false,     hreflang: true },
  { name: 'Services hub',                 route: '/services',                            title: true, description: true, og: true,  structured: false,     hreflang: true },
  { name: 'Service detail (13)',          route: '/services/[slug]',                     title: true, description: true, og: true,  structured: false,     hreflang: true },
  { name: 'Pricing',                      route: '/pricing',                             title: true, description: true, og: true,  structured: false,     hreflang: true },
  { name: 'Portfolio',                    route: '/portfolio',                           title: true, description: true, og: true,  structured: false,     hreflang: true },
  { name: 'Case Studies hub',             route: '/case-studies',                        title: true, description: true, og: false, structured: false,     hreflang: true },
  { name: 'Case Study detail',            route: '/case-studies/[slug]',                 title: true, description: true, og: false, structured: false,     hreflang: true },
  { name: 'Insights hub',                 route: '/insights',                            title: true, description: true, og: false, structured: false,     hreflang: true },
  { name: 'Insight detail',               route: '/insights/[slug]',                     title: true, description: true, og: false, structured: false,     hreflang: true },
  { name: 'Education hub',                route: '/education',                           title: true, description: true, og: true,  structured: false,     hreflang: true },
  { name: 'Education courses (7)',         route: '/education/[slug]',                   title: true, description: true, og: true,  structured: false,     hreflang: true },
  { name: 'AI – Hands On Deck',           route: '/education/ai-hands-on-deck',          title: true, description: true, og: true,  structured: false,     hreflang: 'partial' },
  { name: 'Finance & Accounting',         route: '/education/finance-accounting-claude', title: true, description: true, og: true,  structured: false,     hreflang: 'partial' },
]

const recommendations = [
  { priority: 'P2', text: 'Voeg JSON-LD structured data toe aan service pagina\'s (LocalBusiness, Service)' },
  { priority: 'P2', text: 'Voeg JSON-LD toe aan education pagina\'s (Course, EducationalOrganization)' },
  { priority: 'P2', text: 'Voeg hreflang compleet toe aan ai-hands-on-deck en finance-accounting-claude (nu alleen nl/en)' },
  { priority: 'P3', text: 'Voeg OG images toe aan case-studies en insights detail pagina\'s' },
  { priority: 'P3', text: 'Voeg breadcrumb structured data toe aan alle diepte-pagina\'s' },
  { priority: 'P3', text: 'Voeg canonical URLs expliciet toe aan alle pagina\'s' },
  { priority: 'P3', text: 'Optimaliseer afbeelding alt-teksten in portfolio en education sections' },
]

function Cell({ val }: { val: Check }) {
  if (val === true)      return <span className="text-emerald-600 font-bold text-base">✓</span>
  if (val === 'partial') return <span className="text-amber-500 font-bold text-base">~</span>
  return <span className="text-zinc-300 font-bold text-base">✗</span>
}

const totalPages = seoPages.length
const ogScore = seoPages.filter(p => p.og === true).length
const structuredScore = seoPages.filter(p => p.structured === true).length
const hreflangScore = seoPages.filter(p => p.hreflang === true).length

export default function SeoPage() {
  return (
    <div className="p-8 max-w-350">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">SEO</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Overzicht van zoekmachineoptimalisatie per pagina</p>
      </div>

      {/* Site config */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-zinc-900 mb-4">Site configuratie</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-zinc-400 mb-1">Site URL</p>
            <p className="text-sm font-medium text-zinc-900">suritargets.com</p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 mb-1">Default locale</p>
            <p className="text-sm font-medium text-zinc-900">nl</p>
          </div>
          <div>
            <p className="text-xs text-zinc-400 mb-2">Talen</p>
            <div className="flex flex-wrap gap-1">
              {['nl', 'en', 'es', 'fr', 'pt-BR'].map(l => (
                <span key={l} className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded font-mono">{l}</span>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { ok: true,  label: 'robots.txt — geconfigureerd' },
              { ok: true,  label: 'sitemap.xml — auto-gegenereerd' },
              { ok: true,  label: 'OG Image — dynamisch' },
            ].map(({ ok, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={ok ? 'text-emerald-600' : 'text-red-500'}>
                  {ok ? '✓' : '✗'}
                </span>
                <p className="text-xs text-zinc-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-emerald-600">{ogScore}/{totalPages}</p>
          <p className="text-xs text-zinc-500 mt-1">OG Image</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-500">{structuredScore}/{totalPages}</p>
          <p className="text-xs text-zinc-500 mt-1">Structured Data</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-emerald-600">{hreflangScore}/{totalPages}</p>
          <p className="text-xs text-zinc-500 mt-1">Hreflang volledig</p>
        </div>
      </div>

      {/* Pages table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="text-base font-semibold text-zinc-900">SEO status per pagina</h2>
          <p className="text-xs text-zinc-400 mt-0.5">~ = gedeeltelijk (niet alle talen)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs">Pagina</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-500 text-xs">Route</th>
                <th className="text-center px-3 py-3 font-medium text-zinc-500 text-xs">Title</th>
                <th className="text-center px-3 py-3 font-medium text-zinc-500 text-xs">Desc</th>
                <th className="text-center px-3 py-3 font-medium text-zinc-500 text-xs">OG</th>
                <th className="text-center px-3 py-3 font-medium text-zinc-500 text-xs">JSON-LD</th>
                <th className="text-center px-3 py-3 font-medium text-zinc-500 text-xs">Hreflang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {seoPages.map((page) => (
                <tr key={page.route} className="hover:bg-zinc-50/50">
                  <td className="px-6 py-3 font-medium text-zinc-900 text-sm">{page.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-400">{page.route}</td>
                  <td className="text-center px-3 py-3"><Cell val={page.title} /></td>
                  <td className="text-center px-3 py-3"><Cell val={page.description} /></td>
                  <td className="text-center px-3 py-3"><Cell val={page.og} /></td>
                  <td className="text-center px-3 py-3"><Cell val={page.structured} /></td>
                  <td className="text-center px-3 py-3"><Cell val={page.hreflang} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-zinc-900 mb-4">Aanbevelingen</h2>
        <ul className="space-y-2.5">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                rec.priority === 'P2' ? 'bg-amber-50 text-amber-700' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {rec.priority}
              </span>
              <p className="text-sm text-zinc-700">{rec.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
