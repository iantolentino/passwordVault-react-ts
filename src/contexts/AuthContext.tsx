import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLocked: boolean;
  login: (masterPassword: string, otp?: string) => Promise<boolean>;
  verifyPin: (pin: string) => Promise<boolean>;
  lock: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  const login = useCallback(async (masterPassword: string, otp?: string): Promise<boolean> => {
    if (masterPassword && masterPassword.trim() !== '') {
      if (otp && otp !== '123456') {
        return false;
      }
      
      setIsAuthenticated(true);
      setIsLocked(false);
      return true;
    }
    
    return false;
  }, []);

  const verifyPin = useCallback(async (pin: string): Promise<boolean> => {
    if (pin === '123456') {
      setIsLocked(false);
      return true;
    }
    
    return false;
  }, []);

  const lock = useCallback(() => {
    setIsLocked(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsLocked(true);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLocked,
      login,
      verifyPin,
      lock,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};