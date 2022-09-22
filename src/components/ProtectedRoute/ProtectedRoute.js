import React from 'react';
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  return loggedIn ? <Outlet/> : <Navigate to='/sign-in' />;
};

export default ProtectedRoute;