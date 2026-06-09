import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import placeholder from '@/assets/project-placeholder.svg'
import project1 from '@/assets/project-1.webp'
import project2 from '@/assets/project-2.webp'
import project3 from '@/assets/project-3.webp'
import { ProjectsContext } from '@/contexts/ProjectsContext'
import type { Project, ProjectDraft } from '@/types'

const STORAGE_KEY = 'portfolio-projects'

function withDefaults<T extends { image: string }>(project: T): T {
  return { ...project, image: project.image.trim() || placeholder }
}

const seedProjects: Project[] = [
  {
    id: 'seed-1',
    name: 'Project Name',
    description:
      'I created this personal project in order to show how to create an interface in Figma using a portfolio as an example.',
    image: project1,
    url: 'https://github.com/ErYors/portfolio',
  },
  {
    id: 'seed-2',
    name: 'Project Name',
    description:
      'What was your role, your deliverables, if the project was personal, freelancing.',
    image: project2,
    url: 'https://github.com/ErYors/portfolio',
  },
  {
    id: 'seed-3',
    name: 'Project Name',
    description:
      'You can also add in this description the type of the project, if it was for web, mobile, electron.',
    image: project3,
    url: 'https://github.com/ErYors/portfolio',
  },
]

function getInitialProjects(): Project[] {
  if (typeof window === 'undefined') return seedProjects
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return seedProjects
  try {
    const parsed: unknown = JSON.parse(stored)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as Project[]
    }
    return seedProjects
  } catch {
    return seedProjects
  }
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(getInitialProjects)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  const addProject = useCallback((project: ProjectDraft) => {
    setProjects((prev) => [
      ...prev,
      { ...withDefaults(project), id: crypto.randomUUID() },
    ])
  }, [])

  const updateProject = useCallback(
    (id: string, updates: Partial<ProjectDraft>) => {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? withDefaults({ ...p, ...updates }) : p)),
      )
    },
    [],
  )

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const resetProjects = useCallback(() => {
    setProjects(seedProjects)
  }, [])

  const value = useMemo(
    () => ({
      projects,
      addProject,
      updateProject,
      deleteProject,
      resetProjects,
    }),
    [projects, addProject, updateProject, deleteProject, resetProjects],
  )

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  )
}
