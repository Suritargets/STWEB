'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  Menu, X, ChevronDown,
  BarChart2, Monitor, Sparkles, ShieldCheck, GraduationCap,
  Shield, BookOpen, Rocket, Bitcoin, UserCircle, Lightbulb,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import type { LucideIcon } from 'lucide-react'

type NavService = { label: string; href: string; description: string; Icon: LucideIcon }

const businessLinks: NavService[] = [
  {
    label: 'Dashboarding & Data Visualisatie',
    href: '/services/dashboarding',
    description: 'Custom BI-dashboards en real-time KPI-overzichten.',
    Icon: BarChart2,
  },
  {
    label: 'Web & Applicaties',
    href: '/services/web-applications',
    description: 'Custom platforms, ERP-systemen en web applicaties.',
    Icon: Monitor,
  },
  {
    label: 'Marketing met AI',
    href: '/services/marketing-ai',
    description: 'AI-gedreven content, campagnes en doelgroepanalyse.',
    Icon: Sparkles,
  },
  {
    label: 'Forensics & Integriteit',
    href: '/services/forensics',
    description: 'Forensisch onderzoek en compliance-audits voor organisaties.',
    Icon: ShieldCheck,
  },
  {
    label: 'Education (Teams)',
    href: '/services/education',
    description: 'AI, automatisering en tech-workshops voor teams.',
    Icon: GraduationCap,
  },
]

const individualLinks: NavService[] = [
  {
    label: 'Forensics & Integrity',
    href: '/pricing?tab=individual',
    description: 'Persoonlijk forensisch advies en integriteitsonderzoek.',
    Icon: Shield,
  },
  {
    label: 'Workshop Innovation',
    href: '/pricing?tab=individual',
    description: 'Hands-on innovatieworkshops voor ondernemers.',
    Icon: Lightbulb,
  },
  {
    label: 'Education 1-op-1',
    href: '/pricing?tab=individual',
    description: 'Persoonlijke begeleiding in AI, tech en moderne skills.',
    Icon: BookOpen,
  },
  {
    label: 'Begeleiding in Innovation',
    href: '/pricing?tab=individual',
    description: 'Van idee naar businesscase — coaching op maat.',
    Icon: Rocket,
  },
  {
    label: 'Begeleiding in Blockchain',
    href: '/pricing?tab=individual',
    description: 'Web3, blockchain fundamentals en smart contracts.',
    Icon: Bitcoin,
  },
  {
    label: 'Digital Trail / Resume Social',
    href: '/pricing?tab=individual',
    description: 'Opzet van uw digitale aanwezigheid en online profiel.',
    Icon: UserCircle,
  },
]

const companyLinks = [
  { label: 'Over ons', href: '/about', description: 'Wie wij zijn en wat ons drijft' },
  { label: 'Cases', href: '/case-studies', description: 'Resultaten die voor zich spreken' },
  { label: 'Insights', href: '/insights', description: 'Analyses en trends uit de regio' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2B3494] shadow-md">
      <div className="max-w-[1440px] mx-auto px-[var(--section-padding-x)] h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-white.svg"
            alt={siteConfig.name}
            width={200}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList className="gap-0">

              {/* Services mega menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent! text-white/80 hover:text-white hover:bg-white/10! data-popup-open:bg-white/10! data-popup-open:text-white data-open:bg-white/10! data-open:text-white text-sm h-9 px-4">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[680px] p-5 grid grid-cols-2 gap-0 divide-x divide-border">

                    {/* Business column */}
                    <div className="pr-5">
                      <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3 px-1">
                        Voor Bedrijven
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {businessLinks.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="flex items-start gap-3 select-none rounded-md px-2 py-2.5 hover:bg-[#2B3494]/5 transition-colors group"
                            >
                              <span className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-[#2B3494]/8 text-[#2B3494] group-hover:bg-[#2B3494] group-hover:text-white transition-colors">
                                <item.Icon size={14} />
                              </span>
                              <span>
                                <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494] leading-tight">
                                  {item.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                  {item.description}
                                </p>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Individual column */}
                    <div className="pl-5">
                      <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3 px-1">
                        Voor Individuen
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {individualLinks.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="flex items-start gap-3 select-none rounded-md px-2 py-2.5 hover:bg-[#2B3494]/5 transition-colors group"
                            >
                              <span className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-[#2B3494]/8 text-[#2B3494] group-hover:bg-[#2B3494] group-hover:text-white transition-colors">
                                <item.Icon size={14} />
                              </span>
                              <span>
                                <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494] leading-tight">
                                  {item.label}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                  {item.description}
                                </p>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Company dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent! text-white/80 hover:text-white hover:bg-white/10! data-popup-open:bg-white/10! data-popup-open:text-white data-open:bg-white/10! data-open:text-white text-sm h-9 px-4">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[280px] p-3 flex flex-col gap-1">
                    {companyLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block select-none rounded-md p-3 hover:bg-[#2B3494]/5 transition-colors group"
                        >
                          <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494]">
                            {item.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/pricing"
            className="text-sm text-white/80 hover:text-white transition-colors px-4 h-9 flex items-center"
          >
            Pricing
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-sm text-white/80 hover:text-white transition-colors px-2"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 text-xs font-semibold bg-white text-[#2B3494] hover:bg-white/90 transition-colors"
          >
            Gratis gesprek
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#2B3494] border-t border-white/20 px-[var(--section-padding-x)] py-6 flex flex-col gap-2">
          <button
            className="flex items-center justify-between w-full text-sm text-white/80 hover:text-white transition-colors py-2"
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            Services
            <ChevronDown size={16} className={cn('transition-transform', servicesOpen && 'rotate-180')} />
          </button>
          {servicesOpen && (
            <div className="pl-4 flex flex-col gap-1 mb-2">
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 py-1">Voor Bedrijven</p>
              {businessLinks.map((item) => (
                <Link key={item.label} href={item.href}
                  className="text-sm text-white/70 hover:text-white transition-colors py-1.5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 py-1 mt-2">Voor Individuen</p>
              {individualLinks.map((item) => (
                <Link key={item.label} href={item.href}
                  className="text-sm text-white/70 hover:text-white transition-colors py-1.5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <button
            className="flex items-center justify-between w-full text-sm text-white/80 hover:text-white transition-colors py-2"
            onClick={() => setCompanyOpen(!companyOpen)}
          >
            Company
            <ChevronDown size={16} className={cn('transition-transform', companyOpen && 'rotate-180')} />
          </button>
          {companyOpen && (
            <div className="pl-4 flex flex-col gap-1 mb-2">
              {companyLinks.map((item) => (
                <Link key={item.href} href={item.href}
                  className="text-sm text-white/70 hover:text-white transition-colors py-1.5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <Link href="/pricing" className="text-sm text-white/80 hover:text-white transition-colors py-2"
            onClick={() => setOpen(false)}>
            Pricing
          </Link>

          <div className="pt-2 flex flex-col gap-3">
            <Link href="/contact" className="text-sm text-white/80 hover:text-white transition-colors"
              onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link href="/contact"
              className="inline-flex items-center px-4 py-2 text-xs font-semibold bg-white text-[#2B3494] hover:bg-white/90 transition-colors w-fit"
              onClick={() => setOpen(false)}>
              Gratis gesprek
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
