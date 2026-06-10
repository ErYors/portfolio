import { createContext } from 'react'
import type { ContactDraft, ContactMessage } from '@/types'

export interface ContactsContextValue {
  messages: ContactMessage[]
  addMessage: (draft: ContactDraft) => void
  markAsRead: (id: string) => void
  removeMessage: (id: string) => void
}

export const ContactsContext = createContext<ContactsContextValue | null>(null)
