import React from 'react';
import { Link } from 'react-router-dom';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-cosmic flex items-center justify-center p-4">
      <div className="w-full max-w-md card-glass rounded-2xl p-8 text-center">
        <div className="mb-6">
          <span className="material-symbols-outlined text-6xl text-red-400">block</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">Acesso Negado</h1>

        <p className="text-gray-400 mb-6">
          Você não tem permissão para acessar esta página.
        </p>

        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-medium py-2 px-4 rounded-lg transition-all"
          >
            Voltar ao Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="block w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-all"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}