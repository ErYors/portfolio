import { useEffect, useRef, useState } from 'react'
import useImageValidation from '../hooks/useImageValidation'
import Button from './Button'
import ImageStatus from './ImageStatus'

const inputClass =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 font-body text-base text-ink focus:outline-none focus:border-ink transition-colors'

const labelClass = 'font-body text-base font-bold text-ink'

const EMPTY_PROJECT = { name: '', description: '', image: '', url: '' }

export default function ProjectModal({ onClose, onSave, project }) {
  const [values, setValues] = useState({ ...EMPTY_PROJECT, ...project })
  const nameInputRef = useRef(null)
  const imageStatus = useImageValidation(values.image)
  const isEditing = project != null

  useEffect(() => {
    const previouslyFocused = document.activeElement
    nameInputRef.current?.focus()
    return () => previouslyFocused?.focus?.()
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleChange = (e) => {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
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
        className="relative w-full max-w-lg rounded-2xl bg-surface p-8 shadow-xl"
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
              Image (URL)
            </label>
            <input
              id="image"
              type="text"
              placeholder="https://… (laisser vide pour l'image par défaut)"
              value={values.image}
              onChange={handleChange}
              className={inputClass}
            />
            <ImageStatus status={imageStatus} />
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
