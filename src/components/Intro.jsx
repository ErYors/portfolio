import Button from './Button'

export default function Intro() {
  return (
    <section className="max-w-300 mx-auto px-6 pt-14 pb-24">
      <div className="max-w-[486px]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-400">
          UI/UX Designer
        </p>

        <h1 className="mt-10 text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
          Hello, my name is Madelyn Torff
        </h1>

        <p className="mt-8 text-base leading-[1.5] text-slate-500">
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
