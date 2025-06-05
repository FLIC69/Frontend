import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ParameterProvider } from './context/ParameterContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Parameters from './pages/Parameters'
import Crops from './pages/Crops'
import CropDetail from './pages/CropDetail'
import Register from './pages/Register'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth()

  if (!user.isAuthenticated) {
    return <Navigate to="/\" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ParameterProvider>
          <ToastContainer
            stacked
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Protected Routes */}

              <Route
                path="parameters"
                element={
                  <ProtectedRoute>
                    <Parameters />
                  </ProtectedRoute>
                }
              />

              <Route
                path="crops"
                element={
                  <ProtectedRoute>
                    <Crops />
                  </ProtectedRoute>
                }
              />

              <Route
                path="crop/:id"
                element={
                  <ProtectedRoute>
                    <CropDetail />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/\" replace />} />
            </Route>
          </Routes>
        </ParameterProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
