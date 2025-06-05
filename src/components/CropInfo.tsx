import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Clock } from 'lucide-react';

interface CropInfoProps {
  crop: {
    id: string;
    name: string;
    description: string;
    growthDuration: number; // in days
    optimalTemperature: string;
  };
}

const CropInfo: React.FC<CropInfoProps> = ({ crop }) => {
  const infoCardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900">{crop.name}</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{crop.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div 
          custom={0} 
          variants={infoCardVariants}
          initial="initial"
          animate="animate"
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Growth Duration</h3>
          </div>
          <p className="text-gray-600">{crop.growthDuration} days to harvest</p>
        </motion.div>

        <motion.div 
          custom={1} 
          variants={infoCardVariants}
          initial="initial"
          animate="animate"
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center mb-3">
            <Thermometer className="h-5 w-5 text-orange-500 mr-2" />
            <h3 className="font-semibold text-gray-800">Optimal Temperature</h3>
          </div>
          <p className="text-gray-600">{crop.optimalTemperature}</p>
        </motion.div>

        
      </div>

    </div>
  );
};

export default CropInfo;