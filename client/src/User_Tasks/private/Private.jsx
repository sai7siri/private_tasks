import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ redirectPath }) => {
  const user = useSelector((state) => state.auth.user);

  
  if (!user) {
    return  <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};
const PublicRoute = ({ redirectPath }) => {
  const user = useSelector((state) => state.auth.user);


  if (user) {
    return <Navigate to={redirectPath} replace />;
  }
  // If the user is not authenticated, render the nested routes
  return <Outlet />;
};

export { PrivateRoute, PublicRoute };
