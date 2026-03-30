import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['nl', 'en', 'es', 'pt-BR', 'fr'],
  defaultLocale: 'nl',
})

export type Locale = (typeof routing.locales)[number]
