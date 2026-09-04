'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Role = 'sales' | 'admin' | 'super_admin'

type User = {
  id: number
  email: string
  role: Role
  created_at: string
}

const ROLE_LABELS: Record<Role, string> = {
  sales: 'Sales personeel',
  admin: 'Admin',
  super_admin: 'Super admin',
}

const ROLE_COLORS: Record<Role, string> = {
  sales: 'bg-zinc-100 text-zinc-600',
  admin: 'bg-blue-100 text-blue-700',
  super_admin: 'bg-[#2B3494]/10 text-[#2B3494]',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function UsersTable({ users, currentUserId }: { users: User[]; currentUserId: number }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('sales')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rowError, setRowError] = useState<Record<number, string>>({})
  const [busyRow, setBusyRow] = useState<Record<number, boolean>>({})

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Er is iets misgegaan')
        return
      }
      setEmail('')
      setPassword('')
      setRole('sales')
      setShowForm(false)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  async function handleRoleChange(id: number, newRole: Role) {
    setBusyRow(b => ({ ...b, [id]: true }))
    setRowError(e => ({ ...e, [id]: '' }))
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })
      const data = await res.json()
      if (!res.ok) {
        setRowError(e => ({ ...e, [id]: data.error ?? 'Mislukt' }))
        return
      }
      router.refresh()
    } finally {
      setBusyRow(b => ({ ...b, [id]: false }))
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?')) return
    setBusyRow(b => ({ ...b, [id]: true }))
    setRowError(e => ({ ...e, [id]: '' }))
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        setRowError(e => ({ ...e, [id]: data.error ?? 'Mislukt' }))
        return
      }
      router.refresh()
    } finally {
      setBusyRow(b => ({ ...b, [id]: false }))
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <p className="text-sm text-zinc-500">{users.length} gebruiker{users.length === 1 ? '' : 's'}</p>
        <button
          onClick={() => setShowForm(f => !f)}
          className="bg-zinc-900 text-white text-sm px-4 py-1.5 rounded-md hover:bg-zinc-700 transition-colors"
        >
          {showForm ? 'Annuleren' : '+ Nieuwe gebruiker'}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate} className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="naam@suritargets.com"
              className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm w-64"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Wachtwoord</label>
            <input
              type="text"
              required
              minLength={8}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minimaal 8 tekens"
              className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm w-48"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Rol</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as Role)}
              className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm"
            >
              {(Object.keys(ROLE_LABELS) as Role[]).map(r => (
                <option key={r} value={r}>{ROLE_LABELS[r]}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2B3494] text-white text-sm px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Bezig…' : 'Aanmaken'}
          </button>
          {error && <p className="text-sm text-red-600 w-full">{error}</p>}
        </form>
      )}

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 border-b border-zinc-200">
          <tr>
            {['E-mail', 'Rol', 'Sinds', ''].map(h => (
              <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {users.map(u => (
            <tr key={u.id} className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-3 text-zinc-900 font-medium">
                {u.email}
                {u.id === currentUserId && <span className="ml-2 text-xs text-zinc-400">(jij)</span>}
              </td>
              <td className="px-6 py-3">
                <select
                  value={u.role}
                  disabled={busyRow[u.id] || u.id === currentUserId}
                  onChange={ev => handleRoleChange(u.id, ev.target.value as Role)}
                  className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${ROLE_COLORS[u.role]}`}
                >
                  {(Object.keys(ROLE_LABELS) as Role[]).map(r => (
                    <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                  ))}
                </select>
                {rowError[u.id] && <p className="text-xs text-red-600 mt-1">{rowError[u.id]}</p>}
              </td>
              <td className="px-6 py-3 text-zinc-500 whitespace-nowrap">{formatDate(u.created_at)}</td>
              <td className="px-6 py-3 text-right">
                {u.id !== currentUserId && (
                  <button
                    onClick={() => handleDelete(u.id)}
                    disabled={busyRow[u.id]}
                    className="text-xs text-red-600 hover:underline disabled:opacity-50"
                  >
                    Verwijderen
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
