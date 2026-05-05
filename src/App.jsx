import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RequireRole, RequireAnyRole } from './components/auth/RequireRole';
import SidebarLayout from './components/layout/SidebarLayout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import EventsPage from './pages/EventsPage';
import FinancialPage from './pages/FinancialPage';
import DepartmentsPage from './pages/DepartmentsPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import RecoveryForm from './components/auth/RecoveryForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm';

// Placeholder component for Super Admin
const UserManagementPage = () => <div className="p-8"><h1>Gerenciamento de Usuários</h1><p>Super Admin</p></div>;

// Password Recovery Pages
const RecoverPasswordPage = () => (
  <div className="min-h-screen bg-cosmic flex items-center justify-center p-4">
    <div className="w-full max-w-md card-glass rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">✝</span>
          <h1 className="text-2xl font-bold text-white">Recuperar Senha</h1>
        </div>
        <p className="text-gray-400 mt-2">Informe seu e-mail para receber o link de recuperação</p>
      </div>
      <RecoveryForm />
    </div>
  </div>
);

const ResetPasswordPage = () => (
  <div className="min-h-screen bg-cosmic flex items-center justify-center p-4">
    <div className="w-full max-w-md card-glass rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">✝</span>
          <h1 className="text-2xl font-bold text-white">Nova Senha</h1>
        </div>
        <p className="text-gray-400 mt-2">Digite sua nova senha</p>
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

      {/* Protected routes with Sidebar */}
      <Route
        path="/dashboard"
        element={
          <RequireRole role="member">
            <SidebarLayout><DashboardPage /></SidebarLayout>
          </RequireRole>
        }
      />

      {/* Members - Leaders and Super Admin */}
      <Route
        path="/members"
        element={
          <RequireAnyRole roles={['leader', 'super_admin']}>
            <SidebarLayout><MembersPage /></SidebarLayout>
          </RequireAnyRole>
        }
      />

      {/* Events - Leaders and Super Admin */}
      <Route
        path="/events"
        element={
          <RequireAnyRole roles={['leader', 'super_admin']}>
            <SidebarLayout><EventsPage /></SidebarLayout>
          </RequireAnyRole>
        }
      />

      {/* Departments - Leaders and Super Admin */}
      <Route
        path="/departments"
        element={
          <RequireAnyRole roles={['leader', 'super_admin']}>
            <SidebarLayout><DepartmentsPage /></SidebarLayout>
          </RequireAnyRole>
        }
      />

      {/* Financial - Treasurer and Super Admin (Leaders get read-only via component-level check) */}
      <Route
        path="/financial"
        element={
          <RequireAnyRole roles={['treasurer', 'super_admin', 'leader']}>
            <SidebarLayout><FinancialPage /></SidebarLayout>
          </RequireAnyRole>
        }
      />

      {/* User Management - Super Admin only */}
      <Route
        path="/users"
        element={
          <RequireRole role="super_admin">
            <SidebarLayout><UserManagementPage /></SidebarLayout>
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
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}