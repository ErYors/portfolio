import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Button from '../components/Button'
import ProjectModal from '../components/ProjectModal'
import ProjectsTable from '../components/ProjectsTable'
import useProjects from '../hooks/useProjects'

export default function Dashboard() {
  const { addProject, updateProject } = useProjects()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  const openCreate = () => {
    setEditingProject(null)
    setIsModalOpen(true)
  }

  const openEdit = (project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProject(null)
  }

  const handleSave = (values) => {
    if (editingProject) {
      updateProject(editingProject.id, values)
    } else {
      addProject(values)
    }
    closeModal()
  }

  return (
    <section className="mx-auto flex max-w-300 flex-col gap-8 px-6 py-16 xl:px-0">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-[clamp(2rem,3.33vw,3rem)] font-bold leading-normal text-ink">
            Dashboard
          </h1>
          <p className="font-body text-base text-muted">Gérez vos projets</p>
        </div>

        <Button
          variant="primary"
          onClick={openCreate}
          className="items-center gap-2"
        >
          <FaPlus size={14} />
          Nouveau projet
        </Button>
      </header>

      <ProjectsTable onEdit={openEdit} />

      {isModalOpen && (
        <ProjectModal
          onClose={closeModal}
          onSave={handleSave}
          project={editingProject}
        />
      )}
    </section>
  )
}
