import { getSettings, getIntegrations } from '@/lib/settings'
import { requireAdminUser } from '@/lib/auth'
import SettingsForm from '../../_components/settings-form'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  await requireAdminUser(['admin', 'super_admin'])
  const settings = await getSettings()
  const integrations = await getIntegrations()

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Instellingen</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Beheer je admin configuratie</p>
      </div>

      <SettingsForm initialSettings={settings} initialIntegrations={integrations} />
    </div>
  )
}
