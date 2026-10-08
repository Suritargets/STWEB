'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Plug, Unplug, ExternalLink, Database, BarChart3, Workflow, Mail, Globe, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SiteSettings, Integration } from '@/lib/settings'

const ICON_MAP: Record<string, LucideIcon> = {
  'database': Database,
  'bar-chart': BarChart3,
  'workflow': Workflow,
  'mail': Mail,
  'globe': Globe,
  'message-circle': MessageCircle,
  'plug': Plug,
}

const LOCALE_OPTIONS = [
  { value: 'nl', label: 'Nederlands' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'pt-BR', label: 'Português (BR)' },
  { value: 'fr', label: 'Français' },
]

export default function SettingsForm({
  initialSettings,
  initialIntegrations,
}: {
  initialSettings: SiteSettings
  initialIntegrations: Integration[]
}) {
  const router = useRouter()
  const [settings, setSettings] = useState(initialSettings)
  const [integrations, setIntegrations] = useState(initialIntegrations)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const [connectUrl, setConnectUrl] = useState('')
  const [showConnect, setShowConnect] = useState<string | null>(null)

  function updateField(key: keyof SiteSettings, value: string) {
    setSettings(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 3000)
    }
  }

  async function handleConnect(id: string) {
    setConnectingId(id)
    const res = await fetch('/api/admin/integrations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'connected', config_url: connectUrl || null }),
    })
    if (res.ok) {
      setIntegrations(prev =>
        prev.map(i => i.id === id ? { ...i, status: 'connected' as const, config_url: connectUrl || null } : i)
      )
      setShowConnect(null)
      setConnectUrl('')
      router.refresh()
    }
    setConnectingId(null)
  }

  async function handleDisconnect(id: string) {
    setConnectingId(id)
    const res = await fetch('/api/admin/integrations', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'disconnected' }),
    })
    if (res.ok) {
      setIntegrations(prev =>
        prev.map(i => i.id === id ? { ...i, status: 'disconnected' as const, config_url: null } : i)
      )
      router.refresh()
    }
    setConnectingId(null)
  }

  const inputClass = 'border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B3494]/20 focus:border-[#2B3494] transition-all bg-white w-full'

  return (
    <div>
      {/* Save bar */}
      <div className="flex items-center justify-end mb-6 gap-3">
        {saved && (
          <span className="text-xs text-emerald-600 font-medium">Opgeslagen!</span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#2B3494] text-white rounded-lg hover:bg-[#232b7a] disabled:opacity-50 transition-colors"
        >
          <Save size={14} />
          {saving ? 'Opslaan…' : 'Opslaan'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account */}
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

        {/* Site Instellingen — EDITABLE */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Site Instellingen</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Site naam</label>
              <input
                value={settings.site_name}
                onChange={e => updateField('site_name', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Bedrijfsnaam</label>
              <input
                value={settings.company_name}
                onChange={e => updateField('company_name', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Site URL</label>
              <input
                value={settings.site_url}
                onChange={e => updateField('site_url', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Contact e-mail</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={e => updateField('contact_email', e.target.value)}
                placeholder="info@suritargets.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Tagline</label>
              <input
                value={settings.tagline}
                onChange={e => updateField('tagline', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 mb-1 block">Default taal</label>
              <select
                value={settings.default_locale}
                onChange={e => updateField('default_locale', e.target.value)}
                className={inputClass}
              >
                {LOCALE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Database — info only */}
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

        {/* Integraties — connect/disconnect */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Integraties</h2>
          <div className="space-y-3">
            {integrations.map(integ => {
              const IconComp = ICON_MAP[integ.icon] ?? Plug
              return (
                <div key={integ.id} className="border border-zinc-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-zinc-50 flex items-center justify-center">
                        <IconComp size={16} className="text-zinc-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">{integ.name}</p>
                        <p className="text-[10px] text-zinc-400">{integ.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {integ.status === 'connected' ? (
                        <>
                          <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                            Connected
                          </span>
                          {integ.config_url && (
                            <a
                              href={integ.config_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-zinc-400 hover:text-zinc-600"
                              title="Open configuratie"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                          {integ.id !== 'neon' && (
                            <button
                              onClick={() => handleDisconnect(integ.id)}
                              disabled={connectingId === integ.id}
                              className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                              title="Ontkoppelen"
                            >
                              <Unplug size={12} />
                            </button>
                          )}
                        </>
                      ) : integ.status === 'removed' ? (
                        <span className="text-[10px] font-medium bg-zinc-100 text-zinc-400 px-2 py-0.5 rounded">
                          Verwijderd
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setShowConnect(showConnect === integ.id ? null : integ.id)
                            setConnectUrl('')
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium bg-[#2B3494] text-white rounded hover:bg-[#232b7a] transition-colors"
                        >
                          <Plug size={10} />
                          Koppelen
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Connect form */}
                  {showConnect === integ.id && (
                    <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center gap-2">
                      <input
                        type="url"
                        value={connectUrl}
                        onChange={e => setConnectUrl(e.target.value)}
                        placeholder="URL (optioneel, bijv. webhook URL)"
                        className="flex-1 border border-zinc-200 rounded-md px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B3494]/20 focus:border-[#2B3494] bg-white"
                      />
                      <button
                        onClick={() => handleConnect(integ.id)}
                        disabled={connectingId === integ.id}
                        className="px-3 py-1.5 text-xs bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                      >
                        {connectingId === integ.id ? 'Bezig…' : 'Verbinden'}
                      </button>
                      <button
                        onClick={() => setShowConnect(null)}
                        className="px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-600"
                      >
                        Annuleer
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
