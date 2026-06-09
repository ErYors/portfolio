import { useEffect, useState } from 'react'
import type { ImageStatus } from '@/components/ImageStatus'

const DEBOUNCE_MS = 500

interface ValidationResult {
  url: string
  status: Extract<ImageStatus, 'valid' | 'invalid'>
}

export default function useImageValidation(url: string): ImageStatus {
  const trimmed = url.trim()
  const [result, setResult] = useState<ValidationResult | null>(null)

  useEffect(() => {
    if (!trimmed) return

    const handle = setTimeout(() => {
      const img = new Image()
      img.onload = () => setResult({ url: trimmed, status: 'valid' })
      img.onerror = () => setResult({ url: trimmed, status: 'invalid' })
      img.src = trimmed
    }, DEBOUNCE_MS)

    return () => clearTimeout(handle)
  }, [trimmed])

  if (!trimmed) return 'idle'
  if (result?.url === trimmed) return result.status
  return 'loading'
}
