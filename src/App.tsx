import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ParameterProvider } from './context/ParameterContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Parameters from './pages/Parameters';
import Crops from './pages/Crops';
import CropDetail from './pages/CropDetail';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user.isAuthenticated) {
    return <Navigate to="/\" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ParameterProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              
              <Route path="parameters" element={
                <ProtectedRoute>
                  <Parameters />
                </ProtectedRoute>
              } />
              
              <Route path="crops" element={
                <ProtectedRoute>
                  <Crops />
                </ProtectedRoute>
              } />
              
              <Route path="crop/:id" element={
                <ProtectedRoute>
                  <CropDetail />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/\" replace />} />
            </Route>
          </Routes>
        </ParameterProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;