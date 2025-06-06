import React from 'react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { pageTransition } from '../utils/animations'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        className="flex-grow"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Outlet />
      </motion.main>
    </div>
  )
}

export default Layout
