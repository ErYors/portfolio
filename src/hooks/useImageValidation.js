import { useEffect, useState } from 'react'

const DEBOUNCE_MS = 500

export default function useImageValidation(url) {
  const trimmed = url.trim()
  const [result, setResult] = useState(null)

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
