'use client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button onClick={handleLogout} className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors" title="Uitloggen">
      ↩
    </button>
  )
}
