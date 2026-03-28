'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Brand tokens ───────────────────────────────────────────── */
const BLUE   = '#2B3494'
const GOLD   = '#C9A84C'
const WHITE  = '#F0F2FF'
const MUTED  = 'rgba(240,242,255,0.5)'
const BG     = '#090c22'

/* ─── Services ───────────────────────────────────────────────── */
const SERVICES = [
  { num: '01', name: 'Dashboarding & Data',   sub: 'Real-time KPI dashboards op maat',     icon: '▦' },
  { num: '02', name: 'Web & Applicaties',      sub: 'Custom platforms en ERP-systemen',      icon: '⬡' },
  { num: '03', name: 'Marketing met AI',       sub: 'AI-gedreven content en campagnes',      icon: '◈' },
  { num: '04', name: 'Forensics & Integriteit',sub: 'Forensisch onderzoek en compliance',    icon: '◉' },
  { num: '05', name: 'Education & Training',   sub: 'AI, tech en innovatie workshops',       icon: '◎' },
]

const WHY = [
  { n: '01', title: 'Caribisch begrip',       desc: 'Wij kennen de lokale markt en culturele context van Suriname.' },
  { n: '02', title: 'Bewezen methoden',        desc: 'Internationale frameworks, vertaald naar uw realiteit.' },
  { n: '03', title: 'Persoonlijke aanpak',     desc: 'Directe lijnen — u werkt met de specialist, niet een accountmanager.' },
]

/* ─── Scene IDs ──────────────────────────────────────────────── */
type SceneId = 'intro' | 'services' | 'why' | 'cta'
const SCENES: SceneId[] = ['intro', 'services', 'why', 'cta']
const DURATIONS: Record<SceneId, number> = { intro: 4500, services: 7000, why: 6000, cta: 4500 }

/* ─── Shared animation variants ─────────────────────────────── */
const fadeUp = {
  initial:  { opacity: 0, y: 28 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -20 },
}

/* ─── Scene 1: Intro ─────────────────────────────────────────── */
function SceneIntro() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 0 }}>
      {/* Mono label */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.6em' }}
        animate={{ opacity: 1, letterSpacing: '0.3em' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ color: GOLD, fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 24 }}
      >
        Suritargets — Paramaribo, Suriname
      </motion.p>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        style={{ color: WHITE, fontSize: 'clamp(28px, 4vw, 60px)', fontWeight: 900, textAlign: 'center', lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em', maxWidth: 700 }}
      >
        Uw bedrijf.<br />
        <span style={{ color: GOLD }}>Digitaal versterkt.</span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        style={{ color: MUTED, fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 40 }}
      >
        Business Intelligence &amp; Digital Solutions
      </motion.p>

      {/* Gold line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 160 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{ height: 2, background: GOLD, borderRadius: 1 }}
      />
    </div>
  )
}

/* ─── Scene 2: Services ──────────────────────────────────────── */
function SceneServices() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 'clamp(20px, 4%, 48px) clamp(24px, 6%, 72px)' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ marginBottom: 28 }}>
        <p style={{ color: GOLD, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}>Diensten</p>
        <h3 style={{ color: WHITE, fontSize: 'clamp(20px, 3vw, 38px)', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>Vijf kerngebieden</h3>
      </motion.div>

      {/* Service rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.13 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(43,52,148,0.22)',
              border: '1px solid rgba(43,52,148,0.5)',
              borderRadius: 8,
              padding: '10px 16px',
              flex: 1,
            }}
          >
            <span style={{ color: GOLD, fontFamily: 'monospace', fontSize: 22, lineHeight: 1, minWidth: 28 }}>{s.icon}</span>
            <div style={{ width: 1, height: 28, background: 'rgba(201,168,76,0.3)' }} />
            <div style={{ flex: 1 }}>
              <p style={{ color: WHITE, fontSize: 'clamp(12px, 1.4vw, 16px)', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{s.name}</p>
              <p style={{ color: MUTED, fontSize: 'clamp(10px, 1.1vw, 13px)', margin: '2px 0 0', fontFamily: 'monospace' }}>{s.sub}</p>
            </div>
            <span style={{ color: GOLD, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.1em', opacity: 0.6 }}>{s.num}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Scene 3: Why Suritargets ───────────────────────────────── */
function SceneWhy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 'clamp(20px, 4%, 48px) clamp(24px, 6%, 72px)', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ marginBottom: 36 }}>
        <p style={{ color: GOLD, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}>Waarom ons</p>
        <h3 style={{ color: WHITE, fontSize: 'clamp(20px, 3vw, 38px)', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
          Lokale expertise,<br /><span style={{ color: GOLD }}>internationale standaard</span>
        </h3>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {WHY.map((w, i) => (
          <motion.div
            key={w.n}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.18 }}
            style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}
          >
            <span style={{ color: GOLD, fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.2em', minWidth: 28, paddingTop: 3 }}>{w.n}</span>
            <div style={{ width: 2, minHeight: 40, background: `rgba(201,168,76,0.35)`, borderRadius: 1 }} />
            <div>
              <p style={{ color: WHITE, fontSize: 'clamp(14px, 1.6vw, 20px)', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{w.title}</p>
              <p style={{ color: MUTED, fontSize: 'clamp(11px, 1.2vw, 14px)', margin: 0, lineHeight: 1.6 }}>{w.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Scene 4: CTA ───────────────────────────────────────────── */
function SceneCTA() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 0 }}>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
        style={{ color: GOLD, fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}
      >
        Aan de slag
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
        style={{ color: WHITE, fontSize: 'clamp(26px, 4vw, 56px)', fontWeight: 900, textAlign: 'center', margin: '0 0 12px', letterSpacing: '-0.02em' }}
      >
        Klaar om te groeien?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
        style={{ color: MUTED, fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.1em', marginBottom: 40 }}
      >
        Neem contact op — wij staan klaar.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          border: `1.5px solid ${GOLD}`,
          padding: '12px 40px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ color: GOLD, fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          suritargets.com
        </span>
      </motion.div>

      <motion.div
        initial={{ width: 0 }} animate={{ width: 80 }} transition={{ delay: 1.1, duration: 0.6 }}
        style={{ height: 1, background: `rgba(201,168,76,0.4)`, marginTop: 32 }}
      />
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.5 }}
        style={{ color: MUTED, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 14 }}
      >
        Paramaribo, Suriname
      </motion.p>
    </div>
  )
}

/* ─── Progress bar ───────────────────────────────────────────── */
function ProgressDots({ current }: { current: number }) {
  return (
    <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
      {SCENES.map((_, i) => (
        <div key={i} style={{
          width: i === current ? 24 : 8,
          height: 4,
          borderRadius: 2,
          background: i === current ? GOLD : 'rgba(201,168,76,0.25)',
          transition: 'all 0.4s ease',
        }} />
      ))}
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────── */
export function InfomercialGraphic() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const scene = SCENES[idx]
    const timer = setTimeout(() => setIdx((i) => (i + 1) % SCENES.length), DURATIONS[scene])
    return () => clearTimeout(timer)
  }, [idx])

  const scene = SCENES[idx]

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        background: BG,
        overflow: 'hidden',
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.18,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Ccircle cx='1' cy='1' r='1' fill='%232B3494'/%3E%3C/svg%3E")`,
      }} />

      {/* Blue corner accent top-left */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 120, height: 120, background: `radial-gradient(circle at 0 0, rgba(43,52,148,0.4), transparent 70%)`, pointerEvents: 'none' }} />
      {/* Gold corner accent bottom-right */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at 100% 100%, rgba(201,168,76,0.15), transparent 70%)`, pointerEvents: 'none' }} />

      {/* Corner brackets */}
      {[
        { top: 16, left: 16, borderTop: `1.5px solid rgba(201,168,76,0.4)`, borderLeft: `1.5px solid rgba(201,168,76,0.4)` },
        { top: 16, right: 16, borderTop: `1.5px solid rgba(201,168,76,0.4)`, borderRight: `1.5px solid rgba(201,168,76,0.4)` },
        { bottom: 32, left: 16, borderBottom: `1.5px solid rgba(201,168,76,0.4)`, borderLeft: `1.5px solid rgba(201,168,76,0.4)` },
        { bottom: 32, right: 16, borderBottom: `1.5px solid rgba(201,168,76,0.4)`, borderRight: `1.5px solid rgba(201,168,76,0.4)` },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 20, height: 20, pointerEvents: 'none', ...s }} />
      ))}

      {/* Scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          {...fadeUp}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {scene === 'intro'    && <SceneIntro />}
          {scene === 'services' && <SceneServices />}
          {scene === 'why'      && <SceneWhy />}
          {scene === 'cta'      && <SceneCTA />}
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <ProgressDots current={idx} />
    </div>
  )
}
