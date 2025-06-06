import React from 'react';
import { motion } from 'framer-motion';
import { Crop } from '../types';
import { getCropAnimation } from '../utils/animations';

interface SeedAnimationProps {
  crop: Crop;
}

const SeedAnimation: React.FC<SeedAnimationProps> = ({ crop }) => {
  const getColor = (cropId: string): string => {
    const colors: { [key: string]: string } = {
      // Grains
      rice: 'bg-amber-500',
      maize: 'bg-yellow-500',
      // Legumes
      chickpea: 'bg-orange-300',
      kidneybeans: 'bg-red-700',
      pigeonpeas: 'bg-yellow-600',
      mothbeans: 'bg-amber-600',
      mungbean: 'bg-green-600',
      blackgram: 'bg-gray-800',
      lentil: 'bg-orange-600',
      // Fruits
      pomegranate: 'bg-red-500',
      banana: 'bg-yellow-400',
      mango: 'bg-yellow-500',
      grapes: 'bg-purple-600',
      watermelon: 'bg-green-500',
      muskmelon: 'bg-orange-400',
      apple: 'bg-red-600',
      orange: 'bg-orange-500',
      papaya: 'bg-orange-400',
      coconut: 'bg-brown-500',
      // Others
      cotton: 'bg-gray-100',
      jute: 'bg-yellow-700',
      coffee: 'bg-brown-700',
    };
    return colors[cropId] || 'bg-green-500';
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-secondary-100 to-secondary-200 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-leaf-pattern opacity-10"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="relative"
          variants={getCropAnimation(crop.id)}
          initial="initial"
          animate="animate"
        >
          {/* Seed */}
          <div className={`w-8 h-8 rounded-full ${getColor(crop.id)} mx-auto mb-2`}></div>
          
          {/* Stem */}
          <div className="w-1 h-32 bg-primary-500 mx-auto"></div>
          
          {/* Leaves */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-8 rounded-full bg-primary-300 transform -rotate-45 origin-left"></div>
            <div className="w-16 h-8 rounded-full bg-primary-300 transform rotate-45 origin-right mt-4"></div>
          </div>
          
          {/* Top */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className={`w-20 h-20 rounded-full ${getColor(crop.id)} opacity-80`}></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeedAnimation;