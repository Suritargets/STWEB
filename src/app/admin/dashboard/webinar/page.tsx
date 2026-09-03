import { getWebinarRegistrations } from '@/lib/webinar-registrations'
import WebinarRegistrationsTable from '../../_components/webinar-registrations-table'

export const dynamic = 'force-dynamic'

export default async function WebinarPage() {
  const registrations = await getWebinarRegistrations().catch(() => [])

  return (
    <div className="p-8 max-w-[1400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Webinar aanmeldingen</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          {registrations.length === 0
            ? 'Nog geen aanmeldingen ontvangen'
            : `${registrations.length} aanmelding${registrations.length === 1 ? '' : 'en'} totaal`}
        </p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <WebinarRegistrationsTable registrations={registrations} />
      </div>
    </div>
  )
}
