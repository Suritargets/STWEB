'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { CtaButton } from '@/components/shared/cta-button'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto px-[var(--section-padding-x)] h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-widest uppercase text-foreground hover:text-gold transition-colors"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
              {item.comingSoon && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 border border-border text-muted-foreground">
                  soon
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CtaButton href="/contact" variant="primary" className="text-xs py-2 px-4">
            Contact
          </CtaButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-border px-[var(--section-padding-x)] py-6 flex flex-col gap-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
              {item.comingSoon && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 border border-border text-muted-foreground">
                  soon
                </span>
              )}
            </Link>
          ))}
          <CtaButton href="/contact" variant="primary" className="w-fit text-xs">
            Contact
          </CtaButton>
        </div>
      )}
    </header>
  )
}
