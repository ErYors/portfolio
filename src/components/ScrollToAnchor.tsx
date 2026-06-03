import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function ScrollToAnchor() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return null
}
