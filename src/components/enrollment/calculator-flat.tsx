'use client'

import { useState, useEffect } from 'react'

export type CalcResult = {
  deelnemers: number
  uren?: number
  totalUsd: number
  calculatorData: Record<string, unknown>
}

type Props = {
  enrollmentType: 'individual' | 'team'
  priceIndividual: number
  priceTeam: number
  noMinIndividual?: boolean
  onChange: (result: CalcResult) => void
}

function fmt(n: number) { return '$' + n.toLocaleString('en-US') }

export function CalculatorFlat({ enrollmentType, priceIndividual, priceTeam, noMinIndividual, onChange }: Props) {
  const isTeam = enrollmentType === 'team'
  const min = isTeam ? 5 : (noMinIndividual ? 1 : 1)
  const price = isTeam ? priceTeam : priceIndividual

  const [count, setCount] = useState(min)

  useEffect(() => {
    setCount(min)
  }, [min])

  useEffect(() => {
    onChange({
      deelnemers: count,
      totalUsd: count * price,
      calculatorData: { type: 'flat', enrollmentType, count, price },
    })
  }, [count, price, enrollmentType, onChange])

  const total = count * price

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-white">
            Deelnemers {isTeam && <span className="text-white/50 text-xs">(min. 5)</span>}
          </label>
          <span className="text-lg font-bold text-white">{count}</span>
        </div>
        <input
          type="range"
          min={min}
          max={50}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full accent-[#E63946]"
        />
      </div>
      <div className="bg-white/10 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm text-white/70">
          <span>{count} × {fmt(price)}</span>
          <span>{fmt(total)}</span>
        </div>
        <div className="border-t border-white/20 pt-2 flex justify-between">
          <span className="font-semibold text-white">Totaal</span>
          <span className="text-xl font-black text-white">{fmt(total)}</span>
        </div>
      </div>
    </div>
  )
}
