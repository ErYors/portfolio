import { Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa'
import PageFallback from '@/components/PageFallback'
import useAuth from '@/hooks/useAuth'
import useTheme from '@/hooks/useTheme'

const tabClass =
  'relative font-nav text-sm font-medium text-ink transition-opacity hover:opacity-70 sm:text-lg'
const activeClass =
  "after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:mt-0.5 after:h-0.5 after:bg-ink after:rounded-full"

const navItems = [
  { to: '/admin', label: 'Vue d’ensemble', end: true },
  { to: '/admin/projects', label: 'Projets', end: false },
  { to: '/admin/contacts', label: 'Messages', end: false },
  { to: '/admin/testimonials', label: 'Avis', end: false },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
    void navigate('/')
  }

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const renderLinks = () =>
    navItems.map(({ to, label, end }) => (
      <li key={to}>
        <NavLink
          to={to}
          end={end}
          onClick={closeMenu}
          className={({ isActive }) =>
            `${tabClass}${isActive ? ` ${activeClass}` : ''}`
          }
        >
          {label}
        </NavLink>
      </li>
    ))

  const homeLink = (
    <Link to="/" onClick={closeMenu} className={tabClass}>
      Accueil
    </Link>
  )

  const logoutButton = (
    <button type="button" onClick={handleLogout} className={tabClass}>
      Déconnexion
    </button>
  )

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
    <div className="flex min-h-screen flex-col bg-page">
      <header className="relative z-20 mx-auto flex h-14 w-full max-w-300 items-center justify-between px-4 sm:px-6 xl:px-0">
        <Link
          to="/"
          onClick={closeMenu}
          className="font-logo text-sm font-bold leading-8 text-ink sm:text-lg"
        >
          Admin
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>{homeLink}</li>
            {renderLinks()}
            <li>{logoutButton}</li>
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
            aria-controls="admin-menu"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-ink transition-opacity hover:opacity-70"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="admin-menu"
            className="absolute top-full right-0 left-0 animate-fade-in border-b border-border bg-page shadow-lg md:hidden"
          >
            <ul className="flex flex-col gap-4 px-4 py-6">
              <li>{homeLink}</li>
              {renderLinks()}
              <li>{logoutButton}</li>
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
