# Research Summary: v2.0 CRUD Operations

## Research Overview

Date: 2026-05-05
Focus: Adding CRUD operations to existing v1.0 modules

---

## Key Findings

### Stack Additions Needed

| Component | Recommended |
|-----------|-------------|
| State | Keep Context API, add DataContext |
| Forms | React Hook Form + Zod validation |
| UI | Modal, Form inputs, Confirm dialog, Toast |
| Persistence | localStorage CRUD service |

### Feature Table Stakes

**Members:** Create, Edit, Delete, Bulk delete, Activate/deactivate
**Events:** Create, Edit, Delete, Cancel, Manage registrations
**Departments:** Create, Edit, Delete, Assign leader, Manage members
**Financial:** Create transaction, Edit transaction, Delete transaction, Allocate goals

### Watch Out For

1. **Validation:** Always validate with Zod before saving
2. **Uniqueness:** Check duplicate emails before creating members
3. **Confirmation:** Use confirm dialogs for all delete operations
4. **Related data:** Handle orphaned records when deleting departments
5. **Permissions:** Check existing RBAC before allowing CRUD actions
6. **Feedback:** Always show toast notifications for success/error

### Architecture Changes

1. Create `DataContext` for global CRUD state
2. Create `storage.js` service for localStorage CRUD
3. Create UI components (Modal, Input, Confirm, Toast)
4. Create CRUD hooks for each module
5. Integrate forms into existing pages

---

## Next Steps

Proceed to define requirements based on table stakes features above.

---

*Summary created: 2026-05-05*