import useProjects from '../hooks/useProjects'
import ProjectCard from './ProjectCard'
import SectionTitle from './SectionTitle'

export default function Projects() {
  const { projects } = useProjects()

  return (
    <section id="projects" className="max-w-248 mx-auto px-6 xl:px-0 py-16">
      <SectionTitle>Projects</SectionTitle>

      <div className="mt-10 flex flex-col gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} {...project} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
