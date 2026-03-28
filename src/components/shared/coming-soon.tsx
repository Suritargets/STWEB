import { CtaButton } from './cta-button'

type Props = { title: string; description: string }

export function ComingSoon({ title, description }: Props) {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-16">
      <div className="text-center max-w-lg">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-gold mb-6">
          Coming Soon
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>
        <CtaButton href="/" variant="ghost">
          Terug naar home
        </CtaButton>
      </div>
    </section>
  )
}
