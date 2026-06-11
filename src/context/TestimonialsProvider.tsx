import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { TestimonialsContext } from '@/context/TestimonialsContext'
import {
  getTestimonials,
  saveTestimonials,
} from '@/services/testimonialsService'
import type { Testimonial } from '@/types'

type TestimonialsAction = { type: 'toggle'; id: string }

function testimonialsReducer(
  state: Testimonial[],
  action: TestimonialsAction,
): Testimonial[] {
  switch (action.type) {
    case 'toggle':
      return state.map((t) =>
        t.id === action.id ? { ...t, hidden: !t.hidden } : t,
      )
  }
}

export function TestimonialsProvider({ children }: { children: ReactNode }) {
  const [testimonials, dispatch] = useReducer(
    testimonialsReducer,
    undefined,
    getTestimonials,
  )

  useEffect(() => {
    saveTestimonials(testimonials)
  }, [testimonials])

  const toggleVisibility = useCallback((id: string) => {
    dispatch({ type: 'toggle', id })
  }, [])

  const value = useMemo(
    () => ({ testimonials, toggleVisibility }),
    [testimonials, toggleVisibility],
  )

  return (
    <TestimonialsContext.Provider value={value}>
      {children}
    </TestimonialsContext.Provider>
  )
}
