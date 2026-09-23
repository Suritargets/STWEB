import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'

// A short, loopable, language-neutral loop for the digital-visual-designs
// hero: a stylised "designer's screen" picking a color palette, then an
// AI prompt bar "typing" and resolving into a generated graphic.

const NAVY = '#0B1628'
const PANEL = '#141F35'
const MUTED = '#3C4A66'
const GOLD = '#C9A84C'

const SWATCHES = ['#f9ce34', '#ee2a7b', '#6228d7', '#2B3494', '#00c6ff', '#E8192C']

const PALETTE_START = 20
const PALETTE_END = 100
const PROMPT_START = 105
const PROMPT_TYPE_END = 145
const GENERATE_START = 150
const REVEAL_START = 185
const REVEAL_END = 215
const FADE_OUT_START = 225
const FADE_OUT_END = 240

function clampInterpolate(frame: number, input: number[], output: number[]) {
  return interpolate(frame, input, output, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
}

export const HeroDesignerLoop: React.FC = () => {
  const frame = useCurrentFrame()

  const introOpacity = clampInterpolate(frame, [0, 18], [0, 1])
  const outroOpacity = clampInterpolate(frame, [FADE_OUT_START, FADE_OUT_END], [1, 0])
  const sceneOpacity = Math.min(introOpacity, outroOpacity)

  const activeSwatch = Math.min(
    SWATCHES.length - 1,
    Math.floor(clampInterpolate(frame, [PALETTE_START, PALETTE_END], [0, SWATCHES.length])),
  )
  const cursorX = clampInterpolate(frame, [PALETTE_START, PALETTE_END], [0, 1])

  const typedChars = Math.round(clampInterpolate(frame, [PROMPT_START, PROMPT_TYPE_END], [0, 14]))
  const generatingOpacity = clampInterpolate(frame, [GENERATE_START, GENERATE_START + 10], [0, 1])
  const shimmerX = ((frame - GENERATE_START) * 6) % 220

  const revealOpacity = clampInterpolate(frame, [REVEAL_START, REVEAL_END], [0, 1])
  const revealScale = clampInterpolate(frame, [REVEAL_START, REVEAL_END], [0.92, 1])
  const checkOpacity = clampInterpolate(frame, [REVEAL_END - 5, REVEAL_END + 10], [0, 1])

  return (
    <AbsoluteFill style={{ background: NAVY, opacity: sceneOpacity, fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>
      {/* Window chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '22px 28px', borderBottom: `1px solid ${MUTED}` }}>
        <div style={{ width: 14, height: 14, borderRadius: 14, background: '#E8192C' }} />
        <div style={{ width: 14, height: 14, borderRadius: 14, background: '#f9ce34' }} />
        <div style={{ width: 14, height: 14, borderRadius: 14, background: '#3ecf6e' }} />
      </div>

      <div style={{ display: 'flex', flex: 1, padding: 28, gap: 24 }}>
        {/* Palette sidebar */}
        <div
          style={{
            width: 96,
            background: PANEL,
            borderRadius: 16,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            alignItems: 'center',
          }}
        >
          {SWATCHES.map((color, i) => {
            const isActive = i === activeSwatch && cursorX > 0
            return (
              <div
                key={color}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: color,
                  boxShadow: isActive ? `0 0 0 4px rgba(255,255,255,0.85)` : 'none',
                  transform: isActive ? 'scale(1.12)' : 'scale(1)',
                  transition: 'none',
                }}
              />
            )
          })}
        </div>

        {/* Artboard */}
        <div
          style={{
            flex: 1,
            background: PANEL,
            borderRadius: 16,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Prompt bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: NAVY,
              borderRadius: 12,
              padding: '14px 18px',
              border: `1px solid ${MUTED}`,
            }}
          >
            <div style={{ color: GOLD, fontSize: 20 }}>✦</div>
            <div style={{ display: 'flex', gap: 6, flex: 1 }}>
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 8,
                    width: i < typedChars ? 20 : 0,
                    borderRadius: 4,
                    background: '#8A97B4',
                    opacity: i < typedChars ? 1 : 0,
                    transition: 'none',
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                color: generatingOpacity > 0.05 ? GOLD : MUTED,
                opacity: Math.max(generatingOpacity, 0.4),
                fontWeight: 700,
              }}
            >
              {generatingOpacity > 0.5 && revealOpacity < 0.5 ? 'GENERATING' : 'PROMPT'}
            </div>
          </div>

          {/* Canvas */}
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              position: 'relative',
              overflow: 'hidden',
              background: '#0E1730',
              border: `1px solid ${MUTED}`,
            }}
          >
            {/* shimmer while "generating" */}
            {generatingOpacity > 0.05 && revealOpacity < 0.98 && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: generatingOpacity * (1 - revealOpacity),
                  background: `linear-gradient(100deg, transparent ${shimmerX - 40}px, rgba(255,255,255,0.10) ${shimmerX}px, transparent ${shimmerX + 40}px)`,
                }}
              />
            )}

            {/* revealed generated graphic */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: revealOpacity,
                transform: `scale(${revealScale})`,
                background: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 160,
                  height: 160,
                  borderRadius: 160,
                  background: 'rgba(255,255,255,0.18)',
                  top: 30,
                  left: 40,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '70%',
                  height: 10,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.5)',
                  bottom: 60,
                  left: 40,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '45%',
                  height: 10,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.3)',
                  bottom: 36,
                  left: 40,
                }}
              />
            </div>

            {/* success badge */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                opacity: checkOpacity,
                background: '#3ecf6e',
                color: NAVY,
                width: 34,
                height: 34,
                borderRadius: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 18,
              }}
            >
              ✓
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
