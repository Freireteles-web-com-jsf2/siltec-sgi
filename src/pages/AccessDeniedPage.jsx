import React from 'react';
import { Link } from 'react-router-dom';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8 text-center">
        <div className="mb-6">
          <span className="material-symbols-outlined text-6xl text-red-500">block</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Acesso Negado</h1>

        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página.
        </p>

        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Voltar ao Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}