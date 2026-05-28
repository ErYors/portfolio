import { useEffect, useRef } from 'react'
import Button from './Button'

export default function ConfirmModal({
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null)

  useEffect(() => {
    cancelRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center p-4">
      <button
        type="button"
        onClick={onCancel}
        aria-label="Fermer"
        className="absolute inset-0 cursor-default bg-black/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative w-full max-w-md rounded-2xl bg-surface p-8 shadow-xl"
      >
        <h2
          id="confirm-title"
          className="mb-3 font-serif text-2xl font-bold text-ink"
        >
          {title}
        </h2>

        <p className="mb-6 font-body text-base text-muted">{message}</p>

        <div className="flex justify-end gap-3">
          <Button
            ref={cancelRef}
            variant="secondary"
            type="button"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} type="button" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
