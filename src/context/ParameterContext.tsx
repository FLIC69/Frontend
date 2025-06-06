import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ParameterValues, Crop } from '../types';
import { toast } from 'react-toastify';

interface ParameterContextType {
  parameters: ParameterValues;
  selectedCrop: Crop | null;
  updateParameters: (values: ParameterValues) => void;
  selectCrop: (crop: Crop) => void;
  resetSelections: () => void;
  predict: (model: string) => Promise<any | null>;
}

const defaultParameters: ParameterValues = {
  nitrogen: 50,
  phosphorus: 50,
  potassium: 50,
  temperature: 25,
  humidity: 50,
  ph: 7,
  rainfall: 100
};

const ParameterContext = createContext<ParameterContextType | undefined>(undefined);

export const ParameterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [parameters, setParameters] = useState<ParameterValues>(defaultParameters);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const updateParameters = (values: ParameterValues) => {
    setParameters(values);
  };

  const selectCrop = (crop: Crop) => {
    setSelectedCrop(crop);
  };

  const resetSelections = () => {
    setParameters(defaultParameters);
    setSelectedCrop(null);
  };

  /**
   * Build a 7-element features array in the exact order your API expects:
   * [nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall]
   * Then POST to '/api/ai/predict' and log the response.
   */
  const predict = async (model: string): Promise<any | null> => {
    // 1. Construct the features array:
    const features = [
      parameters.nitrogen,
      parameters.phosphorus,
      parameters.potassium,
      parameters.temperature,
      parameters.humidity,
      parameters.ph,
      parameters.rainfall,
    ];

    try {
      const resp = await fetch(`https://172.28.69.143/ai/predict`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features, model }),
      });

      if (resp.status === 200) {
        const data = await resp.json();
        toast.success(`Prediction: ${data.prediction.predicted_class}`);
        setSelectedCrop(data.prediction.predicted_class);
        return data;
      } else if (resp.status === 401) {
        console.error('Unauthorized: no valid JWT cookie present.');
        toast.error('You must be logged in to make predictions.');
        return null;
      } else {
        console.error(`Error ${resp.status}:`, await resp.text());
        toast.error(`Prediction failed: ${resp.statusText}`);
        return null;
      }
    } catch (err) {
      console.error('Network or fetch error:', err);
      return null;
    }
  };

  return (
    <ParameterContext.Provider
      value={{
        parameters,
        selectedCrop,
        updateParameters,
        selectCrop,
        resetSelections,
        predict,
      }}
    >
      {children}
    </ParameterContext.Provider>
  );
};

export const useParameters = (): ParameterContextType => {
  const context = useContext(ParameterContext);
  if (!context) {
    throw new Error('useParameters must be used within a ParameterProvider');
  }
  return context;
};