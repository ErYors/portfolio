import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa'
import useTheme from '../hooks/useTheme'

const tabClass =
  'relative font-nav text-sm font-medium text-ink transition-opacity hover:opacity-70 sm:text-lg'
const activeClass =
  "after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:mt-0.5 after:h-0.5 after:bg-ink after:rounded-full"

const navItems = [
  { to: '/about', label: 'About', route: true },
  { to: '/#projects', label: 'Projects' },
  { to: '/#contact', label: 'Contact' },
  { to: '/dashboard', label: 'Dashboard', route: true },
]

export default function Header({ name = 'Madelyn Torff' }) {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const renderLinks = () =>
    navItems.map(({ to, label, route }) => (
      <li key={to}>
        {route ? (
          <NavLink
            to={to}
            onClick={closeMenu}
            className={({ isActive }) =>
              `${tabClass}${isActive ? ` ${activeClass}` : ''}`
            }
          >
            {label}
          </NavLink>
        ) : (
          <Link to={to} onClick={closeMenu} className={tabClass}>
            {label}
          </Link>
        )}
      </li>
    ))

  const themeToggle = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'
      }
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink transition-opacity hover:opacity-70"
    >
      {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  )

  return (
    <header className="relative z-20 mx-auto flex h-14 w-full max-w-300 items-center justify-between px-4 sm:px-6 xl:px-0">
      <Link
        to="/"
        onClick={closeMenu}
        className="font-logo text-sm font-bold leading-8 text-ink sm:text-lg"
      >
        {name}
      </Link>

      <nav className="hidden md:block">
        <ul className="flex items-center gap-12">
          {renderLinks()}
          <li>{themeToggle}</li>
        </ul>
      </nav>

      <div className="flex items-center gap-1 md:hidden">
        {themeToggle}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-ink transition-opacity hover:opacity-70"
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="absolute top-full right-0 left-0 animate-fade-in border-b border-border bg-page shadow-lg md:hidden"
        >
          <ul className="flex flex-col gap-4 px-4 py-6">{renderLinks()}</ul>
        </nav>
      )}
    </header>
  )
}
