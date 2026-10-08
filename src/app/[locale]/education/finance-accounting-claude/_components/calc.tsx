'use client'

import { useState } from 'react'

type CalcLabels = {
  premSeats: string
  stdSeats: string
  usecases: string
  rate: string
  support: string
  annual: string
  monthly: string
  premHint: string
  stdHint: string
  ucHint: string
  rateHint: string
  supHint: string
  billingLabel: string
  clientHeader: string
  suriHeader: string
  supHeader: string
  foundation: string
  training: string
  tools: string
  handover: string
  perMonth: string
  perYear: string
  totalLabel: string
  totalNote1: string
  totalNote2: string
  clientNote: string
  firstYear: string
  seatWarn1: string
  seatWarn2: string
  scenTitle: string
  scenItems: Array<{ lvl: string; title: string; sub: string; desc: string }>
  cautionTitle: string
  cautionBody: string
}

const SEAT_MIN = 5
const FUND = 14
const BORG = 4
const PER_SEAT = 2
const PER_UC = 6
const HOUR_MIN = 24

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US')
}

export function FinanceCalc({
  labels,
  onRequestQuote,
}: {
  labels: CalcLabels
  onRequestQuote?: (data: Record<string, unknown>) => void
}) {
  const [prem, setPrem] = useState(2)
  const [std, setStd] = useState(3)
  const [uc, setUc] = useState(2)
  const [rate, setRate] = useState(45)
  const [sup, setSup] = useState(0)
  const [mode, setMode] = useState<'annual' | 'monthly'>('annual')

  const rates = { annual: { prem: 100, std: 20 }, monthly: { prem: 125, std: 25 } }
  const r = rates[mode]

  const total = prem + std
  const filler = total < SEAT_MIN ? SEAT_MIN - total : 0
  const billStd = std + filler

  const cp = prem * r.prem
  const cs = billStd * r.std
  const month = cp + cs
  const year = month * 12

  const trainSeats = Math.max(total, SEAT_MIN)
  const trainH = trainSeats * PER_SEAT
  const buildH = uc * PER_UC
  const hours = Math.max(FUND + trainH + buildH + BORG, HOUR_MIN)
  const begeleiding = hours * rate

  const supMonth = sup * rate
  const supYear = supMonth * 12
  const omzetYear = begeleiding + supYear
  const first = year + omzetYear

  const stdLabel = filler > 0
    ? `Standard × ${billStd} (${labels.seatWarn1})`
    : `Standard × ${std}`

  return (
    <div className="space-y-8">
      {/* Calculator grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#2B3494] rounded-xl overflow-hidden border border-[#2B3494]/20">
        {/* Controls */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-white font-bold text-xl">Investment Calculator</h3>
            <p className="text-white/60 text-sm mt-1">Slide to your team and guidance scope. Minimum 5 seats for Team.</p>
          </div>

          {[
            { label: labels.premSeats, val: prem, set: setPrem, min: 0, max: 10, hint: labels.premHint },
            { label: labels.stdSeats, val: std, set: setStd, min: 0, max: 20, hint: labels.stdHint },
            { label: labels.usecases, val: uc, set: setUc, min: 0, max: 8, hint: labels.ucHint },
          ].map(({ label, val, set, min, max, hint }) => (
            <div key={label}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white/80 text-sm font-medium">{label}</label>
                <span className="font-mono font-bold text-white text-base">{val}</span>
              </div>
              <input
                type="range" min={min} max={max} value={val}
                title={label}
                onChange={e => set(+e.target.value)}
                className="w-full h-1 bg-white/20 rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E8192C] [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <p className="text-white/40 text-xs mt-1">{hint}</p>
            </div>
          ))}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-white/80 text-sm font-medium">{labels.rate}</label>
              <span className="font-mono font-bold text-white text-base">${rate}</span>
            </div>
            <input
              type="range" min={45} max={150} step={5} value={rate}
              title={labels.rate}
              onChange={e => setRate(+e.target.value)}
              className="w-full h-1 bg-white/20 rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E8192C] [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <p className="text-white/40 text-xs mt-1">{labels.rateHint}</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-white/80 text-sm font-medium">{labels.support}</label>
              <span className="font-mono font-bold text-white text-base">{sup} u/mnd</span>
            </div>
            <input
              type="range" min={0} max={8} value={sup}
              title={labels.support}
              onChange={e => setSup(+e.target.value)}
              className="w-full h-1 bg-white/20 rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E8192C] [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <p className="text-white/40 text-xs mt-1">{labels.supHint}</p>
          </div>

          <div>
            <p className="text-white/80 text-sm font-medium mb-2">{labels.billingLabel}</p>
            <div className="inline-flex border border-white/20 rounded-full p-1 gap-1">
              {(['annual', 'monthly'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-colors ${
                    mode === m ? 'bg-[#E8192C] text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {m === 'annual' ? labels.annual : labels.monthly}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-[#20266E] p-8 border-l border-white/10 flex flex-col justify-between">
          <div className="space-y-4">
            <p className="font-mono text-[10px] tracking-widest uppercase text-white/60 font-bold">{labels.clientHeader}</p>

            {[
              { label: `Premium × ${prem}`, amt: fmt(cp) },
              { label: stdLabel, amt: fmt(cs) },
              { label: labels.perMonth, amt: fmt(month) },
              { label: labels.perYear, amt: fmt(year) },
            ].map(row => (
              <div key={row.label} className="flex justify-between border-b border-white/10 pb-2 text-sm">
                <span className="text-white/60">{row.label}</span>
                <span className="font-mono font-medium text-white">{row.amt}</span>
              </div>
            ))}

            <p className="font-mono text-[10px] tracking-widest uppercase text-white font-bold border-l-2 border-[#E8192C] pl-3 mt-4">{labels.suriHeader}</p>

            {[
              { label: labels.foundation, amt: '14 u' },
              { label: `${labels.training} (${trainSeats} × ${PER_SEAT}u)`, amt: `${trainH} u` },
              { label: `${labels.tools} (${uc} × ${PER_UC}u)`, amt: `${buildH} u` },
              { label: labels.handover, amt: '4 u' },
              { label: `${hours} u × $${rate}`, amt: fmt(begeleiding) },
            ].map(row => (
              <div key={row.label} className="flex justify-between border-b border-white/10 pb-1.5 text-sm">
                <span className="text-white/50">{row.label}</span>
                <span className="font-mono text-white/80">{row.amt}</span>
              </div>
            ))}

            {sup > 0 && (
              <>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white font-bold border-l-2 border-[#E8192C] pl-3 mt-2">{labels.supHeader}</p>
                <div className="flex justify-between border-b border-white/10 pb-1.5 text-sm">
                  <span className="text-white/50">{sup} u/mnd × ${rate}</span>
                  <span className="font-mono text-white/80">{fmt(supMonth)}/mnd</span>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-[#E8192C]">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white font-bold text-base">{labels.totalLabel}</p>
                <p className="text-white/50 text-xs mt-0.5">
                  {sup > 0 ? `${labels.totalNote1} + ${fmt(supYear)} ${labels.totalNote2}` : labels.totalNote1}
                </p>
              </div>
              <span className="font-mono font-bold text-white text-3xl">{fmt(omzetYear)}</span>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs font-mono text-white/50">
                <span>{labels.clientNote}</span>
                <span>{fmt(year)}/yr</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-white/50">
                <span>{labels.firstYear}</span>
                <span>{fmt(first)}</span>
              </div>
            </div>
            {filler > 0 && (
              <p className="mt-3 text-[11px] text-[#E8192C]/80">{labels.seatWarn1} — {filler} {labels.seatWarn2}</p>
            )}

            {onRequestQuote && (
              <button
                type="button"
                onClick={() => onRequestQuote({
                  premSeats: prem, stdSeats: std, usecases: uc,
                  rate, support: sup, mode,
                  totalHours: hours, totalUsd: omzetYear,
                })}
                className="w-full mt-4 bg-[#E63946] hover:bg-[#c0303b] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Offerte aanvragen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {labels.scenItems.map((s, i) => (
          <div key={i} className={`border rounded-xl p-6 bg-surface ${i === 1 ? 'border-2 border-[#E8192C]' : 'border-border'}`}>
            <p className="font-mono text-[11px] tracking-widest uppercase text-[#E8192C] font-bold">{s.lvl}</p>
            <h4 className="font-bold text-primary mt-2 text-base">{s.title}</h4>
            <div className="mt-3 space-y-1">
              <p className="font-mono text-sm font-bold text-foreground">{s.sub}</p>
            </div>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Caution */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h4 className="font-bold text-[#C2121F] mb-2">{labels.cautionTitle}</h4>
        <p className="text-sm text-foreground leading-relaxed">{labels.cautionBody}</p>
      </div>
    </div>
  )
}
