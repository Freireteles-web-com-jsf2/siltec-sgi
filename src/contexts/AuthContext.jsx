import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, decodeToken, login, logout, initMockUsers, isTokenExpired } from '../utils/auth';

initMockUsers();

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      setUser({ email: decoded.email, role: decoded.role, name: decoded.name });
    } else if (token) {
      logout(); // Clear expired token
    }
    setLoading(false);
  }, []);

  const handleLogin = (email, password, rememberMe) => {
    const result = login(email, password, rememberMe);
    if (result.success) {
      setUser(result.user);
      navigate('/dashboard');
    }
    return result;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
