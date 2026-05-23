import { useEffect, useState } from 'react'
import project1 from '../assets/project-1.webp'
import project2 from '../assets/project-2.webp'
import project3 from '../assets/project-3.webp'
import { ProjectsContext } from './ProjectsContext'

const STORAGE_KEY = 'portfolio-projects'

const seedProjects = [
  {
    id: 1,
    name: 'Project Name',
    description:
      'I created this personal project in order to show how to create an interface in Figma using a portfolio as an example.',
    image: project1,
  },
  {
    id: 2,
    name: 'Project Name',
    description:
      'What was your role, your deliverables, if the project was personal, freelancing.',
    image: project2,
  },
  {
    id: 3,
    name: 'Project Name',
    description:
      'You can also add in this description the type of the project, if it was for web, mobile, electron.',
    image: project3,
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

  const addProject = (project) => {
    setProjects((prev) => [...prev, { ...project, id: Date.now() }])
  }

  const updateProject = (id, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    )
  }

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const resetProjects = () => {
    setProjects(seedProjects)
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        resetProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}
