import { getSubmissions, getStats, getDailyCounts } from '@/lib/db'
import StatsCard from '../_components/stats-card'
import MiniChart from '../_components/mini-chart'
import SubmissionsTable from '../_components/submissions-table'

const SERVICE_LABELS: Record<string, string> = {
  'dashboarding':    'Dashboarding',
  'web-applicaties': 'Web & Apps',
  'marketing-ai':    'Marketing AI',
  'forensics':       'Forensics',
  'education':       'Education',
  'anders':          'Anders',
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const [submissions, stats, daily] = await Promise.all([
    getSubmissions().catch(() => []),
    getStats().catch(() => ({ total: 0, thisMonth: 0, uniqueCompanies: 0, topService: null })),
    getDailyCounts(14).catch(() => []),
  ])

  const lastMonthTotal = stats.total - stats.thisMonth

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Overzicht van alle aanvragen en activiteit</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Totaal Aanvragen"
          value={stats.total}
          trend={lastMonthTotal > 0 ? `+${stats.thisMonth} deze maand` : 'Nog geen aanvragen'}
          trendUp={stats.thisMonth > 0}
        />
        <StatsCard
          title="Deze Maand"
          value={stats.thisMonth}
          trend="Lopende periode"
          trendUp={stats.thisMonth > 0}
        />
        <StatsCard
          title="Unieke Bedrijven"
          value={stats.uniqueCompanies}
          trend={`van ${stats.total} aanvragen`}
          trendUp
        />
        <StatsCard
          title="Top Dienst"
          value={stats.topService ? (SERVICE_LABELS[stats.topService] ?? stats.topService) : '—'}
          trend="Meest aangevraagd"
          trendUp={!!stats.topService}
          isText
        />
      </div>

      {/* Chart */}
      {daily.length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">Aanvragen over tijd</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Laatste 14 dagen</p>
            </div>
          </div>
          <MiniChart data={daily} />
        </div>
      )}

      {/* Submissions table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">Incoming Requests</h2>
            <p className="text-xs text-zinc-500 mt-0.5">{submissions.length} aanvra{submissions.length === 1 ? 'ag' : 'gen'} totaal</p>
          </div>
        </div>
        <SubmissionsTable submissions={submissions} />
      </div>
    </div>
  )
}
