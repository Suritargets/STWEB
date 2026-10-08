import type { Metadata } from 'next'
import { HtmlShell } from '@/components/layout/html-shell'

export const metadata: Metadata = { title: 'Admin — Suritargets' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <HtmlShell lang="nl">
      <div className="bg-[#f5f5f6] min-h-screen">
        {children}
      </div>
    </HtmlShell>
  )
}
