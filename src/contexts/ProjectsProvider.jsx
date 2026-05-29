import { useCallback, useEffect, useMemo, useState } from 'react'
import placeholder from '../assets/project-placeholder.svg'
import project1 from '../assets/project-1.webp'
import project2 from '../assets/project-2.webp'
import project3 from '../assets/project-3.webp'
import { ProjectsContext } from './ProjectsContext'

const STORAGE_KEY = 'portfolio-projects'

const withDefaults = (project) => ({
  ...project,
  image: project.image?.trim() || placeholder,
})

const seedProjects = [
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

function getInitialProjects() {
  if (typeof window === 'undefined') return seedProjects
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return seedProjects
  try {
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedProjects
  } catch {
    return seedProjects
  }
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(getInitialProjects)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  const addProject = useCallback((project) => {
    setProjects((prev) => [
      ...prev,
      { ...withDefaults(project), id: crypto.randomUUID() },
    ])
  }, [])

  const updateProject = useCallback((id, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? withDefaults({ ...p, ...updates }) : p)),
    )
  }, [])

  const deleteProject = useCallback((id) => {
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
