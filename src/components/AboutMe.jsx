import Button from './Button'

export default function AboutMe() {
  return (
    <section className="relative z-10 pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div className="max-w-147 flex flex-col gap-8">
        <h1 className="font-serif text-[clamp(2rem,3.33vw,3rem)] font-bold leading-normal text-ink">
          About me
        </h1>

        <p className="font-body text-[clamp(1rem,1.67vw,1.5rem)] leading-normal text-muted">
          Nisl arcu, scelerisque neque ut. Tincidunt amet, tempor duis tortor
          neque auctor dis ipsum. Pretium cras amet odio amet eleifend id sed
          cras sed. Aliquet risus posuere aliquet imperdiet sit.
        </p>

        <div>
          <Button variant="primary">Resume</Button>
        </div>
      </div>
    </section>
  )
}
