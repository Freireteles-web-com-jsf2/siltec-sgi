# Architecture Research: CRUD Operations

## Current Architecture

```
src/
├── App.jsx              (Router setup)
├── main.jsx             (Entry point)
├── contexts/
│   └── AuthContext.jsx  (Auth state only)
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── MembersPage.jsx
│   ├── EventsPage.jsx
│   ├── DepartmentsPage.jsx
│   └── FinancialPage.jsx
├── components/
│   ├── layout/
│   │   └── SidebarLayout.jsx
│   └── auth/
│       ├── LoginForm.jsx
│       ├── RecoveryForm.jsx
│       ├── ResetPasswordForm.jsx
│       └── RequireRole.jsx
└── utils/
    ├── auth.js         (JWT helpers)
    └── permissions.js  (RBAC)
```

## Required Architecture Changes

### 1. Data Layer

```
src/
├── contexts/
│   ├── AuthContext.jsx     (existing)
│   └── DataContext.jsx     (NEW: CRUD data state)
├── hooks/
│   ├── useMembers.js       (NEW: member operations)
│   ├── useEvents.js        (NEW: event operations)
│   ├── useDepartments.js  (NEW: department operations)
│   └── useTransactions.js (NEW: financial operations)
└── services/
    └── storage.js         (NEW: localStorage wrapper)
```

### 2. Component Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Modal.jsx       (NEW: glassmorphism modal)
│   │   ├── Form.jsx       (NEW: form wrapper)
│   │   ├── Input.jsx      (NEW: validated input)
│   │   ├── Button.jsx    (NEW: styled button)
│   │   ├── Confirm.jsx   (NEW: confirmation dialog)
│   │   └── Toast.jsx     (NEW: notifications)
│   └── crud/
│       ├── MemberForm.jsx    (NEW: create/edit member)
│       ├── EventForm.jsx     (NEW: create/edit event)
│       ├── DepartmentForm.jsx (NEW: create/edit department)
│       └── TransactionForm.jsx (NEW: create/edit transaction)
```

### 3. Data Flow

```
User Action → Form Component → Hook → DataContext → localStorage
                                           ↓
                                    Update UI State
```

## Integration Points

| Point | Description |
|-------|-------------|
| AuthContext | Read user role for CRUD permissions |
| SidebarLayout | Add action buttons to pages |
| localStorage | Persist CRUD data |
| Router | Add routes for edit pages (optional) |

## Build Order

1. DataContext + storage service
2. UI components (Modal, Form, Input)
3. Member CRUD (most critical)
4. Event CRUD
5. Department CRUD
6. Financial CRUD
7. Integration + tests

---

*Research completed: 2026-05-05*