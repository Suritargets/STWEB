'use client'

import dynamic from 'next/dynamic'

const ExplainerPlayer = dynamic(
  () => import('./explainer-player').then((m) => m.ExplainerPlayer),
  { ssr: false }
)

export function ExplainerSection() {
  return (
    <div className="border border-border">
      <ExplainerPlayer />
    </div>
  )
}
