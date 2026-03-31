'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

/* ─── Skeleton shimmer ────────────────────────────────────────── */
function Sk({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn('rounded bg-white/[0.06] relative overflow-hidden', className)}
      style={style}
    >
      <div className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          animation: 'shimmerSlide 1.8s infinite',
        }}
      />
    </div>
  )
}

/* ─── Dashboard skeleton ─────────────────────────────────────── */
function DashboardSkeleton() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-44 shrink-0 border-r border-white/[0.06] p-4 flex flex-col gap-3">
        <Sk className="h-6 w-24 mb-4" />
        {[80, 100, 70, 90, 75].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <Sk className="w-4 h-4 rounded-sm" />
            <Sk className={`h-3`} style={{ width: `${w}%` } as React.CSSProperties} />
          </div>
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 p-5 flex flex-col gap-4">
        {/* KPI row */}
        <div className="grid grid-cols-4 gap-3">
          {['Omzet', 'Klanten', 'Groei', 'NPS'].map((label) => (
            <div key={label} className="bg-white/[0.04] border border-white/[0.07] rounded-lg p-3">
              <Sk className="h-2.5 w-14 mb-3" />
              <Sk className="h-6 w-20 mb-2" />
              <Sk className="h-2 w-10" />
            </div>
          ))}
        </div>
        {/* Chart + table row */}
        <div className="flex gap-3 flex-1">
          <div className="flex-[2] bg-white/[0.04] border border-white/[0.07] rounded-lg p-4 flex flex-col gap-3">
            <Sk className="h-3 w-32" />
            <div className="flex-1 flex items-end gap-1.5">
              {[55, 72, 60, 88, 74, 91, 68, 95, 82, 77].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: 'rgba(43,52,148,0.55)', borderTop: '1px solid rgba(99,132,255,0.4)' }} />
              ))}
            </div>
          </div>
          <div className="flex-1 bg-white/[0.04] border border-white/[0.07] rounded-lg p-4">
            <Sk className="h-3 w-20 mb-4" />
            {[0,1,2,3,4].map(i => (
              <div key={i} className="flex justify-between py-2 border-b border-white/[0.05]">
                <Sk className="h-2.5 w-20" />
                <Sk className="h-2.5 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Web App skeleton ───────────────────────────────────────── */
function WebAppSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {/* Nav */}
      <div className="h-12 border-b border-white/[0.06] flex items-center px-5 gap-4 shrink-0">
        <Sk className="h-5 w-24 rounded-sm" />
        <div className="flex gap-3 ml-4">
          {[60, 52, 68, 56].map((w, i) => <Sk key={i} className="h-3 rounded" style={{ width: w } as React.CSSProperties} />)}
        </div>
        <div className="ml-auto flex gap-2">
          <Sk className="h-7 w-20 rounded-md" />
          <Sk className="h-7 w-7 rounded-full" />
        </div>
      </div>
      {/* Hero area */}
      <div className="px-10 py-8 border-b border-white/[0.06] flex flex-col items-center gap-3">
        <Sk className="h-3 w-32 mb-1" />
        <Sk className="h-8 w-80" />
        <Sk className="h-8 w-64" />
        <Sk className="h-3 w-96 mt-1" />
        <div className="flex gap-3 mt-3">
          <Sk className="h-9 w-28 rounded-md" />
          <Sk className="h-9 w-28 rounded-md" />
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 p-5 flex-1">
        {[0,1,2].map(i => (
          <div key={i} className="bg-white/[0.04] border border-white/[0.07] rounded-lg p-4 flex flex-col gap-3">
            <Sk className="h-8 w-8 rounded-lg" />
            <Sk className="h-4 w-28" />
            <Sk className="h-2.5 w-full" />
            <Sk className="h-2.5 w-4/5" />
            <Sk className="h-2.5 w-3/5" />
            <Sk className="h-7 w-20 rounded-md mt-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── ERP skeleton ───────────────────────────────────────────── */
function ErpSkeleton() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 shrink-0 border-r border-white/[0.06] p-4 flex flex-col gap-1">
        <Sk className="h-5 w-28 mb-4 rounded-sm" />
        {['Relaties', 'Facturen', 'Producten', 'Inkoop', 'Rapporten', 'Instellingen'].map((_, i) => (
          <div key={i} className={cn('flex items-center gap-2 rounded px-2 py-2', i === 1 && 'bg-[#2B3494]/40')}>
            <Sk className="w-3.5 h-3.5 rounded-sm shrink-0" />
            <Sk className="h-2.5 flex-1" />
          </div>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-11 border-b border-white/[0.06] flex items-center gap-3 px-5 shrink-0">
          <Sk className="h-4 w-28" />
          <div className="ml-auto flex gap-2">
            <Sk className="h-7 w-20 rounded-md" />
            <Sk className="h-7 w-20 rounded-md" />
          </div>
        </div>
        {/* Table */}
        <div className="flex-1 p-4">
          {/* Table header */}
          <div className="grid grid-cols-5 gap-4 pb-2 border-b border-white/[0.08] mb-2">
            {[100, 80, 90, 70, 60].map((w, i) => <Sk key={i} className="h-2.5" style={{ width: `${w}%` } as React.CSSProperties} />)}
          </div>
          {[...Array(7)].map((_, r) => (
            <div key={r} className="grid grid-cols-5 gap-4 py-2.5 border-b border-white/[0.04]">
              {[90, 75, 85, 65, 55].map((w, i) => <Sk key={i} className="h-2.5" style={{ width: `${w}%` } as React.CSSProperties} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Marketing AI skeleton ──────────────────────────────────── */
function MarketingSkeleton() {
  return (
    <div className="flex h-full gap-0">
      {/* Left: input panel */}
      <div className="w-64 shrink-0 border-r border-white/[0.06] p-4 flex flex-col gap-4">
        <Sk className="h-4 w-32 mb-1" />
        <div className="flex flex-col gap-2">
          <Sk className="h-2.5 w-16" />
          <Sk className="h-8 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Sk className="h-2.5 w-20" />
          <Sk className="h-16 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Sk className="h-2.5 w-24" />
          <div className="flex gap-2 flex-wrap">
            {[50, 64, 44, 56, 48].map((w, i) => <Sk key={i} className="h-6 rounded-full" style={{ width: w } as React.CSSProperties} />)}
          </div>
        </div>
        <Sk className="h-9 w-full rounded-md mt-auto" />
      </div>
      {/* Right: output */}
      <div className="flex-1 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Sk className="h-4 w-36" />
          <Sk className="h-5 w-16 rounded-full ml-auto" />
        </div>
        {/* AI output cards */}
        {[0, 1].map(i => (
          <div key={i} className="bg-white/[0.04] border border-white/[0.07] rounded-lg p-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Sk className="h-3 w-3 rounded-full" />
              <Sk className="h-3 w-40" />
              <Sk className="h-5 w-12 rounded ml-auto" />
            </div>
            <Sk className="h-2.5 w-full" />
            <Sk className="h-2.5 w-5/6" />
            <Sk className="h-2.5 w-4/6" />
            <div className="flex gap-2 mt-1">
              <Sk className="h-6 w-16 rounded" />
              <Sk className="h-6 w-16 rounded" />
            </div>
          </div>
        ))}
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-lg p-4 flex-1 flex flex-col gap-3">
          <div className="flex gap-2 mb-1">
            {[0,1,2].map(i => <Sk key={i} className="h-7 flex-1 rounded" />)}
          </div>
          {[0,1,2].map(i => (
            <div key={i} className="flex gap-3">
              <Sk className="h-16 w-16 rounded-md shrink-0" />
              <div className="flex-1 flex flex-col gap-2 justify-center">
                <Sk className="h-3 w-3/4" />
                <Sk className="h-2.5 w-full" />
                <Sk className="h-2.5 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Tabs ────────────────────────────────────────────────────── */
type TabLabels = { dashboard: string; webapp: string; erp: string; marketing: string }

const TAB_DOTS = { dashboard: '#2B3494', webapp: '#1e5a9e', erp: '#153975', marketing: '#4a5acd' }

/* ─── Main export ─────────────────────────────────────────────── */
export function HeroMockup({ labels }: { labels?: TabLabels }) {
  const [active, setActive] = useState('dashboard')

  const tabs = [
    { id: 'dashboard', label: labels?.dashboard ?? 'Dashboard & BI',    dot: TAB_DOTS.dashboard },
    { id: 'webapp',    label: labels?.webapp    ?? 'Web Applicatie',     dot: TAB_DOTS.webapp },
    { id: 'erp',       label: labels?.erp       ?? 'ERP Systeem',        dot: TAB_DOTS.erp },
    { id: 'marketing', label: labels?.marketing ?? 'Marketing met AI',   dot: TAB_DOTS.marketing },
  ]

  return (
    <div className="relative w-full mx-auto">
      {/* Glow */}
      <div className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(43,52,148,0.35) 0%, transparent 70%)' }}
      />

      {/* Browser chrome */}
      <div className="rounded-xl overflow-hidden border border-white/[0.12] shadow-2xl"
        style={{ background: '#0d1035', boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' }}>

        {/* Top bar */}
        <div className="h-10 flex items-center gap-3 px-4 border-b border-white/[0.07]"
          style={{ background: '#090c22' }}>
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            {['#ff5f57','#febc2e','#28c840'].map((c) => (
              <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
          </div>
          {/* URL bar */}
          <div className="flex-1 mx-4 h-5 rounded bg-white/[0.05] flex items-center px-3 gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500/60 shrink-0" />
            <div className="h-1.5 w-40 rounded bg-white/[0.12]" />
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-white/[0.07] px-4 gap-0"
          style={{ background: '#0a0d25' }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors',
                active === t.id
                  ? 'border-[#2B3494] text-white'
                  : 'border-transparent text-white/40 hover:text-white/70'
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: active === t.id ? t.dot : 'rgba(255,255,255,0.2)' }} />
              {t.label}
            </button>
          ))}
        </div>

        {/* App content */}
        <div style={{ height: 340 }}>
          {active === 'dashboard' && <DashboardSkeleton />}
          {active === 'webapp'    && <WebAppSkeleton />}
          {active === 'erp'       && <ErpSkeleton />}
          {active === 'marketing' && <MarketingSkeleton />}
        </div>
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes shimmerSlide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
