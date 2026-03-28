import { CtaButton } from '@/components/shared/cta-button'

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-8">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <p className="text-[8rem] md:text-[12rem] font-mono font-bold leading-none text-gold select-none tabular-nums">
          404
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px w-16 bg-border" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
          <div className="h-px w-16 bg-border" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Pagina niet gevonden
        </h1>
        <p className="text-muted-foreground mb-10">
          Deze pagina bestaat niet of is verplaatst.
        </p>

        <CtaButton href="/" variant="primary">
          Terug naar home
        </CtaButton>
      </div>
    </section>
  )
}
