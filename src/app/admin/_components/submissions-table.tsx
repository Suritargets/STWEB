'use client'
import { useState } from 'react'
import type { Submission } from '@/lib/db'

const SERVICE_LABELS: Record<string, string> = {
  'dashboarding': 'Dashboarding', 'web-applicaties': 'Web & Apps',
  'marketing-ai': 'Marketing AI', 'forensics': 'Forensics',
  'education': 'Education', 'anders': 'Anders',
}
const BUDGET_LABELS: Record<string, string> = {
  'onder-5k': '< $5k', '5k-15k': '$5k–15k', 'boven-50k': '> $50k', 'onbekend': 'Onbekend',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('nl-NL', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

type Tab = 'all' | 'new'

export default function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
  const [tab, setTab] = useState<Tab>('all')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const filtered = tab === 'all' ? submissions : submissions
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

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

  const tabs: { key: Tab; label: string; count?: number }[] = [
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
      {/* Tabs */}
      <div className="flex items-center px-4 border-b border-zinc-100">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setPage(1) }}
            className={`
              px-4 py-3 text-sm font-medium border-b-2 transition-colors
              ${tab === t.key
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'}
            `}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                tab === t.key ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

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
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-zinc-500 whitespace-nowrap">
                  {h}
                </th>
              ))}
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {paginated.map(s => (
              <tr
                key={s.id}
                className={`border-b border-zinc-50 hover:bg-zinc-50/80 transition-colors align-middle ${
                  selected.has(s.id) ? 'bg-blue-50/40' : ''
                }`}
              >
                <td className="px-4 py-3">
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
            ))}
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

          <span>Pagina {page} van {totalPages}</span>

          <div className="flex items-center gap-1">
            {[
              { label: '«', go: 1, disabled: page === 1 },
              { label: '‹', go: Math.max(1, page - 1), disabled: page === 1 },
              { label: '›', go: Math.min(totalPages, page + 1), disabled: page === totalPages },
              { label: '»', go: totalPages, disabled: page === totalPages },
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
