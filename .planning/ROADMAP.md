# Roadmap: Siltec-SGI

**Created:** 2026-05-05
**Total Phases:** 6
**Total v1 Requirements:** 34

## Phase Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Authentication System | Implement secure login, password recovery, session persistence, and role-based access control | AUTH-01, AUTH-02, AUTH-03, ACESSO-01, ACESSO-02, ACESSO-03, ACESSO-04, ACESSO-05, ACESSO-06, ACESSO-07 | 10 |
| 2 | Dashboard & Overview | Build main dashboard with metrics, financial summary, and daily agenda | DASH-01, DASH-02, DASH-03, DASH-04, DASH-05 | 5 |
| 3 | Members Management | Create member directory with filters, pagination, and export capabilities | MEMB-01, MEMB-02, MEMB-03, MEMB-04, MEMB-05 | 5 |
| 4 | Events & Agenda | Implement event calendar, weekly services, and registration system | EVT-01, EVT-02, EVT-03, EVT-04, EVT-05 | 5 |
| 5 | Financial Management | Build financial overview, tithe tracking, cash flow, and transaction views | FIN-01, FIN-02, FIN-03, FIN-04, FIN-05 | 5 |
| 6 | Departments & Groups | Create department cards, engagement stats, and group management | GRP-01, GRP-02, GRP-03, GRP-04 | 4 |

---

## Phase Details

### Phase 1: Authentication System

**Goal:** Implement secure login, password recovery, session persistence, and role-based access control

**Requirements:**
- AUTH-01, AUTH-02, AUTH-03, ACESSO-01, ACESSO-02, ACESSO-03, ACESSO-04, ACESSO-05, ACESSO-06, ACESSO-07

**Success Criteria:**
1. User can access the system with email and password
2. User can recover password through a dedicated recovery flow
3. User can opt for "Remember me" to persist session across browser sessions
4. System differentiates user types (Member, Leader, Treasurer, Super Admin)
5. Members can only view basic information (own profile, events)
6. Leaders can create, edit, and view in Members, Events, Departments, and Dashboard modules
7. Leaders have only view permission in the Financial module
8. Treasurers have full CRUD permission only in the Financial module
9. Super Admin has full CRUD privileges across all modules
10. Super Admin can manage roles and permissions of other users

**UI hint:** yes

---

### Phase 2: Dashboard & Overview

**Goal:** Build main dashboard with metrics, financial summary, and daily agenda

**Requirements:**
- DASH-01, DASH-02, DASH-03, DASH-04, DASH-05

**Success Criteria:**
1. User sees personalized greeting with congregation summary (souls count, essential events)
2. User sees weekly financial metrics with sparkline chart visualization
3. User sees community growth (total members and monthly growth rate)
4. User sees daily agenda with appointments, meetings, and scheduled services
5. User sees highlighted card for the next/most important upcoming event

**UI hint:** yes

---

### Phase 3: Members Management

**Goal:** Create member directory with filters, pagination, and export capabilities

**Requirements:**
- MEMB-01, MEMB-02, MEMB-03, MEMB-04, MEMB-05

**Success Criteria:**
1. User sees health indicators (total members, active count)
2. User sees member directory table with avatar/photo, name, registration date, status, department, and contact
3. User can filter members by department using quick tabs
4. User can export directory report in PDF or CSV format
5. User can navigate large member volumes via pagination controls

**UI hint:** yes

---

### Phase 4: Events & Agenda

**Goal:** Implement event calendar, weekly services, and registration system

**Requirements:**
- EVT-01, EVT-02, EVT-03, EVT-04, EVT-05

**Success Criteria:**
1. User sees large promotional card for mega events with registration info
2. User sees weekly service board with recurring schedule times
3. User sees community calendar with event cards (retreats, social actions, worship nights)
4. User can perform quick registrations and manage event capacity
5. User can filter events by category (Retreats, Fairs, Community Actions)

**UI hint:** yes

---

### Phase 5: Financial Management

**Goal:** Build financial overview, tithe tracking, cash flow, and transaction views

**Requirements:**
- FIN-01, FIN-02, FIN-03, FIN-04, FIN-05

**Success Criteria:**
1. User sees holistic operational capital view with "Transfer" and "Generate Report" actions
2. User can track tithes/goals with planned vs actual comparison and progress bar
3. User sees cash flow analysis with interactive chart showing inflows vs outflows
4. User sees fund allocation with donut chart (Missions, Programs, Operations)
5. User sees recent transactions with visual debit/credit indicators

**UI hint:** yes

---

### Phase 6: Departments & Groups

**Goal:** Create department cards, engagement stats, and group management

**Requirements:**
- GRP-01, GRP-02, GRP-03, GRP-04

**Success Criteria:**
1. User sees engagement statistics (active leaders vs total members)
2. User sees department cards in bento grid layout with visual structure
3. User sees leader names, vacancy vs participant indicators per ministry
4. User sees status of each subunit with community visual avatar

**UI hint:** yes

---

## Milestones

### Milestone1: MVP (Phases 1-6)

**Target:** Complete v1 requirements for core modules

**Coverage:** 34/34 v1 requirements (100%)

---

*Roadmap created: 2026-05-05*
*Last updated: 2026-05-05 after initialization*
