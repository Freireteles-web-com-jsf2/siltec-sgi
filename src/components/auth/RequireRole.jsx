import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { hasAccess, canAccessModule, hasPermission, PERMISSIONS } from '../../utils/permissions';

// Require specific role or higher
export function RequireRole({ children, role, fallbackPath = '/access-denied' }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccess(user.role, role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}

// Require any of the listed roles
export function RequireAnyRole({ children, roles, fallbackPath = '/access-denied' }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasRequiredRole = roles.some(role => hasAccess(user.role, role));

  if (!hasRequiredRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}

// Require specific module permission
export function RequireModulePermission({ children, module, permission = PERMISSIONS.VIEW, fallbackPath = '/access-denied' }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasPermission(user.role, module, permission)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}

// HOC for disabling UI elements based on permissions (for ACESSO-04 - leader read-only in financial)
export function withPermissionCheck(WrappedComponent, requiredRole) {
  return function PermissionCheckedComponent(props) {
    const { user } = useAuth();

    if (!user || !hasAccess(user.role, requiredRole)) {
      return (
        <div className="opacity-50 pointer-events-none" title="Apenas visualização">
          <WrappedComponent {...props} disabled />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}