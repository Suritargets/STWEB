export const dynamic = 'force-dynamic'

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Instellingen</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Beheer je admin configuratie</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Account */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Account</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-zinc-500">Admin e-mail</p>
              <p className="text-sm font-medium text-zinc-900 font-mono">adm***@***.com</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Laatste login</p>
              <p className="text-sm font-medium text-zinc-900">Vandaag</p>
            </div>
            <div className="pt-2 border-t border-zinc-100">
              <p className="text-xs text-zinc-400">
                Wijzig je wachtwoord via Vercel Environment Variables
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Site Instellingen */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Site Instellingen</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-zinc-500">Site naam</p>
              <p className="text-sm font-medium text-zinc-900">Suritargets</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Site URL</p>
              <p className="text-sm font-medium text-zinc-900">suritargets.com</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Default taal</p>
              <p className="text-sm font-medium text-zinc-900">Nederlands</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Beschikbare talen</p>
              <div className="flex gap-1 mt-1">
                {['nl', 'en', 'es', 'pt-BR', 'fr'].map((l) => (
                  <span key={l} className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded font-mono">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Database */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Database</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-zinc-500">Provider</p>
              <p className="text-sm font-medium text-zinc-900">Neon Postgres</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Status</p>
              <span className="inline-block text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                Connected
              </span>
            </div>
            <div className="pt-2 border-t border-zinc-100">
              <p className="text-xs text-zinc-400">
                Database wordt automatisch beheerd via Vercel
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Integraties */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Integraties</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-900">Neon Postgres</p>
              <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                Connected &#10003;
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-900">Airtable</p>
              <span className="text-xs font-medium bg-zinc-100 text-zinc-400 px-2 py-1 rounded">
                Verwijderd
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-900">n8n</p>
              <span className="text-xs font-medium bg-zinc-100 text-zinc-400 px-2 py-1 rounded">
                Niet gekoppeld
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-900">Vercel Analytics</p>
              <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                Actief &#10003;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
