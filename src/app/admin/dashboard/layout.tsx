import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import Sidebar from '../_components/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  if (!isAuthenticated(session)) redirect('/admin/login')

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f6]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
