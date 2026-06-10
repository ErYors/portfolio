import { useContext } from 'react'
import { TestimonialsContext } from '@/context/TestimonialsContext'

export default function useTestimonials() {
  const ctx = useContext(TestimonialsContext)
  if (!ctx) {
    throw new Error(
      'useTestimonials must be used within a TestimonialsProvider',
    )
  }
  return ctx
}
