'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ password }),
    })

    if (res.ok) {
      router.refresh()
    } else {
      setError('Ongeldig wachtwoord')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-sm p-8 shadow-sm">
        <div className="mb-8">
          <div className="w-8 h-8 bg-[#2B3494] rounded-sm mb-4" />
          <h1 className="text-xl font-black text-zinc-900 tracking-tight">Suritargets Admin</h1>
          <p className="text-sm text-zinc-500 mt-1">Voer je wachtwoord in om door te gaan</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            required
            autoFocus
            className="w-full border border-zinc-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#2B3494] transition-colors"
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2B3494] text-white text-sm font-semibold py-2.5 rounded-sm hover:bg-[#232b7a] transition-colors disabled:opacity-50"
          >
            {loading ? 'Bezig…' : 'Inloggen'}
          </button>
        </form>
      </div>
    </div>
  )
}
