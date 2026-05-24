import useProjects from '../hooks/useProjects'

const thClass =
  'px-6 py-4 text-left font-body text-sm font-bold uppercase tracking-wide text-ink'
const tdClass = 'px-6 py-4 align-middle'

export default function ProjectsTable() {
  const { projects } = useProjects()

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-12 text-center">
        <p className="font-body text-base text-muted">
          Aucun projet pour le moment.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
      <table className="w-full border-collapse">
        <thead className="border-b border-border">
          <tr>
            <th className={thClass}>Image</th>
            <th className={thClass}>Nom</th>
            <th className={thClass}>Description</th>
            <th className={`${thClass} text-right`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-border last:border-b-0"
            >
              <td className={tdClass}>
                <img
                  src={project.image}
                  alt=""
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </td>
              <td className={`${tdClass} font-body text-base font-bold text-ink`}>
                {project.name}
              </td>
              <td className={`${tdClass} font-body text-sm text-muted`}>
                <span className="line-clamp-2 max-w-md">
                  {project.description}
                </span>
              </td>
              <td className={`${tdClass} text-right font-body text-sm text-muted italic`}>
                à venir
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
