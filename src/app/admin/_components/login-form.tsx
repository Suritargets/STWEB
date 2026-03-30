'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      const data = await res.json() as { error?: string }
      setError(data.error ?? 'Ongeldige inloggegevens')
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-[400px] border border-zinc-200 rounded-xl p-8 bg-white shadow-sm">
      {/* Logo */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 bg-[#2B3494] rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-black">S</span>
          </div>
          <span className="font-bold text-sm text-zinc-900">Suritargets</span>
        </div>
        <h1 className="text-xl font-semibold text-zinc-900 mb-1">Login to your account</h1>
        <p className="text-sm text-zinc-500">Enter your email below to login to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="m@example.com"
            required
            autoFocus
            className="border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B3494]/30 focus:border-[#2B3494] transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
            <span className="text-xs text-[#2B3494] cursor-default">Forgot your password?</span>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B3494]/30 focus:border-[#2B3494] transition-all"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 text-white text-sm font-semibold py-2 rounded-md hover:bg-zinc-800 transition-colors disabled:opacity-50 mt-1"
        >
          {loading ? 'Bezig…' : 'Login'}
        </button>
      </form>
    </div>
  )
}
