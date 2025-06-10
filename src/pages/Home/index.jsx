'use client'

import React from 'react'
import { MainCanvas, PredictDrawer } from '@/components'
import { useAuthContext } from '@/Providers'
import LoginModal from '@/components/LoginModal'
import { AnimatePresence } from 'framer-motion'

const HomeContent = () => {
  const { user } = useAuthContext()

  return (
    <>
      {/* 1) Always render the 3D canvas in the background */}
      <MainCanvas />

      <PredictDrawer />

      {/* 2) If not authenticated, show the modal on top */}
      <AnimatePresence>
        {!user.isAuthenticated && <LoginModal />}
      </AnimatePresence>
    </>
  )
}

const Home = () => {
  return <HomeContent />
}

export default Home
