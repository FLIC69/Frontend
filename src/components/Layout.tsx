import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { pageTransition } from '../utils/animations';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <motion.main 
        className="flex-grow"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="page-container">
          <Outlet />
        </div>
      </motion.main>
      <footer className="bg-secondary-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} AgroCrop | Smart Crop Recommendation System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;