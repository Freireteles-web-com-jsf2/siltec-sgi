import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  {
    title: 'Geral',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: '📊' },
      { name: 'Análises', path: '/analytics', icon: '📈' },
      { name: 'Análises Membros', path: '/member-analytics', icon: '👥', roles: ['leader', 'super_admin'] },
      { name: 'Análises Eventos', path: '/event-analytics', icon: '📅', roles: ['leader', 'super_admin'] },
      { name: 'Membros', path: '/members', icon: '👥', roles: ['leader', 'super_admin'] },
      { name: 'Eventos', path: '/events', icon: '📅', roles: ['leader', 'super_admin'] },
    ]
  },
  {
    title: 'Administrativo',
    items: [
      { name: 'Financeiro', path: '/financial', icon: '💰', roles: ['treasurer', 'leader', 'super_admin'] },
      { name: 'Departamentos', path: '/departments', icon: '🏢', roles: ['leader', 'super_admin'] },
    ]
  },
  {
    title: 'Sistema',
    items: [
      { name: 'Usuários', path: '/users', icon: '👤', roles: ['super_admin'] },
    ]
  },
];

export default function SidebarLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userRole = user?.role || 'member';
  const roleHierarchy = { member: 1, leader: 2, treasurer: 3, super_admin: 4 };
  const userLevel = roleHierarchy[userRole] || 1;

  const hasAccess = (roles) => {
    if (!roles) return true;
    return roles.some(role => roleHierarchy[role] <= userLevel);
  };

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-cosmic flex">
      {/* Sidebar */}
      <aside 
        className={`bg-cosmic-mini border-r border-white/10 flex flex-col transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✝</span>
            {!collapsed && (
              <div>
                <h1 className="text-white font-bold text-sm">SANTUÁRIO</h1>
                <p className="text-gray-400 text-xs">Digital</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2 overflow-y-auto">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-4">
              {!collapsed && (
                <p className="text-gray-500 text-xs uppercase px-3 mb-2">{section.title}</p>
              )}
              {section.items.filter(item => hasAccess(item.roles)).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all mb-1 ${
                    currentPath === item.path
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && <span className="text-sm">{item.name}</span>}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-3 border-t border-white/10">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{user?.name || 'Usuário'}</p>
                <p className="text-gray-500 text-xs capitalize">{user?.role || 'member'}</p>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors ${
              collapsed ? 'justify-center w-full' : 'px-3 py-2 w-full rounded-lg hover:bg-white/10'
            }`}
          >
            <span>🚪</span>
            {!collapsed && <span className="text-sm">Sair</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 border-t border-white/10 text-gray-500 hover:text-white transition-colors"
        >
          {collapsed ? '→' : '←'}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}