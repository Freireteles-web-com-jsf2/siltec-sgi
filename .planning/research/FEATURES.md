# Features Research: CRUD Operations

## Current State (v1.0 Read-only)

| Module | Features Implemented |
|--------|---------------------|
| Members | View list, filter by department, search, export CSV/PDF, pagination |
| Events | View mega event, weekly services, calendar view, register/unregister |
| Departments | View bento grid, stats, view members, edit button (non-functional) |
| Financial | View capital, goals, cash flow chart, allocation donut, transactions |

## CRUD Requirements (v2.0)

### Members CRUD

**Table Stakes (Must Have):**
- MEMB-CRUD-01: Create new member with form (name, email, phone, department, status)
- MEMB-CRUD-02: Edit existing member details
- MEMB-CRUD-03: Delete member with confirmation
- MEMB-CRUD-04: Bulk delete members (select multiple)
- MEMB-CRUD-05: Activate/deactivate member status

**Differentiators:**
- MEMB-CRUD-06: Import members via CSV upload
- MEMB-CRUD-07: Member profile with attendance history
- MEMB-CRUD-08: Member notes/comments

### Events CRUD

**Table Stakes:**
- EVT-CRUD-01: Create new event (title, date, time, description, capacity, category)
- EVT-CRUD-02: Edit event details
- EVT-CRUD-03: Delete event with confirmation
- EVT-CRUD-04: Cancel event (mark as cancelled)
- EVT-CRUD-05: Manage registrations (approve/reject)

**Differentiators:**
- EVT-CRUD-06: Recurring events (weekly, monthly)
- EVT-CRUD-07: Event check-in (QR code)
- EVT-CRUD-08: Send notification to attendees

### Departments CRUD

**Table Stakes:**
- DEPT-CRUD-01: Create new department (name, icon, leader, capacity, description)
- DEPT-CRUD-02: Edit department details
- DEPT-CRUD-03: Delete department (reassign members)
- DEPT-CRUD-04: Assign/change leader
- DEPT-CRUD-05: Manage department members

**Differentiators:**
- DEPT-CRUD-06: Sub-groups within department
- DEPT-CRUD-07: Department schedule/calendar

### Financial CRUD

**Table Stakes:**
- FIN-CRUD-01: Create transaction (type, description, amount, date, category)
- FIN-CRUD-02: Edit transaction
- FIN-CRUD-03: Delete transaction with confirmation
- FIN-CRUD-04: Create/edit allocation goals
- FIN-CRUD-05: Record tithe/offering by member

**Differentiators:**
- FIN-CRUD-06: Recurring transactions (monthly rent, etc.)
- FIN-CRUD-07: Export financial reports (PDF)
- FIN-CRUD-08: Budget vs actual tracking

---

*Research completed: 2026-05-05*