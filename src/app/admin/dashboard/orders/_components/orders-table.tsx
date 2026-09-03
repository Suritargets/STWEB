'use client'
import { useState, useMemo } from 'react'
import type { Enrollment } from '@/lib/enrollments'

export type OrderRow = {
  key: string
  kind: 'enrollment' | 'webinar'
  enrollmentId: number | null
  created_at: string
  course_slug: string
  course_name: string
  enrollment_type: Enrollment['enrollment_type'] | null
  naam: string
  bedrijfsnaam: string | null
  email: string
  deelnemers: number
  uren: number | null
  total_usd: number
  status: Enrollment['status'] | 'aangemeld'
}

const STATUS_LABELS: Record<string, string> = {
  pending:   'In behandeling',
  confirmed: 'Bevestigd',
  paid:      'Betaald',
  aangemeld: 'Aangemeld',
}

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  paid:      'bg-emerald-100 text-emerald-700',
  aangemeld: 'bg-zinc-100 text-zinc-600',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('nl-NL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function fmt(n: number | string) {
  return '$' + Number(n).toLocaleString('en-US')
}

export default function OrdersTable({ rows }: { rows: OrderRow[] }) {
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [statuses, setStatuses] = useState<Record<string, OrderRow['status']>>(
    () => Object.fromEntries(rows.map(r => [r.key, r.status]))
  )
  const [updating, setUpdating] = useState<Record<string, boolean>>({})

  const courses = useMemo(
    () => ['all', ...Array.from(new Set(rows.map(r => r.course_slug)))],
    [rows]
  )

  const filtered = useMemo(() => {
    let r = rows
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(row =>
        row.naam.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q) ||
        (row.bedrijfsnaam ?? '').toLowerCase().includes(q)
      )
    }
    if (courseFilter !== 'all') r = r.filter(row => row.course_slug === courseFilter)
    if (typeFilter !== 'all') r = r.filter(row => row.enrollment_type === typeFilter)
    if (statusFilter !== 'all') r = r.filter(row => (statuses[row.key] ?? row.status) === statusFilter)
    return r
  }, [rows, search, courseFilter, typeFilter, statusFilter, statuses])

  async function handleStatusChange(row: OrderRow, newStatus: Enrollment['status']) {
    if (row.kind !== 'enrollment' || row.enrollmentId === null) return
    setUpdating(u => ({ ...u, [row.key]: true }))
    try {
      const res = await fetch(`/api/admin/enrollments/${row.enrollmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setStatuses(s => ({ ...s, [row.key]: newStatus }))
      }
    } finally {
      setUpdating(u => ({ ...u, [row.key]: false }))
    }
  }

  function downloadCSV() {
    const csvRows = [
      ['Datum', 'Course', 'Type', 'Naam', 'Bedrijf', 'Email', 'Deelnemers', 'Uren', 'Totaal', 'Status'],
      ...filtered.map(row => [
        formatDate(row.created_at),
        row.course_name,
        row.enrollment_type ?? '',
        row.naam,
        row.bedrijfsnaam ?? '',
        row.email,
        String(row.deelnemers),
        row.uren ? String(row.uren) : '',
        String(row.total_usd),
        statuses[row.key] ?? row.status,
      ]),
    ]
    const csv = csvRows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'orders.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3 flex-wrap items-center">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Zoeken..."
          className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm w-48"
        />
        <select
          value={courseFilter}
          onChange={e => setCourseFilter(e.target.value)}
          className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm"
        >
          {courses.map(c => (
            <option key={c} value={c}>{c === 'all' ? 'Alle courses' : c}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm"
        >
          <option value="all">Alle types</option>
          <option value="individual">Individual</option>
          <option value="team">Team</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm"
        >
          <option value="all">Alle statussen</option>
          {Object.entries(STATUS_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <button
          onClick={downloadCSV}
          className="ml-auto bg-zinc-900 text-white text-sm px-4 py-1.5 rounded-md hover:bg-zinc-700 transition-colors"
        >
          CSV Export
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              {['Datum', 'Course', 'Type', 'Naam', 'Bedrijf', 'Deelnemers', 'Totaal', 'Status', 'Factuur'].map(h => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-8 text-zinc-400">
                  Geen orders gevonden
                </td>
              </tr>
            )}
            {filtered.map(row => {
              const currentStatus = statuses[row.key] ?? row.status
              return (
                <tr key={row.key} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-500">{formatDate(row.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap">{row.course_name}</td>
                  <td className="px-4 py-3 capitalize text-zinc-600">{row.enrollment_type ?? '—'}</td>
                  <td className="px-4 py-3 text-zinc-900">{row.naam}</td>
                  <td className="px-4 py-3 text-zinc-600">{row.bedrijfsnaam ?? '—'}</td>
                  <td className="px-4 py-3 text-center">
                    {row.deelnemers}{row.uren ? ` · ${row.uren}u` : ''}
                  </td>
                  <td className="px-4 py-3 font-semibold text-zinc-900 whitespace-nowrap">
                    {row.kind === 'webinar' ? 'Gratis' : fmt(row.total_usd)}
                  </td>
                  <td className="px-4 py-3">
                    {row.kind === 'enrollment' ? (
                      <select
                        value={currentStatus}
                        disabled={updating[row.key]}
                        onChange={ev => handleStatusChange(row, ev.target.value as Enrollment['status'])}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer disabled:opacity-50 ${STATUS_COLORS[currentStatus]}`}
                      >
                        {(['pending', 'confirmed', 'paid'] as const).map(v => (
                          <option key={v} value={v}>{STATUS_LABELS[v]}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[currentStatus]}`}>
                        {STATUS_LABELS[currentStatus] ?? currentStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {row.kind === 'enrollment' ? (
                      <a
                        href={`/admin/dashboard/orders/${row.enrollmentId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#2B3494] hover:underline font-medium whitespace-nowrap"
                      >
                        Bekijk →
                      </a>
                    ) : (
                      <span className="text-xs text-zinc-300">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-400">{filtered.length} van {rows.length} orders</p>
    </div>
  )
}
