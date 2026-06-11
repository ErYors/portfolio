import { contactMessagesSchema, type ContactMessage } from '@/types'
import { readValidated, writeJson } from './storage'

const STORAGE_KEY = 'portfolio-contacts'

export function getContacts(): ContactMessage[] {
  return readValidated(STORAGE_KEY, contactMessagesSchema, [])
}

export function saveContacts(messages: ContactMessage[]): void {
  writeJson(STORAGE_KEY, messages)
}
