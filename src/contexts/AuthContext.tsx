import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

interface User {
  user_id: string
  username: string
  role: 'student' | 'faculty' | 'administrator'
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string, mfaCode?: string) => Promise<{ success: boolean; mfaRequired?: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      authService.setToken(storedToken)
      loadUser(storedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  const loadUser = async (authToken: string) => {
    try {
      const userData = await authService.getCurrentUser()
      setUser(userData)
      setToken(authToken)
    } catch (error) {
      console.error('Failed to load user:', error)
      localStorage.removeItem('auth_token')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string, mfaCode?: string) => {
    try {
      const response = await authService.login(username, password, mfaCode)
      
      if (response.success && response.token) {
        localStorage.setItem('auth_token', response.token)
        authService.setToken(response.token)
        await loadUser(response.token)
        return { success: true }
      } else if (response.mfa_session_id) {
        return { success: false, mfaRequired: true }
      } else {
        return { success: false, error: response.message || 'Login failed' }
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      authService.setToken(null)
      setUser(null)
      setToken(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
