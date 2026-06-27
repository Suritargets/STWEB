import type { Metadata } from 'next'
import { AiHandsOnDeckContent } from './_components/page-content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    title: isNl
      ? 'AI – Hands On Deck Q3 2026 | Suritargets Education'
      : 'AI – Hands On Deck Q3 2026 | Suritargets Education',
    description: isNl
      ? 'Hands-on AI training voor professionals — elk kwartaal bijgewerkt met de nieuwste tools en toepassingen. Leer werken met AI in de praktijk.'
      : 'Hands-on AI training for professionals — updated every quarter with the latest tools and applications. Learn to work with AI in practice.',
  }
}

export default async function AiHandsOnDeckPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <AiHandsOnDeckContent locale={locale} />
}
