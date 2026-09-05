import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { LangSetter } from '@/components/shared/lang-setter'
import { siteConfig } from '@/lib/site-config'

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
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: 'website',
      locale: locale.replace('-', '_'),
      siteName: 'Suritargets',
      title: 'Suritargets — Business Intelligence & Digital Solutions',
      description: t('description'),
      url: `${siteConfig.url}/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Suritargets — Business Intelligence & Digital Solutions',
      description: t('description'),
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${siteConfig.url}/${l}`])
      ),
    },
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
  // Populates next-intl's request-scoped locale from the route param (not headers()),
  // so this layout and every page under it can stay statically rendered and cacheable.
  setRequestLocale(locale)
  const messages = await getMessages()

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    sameAs: Object.values(siteConfig.social),
  }

  return (
    <div className="flex flex-col min-h-full bg-background text-foreground">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <LangSetter locale={locale} />
      <NextIntlClientProvider messages={messages}>
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  )
}
