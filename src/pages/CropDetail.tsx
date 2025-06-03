import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useParameters } from '../context/ParameterContext';
import { crops } from '../data/crops';
import SeedAnimation from '../components/SeedAnimation';
import Button from '../components/Button';
import { pageTransition } from '../utils/animations';

const CropDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedCrop, selectCrop } = useParameters();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && (!selectedCrop || selectedCrop.id !== id)) {
      const crop = crops.find(c => c.id === id);
      if (crop) {
        selectCrop(crop);
      } else {
        navigate('/crops');
      }
    }
  }, [id, selectedCrop, selectCrop, navigate]);

  if (!selectedCrop) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <motion.div
      className="py-8"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{selectedCrop.name}</h1>
          <Button
            variant="secondary"
            onClick={() => navigate('/crops')}
          >
            <div className="flex items-center">
              <ArrowLeft size={18} className="mr-1" />
              Back to Crops
            </div>
          </Button>
        </div>

        <SeedAnimation crop={selectedCrop} />
      </div>
    </motion.div>
  );
};

export default CropDetail;