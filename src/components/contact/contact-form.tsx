'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { SERVICE_OPTIONS } from '@/lib/validations'
import type { ContactFormData } from '@/lib/validations'

type Status = 'idle' | 'loading' | 'success' | 'error'

const SERVICE_LABELS: Record<typeof SERVICE_OPTIONS[number], string> = {
  'business-support': 'Business Support',
  'web-applications': 'Web Applicaties',
  'research': 'Research',
  'forensics': 'Forensics',
  'education': 'Education',
  'anders': 'Anders',
}

const INITIAL_FORM: ContactFormData = {
  naam: '',
  bedrijfsnaam: '',
  email: '',
  telefoon: '',
  service: 'business-support',
  bericht: '',
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.status === 422) {
        const json = await res.json()
        setErrors(json.error?.fieldErrors ?? {})
        setStatus('idle')
        return
      }

      if (!res.ok) {
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(INITIAL_FORM)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface border border-gold/40 px-6 py-10 text-center">
        <p className="text-gold font-semibold text-lg mb-2">Bericht ontvangen</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Uw bericht is ontvangen. We nemen binnen 2 werkdagen contact op.
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
          Naam <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Input
          id="naam"
          name="naam"
          type="text"
          autoComplete="name"
          required
          disabled={isLoading}
          value={form.naam}
          onChange={handleChange}
          aria-describedby={errors.naam ? 'naam-error' : undefined}
          aria-invalid={!!errors.naam}
          placeholder="Uw volledige naam"
        />
        {errors.naam && (
          <p id="naam-error" role="alert" className="text-xs text-destructive">
            {errors.naam[0]}
          </p>
        )}
      </div>

      {/* Bedrijfsnaam */}
      <div className="space-y-1.5">
        <Label htmlFor="bedrijfsnaam" className="text-foreground">
          Bedrijfsnaam <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Input
          id="bedrijfsnaam"
          name="bedrijfsnaam"
          type="text"
          autoComplete="organization"
          required
          disabled={isLoading}
          value={form.bedrijfsnaam}
          onChange={handleChange}
          aria-describedby={errors.bedrijfsnaam ? 'bedrijfsnaam-error' : undefined}
          aria-invalid={!!errors.bedrijfsnaam}
          placeholder="Naam van uw bedrijf"
        />
        {errors.bedrijfsnaam && (
          <p id="bedrijfsnaam-error" role="alert" className="text-xs text-destructive">
            {errors.bedrijfsnaam[0]}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-foreground">
          E-mailadres <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isLoading}
          value={form.email}
          onChange={handleChange}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          placeholder="u@bedrijf.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-xs text-destructive">
            {errors.email[0]}
          </p>
        )}
      </div>

      {/* Telefoon (optional) */}
      <div className="space-y-1.5">
        <Label htmlFor="telefoon" className="text-foreground">
          Telefoonnummer{' '}
          <span className="text-muted-foreground font-normal">(optioneel)</span>
        </Label>
        <Input
          id="telefoon"
          name="telefoon"
          type="tel"
          autoComplete="tel"
          disabled={isLoading}
          value={form.telefoon ?? ''}
          onChange={handleChange}
          placeholder="+597 000 0000"
        />
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <Label htmlFor="service" className="text-foreground">
          Service <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <select
          id="service"
          name="service"
          required
          disabled={isLoading}
          value={form.service}
          onChange={handleChange}
          aria-describedby={errors.service ? 'service-error' : undefined}
          aria-invalid={!!errors.service}
          className="w-full bg-surface border border-border text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {SERVICE_LABELS[opt]}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="service-error" role="alert" className="text-xs text-destructive">
            {errors.service[0]}
          </p>
        )}
      </div>

      {/* Bericht */}
      <div className="space-y-1.5">
        <Label htmlFor="bericht" className="text-foreground">
          Bericht <span className="text-destructive" aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="bericht"
          name="bericht"
          required
          disabled={isLoading}
          value={form.bericht}
          onChange={handleChange}
          aria-describedby={errors.bericht ? 'bericht-error' : undefined}
          aria-invalid={!!errors.bericht}
          placeholder="Beschrijf uw project of vraag..."
          rows={5}
          className="min-h-[120px] resize-y"
        />
        {errors.bericht && (
          <p id="bericht-error" role="alert" className="text-xs text-destructive">
            {errors.bericht[0]}
          </p>
        )}
      </div>

      {/* Global error */}
      {status === 'error' && (
        <p role="alert" className="text-sm text-destructive">
          Er ging iets mis. Probeer het later opnieuw.
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gold text-[#0B1628] font-semibold py-3 px-6 text-sm tracking-wide hover:bg-[var(--gold-hover)] transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Verzenden...' : 'Bericht versturen'}
      </button>
    </form>
  )
}
