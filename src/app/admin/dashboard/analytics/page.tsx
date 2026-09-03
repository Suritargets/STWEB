import {
  getRevenueOverview,
  getRevenueDailyCounts,
  getWebinarDailyCounts,
  getTopCourses,
  getTopReferralSources,
  getWebinarOverview,
} from '@/lib/analytics'
import StatsCard from '../../_components/stats-card'
import MiniChart from '../../_components/mini-chart'

export const dynamic = 'force-dynamic'

function fmtUsd(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

export default async function AnalyticsPage() {
  const [revenue, revenueDaily, webinarDaily, topCourses, topReferrals, webinar] = await Promise.all([
    getRevenueOverview(),
    getRevenueDailyCounts(14),
    getWebinarDailyCounts(14),
    getTopCourses(5),
    getTopReferralSources(5),
    getWebinarOverview(),
  ])

  return (
    <div className="p-8 max-w-[1400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Analytics</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Omzet, inschrijvingen en webinar-aanmeldingen</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Totale omzet"
          value={fmtUsd(revenue.totalRevenue)}
          trend={`${fmtUsd(revenue.thisMonthRevenue)} deze maand`}
          trendUp={revenue.thisMonthRevenue > 0}
          isText
        />
        <StatsCard
          title="Totaal orders"
          value={revenue.totalOrders}
          trend="Betaalde trainingen"
          trendUp={revenue.totalOrders > 0}
        />
        <StatsCard
          title="Gem. orderwaarde"
          value={fmtUsd(revenue.avgOrderValue)}
          trend="Per inschrijving"
          trendUp={revenue.avgOrderValue > 0}
          isText
        />
        <StatsCard
          title="Webinar-aanmeldingen"
          value={webinar.total}
          trend={`+${webinar.thisMonth} deze maand`}
          trendUp={webinar.thisMonth > 0}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-900">Omzet over tijd</h2>
          <p className="text-xs text-zinc-500 mt-0.5 mb-4">Laatste 14 dagen</p>
          {revenueDaily.some(d => d.count > 0) ? (
            <MiniChart data={revenueDaily} />
          ) : (
            <p className="text-sm text-zinc-400 py-8 text-center">Nog geen omzet in deze periode</p>
          )}
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-900">Webinar-aanmeldingen over tijd</h2>
          <p className="text-xs text-zinc-500 mt-0.5 mb-4">Laatste 14 dagen</p>
          {webinarDaily.some(d => d.count > 0) ? (
            <MiniChart data={webinarDaily} />
          ) : (
            <p className="text-sm text-zinc-400 py-8 text-center">Nog geen aanmeldingen in deze periode</p>
          )}
        </div>
      </div>

      {/* Top lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-semibold text-zinc-900">Top courses</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Op omzet</p>
          </div>
          {topCourses.length === 0 ? (
            <p className="text-sm text-zinc-400 py-8 text-center">Nog geen orders</p>
          ) : (
            <table className="w-full text-sm">
              <tbody className="divide-y divide-zinc-100">
                {topCourses.map(c => (
                  <tr key={c.courseName}>
                    <td className="px-6 py-3 text-zinc-900 font-medium">{c.courseName}</td>
                    <td className="px-6 py-3 text-zinc-500 text-xs whitespace-nowrap">{c.orders} order{c.orders === 1 ? '' : 's'}</td>
                    <td className="px-6 py-3 text-right font-semibold text-zinc-900 whitespace-nowrap">{fmtUsd(c.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-semibold text-zinc-900">Top referral-bronnen</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Webinar-aanmeldingen via ?ref=</p>
          </div>
          {topReferrals.length === 0 ? (
            <p className="text-sm text-zinc-400 py-8 text-center">Nog geen referral-data</p>
          ) : (
            <table className="w-full text-sm">
              <tbody className="divide-y divide-zinc-100">
                {topReferrals.map(r => (
                  <tr key={r.source}>
                    <td className="px-6 py-3 text-zinc-900 font-medium">{r.source}</td>
                    <td className="px-6 py-3 text-right font-semibold text-zinc-900 whitespace-nowrap">{r.count} aanmelding{r.count === 1 ? '' : 'en'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
