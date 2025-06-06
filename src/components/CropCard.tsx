import React from 'react';
import { motion } from 'framer-motion';
import { Crop } from '../types';
import { itemFade } from '../utils/animations';

interface CropCardProps {
  crop: Crop;
  onClick: (crop: Crop) => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onClick }) => {
  return (
    <motion.div 
      className="card cursor-pointer h-full flex flex-col"
      variants={itemFade}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => onClick(crop)}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={crop.image} 
          alt={crop.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{crop.name}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{crop.description}</p>
      </div>
    </motion.div>
  );
};

export default CropCard;