import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LoginPage from './components/LoginPage';
import ProfileSetup from './components/ProfileSetup';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import Layout from './components/Layout'; // header wrapper

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!user.name) {
    return <Navigate to="/setup-profile" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setup-profile" element={
          <ProfileSetup />
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <HomePage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/profile/:userId" element={
        <ProtectedRoute>
          <Layout>
            <ProfilePage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;
