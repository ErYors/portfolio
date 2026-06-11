import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import placeholder from '@/assets/project-placeholder.svg'
import { ProjectsContext } from '@/context/ProjectsContext'
import {
  getProjects,
  saveProjects,
  seedProjects,
} from '@/services/projectsService'
import type { Project, ProjectDraft } from '@/types'

function withDefaults<T extends { image: string }>(project: T): T {
  return { ...project, image: project.image.trim() || placeholder }
}

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

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, dispatch] = useReducer(
    projectsReducer,
    undefined,
    getProjects,
  )

  useEffect(() => {
    saveProjects(projects)
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
