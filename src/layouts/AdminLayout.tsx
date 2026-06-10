import { Suspense } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { FaEnvelope, FaFolder, FaSignOutAlt } from 'react-icons/fa'
import PageFallback from '@/components/PageFallback'
import useAuth from '@/hooks/useAuth'

const linkBase =
  'flex items-center gap-2 rounded-lg px-3 py-2 font-nav text-sm font-medium transition-colors'
const linkActive = 'bg-page text-ink'
const linkIdle = 'text-muted hover:bg-page hover:text-ink'

const navItems = [
  { to: '/admin/projects', label: 'Projets', Icon: FaFolder },
  { to: '/admin/contacts', label: 'Messages', Icon: FaEnvelope },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    void navigate('/')
  }

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-300 items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to="/"
            className="font-logo text-lg font-bold text-ink transition-opacity hover:opacity-70"
          >
            Admin
          </Link>

          <nav className="flex gap-1">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
              >
                <Icon size={14} aria-hidden />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden items-center gap-2 md:flex">
                <img
                  src={user.picture}
                  alt=""
                  className="h-8 w-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <span className="font-body text-sm text-muted">
                  {user.email}
                </span>
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Se déconnecter"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-page"
            >
              <FaSignOutAlt size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
