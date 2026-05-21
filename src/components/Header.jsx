import { Link, NavLink } from 'react-router'

const tabClass =
  'relative font-nav font-medium text-lg text-ink hover:opacity-70 transition-opacity'
const activeClass =
  "after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:mt-0.5 after:h-0.5 after:bg-ink after:rounded-full"

export default function Header({ name = 'Madelyn Torff' }) {
  return (
    <header className="relative z-10 mx-auto flex h-14 w-full max-w-300 items-center justify-between px-6 xl:px-0">
      <Link
        to="/"
        className="font-logo text-lg font-bold leading-8 text-ink"
      >
        {name}
      </Link>

      <nav>
        <ul className="flex items-center gap-12">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${tabClass}${isActive ? ' ' + activeClass : ''}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <a href="/#projects" className={tabClass}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className={tabClass}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
