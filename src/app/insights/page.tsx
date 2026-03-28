import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/coming-soon'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Marktinzichten en analyses van Suritargets — binnenkort beschikbaar.',
}

export default function InsightsPage() {
  return (
    <ComingSoon
      title="Insights"
      description="Analyses, onderzoeksartikelen en inzichten uit de Caribische markt — binnenkort."
    />
  )
}
