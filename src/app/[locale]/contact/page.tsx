import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ContactForm } from '@/components/contact/contact-form'
import { siteConfig } from '@/lib/site-config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact.meta' })
  return { title: t('title'), description: t('description') }
}

function ContactContent() {
  const t = useTranslations('contact')

  return (
    <main className="bg-background min-h-screen">
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
            {/* Left column */}
            <div className="space-y-8">
              <div>
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">{t('label')}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-1">{t('title')}</h1>
                <p className="text-muted-foreground text-base">{t('titleEn')}</p>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed max-w-md">{t('description')}</p>
              <div className="border-l-2 border-gold pl-4 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{t('responseTimeLabel')}</p>
                <p className="text-foreground text-sm font-medium">{t('responseTime')}</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{t('addressLabel')}</p>
                  <address className="not-italic text-foreground text-sm leading-relaxed">
                    <span className="block">{siteConfig.address.street}</span>
                    <span className="block">{siteConfig.address.city}</span>
                    <span className="block">{siteConfig.address.country}</span>
                  </address>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{t('emailLabel')}</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-gold text-sm hover:underline underline-offset-4 transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="relative w-24 h-24 hidden md:block" aria-hidden="true">
                <div className="absolute inset-0 border border-gold/30" />
                <div className="absolute inset-3 border border-gold/20" />
                <div className="absolute inset-6 border border-gold/10" />
                <div className="absolute inset-[42px] bg-gold/20" />
              </div>
            </div>

            {/* Right column — form */}
            <div className="bg-surface border border-border p-6 md:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-6">{t('formTitle')}</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function ContactPage() {
  return <ContactContent />
}
