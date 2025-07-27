import React, { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <AuthForm 
      mode={mode} 
      onToggleMode={() => setMode(mode === 'login' ? 'signup' : 'login')} 
    />
  );
}