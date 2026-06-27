import type { Metadata } from 'next'
import { FinanceAccountingContent } from './_components/page-content'

// ─────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    title: isNl
      ? 'Finance & Accounting Inhouse Training — Claude Desktop + Excel | Suritargets'
      : 'Finance & Accounting Inhouse Training — Claude Desktop + Excel | Suritargets',
    description: isNl
      ? 'Suritargets zet Claude op in jullie accountantskantoor. We brengen use-cases in kaart, bouwen tools en trainen het team. Jullie abonnement, onze begeleiding.'
      : 'Suritargets sets up Claude in your accounting firm. We map use-cases, build tools and train your team. Your subscription, our guidance.',
  }
}

// ─────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────

export default async function FinanceAccountingClaudePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <FinanceAccountingContent locale={locale} />
}
