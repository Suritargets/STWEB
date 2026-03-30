import Link from 'next/link'
import LogoutButton from './logout-button'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '▦', active: true },
  { href: '/admin/requests',  label: 'Aanvragen',  icon: '📋', active: false },
  { href: '#', label: 'Analytics',  icon: '📊', soon: true },
  { href: '#', label: 'CMS',        icon: '✏️',  soon: true },
  { href: '#', label: 'SEO',        icon: '🔍',  soon: true },
  { href: '#', label: 'Instellingen', icon: '⚙️', soon: true },
]

export default function Sidebar() {
  return (
    <aside className="w-[220px] shrink-0 bg-white border-r border-zinc-200 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#2B3494] rounded-md flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-black">S</span>
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900 leading-none">Suritargets</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest px-2 mb-2">Menu</p>
        {navItems.map(item => (
          <div key={item.label}>
            {item.soon ? (
              <div className="flex items-center gap-2.5 px-2 py-2 rounded-md text-zinc-400 cursor-default">
                <span className="text-sm w-4 text-center">{item.icon}</span>
                <span className="text-sm flex-1">{item.label}</span>
                <span className="text-[9px] bg-zinc-100 text-zinc-400 px-1.5 py-0.5 rounded font-mono uppercase">Soon</span>
              </div>
            ) : (
              <Link
                href={item.href}
                className="flex items-center gap-2.5 px-2 py-2 rounded-md text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
              >
                <span className="text-sm w-4 text-center">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
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
