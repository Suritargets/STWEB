import React from 'react'
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion'
import { AnimatedText } from './components/AnimatedText'
import { GoldLine } from './components/GoldLine'

// ── Brand tokens ────────────────────────────────────────────────────────────
const NAVY = '#0B1628'
const GOLD = '#C9A84C'
const WHITE = '#E8EDF5'
const MUTED = '#6B7A99'

const FONT_STACK = "'Inter', 'Helvetica Neue', Arial, sans-serif"

// ── Translations ─────────────────────────────────────────────────────────────
type VideoStrings = {
  problem: { line1: string; line2: string; subtitle: string }
  solution: { highlight: string; line1: string; line2: string }
  services: { label: string; title: string; items: string[] }
  stats: { title: string; labels: [string, string, string] }
  cta: { headline: string; subtitle: string }
}

const STRINGS: Record<string, VideoStrings> = {
  nl: {
    problem: {
      line1: 'Caribische bedrijven',
      line2: 'verdienen beter.',
      subtitle: 'Internationale kwaliteit was altijd ver weg of te duur.',
    },
    solution: {
      highlight: 'Tot nu.',
      line1: 'Suritargets brengt internationale expertise',
      line2: 'naar Suriname.',
    },
    services: {
      label: 'DIENSTEN',
      title: 'Vijf kerngebieden',
      items: ['Bedrijfsondersteuning', 'Web Applicaties', 'Onderzoek & Analyse', 'Forensisch Accountancy', 'Educatie & Training'],
    },
    stats: {
      title: 'Bewezen resultaten',
      labels: ['jaar ervaring', 'lokaal begrip', 'diensten'],
    },
    cta: {
      headline: 'Klaar om te groeien?',
      subtitle: 'Neem contact op — wij staan klaar.',
    },
  },
  en: {
    problem: {
      line1: 'Caribbean businesses',
      line2: 'deserve better.',
      subtitle: 'International quality was always out of reach or too expensive.',
    },
    solution: {
      highlight: 'Until now.',
      line1: 'Suritargets brings international expertise',
      line2: 'to Suriname.',
    },
    services: {
      label: 'SERVICES',
      title: 'Five core areas',
      items: ['Business Support', 'Web Applications', 'Research & Analysis', 'Forensic Accounting', 'Education & Training'],
    },
    stats: {
      title: 'Proven results',
      labels: ['years of experience', 'local understanding', 'services'],
    },
    cta: {
      headline: 'Ready to grow?',
      subtitle: 'Contact us — we are here for you.',
    },
  },
  es: {
    problem: {
      line1: 'Las empresas caribeñas',
      line2: 'merecen más.',
      subtitle: 'La calidad internacional siempre estuvo lejos o era demasiado cara.',
    },
    solution: {
      highlight: 'Hasta ahora.',
      line1: 'Suritargets trae experiencia internacional',
      line2: 'a Surinam.',
    },
    services: {
      label: 'SERVICIOS',
      title: 'Cinco áreas clave',
      items: ['Soporte Empresarial', 'Aplicaciones Web', 'Investigación & Análisis', 'Contabilidad Forense', 'Educación & Formación'],
    },
    stats: {
      title: 'Resultados comprobados',
      labels: ['años de experiencia', 'conocimiento local', 'servicios'],
    },
    cta: {
      headline: '¿Listo para crecer?',
      subtitle: 'Contáctanos — estamos aquí.',
    },
  },
  'pt-BR': {
    problem: {
      line1: 'As empresas caribenhas',
      line2: 'merecem mais.',
      subtitle: 'A qualidade internacional sempre foi distante ou cara demais.',
    },
    solution: {
      highlight: 'Até agora.',
      line1: 'A Suritargets traz expertise internacional',
      line2: 'ao Suriname.',
    },
    services: {
      label: 'SERVIÇOS',
      title: 'Cinco áreas principais',
      items: ['Suporte Empresarial', 'Aplicações Web', 'Pesquisa & Análise', 'Contabilidade Forense', 'Educação & Treinamento'],
    },
    stats: {
      title: 'Resultados comprovados',
      labels: ['anos de experiência', 'compreensão local', 'serviços'],
    },
    cta: {
      headline: 'Pronto para crescer?',
      subtitle: 'Entre em contato — estamos prontos.',
    },
  },
  fr: {
    problem: {
      line1: 'Les entreprises caribéennes',
      line2: 'méritent mieux.',
      subtitle: 'La qualité internationale était toujours loin ou trop chère.',
    },
    solution: {
      highlight: "Jusqu'à maintenant.",
      line1: 'Suritargets apporte une expertise internationale',
      line2: 'au Suriname.',
    },
    services: {
      label: 'SERVICES',
      title: 'Cinq domaines clés',
      items: ['Support Entreprise', 'Applications Web', 'Recherche & Analyse', 'Comptabilité Forensique', 'Éducation & Formation'],
    },
    stats: {
      title: 'Résultats prouvés',
      labels: ["ans d'expérience", 'compréhension locale', 'services'],
    },
    cta: {
      headline: 'Prêt à grandir ?',
      subtitle: 'Contactez-nous — nous sommes là.',
    },
  },
}

// ── Helper: fade the whole scene out ────────────────────────────────────────
function useFadeOut(startFrame: number, endFrame: number) {
  const frame = useCurrentFrame()
  return interpolate(frame, [startFrame, endFrame], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

// ── Scene 1: Brand Intro (frames 0–120) ─────────────────────────────────────
const SceneBrandIntro = () => {
  const frame = useCurrentFrame()

  const bracketOpacity = interpolate(frame, [50, 70], [0, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const sceneOpacity = useFadeOut(90, 120)

  const cornerStyle = (pos: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    width: 40,
    height: 40,
    opacity: bracketOpacity,
    ...pos,
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAVY,
        fontFamily: FONT_STACK,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 24,
        opacity: sceneOpacity,
      }}
    >
      <div style={cornerStyle({ top: 40, left: 40, borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` })} />
      <div style={cornerStyle({ top: 40, right: 40, borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` })} />
      <div style={cornerStyle({ bottom: 40, left: 40, borderBottom: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` })} />
      <div style={cornerStyle({ bottom: 40, right: 40, borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` })} />

      <GoldLine from={0} maxWidth={300} />

      <AnimatedText from={15} style={{ color: WHITE, fontSize: 72, fontWeight: 800, letterSpacing: '0.15em', textAlign: 'center', textTransform: 'uppercase' }}>
        SURITARGETS
      </AnimatedText>

      <AnimatedText from={40} style={{ color: GOLD, fontSize: 18, fontFamily: 'monospace', letterSpacing: '0.3em', textTransform: 'uppercase', textAlign: 'center' }}>
        Paramaribo, Suriname
      </AnimatedText>
    </AbsoluteFill>
  )
}

// ── Scene 2: Problem (frames 100–420) ────────────────────────────────────────
const SceneProblem = ({ s }: { s: VideoStrings }) => {
  const sceneOpacity = useFadeOut(290, 320)
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: FONT_STACK, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, padding: '0 160px', opacity: sceneOpacity }}>
      <AnimatedText from={0} style={{ color: WHITE, fontSize: 64, fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.1 }}>
        {s.problem.line1}
      </AnimatedText>
      <AnimatedText from={15} style={{ color: GOLD, fontSize: 64, fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.1 }}>
        {s.problem.line2}
      </AnimatedText>
      <AnimatedText from={40} style={{ color: MUTED, fontSize: 24, textAlign: 'center', lineHeight: 1.6, marginTop: 16, maxWidth: 900 }}>
        {s.problem.subtitle}
      </AnimatedText>
    </AbsoluteFill>
  )
}

// ── Scene 3: Solution (frames 380–750) ───────────────────────────────────────
const SceneSolution = ({ s }: { s: VideoStrings }) => {
  const frame = useCurrentFrame()
  const sceneOpacity = useFadeOut(340, 370)

  const highlightScale = interpolate(frame, [0, 20], [0.3, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const highlightOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: FONT_STACK, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 32, padding: '0 160px', opacity: sceneOpacity }}>
      <div style={{ color: GOLD, fontSize: 96, fontWeight: 800, textAlign: 'center', transform: `scale(${highlightScale})`, opacity: highlightOpacity, letterSpacing: '-0.02em' }}>
        {s.solution.highlight}
      </div>
      <AnimatedText from={25} style={{ color: WHITE, fontSize: 32, fontWeight: 600, textAlign: 'center', lineHeight: 1.5, maxWidth: 1000 }}>
        {s.solution.line1}
      </AnimatedText>
      <AnimatedText from={40} style={{ color: WHITE, fontSize: 32, fontWeight: 600, textAlign: 'center', lineHeight: 1.5, maxWidth: 1000 }}>
        {s.solution.line2}
      </AnimatedText>
    </AbsoluteFill>
  )
}

// ── Scene 4: Services (frames 710–1200) ──────────────────────────────────────
const SceneServices = ({ s }: { s: VideoStrings }) => {
  const frame = useCurrentFrame()
  const sceneOpacity = useFadeOut(450, 490)

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: FONT_STACK, alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', padding: '0 160px', gap: 24, opacity: sceneOpacity }}>
      <AnimatedText from={0} style={{ color: GOLD, fontSize: 14, fontFamily: 'monospace', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8 }}>
        {s.services.label}
      </AnimatedText>
      <AnimatedText from={10} style={{ color: WHITE, fontSize: 56, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 32 }}>
        {s.services.title}
      </AnimatedText>

      {s.services.items.map((service, i) => {
        const itemFrom = 40 + i * 8
        const slideIn = interpolate(frame, [itemFrom, itemFrom + 20], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        const itemOpacity = interpolate(frame, [itemFrom, itemFrom + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
        return (
          <div key={service} style={{ display: 'flex', alignItems: 'center', gap: 24, opacity: itemOpacity, transform: `translateX(${slideIn}px)` }}>
            <span style={{ color: GOLD, fontFamily: 'monospace', fontSize: 20, fontWeight: 700, letterSpacing: '0.1em', minWidth: 48 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div style={{ width: 2, height: 32, backgroundColor: GOLD, opacity: 0.4 }} />
            <span style={{ color: WHITE, fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>{service}</span>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}

// ── Scene 5: Stats (frames 1160–1800) ────────────────────────────────────────
const STAT_NUMERICS: [number, string, number, string, number, string] = [5, '+', 10, '+', 100, '%']

const SceneStats = ({ s }: { s: VideoStrings }) => {
  const frame = useCurrentFrame()
  const sceneOpacity = useFadeOut(600, 640)

  const stats = [
    { numeric: STAT_NUMERICS[0], suffix: STAT_NUMERICS[1], label: s.stats.labels[0] },
    { numeric: STAT_NUMERICS[2], suffix: STAT_NUMERICS[3], label: s.stats.labels[1] },
    { numeric: STAT_NUMERICS[4], suffix: STAT_NUMERICS[5], label: s.stats.labels[2] },
  ]

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: FONT_STACK, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 64, padding: '0 160px', opacity: sceneOpacity }}>
      <AnimatedText from={0} style={{ color: WHITE, fontSize: 52, fontWeight: 800, letterSpacing: '-0.02em', textAlign: 'center' }}>
        {s.stats.title}
      </AnimatedText>

      <div style={{ display: 'flex', gap: 120, justifyContent: 'center', alignItems: 'flex-start' }}>
        {stats.map((stat, i) => {
          const counterFrom = 30 + i * 20
          const counterEnd = counterFrom + 60
          const currentNum = Math.round(interpolate(frame, [counterFrom, counterEnd], [0, stat.numeric], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))
          const itemOpacity = interpolate(frame, [counterFrom, counterFrom + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

          return (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: itemOpacity }}>
              <span style={{ color: GOLD, fontSize: 80, fontWeight: 800, fontFamily: 'monospace', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {currentNum}{stat.suffix}
              </span>
              <span style={{ color: MUTED, fontSize: 16, fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center' }}>
                {stat.label}
              </span>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 6: CTA (frames 1760–2700) ──────────────────────────────────────────
const SceneCTA = ({ s }: { s: VideoStrings }) => {
  const frame = useCurrentFrame()

  const rectWidth = interpolate(frame, [40, 80], [0, 600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const rectHeight = interpolate(frame, [80, 110], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const rectFill = interpolate(frame, [120, 160], [0, 0.08], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const urlOpacity = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const logoOnlyOpacity = interpolate(frame, [800, 860], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const mainContentOpacity = interpolate(frame, [800, 860], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: FONT_STACK }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40, opacity: mainContentOpacity }}>
        <AnimatedText from={0} style={{ color: WHITE, fontSize: 72, fontWeight: 800, textAlign: 'center', letterSpacing: '-0.02em' }}>
          {s.cta.headline}
        </AnimatedText>
        <AnimatedText from={20} style={{ color: MUTED, fontSize: 24, textAlign: 'center', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
          {s.cta.subtitle}
        </AnimatedText>
        <div style={{ position: 'relative', width: rectWidth, height: rectHeight, border: `2px solid ${GOLD}`, backgroundColor: `rgba(201,168,76,${rectFill})`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <span style={{ color: GOLD, fontSize: 22, fontFamily: 'monospace', letterSpacing: '0.2em', opacity: urlOpacity, textTransform: 'uppercase' }}>
            suritargets.com
          </span>
        </div>
      </div>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: logoOnlyOpacity, backgroundColor: NAVY }}>
        <div style={{ width: 200, height: 2, backgroundColor: GOLD, marginBottom: 8 }} />
        <span style={{ color: WHITE, fontSize: 56, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>SURITARGETS</span>
        <span style={{ color: GOLD, fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Paramaribo, Suriname</span>
      </div>
    </AbsoluteFill>
  )
}

// ── Main composition ──────────────────────────────────────────────────────────
export const ExplainerVideo = ({ locale = 'nl' }: { locale?: string }) => {
  const s = STRINGS[locale] ?? STRINGS.nl

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      <Sequence from={0} durationInFrames={120}>
        <SceneBrandIntro />
      </Sequence>
      <Sequence from={100} durationInFrames={320}>
        <SceneProblem s={s} />
      </Sequence>
      <Sequence from={380} durationInFrames={370}>
        <SceneSolution s={s} />
      </Sequence>
      <Sequence from={710} durationInFrames={490}>
        <SceneServices s={s} />
      </Sequence>
      <Sequence from={1160} durationInFrames={640}>
        <SceneStats s={s} />
      </Sequence>
      <Sequence from={1760} durationInFrames={940}>
        <SceneCTA s={s} />
      </Sequence>
    </AbsoluteFill>
  )
}
