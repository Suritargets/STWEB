# Suritargets Website — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Phase 1 Suritargets company website — Home, About, Services (hub + 5 detail pages), Contact, 404, and Coming Soon pages — as a premium, no-photo, typographic multi-page Next.js 15 site deployed on Cloudways.

**Architecture:** Next.js 15 App Router with `output: 'standalone'` for Cloudways/PM2 deployment. Static pages use SSG, contact form uses a Route Handler with MariaDB persistence and Resend email. shadcn/ui components are heavily customized with a Navy/Gold design token system. No CMS in Phase 1 — all content is in TypeScript constants.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, Geist (next/font), MariaDB (mysql2), Resend, Zod, Playwright (E2E), Jest + React Testing Library (unit)

**Spec:** `docs/superpowers/specs/2026-03-28-suritargets-website-design.md`

---

## File Map

```
app/
  layout.tsx                          # Root layout: fonts, metadata, nav, footer
  globals.css                         # Design tokens (CSS custom properties + @theme)
  opengraph-image.tsx                 # Default OG image (Satori)
  page.tsx                            # Home
  not-found.tsx                       # 404
  about/page.tsx
  about/opengraph-image.tsx
  services/page.tsx                   # Services hub
  services/[slug]/page.tsx            # Dynamic service detail (generateStaticParams)
  services/[slug]/opengraph-image.tsx
  case-studies/page.tsx               # Coming soon (Phase 2)
  insights/page.tsx                   # Coming soon (Phase 2)
  contact/page.tsx
  api/contact/route.ts                # Contact form handler

components/
  layout/
    nav.tsx                           # Top nav with gold CTA + coming-soon badges
    footer.tsx                        # Footer: address, links, copyright
  shared/
    section-heading.tsx               # Reusable section title + subtitle
    animated-section.tsx              # Scroll-triggered fade-in wrapper
    cta-button.tsx                    # Gold primary / ghost secondary button
    coming-soon.tsx                   # Branded placeholder page
  home/
    hero.tsx                          # Full-viewport hero
    services-grid.tsx                 # 5 service cluster cards
    why-suritargets.tsx               # 3-column differentiators
    trust-signals.tsx                 # Industries / placeholder logos
    cta-banner.tsx                    # Full-width CTA section
  about/
    (all about content inlined in app/about/page.tsx)
  contact/
    contact-form.tsx                  # Controlled form with validation (contact info inlined in page)

lib/
  db.ts                               # MariaDB connection pool (mysql2)
  email.ts                            # Resend send functions
  validations.ts                      # Zod schemas (contact form)
  services-data.ts                    # All service content as typed constants
  site-config.ts                      # Nav links, company info, metadata defaults

tests/
  e2e/
    contact-form.spec.ts              # Playwright: form submit, validation, success
    navigation.spec.ts                # Playwright: all routes load, nav works
  unit/
    validations.test.ts               # Jest: Zod schema edge cases
    contact-route.test.ts             # Jest: Route Handler logic

next.config.ts
jest.config.ts
playwright.config.ts
.env.local.example
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`
- Create: `.env.local.example`
- Create: `app/globals.css`

- [ ] **Step 1: Scaffold Next.js 15 project**

```bash
cd "D:/apps lab/surtargets"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes
```

- [ ] **Step 2: Install core dependencies**

```bash
npm install mysql2 resend zod tw-animate-css
npm install -D @playwright/test @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom ts-jest
```

- [ ] **Step 3: Install shadcn/ui**

```bash
npx shadcn@latest init
```
When prompted: Style = Default, Base color = Slate, CSS variables = yes.

- [ ] **Step 4: Install shadcn components needed for Phase 1**

```bash
npx shadcn@latest add button input textarea label select card badge separator navigation-menu sheet
```

- [ ] **Step 5: Install Geist font**

```bash
npm install geist
```

- [ ] **Step 6: Set `output: 'standalone'` in next.config.ts**

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
```

- [ ] **Step 7: Verify tsconfig.json has `resolveJsonModule` and add `jest.config.ts`**

First, open `tsconfig.json` and confirm `compilerOptions` includes:
```json
"resolveJsonModule": true,
"paths": { "@/*": ["./*"] }
```
The `create-next-app` scaffold with `--import-alias="@/*"` adds the `paths` entry. Add `resolveJsonModule: true` if missing.

Then create:
```ts
// jest.config.ts
import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testMatch: ['**/tests/unit/**/*.test.ts'],
}

export default config
```

- [ ] **Step 8: Create `.env.local.example`**

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=suritargets
DB_PASSWORD=
DB_NAME=suritargets_db

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM=noreply@suritargets.com
RESEND_TO=info@suritargets.com

# App
NEXT_PUBLIC_SITE_URL=https://suritargets.com
```

- [ ] **Step 9: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with shadcn/ui, dependencies, and jest config"
```

---

## Task 2: Design Token System

**Files:**
- Modify: `app/globals.css`

> **Tailwind v4 note:** Theme customization is done via `@theme {}` in CSS — NOT via `tailwind.config.ts`. The `tailwind.config.ts` file is only for content globs and plugins in v4.

This task establishes the entire visual system. Everything else inherits from here.

- [ ] **Step 1: Replace globals.css with design token system + @theme**

```css
/* app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* ─── Brand Design Tokens ─────────────────────────────── */
:root {
  --color-primary: #0B1628;
  --color-surface: #111E35;
  --color-surface-2: #172440;
  --color-secondary: #F0F4FF;
  --color-accent: #C9A84C;
  --color-accent-hover: #DDB95A;
  --color-text-on-dark: #E8EDF5;
  --color-text-muted: #6B7A99;
  --color-text-on-light: #0B1628;
  --color-border: #1E3050;
  --section-padding-y: clamp(4rem, 8vw, 8rem);
  --section-padding-x: clamp(1.25rem, 5vw, 5rem);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-base: 220ms;
}

/* ─── Tailwind v4 Theme ───────────────────────────────── */
@theme {
  --color-primary: #0B1628;
  --color-surface: #111E35;
  --color-surface-2: #172440;
  --color-accent: #C9A84C;
  --color-accent-hover: #DDB95A;
  --color-text-on-dark: #E8EDF5;
  --color-text-muted: #6B7A99;
  --color-border: #1E3050;

  --font-family-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: var(--font-geist-mono), ui-monospace, monospace;

  --font-size-hero: clamp(3rem, 7vw, 6rem);
  --font-size-h1: clamp(2.25rem, 5vw, 4rem);
  --font-size-h2: clamp(1.75rem, 3.5vw, 3rem);
  --font-size-h3: clamp(1.25rem, 2.5vw, 2rem);

  --max-width-site: 1440px;

  --radius: 4px;
}

/* ─── Base ────────────────────────────────────────────── */
* { box-sizing: border-box; border-color: var(--color-border); }

body {
  background-color: var(--color-primary);
  color: var(--color-text-on-dark);
  font-family: var(--font-family-sans);
  -webkit-font-smoothing: antialiased;
}

/* Focus indicator — WCAG 2.1 AA */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* ─── Scroll animations ───────────────────────────────── */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
}
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-base) var(--ease-out-expo),
              transform var(--duration-base) var(--ease-out-expo);
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add brand design token system with Tailwind v4 @theme and focus styles"
```

---

## Task 3: Site Config & Services Data

**Files:**
- Create: `lib/site-config.ts`
- Create: `lib/services-data.ts`

All content lives here. Pages import from these constants — no hardcoded strings in components.

- [ ] **Step 1: Create site-config.ts**

```ts
// lib/site-config.ts
export const siteConfig = {
  name: 'Suritargets',
  tagline: 'Niet van de plank. Volledig op maat.',
  taglineEn: 'Not off the shelf. Fully tailored.',
  description: 'Business tech support op maat voor het Caribisch gebied. Research, FinTech, Web & App Services, Forensics en Education.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suritargets.com',
  address: {
    street: 'Dr. Sophie Redmonstraat 244',
    city: 'Paramaribo',
    country: 'Suriname',
  },
  email: 'info@suritargets.com',
  founder: 'Ken Alimoestar',
  nav: [
    { label: 'Over ons', href: '/about', comingSoon: false },
    { label: 'Services', href: '/services', comingSoon: false },
    { label: 'Cases', href: '/case-studies', comingSoon: true },
    { label: 'Insights', href: '/insights', comingSoon: true },
  ],
  social: {
    linkedin: 'https://linkedin.com/company/suritargets',
  },
} as const
```

- [ ] **Step 2: Create services-data.ts**

```ts
// lib/services-data.ts
export type ServiceCluster = {
  slug: string
  name: string
  nameEn: string
  shortDescription: string
  shortDescriptionEn: string
  description: string
  whoIsItFor: string
  deliverables: string[]
  icon: string // lucide icon name
}

export const services: ServiceCluster[] = [
  {
    slug: 'business-support',
    name: 'Business Support',
    nameEn: 'Business Support Services',
    shortDescription: 'FinTech, HR, business strategie en productontwikkeling op maat.',
    shortDescriptionEn: 'FinTech, HR, business strategy and product development tailored to your goals.',
    description: 'Wij ondersteunen organisaties met strategische business services: van FinTech-implementaties tot HR-processen en productontwikkeling. Geen generieke oplossingen — elk traject is ontworpen voor uw specifieke context.',
    whoIsItFor: 'Organisaties in de financiële sector, MKB, en bedrijven die hun operationele processen willen moderniseren.',
    deliverables: ['FinTech strategie en implementatie', 'HR proces optimalisatie', 'Business analyse & roadmap', 'Product development begeleiding'],
    icon: 'briefcase',
  },
  {
    slug: 'web-applications',
    name: 'Web & Applicaties',
    nameEn: 'Web & Application Services',
    shortDescription: 'UI/UX design, applicatieontwikkeling en web business support.',
    shortDescriptionEn: 'UI/UX design, application development and web business support.',
    description: 'Van concept tot live platform: wij bouwen web- en mobiele applicaties die aansluiten op uw bedrijfsprocessen. Scherp ontwerp, robuuste technologie, geen van-de-plank-templates.',
    whoIsItFor: 'Bedrijven die een custom platform, interne tool of klantgerichte applicatie nodig hebben.',
    deliverables: ['UI/UX design (wireframes, prototypes)', 'Web applicatie ontwikkeling', 'Mobile-first responsive interfaces', 'Ongoing web business support'],
    icon: 'monitor',
  },
  {
    slug: 'research',
    name: 'Research & Development',
    nameEn: 'Research & Development',
    shortDescription: 'Technologisch onderzoek en innovatie voor uw sector.',
    shortDescriptionEn: 'Technology research and innovation for your sector.',
    description: 'Wij onderzoeken technologische mogelijkheden en bouwen proof-of-concepts voor organisaties die voorop willen lopen. Van AI-toepassingen tot blockchain-integraties.',
    whoIsItFor: 'Organisaties die willen innoveren maar niet weten waar te beginnen, of die intern geen R&D capaciteit hebben.',
    deliverables: ['Technologie landscape analyse', 'Proof-of-concept ontwikkeling', 'Innovatie roadmap', 'R&D rapportage'],
    icon: 'flask-conical',
  },
  {
    slug: 'forensics',
    name: 'Forensics & Integriteit',
    nameEn: 'Forensics & Integrity Services',
    shortDescription: 'Digitaal forensisch onderzoek en integriteitsaudits.',
    shortDescriptionEn: 'Digital forensic investigation and integrity audits.',
    description: 'Wij bieden digitaal forensisch onderzoek, compliance-audits en integriteitsreviews voor overheid, financiële instellingen en bedrijven. Vertrouwelijk, grondig en onafhankelijk.',
    whoIsItFor: 'Overheidsinstanties, financiële instellingen, en bedrijven die een onafhankelijk forensisch onderzoek nodig hebben.',
    deliverables: ['Digitaal forensisch onderzoek', 'Compliance & integriteitsaudit', 'Rapportage & aanbevelingen', 'Incident response begeleiding'],
    icon: 'shield-check',
  },
  {
    slug: 'education',
    name: 'Education',
    nameEn: 'Education & Innovation',
    shortDescription: 'Training in Blockchain, AI, FinTech en business innovatie.',
    shortDescriptionEn: 'Training in Blockchain, AI, FinTech and business innovation.',
    description: 'Wij verzorgen op maat gemaakte trainingen en workshops voor organisaties die hun teams willen bijscholen in opkomende technologieën en innovatieve bedrijfsmodellen.',
    whoIsItFor: 'Bedrijven en instellingen die hun medewerkers willen trainen in AI, Blockchain, FinTech of innovatief denken.',
    deliverables: ['Blockchain technologie training', 'AI & machine learning workshop', 'FinTech innovatie programma', 'Business innovation masterclass'],
    icon: 'graduation-cap',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add lib/site-config.ts lib/services-data.ts
git commit -m "feat: add site config and services data constants"
```

---

## Task 4: Root Layout & Fonts

> **Sequencing note:** This task imports `Nav` and `Footer` from Task 6. The layout will have broken imports until Task 6 is complete. Implement Tasks 5 and 6 before running `next dev` after this task.

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write root layout with Geist fonts and metadata**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'nl_SR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-primary text-text-on-dark font-sans antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Geist fonts and base metadata"
```

---

## Task 5: Shared Components

**Files:**
- Create: `components/shared/animated-section.tsx`
- Create: `components/shared/section-heading.tsx`
- Create: `components/shared/cta-button.tsx`
- Create: `components/shared/coming-soon.tsx`

- [ ] **Step 1: Create AnimatedSection (scroll-triggered fade-in)**

```tsx
// components/shared/animated-section.tsx
'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number // ms stagger
}

export function AnimatedSection({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('is-visible'), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={cn('animate-on-scroll', className)}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Create SectionHeading**

```tsx
// components/shared/section-heading.tsx
import { cn } from '@/lib/utils'

type Props = {
  label?: string         // Small ALL-CAPS label above
  title: string
  titleEn?: string       // English subtitle
  description?: string
  className?: string
  center?: boolean
}

export function SectionHeading({ label, title, titleEn, description, className, center }: Props) {
  return (
    <div className={cn('mb-12', center && 'text-center', className)}>
      {label && (
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4">
          {label}
        </p>
      )}
      <h2 className="text-h2 text-text-on-dark">{title}</h2>
      {titleEn && (
        <p className="text-lg text-text-muted mt-1 font-mono">{titleEn}</p>
      )}
      {description && (
        <p className="mt-4 text-body-lg text-text-muted max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create CtaButton**

```tsx
// components/shared/cta-button.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}

export function CtaButton({ href, children, variant = 'primary', className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200',
        variant === 'primary' && 'bg-accent text-primary hover:bg-accent-hover',
        variant === 'ghost' && 'border border-accent text-accent hover:bg-accent hover:text-primary',
        className
      )}
    >
      {children}
    </Link>
  )
}
```

- [ ] **Step 4: Create ComingSoon placeholder**

```tsx
// components/shared/coming-soon.tsx
import { CtaButton } from './cta-button'

type Props = { title: string; description: string }

export function ComingSoon({ title, description }: Props) {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-lg">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-6">
          Coming Soon
        </p>
        <h1 className="text-h1 mb-4">{title}</h1>
        <p className="text-text-muted mb-8">{description}</p>
        <CtaButton href="/" variant="ghost">Terug naar home</CtaButton>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add components/shared/
git commit -m "feat: add shared animated-section, section-heading, cta-button, coming-soon"
```

---

## Task 6: Navigation & Footer

**Files:**
- Create: `components/layout/nav.tsx`
- Create: `components/layout/footer.tsx`

- [ ] **Step 1: Create Nav**

```tsx
// components/layout/nav.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { CtaButton } from '@/components/shared/cta-button'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-primary/95 backdrop-blur-sm">
      <div className="max-w-site mx-auto px-[var(--section-padding-x)] h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-bold tracking-widest uppercase text-text-on-dark hover:text-accent transition-colors">
          {siteConfig.name}
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-text-on-dark transition-colors"
            >
              {item.label}
              {item.comingSoon && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 border border-border text-text-muted">
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
        {/* Mobile hamburger */}
        <button className="md:hidden text-text-on-dark" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-border px-[var(--section-padding-x)] py-6 flex flex-col gap-4">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-text-muted hover:text-text-on-dark" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <CtaButton href="/contact" variant="primary" className="w-fit text-xs">Contact</CtaButton>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Create Footer**

```tsx
// components/layout/footer.tsx
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { services } from '@/lib/services-data'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-0">
      <div className="max-w-site mx-auto px-[var(--section-padding-x)] py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-mono text-sm font-bold tracking-widest uppercase text-accent mb-4">
            {siteConfig.name}
          </p>
          <p className="text-text-muted text-sm leading-relaxed">
            {siteConfig.address.street}<br />
            {siteConfig.address.city}, {siteConfig.address.country}
          </p>
          <p className="text-text-muted text-sm mt-2">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-accent transition-colors">
              {siteConfig.email}
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-text-muted mb-4">Services</p>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-text-muted hover:text-accent transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-text-muted mb-4">Company</p>
          <ul className="space-y-2">
            {[
              { label: 'Over ons', href: '/about' },
              { label: 'Cases', href: '/case-studies' },
              { label: 'Insights', href: '/insights' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-text-muted hover:text-accent transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-[var(--section-padding-x)] py-4 max-w-site mx-auto flex justify-between items-center">
        <p className="text-xs text-text-muted font-mono">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-xs text-text-muted font-mono">Paramaribo, Suriname</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/
git commit -m "feat: add nav and footer with mobile hamburger menu"
```

---

## Task 7: Home Page

**Files:**
- Create: `components/home/hero.tsx`
- Create: `components/home/services-grid.tsx`
- Create: `components/home/why-suritargets.tsx`
- Create: `components/home/trust-signals.tsx`
- Create: `components/home/cta-banner.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Hero component**

```tsx
// components/home/hero.tsx
import { CtaButton } from '@/components/shared/cta-button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Abstract grid background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" className="opacity-[0.04]">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Gold accent line */}
        <div className="absolute top-1/3 left-0 w-24 h-px bg-accent opacity-60" />
      </div>

      <div className="max-w-site mx-auto px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <div className="max-w-4xl">
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-accent mb-8">
            Suritargets — Paramaribo, Suriname
          </p>
          <h1 className="text-hero text-text-on-dark mb-6 leading-none">
            Business Tech
            <br />
            <span className="text-accent">Op Maat.</span>
          </h1>
          <p className="text-body-lg text-text-muted max-w-xl mb-4">
            Niet van de plank. Volledig toegesneden op uw organisatie.
          </p>
          <p className="text-sm font-mono text-text-muted/60 max-w-xl mb-12">
            Not off the shelf. Fully tailored to your organisation.
          </p>
          <div className="flex flex-wrap gap-4">
            <CtaButton href="/services" variant="primary">
              Onze Services
            </CtaButton>
            <CtaButton href="/contact" variant="ghost">
              Neem Contact Op
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: ServicesGrid component**

```tsx
// components/home/services-grid.tsx
import Link from 'next/link'
import { services } from '@/lib/services-data'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'

export function ServicesGrid() {
  return (
    <section className="py-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto">
      <AnimatedSection>
        <SectionHeading
          label="Wat wij doen"
          title="Onze Services"
          titleEn="Our Services"
          description="Vijf service clusters, elk ontworpen voor specifieke uitdagingen in het Caribisch bedrijfsleven."
        />
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => (
          <AnimatedSection key={service.slug} delay={i * 60}>
            <Link
              href={`/services/${service.slug}`}
              className="group block p-6 border border-border bg-surface hover:border-accent transition-all duration-200 h-full"
            >
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-accent mb-4">
                0{i + 1}
              </p>
              <h3 className="text-h3 text-text-on-dark mb-3 group-hover:text-accent transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {service.shortDescription}
              </p>
              <p className="text-xs font-mono text-text-muted/50 mt-2">
                {service.shortDescriptionEn}
              </p>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: WhySuritargets component**

```tsx
// components/home/why-suritargets.tsx
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'

const differentiators = [
  {
    number: '01',
    title: 'Custom & Op Maat',
    titleEn: 'Custom & Tailored',
    description: 'Elk project begint met een grondige analyse van uw organisatie. Geen templates, geen shortcuts.',
  },
  {
    number: '02',
    title: 'Caribbean Expertise',
    titleEn: 'Caribbean Expertise',
    description: 'Wij kennen de markt, de cultuur en de uitdagingen van het Caribisch gebied. Dat maakt het verschil.',
  },
  {
    number: '03',
    title: 'End-to-End Ondersteuning',
    titleEn: 'End-to-End Support',
    description: 'Van strategie tot implementatie en nazorg. Eén partner voor het hele traject.',
  },
]

export function WhySuritargets() {
  return (
    <section className="py-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto border-t border-border">
      <AnimatedSection>
        <SectionHeading label="Waarom Suritargets" title="Wat ons onderscheidt" titleEn="What sets us apart" />
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {differentiators.map((d, i) => (
          <AnimatedSection key={d.number} delay={i * 80}>
            <div className="py-8 border-t-2 border-accent">
              <p className="font-mono text-xs text-accent mb-4">{d.number}</p>
              <h3 className="text-h3 mb-2">{d.title}</h3>
              <p className="font-mono text-xs text-text-muted mb-4">{d.titleEn}</p>
              <p className="text-sm text-text-muted leading-relaxed">{d.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: TrustSignals component**

```tsx
// components/home/trust-signals.tsx
import { AnimatedSection } from '@/components/shared/animated-section'

const sectors = [
  'Financiële sector', 'Overheid', 'Gezondheidszorg',
  'Onderwijs', 'Telecommunicatie', 'Retail & FMCG',
]

export function TrustSignals() {
  return (
    <section className="py-16 px-[var(--section-padding-x)] max-w-site mx-auto border-t border-border">
      <AnimatedSection>
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-text-muted text-center mb-10">
          Sectoren die wij bedienen — Sectors we serve
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {sectors.map((s) => (
            <span key={s} className="px-4 py-2 border border-border text-xs font-mono text-text-muted">
              {s}
            </span>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}
```

- [ ] **Step 5: CtaBanner component**

```tsx
// components/home/cta-banner.tsx
import { CtaButton } from '@/components/shared/cta-button'
import { AnimatedSection } from '@/components/shared/animated-section'

export function CtaBanner() {
  return (
    <section className="py-[var(--section-padding-y)] px-[var(--section-padding-x)] bg-surface border-t border-border mt-16">
      <AnimatedSection>
        <div className="max-w-site mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-h2 text-accent mb-2">Klaar om te beginnen?</h2>
            <p className="text-body-lg text-text-muted">Ready to start? — Neem vandaag contact op.</p>
          </div>
          <CtaButton href="/contact" variant="primary" className="shrink-0">
            Start een gesprek
          </CtaButton>
        </div>
      </AnimatedSection>
    </section>
  )
}
```

- [ ] **Step 6: Wire up Home page**

```tsx
// app/page.tsx
import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { ServicesGrid } from '@/components/home/services-grid'
import { WhySuritargets } from '@/components/home/why-suritargets'
import { TrustSignals } from '@/components/home/trust-signals'
import { CtaBanner } from '@/components/home/cta-banner'

export const metadata: Metadata = {
  title: 'Suritargets — Business Tech Op Maat',
  description: 'Business tech support voor het Caribisch gebied. Research, FinTech, Web & Applicaties, Forensics en Education — volledig op maat.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhySuritargets />
      <TrustSignals />
      <CtaBanner />
    </>
  )
}
```

- [ ] **Step 7: Run dev server and verify home page renders**

```bash
npm run dev
```
Open http://localhost:3000. Verify: hero renders, grid background visible, 5 service cards present, nav fixed at top.

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx components/home/
git commit -m "feat: add complete home page with hero, services grid, differentiators, trust signals, CTA"
```

---

## Task 8: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Write About page**

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Over Ons',
  description: 'Leer meer over Suritargets — onze missie, waarden, en waarom wij de Caribbean tech partner zijn voor organisaties die vooruit willen.',
}

const values = [
  { title: 'Integriteit', description: 'Transparante werkwijze, eerlijke adviezen, geen verborgen agenda.' },
  { title: 'Precisie', description: 'Elk detail telt. Wij leveren wat wij beloven, op tijd en binnen scope.' },
  { title: 'Innovatie', description: 'Wij blijven vooroplopen in technologie zodat onze klanten dat ook kunnen.' },
  { title: 'Maatwerk', description: 'Geen generieke oplossingen. Elk traject is uniek, net zoals uw organisatie.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Mission hero */}
      <section className="pt-32 pb-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto">
        <AnimatedSection>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-6">Over Suritargets</p>
          <h1 className="text-h1 max-w-3xl mb-6">
            Technologie die werkt<br />
            <span className="text-accent">voor uw organisatie.</span>
          </h1>
          <p className="text-body-lg text-text-muted max-w-2xl">
            Suritargets is een business tech bedrijf gevestigd in Paramaribo, Suriname. Wij ondersteunen organisaties in het Caribisch gebied met op maat gemaakte technologische oplossingen — van strategie tot implementatie.
          </p>
        </AnimatedSection>
      </section>

      {/* Founder */}
      <section className="py-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <SectionHeading label="Oprichter" title={siteConfig.founder} titleEn="Founder" />
            <p className="text-text-muted leading-relaxed mb-6">
              Ken Alimoestar richtte Suritargets op met één doel: professionele business tech diensten beschikbaar maken voor organisaties in het Caribisch gebied die méér verdienen dan standaardoplossingen.
            </p>
            <p className="text-text-muted leading-relaxed">
              Met expertise in business strategie, technologie en innovatie verbindt hij de kloof tussen ambitie en uitvoering voor bedrijven in Suriname en de bredere Caribische regio.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            {/* Abstract founder placeholder — geometric shape */}
            <div className="aspect-square max-w-sm border border-border bg-surface flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-4 border border-accent/20" />
              <div className="absolute inset-8 border border-accent/10" />
              <p className="font-mono text-xs text-text-muted tracking-widest uppercase">KA</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto border-t border-border">
        <AnimatedSection>
          <SectionHeading label="Onze waarden" title="Waar wij voor staan" titleEn="What we stand for" />
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 60}>
              <div className="p-6 border border-border bg-surface">
                <h3 className="text-h3 text-accent mb-3">{v.title}</h3>
                <p className="text-sm text-text-muted">{v.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Caribbean focus */}
      <section className="py-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto border-t border-border">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <SectionHeading
              label="Onze regio"
              title="Caribbean First"
              description="Suriname staat centraal, maar onze blik is regionaal. Wij begrijpen de uitdagingen van Caribbean bedrijven — van regelgeving tot infrastructuur tot cultuur."
            />
            <div className="space-y-4 pt-2">
              {['Suriname', 'Trinidad & Tobago', 'Guyana', 'Curaçao', 'Aruba', 'Jamaica'].map((country, i) => (
                <AnimatedSection key={country} delay={i * 40}>
                  <div className="flex items-center gap-4 py-3 border-b border-border">
                    <div className="w-1 h-1 bg-accent rounded-full" />
                    <span className="text-sm font-mono text-text-muted">{country}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="py-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto">
        <AnimatedSection>
          <div className="text-center">
            <CtaButton href="/contact" variant="primary">Start een gesprek</CtaButton>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/about/
git commit -m "feat: add About page with mission, founder, values, Caribbean focus"
```

---

## Task 9: Services Pages

**Files:**
- Create: `app/services/page.tsx`
- Create: `components/services/service-detail.tsx`
- Create: `app/services/[slug]/page.tsx`

- [ ] **Step 1: Services hub page**

```tsx
// app/services/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/lib/services-data'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Vijf service clusters — Business Support, Web & Applicaties, R&D, Forensics, Education. Volledig op maat voor uw organisatie.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-[var(--section-padding-x)] max-w-site mx-auto">
        <AnimatedSection>
          <SectionHeading
            label="Wat wij doen"
            title="Onze Services"
            titleEn="Our Services"
            description="Elk service cluster is ontworpen voor een specifieke bedrijfsbehoefte. Samen vormen ze een end-to-end aanbod voor organisaties in het Caribisch gebied."
          />
        </AnimatedSection>
      </section>
      <section className="pb-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto">
        <div className="grid grid-cols-1 gap-px bg-border">
          {services.map((service, i) => (
            <AnimatedSection key={service.slug} delay={i * 60}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex items-start gap-8 p-8 bg-primary hover:bg-surface transition-colors"
              >
                <span className="font-mono text-xs text-accent pt-1 shrink-0">0{i + 1}</span>
                <div className="flex-1">
                  <h2 className="text-h3 mb-2 group-hover:text-accent transition-colors">{service.name}</h2>
                  <p className="font-mono text-xs text-text-muted mb-3">{service.nameEn}</p>
                  <p className="text-sm text-text-muted">{service.shortDescription}</p>
                </div>
                <span className="text-text-muted group-hover:text-accent transition-colors shrink-0">→</span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Service detail dynamic route**

```tsx
// app/services/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services } from '@/lib/services-data'
import { SectionHeading } from '@/components/shared/section-heading'
import { AnimatedSection } from '@/components/shared/animated-section'
import { CtaButton } from '@/components/shared/cta-button'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return { title: service.name, description: service.shortDescription }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const related = services.filter((s) => s.slug !== slug).slice(0, 2)

  return (
    <>
      <section className="pt-32 pb-16 px-[var(--section-padding-x)] max-w-site mx-auto">
        <AnimatedSection>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-6">
            Services / {service.name}
          </p>
          <h1 className="text-h1 max-w-3xl mb-4">{service.name}</h1>
          <p className="font-mono text-sm text-text-muted">{service.nameEn}</p>
        </AnimatedSection>
      </section>

      <section className="pb-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-16">
          <div className="md:col-span-2 space-y-8">
            <AnimatedSection>
              <SectionHeading label="Wat het is" title="De service" />
              <p className="text-text-muted leading-relaxed">{service.description}</p>
            </AnimatedSection>
            <AnimatedSection delay={60}>
              <SectionHeading label="Voor wie" title="Doelgroep" titleEn="Who it's for" />
              <p className="text-text-muted leading-relaxed">{service.whoIsItFor}</p>
            </AnimatedSection>
            <AnimatedSection delay={120}>
              <SectionHeading label="Wat u krijgt" title="Deliverables" />
              <ul className="space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-4 text-sm text-text-muted">
                    <span className="text-accent shrink-0 font-mono">→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={80}>
            <div className="border border-border p-6 bg-surface sticky top-24">
              <p className="text-xs font-mono tracking-[0.15em] uppercase text-accent mb-4">
                Interesse?
              </p>
              <p className="text-sm text-text-muted mb-6">
                Neem contact op om te bespreken hoe wij {service.name.toLowerCase()} kunnen inzetten voor uw organisatie.
              </p>
              <CtaButton href="/contact" variant="primary" className="w-full justify-center">
                Start een gesprek
              </CtaButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related services */}
      <section className="py-16 px-[var(--section-padding-x)] max-w-site mx-auto border-t border-border">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-text-muted mb-8">
          Gerelateerde services
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {related.map((s) => (
            <AnimatedSection key={s.slug}>
              <Link href={`/services/${s.slug}`} className="group block p-6 border border-border hover:border-accent transition-colors">
                <h3 className="text-h3 mb-2 group-hover:text-accent transition-colors">{s.name}</h3>
                <p className="text-sm text-text-muted">{s.shortDescription}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/services/
git commit -m "feat: add services hub and dynamic service detail pages"
```

---

## Task 10: Database & Email Setup

**Files:**
- Create: `lib/db.ts`
- Create: `lib/email.ts`
- Create: `lib/validations.ts`

- [ ] **Step 1: Write failing test for contact validation**

```ts
// tests/unit/validations.test.ts
import { contactSchema } from '@/lib/validations'

describe('contactSchema', () => {
  it('accepts valid input', () => {
    const result = contactSchema.safeParse({
      naam: 'Ken Alimoestar',
      bedrijfsnaam: 'Suritargets',
      email: 'ken@suritargets.com',
      service: 'business-support',
      bericht: 'Ik wil graag meer informatie.',
    })
    expect(result.success).toBe(true)
  })

  it('rejects missing required fields', () => {
    const result = contactSchema.safeParse({ naam: 'Ken' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({
      naam: 'Ken',
      bedrijfsnaam: 'Test',
      email: 'not-an-email',
      service: 'research',
      bericht: 'Hallo',
    })
    expect(result.success).toBe(false)
  })
})
```

Run: `npx jest tests/unit/validations.test.ts`
Expected: FAIL — `Cannot find module '@/lib/validations'`

- [ ] **Step 2: Implement validations.ts**

```ts
// lib/validations.ts
import { z } from 'zod'

export const SERVICE_OPTIONS = [
  'business-support',
  'web-applications',
  'research',
  'forensics',
  'education',
  'anders',
] as const

export const contactSchema = z.object({
  naam: z.string().min(2, 'Naam is verplicht'),
  bedrijfsnaam: z.string().min(1, 'Bedrijfsnaam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  telefoon: z.string().optional(),
  service: z.enum(SERVICE_OPTIONS, { errorMap: () => ({ message: 'Selecteer een service' }) }),
  bericht: z.string().min(10, 'Bericht moet minimaal 10 tekens bevatten'),
})

export type ContactFormData = z.infer<typeof contactSchema>
```

- [ ] **Step 3: Run test — expect PASS**

```bash
npx jest tests/unit/validations.test.ts
```

- [ ] **Step 4: Create db.ts**

```ts
// lib/db.ts
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
})

export async function query<T = unknown>(sql: string, values?: unknown[]): Promise<T> {
  const [rows] = await pool.execute(sql, values)
  return rows as T
}

export async function createContactsTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      naam VARCHAR(255) NOT NULL,
      bedrijfsnaam VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telefoon VARCHAR(50),
      service VARCHAR(100) NOT NULL,
      bericht TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
}
```

- [ ] **Step 5: Create email.ts**

```ts
// lib/email.ts
import { Resend } from 'resend'
import type { ContactFormData } from './validations'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactConfirmation(data: ContactFormData): Promise<void> {
  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: data.email,
    subject: 'Bedankt voor uw bericht — Suritargets',
    html: `
      <p>Beste ${data.naam},</p>
      <p>Wij hebben uw bericht ontvangen en nemen binnen 1–2 werkdagen contact met u op.</p>
      <p>Met vriendelijke groet,<br/>Suritargets Team</p>
    `,
  })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: process.env.RESEND_TO!,
    subject: `Nieuw contactverzoek: ${escapeHtml(data.naam)} — ${escapeHtml(data.bedrijfsnaam)}`,
    html: `
      <h2>Nieuw contactverzoek</h2>
      <p><strong>Naam:</strong> ${escapeHtml(data.naam)}</p>
      <p><strong>Bedrijf:</strong> ${escapeHtml(data.bedrijfsnaam)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Telefoon:</strong> ${data.telefoon ? escapeHtml(data.telefoon) : '—'}</p>
      <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
      <hr/>
      <pre style="white-space:pre-wrap">${escapeHtml(data.bericht)}</pre>
    `,
  })
}
```

- [ ] **Step 6: Create `scripts/migrate.ts` to run DB setup**

```ts
// scripts/migrate.ts
import { createContactsTable } from '../lib/db'

async function migrate() {
  console.log('Running migrations...')
  await createContactsTable()
  console.log('Done.')
  process.exit(0)
}

migrate().catch((err) => { console.error(err); process.exit(1) })
```

Add to `package.json` scripts:
```json
"migrate": "ts-node --project tsconfig.json scripts/migrate.ts"
```

Run on first deploy: `npm run migrate`

- [ ] **Step 7: Commit**

```bash
git add lib/ tests/unit/validations.test.ts scripts/migrate.ts
git commit -m "feat: add database pool, email helpers, validation schema, and migration script"
```

---

## Task 11: Contact Route Handler & Page

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `components/contact/contact-form.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Write failing route handler test**

```ts
// tests/unit/contact-route.test.ts
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

// Mock DB and email
jest.mock('@/lib/db', () => ({ query: jest.fn().mockResolvedValue([]) }))
jest.mock('@/lib/email', () => ({
  sendContactConfirmation: jest.fn().mockResolvedValue(undefined),
  sendContactNotification: jest.fn().mockResolvedValue(undefined),
}))

const validBody = {
  naam: 'Ken', bedrijfsnaam: 'Test BV', email: 'ken@test.com',
  service: 'research', bericht: 'Test bericht dat lang genoeg is.',
}

describe('POST /api/contact', () => {
  it('returns 200 on valid submission', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify(validBody),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })

  it('returns 400 on invalid submission', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ naam: '' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
```

Run: `npx jest tests/unit/contact-route.test.ts` — Expected: FAIL

- [ ] **Step 2: Implement Route Handler**

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { query } from '@/lib/db'
import { sendContactConfirmation, sendContactNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { naam, bedrijfsnaam, email, telefoon, service, bericht } = parsed.data

    await query(
      'INSERT INTO contacts (naam, bedrijfsnaam, email, telefoon, service, bericht) VALUES (?, ?, ?, ?, ?, ?)',
      [naam, bedrijfsnaam, email, telefoon ?? null, service, bericht]
    )

    await Promise.all([
      sendContactConfirmation(parsed.data),
      sendContactNotification(parsed.data),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] error:', err)
    return NextResponse.json({ error: 'Er is een fout opgetreden. Probeer het later opnieuw.' }, { status: 500 })
  }
}
```

- [ ] **Step 3: Run test — expect PASS**

```bash
npx jest tests/unit/contact-route.test.ts
```

- [ ] **Step 4: Create ContactForm component**

```tsx
// components/contact/contact-form.tsx
'use client'
import { useState } from 'react'
import { SERVICE_OPTIONS } from '@/lib/validations'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrors({})
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (res.ok) {
      setState('success')
    } else {
      const data = await res.json()
      setErrors(data.errors ?? {})
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="border border-accent p-8 text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">Verstuurd</p>
        <p className="text-text-on-dark">Bedankt voor uw bericht. Wij nemen binnen 1–2 werkdagen contact op.</p>
        <p className="text-text-muted text-sm mt-2 font-mono">Thank you. We will be in touch within 1–2 business days.</p>
      </div>
    )
  }

  const fieldClass = "w-full bg-surface border border-border px-4 py-3 text-sm text-text-on-dark placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
  const labelClass = "block text-xs font-mono tracking-[0.15em] uppercase text-text-muted mb-2"
  const errorClass = "text-xs text-red-400 mt-1 font-mono"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="naam" className={labelClass}>Naam *</label>
          <input id="naam" name="naam" type="text" required className={fieldClass} placeholder="Uw naam" />
          {errors.naam && <p className={errorClass}>{errors.naam[0]}</p>}
        </div>
        <div>
          <label htmlFor="bedrijfsnaam" className={labelClass}>Bedrijf *</label>
          <input id="bedrijfsnaam" name="bedrijfsnaam" type="text" required className={fieldClass} placeholder="Bedrijfsnaam" />
          {errors.bedrijfsnaam && <p className={errorClass}>{errors.bedrijfsnaam[0]}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={labelClass}>E-mail *</label>
          <input id="email" name="email" type="email" required className={fieldClass} placeholder="u@bedrijf.com" />
          {errors.email && <p className={errorClass}>{errors.email[0]}</p>}
        </div>
        <div>
          <label htmlFor="telefoon" className={labelClass}>Telefoon</label>
          <input id="telefoon" name="telefoon" type="tel" className={fieldClass} placeholder="+597 xxx xxxx" />
        </div>
      </div>
      <div>
        <label htmlFor="service" className={labelClass}>Service interesse *</label>
        <select id="service" name="service" required className={fieldClass}>
          <option value="">Selecteer een service</option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.replace(/-/g, ' ')}</option>
          ))}
        </select>
        {errors.service && <p className={errorClass}>{errors.service[0]}</p>}
      </div>
      <div>
        <label htmlFor="bericht" className={labelClass}>Bericht *</label>
        <textarea id="bericht" name="bericht" required rows={5} className={fieldClass} placeholder="Vertel ons over uw project of vraag..." />
        {errors.bericht && <p className={errorClass}>{errors.bericht[0]}</p>}
      </div>
      <button
        type="submit"
        disabled={state === 'loading'}
        className="bg-accent text-primary px-8 py-3 text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? 'Versturen...' : 'Verstuur bericht'}
      </button>
    </form>
  )
}
```

- [ ] **Step 5: Create Contact page**

```tsx
// app/contact/page.tsx
import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact-form'
import { AnimatedSection } from '@/components/shared/animated-section'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met Suritargets. Wij reageren binnen 1–2 werkdagen.',
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-[var(--section-padding-x)] max-w-site mx-auto">
        <AnimatedSection>
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-6">Contact</p>
          <h1 className="text-h1 max-w-2xl mb-4">Start een gesprek.</h1>
          <p className="text-body-lg text-text-muted">Start a conversation.</p>
        </AnimatedSection>
      </section>
      <section className="pb-[var(--section-padding-y)] px-[var(--section-padding-x)] max-w-site mx-auto border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-16">
          <div className="md:col-span-2">
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>
          </div>
          <AnimatedSection delay={100}>
            <div className="space-y-8">
              <div>
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-3">Adres</p>
                <p className="text-sm text-text-muted">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}<br />
                  {siteConfig.address.country}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-3">E-mail</p>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-text-muted hover:text-accent transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-3">Reactietijd</p>
                <p className="text-sm text-text-muted">Binnen 1–2 werkdagen</p>
                <p className="text-xs font-mono text-text-muted/50 mt-1">Within 1–2 business days</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add app/api/ app/contact/ components/contact/ tests/unit/contact-route.test.ts
git commit -m "feat: add contact form, route handler with DB persistence and Resend email"
```

---

## Task 12: Remaining Pages & SEO

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/case-studies/page.tsx`
- Create: `app/insights/page.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: 404 page**

```tsx
// app/not-found.tsx
import { CtaButton } from '@/components/shared/cta-button'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-6">404</p>
        <h1 className="text-h1 mb-4">Pagina niet gevonden.</h1>
        <p className="text-text-muted mb-8 font-mono text-sm">Page not found.</p>
        <div className="flex gap-4 justify-center">
          <CtaButton href="/" variant="primary">Naar home</CtaButton>
          <CtaButton href="/services" variant="ghost">Onze services</CtaButton>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Coming Soon pages**

```tsx
// app/case-studies/page.tsx
import { ComingSoon } from '@/components/shared/coming-soon'
export default function CaseStudiesPage() {
  return <ComingSoon title="Case Studies" description="Binnenkort publiceren wij onze projectverhalen. Soon we publish our work." />
}

// app/insights/page.tsx
import { ComingSoon } from '@/components/shared/coming-soon'
export default function InsightsPage() {
  return <ComingSoon title="Insights" description="Onze Caribbean tech blog komt eraan. Our Caribbean tech blog is coming soon." />
}
```

- [ ] **Step 3: Sitemap**

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { services } from '@/lib/services-data'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const static_routes = ['', '/about', '/services', '/case-studies', '/insights', '/contact']
  const service_routes = services.map((s) => `/services/${s.slug}`)
  return [...static_routes, ...service_routes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
```

- [ ] **Step 4: Robots.txt**

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add app/not-found.tsx app/case-studies/ app/insights/ app/sitemap.ts app/robots.ts
git commit -m "feat: add 404, coming soon pages, sitemap, and robots.txt"
```

---

## Task 13: OG Images (Satori)

**Files:**
- Create: `app/opengraph-image.tsx`
- Create: `app/about/opengraph-image.tsx`
- Create: `app/services/[slug]/opengraph-image.tsx`

All OG images: 1200×630px, navy background, gold accent, Geist-style type.

> **Note:** `next/og` re-exports `ImageResponse` — no extra install needed. Fonts must be loaded explicitly (no system fonts available). All elements need `display: 'flex'` — no grid/block support. CSS variables are NOT supported — use hex values.
>
> **Runtime choice:** OG image files use `runtime = 'nodejs'` (NOT edge) so fonts can be read from disk with `fs.readFileSync`. This is simpler and reliable in all environments (local, CI, Cloudways). Edge runtime requires fetching fonts over HTTP, which fails during builds before the site is live.

- [ ] **Step 1: Download Geist font files for OG use**

```bash
# Download from https://github.com/vercel/geist-font/releases (Assets → geist-font-*.zip)
# Extract: GeistVF.ttf → public/fonts/GeistSans-Bold.ttf (rename the variable font)
# Or use npm package: node -e "require('fs').copyFileSync(require.resolve('geist/dist/fonts/geist-sans/Geist-Bold.ttf'), 'public/fonts/GeistSans-Bold.ttf')"
mkdir -p public/fonts
node -e "const {copyFileSync}=require('fs'),{resolve}=require('path'); copyFileSync(resolve('node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf'),'public/fonts/GeistSans-Bold.ttf')"
```

- [ ] **Step 2: Create shared OG font loader (Node.js fs — no HTTP fetch)**

```ts
// lib/og-fonts.ts
import { readFileSync } from 'fs'
import { join } from 'path'

export function loadOgFonts() {
  const bold = readFileSync(join(process.cwd(), 'public/fonts/GeistSans-Bold.ttf'))
  return [
    { name: 'Geist', data: bold, weight: 800 as const, style: 'normal' as const },
  ]
}
```

- [ ] **Step 3: Default OG image**

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { loadOgFonts } from '@/lib/og-fonts'

export const runtime = 'nodejs'  // NOT edge — needs fs.readFileSync for fonts
export const alt = 'Suritargets — Business Tech Op Maat'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const fonts = await loadOgFonts()

  return new ImageResponse(
    (
      <div style={{ background: '#0B1628', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '80px' }}>
        {/* Gold accent line */}
        <div style={{ position: 'absolute', top: 80, left: 80, width: 80, height: 2, background: '#C9A84C', display: 'flex' }} />
        {/* Label */}
        <div style={{ display: 'flex', color: '#C9A84C', fontSize: 14, fontFamily: 'Geist', letterSpacing: '0.2em', marginBottom: 24 }}>
          SURITARGETS — PARAMARIBO, SURINAME
        </div>
        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 16 }}>
          <span style={{ color: '#E8EDF5', fontSize: 72, fontWeight: 800, fontFamily: 'Geist', lineHeight: 1.05 }}>
            Business Tech
          </span>
          <span style={{ color: '#C9A84C', fontSize: 72, fontWeight: 800, fontFamily: 'Geist', lineHeight: 1.05 }}>
            Op Maat.
          </span>
        </div>
        {/* Subtitle */}
        <div style={{ display: 'flex', color: '#6B7A99', fontSize: 22, fontFamily: 'Geist' }}>
          Not off the shelf. Fully tailored.
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
```

- [ ] **Step 4: Service detail OG image**

```tsx
// app/services/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { services } from '@/lib/services-data'
import { loadOgFonts } from '@/lib/og-fonts'

export const runtime = 'nodejs'  // NOT edge — needs fs.readFileSync for fonts
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ slug: string }> }

export default async function OgImage({ params }: Props) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  const fonts = await loadOgFonts()

  return new ImageResponse(
    (
      <div style={{ background: '#0B1628', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '80px' }}>
        <div style={{ display: 'flex', color: '#C9A84C', fontSize: 13, fontFamily: 'Geist', letterSpacing: '0.2em', marginBottom: 20 }}>
          SURITARGETS — SERVICES
        </div>
        <div style={{ display: 'flex', color: '#E8EDF5', fontSize: 64, fontWeight: 800, fontFamily: 'Geist', marginBottom: 12 }}>
          {service?.name ?? 'Services'}
        </div>
        <div style={{ display: 'flex', color: '#6B7A99', fontSize: 20, fontFamily: 'Geist' }}>
          {service?.nameEn ?? ''}
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add app/opengraph-image.tsx app/services/opengraph-image.tsx lib/og-fonts.ts public/fonts/
git commit -m "feat: add next/og OG images for home and service pages with Geist font"
```

---

## Task 14: E2E Tests

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/navigation.spec.ts`
- Create: `tests/e2e/contact-form.spec.ts`

- [ ] **Step 1: Playwright config**

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://localhost:3000' },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
})
```

- [ ] **Step 2: Navigation test**

```ts
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

const routes = ['/', '/about', '/services', '/contact', '/case-studies', '/insights']

for (const route of routes) {
  test(`${route} loads without errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
    await page.goto(route)
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0)
  })
}

test('404 page shows for unknown route', async ({ page }) => {
  await page.goto('/this-does-not-exist')
  await expect(page.locator('h1')).toContainText('404')
})
```

- [ ] **Step 3: Contact form E2E test**

```ts
// tests/e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test'

test('contact form shows validation errors on empty submit', async ({ page }) => {
  await page.goto('/contact')
  await page.click('button[type="submit"]')
  // HTML5 required fields prevent submit — form stays visible
  await expect(page.locator('form')).toBeVisible()
})

test('contact form navigates to contact page', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Contact')
  await expect(page).toHaveURL('/contact')
  await expect(page.locator('h1')).toContainText('gesprek')
})
```

- [ ] **Step 4: Run E2E tests**

```bash
npx playwright install --with-deps chromium
npx playwright test
```
Expected: All pass.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts tests/e2e/
git commit -m "test: add Playwright E2E tests for navigation and contact form"
```

---

## Task 14: Cloudways Deployment Setup

**Files:**
- Create: `ecosystem.config.js` (PM2)
- Create: `nginx.conf.example`

- [ ] **Step 1: PM2 config**

```js
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'suritargets',
    script: '.next/standalone/server.js',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    instances: 1,
    autorestart: true,
    watch: false,
  }],
}
```

- [ ] **Step 2: Nginx config example**

```nginx
# nginx.conf.example
server {
    listen 80;
    server_name suritargets.com www.suritargets.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name suritargets.com www.suritargets.com;

    # SSL managed by Cloudways Let's Encrypt

    location /_next/static {
        alias /home/master/applications/suritargets/.next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- [ ] **Step 3: Production build test**

```bash
npm run build
```
Expected: Build completes, `.next/standalone/` folder exists.

- [ ] **Step 4: Commit**

```bash
git add ecosystem.config.js nginx.conf.example
git commit -m "chore: add PM2 and Nginx config for Cloudways deployment"
```

---

## Deployment Checklist (Cloudways)

- [ ] Create MariaDB database on Cloudways, run `createContactsTable()`
- [ ] Set all env vars from `.env.local.example` in Cloudways env panel
- [ ] Upload `.next/standalone/` + `.next/static/` + `public/` via SFTP or git
- [ ] Start PM2: `pm2 start ecosystem.config.js --env production`
- [ ] Configure Nginx reverse proxy in Cloudways panel
- [ ] Enable Let's Encrypt SSL in Cloudways panel
- [ ] Verify `https://suritargets.com` loads
- [ ] Submit sitemap to Google Search Console

---

## Phase 2 (Future)
- CMS admin for blog posts and case studies
- Remotion explainer video embedded on home/about
- Bilingual route structure (Phase 3)
- Client portal (Phase 3)
