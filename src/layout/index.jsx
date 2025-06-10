import React from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '../components'

const Layout = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
