import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { LangSetter } from '@/components/shared/lang-setter'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.meta' })
  return {
    title: {
      default: 'Suritargets — Business Intelligence & Digital Solutions',
      template: '%s | Suritargets',
    },
    description: t('description'),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suritargets.com'
    ),
    openGraph: {
      type: 'website',
      locale: locale.replace('-', '_'),
      siteName: 'Suritargets',
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }
  const messages = await getMessages()

  return (
    <div className="flex flex-col min-h-full bg-background text-foreground">
      <LangSetter locale={locale} />
      <NextIntlClientProvider messages={messages}>
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  )
}
