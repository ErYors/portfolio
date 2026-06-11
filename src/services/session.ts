import { userSchema, type User } from '@/types'
import { readValidated, removeKey, writeJson } from './storage'

const STORAGE_KEY = 'portfolio-user'

export function getStoredUser(): User | null {
  return readValidated<User | null>(STORAGE_KEY, userSchema.nullable(), null)
}

export function saveUser(user: User): void {
  writeJson(STORAGE_KEY, user)
}

export function clearUser(): void {
  removeKey(STORAGE_KEY)
}
