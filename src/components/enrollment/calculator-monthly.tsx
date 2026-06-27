'use client'

import { useState, useEffect } from 'react'
import type { CalcResult } from './calculator-flat'

type Props = {
  priceTeam: number
  monthlyPrice: number
  months: number
  onChange: (result: CalcResult) => void
}

function fmt(n: number) { return '$' + n.toLocaleString('en-US') }

export function CalculatorMonthly({ priceTeam, monthlyPrice, months, onChange }: Props) {
  const [count, setCount] = useState(5)

  useEffect(() => {
    const total = count * priceTeam
    onChange({
      deelnemers: count,
      totalUsd: total,
      calculatorData: { type: 'monthly', count, priceTeam, monthlyPrice, months },
    })
  }, [count, priceTeam, monthlyPrice, months, onChange])

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-white">
            Deelnemers <span className="text-white/50 text-xs">(min. 5)</span>
          </label>
          <span className="text-lg font-bold text-white">{count}</span>
        </div>
        <input
          type="range"
          min={5}
          max={50}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full accent-[#E63946]"
        />
      </div>
      <div className="bg-white/10 rounded-lg p-4 space-y-2">
        {Array.from({ length: months }, (_, i) => (
          <div key={i} className="flex justify-between text-sm text-white/70">
            <span>Maand {i + 1} — {count} × {fmt(monthlyPrice)}</span>
            <span>{fmt(count * monthlyPrice)}</span>
          </div>
        ))}
        <div className="border-t border-white/20 pt-2 flex justify-between">
          <span className="font-semibold text-white">Totaal ({months} mnd)</span>
          <span className="text-xl font-black text-white">{fmt(count * priceTeam)}</span>
        </div>
      </div>
    </div>
  )
}
