'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InvoiceActions({
  id,
  currentStatus,
}: {
  id: number
  currentStatus: string
}) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)

  async function changeStatus(newStatus: string) {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/enrollments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setStatus(newStatus)
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2 print:hidden">
      {status !== 'paid' && (
        <button
          onClick={() => changeStatus('paid')}
          disabled={loading}
          className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
        >
          {loading ? '…' : 'Betaling bevestigen'}
        </button>
      )}
      {status !== 'confirmed' && status !== 'paid' && (
        <button
          onClick={() => changeStatus('confirmed')}
          disabled={loading}
          className="bg-[#2B3494] text-white text-sm px-4 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? '…' : 'Bevestigen'}
        </button>
      )}
      {status === 'paid' && (
        <button
          onClick={() => changeStatus('pending')}
          disabled={loading}
          className="text-sm px-4 py-2 rounded-md border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors disabled:opacity-50"
        >
          {loading ? '…' : 'Terugzetten'}
        </button>
      )}
    </div>
  )
}
