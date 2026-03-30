'use client'
import type { DailyCount } from '@/lib/db'

export default function MiniChart({ data }: { data: DailyCount[] }) {
  if (data.length === 0) return null

  const W = 800
  const H = 140
  const PAD = { top: 10, right: 10, bottom: 30, left: 30 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom

  const maxVal = Math.max(...data.map(d => d.count), 1)
  const xStep = chartW / (data.length - 1 || 1)

  function xPos(i: number) { return PAD.left + i * xStep }
  function yPos(v: number) { return PAD.top + chartH - (v / maxVal) * chartH }

  // Build smooth path using cubic bezier
  const points = data.map((d, i) => ({ x: xPos(i), y: yPos(d.count) }))

  let linePath = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const cp1x = (points[i - 1].x + points[i].x) / 2
    const cp1y = points[i - 1].y
    const cp2x = (points[i - 1].x + points[i].x) / 2
    const cp2y = points[i].y
    linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`
  }

  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x} ${PAD.top + chartH}` +
    ` L ${points[0].x} ${PAD.top + chartH} Z`

  // Show every 2nd label to avoid crowding
  const labels = data.filter((_, i) => i % 2 === 0 || i === data.length - 1)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2B3494" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2B3494" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map(v => {
        const y = PAD.top + chartH - v * chartH
        return (
          <line key={v} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
            stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4 4" />
        )
      })}

      {/* Area fill */}
      <path d={areaPath} fill="url(#chartGrad)" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#2B3494" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#2B3494" />
      ))}

      {/* X-axis labels */}
      {labels.map((d, idx) => {
        const origIdx = data.findIndex(item => item === d)
        return (
          <text key={idx} x={xPos(origIdx)} y={H - 6}
            textAnchor="middle" fontSize="9" fill="#a1a1aa" fontFamily="var(--font-geist-mono)">
            {d.day}
          </text>
        )
      })}
    </svg>
  )
}
