import { z } from 'zod'

export const SERVICE_OPTIONS = [
  'dashboarding',
  'web-applications',
  'marketing-ai',
  'forensics',
  'education',
  'business-consulting',
  'startup-to-founder',
  'pioneering-fundamentals',
  'education-1op1',
  'begeleiding-innovation',
  'begeleiding-blockchain',
  'digital-trail',
  'forensics-personal',
  'anders',
] as const

export const KLANT_TYPE_OPTIONS = ['bedrijf', 'individu'] as const

export const offerteSchema = z.object({
  naam:           z.string().min(2, 'Naam is verplicht'),
  bedrijfsnaam:   z.string().min(1, 'Bedrijfsnaam is verplicht'),
  email:          z.string().email('Ongeldig e-mailadres'),
  telefoon:       z.string().optional(),
  klantType:      z.enum(KLANT_TYPE_OPTIONS),
  services:       z.array(z.enum(SERVICE_OPTIONS)).min(1, 'Selecteer minimaal één dienst'),
  andersText:     z.string().optional(),
  budget:         z.string().optional(),
  bericht:        z.string().min(10, 'Toelichting moet minimaal 10 tekens bevatten'),
})

export type OfferteFormData = z.infer<typeof offerteSchema>

// Keep old alias for any other imports
export const contactSchema = offerteSchema
export type ContactFormData = OfferteFormData
