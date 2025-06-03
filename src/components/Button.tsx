import React from 'react';
import { motion } from 'framer-motion';
import { buttonHover } from '../utils/animations';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  onClick, 
  disabled = false,
  fullWidth = false
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      variants={buttonHover}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.button>
  );
};

export default Button;