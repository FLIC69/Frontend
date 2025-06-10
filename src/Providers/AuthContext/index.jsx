'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

// Create context (start with dummy methods)
const AuthContext = createContext({
  user: {
    username: '',
    isAuthenticated: false,
  },
  login: async (username, password) => {},
  logout: () => {},
  register: async (username, password) => {},
})

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    isAuthenticated: false,
  })

  useEffect(() => {
    // On mount, check if user has a valid session
    const checkAuth = async () => {
      try {
        const resp = await fetch(`/users/me`, {
          method: 'GET',
          credentials: 'include',
        })
        if (resp.ok) {
          const data = await resp.json()
          setUser({
            username: data.user_id || '',
            isAuthenticated: true,
          })
          // Optionally, get username from resp.json() if returned
        } else {
          setUser({
            username: data.username || '',
            isAuthenticated: false,
          })
        }
      } catch (err) {
        setUser({
          username: data.username || '',
          isAuthenticated: false,
        })
      }
    }
    checkAuth()
  }, [])

  const register = async (username, password) => {
    try {
      const resp = await fetch(`/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // so any Set-Cookie from the server is stored
        body: JSON.stringify({ username, password }),
      })

      console.log('Registration response:', resp)

      if (resp.ok) {
        // assume the API returns { username: string, ... } on success
        const data = await resp.json()
        toast.success(`Registered as "${username}". You can now log in.`)
        // send them back to "/" which is presumably the login page
        setUser({ username: username, isAuthenticated: false }) // <- set logged in
        navigate('/')
        return true
      } else {
        // extract error message if present:
        let errMsg = 'Registration failed.'
        try {
          const errData = await resp.json()
          if (errData.detail) errMsg = errData.detail
        } catch {}
        toast.error(errMsg)
        return false
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error while registering.')
      return false
    }
  }

  const login = async (username, password) => {
    try {
      const resp = await fetch(`/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // let browser accept set-cookie
        body: JSON.stringify({ username, password }),
      })

      if (resp.ok) {
        const data = await resp.json()
        setUser({ username: data.username, isAuthenticated: true }) // <- set logged in
        toast.success(`Welcome back, ${data.username}!`)
        return true
      } else {
        let errMsg = 'Login failed.'
        try {
          const errData = await resp.json()
          if (errData.detail) errMsg = errData.detail
        } catch {}
        toast.error(errMsg)
        return false
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error while logging in.')
      return false
    }
  }

  const logout = async () => {
    //Add a simple fetch to the logout endpoint
    try {
      const resp = await fetch(`/users/logout`, {
        method: 'GET',
        credentials: 'include', // let browser accept set-cookie
      })
      console.log('Logout response:', resp)
      if (resp.ok) {
        setUser({ username: '', isAuthenticated: false }) // <- reset user state
        toast.success('You have been logged out.') // redirect to home or login page
        
      } else {
        toast.error('Logout failed. Please try again.')
      }
    } catch (err) {
      console.error(err)
      toast.error('Network error while logging out.')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useContext must be used within a AuthProvider')
  }
  return context
}
