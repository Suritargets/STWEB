import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact-form'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Neem contact op met Suritargets voor een vrijblijvend gesprek over uw project.',
}

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      <section className="px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            {/* Left column — contact info */}
            <div className="space-y-8">
              {/* Label + titles */}
              <div>
                <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  CONTACT
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-1">
                  Neem contact op
                </h1>
                <p className="text-muted-foreground text-base">
                  Get in touch
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                Wij staan klaar om uw vragen te beantwoorden en uw project te
                bespreken.
              </p>

              {/* Gold accent bar */}
              <div className="border-l-2 border-gold pl-4 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Reactietijd
                </p>
                <p className="text-foreground text-sm font-medium">
                  1–2 werkdagen
                </p>
              </div>

              {/* Address + email */}
              <div className="space-y-5">
                {/* Address block */}
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    Adres
                  </p>
                  <address className="not-italic text-foreground text-sm leading-relaxed">
                    <span className="block">{siteConfig.address.street}</span>
                    <span className="block">{siteConfig.address.city}</span>
                    <span className="block">{siteConfig.address.country}</span>
                  </address>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    E-mail
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-gold text-sm hover:underline underline-offset-4 transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Geometric accent */}
              <div className="relative w-24 h-24 hidden md:block" aria-hidden="true">
                <div className="absolute inset-0 border border-gold/30" />
                <div className="absolute inset-3 border border-gold/20" />
                <div className="absolute inset-6 border border-gold/10" />
                <div className="absolute inset-[42px] bg-gold/20" />
              </div>
            </div>

            {/* Right column — form */}
            <div className="bg-surface border border-border p-6 md:p-8">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Stuur ons een bericht
              </h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
