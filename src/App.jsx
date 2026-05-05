import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RequireRole, RequireAnyRole } from './components/auth/RequireRole';

// Pages
import LoginPage from './pages/LoginPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import RecoveryForm from './components/auth/RecoveryForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm';

// Placeholder components for protected routes (to be implemented in later phases)
const DashboardPage = () => <div className="p-8"><h1>Dashboard</h1><p>Phase 2</p></div>;
const MembersPage = () => <div className="p-8"><h1>Membros</h1><p>Phase 3</p></div>;
const EventsPage = () => <div className="p-8"><h1>Eventos</h1><p>Phase 4</p></div>;
const FinancialPage = () => <div className="p-8"><h1>Financeiro</h1><p>Phase 5</p></div>;
const DepartmentsPage = () => <div className="p-8"><h1>Departamentos</h1><p>Phase 6</p></div>;
const UserManagementPage = () => <div className="p-8"><h1>Gerenciamento de Usuários</h1><p>Super Admin</p></div>;

// Password Recovery Pages
const RecoverPasswordPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Recuperar Senha</h1>
        <p className="text-gray-600 mt-2">Informe seu e-mail para receber o link de recuperação</p>
      </div>
      <RecoveryForm />
    </div>
  </div>
);

const ResetPasswordPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Nova Senha</h1>
        <p className="text-gray-600 mt-2">Digite sua nova senha</p>
      </div>
      <ResetPasswordForm />
    </div>
  </div>
);

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/recover-password" element={<RecoverPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />

      {/* Dashboard - accessible by all authenticated users */}
      <Route
        path="/dashboard"
        element={
          <RequireRole role="member">
            <DashboardPage />
          </RequireRole>
        }
      />

      {/* Members - Leaders and Super Admin */}
      <Route
        path="/members"
        element={
          <RequireAnyRole roles={['leader', 'super_admin']}>
            <MembersPage />
          </RequireAnyRole>
        }
      />

      {/* Events - Leaders and Super Admin */}
      <Route
        path="/events"
        element={
          <RequireAnyRole roles={['leader', 'super_admin']}>
            <EventsPage />
          </RequireAnyRole>
        }
      />

      {/* Departments - Leaders and Super Admin */}
      <Route
        path="/departments"
        element={
          <RequireAnyRole roles={['leader', 'super_admin']}>
            <DepartmentsPage />
          </RequireAnyRole>
        }
      />

      {/* Financial - Treasurer and Super Admin (Leaders get read-only via component-level check) */}
      <Route
        path="/financial"
        element={
          <RequireAnyRole roles={['treasurer', 'super_admin', 'leader']}>
            <FinancialPage />
          </RequireAnyRole>
        }
      />

      {/* User Management - Super Admin only */}
      <Route
        path="/users"
        element={
          <RequireRole role="super_admin">
            <UserManagementPage />
          </RequireRole>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}