// Mock users initialization (run once on app start)
export function initMockUsers() {
  if (!localStorage.getItem('mockUsers')) {
    const mockUsers = [
      { email: 'admin@siltec.com', password: 'admin123', role: 'super_admin', name: 'Super Admin' },
      { email: 'tesoureiro@siltec.com', password: 'treasurer123', role: 'treasurer', name: 'Tesoureiro' },
      { email: 'lider@siltec.com', password: 'leader123', role: 'leader', name: 'Líder' },
      { email: 'membro@siltec.com', password: 'member123', role: 'member', name: 'Membro' }
    ];
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }
}

// Mock JWT creation (base64 encoded payload only, no signature for MVP)
export function createMockJWT(user) {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + (user.rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60) // 7 days or 1 day
  }));
  return `${header}.${payload}.mock-signature`;
}

// Login function
export function login(email, password, rememberMe = false) {
  const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return { success: false, error: 'E-mail ou senha inválidos. Tente novamente.' };

  const token = createMockJWT({ ...user, rememberMe });

  if (rememberMe) {
    localStorage.setItem('authToken', token);
    sessionStorage.removeItem('authToken');
  } else {
    sessionStorage.setItem('authToken', token);
    localStorage.removeItem('authToken');
  }

  return { success: true, user: { email: user.email, role: user.role, name: user.name } };
}

// Logout function
export function logout() {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
}

// Get token from storage
export function getToken() {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}

// Decode token (client-side only, no verification)
export function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (e) {
    return null;
  }
}

// Check if token is expired
export function isTokenExpired(token) {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  return payload.exp * 1000 < Date.now();
}

// Password Recovery Functions (MVP - Simulated)

// Generate reset token and store in localStorage
export function generateResetToken(email) {
  const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  const user = users.find(u => u.email === email);

  if (!user) return { success: false, error: 'E-mail não encontrado. Verifique o endereço.' };

  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes (per D-09)

  const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
  resetTokens[token] = { email, expires };
  localStorage.setItem('resetTokens', JSON.stringify(resetTokens));

  return { success: true, token, email: maskEmail(email) };
}

// Validate reset token
export function validateResetToken(token) {
  const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
  const resetData = resetTokens[token];

  if (!resetData) return { valid: false, error: 'Token inválido ou já utilizado.' };

  if (resetData.expires < Date.now()) {
    // Clean up expired token
    delete resetTokens[token];
    localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    return { valid: false, error: 'Token expirado. Solicite um novo link de recuperação.' };
  }

  return { valid: true, email: resetData.email };
}

// Reset password with valid token
export function resetPassword(token, newPassword) {
  const validation = validateResetToken(token);
  if (!validation.valid) return validation;

  const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
  const resetData = resetTokens[token];

  // Update user password
  const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
  const userIndex = users.findIndex(u => u.email === resetData.email);

  if (userIndex === -1) return { success: false, error: 'Usuário não encontrado.' };

  users[userIndex].password = newPassword;
  localStorage.setItem('mockUsers', JSON.stringify(users));

  // Invalidate token after use (one-time use)
  delete resetTokens[token];
  localStorage.setItem('resetTokens', JSON.stringify(resetTokens));

  return { success: true };
}

// Helper: Mask email for display (e.g., a***@e***.com)
function maskEmail(email) {
  const [local, domain] = email.split('@');
  const maskedLocal = local.charAt(0) + '***';
  const domainParts = domain.split('.');
  const maskedDomain = domainParts[0].charAt(0) + '***.' + domainParts.slice(1).join('.');
  return `${maskedLocal}@${maskedDomain}`;
}
