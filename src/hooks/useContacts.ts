import { useContext } from 'react'
import { ContactsContext } from '@/context/ContactsContext'

export default function useContacts() {
  const ctx = useContext(ContactsContext)
  if (!ctx) {
    throw new Error('useContacts must be used within a ContactsProvider')
  }
  return ctx
}
