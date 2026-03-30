'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { Submission } from '@/lib/db'

const SERVICE_LABELS: Record<string, string> = {
  'dashboarding': 'Dashboarding', 'web-applicaties': 'Web & Apps',
  'marketing-ai': 'Marketing AI', 'forensics': 'Forensics',
  'education': 'Education', 'anders': 'Anders',
}
const BUDGET_LABELS: Record<string, string> = {
  'onder-5k': '< $5k', '5k-15k': '$5k–15k', 'boven-50k': '> $50k', 'onbekend': 'Onbekend',
}
const ALL_SERVICES = Object.entries(SERVICE_LABELS)

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('nl-NL', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function formatCSVDate(iso: string) {
  return new Date(iso).toISOString().slice(0, 16).replace('T', ' ')
}

type Tab = 'all' | 'new'

export default function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('all')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [search, setSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [budgetFilter, setBudgetFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  // ─── Filtering ───
  const filtered = useMemo(() => {
    let result = submissions

    // Search across naam, bedrijf, email, bericht
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(s =>
        s.naam.toLowerCase().includes(q) ||
        s.bedrijfsnaam.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.bericht ?? '').toLowerCase().includes(q) ||
        (s.telefoon ?? '').toLowerCase().includes(q)
      )
    }

    // Service filter
    if (serviceFilter !== 'all') {
      result = result.filter(s => (s.services ?? []).includes(serviceFilter))
    }

    // Budget filter
    if (budgetFilter !== 'all') {
      result = result.filter(s => s.budget === budgetFilter)
    }

    return result
  }, [submissions, search, serviceFilter, budgetFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  // ─── Selection ───
  function toggleSelect(id: number) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (selected.size === paginated.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(paginated.map(s => s.id)))
    }
  }

  function selectAllFiltered() {
    setSelected(new Set(filtered.map(s => s.id)))
  }

  // ─── Export CSV ───
  function exportCSV(rows: Submission[]) {
    const headers = ['Naam', 'Bedrijfsnaam', 'Email', 'Telefoon', 'Diensten', 'Budget', 'Bericht', 'Datum']
    const csvRows = rows.map(s => [
      s.naam,
      s.bedrijfsnaam,
      s.email,
      s.telefoon ?? '',
      (s.services ?? []).map(slug => SERVICE_LABELS[slug] ?? slug).join('; '),
      s.budget ? (BUDGET_LABELS[s.budget] ?? s.budget) : '',
      (s.bericht ?? '').replace(/"/g, '""'),
      formatCSVDate(s.created_at),
    ])

    const csv = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aanvragen-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleExport() {
    if (selected.size > 0) {
      exportCSV(submissions.filter(s => selected.has(s.id)))
    } else {
      exportCSV(filtered)
    }
  }

  // ─── Tabs ───
  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'Alle Aanvragen', count: submissions.length },
    { key: 'new', label: 'Nieuw', count: submissions.length },
  ]

  if (submissions.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-zinc-400">Nog geen aanvragen ontvangen</p>
      </div>
    )
  }

  return (
    <div>
      {/* Toolbar: Tabs + Search + Actions */}
      <div className="border-b border-zinc-100">
        {/* Tabs row */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setPage(1) }}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.key
                    ? 'border-zinc-900 text-zinc-900'
                    : 'border-transparent text-zinc-400 hover:text-zinc-600'
                }`}
              >
                {t.label}
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  tab === t.key ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500'
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(f => !f)}
              className={`px-3 py-1.5 text-xs border rounded-md transition-colors ${
                showFilters ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              ⚙ Filters
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 text-xs border border-zinc-200 rounded-md text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              ↓ Export CSV
            </button>
          </div>
        </div>

        {/* Search + Filters bar */}
        <div className="px-4 py-3 flex items-center gap-3 bg-zinc-50/50">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Zoek op naam, bedrijf, email..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-zinc-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#2B3494]/20 focus:border-[#2B3494] transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter dropdowns */}
          {showFilters && (
            <>
              <select
                value={serviceFilter}
                onChange={e => { setServiceFilter(e.target.value); setPage(1) }}
                className="border border-zinc-200 rounded-md px-3 py-2 text-xs bg-white"
              >
                <option value="all">Alle diensten</option>
                {ALL_SERVICES.map(([slug, label]) => (
                  <option key={slug} value={slug}>{label}</option>
                ))}
              </select>

              <select
                value={budgetFilter}
                onChange={e => { setBudgetFilter(e.target.value); setPage(1) }}
                className="border border-zinc-200 rounded-md px-3 py-2 text-xs bg-white"
              >
                <option value="all">Alle budgetten</option>
                {Object.entries(BUDGET_LABELS).map(([slug, label]) => (
                  <option key={slug} value={slug}>{label}</option>
                ))}
              </select>

              {(serviceFilter !== 'all' || budgetFilter !== 'all') && (
                <button
                  onClick={() => { setServiceFilter('all'); setBudgetFilter('all') }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Reset
                </button>
              )}
            </>
          )}

          {/* Result count */}
          {(search || serviceFilter !== 'all' || budgetFilter !== 'all') && (
            <span className="text-xs text-zinc-400 whitespace-nowrap">
              {filtered.length} resultaten
            </span>
          )}
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="px-4 py-2 bg-[#2B3494]/5 border-b border-[#2B3494]/10 flex items-center gap-3">
          <span className="text-xs font-medium text-[#2B3494]">
            {selected.size} geselecteerd
          </span>
          <button
            onClick={() => exportCSV(submissions.filter(s => selected.has(s.id)))}
            className="text-xs text-[#2B3494] hover:text-[#232b7a] font-medium"
          >
            Export selectie
          </button>
          <button
            onClick={selectAllFiltered}
            className="text-xs text-[#2B3494] hover:text-[#232b7a] font-medium"
          >
            Selecteer alle ({filtered.length})
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="text-xs text-zinc-500 hover:text-zinc-700 ml-auto"
          >
            Deselecteer
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.size === paginated.length && paginated.length > 0}
                  onChange={toggleAll}
                  className="rounded border-zinc-300 accent-[#2B3494]"
                />
              </th>
              {['Naam', 'Bedrijf', 'Email', 'Diensten', 'Budget', 'Status', 'Datum'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-zinc-500 whitespace-nowrap">{h}</th>
              ))}
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-12 text-sm text-zinc-400">
                  Geen resultaten gevonden
                </td>
              </tr>
            ) : (
              paginated.map(s => (
                <tr
                  key={s.id}
                  onClick={() => router.push(`/admin/dashboard/requests/${s.id}`)}
                  className={`border-b border-zinc-50 hover:bg-zinc-50/80 transition-colors align-middle cursor-pointer ${
                    selected.has(s.id) ? 'bg-blue-50/40' : ''
                  }`}
                >
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(s.id)}
                      onChange={() => toggleSelect(s.id)}
                      className="rounded border-zinc-300 accent-[#2B3494]"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap">{s.naam}</td>
                  <td className="px-4 py-3 text-zinc-600 whitespace-nowrap">{s.bedrijfsnaam}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${s.email}`} className="text-[#2B3494] hover:underline whitespace-nowrap text-xs">{s.email}</a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 min-w-[100px]">
                      {(s.services ?? []).map(slug => (
                        <span key={slug} className="bg-[#2B3494]/8 text-[#2B3494] text-[10px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap">
                          {SERVICE_LABELS[slug] ?? slug}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">
                    {s.budget ? (BUDGET_LABELS[s.budget] ?? s.budget) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="text-amber-700">Nieuw</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400 whitespace-nowrap text-xs tabular-nums">
                    {formatDate(s.created_at)}
                  </td>
                  <td className="px-2 py-3 text-zinc-300 hover:text-zinc-500 cursor-default">⋮</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-100 text-xs text-zinc-500">
        <span className="italic">
          {selected.size > 0
            ? `${selected.size} van ${filtered.length} rij(en) geselecteerd.`
            : `${filtered.length} rij(en) totaal`}
        </span>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Rijen per pagina</span>
            <select
              value={perPage}
              onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }}
              className="border border-zinc-200 rounded px-2 py-1 text-xs bg-white"
            >
              {[10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <span>Pagina {safePage} van {totalPages}</span>

          <div className="flex items-center gap-1">
            {[
              { label: '«', go: 1, disabled: safePage === 1 },
              { label: '‹', go: Math.max(1, safePage - 1), disabled: safePage === 1 },
              { label: '›', go: Math.min(totalPages, safePage + 1), disabled: safePage === totalPages },
              { label: '»', go: totalPages, disabled: safePage === totalPages },
            ].map(btn => (
              <button
                key={btn.label}
                onClick={() => setPage(btn.go)}
                disabled={btn.disabled}
                className="w-7 h-7 flex items-center justify-center rounded border border-zinc-200 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
