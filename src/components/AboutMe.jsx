import Button from './Button'

export default function AboutMe() {
  return (
    <section className="relative z-10 pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div className="max-w-147">
        <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-slate-900">
          About me
        </h1>

        <p className="mt-6 sm:mt-8 text-base leading-normal text-slate-500">
          Nisl arcu, scelerisque neque ut. Tincidunt amet, tempor duis tortor
          neque auctor dis ipsum. Pretium cras amet odio amet eleifend id sed
          cras sed. Aliquet risus posuere aliquet imperdiet sit.
        </p>

        <div className="mt-8 sm:mt-10">
          <Button variant="primary">Resume</Button>
        </div>
      </div>
    </section>
  )
}
