import { useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import Button from '../components/Button'
import ProjectModal from '../components/ProjectModal'
import ProjectsTable from '../components/ProjectsTable'
import useProjects from '../hooks/useProjects'
import useToast from '../hooks/useToast'

export default function Dashboard() {
  const { projects, addProject, updateProject } = useProjects()
  const toast = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [search, setSearch] = useState('')

  const query = search.trim().toLowerCase()
  const filtered = query
    ? projects.filter((p) => p.name.toLowerCase().includes(query))
    : projects

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
      toast.success('Projet modifié')
    } else {
      addProject(values)
      toast.success('Projet créé')
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

      <div className="relative">
        <FaSearch
          aria-hidden
          size={14}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom…"
          aria-label="Rechercher un projet par nom"
          className="w-full rounded-lg border border-border bg-surface py-3 pr-4 pl-10 font-body text-base text-ink transition-colors focus:border-ink focus:outline-none"
        />
      </div>

      <ProjectsTable
        projects={filtered}
        onEdit={openEdit}
        emptyMessage={
          query
            ? 'Aucun projet ne correspond à votre recherche.'
            : 'Aucun projet pour le moment.'
        }
      />

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
