import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — Suritargets' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="bg-[#f4f4f5] min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
