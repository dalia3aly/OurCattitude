import React from "react";
import { Navigate, Route } from "react-router-dom";
import { isUserLoggedIn } from '../utilities/utils';

const ProtectedRoutes = ({ ...props }) => {
  const isLoggedIn = isUserLoggedIn();
  return isLoggedIn ? <Route {...props} /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
