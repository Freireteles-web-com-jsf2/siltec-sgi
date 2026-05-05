import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateResetToken } from '../../utils/auth';

export default function RecoveryForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);

    if (!email) {
      setError('Por favor, informe seu e-mail.');
      return;
    }

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const result = generateResetToken(email);

      if (result.success) {
        // MVP: Show token on screen (per D-08, simulation)
        setSuccess({
          message: `E-mail enviado para ${result.email}`,
          debugToken: result.token // Only for MVP testing
        });
      } else {
        setError(result.error);
      }

      setLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success && (
        <>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-200">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-purple-400 focus:outline-none text-white placeholder-gray-400"
              placeholder="seu@email.com"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar link de recuperação'}
          </button>
        </>
      )}

      {success && (
        <div className="text-center space-y-4">
          <div className="text-green-400 text-sm font-medium py-2">
            {success.message}
          </div>

          {/* MVP Simulation: Show token for testing (per D-08) */}
          <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4 text-left">
            <p className="text-xs text-yellow-400 font-medium mb-2">
              [Simulação MVP] Use este token para testar:
            </p>
            <code className="text-xs break-all text-yellow-300 bg-yellow-900 px-2 py-1 rounded">
              {success.debugToken}
            </code>
            <p className="text-xs text-yellow-500 mt-2">
              URL: /reset-password?token={success.debugToken}
            </p>
          </div>
        </div>
      )}

      <div className="text-center">
        <Link
          to="/login"
          className="text-sm text-purple-400 hover:underline"
        >
          Voltar ao login
        </Link>
      </div>
    </form>
  );
}