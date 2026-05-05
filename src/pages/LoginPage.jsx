import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Siltec-SGI</h1>
          <p className="text-gray-600 mt-2">Santuário Digital</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Test users:</p>
          <p className="text-xs mt-1">admin@siltec.com / líder@siltec.com / tesoureiro@siltec.com / membro@siltec.com</p>
        </div>
      </div>
    </div>
  );
}
