import type { ZodType } from 'zod'

export function readValidated<T>(
  key: string,
  schema: ZodType<T>,
  fallback: T,
): T {
  if (typeof window === 'undefined') return fallback
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    const parsed: unknown = JSON.parse(raw)
    const result = schema.safeParse(parsed)
    return result.success ? result.data : fallback
  } catch {
    return fallback
  }
}

export function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeKey(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}
