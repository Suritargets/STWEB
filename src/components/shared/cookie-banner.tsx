'use client'
import { useState, useEffect } from 'react'

const COOKIE_KEY = 'st-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-3xl mx-auto bg-[#0B1628] border border-zinc-700 rounded-xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-white mb-1">
            Cookies & Privacy
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Wij gebruiken cookies voor analytics om de website te verbeteren.
            Geen persoonlijke data wordt gedeeld met derden.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs font-medium text-zinc-400 border border-zinc-600 rounded-lg hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
          >
            Weigeren
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-medium text-white bg-[#2B3494] rounded-lg hover:bg-[#232b7a] transition-colors"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  )
}
