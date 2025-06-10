'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

const PredictionsContext = createContext()

export function PredictionsProvider({ children }) {
  const [predictedCrop, setPredictedCrop] = useState(null)
  const [showPredictionModal, setShowPredictionModal] = useState(false)
  return (
    <PredictionsContext.Provider value={{predictedCrop, setPredictedCrop, showPredictionModal, setShowPredictionModal}}>
      {children}
    </PredictionsContext.Provider>
  )
}

export function usePredictionsContext() {
  const context = useContext(PredictionsContext)
  if (!context) {
    throw new Error('useContext must be used within a AuthProvider')
  }
  return context
}
