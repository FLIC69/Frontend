import React from 'react';
import { motion } from 'framer-motion';

interface CropAnimationProps {
  cropName: string;
  growthStage: number; // 0-100 percentage of growth
  imageUrl: string;
}

const CropAnimation: React.FC<CropAnimationProps> = ({ cropName, growthStage, imageUrl }) => {
  // Animation variants for the plant growth
  const plantVariants = {
    initial: { 
      scale: 0.2, 
      opacity: 0.5,
      y: 50 
    },
    grow: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 3,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for the leaves
  const leavesVariants = {
    initial: { 
      rotate: -5,
      scale: 0.9
    },
    sway: {
      rotate: 5,
      scale: 1.05,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  // Animation variants for soil
  const soilVariants = {
    initial: {
      opacity: 0.7,
      y: 10
    },
    settle: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative h-80 md:h-96 w-full max-w-md mx-auto">
      {/* Soil container */}
      <motion.div 
        className="absolute bottom-0 w-full h-20 bg-amber-800 rounded-b-xl rounded-t-3xl"
        variants={soilVariants}
        initial="initial"
        animate="settle"
      />
      
      {/* Plant container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          variants={plantVariants}
          initial="initial"
          animate="grow"
        >
          {/* Use the image if provided, otherwise use a generic plant representation */}
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={cropName} 
              className="h-64 md:h-80 object-contain" 
            />
          ) : (
            <motion.div 
              className="relative"
              variants={leavesVariants}
              initial="initial"
              animate="sway"
            >
              {/* Stem */}
              <div className="w-4 h-56 md:h-72 bg-green-600 mx-auto rounded-full" />
              
              {/* Leaves */}
              <div className="absolute top-10 left-0 w-20 h-12 bg-green-500 rounded-full -rotate-45 transform -translate-x-12" />
              <div className="absolute top-20 right-0 w-20 h-12 bg-green-500 rounded-full rotate-45 transform translate-x-12" />
              <div className="absolute top-30 left-0 w-24 h-14 bg-green-500 rounded-full -rotate-45 transform -translate-x-14" />
              <div className="absolute top-40 right-0 w-24 h-14 bg-green-500 rounded-full rotate-45 transform translate-x-14" />
              
              {/* Flower/fruit */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Growth indicator */}
      <div className="absolute bottom-24 left-4 right-4">
        <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
          <motion.div 
            className="bg-green-500 h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${growthStage}%` }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-600">
          <span>Seed</span>
          <span>Seedling</span>
          <span>Mature</span>
          <span>Harvest</span>
        </div>
      </div>
    </div>
  );
};

export default CropAnimation;