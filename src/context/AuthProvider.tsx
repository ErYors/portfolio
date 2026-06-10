import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from '@/context/AuthContext'
import { userSchema, type User } from '@/types'

const STORAGE_KEY = 'portfolio-user'

type AuthAction = { type: 'login'; user: User } | { type: 'logout' }

function authReducer(_state: User | null, action: AuthAction): User | null {
  switch (action.type) {
    case 'login':
      return action.user
    case 'logout':
      return null
  }
}

function getInitialUser(): User | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    const parsed: unknown = JSON.parse(stored)
    const result = userSchema.safeParse(parsed)
    return result.success ? result.data : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, dispatch] = useReducer(authReducer, null, getInitialUser)

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = useCallback((u: User) => {
    dispatch({ type: 'login', user: u })
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'logout' })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
