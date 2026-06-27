import { z } from 'zod'

export const SERVICE_OPTIONS = [
  'dashboarding',
  'web-applicaties',
  'marketing-ai',
  'forensics',
  'education',
  'anders',
] as const

export const CLIENT_TYPES = ['zakelijk', 'particulier'] as const
export type ClientType = (typeof CLIENT_TYPES)[number]

export const offerteSchema = z.discriminatedUnion('clientType', [
  // Zakelijk (business)
  z.object({
    clientType:     z.literal('zakelijk'),
    naam:           z.string().min(2, 'Naam is verplicht'),
    bedrijfsnaam:   z.string().min(1, 'Bedrijfsnaam is verplicht'),
    email:          z.string().email('Ongeldig e-mailadres'),
    telefoon:       z.string().optional(),
    services:       z.array(z.enum(SERVICE_OPTIONS)).min(1, 'Selecteer minimaal één dienst'),
    andersText:     z.string().optional(),
    budget:         z.string().optional(),
    bericht:        z.string().min(10, 'Toelichting moet minimaal 10 tekens bevatten'),
  }),
  // Particulier (individual)
  z.object({
    clientType:     z.literal('particulier'),
    naam:           z.string().min(2, 'Naam is verplicht'),
    bedrijfsnaam:   z.string().optional().default(''),
    email:          z.string().email('Ongeldig e-mailadres'),
    telefoon:       z.string().optional(),
    services:       z.array(z.enum(SERVICE_OPTIONS)).min(1, 'Selecteer minimaal één dienst'),
    andersText:     z.string().optional(),
    budget:         z.string().optional(),
    bericht:        z.string().min(10, 'Toelichting moet minimaal 10 tekens bevatten'),
  }),
])

export type OfferteFormData = z.infer<typeof offerteSchema>

// Keep old alias for any other imports
export const contactSchema = offerteSchema
export type ContactFormData = OfferteFormData

export const enrollmentSchema = z.object({
  courseSlug:      z.string().min(1),
  courseName:      z.string().min(1),
  enrollmentType:  z.enum(['individual', 'team']),
  clientType:      z.enum(['zakelijk', 'particulier']),
  naam:            z.string().min(2, 'Naam is verplicht'),
  bedrijfsnaam:    z.string().optional(),
  email:           z.string().email('Ongeldig e-mailadres'),
  telefoon:        z.string().optional(),
  deelnemers:      z.number().int().min(1),
  uren:            z.number().int().optional(),
  totalUsd:        z.number().positive(),
  calculatorData:  z.record(z.unknown()).optional(),
  opmerkingen:     z.string().optional(),
})

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>
