'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ServiceSlugError({
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
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">Services</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">Dienst niet gevonden</h1>
        <p className="text-muted-foreground mb-8">
          Deze dienst bestaat niet of kon niet worden geladen.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="bg-[#2B3494] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#232a7a] transition-colors"
          >
            Opnieuw proberen
          </button>
          <Link
            href="/services"
            className="border border-border text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-surface transition-colors"
          >
            Alle diensten
          </Link>
        </div>
      </div>
    </div>
  )
}
