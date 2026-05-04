# Project Research Summary

**Project:** Siltec-Solutions | SGI (Santuário Digital)  
**Domain:** Church Management System (ChMS) for Brazilian churches  
**Researched:** May 4, 2026  
**Confidence:** HIGH

## Executive Summary

SGI is a modern Church Management System designed specifically for Brazilian churches (100–500 members). Research across 15+ platforms (Planning Center, Breeze, Rock RMS, Pushpay) reveals that current solutions are US-centric, lack WhatsApp integration, and have dated interfaces. The recommended approach is a **client-heavy SPA with Supabase BaaS** — React 19 + Vite 8 + Tailwind CSS v4 with glassmorphism design — that prioritizes Portuguese-first localization, Pix/WhatsApp integration, and mobile-responsive experience.

Expert builders in this domain use **RLS-first multi-tenancy** (every table has `church_id` + Row Level Security), **Supabase as the backend** (PostgreSQL, Auth, Realtime, Storage), and **modular component boundaries** (Members → Departments → Events → Finance → Dashboard build order). The architecture avoids traditional Node.js backends since Supabase PostgREST + Edge Functions handle API needs. shadcn/ui + Tailwind v4 delivers the glassmorphism UI specified in the PRD while maintaining rapid development velocity.

The primary risks are **multi-tenant data leaks** (missing RLS policies), **feature creep** (building 15 modules when churches use 5), and **mobile UX failure** (church volunteers use phones, not 1920px monitors). Mitigation: enforce RLS on every table from Phase 1, scope MVP to the PRD's core modules (Members, Groups, Events, Finance, Dashboard), and test all flows at 375px viewport. Brazilian context (Pix, WhatsApp, pt-BR, CPF/CNPJ) is a differentiator — not an afterthought.

## Key Findings

### Recommended Stack

The SGI stack is optimized for glassmorphism design, church management complexity, and rapid development with minimal bundle size.

**Core technologies:**
- **React 19.2.5 + TypeScript 5.8.3:** Latest stable React with concurrent rendering, functional components, and type safety for complex church data models
- **Vite 8.0.10 + @tailwindcss/vite 4.2.4:** Extremely fast HMR, native ESM, Tailwind v4 integration — replaces CRA
- **Tailwind CSS 4.2.4:** Utility-first styling with OKLCH color support, powers the glassmorphism design system specified in PRD
- **Supabase JS v2.105.1 (NOT v3 beta):** Auth, PostgreSQL, Realtime, Storage — backend-as-a-service with RLS for multi-tenancy
- **react-router 7.14.2:** Client-side routing (SPA), v7 is current major, supports React 19
- **shadcn/ui + lucide-react 1.14.0 + material-symbols 0.44.4:** Copy-paste component library (Radix + Tailwind), tree-shakeable icons, Google Material Symbols for PRD compliance
- **TanStack Table 8.21.3 + Recharts 2.15.0:** Headless table logic (member directory), SVG-based React charts (financial dashboards)
- **React Hook Form 7.53.0 + Zod 3.24.0:** Uncontrolled form state (minimal re-renders), TypeScript-first validation
- **Zustand 5.0.3:** Lightweight state management (1.2KB gzipped) for UI state (sidebar, modals, theme)
- **date-fns 4.1.0:** Tree-shakeable date utilities with native timezone support
- **@react-pdf/renderer 4.5.1:** JSX syntax for PDF generation (member reports, DRE financial statements)

Full installation commands in [STACK.md](./STACK.md).

### Expected Features

Based on analysis of Planning Center, Breeze, Rock RMS, Pushpay, Realm, and 10+ platforms.

**Must have (table stakes):**
- **Member Database (CRM)** — profiles, households, custom fields, duplicate detection, photo/avatar
- **Attendance Tracking** — service attendance, small groups, events, children's check-in security
- **Online Giving & Donations** — Pix, cards, recurring gifts, automatic receipts, year-end statements
- **Event Management & Calendar** — centralized calendar, RSVP, registration, capacity limits
- **Communication Tools** — email/SMS/WhatsApp segmentation by groups/tags (WhatsApp is critical for Brazil)
- **Volunteer Scheduling** — self-service scheduling, availability, automated reminders
- **Groups & Department Management** — small groups, ministry teams, department structure (Departamentos)
- **Reporting & Analytics** — dashboards, giving trends, attendance patterns, engagement metrics
- **User Roles & Permissions** — RBAC for pastor, secretary, treasurer, volunteer roles
- **Mobile Access (Responsive/PWA)** — mobile-first is non-negotiable in 2026

**Should have (differentiators):**
- **Modern Glassmorphism UI/UX** — current ChMS platforms have dated interfaces, modern design = faster adoption
- **WhatsApp Integration** — 98% of Brazilians use WhatsApp daily; none of top US platforms support it natively
- **Portuguese-First Localization** — 100% of top ChMS are US-centric (no WhatsApp, no Pix, no pt-BR)
- **Supabase Real-Time Backend** — instant updates across devices, better UX than traditional REST
- **Member Self-Service Portal** — members update own info, view giving history, RSVP to events
- **AI-Powered Insights** — predict giving trends, identify at-risk members, "people you should call" alerts

**Defer (v2+):**
- **Native Mobile App** — PWA is sufficient for MVP; native app later
- **Full Church Accounting System** — integrate with QuickBooks/Aplos; don't build fund accounting from scratch
- **Child Check-In Kiosk** — important but can launch without it
- **Offline-First Capability** — edge case for MVP; add service workers later
- **Complex Workflow Builder** — Breeze wins on simplicity; advanced workflows later
- **Multi-Campus/Enterprise Features** — most churches are <200 members; enterprise complicates UX

**Brazilian-specific:**
- Pix/PagSeguro payments (instant payments dominant in Brazil)
- WhatsApp Business API integration
- Boleto Bancário for older members
- CPF/CNPJ fields in member profiles
- "Irmão", "célula", "dízimo" localized terminology

Full feature landscape in [FEATURES.md](./FEATURES.md).

### Architecture Approach

SGI uses a **modern client-heavy SPA with BaaS** architecture. Unlike traditional ChMS platforms (ChurchApps, ChurchCRM) that use Node.js/Express backends, SGI delegates backend concerns to Supabase — PostgreSQL, Auth, Realtime, and PostgREST API — while keeping business logic primarily in React hooks and components.

**Major components:**
1. **Auth Module** — login, session persistence, password recovery, role checks; uses Supabase Auth with `church_id` embedded in JWT `app_metadata`
2. **Members Module** — CRUD members, family linking, department assignment, avatar upload, CSV/PDF export; owns `members`, `families`, `departments` tables
3. **Events Module** — calendar views, event CRUD, registrations, capacity management, recurring events; owns `events`, `event_types`, `registrations` tables
4. **Finance Module** — tithe tracking, fund allocation, sparklines, DRE reports, transaction history; owns `transactions`, `funds`, `budgets` tables
5. **Departments Module** — department CRUD, leader assignment, member counts, vacancy tracking; owns `departments`, `member_departments` tables
6. **Dashboard** — aggregate metrics, sparklines, upcoming events, greetings; read-only views across all modules
7. **UI Shell** — sidebar (desktop), bottom nav (mobile), theme, glassmorphism layout; presentational, no data ownership

**Critical patterns:**
- **RLS-First Multi-Tenancy:** Every table has `church_id uuid NOT NULL` with Row Level Security policies. Never rely only on application-level filtering.
- **Repository-like Hooks:** All Supabase queries encapsulated in custom hooks (`useMembers`, `useEvents`, `useFinances`), keeping components presentational.
- **Atomic Design for UI:** Components structured as `ui/` (atoms), `members/` (organisms), `layout/` (shell) — aligned with Tailwind + glassmorphism.
- **No API Proxy Layer:** Supabase PostgREST IS the API. Don't build Express-style routes that just proxy Supabase.

**Build order:** Auth + Supabase Setup → Members Module → Departments Module → Events Module → Finance Module → Dashboard

Full architecture patterns in [ARCHITECTURE.md](./ARCHITECTURE.md).

### Critical Pitfalls

Top pitfalls extracted from church tech post-mortems and Supabase ecosystem docs:

1. **Multi-Tenant Data Leak via Missing RLS** — One church's data becomes visible to another if RLS is disabled or misconfigured. Since `anon` key is embedded in React frontend, anyone can query the full database without RLS.  
   **Avoid:** Enable RLS + `FORCE ROW LEVEL SECURITY` on every table in migrations. Use `auth.jwt() ->> 'church_id'` in policies. Never expose `service_role` key to client. Add CI check for missing RLS.

2. **The "Feature Checklist" Trap** — Building 15 modules when churches only use 30-40% of them. The rest becomes dead code and confusing UI.  
   **Avoid:** Document top 5 weekly tasks per user role (pastor, secretary, treasurer). Build those deeply first. Use PRD module list as backlog, not launch requirement. Phase delivery: launch core 5 modules; add others based on user feedback.

3. **Mobile Experience as Afterthought** — Dashboard looks great on 1920×1080, but volunteer can't check in guests on iPhone SE. Sidebar invisible, tables require horizontal scroll, "Save" button below fold.  
   **Avoid:** Use 375px (iPhone SE) as primary design target. Implement bottom navigation from day one. All inputs must be tappable (min 44px). Test glassmorphism readability on mobile in bright sunlight.

4. **Data Silos — The "Three Spreadsheet" Problem** — Member data in ChMS, giving in separate platform, events in Google Forms. Pastor can't answer "who attended AND gave AND is in youth group?" without 3 hours of spreadsheet reconciliation.  
   **Avoid:** Design unified data model first: Person → Household → Church → Membership → Groups → Attendance → Giving. Use single Supabase project with shared tables and RLS scoping. Build cross-module reports early.

5. **Financial Module Using Wrong Accounting Model** — Building double-entry (debits/credits) when churches need fund accounting (restricted vs. unrestricted funds). Or single-entry "checkbook" that can't produce contribution statements for tax purposes.  
   **Avoid:** Build fund-based single-entry accounting. Every donation linked to `person_id` (for tax statements) AND `fund_id` (for restricted funds). Include IRS-compliant annual contribution statement generator.

Full pitfalls catalog in [PITFALLS.md](./PITFALLS.md).

## Implications for Roadmap

Based on combined research, suggested phase structure:

### Phase 1: Auth + Supabase Foundation
**Rationale:** Nothing works without authentication and database schema. RLS must be designed before any table is created. This is the highest-risk area (data leak pitfall).
**Delivers:** Supabase project setup, Auth with JWT `church_id` claims, core schema migrations (members, events, transactions, departments tables with RLS), storage buckets with RLS policies, TypeScript type generation from schema
**Addresses:** Foundation for all subsequent phases
**Avoids:** Pitfall #1 (Multi-Tenant Data Leak), Pitfall #8 (Storage RLS Forgotten), Pitfall #3 (Data Silos — unified schema designed upfront)
**Research flag:** Standard patterns — Supabase RLS docs are excellent, Auth patterns well-documented

### Phase 2: Members Module + Data Standards
**Rationale:** Core entity — events, departments, and finance all reference members. Must be built first. Includes duplicate detection and data standards to prevent "dirty database."
**Delivers:** Member CRUD, household linking, department assignment, avatar upload, CSV import with validation, duplicate detection on name/phone/email, status system (active/inactive/visitor/archived), PDF export
**Addresses:** Table stakes: Member Database (CRM)
**Uses:** TanStack Table (member directory), react-hook-form + Zod (forms), @react-pdf/renderer (exports), shadcn/ui components
**Avoids:** Pitfall #7 (Dirty Database), Pitfall #2 (Feature Checklist — focused on core member workflows)
**Research flag:** Needs research — Brazilian CPF/CNPJ validation patterns, duplicate detection algorithms

### Phase 3: Departments + Groups Management
**Rationale:** Brazilian churches organize by departments (Ministério de Jovens, Infantil). Members need department assignment; departments reference members for counts. Build after Members module.
**Delivers:** Department CRUD, leader assignment, member assignment to departments, member counts per department, vacancy tracking, department-based filtering in member directory
**Addresses:** Table stakes: Groups & Department Management; Differentiator: Portuguese-first (Departamentos structure)
**Implements:** Departments Module (ARCHITECTURE.md)
**Avoids:** Pitfall #3 (Data Silos — departments linked to members via `member_departments` junction table)
**Research flag:** Standard patterns — Typical CRUD + junction table, well-understood

### Phase 4: Events + Calendar Module
**Rationale:** Churches live by their calendar (5-15 events/week). Depends on Members (registrations) and Departments (event hosts). Includes recurring event support to avoid manual re-entry.
**Delivers:** Calendar views (month/week/day), event CRUD, registration system, capacity management, recurring events, event reminders via WhatsApp (Phase 5 integration), public event pages
**Addresses:** Table stakes: Event Management & Calendar; Must have for Brazilian churches
**Avoids:** Pitfall #3 (Data Silos — registrations link to members)
**Research flag:** Needs research — WhatsApp Business API integration patterns, recurring event RRULE handling

### Phase 5: Finance Module + Giving
**Rationale:** Financial health depends on recurring gifts. Depends on Members (who gave) and Departments (fund allocation). Must use fund-based single-entry accounting, not double-entry. Generates annual contribution statements for tax compliance.
**Delivers:** Tithe tracking, Pix/Stripe integration, fund allocation, recurring gifts, transaction history, DRE financial reports, sparklines/charts (Recharts), annual contribution statements (PDF), support for Portuguese currency formats
**Addresses:** Table stakes: Online Giving & Donations; Table stakes: Reporting & Analytics
**Avoids:** Pitfall #5 (Wrong Accounting Model), Pitfall #10 (No Report Test — reports ship with module)
**Research flag:** Needs research — Pix API integration (Brazil-specific), PagSeguro/MercadoPago patterns, DRE report legal requirements in Brazil

### Phase 6: Dashboard + Reporting
**Rationale:** Aggregate read-only view across all modules. Build last because it depends on Members, Events, Finance data. Use React Query for caching parallel queries.
**Delivers:** Key metrics cards (member count, giving this month, upcoming events), sparklines, giving trends charts, attendance patterns, "people you should call" alerts (Phase 7 AI prep), quick actions, responsive layout with bottom nav
**Addresses:** Table stakes: Reporting & Analytics; Table stakes: Mobile Access (Dashboard responsive)
**Avoids:** Pitfall #4 (Mobile Afterthought — dashboard tested at 375px), Pitfall #10 (No Report Test — report builder included)
**Research flag:** Standard patterns — Recharts dashboards well-documented, React Query patterns established

### Phase 7: Communication + WhatsApp Integration
**Rationale:** Critical differentiator for Brazilian market. 98% of Brazilians use WhatsApp daily. None of top US platforms (Planning Center, Breeze) support it natively. Segmented messaging by groups/departments.
**Delivers:** Bulk email (via SendGrid/Resend), WhatsApp Business API integration, segmented sending by groups/tags, message templates, delivery tracking, member opt-in/opt-out, event reminders, giving receipts via WhatsApp
**Addresses:** Table stakes: Communication Tools; Differentiator: WhatsApp Integration; Differentiator: Portuguese-First
**Implements:** Communication module with WhatsApp as primary channel
**Avoids:** Pitfall #2 (Feature Checklist — focused on Brazilian-differentiating feature)
**Research flag:** Needs research — WhatsApp Business API (Meta) integration, Brazilian compliance for automated messaging, SendGrid/Resend setup

### Phase 8: Volunteer Management + UX Polish
**Rationale:** Volunteers use the system 20 minutes/week (not 40 hours like staff). UX must be ultra-simple: tap name → confirm → done. Test with actual volunteers over 50 years old.
**Delivers:** Volunteer scheduling, availability tracking, automated reminders, conflict detection, sub requests, self-service check-in (QR code), volunteer portal (minimal UI), mobile-optimized flows (<30 seconds to complete task)
**Addresses:** Table stakes: Volunteer Scheduling; Table stakes: Child Check-In Security; Differentiator: Modern Glassmorphism UI/UX
**Avoids:** Pitfall #6 (Volunteer UX Complexity), Pitfall #4 (Mobile Afterthought — volunteer flows tested on phones)
**Research flag:** Standard patterns — Scheduling algorithms well-understood, QR code check-in established pattern

### Phase Ordering Rationale

- **Dependency-driven:** Members → Departments → Events → Finance → Dashboard. Each phase builds on the previous (events need members for registrations, finance needs members for donations).
- **Risk-first:** Auth + RLS in Phase 1 because data leak is catastrophic and hard to retrofit. Finance accounting model defined in Phase 5 before any financial table is created.
- **Brazilian context prioritized:** WhatsApp integration (Phase 7) and Pix payments (Phase 5) are differentiators, not afterthoughts. Portuguese-first localization throughout.
- **Mobile from day one:** Bottom navigation and 375px testing from Phase 2, not bolted on later.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2:** Brazilian CPF/CNPJ validation patterns, duplicate detection algorithms for Portuguese names
- **Phase 4:** WhatsApp Business API integration patterns (Meta documentation), recurring event RRULE handling
- **Phase 5:** Pix API integration (Brazil-specific), PagSeguro/MercadoPago patterns, DRE report legal requirements in Brazil, fund accounting vs. double-entry decision validation
- **Phase 7:** WhatsApp Business API (Meta) integration, Brazilian compliance for automated messaging (LGPD), SendGrid/Resend setup with pt-BR templates

Phases with standard patterns (skip research-phase):
- **Phase 1:** Supabase RLS + Auth patterns are well-documented in official docs
- **Phase 3:** Departments CRUD + junction table patterns are standard relational database design
- **Phase 6:** Recharts dashboards well-documented, React Query patterns established
- **Phase 8:** Volunteer scheduling algorithms well-understood, QR code check-in established pattern

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified via npm registry + official docs (React 19.2.5, Vite 8.0.10, Tailwind 4.2.4). Supabase JS v2.105.1 verified stable (v3 is beta). |
| Features | HIGH | Validated against 15+ platforms (Planning Center, Breeze, Rock RMS, Pushpay, Realm). Consensus on table stakes. Brazilian context well-documented (Pix, WhatsApp, pt-BR). |
| Architecture | HIGH | Based on ChurchApps, ChurchCRM, and Supabase official docs. RLS-first multi-tenancy is industry standard for Supabase SaaS. Build order validated against component dependencies. |
| Pitfalls | HIGH | Based on 15+ sources from church tech practitioners, post-mortems (2024–2026), and Supabase ecosystem documentation. Top pitfalls validated across multiple post-mortems. |

**Overall confidence:** HIGH — All research files have high confidence ratings. Only Recharts (medium confidence in STACK.md) is a slight uncertainty, but architecture fit is clear.

### Gaps to Address

- **Recharts vs. Nivo vs. Chart.js:** Recharts selected (2.15.0) but based on blog comparisons rather than hands-on testing. May need `/gsd-research-phase` if complex financial charts prove difficult.  
  *Handle:* Build one proof-of-concept chart in Phase 5 planning; pivot to Nivo only if Recharts can't handle DRE report visualizations.

- **Service Worker / PWA Implementation:** PRD specifies PWA but no research was done on service worker patterns for offline-first capability.  
  *Handle:* Phase 6 (Dashboard) or Phase 8 (Volunteer) — use `/gsd-skill gsd-ui-phase` to design PWA offline strategy if needed.

- **LGPD (Brazilian GDPR) Compliance Details:** Pitfalls mention LGPD but no deep research on exact requirements for church data (member photos, giving history).  
  *Handle:* Phase 1 (Auth) — consult Brazilian legal resource or use `/gsd-research-phase` for LGPD compliance checklist before launching.

- **Supabase Realtime Scalability:** Research mentions listener leaks at 10+ subscriptions but no testing on Supabase free tier limits (realtime concurrent connections).  
  *Handle:* Phase 6 (Dashboard) — monitor Supabase dashboard during alpha testing; upgrade tier or optimize subscriptions if hitting limits.

- **WhatsApp Business API Approval Process:** Meta's WhatsApp Business API requires approval and may take weeks. No research on timeline or requirements.  
  *Handle:* Start Phase 7 planning early; consider fallback to WhatsApp Web scraping (unofficial) for MVP if API approval delays.

## Sources

### Primary (HIGH confidence)
- **npm registry** (2026-05-04) — React 19.2.5, Vite 8.0.10, Tailwind 4.2.4, Supabase JS 2.105.1, react-router 7.14.2 version verification
- **Supabase Docs** (supabase.com/docs) — RLS patterns, Auth with JWT claims, PostgREST API, Storage RLS, multi-tenant architecture
- **ChurchStack.io + Scriptured.app** (2026-02-20/22) — Industry standard ChMS features table, table stakes identification across 15+ platforms
- **shadcn/ui** (ui.shadcn.com) — Component library docs, Radix UI + Tailwind integration, CLI usage
- **ChurchApps Architecture Docs** (support.churchapps.org) — Modular monolith patterns, multi-tenant architecture, RLS enforcement

### Secondary (MEDIUM confidence)
- **pkgpulse.com blogs** (2026) — React Hook Form vs. Formik, Recharts vs. Chart.js vs. Nivo, date-fns vs. Day.js, Zustand vs. Redux (blog comparisons, not hands-on)
- **ChurchRaise.ai** (2026-02-17) — Modern church technology stack layers (ChMS, Giving, Comms, Engagement, AI)
- **WebPX Kirchenwerk Case Study** (2026-02-06) — React + TypeScript + Tailwind SaaS architecture with multi-tenant RBAC (similar stack reference)
- **TanStack Table** (tanstack.com/table/v8) — Headless table logic, v8.21.3 API docs

### Tertiary (LOW confidence — needs validation)
- **Dev.to (whoffagents, 2026-04-08)** — PostgreSQL RLS with Supabase (community article, not official docs)
- **ChurchTrac / ChMeetings** — Fund accounting vs. double-entry (single blog posts, not comprehensive analysis)
- **PreBreach.dev** (2026-02-20) — 7 Supabase RLS mistakes (security blog, needs verification against official docs)

---
*Research completed: May 4, 2026*  
*Ready for roadmap: yes*
