import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { isUserLoggedIn } from '../utilities/utils';
import { useAuth } from '../context/AuthContext';

const ProtectedRoutes = ({ ...props }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Route {...props} /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
