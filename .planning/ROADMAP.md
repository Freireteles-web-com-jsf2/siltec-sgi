# ROADMAP — Siltec-SGI (MVP v1)

**Project:** Siltec-SGI (Santuário Digital)  
**Granularity:** Standard (6 phases)  
**Created:** 2026-05-04  
**Status:** Draft — awaiting approval

---

## Phases

- [ ] **Phase 1: Auth & Foundation** - Secure authentication with Supabase + RLS setup
- [ ] **Phase 2: Member Management** - Complete member database with CRUD, filters, export
- [ ] **Phase 3: Departments** - Department structure with engagement statistics
- [ ] **Phase 4: Events & Calendar** - Event management with calendar views and categories
- [ ] **Phase 5: Financial Module** - Tithe tracking, fund allocation, and financial reports
- [ ] **Phase 6: Dashboard** - Aggregate metrics dashboard with personalized greeting

---

## Phase Details

### Phase 1: Auth & Foundation
**Goal**: Users can securely access the system with persistent sessions  
**Depends on**: Nothing (foundation phase)  
**Requirements**: AUTH-01, AUTH-02, AUTH-03, NFR-04  
**Success Criteria** (what must be TRUE):
  1. User can log in with email/password and access protected pages
  2. User can request password reset via "Esqueceu senha?" link and receive reset email
  3. User can check "Lembrar-me" and remain logged in after closing/reopening browser
  4. System prevents unauthorized access to protected routes (redirects to login)
**Plans**: TBD  
**UI hint**: yes

### Phase 2: Member Management
**Goal**: Admins can manage church member database with listing, filtering, and export  
**Depends on**: Phase 1 (authentication required)  
**Requirements**: MEMB-01, MEMB-02, MEMB-03, MEMB-04, NFR-01, NFR-02, NFR-03  
**Success Criteria** (what must be TRUE):
  1. User can view member list with photo/avatar, name, status, department, and contact info
  2. User can filter members by department using quick tabs
  3. User can export member list as PDF or CSV with current filters applied
  4. User can navigate through paginated member list for large volumes
**Plans**: TBD  
**UI hint**: yes

### Phase 3: Departments
**Goal**: Admins can organize members into departments with engagement tracking  
**Depends on**: Phase 2 (departments reference members)  
**Requirements**: DEPT-01, DEPT-02, NFR-01, NFR-02, NFR-03  
**Success Criteria** (what must be TRUE):
  1. User can view department cards in bento grid showing leaders, vacancies, and status
  2. User can see engagement statistics (active leaders vs members) per department
**Plans**: TBD  
**UI hint**: yes

### Phase 4: Events & Calendar
**Goal**: Admins can manage church events, calendar, and registrations  
**Depends on**: Phase 2 (events reference members for registrations)  
**Requirements**: EVENT-01, EVENT-02, EVENT-03, EVENT-04, NFR-01, NFR-02, NFR-03  
**Success Criteria** (what must be TRUE):
  1. User can view mega event promotions with registration buttons and counters
  2. User can view weekly service schedule with recurring time slots
  3. User can view community calendar with independent event cards
  4. User can filter events by category (Retreats, Fairs, Community Actions)
**Plans**: TBD  
**UI hint**: yes

### Phase 5: Financial Module
**Goal**: Admins can track church finances, tithes, and generate financial reports  
**Depends on**: Phase 2 (transactions reference members)  
**Requirements**: FIN-01, FIN-02, FIN-03, FIN-04, FIN-05, NFR-01, NFR-02, NFR-03  
**Success Criteria** (what must be TRUE):
  1. User can view capital overview with quick actions (Transfer, Generate Report)
  2. User can track tithes/goals with progress bar showing monthly percentage
  3. User can view cash flow analysis with interactive line chart
  4. User can view fund allocation with donut chart showing distribution
  5. User can view recent transactions with visual debit/credit indicators
**Plans**: TBD  
**UI hint**: yes

### Phase 6: Dashboard
**Goal**: Users see personalized dashboard with key metrics and upcoming events  
**Depends on**: Phase 2, 3, 4, 5 (reads data from all modules)  
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, NFR-01, NFR-02, NFR-03  
**Success Criteria** (what must be TRUE):
  1. User sees personalized greeting with congregation member count
  2. User sees quick financial metrics (tithes/week, sparkline chart)
  3. User sees community growth metrics (total members, monthly growth rate)
  4. User sees daily agenda (appointments, meetings, services)
  5. User sees next event highlighted in visual card
**Plans**: TBD  
**UI hint**: yes

---

## Progress Tracking

| Phase | Name | Plans Complete | Status | Completed |
|-------|------|----------------|--------|-----------|
| 1 | Auth & Foundation | 0/3 | Not started | - |
| 2 | Member Management | 0/4 | Not started | - |
| 3 | Departments | 0/2 | Not started | - |
| 4 | Events & Calendar | 0/4 | Not started | - |
| 5 | Financial Module | 0/5 | Not started | - |
| 6 | Dashboard | 0/5 | Not started | - |

---

## Coverage Validation

✓ **100% Requirement Coverage** (27/27 v1 requirements mapped)

| REQ-ID | Phase | Category |
|--------|-------|----------|
| AUTH-01 | Phase 1 | Authentication |
| AUTH-02 | Phase 1 | Authentication |
| AUTH-03 | Phase 1 | Authentication |
| NFR-04 | Phase 1 | Non-Functional |
| MEMB-01 | Phase 2 | Members |
| MEMB-02 | Phase 2 | Members |
| MEMB-03 | Phase 2 | Members |
| MEMB-04 | Phase 2 | Members |
| NFR-01 | Phase 2 | Non-Functional |
| NFR-02 | Phase 2 | Non-Functional |
| NFR-03 | Phase 2 | Non-Functional |
| DEPT-01 | Phase 3 | Departments |
| DEPT-02 | Phase 3 | Departments |
| NFR-01 | Phase 3 | Non-Functional |
| NFR-02 | Phase 3 | Non-Functional |
| NFR-03 | Phase 3 | Non-Functional |
| EVENT-01 | Phase 4 | Events |
| EVENT-02 | Phase 4 | Events |
| EVENT-03 | Phase 4 | Events |
| EVENT-04 | Phase 4 | Events |
| NFR-01 | Phase 4 | Non-Functional |
| NFR-02 | Phase 4 | Non-Functional |
| NFR-03 | Phase 4 | Non-Functional |
| FIN-01 | Phase 5 | Finance |
| FIN-02 | Phase 5 | Finance |
| FIN-03 | Phase 5 | Finance |
| FIN-04 | Phase 5 | Finance |
| FIN-05 | Phase 5 | Finance |
| NFR-01 | Phase 5 | Non-Functional |
| NFR-02 | Phase 5 | Non-Functional |
| NFR-03 | Phase 5 | Non-Functional |
| DASH-01 | Phase 6 | Dashboard |
| DASH-02 | Phase 6 | Dashboard |
| DASH-03 | Phase 6 | Dashboard |
| DASH-04 | Phase 6 | Dashboard |
| DASH-05 | Phase 6 | Dashboard |
| NFR-01 | Phase 6 | Non-Functional |
| NFR-02 | Phase 6 | Non-Functional |
| NFR-03 | Phase 6 | Non-Functional |

**Note:** NFR-01 (glassmorphism), NFR-02 (responsive mobile-first), and NFR-03 (icons) apply to all UI phases (2-6) and will be implemented as part of those phases.

---

## Research Flags

Phases with standard patterns (skip `/gsd-research-phase`):
- **Phase 1**: Supabase RLS + Auth patterns well-documented in official docs
- **Phase 3**: Departments CRUD + junction table patterns are standard
- **Phase 6**: Recharts dashboards well-documented

Phases needing deeper research during planning:
- **Phase 2**: Brazilian CPF/CNPJ validation, duplicate detection algorithms
- **Phase 4**: Recurring event RRULE handling
- **Phase 5**: Pix API integration (Brazil-specific), DRE report legal requirements

---

*Generated by /gsd-roadmap on 2026-05-04*  
*Next: Review draft → Approve → `/gsd-plan-phase 1`*
