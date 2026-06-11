import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from '@/context/AuthContext'
import { clearUser, getStoredUser, saveUser } from '@/services/session'
import type { User } from '@/types'

type AuthAction = { type: 'login'; user: User } | { type: 'logout' }

function authReducer(_state: User | null, action: AuthAction): User | null {
  switch (action.type) {
    case 'login':
      return action.user
    case 'logout':
      return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, dispatch] = useReducer(authReducer, null, getStoredUser)

  useEffect(() => {
    if (user) saveUser(user)
    else clearUser()
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
