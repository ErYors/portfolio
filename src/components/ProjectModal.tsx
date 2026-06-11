import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react'
import { FaTimes } from 'react-icons/fa'
import type { Project, ProjectDraft } from '@/types'
import useImageValidation from '@/hooks/useImageValidation'
import useToast from '@/hooks/useToast'
import Button from './Button'
import ImageStatus from './ImageStatus'

const inputClass =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 font-body text-base text-ink focus:outline-none focus:border-ink transition-colors'

const labelClass = 'font-body text-base font-bold text-ink'

interface ProjectModalProps {
  onClose: () => void
  onSave: (values: ProjectDraft) => void
  project: Project | null
}

export default function ProjectModal({
  onClose,
  onSave,
  project,
}: ProjectModalProps) {
  const [values, setValues] = useState<ProjectDraft>({
    name: project?.name ?? '',
    description: project?.description ?? '',
    image: project?.image ?? '',
    url: project?.url ?? '',
    tags: project?.tags ?? [],
  })
  const [tagInput, setTagInput] = useState('')
  const nameInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const imageStatus = useImageValidation(values.image)
  const isEditing = project != null

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setValues((prev) => ({ ...prev, image: reader.result as string }))
      }
    }
    reader.onerror = () => {
      toast.error('Impossible de lire le fichier')
    }
    reader.readAsDataURL(file)
  }

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !values.tags.includes(tag)) {
      setValues((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
    }
    setTagInput('')
  }

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const removeTag = (tag: string) => {
    setValues((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(values)
  }

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la modale"
        className="absolute inset-0 cursor-default bg-black/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface p-8 shadow-xl"
      >
        <h2
          id="modal-title"
          className="mb-6 font-serif text-2xl font-bold text-ink"
        >
          {isEditing ? 'Modifier le projet' : 'Nouveau projet'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={labelClass}>
              Nom
            </label>
            <input
              ref={nameInputRef}
              id="name"
              type="text"
              required
              value={values.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              required
              value={values.description}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="image" className={labelClass}>
              Image (URL ou import)
            </label>
            <input
              id="image"
              type="text"
              placeholder="https://… (laisser vide pour l'image par défaut)"
              value={values.image}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              aria-label="Importer une image"
              className="font-body text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-page file:px-3 file:py-2 file:font-body file:text-sm file:text-ink"
            />
            <ImageStatus status={imageStatus} />
            {values.image && (
              <img
                src={values.image}
                alt="Aperçu"
                className="h-36 w-full rounded-lg border border-border object-cover"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tag-input" className={labelClass}>
              Tags
            </label>
            <div className="flex gap-2">
              <input
                id="tag-input"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Ajouter un tag puis Entrée"
                className={inputClass}
              />
              <Button type="button" variant="secondary" onClick={addTag}>
                Ajouter
              </Button>
            </div>
            {values.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {values.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center gap-2 rounded-full bg-page px-3 py-1 font-body text-sm text-ink"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      aria-label={`Retirer le tag ${tag}`}
                      className="cursor-pointer text-muted transition-colors hover:text-error"
                    >
                      <FaTimes size={10} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="url" className={labelClass}>
              Lien du projet (URL)
            </label>
            <input
              id="url"
              type="url"
              placeholder="https://… (optionnel)"
              value={values.url}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Enregistrer' : 'Créer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
