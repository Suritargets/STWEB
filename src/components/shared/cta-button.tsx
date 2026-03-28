import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}

export function CtaButton({ href, children, variant = 'primary', className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200',
        variant === 'primary' &&
          'bg-gold text-white hover:bg-[var(--gold-hover)]',
        variant === 'ghost' &&
          'border border-gold text-gold hover:bg-[var(--gold-hover)] hover:border-[var(--gold-hover)] hover:text-white',
        className
      )}
    >
      {children}
    </Link>
  )
}
