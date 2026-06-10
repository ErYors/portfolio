import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  picture: z.string(),
})

export type User = z.infer<typeof userSchema>

export const googleCredentialSchema = z.object({
  sub: z.string(),
  name: z.string(),
  email: z.email(),
  picture: z.string(),
})
