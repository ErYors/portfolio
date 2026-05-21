import Button from './Button'

export default function Intro() {
  return (
    <section className="relative z-10 max-w-300 mx-auto px-6 xl:px-0 pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div className="max-w-121.5">
        <p className="font-body text-sm font-bold uppercase tracking-[0.18em] text-yellow">
          UI/UX Designer
        </p>

        <h1 className="mt-10 font-serif text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-ink">
          Hello, my name is Madelyn Torff
        </h1>

        <p className="mt-8 font-body text-[clamp(1rem,1.67vw,1.5rem)] leading-normal text-muted">
          Short text with details about you, what you do or your professional
          career. You can add more information on the about page.
        </p>

        <div className="mt-10 flex gap-3">
          <Button variant="primary">Projects</Button>
          <Button variant="secondary">LinkedIn</Button>
        </div>
      </div>
    </section>
  )
}
