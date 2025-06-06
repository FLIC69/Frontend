import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sprout, LogIn, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { pageTransition, staggerContainer, itemFade } from '../utils/animations'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      toast.error('Please enter both username and password')
      return
    }

    try {
      const success = await login(username, password)
      if (success) {
        navigate('/parameters')
      }
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-60px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 items-center"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className='bg-gray-50 w-1/2 p-10 rounded-lg shadow-md'>
        <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={itemFade} className="flex justify-center">
            <div className="bg-primary-500 p-3 rounded-full">
              <Sprout className="h-12 w-12 text-white" />
            </div>
          </motion.div>
          <motion.h2
            variants={itemFade}
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          >
            Welcome to Crop Recommendation System
          </motion.h2>
          <motion.p
            variants={itemFade}
            className="mt-2 text-center text-sm text-gray-600"
          >
            Sign in to access the crop recommendation system
          </motion.p>
        </motion.div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                id="username"
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoComplete="username"
              />

              <InputField
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />

              <div>
                <Button type="submit" variant="primary" fullWidth>
                  <div className="flex items-center justify-center">
                    <LogIn size={18} className="mr-2" />
                    Sign in
                  </div>
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">New here?</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="rounded-md shadow-sm">
                  <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    onClick={() => navigate('/register')}
                  >
                    <div className="flex items-center justify-center">
                      <User size={18} className="mr-2" />
                      Register
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Login
