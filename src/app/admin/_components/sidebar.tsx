'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  ClipboardList,
  Pencil,
  Search,
  BarChart3,
  Settings,
  ShoppingBag,
  Radio,
  Users,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import LogoutButton from './logout-button'

type Role = 'sales' | 'admin' | 'super_admin'

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
  roles?: Role[]
}

const ROLE_LABELS: Record<Role, string> = {
  sales: 'Sales',
  admin: 'Admin',
  super_admin: 'Super admin',
}

const navItems: NavItem[] = [
  { href: '/admin/dashboard',           label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/admin/dashboard/requests',  label: 'Aanvragen',    icon: ClipboardList },
  { href: '/admin/dashboard/orders',    label: 'Orders',       icon: ShoppingBag },
  { href: '/admin/dashboard/webinar',   label: 'Webinar',      icon: Radio },
  { href: '/admin/dashboard/cms',       label: 'CMS',          icon: Pencil,     roles: ['admin', 'super_admin'] },
  { href: '/admin/dashboard/seo',       label: 'SEO',          icon: Search,     roles: ['admin', 'super_admin'] },
  { href: '/admin/dashboard/analytics', label: 'Analytics',    icon: BarChart3,  roles: ['admin', 'super_admin'] },
  { href: '/admin/dashboard/users',     label: 'Gebruikers',   icon: Users,      roles: ['super_admin'] },
  { href: '/admin/dashboard/settings',  label: 'Instellingen', icon: Settings,   roles: ['admin', 'super_admin'] },
]

const COLLAPSE_KEY = 'suritargets-admin-sidebar-collapsed'

export default function Sidebar({ email, role }: { email: string; role: Role }) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    // Deliberately deferred to after mount (not a lazy useState initializer) so the
    // server-rendered (always-expanded) markup matches the client's first render.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollapsed(window.localStorage.getItem(COLLAPSE_KEY) === '1')
    } catch {
      // localStorage unavailable — keep expanded
    }
  }, [])

  function toggleCollapsed() {
    setCollapsed(prev => {
      const next = !prev
      try {
        window.localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0')
      } catch {
        // ignore
      }
      return next
    })
  }

  const visibleItems = navItems.filter(item => !item.roles || item.roles.includes(role))

  return (
    <aside className={`shrink-0 bg-white border-r border-zinc-200 flex flex-col h-full transition-all duration-200 ${collapsed ? 'w-16' : 'w-55'}`}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <Image src="/logo-icon.svg" alt="Suritargets" width={28} height={28} className="shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-zinc-900 leading-none truncate">Suritargets</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest px-2 mb-2">Menu</p>
        )}
        {visibleItems.map(item => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className="flex items-center gap-2.5 px-2 py-2 rounded-md text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
            >
              <Icon size={16} strokeWidth={1.8} className="shrink-0" />
              {!collapsed && <span className="text-sm truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleCollapsed}
        className="flex items-center gap-2 px-5 py-3 border-t border-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors"
        title={collapsed ? 'Uitklappen' : 'Inklappen'}
      >
        {collapsed ? <ChevronsRight size={16} /> : <><ChevronsLeft size={16} /><span className="text-xs">Inklappen</span></>}
      </button>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-zinc-100 flex items-center justify-between gap-2">
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-700 truncate" title={email}>{email}</p>
            <p className="text-[10px] text-zinc-400">{ROLE_LABELS[role]}</p>
          </div>
        )}
        <LogoutButton />
      </div>
    </aside>
  )
}
