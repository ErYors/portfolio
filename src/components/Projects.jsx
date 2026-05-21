import ProjectCard from './ProjectCard'
import SectionTitle from './SectionTitle'
import project1 from '../assets/project-1.png'
import project2 from '../assets/project-2.png'
import project3 from '../assets/project-3.png'

const projects = [
  {
    name: 'Project Name',
    description:
      'I created this personal project in order to show how to create an interface in Figma using a portfolio as an example.',
    image: project1,
  },
  {
    name: 'Project Name',
    description:
      'What was your role, your deliverables, if the project was personal, freelancing.',
    image: project2,
    reverse: true,
  },
  {
    name: 'Project Name',
    description:
      'You can also add in this description the type of the project, if it was for web, mobile, electron.',
    image: project3,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="max-w-248 mx-auto px-6 xl:px-0 py-16">
      <SectionTitle>Projects</SectionTitle>

      <div className="mt-10 flex flex-col gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </section>
  )
}
