import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import AnalyticsProvider from '@/components/shared/analytics-provider'
import CookieBanner from '@/components/shared/cookie-banner'
import { routing } from '@/i18n/routing'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' })

// Deliberately static (not read via headers()/cookies()) so this layout — and every page under
// it — stays statically renderable and cacheable. LangSetter (in the [locale] layout) corrects
// `lang` client-side for non-default locales immediately after hydration.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={routing.defaultLocale} className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">
        {children}
        <AnalyticsProvider />
        <CookieBanner />
      </body>
    </html>
  )
}
