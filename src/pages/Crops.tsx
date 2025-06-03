import React from 'react';
import { motion } from 'framer-motion';
import { Grid, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useParameters } from '../context/ParameterContext';
import CropCard from '../components/CropCard';
import Button from '../components/Button';
import { crops } from '../data/crops';
import { pageTransition, staggerContainer } from '../utils/animations';

const Crops: React.FC = () => {
  const { selectCrop } = useParameters();
  const navigate = useNavigate();

  const handleCropSelect = (crop: typeof crops[0]) => {
    selectCrop(crop);
    navigate(`/crop/${crop.id}`);
  };

  return (
    <motion.div
      className="py-8"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Select a Crop</h1>
            <p className="text-gray-600">
              Choose a crop to see how it would grow with your specified parameters.
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

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {crops.map((crop) => (
          <CropCard
            key={crop.id}
            crop={crop}
            onClick={handleCropSelect}
          />
        ))}
      </motion.div>

      {crops.length === 0 && (
        <div className="text-center py-12">
          <Grid className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No crops available</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your parameters to see crop recommendations.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Crops;