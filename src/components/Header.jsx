import { Link } from 'react-router'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '#contact' },
]

const linkClass =
  'text-sm text-slate-700 hover:text-slate-900 transition-colors'

export default function Header({ name = 'Madelyn Torff' }) {
  return (
    <header className="relative z-10">
      <div className="max-w-300 mx-auto h-14 px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-semibold text-slate-900 tracking-wide"
        >
          {name}
        </Link>

        <nav>
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
