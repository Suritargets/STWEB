import { getSubmissions } from '@/lib/db'
import SubmissionsTable from '../../_components/submissions-table'

export const dynamic = 'force-dynamic'

export default async function RequestsPage() {
  const submissions = await getSubmissions().catch(() => [])

  return (
    <div className="p-8 max-w-[1400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Incoming Requests</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          {submissions.length === 0
            ? 'Nog geen aanvragen ontvangen'
            : `${submissions.length} aanvra${submissions.length === 1 ? 'ag' : 'gen'} totaal`}
        </p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <SubmissionsTable submissions={submissions} />
      </div>
    </div>
  )
}
