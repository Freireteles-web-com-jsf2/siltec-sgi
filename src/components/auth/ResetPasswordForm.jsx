import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { validateResetToken, resetPassword } from '../../utils/auth';

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError('Token não fornecido.');
      return;
    }

    const validation = validateResetToken(token);
    setTokenValid(validation.valid);
    if (!validation.valid) {
      setError(validation.error);
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = resetPassword(token, password);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error);
      }

      setLoading(false);
    }, 500);
  };

  if (tokenValid === false) {
    return (
      <div className="text-center space-y-4">
        <div className="text-red-500 text-sm font-medium py-2">
          {error || 'Token inválido'}
        </div>
        <Link
          to="/recover-password"
          className="text-blue-500 hover:underline text-sm"
        >
          Solicitar novo link de recuperação
        </Link>
      </div>
    );
  }

  if (tokenValid === null) {
    return <div className="text-center py-4">Validando token...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success ? (
        <>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Nova Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Alterando...' : 'Resetar senha'}
          </button>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-green-600 text-sm font-medium py-2">
            Senha alterada com sucesso!
          </div>
          <Link
            to="/login"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Voltar ao Login
          </Link>
        </div>
      )}

      <div className="text-center">
        <Link
          to="/login"
          className="text-sm text-blue-500 hover:underline"
        >
          Voltar ao login
        </Link>
      </div>
    </form>
  );
}