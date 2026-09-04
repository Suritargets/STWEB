'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, useRouter, usePathname } from '@/i18n/navigation'
import {
  Menu, X, ChevronDown,
  BarChart2, Monitor, Sparkles, ShieldCheck, GraduationCap,
  Shield, BookOpen, Rocket, Bitcoin, UserCircle,
  Briefcase, TrendingUp, Compass, Calculator, Zap,
  Users, FolderOpen, Lightbulb, LayoutGrid, Radio,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import ReactCountryFlag from 'react-country-flag'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import type { LucideIcon } from 'lucide-react'

type NavService = { labelKey: string; href: string; descKey: string; Icon: LucideIcon }

const businessLinks: NavService[] = [
  { labelKey: 'dashboarding', href: '/services/dashboarding', descKey: 'dashboardingDesc', Icon: BarChart2 },
  { labelKey: 'webApps', href: '/services/web-applications', descKey: 'webAppsDesc', Icon: Monitor },
  { labelKey: 'marketingAi', href: '/services/marketing-ai', descKey: 'marketingAiDesc', Icon: Sparkles },
  { labelKey: 'businessConsulting', href: '/services/business-consulting', descKey: 'businessConsultingDesc', Icon: Briefcase },
  { labelKey: 'startupToFounder', href: '/services/startup-to-founder', descKey: 'startupToFounderDesc', Icon: TrendingUp },
  { labelKey: 'forensics', href: '/services/forensics', descKey: 'forensicsDesc', Icon: ShieldCheck },
  { labelKey: 'educationTeams', href: '/services/education', descKey: 'educationTeamsDesc', Icon: GraduationCap },
]

const individualLinks: NavService[] = [
  { labelKey: 'pioneeringFundamentals', href: '/services/pioneering-fundamentals', descKey: 'pioneeringFundamentalsDesc', Icon: Compass },
  { labelKey: 'education1op1', href: '/services/education-1op1', descKey: 'education1op1Desc', Icon: BookOpen },
  { labelKey: 'begeleidingInnovation', href: '/services/begeleiding-innovation', descKey: 'begeleidingInnovationDesc', Icon: Rocket },
  { labelKey: 'begeleidingBlockchain', href: '/services/begeleiding-blockchain', descKey: 'begeleidingBlockchainDesc', Icon: Bitcoin },
  { labelKey: 'digitalTrail', href: '/services/digital-trail', descKey: 'digitalTrailDesc', Icon: UserCircle },
  { labelKey: 'forensicsPersonal', href: '/services/forensics-personal', descKey: 'forensicsPersonalDesc', Icon: Shield },
]

const LANGS = [
  { locale: 'nl', label: 'Nederlands', code: 'NL' },
  { locale: 'en', label: 'English',    code: 'GB' },
  { locale: 'es', label: 'Español',    code: 'ES' },
  { locale: 'pt-BR', label: 'Português (BR)', code: 'BR' },
  { locale: 'fr', label: 'Français',   code: 'FR' },
]

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [educationOpen, setEducationOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale })
    setLangOpen(false)
  }

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2B3494] shadow-md">
      <div className="max-w-[1440px] mx-auto px-[var(--section-padding-x)] h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-white.svg"
            alt={siteConfig.name}
            width={0}
            height={0}
            sizes="100vw"
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
                  {t('services')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[680px] p-5 grid grid-cols-2 gap-0 divide-x divide-border">

                    {/* Business column */}
                    <div className="pr-5">
                      <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3 px-1">
                        {t('voorBedrijven')}
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {businessLinks.map((item) => (
                          <li key={item.labelKey}>
                            <Link
                              href={item.href}
                              className="flex items-start gap-3 select-none rounded-md px-2 py-2.5 hover:bg-[#2B3494]/5 transition-colors group"
                            >
                              <span className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-[#2B3494]/8 text-[#2B3494] group-hover:bg-[#2B3494] group-hover:text-white transition-colors">
                                <item.Icon size={14} />
                              </span>
                              <span>
                                <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494] leading-tight">
                                  {t(item.labelKey)}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                  {t(item.descKey)}
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
                        {t('voorIndividuen')}
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {individualLinks.map((item) => (
                          <li key={item.labelKey}>
                            <Link
                              href={item.href}
                              className="flex items-start gap-3 select-none rounded-md px-2 py-2.5 hover:bg-[#2B3494]/5 transition-colors group"
                            >
                              <span className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-[#2B3494]/8 text-[#2B3494] group-hover:bg-[#2B3494] group-hover:text-white transition-colors">
                                <item.Icon size={14} />
                              </span>
                              <span>
                                <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494] leading-tight">
                                  {t(item.labelKey)}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                  {t(item.descKey)}
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

              {/* Education mega menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent! text-white/80 hover:text-white hover:bg-white/10! data-popup-open:bg-white/10! data-popup-open:text-white data-open:bg-white/10! data-open:text-white text-sm h-9 px-4">
                  {t('education')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[680px] p-5 flex flex-col gap-0">
                    <div className="grid grid-cols-2 gap-0 divide-x divide-border">

                      {/* Courses column */}
                      <div className="pr-5">
                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3 px-1">
                          {t('courses')}
                        </p>
                        <ul className="flex flex-col gap-0.5">
                          {([
                            { href: '/education/ai-courses',          icon: Sparkles,   labelKey: 'aiCourses',       descKey: 'aiCoursesDesc',       badge: null      },
                            { href: '/education/ai-hands-on-deck',    icon: Zap,        labelKey: 'aiHandsOnDeck',   descKey: 'aiHandsOnDeckDesc',   badge: 'Q3 2026' },
                            { href: '/education/trading-courses',     icon: TrendingUp, labelKey: 'tradingCourses',  descKey: 'tradingCoursesDesc',  badge: null      },
                            { href: '/education/it-courses',          icon: Monitor,    labelKey: 'itCourses',       descKey: 'itCoursesDesc',       badge: null      },
                            { href: '/education/business-courses',    icon: Briefcase,  labelKey: 'businessCourses', descKey: 'businessCoursesDesc', badge: null      },
                          ] as const).map(({ href, icon: Icon, labelKey, descKey, badge }) => (
                            <li key={href}>
                              <Link href={href} className="flex items-start gap-3 select-none rounded-md px-2 py-2.5 hover:bg-[#2B3494]/5 transition-colors group">
                                <span className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-[#2B3494]/8 text-[#2B3494] group-hover:bg-[#2B3494] group-hover:text-white transition-colors">
                                  <Icon size={14} />
                                </span>
                                <span className="flex-1">
                                  <span className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494] leading-tight">{t(labelKey)}</p>
                                    {badge && <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-[#E8192C] bg-[#E8192C]/8 px-1.5 py-0.5 rounded-full">{badge}</span>}
                                  </span>
                                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{t(descKey)}</p>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Education Software column */}
                      <div className="pl-5">
                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3 px-1">
                          {t('eduSoftwareLabel')}
                        </p>
                        <ul className="flex flex-col gap-0.5">
                          {([
                            { href: 'https://edu.suritargets.com',       icon: GraduationCap, labelKey: 'eduPlatform',    descKey: 'eduPlatformDesc',    external: true  },
                            { href: '/education/knowledge-base-rag',     icon: BookOpen,      labelKey: 'knowledgeBase',  descKey: 'knowledgeBaseDesc',  external: false },
                            { href: '/education/research-development',   icon: Compass,       labelKey: 'researchDev',    descKey: 'researchDevDesc',    external: false },
                            { href: '/education/data-aggregation',       icon: BarChart2,     labelKey: 'dataAggregation', descKey: 'dataAggregationDesc', external: false },
                          ] as const).map(({ href, icon: Icon, labelKey, descKey, external }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="flex items-start gap-3 select-none rounded-md px-2 py-2.5 hover:bg-[#2B3494]/5 transition-colors group"
                              >
                                <span className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-[#2B3494]/8 text-[#2B3494] group-hover:bg-[#2B3494] group-hover:text-white transition-colors">
                                  <Icon size={14} />
                                </span>
                                <span>
                                  <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494] leading-tight">{t(labelKey)}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{t(descKey)}</p>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Free AI Demo — full-width row */}
                    <div className="mt-3 pt-3 border-t border-border">
                      <Link
                        href="/education/free-ai-demo"
                        className="flex items-center gap-3 select-none rounded-md px-2 py-2.5 hover:bg-[#2B3494]/5 transition-colors group"
                      >
                        <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-[#E8192C]/10 text-[#E8192C] group-hover:bg-[#2B3494] group-hover:text-white transition-colors">
                          <Radio size={14} />
                        </span>
                        <span className="flex-1">
                          <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494] leading-tight">{t('freeAiDemo')}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{t('freeAiDemoDesc')}</p>
                        </span>
                        <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-[#E8192C] bg-[#E8192C]/8 px-2 py-0.5 rounded-full whitespace-nowrap">
                          Gratis · 20 min
                        </span>
                      </Link>
                    </div>

                    {/* In-house Training — full-width row */}
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-2 px-1">
                        {t('inhouseLabel')}
                      </p>
                      <Link
                        href="/education/finance-accounting-claude"
                        className="flex items-center gap-3 select-none rounded-md px-2 py-2.5 hover:bg-[#2B3494]/5 transition-colors group"
                      >
                        <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-[#E8192C]/10 text-[#E8192C] group-hover:bg-[#2B3494] group-hover:text-white transition-colors">
                          <Calculator size={14} />
                        </span>
                        <span className="flex-1">
                          <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494] leading-tight">{t('financeClaudeInhouse')}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{t('financeClaudeInhouseDesc')}</p>
                        </span>
                        <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-[#E8192C] bg-[#E8192C]/8 px-2 py-0.5 rounded-full whitespace-nowrap">
                          Claude Desktop + Excel
                        </span>
                      </Link>
                    </div>

                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Company dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent! text-white/80 hover:text-white hover:bg-white/10! data-popup-open:bg-white/10! data-popup-open:text-white data-open:bg-white/10! data-open:text-white text-sm h-9 px-4">
                  {t('company')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[280px] p-3 flex flex-col gap-0.5">
                    {([
                      { href: '/about',        icon: Users,      labelKey: 'overOns',  descKey: 'overOnsDesc'  },
                      { href: '/case-studies', icon: FolderOpen, labelKey: 'cases',    descKey: 'casesDesc'    },
                      { href: '/insights',     icon: Lightbulb,  labelKey: 'insights', descKey: 'insightsDesc' },
                    ] as const).map(({ href, icon: Icon, labelKey, descKey }) => (
                      <li key={href}>
                        <Link href={href} className="flex items-start gap-3 select-none rounded-md px-2 py-2.5 hover:bg-[#2B3494]/5 transition-colors group">
                          <span className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md bg-[#2B3494]/8 text-[#2B3494] group-hover:bg-[#2B3494] group-hover:text-white transition-colors">
                            <Icon size={14} />
                          </span>
                          <span>
                            <p className="text-sm font-medium text-foreground group-hover:text-[#2B3494] leading-tight">{t(labelKey)}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{t(descKey)}</p>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/portfolio"
            className="text-sm text-white/80 hover:text-white transition-colors px-4 h-9 flex items-center"
          >
            {t('portfolio')}
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-white/80 hover:text-white transition-colors px-4 h-9 flex items-center"
          >
            {t('pricing')}
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setSignupOpen(true)}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold border border-white/40 text-white hover:bg-white/10 transition-colors"
          >
            {t('signUp')}
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 text-xs font-semibold bg-white text-[#2B3494] hover:bg-white/90 transition-colors"
          >
            {t('getStarted')}
          </Link>
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors px-2 py-1"
              aria-label={t('langLabel')}
            >
              <ReactCountryFlag countryCode={LANGS.find((l) => l.locale === locale)?.code ?? 'NL'} svg style={{ width: '1.25em', height: '1.25em', borderRadius: 2 }} />
              <ChevronDown size={11} className={cn('transition-transform', langOpen && 'rotate-180')} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-sm shadow-lg z-50 py-1 min-w-[160px]">
                {LANGS.map(({ locale: loc, label, code }) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-surface',
                      locale === loc ? 'text-[#2B3494] font-semibold' : 'text-foreground'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <ReactCountryFlag countryCode={code} svg style={{ width: '1.25em', height: '1.25em', borderRadius: 2 }} />
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
            {t('services')}
            <ChevronDown size={16} className={cn('transition-transform', servicesOpen && 'rotate-180')} />
          </button>
          {servicesOpen && (
            <div className="pl-4 flex flex-col gap-1 mb-2">
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 py-1">{t('voorBedrijven')}</p>
              {businessLinks.map((item) => (
                <Link key={item.labelKey} href={item.href}
                  className="text-sm text-white/70 hover:text-white transition-colors py-1.5"
                  onClick={() => setOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 py-1 mt-2">{t('voorIndividuen')}</p>
              {individualLinks.map((item) => (
                <Link key={item.labelKey} href={item.href}
                  className="text-sm text-white/70 hover:text-white transition-colors py-1.5"
                  onClick={() => setOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          )}

          <button
            className="flex items-center justify-between w-full text-sm text-white/80 hover:text-white transition-colors py-2"
            onClick={() => setEducationOpen(!educationOpen)}
          >
            {t('education')}
            <ChevronDown size={16} className={cn('transition-transform', educationOpen && 'rotate-180')} />
          </button>
          {educationOpen && (
            <div className="pl-4 flex flex-col gap-1 mb-2">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 pt-1 pb-0.5">{t('courses')}</p>
              <Link href="/education/ai-courses" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>{t('aiCourses')}</Link>
              <Link href="/education/ai-hands-on-deck" className="text-sm text-white/70 hover:text-white transition-colors py-1.5 flex items-center gap-2" onClick={() => setOpen(false)}>
                {t('aiHandsOnDeck')}
                <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-[#E8192C]">Q3 2026</span>
              </Link>
              <Link href="/education/trading-courses" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>{t('tradingCourses')}</Link>
              <Link href="/education/it-courses" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>{t('itCourses')}</Link>
              <Link href="/education/business-courses" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>{t('businessCourses')}</Link>
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 pt-2 pb-0.5">{t('eduSoftwareLabel')}</p>
              <Link href="https://edu.suritargets.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>{t('eduPlatform')}</Link>
              <Link href="/education/knowledge-base-rag" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>{t('knowledgeBase')}</Link>
              <Link href="/education/research-development" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>{t('researchDev')}</Link>
              <Link href="/education/data-aggregation" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>{t('dataAggregation')}</Link>
              <Link href="/education/free-ai-demo" className="text-sm text-white/70 hover:text-white transition-colors py-1.5 flex items-center gap-2" onClick={() => setOpen(false)}>
                {t('freeAiDemo')}
                <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-[#E8192C]">Gratis</span>
              </Link>
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 pt-2 pb-0.5">{t('inhouseLabel')}</p>
              <Link href="/education/finance-accounting-claude" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>{t('financeClaudeInhouse')}</Link>
            </div>
          )}

          <button
            className="flex items-center justify-between w-full text-sm text-white/80 hover:text-white transition-colors py-2"
            onClick={() => setCompanyOpen(!companyOpen)}
          >
            {t('company')}
            <ChevronDown size={16} className={cn('transition-transform', companyOpen && 'rotate-180')} />
          </button>
          {companyOpen && (
            <div className="pl-4 flex flex-col gap-1 mb-2">
              <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>
                {t('overOns')}
              </Link>
              <Link href="/case-studies" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>
                {t('cases')}
              </Link>
                  <Link href="/insights" className="text-sm text-white/70 hover:text-white transition-colors py-1.5" onClick={() => setOpen(false)}>
                {t('insights')}
              </Link>
            </div>
          )}

          <Link href="/portfolio" className="text-sm text-white/80 hover:text-white transition-colors py-2"
            onClick={() => setOpen(false)}>
            {t('portfolio')}
          </Link>
          <Link href="/pricing" className="text-sm text-white/80 hover:text-white transition-colors py-2"
            onClick={() => setOpen(false)}>
            {t('pricing')}
          </Link>

          <div className="pt-2 flex flex-col gap-3">
            <Link href="/contact" className="text-sm text-white/80 hover:text-white transition-colors"
              onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link href="/contact"
              className="inline-flex items-center px-4 py-2 text-xs font-semibold bg-white text-[#2B3494] hover:bg-white/90 transition-colors w-fit"
              onClick={() => setOpen(false)}>
              {t('getStarted')}
            </Link>
          </div>

          {/* Mobile language switcher */}
          <div className="pt-3 border-t border-white/20 flex flex-wrap gap-2">
            {LANGS.map(({ locale: loc, code, label }) => (
              <button
                key={loc}
                onClick={() => { switchLocale(loc); setOpen(false) }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-sm transition-colors',
                  locale === loc ? 'bg-white text-[#2B3494] font-semibold' : 'text-white/70 hover:text-white border border-white/20'
                )}
              >
                <ReactCountryFlag countryCode={code} svg style={{ width: '1.25em', height: '1.25em', borderRadius: 2 }} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>

      {/* Sign up — Coming Soon modal */}
      {signupOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setSignupOpen(false)}
        >
          <div
            className="relative bg-white max-w-md w-full rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="h-52 bg-[#2B3494] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🚀</div>
                <p className="text-white/60 text-xs font-mono tracking-widest uppercase">Suritargets</p>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8 text-center">
              <p className="text-xs font-mono tracking-[0.3em] uppercase text-[#2B3494]/60 mb-3">
                Coming Soon
              </p>
              <h2 className="text-2xl font-black text-[#2B3494] mb-3">
                {t('comingSoonTitle')}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t('comingSoonBody')}
              </p>
              <button
                onClick={() => setSignupOpen(false)}
                className="inline-flex items-center px-6 py-2.5 text-xs font-semibold bg-[#2B3494] text-white hover:bg-[#2B3494]/90 transition-colors"
              >
                {t('comingSoonClose')}
              </button>
            </div>

            {/* Close X */}
            <button
              onClick={() => setSignupOpen(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
              aria-label={t('comingSoonClose')}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
