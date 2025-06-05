import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CropInfo from '../components/CropInfo';
import { pageTransition } from '../utils/animations';

// Sample crop data - in a real app, this would come from your backend
const sampleCrop = {
  id: "Ejemplo",
  name: "Ejemplo",
  description: "Lorem ipsum dolor sit amet consectetur adipiscing elit, velit vehicula etiam dictumst at fringilla, ridiculus in enim lacinia quisque mi. Mus nam lobortis luctus parturient pharetra scelerisque vitae eros, egestas libero neque tellus eget platea blandit, tincidunt facilisi taciti eu placerat faucibus semper.",
  growthDuration: 85,
  optimalTemperature: "65-85°F (18-29°C)",
};

const Crops: React.FC = () => {
  const navigate = useNavigate();
  const [crop, setCrop] = useState(sampleCrop);
  
  // fetch the crop data from backend
  useEffect(() => {
    // Simulate loading data from backend
    // fetch the crop from API
    const timer = setTimeout(() => {
      // Simulate the backend choosing a crop
      setCrop(sampleCrop);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  
  return (
    <motion.div
      className="py-8 px-4 max-w-6xl mx-auto"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Growth Simulation</h1>
            <p className="text-gray-600">
              Watch how your crop grows and learn about optimal growing conditions.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => navigate('/parameters')}
          >
            <div className="flex items-center">
              <ArrowLeft size={18} className="mr-1" />
              Back to Parameters
            </div>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-b from-blue-50 to-green-50 rounded-xl p-6 shadow-sm"
        >
          <div>
            Aquí va la animacion buenota
          </div>
        </motion.div>
        
        <CropInfo crop={crop} />
      </div>
    </motion.div>
  );
};

export default Crops;