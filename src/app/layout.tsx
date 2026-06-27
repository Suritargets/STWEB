import { Geist, Geist_Mono } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import AnalyticsProvider from '@/components/shared/analytics-provider'
import CookieBanner from '@/components/shared/cookie-banner'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const locale = headersList.get('x-next-intl-locale') ?? 'nl'
  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">
        {children}
        <AnalyticsProvider />
        <CookieBanner />
      </body>
    </html>
  )
}
