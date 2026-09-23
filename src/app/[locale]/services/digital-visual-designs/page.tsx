import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildMetadata } from '@/lib/page-metadata'
import { DigitalVisualDesignsContent } from './_components/page-content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'digitalVisualDesigns.meta' })
  return buildMetadata({
    locale,
    path: 'services/digital-visual-designs',
    title: t('title'),
    description: t('description'),
  })
}

export default async function DigitalVisualDesignsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <DigitalVisualDesignsContent />
}
