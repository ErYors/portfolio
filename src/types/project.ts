import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  url: z.string(),
  tags: z.array(z.string()).default([]),
})

export const projectDraftSchema = projectSchema.omit({ id: true })

export const projectsSchema = z.array(projectSchema)

export type Project = z.infer<typeof projectSchema>
export type ProjectDraft = z.infer<typeof projectDraftSchema>
