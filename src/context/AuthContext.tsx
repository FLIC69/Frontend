import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    username: '',
    isAuthenticated: false
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    // This is a mock authentication. In a real app, you would call an API.
    if (username && password) {
      setUser({
        username,
        isAuthenticated: true
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser({
      username: '',
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};