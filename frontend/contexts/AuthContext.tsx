'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { AuthService, User } from '@/lib/api'
import { toast } from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'developer' | 'recruiter'
  }) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  refreshUser: () => Promise<void>
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
        
        // Verify token is still valid
        AuthService.getCurrentUser().then(response => {
          if (!response.success) {
            // Token invalid, clear auth
            logout()
          }
        })
      } catch (error) {
        // Invalid saved data, clear it
        Cookies.remove('auth-token')
        Cookies.remove('user-data')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await AuthService.login({ email, password })
      
      if (response.success && response.data) {
        const { user: userData, token: newToken } = response.data
        setToken(newToken)
        setUser(userData)
        
        // Save to cookies
        Cookies.set('auth-token', newToken, { expires: 7 }) // 7 days
        Cookies.set('user-data', JSON.stringify(userData), { expires: 7 })
        
        toast.success('Login successful!')
        return true
      } else {
        toast.error(response.error || 'Login failed')
        return false
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'developer' | 'recruiter'
  }): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await AuthService.register(userData)
      
      if (response.success && response.data) {
        const { user: newUser, token: newToken } = response.data
        setToken(newToken)
        setUser(newUser)
        
        // Save to cookies
        Cookies.set('auth-token', newToken, { expires: 7 })
        Cookies.set('user-data', JSON.stringify(newUser), { expires: 7 })
        
        toast.success('Registration successful!')
        return true
      } else {
        toast.error(response.error || 'Registration failed')
        return false
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      // Ignore logout API errors
    }
    
    setToken(null)
    setUser(null)
    
    // Clear cookies
    Cookies.remove('auth-token')
    Cookies.remove('user-data')
    
    toast.success('Logged out successfully')
    router.push('/')
  }

  const refreshUser = async () => {
    try {
      const response = await AuthService.getCurrentUser()
      if (response.success && response.data) {
        setUser(response.data)
        Cookies.set('user-data', JSON.stringify(response.data), { expires: 7 })
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error)
    }
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user,
    isLoading,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}