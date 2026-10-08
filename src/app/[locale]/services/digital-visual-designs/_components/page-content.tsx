'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Image as ImageIcon, Pencil, Maximize2, Clock, Users, TrendingUp, Check, ZoomIn, X, Camera, Music2, Play, Sparkles, Palette, RefreshCw, CheckCircle2 } from 'lucide-react'
import { AnimatedSection } from '@/components/shared/animated-section'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PLATFORMS = [
  { name: 'Instagram', icon: Camera, bg: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)' },
  { name: 'Facebook', label: 'f', bg: '#1877F2' },
  { name: 'TikTok', icon: Music2, bg: '#000000' },
  { name: 'LinkedIn', label: 'in', bg: '#0A66C2' },
  { name: 'YouTube', icon: Play, bg: '#FF0000' },
  { name: 'X (Twitter)', label: 'X', bg: '#000000' },
]
const FEATURE_ICONS = [ImageIcon, Pencil, Maximize2]
const BENEFIT_ICONS = [Clock, Users, TrendingUp]
const PROCESS_ICONS = [Sparkles, Palette, RefreshCw, CheckCircle2]

type Status = 'idle' | 'loading' | 'success' | 'error'

export function DigitalVisualDesignsContent() {
  const t = useTranslations('digitalVisualDesigns')

  const [naam, setNaam] = useState('')
  const [bedrijfsnaam, setBedrijfsnaam] = useState('')
  const [email, setEmail] = useState('')
  const [telefoon, setTelefoon] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [lightbox, setLightbox] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientType: bedrijfsnaam.trim() ? 'zakelijk' : 'particulier',
          naam,
          bedrijfsnaam: bedrijfsnaam.trim() || undefined,
          email,
          telefoon: telefoon || undefined,
          services: ['marketing-ai'],
          budget: undefined,
          bericht: `Interesse in het Social Media Design Pakket (vanaf $15/maand) — 8 visuals, 3 correcties, 1 formaat.`,
        }),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const features = [0, 1, 2].map(i => ({
    title: t(`features.${i}.title`),
    description: t(`features.${i}.description`),
  }))
  const benefits = [0, 1, 2].map(i => ({
    title: t(`benefits.${i}.title`),
    description: t(`benefits.${i}.description`),
  }))
  const process = [0, 1, 2, 3].map(i => ({
    title: t(`process.${i}.title`),
    description: t(`process.${i}.description`),
  }))

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#2B3494] px-(--section-padding-x) py-(--section-padding-y)">
        <div
          className="pointer-events-none absolute -right-40 -top-40 w-140 h-140 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle,#ee2a7b,#6228d7,transparent 70%)' }}
        />
        <div className="max-w-360 mx-auto relative grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2.5 border border-white/20 bg-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-white font-bold">{t('badge')}</span>
            </div>

            <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/50 mb-4">{t('label')}</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.05]">
              {t('heroTitle')}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/65 font-mono max-w-2xl">
              {t('heroSubtitle')}
            </p>
          </AnimatedSection>

          {/* Live look: how our design team works with AI */}
          <AnimatedSection delay={80}>
            <div className="hidden lg:block rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <video
                src="/videos/hero-designer-ai.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Flyer */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto flex justify-center">
          <AnimatedSection>
            <button
              type="button"
              onClick={() => setLightbox(true)}
              aria-label={`Open: ${t('flyerAlt')}`}
              className="group relative block w-full max-w-sm rounded-lg overflow-hidden shadow-lg border border-border focus-visible:ring-2 focus-visible:ring-gold outline-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/flyers/flyer-social-media-autopilot.png"
                alt={t('flyerAlt')}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <ZoomIn className="text-white w-8 h-8 drop-shadow" />
              </div>
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative max-h-[92vh] max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute -top-10 right-0 text-white/80 hover:text-white"
            >
              <X size={24} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/flyers/flyer-social-media-autopilot.png"
              alt={t('flyerAlt')}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Features */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#2B3494] mb-8">{t('featuresLabel')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <AnimatedSection key={feature.title} delay={i * 40}>
                  <div className="bg-surface border border-border p-6 h-full">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#2B3494]/8 text-[#2B3494] mb-5">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI-powered process */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border bg-surface">
        <div className="max-w-360 mx-auto">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#2B3494] mb-3">{t('processLabel')}</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-10 max-w-2xl">
            {t('processTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => {
              const Icon = PROCESS_ICONS[i]
              return (
                <AnimatedSection key={step.title} delay={i * 60}>
                  <div className="relative h-full">
                    <span className="text-4xl font-bold font-mono text-[#2B3494]/15 leading-none select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2B3494]/8 text-[#2B3494] my-4">
                      <Icon size={19} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="px-(--section-padding-x) py-12 border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <div className="border border-dashed border-border rounded-xl px-8 py-10 text-center">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gold mb-2">{t('portfolioLabel')}</p>
              <p className="font-bold text-foreground mb-2">{t('portfolioTitle')}</p>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">{t('portfolioText')}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Platforms */}
      <section className="px-(--section-padding-x) py-16 border-b border-border">
        <div className="max-w-360 mx-auto">
          <p className="text-center text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-8">
            {t('platformsLabel')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {PLATFORMS.map(platform => (
              <div key={platform.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ background: platform.bg }}
                >
                  {platform.icon ? (
                    <platform.icon size={19} />
                  ) : (
                    <span className="font-bold text-sm">{platform.label}</span>
                  )}
                </div>
                <span className="font-mono text-[10px] tracking-wide uppercase font-bold text-muted-foreground">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#2B3494] mb-8">{t('benefitsLabel')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i]
              return (
                <AnimatedSection key={benefit.title} delay={i * 40}>
                  <div className="flex flex-col gap-3">
                    <Icon size={24} className="text-[#E8192C]" strokeWidth={1.5} />
                    <h3 className="font-bold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
          <p className="mt-12 font-mono text-sm text-[#2B3494] italic">{t('tagline')}</p>
        </div>
      </section>

      {/* Signup CTA */}
      <section className="relative overflow-hidden border-b border-gold/30" style={{ background: '#0B1628' }}>
        <div className="max-w-360 mx-auto px-(--section-padding-x) py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">{t('ctaTitle')}</h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl">{t('ctaSubtitle')}</p>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="text-emerald-400" size={26} />
                </div>
                <p className="text-white font-bold text-lg">{t('successTitle')}</p>
                <p className="text-white/60 text-sm">{t('successMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm font-semibold text-white mb-1">{t('formTitle')}</p>
                <div>
                  <Label className="text-white/70 text-xs mb-1 block">{t('nameLabel')}</Label>
                  <Input
                    value={naam}
                    onChange={e => setNaam(e.target.value)}
                    required
                    placeholder={t('namePlaceholder')}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-xs mb-1 block">{t('companyLabel')}</Label>
                  <Input
                    value={bedrijfsnaam}
                    onChange={e => setBedrijfsnaam(e.target.value)}
                    placeholder={t('companyPlaceholder')}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-xs mb-1 block">{t('emailLabel')}</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder={t('emailPlaceholder')}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-xs mb-1 block">{t('phoneLabel')}</Label>
                  <Input
                    value={telefoon}
                    onChange={e => setTelefoon(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>

                {status === 'error' && <p className="text-red-400 text-sm">{t('errorMessage')}</p>}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#E63946] hover:bg-[#c0303b] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? t('submittingButton') : t('submitButton')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
