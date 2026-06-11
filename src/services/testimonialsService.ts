import { testimonialsSchema, type Testimonial } from '@/types'
import { readValidated, writeJson } from './storage'

const STORAGE_KEY = 'portfolio-testimonials'

export const seedTestimonials: Testimonial[] = [
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

export function getTestimonials(): Testimonial[] {
  const testimonials = readValidated(
    STORAGE_KEY,
    testimonialsSchema,
    seedTestimonials,
  )
  return testimonials.length > 0 ? testimonials : seedTestimonials
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  writeJson(STORAGE_KEY, testimonials)
}
