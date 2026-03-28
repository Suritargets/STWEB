import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Suritargets — Business Intelligence & Digital Solutions',
    template: '%s | Suritargets',
  },
  description:
    'Suritargets levert strategische bedrijfsondersteuning, web applicaties, onderzoek en digitale oplossingen in Suriname en de Caribische regio.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suritargets.com'
  ),
  openGraph: {
    type: 'website',
    locale: 'nl_SR',
    alternateLocale: 'en_US',
    siteName: 'Suritargets',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
