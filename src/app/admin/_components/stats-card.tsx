type Props = {
  title: string
  value: number | string
  trend: string
  trendUp?: boolean
  isText?: boolean
}

export default function StatsCard({ title, value, trend, trendUp = false, isText = false }: Props) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl px-5 py-4">
      <p className="text-xs font-medium text-zinc-500 mb-1">{title}</p>
      <p className={`font-bold text-zinc-900 mb-2 ${isText ? 'text-lg' : 'text-2xl'}`}>{value}</p>
      <p className={`text-xs flex items-center gap-1 ${trendUp ? 'text-emerald-600' : 'text-zinc-400'}`}>
        {trendUp ? '↑' : '→'} {trend}
      </p>
    </div>
  )
}
