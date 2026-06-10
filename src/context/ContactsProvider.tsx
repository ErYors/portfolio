import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { ContactsContext } from '@/context/ContactsContext'
import {
  contactMessagesSchema,
  type ContactDraft,
  type ContactMessage,
} from '@/types'

const STORAGE_KEY = 'portfolio-contacts'

type ContactsAction =
  | { type: 'add'; message: ContactMessage }
  | { type: 'markRead'; id: string }
  | { type: 'remove'; id: string }

function contactsReducer(
  state: ContactMessage[],
  action: ContactsAction,
): ContactMessage[] {
  switch (action.type) {
    case 'add':
      return [action.message, ...state]
    case 'markRead':
      return state.map((m) => (m.id === action.id ? { ...m, read: true } : m))
    case 'remove':
      return state.filter((m) => m.id !== action.id)
  }
}

function getInitialMessages(): ContactMessage[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  try {
    const parsed: unknown = JSON.parse(stored)
    const result = contactMessagesSchema.safeParse(parsed)
    return result.success ? result.data : []
  } catch {
    return []
  }
}

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [messages, dispatch] = useReducer(
    contactsReducer,
    undefined,
    getInitialMessages,
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const addMessage = useCallback((draft: ContactDraft) => {
    dispatch({
      type: 'add',
      message: {
        ...draft,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        read: false,
      },
    })
  }, [])

  const markAsRead = useCallback((id: string) => {
    dispatch({ type: 'markRead', id })
  }, [])

  const removeMessage = useCallback((id: string) => {
    dispatch({ type: 'remove', id })
  }, [])

  const value = useMemo(
    () => ({ messages, addMessage, markAsRead, removeMessage }),
    [messages, addMessage, markAsRead, removeMessage],
  )

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  )
}
