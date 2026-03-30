export const dynamic = 'force-dynamic'

const seoPages = [
  { name: 'Homepage',       title: true, description: true, og: true, structured: false, hreflang: true },
  { name: 'Services',       title: true, description: true, og: true, structured: false, hreflang: true },
  { name: 'Pricing',        title: true, description: true, og: true, structured: false, hreflang: true },
  { name: 'Contact',        title: true, description: true, og: true, structured: false, hreflang: true },
  { name: 'About',          title: true, description: true, og: true, structured: false, hreflang: true },
  { name: 'Case Studies',   title: true, description: true, og: false, structured: false, hreflang: true },
  { name: 'Insights',       title: true, description: true, og: false, structured: false, hreflang: true },
  { name: 'Service Detail', title: true, description: true, og: true, structured: false, hreflang: true },
]

const recommendations = [
  'Voeg structured data (JSON-LD) toe aan service pagina\'s',
  'Voeg canonical URLs toe',
  'Optimaliseer afbeelding alt-teksten',
  'Voeg breadcrumb structured data toe',
]

function Check() {
  return <span className="text-emerald-600 font-bold">&#10003;</span>
}

function Cross() {
  return <span className="text-red-500 font-bold">&#10005;</span>
}

export default function SeoPage() {
  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">SEO</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Overzicht van zoekmachineoptimalisatie</p>
      </div>

      {/* Section 1: Site Configuration */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">Site Configuration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-zinc-500">Site URL</p>
            <p className="text-sm font-medium text-zinc-900">suritargets.com</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Default locale</p>
            <p className="text-sm font-medium text-zinc-900">nl</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Supported locales</p>
            <div className="flex gap-1 mt-1">
              {['nl', 'en', 'es', 'pt-BR', 'fr'].map((l) => (
                <span key={l} className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded font-mono">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">&#10003;</span>
              <p className="text-sm text-zinc-900">robots.txt &mdash; Configured</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">&#10003;</span>
              <p className="text-sm text-zinc-900">sitemap.xml &mdash; Auto-generated</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">&#10003;</span>
              <p className="text-sm text-zinc-900">OG Image &mdash; Dynamic generation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Pagina SEO Status */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-900">Pagina SEO Status</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Status per pagina</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="text-left px-6 py-3 font-medium text-zinc-500">Pagina</th>
                <th className="text-center px-4 py-3 font-medium text-zinc-500">Title</th>
                <th className="text-center px-4 py-3 font-medium text-zinc-500">Description</th>
                <th className="text-center px-4 py-3 font-medium text-zinc-500">OG Image</th>
                <th className="text-center px-4 py-3 font-medium text-zinc-500">Structured Data</th>
                <th className="text-center px-4 py-3 font-medium text-zinc-500">Hreflang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {seoPages.map((page) => (
                <tr key={page.name}>
                  <td className="px-6 py-3 font-medium text-zinc-900">{page.name}</td>
                  <td className="text-center px-4 py-3">{page.title ? <Check /> : <Cross />}</td>
                  <td className="text-center px-4 py-3">{page.description ? <Check /> : <Cross />}</td>
                  <td className="text-center px-4 py-3">{page.og ? <Check /> : <Cross />}</td>
                  <td className="text-center px-4 py-3">{page.structured ? <Check /> : <Cross />}</td>
                  <td className="text-center px-4 py-3">{page.hreflang ? <Check /> : <Cross />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Aanbevelingen */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">Aanbevelingen</h2>
        <ul className="space-y-3">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-amber-500 mt-0.5 shrink-0">&#9679;</span>
              <p className="text-sm text-zinc-700">{rec}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
