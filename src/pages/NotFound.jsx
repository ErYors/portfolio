import { Link } from 'react-router'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-300 flex-col items-center justify-center gap-6 px-6 py-16 text-center xl:px-0">
      <h1 className="font-serif text-[clamp(5rem,15vw,10rem)] font-bold leading-none text-ink">
        404
      </h1>

      <p className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-ink">
        Page introuvable
      </p>

      <p className="max-w-md font-body text-base text-muted">
        La page que tu cherches n’existe pas ou a été déplacée.
      </p>

      <Button as={Link} to="/" variant="primary">
        Retour à l’accueil
      </Button>
    </section>
  )
}
