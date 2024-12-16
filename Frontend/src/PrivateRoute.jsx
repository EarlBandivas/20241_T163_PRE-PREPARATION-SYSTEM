import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// This component checks if the user is logged in. If not, it redirects to the login page
const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  // If no token, redirect to the login page
  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
