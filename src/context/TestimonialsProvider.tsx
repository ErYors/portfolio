import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { TestimonialsContext } from '@/context/TestimonialsContext'
import { testimonialsSchema, type Testimonial } from '@/types'

const STORAGE_KEY = 'portfolio-testimonials'

const seedTestimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sarah Johnson',
    role: 'Product Manager, Acme Corp',
    quote:
      'Madelyn brought our vision to life with stunning attention to detail. Her design sensibility transformed our product into something truly delightful.',
    hidden: false,
  },
  {
    id: 't-2',
    name: 'David Chen',
    role: 'Founder, Stellar Studios',
    quote:
      "Working with Madelyn was a game-changer. She doesn't just design, she listens, iterates, and delivers consistently above expectations.",
    hidden: false,
  },
  {
    id: 't-3',
    name: 'Emma Rodriguez',
    role: 'Marketing Lead, Nova Tech',
    quote:
      "An incredible eye for typography and layout. Madelyn's work elevated our brand identity beyond what we thought possible.",
    hidden: false,
  },
]

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

function getInitialTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return seedTestimonials
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return seedTestimonials
  try {
    const parsed: unknown = JSON.parse(stored)
    const result = testimonialsSchema.safeParse(parsed)
    return result.success && result.data.length > 0
      ? result.data
      : seedTestimonials
  } catch {
    return seedTestimonials
  }
}

export function TestimonialsProvider({ children }: { children: ReactNode }) {
  const [testimonials, dispatch] = useReducer(
    testimonialsReducer,
    undefined,
    getInitialTestimonials,
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials))
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
