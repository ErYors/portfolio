import { useEffect, useState } from 'react'
import { FaQuoteLeft } from 'react-icons/fa'
import useTestimonials from '@/hooks/useTestimonials'
import SectionTitle from './SectionTitle'

const AUTO_ROTATE_MS = 5000

export default function Testimonials() {
  const { testimonials } = useTestimonials()
  const visible = testimonials.filter((t) => !t.hidden)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (visible.length <= 1) return
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visible.length)
    }, AUTO_ROTATE_MS)
    return () => clearInterval(id)
  }, [visible.length])

  if (visible.length === 0) return null

  const safeIndex = activeIndex % visible.length
  const active = visible[safeIndex]
  if (!active) return null

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

      {visible.length > 1 && (
        <div className="flex gap-3" role="tablist" aria-label="Témoignages">
          {visible.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              aria-label={`Voir témoignage ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={`h-2 cursor-pointer rounded-full transition-all ${
                i === safeIndex
                  ? 'w-8 bg-ink'
                  : 'w-2 bg-muted/40 hover:bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
