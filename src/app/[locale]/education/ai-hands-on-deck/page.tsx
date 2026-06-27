import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Sparkles, Brain, Zap, Users, Calendar, RefreshCw,
  CheckCircle, ArrowRight, Target, Layers, Clock, Award,
} from 'lucide-react'
import { AnimatedSection } from '@/components/shared/animated-section'
import { SectionHeading } from '@/components/shared/section-heading'
import { CtaButton } from '@/components/shared/cta-button'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return {
    title: isNl
      ? 'AI – Hands On Deck Q3 2026 | Suritargets Education'
      : 'AI – Hands On Deck Q3 2026 | Suritargets Education',
    description: isNl
      ? 'Hands-on AI training voor professionals — elk kwartaal bijgewerkt met de nieuwste tools en toepassingen. Leer werken met AI in de praktijk.'
      : 'Hands-on AI training for professionals — updated every quarter with the latest tools and applications. Learn to work with AI in practice.',
  }
}

const NL = {
  badge: 'Q3 2026 · Kwartaalprogramma',
  label: 'AI Training',
  heroTitle: 'AI – Hands On Deck',
  heroSub: 'Praktische AI-training die elk kwartaal wordt bijgewerkt met de nieuwste tools, modellen en toepassingen voor uw sector.',
  refreshNote: 'Elk kwartaal een nieuwe editie — blijf altijd bij met de snelste technologie ter wereld.',
  whatTitle: 'Wat is Hands On Deck?',
  whatBody: 'Hands On Deck is geen theorieles — het is een intensief hands-on programma waarbij deelnemers direct aan de slag gaan met AI-tools die vandaag relevant zijn. Geen presentaties zonder oefening. Geen jargon zonder context. Alleen AI die werkt voor uw bedrijf.',
  whyTitle: 'Waarom elk kwartaal?',
  whyBody: 'AI evolueert sneller dan elk ander technologiegebied. Wat zes maanden geleden state-of-the-art was, is vandaag verouderd. Onze kwartaalcyclus zorgt dat u altijd traint op de tools die nú relevant zijn — en nooit achterblijft.',
  curriculumLabel: 'Q3 2026 Curriculum',
  curriculumTitle: 'Wat staat er op het programma?',
  curriculumTitleEn: "What's on the agenda?",
  modules: [
    {
      week: 'Module 1',
      title: 'Werken met AI-assistenten',
      items: ['Claude, ChatGPT en Gemini vergelijken', 'Prompting voor uw specifieke taken', 'Outputs beoordelen en verfijnen'],
    },
    {
      week: 'Module 2',
      title: 'AI in uw workflows',
      items: ['Documentverwerking automatiseren', 'E-mail en rapporten met AI', 'Meetings samenvatten en actiepunten extracten'],
    },
    {
      week: 'Module 3',
      title: 'AI-tools voor uw sector',
      items: ['Branchespecifieke AI-toepassingen', 'Data-analyse zonder code', 'Research en marktinformatie versnellen'],
    },
    {
      week: 'Module 4',
      title: 'Bouwen & Implementeren',
      items: ['Eenvoudige AI-workflows bouwen', 'Team onboarding & change management', 'ROI meten en bijsturen'],
    },
  ],
  forWhomTitle: 'Voor wie?',
  profiles: [
    { icon: Users, label: 'Teams van 3 – 20 personen', desc: 'Kleine tot middelgrote teams die samen AI willen adopteren' },
    { icon: Brain, label: 'Geen technische achtergrond vereist', desc: 'Geschikt voor iedereen die productief wil worden met AI' },
    { icon: Target, label: 'Sector-agnostisch', desc: 'Handel, dienstverlening, overheid, zorg, finance' },
    { icon: Award, label: 'Certificaat na afronding', desc: 'Hands On Deck AI Practitioner — Q3 2026' },
  ],
  formatTitle: 'Opzet & formaat',
  formatItems: [
    { icon: Clock, label: '4 modules', desc: '2 uur per module, in 4 weken' },
    { icon: Layers, label: 'Live + opname', desc: 'Online of op locatie, altijd een terugkijkoptie' },
    { icon: Zap, label: '70% hands-on', desc: 'Direct oefenen tijdens elke sessie' },
    { icon: RefreshCw, label: 'Kwartaalupdate', desc: 'Deelnemers krijgen korting op het volgende kwartaal' },
  ],
  includesTitle: 'Inclusief',
  includes: [
    'Persoonlijk AI-starterspakket (tool-setup gids)',
    'Prompting Playbook Q3 2026 (PDF)',
    'Toegang tot Suritargets AI Community',
    'Follow-up sessie 30 dagen na afronding',
    'Prioriteitstoegang tot Q4 2026 editie',
  ],
  ctaLabel: 'Start Q3 2026',
  ctaTitle: 'Zet uw team aan het werk met AI',
  ctaBody: 'Beperkt aantal plaatsen per kwartaal — meld uw team aan voor Q3 2026 of ontvang een melding voor Q4.',
  ctaBtn: 'Aanmelden voor Q3 2026',
  ctaBtnSub: 'Of vraag informatie aan',
  nextEdition: 'Volgende editie: Q4 2026 · Oktober 2026',
}

const EN = {
  badge: 'Q3 2026 · Quarterly Programme',
  label: 'AI Training',
  heroTitle: 'AI – Hands On Deck',
  heroSub: 'Practical AI training updated every quarter with the latest tools, models and applications for your industry.',
  refreshNote: 'A new edition every quarter — always stay current with the fastest-moving technology in the world.',
  whatTitle: 'What is Hands On Deck?',
  whatBody: 'Hands On Deck is not a theory lecture — it is an intensive hands-on programme where participants immediately start working with AI tools that are relevant today. No presentations without practice. No jargon without context. Just AI that works for your business.',
  whyTitle: 'Why every quarter?',
  whyBody: 'AI evolves faster than any other technology area. What was state-of-the-art six months ago is outdated today. Our quarterly cycle ensures you always train on the tools that matter now — and never fall behind.',
  curriculumLabel: 'Q3 2026 Curriculum',
  curriculumTitle: "What's on the programme?",
  curriculumTitleEn: 'Current edition modules',
  modules: [
    {
      week: 'Module 1',
      title: 'Working with AI assistants',
      items: ['Comparing Claude, ChatGPT and Gemini', 'Prompting for your specific tasks', 'Evaluating and refining outputs'],
    },
    {
      week: 'Module 2',
      title: 'AI in your workflows',
      items: ['Automate document processing', 'Email and reports with AI', 'Summarise meetings and extract action items'],
    },
    {
      week: 'Module 3',
      title: 'AI tools for your sector',
      items: ['Industry-specific AI applications', 'Data analysis without code', 'Accelerate research and market intelligence'],
    },
    {
      week: 'Module 4',
      title: 'Build & Deploy',
      items: ['Build simple AI workflows', 'Team onboarding & change management', 'Measure and adjust ROI'],
    },
  ],
  forWhomTitle: 'Who is it for?',
  profiles: [
    { icon: Users, label: 'Teams of 3 – 20 people', desc: 'Small to mid-size teams adopting AI together' },
    { icon: Brain, label: 'No technical background required', desc: 'Suitable for anyone who wants to become productive with AI' },
    { icon: Target, label: 'Sector-agnostic', desc: 'Trade, services, government, healthcare, finance' },
    { icon: Award, label: 'Certificate upon completion', desc: 'Hands On Deck AI Practitioner — Q3 2026' },
  ],
  formatTitle: 'Setup & format',
  formatItems: [
    { icon: Clock, label: '4 modules', desc: '2 hours per module, over 4 weeks' },
    { icon: Layers, label: 'Live + recording', desc: 'Online or on-site, always with a replay option' },
    { icon: Zap, label: '70% hands-on', desc: 'Practice directly during every session' },
    { icon: RefreshCw, label: 'Quarterly update', desc: 'Participants get a discount on the next quarter' },
  ],
  includesTitle: 'Included',
  includes: [
    'Personal AI starter kit (tool-setup guide)',
    'Prompting Playbook Q3 2026 (PDF)',
    'Access to Suritargets AI Community',
    'Follow-up session 30 days after completion',
    'Priority access to Q4 2026 edition',
  ],
  ctaLabel: 'Start Q3 2026',
  ctaTitle: 'Put your team to work with AI',
  ctaBody: 'Limited spots per quarter — register your team for Q3 2026 or receive a notification for Q4.',
  ctaBtn: 'Register for Q3 2026',
  ctaBtnSub: 'Or request more information',
  nextEdition: 'Next edition: Q4 2026 · October 2026',
}

export default async function AiHandsOnDeckPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const c = locale === 'nl' ? NL : EN

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2B3494] px-(--section-padding-x) py-(--section-padding-y)">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            {/* Quarter badge */}
            <div className="inline-flex items-center gap-2.5 border border-white/20 bg-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-white font-bold">{c.badge}</span>
            </div>

            <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/50 mb-4">{c.label}</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.05]">
              {c.heroTitle}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/65 font-mono max-w-2xl">
              {c.heroSub}
            </p>

            <div className="mt-10 inline-flex items-center gap-3 bg-white/8 border border-white/15 rounded-xl px-5 py-3">
              <RefreshCw size={16} className="text-[#E8192C] shrink-0" />
              <p className="text-sm text-white/70">{c.refreshNote}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* What + Why */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatedSection>
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#2B3494]/8 text-[#2B3494] mb-6">
              <Sparkles size={22} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">{c.whatTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{c.whatBody}</p>
          </AnimatedSection>
          <AnimatedSection delay={60}>
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E8192C]/8 text-[#E8192C] mb-6">
              <RefreshCw size={22} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">{c.whyTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{c.whyBody}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Curriculum */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border bg-surface">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <SectionHeading
              label={c.curriculumLabel}
              title={c.curriculumTitle}
              titleEn={c.curriculumTitleEn}
              className="mb-12"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.modules.map((mod, i) => (
              <AnimatedSection key={mod.week} delay={i * 40}>
                <div className="bg-background border border-border p-6 h-full flex flex-col">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#2B3494] font-bold bg-[#2B3494]/8 px-2.5 py-1 rounded-full">{mod.week}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-4 leading-tight">{mod.title}</h3>
                  <ul className="space-y-2 flex-1">
                    {mod.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={14} className="text-[#2B3494] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <SectionHeading
              label=""
              title={c.forWhomTitle}
              titleEn="Who is this for?"
              className="mb-12"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.profiles.map(({ icon: Icon, label, desc }, i) => (
              <AnimatedSection key={label} delay={i * 40}>
                <div className="bg-surface border border-border p-6 flex flex-col gap-4">
                  <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#2B3494]/8 text-[#2B3494]">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-bold text-foreground text-sm">{label}</p>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border bg-surface">
        <div className="max-w-360 mx-auto">
          <AnimatedSection>
            <SectionHeading
              label=""
              title={c.formatTitle}
              titleEn="Format"
              className="mb-12"
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.formatItems.map(({ icon: Icon, label, desc }, i) => (
              <AnimatedSection key={label} delay={i * 40}>
                <div className="flex items-start gap-4 p-6 bg-background border border-border">
                  <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#E8192C]/8 text-[#E8192C] shrink-0">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-bold text-foreground text-sm">{label}</p>
                    <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Includes */}
      <section className="px-(--section-padding-x) py-(--section-padding-y) border-b border-border">
        <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground mb-8">{c.includesTitle}</h2>
            <ul className="space-y-4">
              {c.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#2B3494] mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={60}>
            <div className="bg-[#2B3494] p-8 rounded-xl">
              <p className="font-mono text-[10px] tracking-widest uppercase text-white/50 mb-4">{c.nextEdition}</p>
              <h3 className="text-2xl font-bold text-white mb-3">{c.ctaTitle}</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-8">{c.ctaBody}</p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#C2121F] text-white font-bold text-sm px-6 py-3 transition-colors"
                >
                  {c.ctaBtn}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-sm px-6 py-3 transition-colors"
                >
                  {c.ctaBtnSub}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <AnimatedSection>
        <section className="bg-[#2B3494] px-(--section-padding-x) py-(--section-padding-y)">
          <div className="max-w-360 mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">{c.badge}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-xl">
                {c.ctaTitle}
              </h2>
              <p className="mt-3 text-white/60 max-w-md">{c.ctaBody}</p>
            </div>
            <CtaButton href="/contact">{c.ctaBtn}</CtaButton>
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}
