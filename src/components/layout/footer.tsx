import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/lib/services-data'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-0">
      <div className="max-w-[1440px] mx-auto px-[var(--section-padding-x)] py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p className="font-mono text-sm font-bold tracking-widest uppercase text-gold mb-4">
            {siteConfig.name}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}, {siteConfig.address.country}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="block text-muted-foreground text-sm mt-2 hover:text-gold transition-colors"
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Services
          </p>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Company
          </p>
          <ul className="space-y-2">
            {[
              { label: 'Over ons', href: '/about' },
              { label: 'Cases', href: '/case-studies' },
              { label: 'Insights', href: '/insights' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-[var(--section-padding-x)] py-4 max-w-[1440px] mx-auto flex justify-between items-center">
        <p className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground font-mono">Paramaribo, Suriname</p>
      </div>
    </footer>
  )
}
