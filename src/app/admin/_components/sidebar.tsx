import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  ClipboardList,
  Pencil,
  Search,
  BarChart3,
  Settings,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import LogoutButton from './logout-button'

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
  soon?: boolean
}

const navItems: NavItem[] = [
  { href: '/admin/dashboard',          label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/admin/dashboard/requests', label: 'Aanvragen',     icon: ClipboardList },
  { href: '/admin/dashboard/cms',      label: 'CMS',           icon: Pencil },
  { href: '/admin/dashboard/seo',      label: 'SEO',           icon: Search },
  { href: '#',                         label: 'Analytics',     icon: BarChart3, soon: true },
  { href: '/admin/dashboard/settings', label: 'Instellingen',  icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="w-[220px] shrink-0 bg-white border-r border-zinc-200 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="Suritargets" width={28} height={28} className="shrink-0" />
          <div>
            <p className="text-sm font-bold text-zinc-900 leading-none">Suritargets</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest px-2 mb-2">Menu</p>
        {navItems.map(item => {
          const Icon = item.icon
          return (
            <div key={item.label}>
              {item.soon ? (
                <div className="flex items-center gap-2.5 px-2 py-2 rounded-md text-zinc-400 cursor-default">
                  <Icon size={16} strokeWidth={1.8} />
                  <span className="text-sm flex-1">{item.label}</span>
                  <span className="text-[9px] bg-zinc-100 text-zinc-400 px-1.5 py-0.5 rounded font-mono uppercase">Soon</span>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-md text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                >
                  <Icon size={16} strokeWidth={1.8} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-zinc-100 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-zinc-700">Admin</p>
          <p className="text-[10px] text-zinc-400">suritargets.com</p>
        </div>
        <LogoutButton />
      </div>
    </aside>
  )
}
