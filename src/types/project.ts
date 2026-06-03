export interface Project {
  id: string
  name: string
  description: string
  image: string
  url: string
}

export type ProjectDraft = Omit<Project, 'id'>
