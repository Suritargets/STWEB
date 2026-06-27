'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">Error</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">Er is iets misgegaan</h1>
        <p className="text-muted-foreground mb-8">
          Deze pagina kon niet worden geladen. Probeer het opnieuw of ga terug naar de homepage.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="bg-[#2B3494] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#232a7a] transition-colors"
          >
            Opnieuw proberen
          </button>
          <Link
            href="/"
            className="border border-border text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-surface transition-colors"
          >
            Naar homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
