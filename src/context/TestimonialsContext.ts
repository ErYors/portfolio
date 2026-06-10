import { createContext } from 'react'
import type { Testimonial } from '@/types'

export interface TestimonialsContextValue {
  testimonials: Testimonial[]
  toggleVisibility: (id: string) => void
}

export const TestimonialsContext =
  createContext<TestimonialsContextValue | null>(null)
