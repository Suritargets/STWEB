import React from 'react'
import { Sequence, interpolate, useCurrentFrame } from '@remotion/core'

// AbsoluteFill is not in this version of @remotion/core — implement inline
const AbsoluteFill = ({
  style,
  children,
}: {
  style?: React.CSSProperties
  children?: React.ReactNode
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      ...style,
    }}
  >
    {children}
  </div>
)
import { AnimatedText } from './components/AnimatedText'
import { GoldLine } from './components/GoldLine'

// ── Brand tokens ────────────────────────────────────────────────────────────
const NAVY = '#0B1628'
const GOLD = '#C9A84C'
const WHITE = '#E8EDF5'
const MUTED = '#6B7A99'

const FONT_STACK = "'Inter', 'Helvetica Neue', Arial, sans-serif"

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

  // Corner brackets fade in at frame 50
  const bracketOpacity = interpolate(frame, [50, 70], [0, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Scene fade-out at frames 90-120
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
      {/* Gold corner brackets */}
      <div
        style={cornerStyle({
          top: 40,
          left: 40,
          borderTop: `2px solid ${GOLD}`,
          borderLeft: `2px solid ${GOLD}`,
        })}
      />
      <div
        style={cornerStyle({
          top: 40,
          right: 40,
          borderTop: `2px solid ${GOLD}`,
          borderRight: `2px solid ${GOLD}`,
        })}
      />
      <div
        style={cornerStyle({
          bottom: 40,
          left: 40,
          borderBottom: `2px solid ${GOLD}`,
          borderLeft: `2px solid ${GOLD}`,
        })}
      />
      <div
        style={cornerStyle({
          bottom: 40,
          right: 40,
          borderBottom: `2px solid ${GOLD}`,
          borderRight: `2px solid ${GOLD}`,
        })}
      />

      {/* Gold line grows from center */}
      <GoldLine from={0} maxWidth={300} />

      {/* SURITARGETS title */}
      <AnimatedText
        from={15}
        style={{
          color: WHITE,
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: '0.15em',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        SURITARGETS
      </AnimatedText>

      {/* Location mono text */}
      <AnimatedText
        from={40}
        style={{
          color: GOLD,
          fontSize: 18,
          fontFamily: 'monospace',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          textAlign: 'center',
          opacity: undefined, // AnimatedText handles opacity
        }}
      >
        Paramaribo, Suriname
      </AnimatedText>
    </AbsoluteFill>
  )
}

// ── Scene 2: Problem (frames 100–420, Sequence from=100 dur=320) ─────────────
const SceneProblem = () => {
  const sceneOpacity = useFadeOut(290, 320)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAVY,
        fontFamily: FONT_STACK,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20,
        padding: '0 160px',
        opacity: sceneOpacity,
      }}
    >
      <AnimatedText
        from={0}
        style={{
          color: WHITE,
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        Caribische bedrijven
      </AnimatedText>

      <AnimatedText
        from={15}
        style={{
          color: GOLD,
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        verdienen beter.
      </AnimatedText>

      <AnimatedText
        from={40}
        style={{
          color: MUTED,
          fontSize: 24,
          textAlign: 'center',
          lineHeight: 1.6,
          marginTop: 16,
          maxWidth: 900,
        }}
      >
        Internationale kwaliteit was altijd ver weg of te duur.
      </AnimatedText>
    </AbsoluteFill>
  )
}

// ── Scene 3: Solution (frames 380–750, Sequence from=380 dur=370) ────────────
const SceneSolution = () => {
  const frame = useCurrentFrame()
  const sceneOpacity = useFadeOut(340, 370)

  // Spring-like pop-in for "Tot nu."
  const totNuScale = interpolate(frame, [0, 20], [0.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const totNuOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAVY,
        fontFamily: FONT_STACK,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 32,
        padding: '0 160px',
        opacity: sceneOpacity,
      }}
    >
      {/* "Tot nu." spring pop-in */}
      <div
        style={{
          color: GOLD,
          fontSize: 96,
          fontWeight: 800,
          textAlign: 'center',
          transform: `scale(${totNuScale})`,
          opacity: totNuOpacity,
          letterSpacing: '-0.02em',
        }}
      >
        Tot nu.
      </div>

      <AnimatedText
        from={25}
        style={{
          color: WHITE,
          fontSize: 32,
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: 1000,
        }}
      >
        Suritargets brengt internationale expertise
      </AnimatedText>

      <AnimatedText
        from={40}
        style={{
          color: WHITE,
          fontSize: 32,
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: 1000,
        }}
      >
        naar Suriname.
      </AnimatedText>
    </AbsoluteFill>
  )
}

// ── Scene 4: Services (frames 710–1200, Sequence from=710 dur=490) ────────────
const SERVICES = [
  'Bedrijfsondersteuning',
  'Web Applicaties',
  'Onderzoek & Analyse',
  'Forensisch Accountancy',
  'Educatie & Training',
]

const SceneServices = () => {
  const frame = useCurrentFrame()
  const sceneOpacity = useFadeOut(450, 490)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAVY,
        fontFamily: FONT_STACK,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0 160px',
        gap: 24,
        opacity: sceneOpacity,
      }}
    >
      <AnimatedText
        from={0}
        style={{
          color: GOLD,
          fontSize: 14,
          fontFamily: 'monospace',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        DIENSTEN
      </AnimatedText>

      <AnimatedText
        from={10}
        style={{
          color: WHITE,
          fontSize: 56,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: 32,
        }}
      >
        Vijf kerngebieden
      </AnimatedText>

      {SERVICES.map((service, i) => {
        const itemFrom = 40 + i * 8
        const slideIn = interpolate(frame, [itemFrom, itemFrom + 20], [-60, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        const itemOpacity = interpolate(frame, [itemFrom, itemFrom + 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        return (
          <div
            key={service}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              opacity: itemOpacity,
              transform: `translateX(${slideIn}px)`,
            }}
          >
            <span
              style={{
                color: GOLD,
                fontFamily: 'monospace',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.1em',
                minWidth: 48,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div
              style={{
                width: 2,
                height: 32,
                backgroundColor: GOLD,
                opacity: 0.4,
              }}
            />
            <span
              style={{
                color: WHITE,
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              {service}
            </span>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}

// ── Scene 5: Stats / Results (frames 1160–1800, Sequence from=1160 dur=640) ──
type StatItem = { target: string; label: string; numeric: number; suffix: string }

const STAT_ITEMS: StatItem[] = [
  { target: '5+', label: 'services', numeric: 5, suffix: '+' },
  { target: '10+', label: 'jaar ervaring', numeric: 10, suffix: '+' },
  { target: '100%', label: 'lokaal begrip', numeric: 100, suffix: '%' },
]

const SceneStats = () => {
  const frame = useCurrentFrame()
  const sceneOpacity = useFadeOut(600, 640)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAVY,
        fontFamily: FONT_STACK,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 64,
        padding: '0 160px',
        opacity: sceneOpacity,
      }}
    >
      <AnimatedText
        from={0}
        style={{
          color: WHITE,
          fontSize: 52,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          textAlign: 'center',
        }}
      >
        Bewezen resultaten
      </AnimatedText>

      <div
        style={{
          display: 'flex',
          gap: 120,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {STAT_ITEMS.map((stat, i) => {
          const counterFrom = 30 + i * 20
          const counterEnd = counterFrom + 60
          const currentNum = Math.round(
            interpolate(frame, [counterFrom, counterEnd], [0, stat.numeric], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          )
          const itemOpacity = interpolate(frame, [counterFrom, counterFrom + 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })

          return (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                opacity: itemOpacity,
              }}
            >
              <span
                style={{
                  color: GOLD,
                  fontSize: 80,
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {currentNum}
                {stat.suffix}
              </span>
              <span
                style={{
                  color: MUTED,
                  fontSize: 16,
                  fontFamily: 'monospace',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                {stat.label}
              </span>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 6: CTA (frames 1760–2700, Sequence from=1760 dur=940) ──────────────
const SceneCTA = () => {
  const frame = useCurrentFrame()

  // Gold rectangle border draws in (width 0 → 600, then fills)
  const rectWidth = interpolate(frame, [40, 80], [0, 600], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const rectHeight = interpolate(frame, [80, 110], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const rectFill = interpolate(frame, [120, 160], [0, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const urlOpacity = interpolate(frame, [130, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Final logo hold: fade everything except logo after frame 800
  const logoOnlyOpacity = interpolate(frame, [800, 860], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const mainContentOpacity = interpolate(frame, [800, 860], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        backgroundColor: NAVY,
        fontFamily: FONT_STACK,
      }}
    >
      {/* Main CTA content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          opacity: mainContentOpacity,
        }}
      >
        <AnimatedText
          from={0}
          style={{
            color: WHITE,
            fontSize: 72,
            fontWeight: 800,
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          Klaar om te groeien?
        </AnimatedText>

        <AnimatedText
          from={20}
          style={{
            color: MUTED,
            fontSize: 24,
            textAlign: 'center',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
          }}
        >
          Neem contact op — wij staan klaar.
        </AnimatedText>

        {/* Gold rectangle with suritargets.com */}
        <div
          style={{
            position: 'relative',
            width: rectWidth,
            height: rectHeight,
            border: `2px solid ${GOLD}`,
            backgroundColor: `rgba(201,168,76,${rectFill})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              color: GOLD,
              fontSize: 22,
              fontFamily: 'monospace',
              letterSpacing: '0.2em',
              opacity: urlOpacity,
              textTransform: 'uppercase',
            }}
          >
            suritargets.com
          </span>
        </div>
      </div>

      {/* Final logo hold */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          opacity: logoOnlyOpacity,
          backgroundColor: NAVY,
        }}
      >
        <div
          style={{
            width: 200,
            height: 2,
            backgroundColor: GOLD,
            marginBottom: 8,
          }}
        />
        <span
          style={{
            color: WHITE,
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          SURITARGETS
        </span>
        <span
          style={{
            color: GOLD,
            fontFamily: 'monospace',
            fontSize: 14,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          Paramaribo, Suriname
        </span>
      </div>
    </AbsoluteFill>
  )
}

// ── Main composition ─────────────────────────────────────────────────────────
export const ExplainerVideo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      {/* Scene 1 — Brand intro: frames 0–120 */}
      <Sequence from={0} durationInFrames={120}>
        <SceneBrandIntro />
      </Sequence>

      {/* Scene 2 — Problem: frames 100–420 */}
      <Sequence from={100} durationInFrames={320}>
        <SceneProblem />
      </Sequence>

      {/* Scene 3 — Solution: frames 380–750 */}
      <Sequence from={380} durationInFrames={370}>
        <SceneSolution />
      </Sequence>

      {/* Scene 4 — Services: frames 710–1200 */}
      <Sequence from={710} durationInFrames={490}>
        <SceneServices />
      </Sequence>

      {/* Scene 5 — Stats: frames 1160–1800 */}
      <Sequence from={1160} durationInFrames={640}>
        <SceneStats />
      </Sequence>

      {/* Scene 6 — CTA: frames 1760–2700 */}
      <Sequence from={1760} durationInFrames={940}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  )
}
