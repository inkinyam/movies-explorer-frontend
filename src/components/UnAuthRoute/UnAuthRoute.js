import React from 'react';
import { Navigate } from "react-router-dom";

const UnAuthRoute = ({ loggedIn, children }) => {
  if (loggedIn) return <Navigate to="/movies" />;
    return children;
  };

export default UnAuthRoute;


