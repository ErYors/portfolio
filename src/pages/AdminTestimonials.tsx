import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Button from '@/components/Button'
import useTestimonials from '@/hooks/useTestimonials'

export default function AdminTestimonials() {
  const { testimonials, toggleVisibility } = useTestimonials()
  const visibleCount = testimonials.filter((t) => !t.hidden).length

  return (
    <section className="mx-auto flex max-w-300 flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-serif text-[clamp(2rem,3.33vw,3rem)] font-bold text-ink">
          Témoignages
        </h1>
        <p className="font-body text-base text-muted">
          {visibleCount} affiché{visibleCount > 1 ? 's' : ''} sur{' '}
          {testimonials.length}
        </p>
      </header>

      <ul className="flex flex-col gap-4">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.id}
            className={`flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm transition-opacity sm:flex-row sm:items-center sm:justify-between ${
              testimonial.hidden ? 'opacity-50' : ''
            }`}
          >
            <div className="flex flex-col gap-1">
              <p className="font-serif text-base text-ink italic">
                “{testimonial.quote}”
              </p>
              <p className="font-body text-sm font-bold text-ink">
                {testimonial.name}
              </p>
              <p className="font-body text-sm text-muted">{testimonial.role}</p>
            </div>

            <Button
              type="button"
              variant={testimonial.hidden ? 'primary' : 'secondary'}
              onClick={() => toggleVisibility(testimonial.id)}
              className="shrink-0 items-center gap-2"
            >
              {testimonial.hidden ? (
                <>
                  <FaEye size={14} />
                  Afficher
                </>
              ) : (
                <>
                  <FaEyeSlash size={14} />
                  Masquer
                </>
              )}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}
