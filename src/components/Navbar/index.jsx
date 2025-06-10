import { Sprout, LogOut } from 'lucide-react'
import React from 'react'
import { useAuthContext } from '@/Providers'
// import { Button } from '@headlessui/react'
// import { Navigate } from 'react-router'

const Navbar = () => {
  const { user, logout } = useAuthContext()

  const handleLogout = () => {
    logout()
  }
  return (
    <div className="font-fira-sans fixed z-10 flex w-full justify-between px-4 py-2 items-center">
      <div className="flex items-center">
        <Sprout size={28} className="mr-2 text-green-500" />
        <h1 className="text-xl font-bold text-green-700">
          Crop Recommendation
        </h1>
      </div>

      {user.isAuthenticated && (
        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium text-gray-700">
            Welcome, {user.username}
          </span>
          {/* <Button onClick={handleLogout} className="py-1.5 text-sm">
            Logout
          </Button> */}
          <div className='p-1.5 bg-green-100 rounded-full shadow-md'>
            <LogOut
              size={18}
              className="cursor-pointer text-gray-700 hover:text-red-500"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
