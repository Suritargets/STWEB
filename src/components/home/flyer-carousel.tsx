'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

const FLYERS = [
  { src: '/flyers/flyer-suritargets-en.png',      alt: 'Social Media Visuals that sell' },
  { src: '/flyers/flyer-webinar-ai-demo.png',     alt: 'Free AI Demo — Webinar' },
  { src: '/flyers/flyer-masterclass-ai.png',      alt: 'Hands-On-Deck AI Technology · $750/seat' },
  { src: '/flyers/flyer-masterclass-inhouse.png', alt: 'Hands-On-Deck AI Technology In-House · $400/person' },
]

export function FlyerCarousel() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevImage = useCallback(() => setLightbox(i => i !== null ? Math.max(0, i - 1) : null), [])
  const nextImage = useCallback(() => setLightbox(i => i !== null ? Math.min(FLYERS.length - 1, i + 1) : null), [])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, prevImage, nextImage])

  return (
    <>
      {/* ── Carousel strip ── */}
      <div className="relative group/carousel">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-background border border-border shadow flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold transition-colors opacity-0 group-hover/carousel:opacity-100 duration-200"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Scrollable row — [no-scrollbar] utility hides the scrollbar cross-browser */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FLYERS.map((flyer, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setLightbox(i)}
              aria-label={`Open: ${flyer.alt}`}
              className="relative shrink-0 snap-start w-52 md:w-60 rounded-lg overflow-hidden shadow-md border border-border group/card focus-visible:ring-2 focus-visible:ring-gold outline-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flyer.src}
                alt={flyer.alt}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover/card:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <ZoomIn className="text-white w-8 h-8 drop-shadow" />
              </div>
            </button>
          ))}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-background border border-border shadow flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold transition-colors opacity-0 group-hover/carousel:opacity-100 duration-200"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Modal box */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh] max-w-3xl w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">{FLYERS[lightbox].alt}</span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close"
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Image */}
            <div className="overflow-auto flex items-center justify-center bg-gray-50 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FLYERS[lightbox].src}
                alt={FLYERS[lightbox].alt}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Footer: prev / dots / next */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
              <button
                type="button"
                onClick={prevImage}
                disabled={lightbox === 0}
                aria-label="Previous"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-25 transition-colors"
              >
                <ChevronLeft size={16} /> Vorige
              </button>

              <div className="flex gap-2">
                {FLYERS.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setLightbox(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors ${i === lightbox ? 'bg-gray-800' : 'bg-gray-300 hover:bg-gray-500'}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextImage}
                disabled={lightbox === FLYERS.length - 1}
                aria-label="Next"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-25 transition-colors"
              >
                Volgende <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
