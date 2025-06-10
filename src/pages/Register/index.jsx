import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { User } from 'lucide-react'
import { useAuthContext } from '@/Providers'
import { pageTransition } from '@/utils/animation'
import { Button } from '@headlessui/react'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuthContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      toast.error('Por favor llena usuario y contraseña')
      return
    }
    setLoading(true)
    try {
      const success = await register(username, password)
      if (success) {
        setUsername(username)
        setPassword('')
      }
    } catch (err) {
      toast.error('There was an error registering your account. Please try again.')
    }
    setLoading(false)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-gray-100"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="relative w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg backdrop-blur-md"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="mb-4 text-center text-2xl font-semibold text-black">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">
              User
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white/50 px-3 py-2 text-black focus:ring-1 focus:ring-green-400 focus:outline-none"
              placeholder="Usuario"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white/50 px-3 py-2 text-black focus:ring-1 focus:ring-green-400 focus:outline-none"
              placeholder="Contraseña"
              autoComplete="current-password"
              required
            />
          </div>
          <Button
            type="submit"
            className="mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50 flex items-center justify-center"
            disabled={loading}
          >
            <User size={18} className="mr-2" />
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <div className="mt-6">
          <Button
            type="button"
            className="w-full rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 mt-1"
            onClick={() => navigate('/')}
          >
            Go back to Login
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Register