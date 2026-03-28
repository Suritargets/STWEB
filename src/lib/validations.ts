import { z } from 'zod'

export const SERVICE_OPTIONS = [
  'business-support',
  'web-applications',
  'research',
  'forensics',
  'education',
  'anders',
] as const

export const contactSchema = z.object({
  naam: z.string().min(2, 'Naam is verplicht'),
  bedrijfsnaam: z.string().min(1, 'Bedrijfsnaam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  telefoon: z.string().optional(),
  service: z.enum(SERVICE_OPTIONS, {
    errorMap: () => ({ message: 'Selecteer een service' }),
  }),
  bericht: z.string().min(10, 'Bericht moet minimaal 10 tekens bevatten'),
})

export type ContactFormData = z.infer<typeof contactSchema>
