import { useState } from 'react'
import { FaEnvelope, FaEnvelopeOpen, FaTrash } from 'react-icons/fa'
import ConfirmModal from '@/components/ConfirmModal'
import useContacts from '@/hooks/useContacts'
import useToast from '@/hooks/useToast'
import type { ContactMessage } from '@/types'

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export default function AdminContacts() {
  const { messages, markAsRead, removeMessage } = useContacts()
  const toast = useToast()
  const [confirming, setConfirming] = useState<ContactMessage | null>(null)

  const unreadCount = messages.filter((m) => !m.read).length

  const handleConfirmDelete = () => {
    if (!confirming) return
    removeMessage(confirming.id)
    toast.success('Message supprimé')
    setConfirming(null)
  }

  return (
    <section className="mx-auto flex max-w-300 flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-serif text-[clamp(2rem,3.33vw,3rem)] font-bold text-ink">
          Messages
        </h1>
        <p className="font-body text-base text-muted">
          {messages.length} message{messages.length > 1 ? 's' : ''} ·{' '}
          {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
        </p>
      </header>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <p className="font-body text-base text-muted">Aucun message reçu.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`rounded-2xl border bg-surface p-6 shadow-sm transition-colors ${
                message.read ? 'border-border' : 'border-yellow'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="font-body text-base font-bold text-ink">
                    {message.name}
                  </p>
                  <a
                    href={`mailto:${message.email}`}
                    className="font-body text-sm text-muted underline-offset-2 hover:underline"
                  >
                    {message.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <time
                    dateTime={message.createdAt}
                    className="font-body text-xs text-muted"
                  >
                    {dateFormatter.format(new Date(message.createdAt))}
                  </time>
                  {!message.read && (
                    <button
                      type="button"
                      onClick={() => markAsRead(message.id)}
                      aria-label="Marquer comme lu"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-page"
                    >
                      <FaEnvelope size={14} />
                    </button>
                  )}
                  {message.read && (
                    <span
                      aria-label="Lu"
                      className="flex h-9 w-9 items-center justify-center text-muted"
                    >
                      <FaEnvelopeOpen size={14} />
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setConfirming(message)}
                    aria-label={`Supprimer le message de ${message.name}`}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-page"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>

              <p className="mt-4 font-body text-base whitespace-pre-line text-ink">
                {message.message}
              </p>
            </li>
          ))}
        </ul>
      )}

      {confirming && (
        <ConfirmModal
          title="Supprimer le message ?"
          message={`Le message de "${confirming.name}" sera supprimé définitivement.`}
          confirmLabel="Supprimer"
          confirmVariant="danger"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirming(null)}
        />
      )}
    </section>
  )
}
