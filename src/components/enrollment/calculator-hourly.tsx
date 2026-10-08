'use client'

import { useState, useEffect } from 'react'
import type { CalcResult } from './calculator-flat'

const RATE = 45
const FOUNDATION = 14

type Props = {
  onChange: (result: CalcResult) => void
}

function fmt(n: number) { return '$' + n.toLocaleString('en-US') }

export function CalculatorHourly({ onChange }: Props) {
  const [count, setCount] = useState(5)
  const [trainingSessions, setTrainingSessions] = useState(5)  // × 2u each
  const [buildSessions, setBuildSessions]       = useState(2)  // × 2u each

  const trainingHours = trainingSessions * 2
  const buildHours    = buildSessions * 2
  const totalHours    = FOUNDATION + trainingHours + buildHours
  const totalUsd      = count * totalHours * RATE

  useEffect(() => {
    onChange({
      deelnemers: count,
      uren: totalHours,
      totalUsd,
      calculatorData: { type: 'hourly', count, foundation: FOUNDATION, trainingHours, buildHours, totalHours, rate: RATE },
    })
  }, [count, totalHours, totalUsd, trainingHours, buildHours, onChange])

  return (
    <div className="space-y-5">
      {/* Participants */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-white">Deelnemers <span className="text-white/50 text-xs">(min. 5)</span></label>
          <span className="font-bold text-white">{count}</span>
        </div>
        <input type="range" min={5} max={50} value={count} onChange={e => setCount(Number(e.target.value))} className="w-full accent-[#E63946]" />
      </div>

      {/* Training sessions */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-white">Training sessies <span className="text-white/50 text-xs">(× 2u)</span></label>
          <span className="font-bold text-white">{trainingSessions} sessies = {trainingHours}u</span>
        </div>
        <input type="range" min={1} max={20} value={trainingSessions} onChange={e => setTrainingSessions(Number(e.target.value))} className="w-full accent-[#E63946]" />
      </div>

      {/* Build sessions */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-white">Build / tools <span className="text-white/50 text-xs">(× 2u)</span></label>
          <span className="font-bold text-white">{buildSessions} sessies = {buildHours}u</span>
        </div>
        <input type="range" min={1} max={15} value={buildSessions} onChange={e => setBuildSessions(Number(e.target.value))} className="w-full accent-[#E63946]" />
      </div>

      {/* Breakdown */}
      <div className="bg-white/10 rounded-lg p-4 space-y-1.5 text-sm">
        <div className="flex justify-between text-white/70">
          <span>Foundation & setup (vast)</span><span>{FOUNDATION}u</span>
        </div>
        <div className="flex justify-between text-white/70">
          <span>Training ({trainingSessions} × 2u)</span><span>{trainingHours}u</span>
        </div>
        <div className="flex justify-between text-white/70">
          <span>Build / tools ({buildSessions} × 2u)</span><span>{buildHours}u</span>
        </div>
        <div className="border-t border-white/20 pt-1.5 flex justify-between text-white/70">
          <span>Totaal uren</span><span>{totalHours}u × ${RATE} = {fmt(totalHours * RATE)}/pp</span>
        </div>
        <div className="flex justify-between font-bold text-white pt-1">
          <span>Totaal ({count} pp)</span>
          <span className="text-xl font-black">{fmt(totalUsd)}</span>
        </div>
      </div>
    </div>
  )
}
