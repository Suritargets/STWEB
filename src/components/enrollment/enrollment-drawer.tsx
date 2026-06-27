'use client'

import { useState, useCallback } from 'react'
import { X, ChevronRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CalculatorFlat, type CalcResult } from './calculator-flat'
import { CalculatorMonthly } from './calculator-monthly'
import { CalculatorHourly } from './calculator-hourly'

export type CourseConfig = {
  slug: string
  name: string
  type: 'flat' | 'monthly' | 'hourly' | 'finance'
  priceIndividual?: number
  priceTeam?: number
  monthlyPrice?: number
  months?: number
  noMinIndividual?: boolean
}

export type FinanceCalcData = Record<string, unknown>

type Props = {
  open: boolean
  onClose: () => void
  course: CourseConfig
  financeData?: FinanceCalcData
}

type Step = 'calc' | 'details'
type ClientType = 'zakelijk' | 'particulier'
type EnrollmentType = 'individual' | 'team'
type Status = 'idle' | 'loading' | 'success' | 'error'

function fmt(n: number) { return '$' + n.toLocaleString('en-US') }

export function EnrollmentDrawer({ open, onClose, course, financeData }: Props) {
  const [step, setStep]                     = useState<Step>('calc')
  const [enrollmentType, setEnrollmentType] = useState<EnrollmentType>('individual')
  const [calcResult, setCalcResult]         = useState<CalcResult | null>(null)
  const [clientType, setClientType]         = useState<ClientType>('zakelijk')
  const [naam, setNaam]                     = useState('')
  const [bedrijfsnaam, setBedrijfsnaam]     = useState('')
  const [email, setEmail]                   = useState('')
  const [telefoon, setTelefoon]             = useState('')
  const [opmerkingen, setOpmerkingen]       = useState('')
  const [status, setStatus]                 = useState<Status>('idle')
  const [error, setError]                   = useState('')

  const handleCalcChange = useCallback((result: CalcResult) => {
    setCalcResult(result)
  }, [])

  const isFinance = course.type === 'finance'
  const showTeamToggle = !isFinance

  function resetAndClose() {
    setStep('calc')
    setEnrollmentType('individual')
    setCalcResult(null)
    setNaam('')
    setBedrijfsnaam('')
    setEmail('')
    setTelefoon('')
    setOpmerkingen('')
    setStatus('idle')
    setError('')
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!calcResult && !isFinance) return
    setStatus('loading')
    setError('')

    const payload = {
      courseSlug:     course.slug,
      courseName:     course.name,
      enrollmentType: isFinance ? 'team' : enrollmentType,
      clientType,
      naam,
      bedrijfsnaam:   bedrijfsnaam || undefined,
      email,
      telefoon:       telefoon || undefined,
      deelnemers:     calcResult?.deelnemers ?? 5,
      uren:           calcResult?.uren,
      totalUsd:       isFinance
        ? Number((financeData as Record<string, unknown>)?.totalUsd ?? 0)
        : (calcResult?.totalUsd ?? 0),
      calculatorData: isFinance ? financeData : calcResult?.calculatorData,
      opmerkingen:    opmerkingen || undefined,
    }

    try {
      const res = await fetch('/api/enroll', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Er is iets misgegaan. Probeer het opnieuw.')
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={resetAndClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0B1628] z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest mb-0.5">Inschrijving</p>
            <h2 className="text-lg font-bold text-white">{course.name}</h2>
          </div>
          <button onClick={resetAndClose} className="text-white/50 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-semibold text-lg">Inschrijving ontvangen!</p>
              <p className="text-white/60 text-sm">Wij nemen binnen 1–2 werkdagen contact met u op.</p>
              <button onClick={resetAndClose} className="mt-4 text-sm text-white/50 underline hover:text-white">
                Sluiten
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Calculator */}
              {step === 'calc' && (
                <div className="space-y-6">
                  {/* Individual / Team toggle (not for finance) */}
                  {showTeamToggle && (
                    <div className="flex gap-2 bg-white/5 rounded-lg p-1">
                      {(['individual', 'team'] as EnrollmentType[]).map(t => (
                        <button
                          key={t}
                          onClick={() => setEnrollmentType(t)}
                          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${enrollmentType === t ? 'bg-[#2B3494] text-white' : 'text-white/50 hover:text-white'}`}
                        >
                          {t === 'individual' ? 'Individueel' : 'Team / In-house'}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Finance: read-only summary of pre-filled data */}
                  {isFinance && financeData && (
                    <div className="bg-white/10 rounded-lg p-4 text-sm text-white/70 space-y-1">
                      <p className="text-white font-semibold mb-2">Calculator samenvatting</p>
                      {Object.entries(financeData).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span>{k}</span>
                          <span>{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Individual flat (e.g. AI course) */}
                  {!isFinance && enrollmentType === 'individual' && course.type === 'flat' && (
                    <CalculatorFlat
                      enrollmentType="individual"
                      priceIndividual={course.priceIndividual ?? 750}
                      priceTeam={course.priceTeam ?? 400}
                      noMinIndividual={course.noMinIndividual}
                      onChange={handleCalcChange}
                    />
                  )}

                  {/* Team flat (e.g. AI course team) */}
                  {!isFinance && enrollmentType === 'team' && course.type === 'flat' && (
                    <CalculatorFlat
                      enrollmentType="team"
                      priceIndividual={course.priceIndividual ?? 750}
                      priceTeam={course.priceTeam ?? 400}
                      noMinIndividual={course.noMinIndividual}
                      onChange={handleCalcChange}
                    />
                  )}

                  {/* Monthly pricing — always team (e.g. Trading course) */}
                  {!isFinance && course.type === 'monthly' && (
                    <CalculatorMonthly
                      priceTeam={course.priceTeam ?? 400}
                      monthlyPrice={course.monthlyPrice ?? 175}
                      months={course.months ?? 3}
                      onChange={handleCalcChange}
                    />
                  )}

                  {/* Hourly team (e.g. IT / Business) */}
                  {!isFinance && enrollmentType === 'team' && course.type === 'hourly' && (
                    <CalculatorHourly onChange={handleCalcChange} />
                  )}

                  {/* Hourly individual — simplified flat using hourly rate */}
                  {!isFinance && enrollmentType === 'individual' && course.type === 'hourly' && (
                    <CalculatorFlat
                      enrollmentType="individual"
                      priceIndividual={course.priceIndividual ?? 45}
                      priceTeam={course.priceTeam ?? 400}
                      noMinIndividual
                      onChange={handleCalcChange}
                    />
                  )}

                  <button
                    onClick={() => setStep('details')}
                    disabled={!calcResult && !isFinance}
                    className="w-full bg-[#E63946] hover:bg-[#c0303b] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-40"
                  >
                    Doorgaan <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Step 2: Details form */}
              {step === 'details' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Calc summary pill */}
                  {calcResult && (
                    <div className="bg-[#2B3494]/40 rounded-lg px-4 py-3 flex justify-between items-center">
                      <span className="text-sm text-white/70">
                        {calcResult.deelnemers} deelnemer{calcResult.deelnemers > 1 ? 's' : ''}
                        {calcResult.uren ? ` · ${calcResult.uren}u` : ''}
                      </span>
                      <span className="font-bold text-white">{fmt(calcResult.totalUsd)}</span>
                    </div>
                  )}

                  {/* Zakelijk / Particulier toggle */}
                  <div className="flex gap-2 bg-white/5 rounded-lg p-1">
                    {(['zakelijk', 'particulier'] as ClientType[]).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setClientType(t)}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${clientType === t ? 'bg-[#2B3494] text-white' : 'text-white/50 hover:text-white'}`}
                      >
                        {t === 'zakelijk' ? 'Zakelijk' : 'Particulier'}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-white/70 text-xs mb-1 block">Naam *</Label>
                      <Input
                        value={naam}
                        onChange={e => setNaam(e.target.value)}
                        required
                        placeholder="Uw naam"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>

                    {clientType === 'zakelijk' && (
                      <div>
                        <Label className="text-white/70 text-xs mb-1 block">Bedrijfsnaam *</Label>
                        <Input
                          value={bedrijfsnaam}
                          onChange={e => setBedrijfsnaam(e.target.value)}
                          required
                          placeholder="Uw bedrijf"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        />
                      </div>
                    )}

                    <div>
                      <Label className="text-white/70 text-xs mb-1 block">E-mail *</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="u@bedrijf.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>

                    <div>
                      <Label className="text-white/70 text-xs mb-1 block">Telefoon</Label>
                      <Input
                        value={telefoon}
                        onChange={e => setTelefoon(e.target.value)}
                        placeholder="+597 ..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>

                    <div>
                      <Label className="text-white/70 text-xs mb-1 block">Opmerkingen</Label>
                      <Textarea
                        value={opmerkingen}
                        onChange={e => setOpmerkingen(e.target.value)}
                        placeholder="Aanvullende informatie..."
                        rows={3}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
                      />
                    </div>
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('calc')}
                      className="flex-1 border border-white/20 text-white/70 hover:text-white py-3 rounded-lg text-sm transition-colors"
                    >
                      Terug
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex-1 bg-[#E63946] hover:bg-[#c0303b] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                    >
                      {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                      Inschrijving bevestigen
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
