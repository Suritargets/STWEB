import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import PricingClient from './pricing-client'
import { buildMetadata } from '@/lib/page-metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pricing.meta' })
  return buildMetadata({ locale, path: 'pricing', title: t('title'), description: t('description') })
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

export default function PricingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PricingClient />
    </Suspense>
  )
}
