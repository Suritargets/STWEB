'use client'

import { Radio, CalendarClock, ZoomIn, X } from 'lucide-react'
import { useState } from 'react'
import { AnimatedSection } from '@/components/shared/animated-section'
import { WebinarCtaSection } from '@/components/home/webinar-cta-section'

const NL = {
  badge: 'Gratis · Elke vrijdag',
  label: 'Webinar',
  heroTitle: 'Free AI Demo',
  heroSub: 'De nieuwste AI — live en praktisch uitgelegd, in slechts 20 minuten. Geen kosten, geen verplichtingen.',
  dateNote: 'Elke vrijdag online · eerstvolgende data: 11, 18 & 25 september 2026',
  flyerAlt: 'Free AI Demo — webinar flyer',
}

const EN = {
  badge: 'Free · Every Friday',
  label: 'Webinar',
  heroTitle: 'Free AI Demo',
  heroSub: 'The latest AI — explained live and hands-on, in just 20 minutes. No cost, no commitment.',
  dateNote: 'Every Friday online · upcoming dates: Sep 11, 18 & 25, 2026',
  flyerAlt: 'Free AI Demo — webinar flyer',
}

export function FreeAiDemoContent({ locale }: { locale: string }) {
  const c = locale === 'nl' ? NL : EN
  const [lightbox, setLightbox] = useState(false)

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2B3494] px-(--section-padding-x) py-(--section-padding-y)">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2.5 border border-white/20 bg-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-white font-bold">{c.badge}</span>
            </div>

            <p className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-white/50 mb-4">
              <Radio size={13} /> {c.label}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.05]">
              {c.heroTitle}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/65 font-mono max-w-2xl">
              {c.heroSub}
            </p>

            <div className="mt-10 inline-flex items-center gap-3 bg-white/8 border border-white/15 rounded-xl px-5 py-3">
              <CalendarClock size={16} className="text-[#E8192C] shrink-0" />
              <p className="text-sm text-white/70">{c.dateNote}</p>
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
              aria-label={`Open: ${c.flyerAlt}`}
              className="group relative block w-full max-w-sm rounded-lg overflow-hidden shadow-lg border border-border focus-visible:ring-2 focus-visible:ring-gold outline-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/flyers/flyer-webinar-ai-demo.png"
                alt={c.flyerAlt}
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
              src="/flyers/flyer-webinar-ai-demo.png"
              alt={c.flyerAlt}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Registration CTA (same as homepage) */}
      <WebinarCtaSection showMoreInfoLink={false} />
    </>
  )
}
