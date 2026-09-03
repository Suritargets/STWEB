'use client'
import { useState, useMemo } from 'react'
import type { WebinarRegistration } from '@/lib/webinar-registrations'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('nl-NL', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function formatCSVDate(iso: string) {
  return new Date(iso).toISOString().slice(0, 16).replace('T', ' ')
}

export default function WebinarRegistrationsTable({ registrations }: { registrations: WebinarRegistration[] }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return registrations
    const q = search.toLowerCase()
    return registrations.filter(r =>
      r.naam.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.telefoon ?? '').toLowerCase().includes(q) ||
      (r.referral_source ?? '').toLowerCase().includes(q)
    )
  }, [registrations, search])

  function exportCSV() {
    const headers = ['Naam', 'Email', 'Telefoon', 'Bron', 'Datum']
    const rows = filtered.map(r => [
      r.naam, r.email, r.telefoon ?? '', r.referral_source ?? '', formatCSVDate(r.created_at),
    ])
    const csv = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `webinar-aanmeldingen-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (registrations.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-zinc-400">Nog geen webinar-aanmeldingen ontvangen</p>
      </div>
    )
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-zinc-100 bg-zinc-50/50">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Zoek op naam, email, bron..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-zinc-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#2B3494]/20 focus:border-[#2B3494] transition-all"
          />
        </div>
        <button
          onClick={exportCSV}
          className="px-3 py-1.5 text-xs border border-zinc-200 rounded-md text-zinc-600 hover:bg-zinc-50 transition-colors ml-auto"
        >
          ↓ Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100">
              {['Naam', 'Email', 'Telefoon', 'Bron', 'Datum'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-zinc-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-sm text-zinc-400">Geen resultaten gevonden</td>
              </tr>
            ) : (
              filtered.map(r => (
                <tr key={r.id} className="border-b border-zinc-50 hover:bg-zinc-50/80 transition-colors align-middle">
                  <td className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap">{r.naam}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${r.email}`} className="text-[#2B3494] hover:underline whitespace-nowrap text-xs">{r.email}</a>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 whitespace-nowrap">{r.telefoon ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {r.referral_source ? (
                      <span className="bg-[#2B3494]/8 text-[#2B3494] text-[10px] font-medium px-1.5 py-0.5 rounded">
                        {r.referral_source}
                      </span>
                    ) : <span className="text-zinc-400">—</span>}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 whitespace-nowrap text-xs tabular-nums">{formatDate(r.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-100 text-xs text-zinc-500">
        <span className="italic">{filtered.length} rij(en) totaal</span>
      </div>
    </div>
  )
}
