// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you are using Redux

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('jwtToken')? true:false // Get auth status from Redux store

  return (
  isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
