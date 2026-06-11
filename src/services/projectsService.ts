import project1 from '@/assets/project-1.webp'
import project2 from '@/assets/project-2.webp'
import project3 from '@/assets/project-3.webp'
import { projectsSchema, type Project } from '@/types'
import { readValidated, writeJson } from './storage'

const STORAGE_KEY = 'portfolio-projects'

export const seedProjects: Project[] = [
  {
    id: 'seed-1',
    name: 'Project Name',
    description:
      'I created this personal project in order to show how to create an interface in Figma using a portfolio as an example.',
    image: project1,
    url: 'https://github.com/ErYors/portfolio',
    tags: ['Figma', 'UI Design'],
  },
  {
    id: 'seed-2',
    name: 'Project Name',
    description:
      'What was your role, your deliverables, if the project was personal, freelancing.',
    image: project2,
    url: 'https://github.com/ErYors/portfolio',
    tags: ['Web', 'Freelance'],
  },
  {
    id: 'seed-3',
    name: 'Project Name',
    description:
      'You can also add in this description the type of the project, if it was for web, mobile, electron.',
    image: project3,
    url: 'https://github.com/ErYors/portfolio',
    tags: ['Mobile', 'Electron'],
  },
]

export function getProjects(): Project[] {
  const projects = readValidated(STORAGE_KEY, projectsSchema, seedProjects)
  return projects.length > 0 ? projects : seedProjects
}

export function saveProjects(projects: Project[]): void {
  writeJson(STORAGE_KEY, projects)
}
