'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { CalendarClock, Loader2, Radio, Sparkles } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { WEBINAR_COUPON_CODE, findAffiliateCode } from '@/lib/coupon'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function WebinarCtaSection({ showMoreInfoLink = true }: { showMoreInfoLink?: boolean }) {
  const t = useTranslations('home.webinar')

  const [naam, setNaam]         = useState('')
  const [email, setEmail]       = useState('')
  const [telefoon, setTelefoon] = useState('')
  const [status, setStatus]     = useState<Status>('idle')
  const [referralSource, setReferralSource] = useState('')

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (ref) setReferralSource(ref.slice(0, 120))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/webinar-register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          naam,
          email,
          telefoon: telefoon || undefined,
          referralSource: referralSource || undefined,
        }),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const topics = [0, 1, 2, 3, 4].map(i => t(`topics.${i}`))
  const badges = [t('badge1'), t('badge2'), t('badge3')]
  const displayedCode = findAffiliateCode(referralSource)?.code ?? WEBINAR_COUPON_CODE

  return (
    <section
      className="relative overflow-hidden border-t border-b border-gold/30"
      style={{ background: '#0B1628' }}
      aria-labelledby="webinar-cta-heading"
    >
      <div className="max-w-[1440px] mx-auto px-[var(--section-padding-x)] py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
        {/* ── Pitch ── */}
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase text-[#E63946] mb-4">
            <Radio size={13} /> {t('label')}
          </p>
          <h2 id="webinar-cta-heading" className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
            {t('title')}
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mb-6 leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            {badges.map(badge => (
              <span
                key={badge}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/80"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="inline-flex items-center gap-2 font-mono text-xs text-gold mb-8">
            <CalendarClock size={14} /> {t('dateNote')}
          </p>

          <ul className="space-y-2.5 mb-6 list-none p-0">
            {topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#E63946] text-white text-[11px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {topic}
              </li>
            ))}
          </ul>

          {showMoreInfoLink && (
            <Link href="/education/free-ai-demo" className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:underline">
              {t('moreInfoLink')} →
            </Link>
          )}
        </div>

        {/* ── Form card ── */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Sparkles className="text-emerald-400" size={26} />
              </div>
              <p className="text-white font-bold text-lg">{t('successTitle')}</p>
              <p className="text-white/60 text-sm">{t('successMessage')}</p>
              <div className="w-full bg-[#0B1628] border border-gold/40 rounded-lg px-4 py-4 mt-2">
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">{t('successCodeLabel')}</p>
                <p className="font-mono text-2xl font-extrabold text-gold tracking-widest">{displayedCode}</p>
              </div>
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
              <div>
                <Label className="text-white/70 text-xs mb-1 block">{t('referralLabel')}</Label>
                <Input
                  value={referralSource}
                  onChange={e => setReferralSource(e.target.value)}
                  placeholder={t('referralPlaceholder')}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              {status === 'error' && <p className="text-red-400 text-sm">{t('errorMessage')}</p>}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#E63946] hover:bg-[#c0303b] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              >
                {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                {t('submitButton')}
              </button>
              <p className="text-[11px] text-white/40 text-center">{t('registrationRequiredNote')}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
