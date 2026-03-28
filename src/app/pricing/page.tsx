import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import PricingClient from './pricing-client'

export const metadata: Metadata = {
  title: `Pricing — ${siteConfig.name}`,
  description:
    'Transparante uurtarieven voor bedrijven en individuen. Van support tot custom development — volledig op maat.',
}

export default function PricingPage() {
  return <PricingClient />
}
