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
import ProtectedRoutes from './routes/ProtectedRoutes';
import { isUserLoggedIn } from './utilities/utils';


const ProtectedUserProfile = () => {
  const isLoggedIn = isUserLoggedIn();
  return isLoggedIn ? <UserProfilePage /> : <Navigate to="/login" />;
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={MainTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/userprofile" element={<ProtectedUserProfile />} />
          {/* Add more Routes here as needed */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);