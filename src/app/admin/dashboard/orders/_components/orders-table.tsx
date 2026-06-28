'use client'
import { useState, useMemo } from 'react'
import type { Enrollment } from '@/lib/enrollments'

const STATUS_LABELS: Record<string, string> = {
  pending:   'In behandeling',
  confirmed: 'Bevestigd',
  paid:      'Betaald',
}

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  paid:      'bg-emerald-100 text-emerald-700',
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

export default function OrdersTable({ enrollments }: { enrollments: Enrollment[] }) {
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [statuses, setStatuses] = useState<Record<number, Enrollment['status']>>(
    () => Object.fromEntries(enrollments.map(e => [e.id, e.status]))
  )
  const [updating, setUpdating] = useState<Record<number, boolean>>({})

  const courses = useMemo(
    () => ['all', ...Array.from(new Set(enrollments.map(e => e.course_slug)))],
    [enrollments]
  )

  const filtered = useMemo(() => {
    let r = enrollments
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(e =>
        e.naam.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        (e.bedrijfsnaam ?? '').toLowerCase().includes(q)
      )
    }
    if (courseFilter !== 'all') r = r.filter(e => e.course_slug === courseFilter)
    if (typeFilter !== 'all') r = r.filter(e => e.enrollment_type === typeFilter)
    if (statusFilter !== 'all') r = r.filter(e => statuses[e.id] === statusFilter)
    return r
  }, [enrollments, search, courseFilter, typeFilter, statusFilter, statuses])

  async function handleStatusChange(id: number, newStatus: Enrollment['status']) {
    setUpdating(u => ({ ...u, [id]: true }))
    try {
      const res = await fetch(`/api/admin/enrollments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setStatuses(s => ({ ...s, [id]: newStatus }))
      }
    } finally {
      setUpdating(u => ({ ...u, [id]: false }))
    }
  }

  function downloadCSV() {
    const rows = [
      ['Datum', 'Course', 'Type', 'Naam', 'Bedrijf', 'Email', 'Deelnemers', 'Uren', 'Totaal', 'Status'],
      ...filtered.map(e => [
        formatDate(e.created_at),
        e.course_name,
        e.enrollment_type,
        e.naam,
        e.bedrijfsnaam ?? '',
        e.email,
        String(e.deelnemers),
        e.uren ? String(e.uren) : '',
        String(e.total_usd),
        statuses[e.id] ?? e.status,
      ]),
    ]
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
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
            {filtered.map(e => {
              const currentStatus = statuses[e.id] ?? e.status
              return (
                <tr key={e.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-zinc-500">{formatDate(e.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap">{e.course_name}</td>
                  <td className="px-4 py-3 capitalize text-zinc-600">{e.enrollment_type}</td>
                  <td className="px-4 py-3 text-zinc-900">{e.naam}</td>
                  <td className="px-4 py-3 text-zinc-600">{e.bedrijfsnaam ?? '—'}</td>
                  <td className="px-4 py-3 text-center">
                    {e.deelnemers}{e.uren ? ` · ${e.uren}u` : ''}
                  </td>
                  <td className="px-4 py-3 font-semibold text-zinc-900 whitespace-nowrap">{fmt(e.total_usd)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={currentStatus}
                      disabled={updating[e.id]}
                      onChange={ev => handleStatusChange(e.id, ev.target.value as Enrollment['status'])}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer disabled:opacity-50 ${STATUS_COLORS[currentStatus]}`}
                    >
                      {Object.entries(STATUS_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/admin/dashboard/orders/${e.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#2B3494] hover:underline font-medium whitespace-nowrap"
                    >
                      Bekijk →
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-400">{filtered.length} van {enrollments.length} orders</p>
    </div>
  )
}
