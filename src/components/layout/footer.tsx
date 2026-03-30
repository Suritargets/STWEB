'use client'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/lib/services-data'

const businessServices = services.filter((s) => s.type === 'business')
const individualServices = services.filter((s) => s.type === 'individual')

export default function Footer() {
  const t = useTranslations('footer')
  const ts = useTranslations('servicesData')

  return (
    <footer className="border-t border-border bg-[#2B3494] mt-0">
      <div className="max-w-[1440px] mx-auto px-[var(--section-padding-x)] py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <p className="font-mono text-sm font-bold tracking-widest uppercase text-white mb-4">
            {siteConfig.name}
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}, {siteConfig.address.country}
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="block text-white/70 text-sm mt-2 hover:text-white transition-colors"
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Business Services */}
        <div>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/70 mb-1">
            {t('services')}
          </p>
          <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-4">
            {t('voorBedrijven')}
          </p>
          <ul className="space-y-2">
            {businessServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {ts(`${s.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Individual Services */}
        <div>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/70 mb-1">
            &nbsp;
          </p>
          <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-4">
            {t('voorIndividuen')}
          </p>
          <ul className="space-y-2">
            {individualServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {ts(`${s.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/70 mb-4">
            {t('company')}
          </p>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">{t('overOns')}</Link></li>
            <li><Link href="/case-studies" className="text-sm text-white/70 hover:text-white transition-colors">{t('cases')}</Link></li>
            <li><Link href="/insights" className="text-sm text-white/70 hover:text-white transition-colors">{t('insights')}</Link></li>
            <li><Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors">{t('contact')}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 px-[var(--section-padding-x)] py-4 max-w-[1440px] mx-auto flex justify-between items-center">
        <p className="text-xs text-white/70 font-mono">
          © {new Date().getFullYear()} {siteConfig.name}. {t('rights')}
        </p>
        <p className="text-xs text-white/70 font-mono">{t('location')}</p>
      </div>
    </footer>
  )
}
