# Phase 1: Authentication System - Research

**Researched:** 2026-05-05
**Phase:** 01-authentication-system

## Technical Research Findings

### 1. JWT Authentication in React SPA

**Recommendation:** Use `jwt-decode` library for client-side JWT parsing (no verification, only decode).

- **Library:** `jwt-decode` (lightweight, no crypto dependencies)
- **Usage:** Decode JWT payload to extract `role`, `email`, `name` for UI authorization checks
- **Storage:** 
  - With "Lembrar-me": `localStorage.setItem('authToken', token)`
  - Without: `sessionStorage.setItem('authToken', token)`
- **Token expiration:** Check `exp` claim in payload, redirect to login if expired

**Code Pattern:**
```javascript
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    // Token expired, clear storage, redirect to login
  }
}
```

### 2. Role-Based Access Control (RBAC) with React Router

**Approach:** Create a `RequireRole` wrapper component using React Router v6.

**Implementation Strategy:**
- Use React Context to provide `user` object (with role) globally
- Create `RequireRole` component that checks user role against required roles
- Use React Router v6's `<Navigate>` for redirects

**Code Pattern:**
```jsx
// AuthContext.js
const AuthContext = createContext();

export function RequireRole({ role, children }) {
  const { user } = useAuth();
  if (!user || !hasAccess(user.role, role)) {
    return <Navigate to="/access-denied" replace />;
  }
  return children;
}

// Usage in routes:
<Route path="/financial" element={
  <RequireRole role="leader">
    <FinancialModule />
  </RequireRole>
} />
```

**Role Hierarchy (from PRD):**
- Super Admin: Full access all modules
- Treasurer: Full CRUD only in Financial
- Leader: CRUD in Members, Events, Departments, Dashboard; Read-only in Financial
- Member: Basic info only (own profile, events)

### 3. Session Persistence (Remember Me)

**Mechanism:**
- "Lembrar-me" checked: Store JWT in `localStorage` (persists across browser sessions)
- Unchecked: Store JWT in `sessionStorage` (cleared when tab/browser closes)

**Implementation:**
```javascript
function handleLogin(token, rememberMe) {
  if (rememberMe) {
    localStorage.setItem('authToken', token);
  } else {
    sessionStorage.setItem('authToken', token);
  }
}
```

**Token Validation on App Load:**
- Check both storage locations on app initialization
- Prefer `localStorage` if both exist (longer-lived)

### 4. Mock User Data (MVP - No Supabase)

**Structure in localStorage:**
```javascript
// Initialize mock users if not present
const mockUsers = [
  { email: 'admin@siltec.com', password: 'admin123', role: 'super_admin', name: 'Super Admin' },
  { email: 'treasurer@siltec.com', password: 'treasurer123', role: 'treasurer', name: 'Tesoureiro' },
  { email: 'leader@siltec.com', password: 'leader123', role: 'leader', name: 'Líder' },
  { email: 'member@siltec.com', password: 'member123', role: 'member', name: 'Membro' }
];
localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
```

**Login Validation:**
- Retrieve `mockUsers` from localStorage
- Find user with matching email AND password (plain text comparison for MVP)
- If found, generate mock JWT (simple base64 encoded payload, no signature for MVP)
- Store token via `handleLogin(token, rememberMe)`

### 5. Password Recovery Flow (Simulated)

**Flow:**
1. User enters email on `/recover-password`
2. Check if email exists in `mockUsers`
3. If exists: Generate reset token (random string), store in localStorage with expiry
4. **MVP Simulation:** Display message "E-mail enviado para ***@***.com" and show token on screen for testing
5. User clicks link with token: `/reset-password?token=xyz`
6. Validate token, allow new password entry
7. Update user in `mockUsers`

**Token Storage for Reset:**
```javascript
const resetTokens = {
  'xyz789': { email: 'user@test.com', expires: Date.now() + 15*60*1000 }
};
localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
```

### 6. React Router DOM v6 Patterns

**Key APIs for Auth:**
- `<Navigate>` component for redirects
- `useNavigate()` hook for programmatic navigation
- `useLocation()` to capture current path for post-login redirect

**Protected Route Pattern:**
```jsx
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}
```

### 7. Form Handling (Login & Recovery)

**Recommendation:** Use controlled components (useState) for simplicity in MVP. No need for react-hook-form yet.

**Login Form State:**
```javascript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [rememberMe, setRememberMe] = useState(false);
const [error, setError] = useState('');
```

**Validation:**
- Basic: Check empty fields
- Email format: Simple regex or HTML5 `type="email"`
- Display error message below form (red text, warning icon)

### 8. Logout Implementation

**Action:**
- Clear token from both `localStorage` and `sessionStorage`
- Redirect to `/login`
- Clear any user state in AuthContext

### 9. Glassmorphism Styling for Auth Pages

**Tailwind Classes (from UI-SPEC.md):**
- Card: `backdrop-blur-md bg-white/20 border border-white/30 shadow-glass`
- Inputs: `bg-white/10 border border-white/20 focus:border-blue-400`
- Buttons: `bg-blue-500 hover:bg-blue-600 text-white`
- Background: `bg-gray-50` (dominant color #F8F9FA)

**Page Layout:**
```jsx
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <div className="w-full max-w-md backdrop-blur-md bg-white/20 border border-white/30 shadow-glass rounded-xl p-8">
    {/* Form content */}
  </div>
</div>
```

## Security Considerations (MVP)

1. **No real JWT signing** - MVP uses mock tokens (base64 encoded only)
2. **Plain text passwords** - Acceptable for MVP simulation
3. **Client-side only** - No server validation (all in localStorage)
4. **Future migration** - Structure code to easily replace mock auth with Supabase later

## Dependencies to Install

```bash
npm install jwt-decode
npm install react-router-dom  # (if not already installed)
```

## File Structure for Phase 1

```
src/
├── contexts/
│   └── AuthContext.js       # Auth state management
├── components/
│   └── auth/
│       ├── LoginForm.jsx
│       ├── RecoveryForm.jsx
│       ├── ResetPasswordForm.jsx
│       └── RequireRole.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── RecoverPasswordPage.jsx
│   ├── ResetPasswordPage.jsx
│   └── AccessDeniedPage.jsx
├── utils/
│   └── auth.js             # Token handling, mock user functions
└── App.jsx                  # Routes with protection
```

## Verification Architecture (for VALIDATION.md)

**Dimension 1: Functional**
- Login with valid credentials → redirects to dashboard
- Login with invalid credentials → shows error
- "Lembrar-me" → token in localStorage
- No "Lembrar-me" → token in sessionStorage
- Role-based redirect: admin→/dashboard, member→/profile

**Dimension 2: Authorization**
- Leader accesses /financial → sees page but buttons disabled
- Member tries /financial → redirects to /access-denied
- Super Admin accesses all routes → success

**Dimension 3: Recovery**
- Valid email → shows success message with token (MVP)
- Invalid email → shows error message
- Reset link with valid token → allows password change
- Reset link with expired token → shows error

**Dimension 4: UI/UX**
- Glassmorphism styling applied
- Responsive layout (mobile-first)
- Error messages display correctly
- Form inputs have proper types (email, password)

---
*Research completed: 2026-05-05*
*Based on: CONTEXT.md, UI-SPEC.md, PRD Section 8*
