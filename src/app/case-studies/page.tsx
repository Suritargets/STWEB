import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/coming-soon'

export const metadata: Metadata = {
  title: 'Cases',
  description: 'Projectcases van Suritargets — binnenkort beschikbaar.',
}

export default function CaseStudiesPage() {
  return (
    <ComingSoon
      title="Cases"
      description="Binnenkort publiceren wij onze projectcases en resultaten."
    />
  )
}
