import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Suritargets' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f5f5f6] min-h-screen">
      {children}
    </div>
  )
}
