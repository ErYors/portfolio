import { useEffect, useState } from 'react'
import { FaQuoteLeft } from 'react-icons/fa'
import SectionTitle from './SectionTitle'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager, Acme Corp',
    quote:
      "Madelyn brought our vision to life with stunning attention to detail. Her design sensibility transformed our product into something truly delightful.",
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Founder, Stellar Studios',
    quote:
      "Working with Madelyn was a game-changer. She doesn't just design, she listens, iterates, and delivers consistently above expectations.",
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Marketing Lead, Nova Tech',
    quote:
      "An incredible eye for typography and layout. Madelyn's work elevated our brand identity beyond what we thought possible.",
  },
]

const AUTO_ROTATE_MS = 5000

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, AUTO_ROTATE_MS)
    return () => clearInterval(id)
  }, [activeIndex])

  const active = testimonials[activeIndex]

  return (
    <section className="flex flex-col items-center gap-12 px-6 py-16">
      <SectionTitle>Testimonials</SectionTitle>

      <article className="flex w-full max-w-180 flex-col items-center gap-6 rounded-3xl bg-surface px-8 py-12 text-center shadow-lg sm:px-12">
        <FaQuoteLeft className="text-yellow" size={32} aria-hidden />

        <p
          key={active.id}
          className="animate-fade-in font-serif text-[clamp(1.125rem,1.8vw,1.5rem)] leading-relaxed text-ink italic"
        >
          {active.quote}
        </p>

        <div className="flex flex-col items-center gap-1">
          <p className="font-body text-base font-bold text-ink">
            {active.name}
          </p>
          <p className="font-body text-sm text-muted">{active.role}</p>
        </div>
      </article>

      <div className="flex gap-3" role="tablist" aria-label="Témoignages">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Voir témoignage ${i + 1}`}
            onClick={() => setActiveIndex(i)}
            className={`h-2 cursor-pointer rounded-full transition-all ${
              i === activeIndex ? 'w-8 bg-ink' : 'w-2 bg-muted/40 hover:bg-muted'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
