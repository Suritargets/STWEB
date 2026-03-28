import { cn } from '@/lib/utils'

type Props = {
  label?: string
  title: string
  titleEn?: string
  description?: string
  className?: string
  center?: boolean
}

export function SectionHeading({ label, title, titleEn, description, className, center }: Props) {
  return (
    <div className={cn('mb-12', center && 'text-center', className)}>
      {label && (
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-4">{label}</p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {titleEn && (
        <p className="text-base text-muted-foreground mt-1 font-mono">{titleEn}</p>
      )}
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{description}</p>
      )}
    </div>
  )
}
