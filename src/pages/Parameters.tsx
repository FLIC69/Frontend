import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Droplets, Leaf, Thermometer } from 'lucide-react'
import { useParameters } from '../context/ParameterContext'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { pageTransition, staggerContainer, itemFade } from '../utils/animations'
import { ParameterValues } from '../types'

const Parameters: React.FC = () => {
  const { predict, parameters, updateParameters } = useParameters()
  const [localParams, setLocalParams] = useState<ParameterValues>({
    ...parameters,
  })
  const navigate = useNavigate()
  const [selectedModel, setSelectedModel] = useState('StandardModel')

  const handleInputChange = (name: keyof ParameterValues, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setLocalParams((prev) => ({
        ...prev,
        [name]: numValue,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await predict(selectedModel)
    updateParameters(localParams)
    navigate('/crops')
  }

  return (
    <motion.div
      className="py-8"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={itemFade}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Soil & Climate Parameters
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your soil and climate conditions for optimal crop
            recommendations.
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Leaf className="mr-2 text-primary-500" size={20} />
              Soil Nutrients
            </h2>
            <div className="space-y-4">
              <InputField
                id="nitrogen"
                type="number"
                label="Nitrogen (N) kg/ha"
                value={localParams.nitrogen.toString()}
                onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                placeholder="Enter nitrogen value"
                required
              />

              <InputField
                id="phosphorus"
                type="number"
                label="Phosphorus (P) kg/ha"
                value={localParams.phosphorus.toString()}
                onChange={(e) =>
                  handleInputChange('phosphorus', e.target.value)
                }
                placeholder="Enter phosphorus value"
                required
              />

              <InputField
                id="potassium"
                type="number"
                label="Potassium (K) kg/ha"
                value={localParams.potassium.toString()}
                onChange={(e) => handleInputChange('potassium', e.target.value)}
                placeholder="Enter potassium value"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Thermometer className="mr-2 text-accent-500" size={20} />
              Climate Conditions
            </h2>
            <div className="space-y-4">
              <InputField
                id="temperature"
                type="number"
                label="Temperature (°C)"
                value={localParams.temperature.toString()}
                onChange={(e) =>
                  handleInputChange('temperature', e.target.value)
                }
                placeholder="Enter temperature"
                required
              />

              <InputField
                id="humidity"
                type="number"
                label="Humidity (%)"
                value={localParams.humidity.toString()}
                onChange={(e) => handleInputChange('humidity', e.target.value)}
                placeholder="Enter humidity"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Droplets className="mr-2 text-accent-500" size={20} />
              Soil Properties
            </h2>

            <div className="space-y-4">
              <InputField
                id="ph"
                type="number"
                label="pH Level"
                value={localParams.ph.toString()}
                onChange={(e) => handleInputChange('ph', e.target.value)}
                placeholder="Enter pH"
                required
              />

              <InputField
                id="rainfall"
                type="number"
                label="Rainfall (mm)"
                value={localParams.rainfall.toString()}
                onChange={(e) => handleInputChange('rainfall', e.target.value)}
                placeholder="Enter rainfall"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Leaf className="mr-2 text-primary-500" size={20} />
              IA Model Selection
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modelo de IA
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="StandardModel">Standard Model</option>
                <option value="SimpleModel">Simple Model</option>
                <option value="DeepModel">Deep Model</option>
                <option value="SuperDeepModel">Super Deep Model</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" variant="primary">
              <div className="flex items-center">
                Continue to Crops
                <ChevronRight size={18} className="ml-1" />
              </div>
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default Parameters
