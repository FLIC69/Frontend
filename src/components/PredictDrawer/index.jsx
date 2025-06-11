'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  Droplets,
  Sprout,
  Thermometer,
  Bot,
  X,
} from 'lucide-react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useParametersContext } from '@Providers/index'
import { Select, Input } from '@headlessui/react'
import { usePredictionsContext } from '@Providers/PredictionsContext'
import CropPredictionModal from '@components/CropPredictionModal'
import { toast } from 'react-toastify'

export default function PredictDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    predict,
    parameters,
    updateParameters,
    setPlayGrow,
    growFinished,
    setGrowFinished,
    playedRef,
    setPredictedCropP,
  } = useParametersContext()
  const {
    predictedCrop,
    setPredictedCrop,
    setShowPredictionModal,
    showPredictionModal,
  } = usePredictionsContext()
  const [localParams, setLocalParams] = useState({ ...parameters })
  const [selectedModel, setSelectedModel] = useState('StandardModel')

  // Handles BOTH input and slider, allows "" (empty) as well as numbers
  const handleInputChange = (name, value) => {
    setLocalParams((prev) => ({
      ...prev,
      [name]: value === '' ? '' : value,
    }))
  }

  // For all number inputs: allow empty, else number in valid range
  const getInputProps = (name, min, max, step = 1) => ({
    type: 'number',
    id: `slider-${name}`,
    className: 'w-12 rounded border px-2 py-1 text-xs',
    min,
    max,
    step,
    value: localParams[name],
    onChange: (e) => {
      const v = e.target.value
      if (
        v === '' ||
        (!isNaN(Number(v)) && Number(v) >= min && Number(v) <= max)
      ) {
        handleInputChange(name, v === '' ? '' : Number(v))
      }
    },
    inputMode: 'numeric',
    pattern: '[0-9]*',
    autoComplete: 'off',
  })

  // For all sliders: if value is "", treat as 0
  const getSliderValue = (name) =>
    localParams[name] === '' ? 0 : localParams[name]

  const handleSubmit = async (e) => {
    e.preventDefault()
    playedRef.current = false
    setPlayGrow(true)
    setGrowFinished(false) // Reset before animation starts
    // Clean input (this is great)
    const cleanParams = Object.fromEntries(
      Object.entries(localParams).map(([k, v]) => [k, v === '' ? 0 : v])
    )
    updateParameters(cleanParams)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!growFinished) return

    let cancelled = false

    toast.info('Predicting crop... This may take a few seconds.')

    const runPrediction = async () => {
      const predicted = await predict(selectedModel) // you might need to store selectedModel in state/context if it's not in scope
      if (!cancelled && predicted) {
        setPredictedCrop(predicted) // update modal
        setShowPredictionModal(true)
      }
    }
    runPrediction()

    return () => {
      cancelled = true
    }
  }, [growFinished])

  // Drawer animation variants
  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  }

  return (
    <>
      {/* Fixed Bot Button */}
      <button
        aria-label="Open Chat Drawer"
        className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <Bot size={28} />
      </button>

      {/* AnimatePresence + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="font-fira-sans fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-xl"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Drawer header with close button */}
            <div className="flex items-center justify-between border-b px-3 py-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Parameters
              </h2>
              <button
                aria-label="Close Drawer"
                className="p-1 text-gray-600 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer content: sliders and form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-4"
              style={{ maxHeight: 'calc(100% - 56px)' }}
            >
              {/* Soil Nutrients */}
              <section className="mb-4">
                <h3 className="text-md mb-2 flex items-center font-semibold text-gray-700">
                  <Sprout className="mr-2 text-green-500" size={20} /> Soil
                  Nutrients
                </h3>
                {/* N */}
                <div className="mb-4">
                  <label
                    htmlFor="slider-N"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Nitrogen (N) kg/ha:
                  </label>
                  <div className="flex items-center gap-2">
                    <Input {...getInputProps('N', 0, 145, 1)} />
                    <Slider
                      id="slider-N"
                      min={0}
                      max={145}
                      step={1}
                      value={getSliderValue('N')}
                      onChange={(val) => handleInputChange('N', val)}
                      trackStyle={{ backgroundColor: '#10B981' }}
                      handleStyle={{
                        borderColor: '#10B981',
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                </div>
                {/* P */}
                <div className="mb-4">
                  <label
                    htmlFor="slider-P"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Phosphorus (P) kg/ha:
                  </label>
                  <div className="flex items-center gap-2">
                    <Input {...getInputProps('P', 0, 150, 1)} />
                    <Slider
                      id="slider-P"
                      min={0}
                      max={150}
                      step={1}
                      value={getSliderValue('P')}
                      onChange={(val) => handleInputChange('P', val)}
                      trackStyle={{ backgroundColor: '#10B981' }}
                      handleStyle={{
                        borderColor: '#10B981',
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                </div>
                {/* K */}
                <div>
                  <label
                    htmlFor="slider-K"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Potassium (K) kg/ha:
                  </label>
                  <div className="flex items-center gap-2">
                    <Input {...getInputProps('K', 0, 210, 1)} />
                    <Slider
                      id="slider-K"
                      min={0}
                      max={210}
                      step={1}
                      value={getSliderValue('K')}
                      onChange={(val) => handleInputChange('K', val)}
                      trackStyle={{ backgroundColor: '#10B981' }}
                      handleStyle={{
                        borderColor: '#10B981',
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* Climate Conditions */}
              <section className="mb-4">
                <h3 className="text-md mb-2 flex items-center font-semibold text-gray-700">
                  <Thermometer className="mr-2 text-red-500" size={20} />{' '}
                  Climate Conditions
                </h3>
                {/* Temperature */}
                <div className="mb-4">
                  <label
                    htmlFor="slider-temperatura"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Temperature (°C):
                  </label>
                  <div className="flex items-center gap-2">
                    <Input {...getInputProps('temperatura', -10, 50, 0.5)} />
                    <Slider
                      id="slider-temperatura"
                      min={-10}
                      max={50}
                      step={0.5}
                      value={getSliderValue('temperatura')}
                      onChange={(val) => handleInputChange('temperatura', val)}
                      trackStyle={{ backgroundColor: '#3B82F6' }}
                      handleStyle={{
                        borderColor: '#3B82F6',
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                </div>
                {/* Humidity */}
                <div>
                  <label
                    htmlFor="slider-humidity"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Humidity (%):
                  </label>
                  <div className="flex items-center gap-2">
                    <Input {...getInputProps('humidity', 0, 100, 1)} />
                    <Slider
                      id="slider-humidity"
                      min={0}
                      max={100}
                      step={1}
                      value={getSliderValue('humidity')}
                      onChange={(val) => handleInputChange('humidity', val)}
                      trackStyle={{ backgroundColor: '#3B82F6' }}
                      handleStyle={{
                        borderColor: '#3B82F6',
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* Soil Properties */}
              <section className="mb-4">
                <h3 className="text-md mb-2 flex items-center font-semibold text-gray-700">
                  <Droplets className="mr-2 text-blue-500" size={20} /> Soil
                  Properties
                </h3>
                {/* pH */}
                <div className="mb-4">
                  <label
                    htmlFor="slider-ph"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    pH Level:
                  </label>
                  <div className="flex items-center gap-2">
                    <Input {...getInputProps('ph', 0, 14, 0.1)} />
                    <Slider
                      id="slider-ph"
                      min={0}
                      max={14}
                      step={0.1}
                      value={getSliderValue('ph')}
                      onChange={(val) => handleInputChange('ph', val)}
                      trackStyle={{ backgroundColor: '#F59E0B' }}
                      handleStyle={{
                        borderColor: '#F59E0B',
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                </div>
                {/* Rainfall */}
                <div>
                  <label
                    htmlFor="slider-rainfall"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Rainfall (mm):
                  </label>
                  <div className="flex items-center gap-2">
                    <Input {...getInputProps('rainfall', 0, 300, 1)} />
                    <Slider
                      id="slider-rainfall"
                      min={0}
                      max={300}
                      step={1}
                      value={getSliderValue('rainfall')}
                      onChange={(val) => handleInputChange('rainfall', val)}
                      trackStyle={{ backgroundColor: '#F59E0B' }}
                      handleStyle={{
                        borderColor: '#F59E0B',
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* Model Selection */}
              <section className="mb-6">
                <h3 className="text-md mb-2 flex items-center font-semibold text-gray-700">
                  <Bot className="mr-2 text-green-500" size={20} /> Model
                  Selection
                </h3>
                <Select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full rounded border border-gray-300 bg-white p-2 text-sm focus:ring-0"
                >
                  <option value="StandardModel">Standard Model</option>
                  <option value="SimpleModel">Simple Model</option>
                  <option value="DeepModel">Deep Model</option>
                  <option value="SuperDeepModel">Super Deep Model</option>
                </Select>
              </section>

              {/* Submit button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Predict!
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <CropPredictionModal
        open={showPredictionModal}
        cropId={predictedCrop}
        onClose={() => setShowPredictionModal(false)}
      />
    </>
  )
}
