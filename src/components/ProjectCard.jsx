import Button from './Button'

export default function ProjectCard({
  name = 'Project Name',
  description,
  image,
  url,
  reverse = false,
}) {
  const direction = reverse ? 'md:flex-row-reverse' : 'md:flex-row'

  return (
    <article
      className={`flex flex-col ${direction} overflow-hidden rounded-3xl bg-surface shadow-lg`}
    >
      <div className="flex w-full flex-col justify-center gap-6 p-10 md:w-1/2 md:p-12">
        <h3 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-ink">
          {name}
        </h3>
        <p className="font-body text-base leading-relaxed text-muted">
          {description}
        </p>
        {url && (
          <div>
            <Button
              variant="secondary"
              as="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full"
            >
              View Project
            </Button>
          </div>
        )}
      </div>

      <div className="aspect-square w-full md:aspect-auto md:w-1/2">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
    </article>
  )
}
