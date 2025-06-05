import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import { User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { pageTransition } from '../utils/animations'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      toast.error('Please enter both username and password')
      return
    }

    try {
      await register(username, password)
    } catch (err) {
      console.error('An error occurred during registration')
    }
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-125px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
                  <User size={18} className="mr-2" />
                  Register
                </div>
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm"></div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="rounded-md shadow-sm">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => navigate('/')}
                >
                  <div className="flex items-center justify-center">
                    Go back
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Register
