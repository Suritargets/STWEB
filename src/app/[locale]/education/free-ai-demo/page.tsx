import type { Metadata } from 'next'
import { FreeAiDemoContent } from './_components/page-content'
import { buildMetadata } from '@/lib/page-metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return buildMetadata({
    locale,
    path: 'education/free-ai-demo',
    title: isNl
      ? 'Free AI Demo — Gratis Webinar | Suritargets Education'
      : 'Free AI Demo — Free Webinar | Suritargets Education',
    description: isNl
      ? 'Gratis live AI-demo webinar van 20 minuten, elke vrijdag online. Meld je aan en ontvang een kortingscode voor de AI Hands-On Deck training.'
      : 'Free 20-minute live AI demo webinar, every Friday online. Register and receive a discount code for the AI Hands-On Deck training.',
  })
}

export default async function FreeAiDemoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <FreeAiDemoContent locale={locale} />
}
