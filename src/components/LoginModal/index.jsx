'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthContext } from '@/Providers'
import { Button } from '@headlessui/react'
import { useNavigate } from 'react-router'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

const LoginModal = () => {
  const { login, user } = useAuthContext()
  const [username, setUsername] = useState(user.username || '')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Logging in with:', { username, password })
    await login(username, password) // <- pass values!
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm font-fira-sans"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="relative w-11/12 max-w-md rounded-lg bg-white/20 p-6 shadow-lg backdrop-blur-md"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="mb-4 text-center text-3xl font-semibold text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              User
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white/50 px-3 py-2 text-black focus:ring-1 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 bg-white/50 px-3 py-2 text-black focus:ring-1 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
          >
            Enter
          </button>
        </form>
        <div className="mt-2">
          <Button
            type="button"
            className="mt-1 w-full rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            onClick={() => navigate('register')}
          >
            Register
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LoginModal
