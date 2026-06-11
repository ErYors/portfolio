import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { ContactsContext } from '@/context/ContactsContext'
import { getContacts, saveContacts } from '@/services/contactsService'
import type { ContactDraft, ContactMessage } from '@/types'

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

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [messages, dispatch] = useReducer(
    contactsReducer,
    undefined,
    getContacts,
  )

  useEffect(() => {
    saveContacts(messages)
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
