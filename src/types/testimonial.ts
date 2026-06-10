import { z } from 'zod'

export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  quote: z.string(),
  hidden: z.boolean().default(false),
})

export const testimonialsSchema = z.array(testimonialSchema)

export type Testimonial = z.infer<typeof testimonialSchema>
