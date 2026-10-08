import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import AnalyticsProvider from '@/components/shared/analytics-provider'
import CookieBanner from '@/components/shared/cookie-banner'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' })

// Shared <html>/<body> for the app's two root layouts ([locale] and admin). `lang` is passed in
// from the route so crawlers that don't run JavaScript see the page's real language.
export function HtmlShell({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">
        {children}
        <AnalyticsProvider />
        <CookieBanner />
      </body>
    </html>
  )
}
