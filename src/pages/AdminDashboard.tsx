import type { IconType } from 'react-icons'
import {
  FaChartLine,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaFolder,
} from 'react-icons/fa'
import useContacts from '@/hooks/useContacts'
import useProjects from '@/hooks/useProjects'

interface Kpi {
  label: string
  value: string | number
  Icon: IconType
}

export default function AdminDashboard() {
  const { projects } = useProjects()
  const { messages } = useContacts()

  const unread = messages.filter((m) => !m.read).length
  const readRate =
    messages.length > 0
      ? Math.round(((messages.length - unread) / messages.length) * 100)
      : 0

  const kpis: Kpi[] = [
    { label: 'Projets publiés', value: projects.length, Icon: FaFolder },
    { label: 'Messages reçus', value: messages.length, Icon: FaEnvelope },
    { label: 'Non lus', value: unread, Icon: FaEnvelopeOpenText },
    { label: 'Taux de lecture', value: `${readRate}%`, Icon: FaChartLine },
  ]

  return (
    <section className="mx-auto flex max-w-300 flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-serif text-[clamp(2rem,3.33vw,3rem)] font-bold text-ink">
          Vue d’ensemble
        </h1>
        <p className="font-body text-base text-muted">
          Statistiques de votre portfolio.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, Icon }) => (
          <div
            key={label}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-page text-yellow">
              <Icon size={18} aria-hidden />
            </span>
            <p className="font-serif text-4xl font-bold text-ink">{value}</p>
            <p className="font-body text-sm text-muted">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
