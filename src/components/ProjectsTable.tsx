import { useState } from 'react'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import type { Project } from '@/types'
import useProjects from '@/hooks/useProjects'
import useToast from '@/hooks/useToast'
import ConfirmModal from './ConfirmModal'

const thClass =
  'px-6 py-4 text-left font-body text-sm font-bold uppercase tracking-wide text-ink'
const tdClass = 'px-6 py-4 align-middle'
const iconBtnClass =
  'flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-page'

interface ProjectsTableProps {
  projects: Project[]
  onEdit: (project: Project) => void
  emptyMessage?: string
}

export default function ProjectsTable({
  projects,
  onEdit,
  emptyMessage = 'Aucun projet pour le moment.',
}: ProjectsTableProps) {
  const { deleteProject } = useProjects()
  const toast = useToast()
  const [confirming, setConfirming] = useState<Project | null>(null)

  const handleConfirm = () => {
    if (!confirming) return
    deleteProject(confirming.id)
    toast.success('Projet supprimé')
    setConfirming(null)
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-12 text-center">
        <p className="font-body text-base text-muted">{emptyMessage}</p>
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
              <td
                className={`${tdClass} font-body text-base font-bold text-ink`}
              >
                {project.name}
              </td>
              <td className={`${tdClass} font-body text-sm text-muted`}>
                <span className="line-clamp-2 max-w-md">
                  {project.description}
                </span>
              </td>
              <td className={`${tdClass} text-right`}>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(project)}
                    aria-label={`Modifier ${project.name}`}
                    className={iconBtnClass}
                  >
                    <FaPencilAlt size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(project)}
                    aria-label={`Supprimer ${project.name}`}
                    className={iconBtnClass}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirming && (
        <ConfirmModal
          title="Supprimer le projet ?"
          message={`Le projet "${confirming.name}" sera supprimé définitivement.`}
          confirmLabel="Supprimer"
          confirmVariant="danger"
          onConfirm={handleConfirm}
          onCancel={() => setConfirming(null)}
        />
      )}
    </div>
  )
}
