import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dashboard } from '@/components/Dashboard';
import { AuthPage } from '@/pages/AuthPage';

const Index = () => {
  const { user } = useAuth();

  // Show dashboard if user is logged in, otherwise show auth page
  return user ? <Dashboard /> : <AuthPage />;
};

export default Index;
