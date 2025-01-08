import { Navigate, useLocation } from "react-router-dom";
import React from "react";

function ProtectedRoute({ children }) {
  const location = useLocation();
  
  // 1. Load the authenticated user
  const token = localStorage.getItem('accessToken');
  if (!token) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (token) return children
};
export default ProtectedRoute;
