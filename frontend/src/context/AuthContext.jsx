import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    isAuthenticated,
    login: (token) => {
        localStorage.setItem('userToken', token);
        setIsAuthenticated(true);
        console.log("Logged in.");  // Debugging line
      },
      logout: () => {
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
        console.log("Logged out.");  // Debugging line
      }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
