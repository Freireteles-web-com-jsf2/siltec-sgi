# Pitfalls Research: CRUD Operations

## Common Mistakes When Adding CRUD

### 1. State Management

**Mistake:** Storing state in individual page components only
**Problem:** Data lost on navigation, no persistence
**Prevention:** Use DataContext with localStorage sync

**Mistake:** Not handling concurrent updates
**Problem:** Race conditions with multiple open tabs
**Prevention:** Add loading states, disable buttons during operations

### 2. Form Validation

**Mistake:** No validation or only UI validation
**Problem:** Invalid data in storage, bad user experience
**Prevention:** Use Zod for schema validation

**Mistake:** Not validating uniqueness (e.g., duplicate email)
**Problem:** Duplicate records
**Prevention:** Check uniqueness before save

### 3. Delete Operations

**Mistake:** Hard delete without confirmation
**Problem:** Accidental data loss, no recovery
**Prevention:** Always use confirmation dialog, consider soft delete

**Mistake:** Not handling related data (e.g., deleting department with members)
**Problem:** Orphaned records
**Prevention:** Reassign or prevent deletion with warning

### 4. User Experience

**Mistake:** No feedback on save/error
**Problem:** User doesn't know if action succeeded
**Prevention:** Add toast notifications

**Mistake:** Not disabling form during submit
**Problem:** Double submissions, duplicate records
**Prevention:** Disable submit button, show loading state

### 5. Permissions

**Mistake:** Not checking permissions for CRUD
**Problem:** Unauthorized actions
**Prevention:** Use existing RBAC (ACESSO-03, ACESSO-04, etc.)

### 6. Data Persistence

**Mistake:** Only in-memory state
**Problem:** Data lost on refresh
**Prevention:** Sync with localStorage on every change

## Integration Pitfalls to Address in Phase

| Issue | Phase | Prevention |
|-------|-------|------------|
| Form validation | All | React Hook Form + Zod |
| Delete confirmation | All | Confirm dialog component |
| Role permissions | All | Check existing permissions.js |
| localStorage sync | All | storage.js service |
| Duplicate prevention | Member CRUD | Check email uniqueness |

---

*Research completed: 2026-05-05*