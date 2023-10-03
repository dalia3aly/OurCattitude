import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MainTheme from './themes/MainTheme';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LogInPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate } from "react-router-dom";
import CatProfilePage from './pages/CatProfilePage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import AccountPage from './pages/AccountPage.jsx';


const ProtectedUserProfile = () => {
  const { isAuthenticated } = useAuth();  // Using AuthContext here
  return isAuthenticated ? <UserProfilePage /> : <Navigate to="/login" />;
};

const ProtectedAccount = () => {
  const { isAuthenticated } = useAuth();  // Using AuthContext here
  return isAuthenticated ? <AccountPage /> : <Navigate to="/login" />;
};


const ProtectedCatProfile = () => {
  const { isAuthenticated } = useAuth();  // Using AuthContext here
  return isAuthenticated ? <CatProfilePage /> : <Navigate to="/login" />;
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={MainTheme}>
      
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/userprofile" element={<ProtectedUserProfile />} />
            <Route path="/cat/:catID" element={<ProtectedCatProfile />} />
            <Route path="/user/:userID" element={<ProtectedAccount />} />
            {/* Add more Routes here as needed */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
