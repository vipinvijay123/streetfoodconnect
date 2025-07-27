import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';

function AppContent() {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <LoginForm />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;