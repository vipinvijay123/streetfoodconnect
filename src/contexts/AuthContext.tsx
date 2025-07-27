import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string, userType: 'vendor' | 'service_provider') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string, userType: 'vendor' | 'service_provider'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.type === userType);
    
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};