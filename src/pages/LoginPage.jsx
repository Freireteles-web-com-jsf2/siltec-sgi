import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cosmic flex items-center justify-center p-4">
      <div className="w-full max-w-md card-glass rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">✝</span>
            <h1 className="text-2xl font-bold text-white">SANTUÁRIO DIGITAL</h1>
          </div>
          <p className="text-gray-300 mt-2">Sistema de Gestão Eclesiástica</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Usuários de teste:</p>
          <p className="text-xs mt-1">admin@siltec.com / líder@siltec.com / tesoureiro@siltec.com / membro@siltec.com</p>
        </div>
      </div>
    </div>
  );
}
