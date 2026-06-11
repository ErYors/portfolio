import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router'
import useAuth from '@/hooks/useAuth'
import { initGoogleAuth, renderGoogleButton } from '@/services/googleAuth'

interface LocationState {
  from?: { pathname?: string }
}

export default function Login() {
  const { isAuthenticated, login } = useAuth()
  const location = useLocation()
  const buttonRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  const state = location.state as LocationState | null
  const from = state?.from?.pathname ?? '/admin/projects'

  useEffect(() => {
    if (isAuthenticated) return

    let cancelled = false
    initGoogleAuth(
      (user) => {
        login(user)
      },
      (e) => {
        if (!cancelled) setError(e.message)
      },
    )
      .then(() => {
        if (!cancelled && buttonRef.current) {
          renderGoogleButton(buttonRef.current)
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erreur de connexion')
        }
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, login])

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-page px-6 text-center">
      <Link
        to="/"
        className="font-logo text-lg font-bold text-ink transition-opacity hover:opacity-70"
      >
        Madelyn Torff
      </Link>

      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-10 shadow-lg">
        <h1 className="font-serif text-2xl font-bold text-ink">
          Espace administration
        </h1>
        <p className="font-body text-base text-muted">
          Connecte-toi avec Google pour accéder au tableau de bord.
        </p>

        <div ref={buttonRef} className="flex min-h-[44px] justify-center" />

        {error && (
          <p role="alert" className="font-body text-sm text-error">
            {error}
          </p>
        )}
      </div>

      <Link
        to="/"
        className="font-body text-sm text-muted underline transition-opacity hover:opacity-70"
      >
        Retour au portfolio
      </Link>
    </main>
  )
}
