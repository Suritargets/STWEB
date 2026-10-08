import { requireAdminUser } from '@/lib/auth'
import Sidebar from '../_components/sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminUser()

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f6]">
      <Sidebar email={user.email} role={user.role} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
