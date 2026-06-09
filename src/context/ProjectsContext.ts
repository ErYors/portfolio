import { createContext } from 'react'
import type { Project, ProjectDraft } from '@/types'

export interface ProjectsContextValue {
  projects: Project[]
  addProject: (project: ProjectDraft) => void
  updateProject: (id: string, updates: Partial<ProjectDraft>) => void
  deleteProject: (id: string) => void
  resetProjects: () => void
}

export const ProjectsContext = createContext<ProjectsContextValue | null>(null)
