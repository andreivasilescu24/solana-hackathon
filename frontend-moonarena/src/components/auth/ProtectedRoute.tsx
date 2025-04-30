import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  authenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ authenticated }) => {
  if (!authenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;