import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(localStorage.getItem('userID') || null);

  const value = {
    isAuthenticated,
    userID,
    login: (token, id) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userID', id);
        setIsAuthenticated(true);
        setUserID(id);
        console.log("Logged in.");  // Debugging line
      },
      logout: () => {
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
        setUserID(null);
        console.log("Logged out.");  // Debugging line
      }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
