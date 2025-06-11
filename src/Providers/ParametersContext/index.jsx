'use client'

import React, {
  createContext,
  useContext,
  useState,
  useRef,
} from 'react'
import { toast } from 'react-toastify'

const ParametersContext = createContext()

const defaultParameters = {
  N: 10,
  P: 2,
  K: 30,
  temperatura: 20,
  humidity: 15,
  ph: 7,
  rainfall: 100,
}

export function ParametersProvider({ children }) {
  const [parameters, setParameters] = useState(defaultParameters)
  const [predictedCropP, setPredictedCropP] = useState(null)
  const [playGrow, setPlayGrow] = useState(false)
  const [growFinished, setGrowFinished] = useState(false)
  const [resetPlayGrow, setResetPlayGrow] = useState(false)
  const playedRef = useRef(false)

  const updateParameters = (newParameters) => {
    setParameters((prev) => ({ ...prev, ...newParameters }))
  }

  const updatePredictedCrop = (crop) => {
    setPredictedCropP(crop)
  }

  const resetParameters = () => {
    setParameters(defaultParameters)
    setPredictedCropP(null)
  }

  // 🧠 This is the important part: The predict function!
  const predict = async (model = "StandardModel") => {
    // Remap param names to backend expectations:
    const features = [
      parameters.N,            // nitrogen
      parameters.P,            // phosphorus
      parameters.K,            // potassium
      parameters.temperatura,  // temperature
      parameters.humidity,     // humidity
      parameters.ph,           // ph
      parameters.rainfall      // rainfall
    ]
    // console.log('Predicting with features:', features)
    // console.log('Using model:', model)
    try {
      const resp = await fetch('https://ai-api-red-night-3839.fly.dev/ai/predict', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features, model }),
      })
      if (resp.ok) {
        const data = await resp.json()
        // API shape: { prediction: { predicted_class: 'rice', ... } }
        setPredictedCropP(data.prediction.predicted_class)
        // toast.success(`Prediction: ${data.prediction.predicted_class}`)
        return data.prediction.predicted_class
      } else if (resp.status === 401) {
        toast.error('You must be logged in to make predictions.')
        return null
      } else {
        const txt = await resp.text()
        toast.error(`Prediction failed: ${resp.status} - ${txt}`)
        return null
      }
    } catch (err) {
      console.error('Prediction error:', err)
      toast.error('Network error during prediction')
      return null
    }
  }

  return (
    <ParametersContext.Provider
      value={{
        parameters,
        predictedCropP,
        resetPlayGrow,
        growFinished,
        playedRef,
        setGrowFinished,
        setResetPlayGrow,
        updateParameters,
        updatePredictedCrop,
        resetParameters,
        playGrow,
        setPlayGrow,
        predict, // <--- Add to context!
      }}
    >
      {children}
    </ParametersContext.Provider>
  )
}

export function useParametersContext() {
  const context = useContext(ParametersContext)
  if (!context) {
    throw new Error('useParametersContext must be used within a ParametersProvider')
  }
  return context
}