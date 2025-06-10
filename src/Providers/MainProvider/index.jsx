import React from 'react'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../AuthContext'
import { PredictionsProvider } from '@Providers/PredictionsContext'
import { ParametersProvider } from '..'

const MainProvider = ({ children }) => {
  return (
    <>
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
      <AuthProvider>
        <ParametersProvider>
          <PredictionsProvider>{children}</PredictionsProvider>
        </ParametersProvider>
      </AuthProvider>
    </>
  )
}

export default MainProvider
