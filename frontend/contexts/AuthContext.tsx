'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'developer' | 'recruiter' | 'admin'
  subscriptionTier: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = Cookies.get('auth-token')
    const savedUser = Cookies.get('user-data')

    if (savedToken && savedUser) {
      try {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      } catch (error) {
        // Invalid saved data, clear it
        Cookies.remove('auth-token')
        Cookies.remove('user-data')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = (newToken: string, userData: User) => {
    setToken(newToken)
    setUser(userData)
    
    // Save to cookies
    Cookies.set('auth-token', newToken, { expires: 7 }) // 7 days
    Cookies.set('user-data', JSON.stringify(userData), { expires: 7 })
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    
    // Clear cookies
    Cookies.remove('auth-token')
    Cookies.remove('user-data')
    
    router.push('/')
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}