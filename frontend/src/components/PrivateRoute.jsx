import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthorizationContext from '../contexts/AuthorizationContext';

const PrivateRoute = ({ children }) => {
  const { authorizationData } = useContext(AuthorizationContext);
  const location = useLocation();

  return (
    authorizationData.token ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
