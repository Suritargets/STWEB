'use client'
import dynamic from 'next/dynamic'
import { InfomercialGraphic } from './infomercial-graphic'

const ExplainerPlayer = dynamic(
  () => import('./explainer-player').then((m) => m.ExplainerPlayer),
  { loading: () => <InfomercialGraphic /> }
)

export function ExplainerSection() {
  return (
    <div className="border border-border overflow-hidden">
      <ExplainerPlayer />
    </div>
  )
}
