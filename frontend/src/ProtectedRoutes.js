// src/ProtectedRoutes.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import HomePage from './components/HomePage';

const ProtectedRoutes = () => {
  const { user } = useAuth();
 
  return (
    <Routes>
      <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default ProtectedRoutes;
