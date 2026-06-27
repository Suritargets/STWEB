import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import AnalyticsProvider from '@/components/shared/analytics-provider'
import CookieBanner from '@/components/shared/cookie-banner'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">
        {children}
        <AnalyticsProvider />
        <CookieBanner />
      </body>
    </html>
  )
}
