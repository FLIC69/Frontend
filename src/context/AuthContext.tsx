// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User } from '../types'; // Define ENV or import it if available

interface AuthContextType {
  user: User;
  register: (username: string, password: string) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    username: '',
    isAuthenticated: false,
  });
  const navigate = useNavigate();

  /**
   * register():
   *   - POSTs to /users/register
   *   - on 200, toasts success and navigates back to "/"
   *   - on error, toasts error and returns false
   */
  const register = async (username: string, password: string): Promise<boolean> => {
    try {
      const resp = await fetch(`/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // so any Set-Cookie from the server is stored
        body: JSON.stringify({ username, password }),
      });

      console.log('Registration response:', resp);

      if (resp.ok) {
        // assume the API returns { username: string, ... } on success
        const data = await resp.json();
        toast.success(`Registered as "${data.username}". You can now log in.`);
        // send them back to "/" which is presumably the login page
        navigate('/');
        return true;
      } else {
        // extract error message if present:
        let errMsg = 'Registration failed.';
        try {
          const errData = await resp.json();
          if (errData.detail) errMsg = errData.detail;
        } catch {}
        toast.error(errMsg);
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error while registering.');
      return false;
    }
  };

  /**
   * login():
   *   - POSTs to /users/login
   *   - on 200, sets user state to isAuthenticated=true
   *   - toasts success or error
   *   - navigates to "/dashboard" (adjust as needed)
   */
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const resp = await fetch(`/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ensures the cookie your API sets is accepted by browser
        body: JSON.stringify({ username, password }),
      });

      if (resp.ok) {
        const data = await resp.json();
        // Example successful shape:
        // {
        //   access_token: "...",
        //   token_type: "bearer",
        //   user_id: 4,
        //   username: "luis"
        // }
        setUser({
          username: data.username,
          isAuthenticated: true,
        });
        toast.success(`Welcome back, ${data.username}!`);
        // Once logged in, navigate to a protected route (e.g. "/dashboard").
        navigate('/dashboard');
        return true;
      } else {
        // If 401 or 400, extract the message from response
        let errMsg = 'Login failed.';
        try {
          const errData = await resp.json();
          if (errData.detail) errMsg = errData.detail;
        } catch {}
        toast.error(errMsg);
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error while logging in.');
      return false;
    }
  };

  /**
   * logout():
   *   - simply clears local user state
   *   - if your backend has a /logout route that clears the cookie, call it here
   */
  const logout = () => {
    // If your API has a logout endpoint that unsets the cookie, you could:
    // await fetch('https://172.28.69.143/users/logout', { method: 'POST', credentials: 'include' });
    setUser({ username: '', isAuthenticated: false });
    toast.info('You have logged out.');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
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