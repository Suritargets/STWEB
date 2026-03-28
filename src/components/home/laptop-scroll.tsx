'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'

/* ─── Scenes ─────────────────────────────────────────────────── */
const scenes = [
  { id: 'builder',  label: 'Drag & Drop Builder',   sublabel: 'Web & Applicaties',     content: <BuilderScene /> },
  { id: 'code',     label: 'Custom Applicatie',       sublabel: 'Web & Applicaties',     content: <CodeScene /> },
  { id: 'data',     label: 'Data Visualisatie',      sublabel: 'Dashboarding & BI',     content: <DataScene /> },
  { id: 'industry', label: 'Elke Branche',           sublabel: 'Finance · Retail · Gov · Health', content: <IndustryScene /> },
]

/* ─── Main section ───────────────────────────────────────────── */
export function LaptopScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22 })

  const monitorScale = useTransform(smooth, [0, 0.12, 0.88, 1.0], [0.78, 1, 1, 0.78])
  const monitorOpacity = useTransform(smooth, [0, 0.08, 0.92, 1.0], [0, 1, 1, 0])
  const sceneProgress = useTransform(smooth, [0.12, 0.88], [0, scenes.length])

  return (
    <div ref={containerRef} style={{ height: '420vh' }} className="hidden md:block">
      {/* Sticky frame */}
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: '#F4F5FA' }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='%232B3494' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Blue glow behind monitor */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 700,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(43,52,148,0.10) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Scene label */}
        <SceneLabel smooth={smooth} />

        {/* Monitor */}
        <motion.div style={{ scale: monitorScale, opacity: monitorOpacity }} className="relative z-10">
          <DesktopMonitor sceneProgress={sceneProgress} />
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          className="absolute bottom-8 text-[10px] font-mono tracking-[0.3em] uppercase text-[#2B3494]/40"
          style={{ opacity: useTransform(smooth, [0, 0.08, 0.16], [1, 1, 0]) }}
        >
          scroll
        </motion.p>
      </div>
    </div>
  )
}

/* ─── Scene label ────────────────────────────────────────────── */
function SceneLabel({ smooth }: { smooth: MotionValue<number> }) {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none" style={{ minWidth: 320 }}>
      {scenes.map((scene, i) => {
        const start = 0.12 + (i / scenes.length) * 0.76
        const end   = 0.12 + ((i + 1) / scenes.length) * 0.76
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(smooth, [start - 0.02, start + 0.06, end - 0.06, end + 0.02], [0, 1, 1, 0])
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(smooth, [start - 0.02, start + 0.06], [8, 0])
        return (
          <motion.div key={scene.id} style={{ opacity, y, position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#2B3494]/50 mb-1">{scene.sublabel}</p>
            <p className="text-2xl font-black text-[#2B3494]">{scene.label}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─── Desktop monitor shell ──────────────────────────────────── */
function DesktopMonitor({ sceneProgress }: { sceneProgress: MotionValue<number> }) {
  const SW = 860  // screen width
  const SH = 520  // screen height
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Monitor frame */}
      <div
        style={{
          width: SW + 24,
          background: 'linear-gradient(180deg, #e8eaf0 0%, #d4d7e3 100%)',
          borderRadius: 16,
          padding: '14px 12px 10px',
          boxShadow: '0 20px 60px rgba(43,52,148,0.18), 0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
          border: '1px solid rgba(43,52,148,0.12)',
        }}
      >
        {/* Camera dot */}
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#b0b4c8', margin: '0 auto 8px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)' }} />

        {/* Screen */}
        <div
          style={{
            width: SW,
            height: SH,
            background: '#f0f2f8',
            borderRadius: 6,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 0 0 1px rgba(43,52,148,0.1)',
          }}
        >
          {/* Glass reflection */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 40%)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />
          {/* Scene switcher */}
          <ScreenContent sceneProgress={sceneProgress} />
        </div>
      </div>

      {/* Stand neck */}
      <div
        style={{
          width: 90,
          height: 22,
          background: 'linear-gradient(180deg, #d4d7e3 0%, #c8cad8 100%)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
        }}
      />
      {/* Stand base */}
      <div
        style={{
          width: 220,
          height: 12,
          background: 'linear-gradient(180deg, #c8cad8 0%, #b8bac8 100%)',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
        }}
      />
    </div>
  )
}

/* ─── Scene switcher ─────────────────────────────────────────── */
function ScreenContent({ sceneProgress }: { sceneProgress: MotionValue<number> }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {scenes.map((scene, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(sceneProgress, [i - 0.4, i + 0.3, i + 0.7, i + 1.4], [0, 1, 1, 0])
        return (
          <motion.div key={scene.id} style={{ position: 'absolute', inset: 0, opacity }}>
            {scene.content}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─── Scene 1: Drag & Drop Builder ──────────────────────────── */
function BuilderScene() {
  const sidebarItems = [
    { label: 'KPI Card',   color: '#2B3494' },
    { label: 'Bar Chart',  color: '#3d4db8' },
    { label: 'Data Table', color: '#4a5acd' },
    { label: 'Filter Bar', color: '#2B3494' },
    { label: 'Line Chart', color: '#5568e0' },
  ]
  const canvasCards = [
    { label: 'Total Revenue',  value: '$248,910', change: '+18%', green: true,  x: 0,   y: 0,   w: 240, h: 90 },
    { label: 'Active Users',   value: '1,204',    change: '+34%', green: true,  x: 256, y: 0,   w: 200, h: 90 },
    { label: 'Cost Savings',   value: '$89,200',  change: '-5%',  green: true,  x: 472, y: 0,   w: 200, h: 90 },
    { label: 'Revenue Chart',  value: '',         change: '',     green: false, x: 0,   y: 106, w: 420, h: 160 },
    { label: 'Client Table',   value: '',         change: '',     green: false, x: 0,   y: 282, w: 420, h: 120 },
    { label: 'Pipeline',       value: '',         change: '',     green: false, x: 436, y: 106, w: 236, h: 296 },
  ]
  return (
    <div style={{ width: '100%', height: '100%', background: '#0d1035', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 160, background: '#090b22', borderRight: '1px solid rgba(255,255,255,0.06)', padding: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', letterSpacing: '0.15em', marginBottom: 12 }}>COMPONENTS</div>
        {sidebarItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            style={{
              background: `${item.color}33`,
              border: `1px solid ${item.color}66`,
              borderRadius: 6,
              padding: '7px 10px',
              marginBottom: 7,
              fontSize: 11,
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'grab',
            }}
          >
            <span style={{ opacity: 0.5, fontSize: 10 }}>⠿</span>
            {item.label}
          </motion.div>
        ))}
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, padding: 20, position: 'relative' }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', letterSpacing: '0.15em', marginBottom: 12 }}>CANVAS — Dashboard.app</div>
        <div style={{ position: 'relative', height: 430 }}>
          {canvasCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.14, duration: 0.45, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: card.x,
                top: card.y,
                width: card.w,
                height: card.h,
                background: 'rgba(43,52,148,0.22)',
                border: '1px solid rgba(43,52,148,0.55)',
                borderRadius: 8,
                padding: 12,
                backdropFilter: 'blur(6px)',
              }}
            >
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 5 }}>{card.label}</div>
              {card.value && (
                <>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{card.value}</div>
                  <div style={{ fontSize: 11, color: card.green ? '#4ade80' : '#f87171', marginTop: 4, fontFamily: 'monospace' }}>{card.change}</div>
                </>
              )}
              {card.label === 'Revenue Chart' && <MiniBarChart tall />}
              {card.label === 'Client Table' && <MiniTable />}
              {card.label === 'Pipeline' && <MiniPipeline />}
            </motion.div>
          ))}

          {/* Drag ghost */}
          <motion.div
            initial={{ x: -90, y: 70, opacity: 0, rotate: -3 }}
            animate={{ x: 260, y: 270, opacity: [0, 0.85, 0.85, 0], rotate: 0 }}
            transition={{ delay: 1.4, duration: 1.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 100,
              height: 34,
              background: 'rgba(43,52,148,0.75)',
              border: '1.5px dashed rgba(255,255,255,0.5)',
              borderRadius: 6,
              fontSize: 11,
              color: 'rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
              cursor: 'grabbing',
              fontFamily: 'sans-serif',
            }}
          >
            <span style={{ opacity: 0.6 }}>⠿</span> Filter Bar
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function MiniBarChart({ tall = false }: { tall?: boolean }) {
  const bars = [0.45, 0.72, 0.58, 0.90, 0.65, 0.82, 0.70, 0.95]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: tall ? 80 : 40, marginTop: 8 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
          style={{
            flex: 1,
            height: `${h * 100}%`,
            background: `linear-gradient(180deg, rgba(120,140,255,0.9) 0%, rgba(43,52,148,0.7) 100%)`,
            borderRadius: '3px 3px 0 0',
            transformOrigin: 'bottom',
            boxShadow: '0 0 6px rgba(99,132,255,0.25)',
          }}
        />
      ))}
    </div>
  )
}

function MiniTable() {
  const rows = [
    { name: 'Alpha Corp', val: '$48,200', up: true },
    { name: 'Beta Ltd',   val: '$31,500', up: false },
    { name: 'Gamma Inc',  val: '$27,800', up: true },
    { name: 'Delta Co',   val: '$19,100', up: true },
  ]
  return (
    <div style={{ marginTop: 4 }}>
      {rows.map((r) => (
        <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '5px 0', fontSize: 11, color: 'rgba(255,255,255,0.65)', fontFamily: 'sans-serif' }}>
          <span>{r.name}</span>
          <span style={{ fontFamily: 'monospace', color: r.up ? '#4ade80' : '#f87171' }}>{r.val}</span>
        </div>
      ))}
    </div>
  )
}

function MiniPipeline() {
  const stages = [
    { label: 'Lead', n: 24, pct: 0.9 },
    { label: 'Prospect', n: 12, pct: 0.55 },
    { label: 'Proposal', n: 7, pct: 0.32 },
    { label: 'Closed', n: 3, pct: 0.15 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
      {stages.map((s) => (
        <div key={s.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 3, fontFamily: 'monospace' }}>
            <span>{s.label}</span><span>{s.n}</span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
              style={{ height: '100%', width: `${s.pct * 100}%`, background: 'rgba(99,132,255,0.7)', borderRadius: 3, transformOrigin: 'left' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Scene 2: Code Editor ───────────────────────────────────── */
function CodeScene() {
  const lines = [
    { code: `// Custom order processing module`,                 c: '#94a3b8' },
    { code: `export async function processOrder(`,               c: '#e2e8ff' },
    { code: `  order: Order,`,                                   c: '#a5b4fc' },
    { code: `  client: Client`,                                  c: '#a5b4fc' },
    { code: `): Promise<OrderResult> {`,                         c: '#e2e8ff' },
    { code: ``,                                                  c: '' },
    { code: `  const validated = await validate(order)`,         c: '#4ade80' },
    { code: `  const invoice   = createInvoice(validated)`,      c: '#4ade80' },
    { code: ``,                                                  c: '' },
    { code: `  await db.orders.insert({`,                        c: '#e2e8ff' },
    { code: `    ...invoice,`,                                   c: '#a5b4fc' },
    { code: `    clientId:  client.id,`,                         c: '#a5b4fc' },
    { code: `    currency:  "SRD",`,                             c: '#a5b4fc' },
    { code: `    status:    "confirmed",`,                        c: '#a5b4fc' },
    { code: `  })`,                                              c: '#e2e8ff' },
    { code: ``,                                                  c: '' },
    { code: `  return { success: true, invoice }`,               c: '#4ade80' },
    { code: `}`,                                                 c: '#e2e8ff' },
  ]
  return (
    <div style={{ width: '100%', height: '100%', background: '#0d1035', display: 'flex' }}>
      {/* Line numbers */}
      <div style={{ width: 44, background: '#090b22', padding: '14px 0', borderRight: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        {lines.map((_, i) => (
          <div key={i} style={{ height: 24, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, fontSize: 11, color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace' }}>
            {i + 1}
          </div>
        ))}
      </div>

      {/* Code */}
      <div style={{ flex: 1, padding: '14px 20px', overflow: 'hidden' }}>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            style={{ height: 24, display: 'flex', alignItems: 'center', fontSize: 13, fontFamily: 'monospace', color: line.c || 'transparent', whiteSpace: 'nowrap' }}
          >
            {line.code || '\u00A0'}
          </motion.div>
        ))}
        {/* Blink cursor */}
        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.9 }}
          style={{ display: 'inline-block', width: 8, height: 16, background: '#6879d4', marginTop: 4 }} />
      </div>

      {/* Preview panel */}
      <div style={{ width: 260, background: '#080b1a', borderLeft: '1px solid rgba(255,255,255,0.06)', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', letterSpacing: '0.15em' }}>API TEST</div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
          style={{ background: 'rgba(43,52,148,0.3)', border: '1px solid rgba(43,52,148,0.55)', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 8, fontFamily: 'monospace' }}>POST /api/orders</div>
          {[
            { label: 'status',   val: '"confirmed"', green: true },
            { label: 'invoice',  val: '"INV-00847"', green: true },
            { label: 'currency', val: '"SRD"',       green: false },
            { label: 'success',  val: 'true',        green: true },
          ].map((r) => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'monospace', marginBottom: 5 }}>
              <span style={{ color: 'rgba(165,180,252,0.7)' }}>{r.label}</span>
              <span style={{ color: r.green ? '#4ade80' : 'rgba(255,255,255,0.6)' }}>{r.val}</span>
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.5 }}
          style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: '#4ade80', fontFamily: 'monospace' }}>
          ✓ 200 OK · 42ms
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.5 }}
          style={{ background: 'rgba(43,52,148,0.15)', border: '1px solid rgba(43,52,148,0.3)', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
          ↻ TypeScript · strict
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Scene 3: Data Dashboard ────────────────────────────────── */
function DataScene() {
  const kpis = [
    { label: 'Totale Omzet', value: '$248,910', change: '+18%', green: true },
    { label: 'Actieve Klanten', value: '1,204', change: '+34%', green: true },
    { label: 'Kostenbesparing', value: '$89,200', change: '-5%', green: true },
    { label: 'NPS Score', value: '72', change: '+8pt', green: true },
  ]
  const bars = [
    { q: 'Jan', v: 0.52 }, { q: 'Feb', v: 0.68 }, { q: 'Mar', v: 0.59 },
    { q: 'Apr', v: 0.81 }, { q: 'May', v: 0.74 }, { q: 'Jun', v: 0.88 },
    { q: 'Jul', v: 0.79 }, { q: 'Aug', v: 0.95 },
  ]
  return (
    <div style={{ width: '100%', height: '100%', background: '#0d1035', padding: 20, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: 'sans-serif' }}>Analytics Dashboard</div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', background: 'rgba(43,52,148,0.3)', padding: '4px 10px', borderRadius: 20 }}>● Live · 2026</div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }}
            style={{ flex: 1, background: 'rgba(43,52,148,0.28)', border: '1px solid rgba(43,52,148,0.55)', borderRadius: 10, padding: '12px 14px', backdropFilter: 'blur(6px)' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1, fontFamily: 'sans-serif' }}>{k.value}</div>
            <div style={{ fontSize: 11, color: k.green ? '#4ade80' : '#f87171', marginTop: 5, fontFamily: 'monospace' }}>{k.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Bottom two panels */}
      <div style={{ display: 'flex', gap: 12, height: 260 }}>
        {/* Bar chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }}
          style={{ flex: 2, background: 'rgba(43,52,148,0.18)', border: '1px solid rgba(43,52,148,0.4)', borderRadius: 10, padding: 16, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 12 }}>Omzet per maand</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            {bars.map((b, i) => (
              <div key={b.q} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  style={{ width: '100%', height: b.v * 160, background: `linear-gradient(180deg, rgba(120,140,255,0.9) 0%, rgba(43,52,148,0.65) 100%)`, borderRadius: '4px 4px 0 0', transformOrigin: 'bottom', boxShadow: '0 0 8px rgba(99,132,255,0.2)' }} />
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{b.q}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sparklines + table */}
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.4 }}
          style={{ flex: 1, background: 'rgba(43,52,148,0.18)', border: '1px solid rgba(43,52,148,0.4)', borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: 10 }}>Top klanten</div>
          {[
            { name: 'Alpha Corp', val: '$48,200', up: true },
            { name: 'Beta Ltd',   val: '$31,500', up: false },
            { name: 'Gamma Inc',  val: '$27,800', up: true },
            { name: 'Delta Co',   val: '$19,100', up: true },
            { name: 'Epsilon BV', val: '$14,400', up: true },
          ].map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
              style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '7px 0', fontSize: 12, color: 'rgba(255,255,255,0.65)', fontFamily: 'sans-serif' }}>
              <span>{r.name}</span>
              <span style={{ fontFamily: 'monospace', color: r.up ? '#4ade80' : '#f87171' }}>{r.val}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Scene 4: Industries ─────────────────────────────────────── */
function IndustryScene() {
  const industries = [
    { label: 'Finance',    icon: '₿',  desc: 'FinTech · Trading · ERP',           color: '#2B3494' },
    { label: 'Retail',     icon: '🛒', desc: 'POS · Inventory · BI',              color: '#1e5a9e' },
    { label: 'Government', icon: '🏛', desc: 'Forensics · Compliance · Audit',    color: '#1a4a7a' },
    { label: 'Healthcare', icon: '⚕️', desc: 'Records · Analytics · Reporting',   color: '#153975' },
    { label: 'Education',  icon: '🎓', desc: 'LMS · AI Training · Skills',        color: '#1a3060' },
    { label: 'Logistics',  icon: '📦', desc: 'Tracking · Dashboard · Automation', color: '#112550' },
  ]
  return (
    <div style={{ width: '100%', height: '100%', background: '#0d1035', padding: 24, display: 'flex', flexDirection: 'column' }}>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ textAlign: 'center', marginBottom: 6 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'sans-serif' }}>Oplossingen voor elke branche</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', marginTop: 4 }}>Volledig op maat — geen standaard software</div>
      </motion.div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, paddingTop: 16 }}>
        {industries.map((ind, i) => (
          <motion.div key={ind.label} initial={{ opacity: 0, scale: 0.88, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
            style={{
              background: `linear-gradient(135deg, ${ind.color}60, ${ind.color}28)`,
              border: `1px solid ${ind.color}99`,
              borderRadius: 12,
              padding: '18px 16px',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: 8,
            }}>
            <div style={{ fontSize: 30 }}>{ind.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: 'sans-serif' }}>{ind.label}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace', lineHeight: 1.5 }}>{ind.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
