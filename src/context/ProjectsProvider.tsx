import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import placeholder from '@/assets/project-placeholder.svg'
import project1 from '@/assets/project-1.webp'
import project2 from '@/assets/project-2.webp'
import project3 from '@/assets/project-3.webp'
import { ProjectsContext } from '@/context/ProjectsContext'
import { projectsSchema, type Project, type ProjectDraft } from '@/types'

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

type ProjectsAction =
  | { type: 'add'; project: Project }
  | { type: 'update'; id: string; updates: Partial<ProjectDraft> }
  | { type: 'delete'; id: string }
  | { type: 'reset' }

function projectsReducer(state: Project[], action: ProjectsAction): Project[] {
  switch (action.type) {
    case 'add':
      return [...state, action.project]
    case 'update':
      return state.map((p) =>
        p.id === action.id ? withDefaults({ ...p, ...action.updates }) : p,
      )
    case 'delete':
      return state.filter((p) => p.id !== action.id)
    case 'reset':
      return seedProjects
  }
}

function getInitialProjects(): Project[] {
  if (typeof window === 'undefined') return seedProjects
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return seedProjects
  try {
    const parsed: unknown = JSON.parse(stored)
    const result = projectsSchema.safeParse(parsed)
    return result.success && result.data.length > 0 ? result.data : seedProjects
  } catch {
    return seedProjects
  }
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, dispatch] = useReducer(
    projectsReducer,
    undefined,
    getInitialProjects,
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  const addProject = useCallback((project: ProjectDraft) => {
    dispatch({
      type: 'add',
      project: { ...withDefaults(project), id: crypto.randomUUID() },
    })
  }, [])

  const updateProject = useCallback(
    (id: string, updates: Partial<ProjectDraft>) => {
      dispatch({ type: 'update', id, updates })
    },
    [],
  )

  const deleteProject = useCallback((id: string) => {
    dispatch({ type: 'delete', id })
  }, [])

  const resetProjects = useCallback(() => {
    dispatch({ type: 'reset' })
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
