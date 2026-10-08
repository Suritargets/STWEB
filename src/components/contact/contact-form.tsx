'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Check, Building2, User } from 'lucide-react'
import type { ClientType } from '@/lib/validations'

const SERVICES = [
  { id: 'dashboarding',    label: 'Dashboarding & Data Visualisatie' },
  { id: 'web-applicaties', label: 'Web & Applicaties' },
  { id: 'marketing-ai',    label: 'Marketing met AI' },
  { id: 'forensics',       label: 'Forensics & Integriteit' },
  { id: 'education',       label: 'Education & Training' },
  { id: 'anders',          label: 'Anders' },
]

const BUDGET_OPTIONS = [
  { value: '',          label: 'Selecteer een indicatie' },
  { value: 'onder-5k',  label: 'Onder $5.000' },
  { value: '5k-15k',    label: '$5.000 – $15.000' },
  { value: '15k-50k',   label: '$15.000 – $50.000' },
  { value: 'boven-50k', label: 'Boven $50.000' },
  { value: 'onbekend',  label: 'Nog niet bekend' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

function ValidCheck() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shrink-0">
      <Check size={12} strokeWidth={3} />
    </span>
  )
}

export function ContactForm() {
  const [clientType,    setClientType]    = useState<ClientType>('zakelijk')
  const [naam,          setNaam]          = useState('')
  const [bedrijfsnaam,  setBedrijfsnaam]  = useState('')
  const [email,         setEmail]         = useState('')
  const [telefoon,      setTelefoon]      = useState('')
  const [services,      setServices]      = useState<string[]>([])
  const [andersText,    setAndersText]    = useState('')
  const [budget,        setBudget]        = useState('')
  const [bericht,       setBericht]       = useState('')
  const [status,        setStatus]        = useState<Status>('idle')
  const [errors,        setErrors]        = useState<Record<string, string>>({})
  const [touched,       setTouched]       = useState<Set<string>>(new Set())

  const isZakelijk = clientType === 'zakelijk'
  const andersSelected = services.includes('anders')

  // Validation checks
  const isNaamValid = naam.trim().length >= 2
  const isBedrijfValid = bedrijfsnaam.trim().length >= 1
  const isEmailValid = email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isTelefoonValid = telefoon.trim().length >= 5
  const isServicesValid = services.length > 0
  const isAndersValid = !andersSelected || andersText.trim().length > 0
  const isBudgetValid = budget.length > 0
  const isBerichtValid = bericht.trim().length >= 10

  function markTouched(field: string) {
    setTouched(prev => new Set(prev).add(field))
  }

  function toggleService(id: string) {
    setServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
    markTouched('services')
    if (errors.services) setErrors(prev => { const n = { ...prev }; delete n.services; return n })
  }

  function switchClientType(type: ClientType) {
    setClientType(type)
    setErrors({})
    // Keep filled fields, just clear business-only ones if switching to particulier
    if (type === 'particulier') {
      setBedrijfsnaam('')
      setBudget('')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const touchAll = new Set(['naam', 'email', 'services', 'bericht', 'andersText'])
    if (isZakelijk) touchAll.add('bedrijfsnaam')
    setTouched(touchAll)

    const newErrors: Record<string, string> = {}
    if (!isNaamValid)                                     newErrors.naam          = 'Naam is verplicht'
    if (isZakelijk && !isBedrijfValid)                    newErrors.bedrijfsnaam  = 'Bedrijfsnaam is verplicht'
    if (!isEmailValid)                                    newErrors.email         = 'Geldig e-mailadres is verplicht'
    if (!isServicesValid)                                 newErrors.services      = 'Selecteer minimaal één dienst'
    if (andersSelected && !isAndersValid)                 newErrors.andersText    = 'Vul in welke dienst u zoekt'
    if (!isBerichtValid)                                  newErrors.bericht       = 'Toelichting is te kort (min. 10 tekens)'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientType,
          naam,
          bedrijfsnaam: isZakelijk ? bedrijfsnaam : '',
          email,
          telefoon,
          services,
          andersText: andersSelected ? andersText : undefined,
          budget: isZakelijk ? budget : undefined,
          bericht,
        }),
      })

      if (!res.ok) { setStatus('error'); return }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-gold/40 px-6 py-10 text-center">
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-white">
            <Check size={24} strokeWidth={3} />
          </span>
        </div>
        <p className="text-gold font-semibold text-lg mb-2">Aanvraag ontvangen</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Uw offerte-aanvraag is ontvangen. We nemen binnen 2 werkdagen contact op.
        </p>
      </div>
    )
  }

  const isLoading = status === 'loading'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Client type switcher */}
      <div className="flex items-center bg-muted/50 border border-border rounded-lg p-1 gap-1">
        <button
          type="button"
          onClick={() => switchClientType('zakelijk')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
            isZakelijk
              ? 'bg-[#2B3494] text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }`}
        >
          <Building2 size={15} />
          Zakelijk
        </button>
        <button
          type="button"
          onClick={() => switchClientType('particulier')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
            !isZakelijk
              ? 'bg-[#2B3494] text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }`}
        >
          <User size={15} />
          Particulier
        </button>
      </div>

      {/* Naam */}
      <div className="space-y-1.5">
        <Label htmlFor="naam" className="text-foreground">
          {isZakelijk ? 'Contactpersoon' : 'Volledige naam'}{' '}
          <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <div className="relative">
          <Input
            id="naam" type="text" autoComplete="name"
            disabled={isLoading} value={naam}
            onChange={e => setNaam(e.target.value)}
            onBlur={() => markTouched('naam')}
            placeholder={isZakelijk ? 'Naam contactpersoon' : 'Uw volledige naam'}
            aria-invalid={!!errors.naam}
            className={touched.has('naam') && isNaamValid ? 'pr-10 border-emerald-400' : ''}
          />
          {touched.has('naam') && isNaamValid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2"><ValidCheck /></div>
          )}
        </div>
        {errors.naam && <p className="text-xs text-destructive">{errors.naam}</p>}
      </div>

      {/* Bedrijfsnaam — only for zakelijk */}
      {isZakelijk && (
        <div className="space-y-1.5">
          <Label htmlFor="bedrijfsnaam" className="text-foreground">
            Bedrijfsnaam <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          <div className="relative">
            <Input
              id="bedrijfsnaam" type="text" autoComplete="organization"
              disabled={isLoading} value={bedrijfsnaam}
              onChange={e => setBedrijfsnaam(e.target.value)}
              onBlur={() => markTouched('bedrijfsnaam')}
              placeholder="Naam van uw bedrijf"
              aria-invalid={!!errors.bedrijfsnaam}
              className={touched.has('bedrijfsnaam') && isBedrijfValid ? 'pr-10 border-emerald-400' : ''}
            />
            {touched.has('bedrijfsnaam') && isBedrijfValid && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2"><ValidCheck /></div>
            )}
          </div>
          {errors.bedrijfsnaam && <p className="text-xs text-destructive">{errors.bedrijfsnaam}</p>}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-foreground">
          E-mailadres <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <div className="relative">
          <Input
            id="email" type="email" autoComplete="email"
            disabled={isLoading} value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => markTouched('email')}
            placeholder={isZakelijk ? 'u@bedrijf.com' : 'u@email.com'}
            aria-invalid={!!errors.email}
            className={touched.has('email') && isEmailValid ? 'pr-10 border-emerald-400' : ''}
          />
          {touched.has('email') && isEmailValid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2"><ValidCheck /></div>
          )}
        </div>
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      {/* Telefoon */}
      <div className="space-y-1.5">
        <Label htmlFor="telefoon" className="text-foreground">
          Telefoonnummer{' '}
          <span className="text-muted-foreground font-normal">(optioneel)</span>
        </Label>
        <div className="relative">
          <Input
            id="telefoon" type="tel" autoComplete="tel"
            disabled={isLoading} value={telefoon}
            onChange={e => setTelefoon(e.target.value)}
            onBlur={() => markTouched('telefoon')}
            placeholder="+597 000 0000"
            className={touched.has('telefoon') && isTelefoonValid ? 'pr-10 border-emerald-400' : ''}
          />
          {touched.has('telefoon') && isTelefoonValid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2"><ValidCheck /></div>
          )}
        </div>
      </div>

      {/* Diensten */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label className="text-foreground">
            Dienst(en) <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          {touched.has('services') && isServicesValid && <ValidCheck />}
        </div>
        <div className="space-y-2.5 pt-1">
          {SERVICES.map(service => (
            <div key={service.id}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={services.includes(service.id)}
                  onChange={() => toggleService(service.id)}
                  disabled={isLoading}
                  className="w-4 h-4 accent-[#C9A84C] cursor-pointer shrink-0"
                />
                <span className="text-sm text-foreground group-hover:text-[#2B3494] transition-colors">
                  {service.label}
                </span>
              </label>

              {service.id === 'anders' && andersSelected && (
                <div className="mt-2 pl-7">
                  <div className="relative">
                    <Input
                      type="text"
                      disabled={isLoading}
                      value={andersText}
                      onChange={e => setAndersText(e.target.value)}
                      onBlur={() => markTouched('andersText')}
                      placeholder="Welke dienst zoekt u?"
                      aria-invalid={!!errors.andersText}
                      className={touched.has('andersText') && isAndersValid ? 'pr-10 border-emerald-400' : ''}
                    />
                    {touched.has('andersText') && isAndersValid && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2"><ValidCheck /></div>
                    )}
                  </div>
                  {errors.andersText && (
                    <p className="text-xs text-destructive mt-1">{errors.andersText}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {errors.services && <p className="text-xs text-destructive">{errors.services}</p>}
      </div>

      {/* Budget — only for zakelijk */}
      {isZakelijk && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Label htmlFor="budget" className="text-foreground">
              Budget indicatie{' '}
              <span className="text-muted-foreground font-normal">(optioneel)</span>
            </Label>
            {touched.has('budget') && isBudgetValid && <ValidCheck />}
          </div>
          <select
            id="budget"
            disabled={isLoading}
            value={budget}
            onChange={e => { setBudget(e.target.value); markTouched('budget') }}
            className="w-full bg-surface border border-border text-foreground px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50"
          >
            {BUDGET_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Toelichting */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Label htmlFor="bericht" className="text-foreground">
            Toelichting <span className="text-destructive" aria-hidden="true">*</span>
          </Label>
          {touched.has('bericht') && isBerichtValid && <ValidCheck />}
        </div>
        <Textarea
          id="bericht"
          disabled={isLoading}
          value={bericht}
          onChange={e => setBericht(e.target.value)}
          onBlur={() => markTouched('bericht')}
          placeholder={isZakelijk
            ? 'Beschrijf uw project, wensen of vragen...'
            : 'Wat kunnen we voor u betekenen?'
          }
          rows={5}
          className={`min-h-[120px] resize-y ${touched.has('bericht') && isBerichtValid ? 'border-emerald-400' : ''}`}
          aria-invalid={!!errors.bericht}
        />
        {touched.has('bericht') && bericht.length > 0 && bericht.length < 10 && (
          <p className="text-xs text-muted-foreground">{bericht.length}/10 tekens</p>
        )}
        {errors.bericht && <p className="text-xs text-destructive">{errors.bericht}</p>}
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-destructive">
          Er ging iets mis. Probeer het later opnieuw.
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gold text-white font-semibold py-3 px-6 text-sm tracking-wide
                   hover:bg-[var(--gold-hover)] transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Verzenden...' : 'Offerte aanvragen'}
      </button>

    </form>
  )
}
