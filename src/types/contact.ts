import { z } from 'zod'

export const contactDraftSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.email('Adresse email invalide'),
  message: z.string().min(10, 'Le message doit faire au moins 10 caractères'),
})

export const contactMessageSchema = contactDraftSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  read: z.boolean(),
})

export type ContactDraft = z.infer<typeof contactDraftSchema>
export type ContactMessage = z.infer<typeof contactMessageSchema>
