import React from 'react';
import { Navigate } from "react-router-dom";

import AppLayout from '../AppLayout/AppLayout';

const ProtectedRoute = ({ loggedIn }) => {
  return loggedIn ? <AppLayout/> : <Navigate to='/sign-in' />;
};

export default ProtectedRoute;


