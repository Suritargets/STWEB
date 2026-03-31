'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const t = useTranslations('contactForm')

  const SERVICES = [
    { id: 'dashboarding',    label: t('services.dashboarding') },
    { id: 'web-applicaties', label: t('services.webApplicaties') },
    { id: 'marketing-ai',    label: t('services.marketingAi') },
    { id: 'forensics',       label: t('services.forensics') },
    { id: 'education',       label: t('services.education') },
    { id: 'anders',          label: t('services.anders') },
  ]

  const BUDGET_OPTIONS = [
    { value: '',          label: t('budget_options.placeholder') },
    { value: 'onder-5k',  label: t('budget_options.onder5k') },
    { value: '5k-15k',    label: t('budget_options.v5k15k') },
    { value: '15k-50k',   label: t('budget_options.v15k50k') },
    { value: 'boven-50k', label: t('budget_options.boven50k') },
    { value: 'onbekend',  label: t('budget_options.onbekend') },
  ]

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

  const andersSelected = services.includes('anders')

  function toggleService(id: string) {
    setServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
    if (errors.services) setErrors(prev => { const n = { ...prev }; delete n.services; return n })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!naam.trim())                                    newErrors.naam          = t('naamError')
    if (!bedrijfsnaam.trim())                            newErrors.bedrijfsnaam  = t('bedrijfError')
    if (!email.trim() || !email.includes('@'))           newErrors.email         = t('emailError')
    if (services.length === 0)                           newErrors.services      = t('dienstenError')
    if (andersSelected && !andersText.trim())            newErrors.andersText    = t('andersError')
    if (!bericht.trim() || bericht.length < 10)         newErrors.bericht       = t('toelichtingError')

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
          naam, bedrijfsnaam, email, telefoon,
          services,
          andersText: andersSelected ? andersText : undefined,
          budget,
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
        <p className="text-gold font-semibold text-lg mb-2">{t('successTitle')}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t('successBody')}
        </p>
      </div>
    )
  }

  const isLoading = status === 'loading'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Naam */}
      <div className="space-y-1.5">
        <Label htmlFor="naam" className="text-foreground">
          {t('naam')} <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Input
          id="naam" type="text" autoComplete="name"
          disabled={isLoading} value={naam}
          onChange={e => setNaam(e.target.value)}
          placeholder={t('naamPlaceholder')}
          aria-invalid={!!errors.naam}
        />
        {errors.naam && <p className="text-xs text-destructive">{errors.naam}</p>}
      </div>

      {/* Bedrijfsnaam */}
      <div className="space-y-1.5">
        <Label htmlFor="bedrijfsnaam" className="text-foreground">
          {t('bedrijf')} <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Input
          id="bedrijfsnaam" type="text" autoComplete="organization"
          disabled={isLoading} value={bedrijfsnaam}
          onChange={e => setBedrijfsnaam(e.target.value)}
          placeholder={t('bedrijfPlaceholder')}
          aria-invalid={!!errors.bedrijfsnaam}
        />
        {errors.bedrijfsnaam && <p className="text-xs text-destructive">{errors.bedrijfsnaam}</p>}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-foreground">
          {t('email')} <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Input
          id="email" type="email" autoComplete="email"
          disabled={isLoading} value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      {/* Telefoon */}
      <div className="space-y-1.5">
        <Label htmlFor="telefoon" className="text-foreground">
          {t('telefoon')}{' '}
          <span className="text-muted-foreground font-normal">{t('telefonOptional')}</span>
        </Label>
        <Input
          id="telefoon" type="tel" autoComplete="tel"
          disabled={isLoading} value={telefoon}
          onChange={e => setTelefoon(e.target.value)}
          placeholder="+597 000 0000"
        />
      </div>

      {/* Diensten */}
      <div className="space-y-2">
        <Label className="text-foreground">
          {t('diensten')} <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
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
                  <Input
                    type="text"
                    disabled={isLoading}
                    value={andersText}
                    onChange={e => setAndersText(e.target.value)}
                    placeholder={t('andersPlaceholder')}
                    aria-invalid={!!errors.andersText}
                  />
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

      {/* Budget */}
      <div className="space-y-1.5">
        <Label htmlFor="budget" className="text-foreground">
          {t('budget')}{' '}
          <span className="text-muted-foreground font-normal">{t('telefonOptional')}</span>
        </Label>
        <select
          id="budget"
          disabled={isLoading}
          value={budget}
          onChange={e => setBudget(e.target.value)}
          className="w-full bg-surface border border-border text-foreground px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50"
        >
          {BUDGET_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Toelichting */}
      <div className="space-y-1.5">
        <Label htmlFor="bericht" className="text-foreground">
          {t('toelichting')} <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="bericht"
          disabled={isLoading}
          value={bericht}
          onChange={e => setBericht(e.target.value)}
          placeholder={t('toelichtingPlaceholder')}
          rows={5}
          className="min-h-[120px] resize-y"
          aria-invalid={!!errors.bericht}
        />
        {errors.bericht && <p className="text-xs text-destructive">{errors.bericht}</p>}
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-destructive">
          {t('errorMsg')}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gold text-white font-semibold py-3 px-6 text-sm tracking-wide
                   hover:bg-[var(--gold-hover)] transition-colors disabled:opacity-50"
      >
        {isLoading ? t('sending') : t('submit')}
      </button>

    </form>
  )
}
