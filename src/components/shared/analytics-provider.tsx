'use client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useEffect } from 'react'

const COOKIE_KEY = 'st-cookie-consent'

export default function AnalyticsProvider() {
  useEffect(() => {
    // Track page time on unload
    const start = Date.now()
    const handleUnload = () => {
      const duration = Math.round((Date.now() - start) / 1000)
      if (navigator.sendBeacon) {
        // Send time-on-page as a beacon
        navigator.sendBeacon(
          '/api/analytics/beacon',
          JSON.stringify({
            path: window.location.pathname,
            duration,
            referrer: document.referrer || 'direct',
          })
        )
      }
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [])

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
