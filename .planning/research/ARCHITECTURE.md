# Architecture Patterns

**Domain:** Church Management System (SGI - Sistema de Gestão de Igrejas)
**Researched:** 2026-05-04
**Confidence:** HIGH (based on ChurchApps, ChurchCRM, and Supabase official docs)

## Recommended Architecture for Siltec-SGI

Siltec-SGI uses a **modern client-heavy SPA with BaaS (Backend-as-a-Service)** architecture. Unlike traditional ChMS platforms that use Node.js/Express backends (ChurchApps, ChurchCRM), Siltec-SGI delegates backend concerns to Supabase — PostgreSQL, Auth, Realtime, and PostgREST API — while keeping business logic primarily in the React frontend.

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (Client)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           React SPA (React Router DOM)               │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │   │
│  │  │  Auth    │ │ Dashboard│ │ Members  │   ...      │   │
│  │  │ Component│ │ Component│ │ Component│            │   │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘            │   │
│  │       │             │             │                    │   │
│  │  ┌────▼────────────▼────────────▼─────┐             │   │
│  │  │      Supabase Client (@supabase/ssr) │             │   │
│  │  └────────────────┬────────────────────┘             │   │
│  └───────────────────┼──────────────────────────────────┘   │
└───────────────────────┼──────────────────────────────────────┘
                        │ HTTPS (REST / Realtime WebSocket)
┌───────────────────────▼──────────────────────────────────────┐
│                    Supabase Platform                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Auth    │  │PostgREST │  │ Realtime │  │ Storage │ │
│  │(GoTrue)  │  │  (API)   │  │ (WS)     │  │ (S3)    │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬────┘ │
│       │              │              │              │       │
│  ┌────▼──────────────▼──────────────▼──────────────▼────┐  │
│  │              PostgreSQL (RLS-enabled)                │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │  │
│  │  │ members  │ │ events   │ │ finances │  ...       │  │
│  │  └──────────┘ └──────────┘ └──────────┘           │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Boundaries

| Component | Responsibility | Communicates With | Data Ownership |
|-----------|---------------|-------------------|-----------------|
| **Auth Module** | Login, session persistence, password recovery, role checks | Supabase Auth, all protected routes | `auth.users` (Supabase managed) |
| **Dashboard** | Aggregate metrics, sparklines, upcoming events, greetings | Members API, Events API, Finance API | Read-only views across all modules |
| **Members Module** | CRUD members, family linking, department assignment, avatar upload, CSV/PDF export | Supabase `members` table, Storage (avatars) | `members`, `families`, `departments` |
| **Events Module** | Calendar views, event CRUD, registrations, capacity management, recurring events | Supabase `events` table, `registrations` | `events`, `event_types`, `registrations` |
| **Finance Module** | Tithe tracking, fund allocation, sparklines, DRE reports, transaction history | Supabase `transactions`, `funds` tables | `transactions`, `funds`, `budgets` |
| **Departments Module** | Department CRUD, leader assignment, member counts, vacancy tracking | Supabase `departments`, `member_departments` | `departments`, `member_departments` |
| **UI Shell** | Sidebar (desktop), Bottom Nav (mobile), theme, glassmorphism layout | All modules (wraps them in layout) | No data ownership — presentational |

### Supabase-Specific Boundary Rules

- **Row Level Security (RLS)** enforces that each church only sees its own data. Every table MUST have a `church_id` column with RLS policies.
- **Supabase Client** runs in the browser — no traditional "backend server" needed. Business logic lives in:
  - React components (UI state)
  - Custom hooks (data fetching with React Query or direct `supabase.from()`)
  - PostgreSQL functions (complex queries, if needed)
- **Storage** bucket `member-avatars` for profile photos, `event-banners` for event images.

## Data Flow

### Primary Flow: Member Lookup (Example)

```
User navigates to /membros
        │
        ▼
MembersPage (Server Component if using Next.js, or Client Component)
        │
        ▼
useEffect / React Query hook fires
        │
        ▼
supabase.from('members')
  .select(`
    id, name, photo_url, status, department_id,
    departments(name),
    contact_info
  `)
  .eq('church_id', user.church_id)
  .order('name')
        │
        ▼
PostgREST → PostgreSQL (RLS checks church_id automatically)
        │
        ▼
JSON response → React state → Render table with filters
```

### Cross-Module Flow: Dashboard Aggregation

```
DashboardPage loads
        │
        ├──┬→ supabase.from('members').select('count', { count: 'exact' })
        │  └→ supabase.from('members').select('*').eq('status', 'active')
        │
        ├──┬→ supabase.from('transactions').select('amount, created_at') (this week)
        │  └→ supabase.from('funds').select('*') (allocation)
        │
        ├──┬→ supabase.from('events').select('*').gte('date', today).limit(1) (next event)
        │  └→ supabase.from('events').select('*').eq('date', today) (today's events)
        │
        ▼
Parallel Promise.all() → Aggregate metrics → Render cards + sparklines
```

### Realtime Flow: Event Registration Update

```
User registers for event on /eventos
        │
        ▼
supabase.from('registrations').insert({
  event_id, member_id, church_id, ...
})
        │
        ▼
PostgreSQL writes → Realtime broadcasts 'INSERT' on 'registrations' channel
        │
        ▼
Other connected clients (event admin dashboard) receive:
  supabase.channel('registrations')
    .on('postgres_changes', { event: 'INSERT', ... }, (payload) => {
      setRegistrations(prev => [payload.new, ...prev])
    })
        │
        ▼
UI updates immediately — no page refresh needed
```

## Patterns to Follow

### Pattern 1: Repository-like Hooks (Data Access Layer)

**What:** Encapsulate all Supabase queries in custom hooks, keeping components clean.

**When:** Every module (members, events, finance, departments).

**Why:** Components stay presentational. If Supabase schema changes, only hooks need updates.

**Example:**
```typescript
// hooks/useMembers.ts
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export function useMembers(churchId: string, filters?: {
  departmentId?: string
  status?: 'active' | 'inactive'
}) {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true)
      let query = supabase
        .from('members')
        .select(`
          *,
          departments(id, name),
          member_departments(department_id)
        `)
        .eq('church_id', churchId)

      if (filters?.departmentId) {
        query = query.eq('member_departments.department_id', filters.departmentId)
      }
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      const { data, error } = await query.order('name')

      if (error) { setError(error); setMembers([]) }
      else { setMembers(data || []) }
      setLoading(false)
    }
    fetchMembers()
  }, [churchId, filters?.departmentId, filters?.status])

  return { members, loading, error }
}
```

### Pattern 2: RLS-First Multi-Tenancy

**What:** Every table has `church_id`, and RLS policies enforce isolation at the database level.

**When:** All tables from day one.

**Why:** Church data is sensitive. Application-level checks can be bypassed; RLS cannot.

**Example:**
```sql
-- Enable RLS on members table
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see members from their own church
CREATE POLICY "members_church_isolation" ON members
  FOR ALL USING (church_id = (auth.jwt() ->> 'church_id')::uuid);

-- The Supabase client automatically sends the JWT; RLS uses it
```

### Pattern 3: Server Components for Initial Load (if Next.js) / Direct Client Fetch (if CRA/Vite)

**What:** Load data on the server (SEO, no loading flash) or directly in the client with React Query.

**When:** Dashboard (lots of parallel queries), Reports (heavy aggregations).

**Note:** The PRD specifies React.js with React Router DOM (SPA), NOT Next.js. Therefore:
- Use **React Query (@tanstack/react-query)** for caching, background refetch, optimistic updates.
- Use **Supabase direct client calls** in custom hooks (as shown in Pattern 1).
- No Server Components — this is a client-side SPA.

### Pattern 4: Atomic Design for UI Components

**What:** Structure UI components following Atomic Design principles, aligned with Tailwind + glassmorphism.

**When:** All UI work.

**Structure:**
```
components/
├── ui/                  # Atoms (Button, Card, Input, Badge, Avatar)
│   ├── Button.tsx       # Uses Tailwind + glass-effect classes
│   ├── Card.tsx         # Glassmorphism Card wrapper
│   └── ...
├── members/             # Molecules/Organisms specific to Members
│   ├── MemberTable.tsx
│   ├── MemberFilters.tsx
│   └── MemberForm.tsx
├── events/              # Molecules/Organisms specific to Events
│   ├── EventCard.tsx
│   ├── CalendarView.tsx
│   └── ...
└── layout/              # Shell components
    ├── Sidebar.tsx      # Desktop sidebar
    ├── BottomNav.tsx    # Mobile bottom nav
    └── DashboardShell.tsx
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: No RLS (Application-Level Tenant Checks Only)

**What:** Relying only on `query.eq('church_id', churchId)` in the frontend without RLS.

**Why bad:** A savvy user can intercept API calls and remove the filter. RLS is enforced at the database level — it cannot be bypassed from the client.

**Instead:** Always enable RLS + policies on every table, even if you also filter in the client query.

### Anti-Pattern 2: Monolithic API Routes (Unnecessary for Supabase)

**What:** Building Express-style API routes in the React app (e.g., Next.js API routes or a separate Node server) that just proxy Supabase.

**Why bad:** Supabase PostgREST IS your API. Adding a proxy layer adds latency, complexity, and another point of failure.

**Instead:** Call Supabase directly from React hooks using the Supabase client. Use PostgreSQL functions (RPC) only for complex logic that can't be expressed in a single query.

### Anti-Pattern 3: Fat Components (Business Logic in JSX)

**What:** Putting data fetching, filtering, and transformation directly in the component body.

**Why bad:** Hard to test, reuse, or refactor. Components become 300+ lines.

**Instead:** Extract data logic into custom hooks (`useMembers`, `useEvents`, `useFinances`). Extract derived data into selectors or `useMemo`.

### Anti-Pattern 4: No Loading/Error Boundaries

**What:** Assuming Supabase queries always succeed and render immediately.

**Why bad:** Network issues, RLS rejections, or schema mismatches cause blank screens or cryptic errors.

**Instead:** Always handle `loading` and `error` states. Use React Query for automatic retries and error handling, or manual checks in hooks.

## Scalability Considerations

| Concern | At 100 members | At 1,000 members | At 10,000+ members |
|---------|----------------|------------------|---------------------|
| **Member list** | Simple `select *` — fast | Add pagination (20/page) | Server-side pagination + search (supabase `.range()` + `.ilike()`) |
| **Event registrations** | Inline list | Paginated modal | Separate registrations page with filters |
| **Finance reports** | Client-side aggregation | Move to PostgreSQL functions (RPC) | Materialized views for monthly summaries |
| **Realtime listeners** | 1-2 channels | ~5 channels per church | Channel management: subscribe/unsubscribe on unmount; avoid listener leaks |
| **Dashboard metrics** | Parallel queries on page load | Add React Query caching (5-min stale time) | Precompute aggregates in a `metrics` table via PostgreSQL triggers or cron |

## Database Schema Implications (Key Tables)

Based on research and the PRD, these are the core tables with their relationships:

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  members    │─────│member_depts  │─────│ departments   │
│ (people)    │1   n│ (junction)   │n   1│ (ministries) │
└─────┬───────┘     └──────────────┘     └──────────────┘
      │
      │
      │     ┌──────────────┐     ┌──────────────┐
      └────│ registrations │────│   events     │
            │ (event signup)│     │ (calendar)   │
            └──────────────┘     └──────┬───────┘
                                         │
                                         │
            ┌──────────────┐     ┌──────▼───────┐
            │  funds       │─────│transactions  │
            │ (allocations)│     │ (giving/donations)
            └──────────────┘     └──────────────┘
```

**Critical:** Every table above needs `church_id uuid NOT NULL` and RLS policies.

## Build Order Implications for Roadmap

Based on component dependencies, the recommended build order is:

| Phase | Module | Why This Order |
|-------|--------|----------------|
| 1 | **Auth + Supabase Setup** | Foundation: nothing works without auth and database schema |
| 2 | **Members Module** | Core entity — events, departments, and finance all reference members |
| 3 | **Departments Module** | Members need department assignment; departments reference members for counts |
| 4 | **Events Module** | Depends on members (registrations) and departments (event hosts) |
| 5 | **Finance Module** | Depends on members (who gave) and departments (fund allocation) |
| 6 | **Dashboard** | Aggregate read-only view across all above modules; build last |

**Dependency Graph:**
```
Auth → Members → Departments → Events → Finance → Dashboard
                ↓                ↓         ↓
           (department      (member     (member
            assignment)     reg)      transactions)
```

## Sources

| Source | Confidence | Notes |
|--------|-----------|-------|
| [ChurchApps Architecture Docs](https://support.churchapps.org/docs/developer/api/) | HIGH | Modular monolith, module structure, controller-repository pattern |
| [ChurchApps Project Overview](https://support.churchapps.org/docs/developer/setup/project-overview/) | HIGH | Component inventory, multi-tenant architecture, frontend-backend split |
| [ChurchApps Database Docs](https://support.churchapps.org/docs/developer/api/database) | HIGH | Database-per-module, RLS patterns, churchId scoping |
| [Supabase Architecture Docs](https://supabase.com/docs/guides/getting-started/architecture) | HIGH | PostgREST, Realtime, Auth, RLS — official documentation |
| [Supabase SSR Auth Guide](https://designrevision.com/blog/supabase-auth-nextjs) | HIGH | Three-client pattern (browser/server/middleware), RLS integration |
| [Modern Church Technology Stack 2026](https://www.churchraise.ai/blog/modern-church-technology-stack) | MEDIUM | Layer model (ChMS, Giving, Comms, Website, Engagement, AI) |
| [ChurchCRM Features Overview](https://docs.churchcrm.io/getting-started/features-overview) | MEDIUM | Open-source ChMS feature mapping (families, persons, donations, groups) |
| [ChurchCRM Default Schema](https://github.com/ChurchCRM/CRM/wiki/default.schema) | MEDIUM | Table structure reference for traditional LAMP-stack ChMS |
| [OpenFaith GitHub](https://github.com/FaithBase-AI/openfaith) | MEDIUM | Modern approach: Canonical Data Model, adapter pattern, Edge-based relationships |
| [Church Center GitHub](https://github.com/JoelPallero/Church-Center) | LOW | Vanilla PHP approach — useful contrast but not directly applicable to React+Supabase stack |
