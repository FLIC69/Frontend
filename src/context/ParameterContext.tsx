import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ParameterValues, Crop } from '../types';

interface ParameterContextType {
  parameters: ParameterValues;
  selectedCrop: Crop | null;
  updateParameters: (values: ParameterValues) => void;
  selectCrop: (crop: Crop) => void;
  resetSelections: () => void;
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

  return (
    <ParameterContext.Provider value={{ 
      parameters, 
      selectedCrop, 
      updateParameters, 
      selectCrop, 
      resetSelections 
    }}>
      {children}
    </ParameterContext.Provider>
  );
};

export const useParameters = (): ParameterContextType => {
  const context = useContext(ParameterContext);
  
  if (context === undefined) {
    throw new Error('useParameters must be used within a ParameterProvider');
  }
  
  return context;
};