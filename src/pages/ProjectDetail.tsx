import { Link, useParams } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa'
import Button from '@/components/Button'
import useProjects from '@/hooks/useProjects'

export default function ProjectDetail() {
  const { id } = useParams()
  const { projects } = useProjects()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-300 flex-col items-center justify-center gap-6 px-6 text-center xl:px-0">
        <h1 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-ink">
          Projet introuvable
        </h1>
        <p className="max-w-md font-body text-base text-muted">
          Ce projet n’existe pas ou a été supprimé.
        </p>
        <Button as={Link} to="/#projects" variant="primary">
          Retour aux projets
        </Button>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-300 px-6 py-16 xl:px-0">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 font-nav text-sm font-medium text-muted transition-opacity hover:opacity-70"
      >
        <FaArrowLeft size={12} aria-hidden />
        Retour aux projets
      </Link>

      <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
        <img
          src={project.image}
          alt={project.name}
          className="aspect-square w-full rounded-3xl object-cover shadow-lg"
        />

        <div className="flex flex-col gap-6">
          <h1 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-bold text-ink">
            {project.name}
          </h1>
          <p className="font-body text-lg leading-relaxed text-muted">
            {project.description}
          </p>
          {project.url && (
            <div>
              <Button
                as="a"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Visiter le projet
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
