import { Link, NavLink } from 'react-router'
import { FaMoon, FaSun } from 'react-icons/fa'
import useTheme from '../hooks/useTheme'

const tabClass =
  'relative font-nav text-sm font-medium text-ink transition-opacity hover:opacity-70 sm:text-lg'
const activeClass =
  "after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:mt-0.5 after:h-0.5 after:bg-ink after:rounded-full"

export default function Header({ name = 'Madelyn Torff' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="relative z-10 mx-auto flex h-14 w-full max-w-300 items-center justify-between px-4 sm:px-6 xl:px-0">
      <Link
        to="/"
        className="font-logo text-sm font-bold leading-8 text-ink sm:text-lg"
      >
        {name}
      </Link>

      <nav>
        <ul className="flex items-center gap-3 sm:gap-12">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${tabClass}${isActive ? ` ${activeClass}` : ''}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <Link to="/#projects" className={tabClass}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/#contact" className={tabClass}>
              Contact
            </Link>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${tabClass}${isActive ? ` ${activeClass}` : ''}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'Activer le mode clair'
                  : 'Activer le mode sombre'
              }
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink transition-opacity hover:opacity-70"
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
