// Hierarquia de papéis (número maior = mais privilégios)
export const ROLE_HIERARCHY = {
  member: 1,
  leader: 2,
  treasurer: 3,
  super_admin: 4
};

// Definições de módulo
export const MODULES = {
  DASHBOARD: 'dashboard',
  MEMBERS: 'members',
  EVENTS: 'events',
  DEPARTMENTS: 'departments',
  FINANCIAL: 'financial',
  USER_MANAGEMENT: 'user_management'
};

// Tipos de permissão
export const PERMISSIONS = {
  VIEW: 'view',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  MANAGE_ROLES: 'manage_roles'
};

// Matriz de permissões: função -> módulo -> permissões
export const PERMISSION_MATRIX = {
  member: {
    [MODULES.DASHBOARD]: [PERMISSIONS.VIEW],
    [MODULES.EVENTS]: [PERMISSIONS.VIEW],
    [MODULES.MEMBERS]: [], // Can only view own profile
  },
  leader: {
    [MODULES.DASHBOARD]: [PERMISSIONS.VIEW],
    [MODULES.MEMBERS]: [PERMISSIONS.VIEW, PERMISSIONS.CREATE, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
    [MODULES.EVENTS]: [PERMISSIONS.VIEW, PERMISSIONS.CREATE, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
    [MODULES.DEPARTMENTS]: [PERMISSIONS.VIEW, PERMISSIONS.CREATE, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
    [MODULES.FINANCIAL]: [PERMISSIONS.VIEW], // Read-only for leaders (per D-03)
  },
  treasurer: {
    [MODULES.FINANCIAL]: [PERMISSIONS.VIEW, PERMISSIONS.CREATE, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
  },
  super_admin: {
    [MODULES.DASHBOARD]: [PERMISSIONS.VIEW],
    [MODULES.MEMBERS]: [PERMISSIONS.VIEW, PERMISSIONS.CREATE, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
    [MODULES.EVENTS]: [PERMISSIONS.VIEW, PERMISSIONS.CREATE, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
    [MODULES.DEPARTMENTS]: [PERMISSIONS.VIEW, PERMISSIONS.CREATE, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
    [MODULES.FINANCIAL]: [PERMISSIONS.VIEW, PERMISSIONS.CREATE, PERMISSIONS.EDIT, PERMISSIONS.DELETE],
    [MODULES.USER_MANAGEMENT]: [PERMISSIONS.VIEW, PERMISSIONS.CREATE, PERMISSIONS.EDIT, PERMISSIONS.DELETE, PERMISSIONS.MANAGE_ROLES],
  }
};

// Verifique se o usuário tem permissão específica no módulo
export function hasPermission(userRole, module, permission) {
  const rolePermissions = PERMISSION_MATRIX[userRole];
  if (!rolePermissions) return false;

  const modulePermissions = rolePermissions[module];
  if (!modulePermissions) return false;

  return modulePermissions.includes(permission);
}

// Verifique se o usuário pode acessar um módulo (pelo menos permissão de visualização)
export function canAccessModule(userRole, module) {
  return hasPermission(userRole, module, PERMISSIONS.VIEW);
}

// Verifique se o usuário atende ao requisito mínimo de função
export function hasAccess(userRole, requiredRole) {
  const userLevel = ROLE_HIERARCHY[userRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
  return userLevel >= requiredLevel;
}

// Obtenha todos os módulos acessíveis para uma função
export function getAccessibleModules(userRole) {
  const rolePermissions = PERMISSION_MATRIX[userRole];
  if (!rolePermissions) return [];

  return Object.keys(rolePermissions).filter(
    module => rolePermissions[module].includes(PERMISSIONS.VIEW)
  );
}