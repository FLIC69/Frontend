import React from 'react';
import { Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Leaf size={28} className="text-primary-500 mr-2" />
          <h1 className="text-xl font-bold text-primary-700">Crop Recommendation</h1>
        </div>
        
        {user.isAuthenticated && (
          <div className="flex items-center">
            <span className="mr-4 text-sm font-medium text-gray-700">
              Welcome, {user.username}
            </span>
            <Button 
              variant="secondary" 
              onClick={handleLogout}
              className="text-sm py-1.5"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;