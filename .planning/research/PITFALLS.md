# Pitfalls Research

**Domain:** Church Management System (ChMS / SGI)
**Researched:** 2026-05-04
**Confidence:** HIGH — Based on multiple post-mortems, church tech blogs (2024–2026), and Supabase/React ecosystem docs.

---

## Critical Pitfalls

### Pitfall 1: Multi-Tenant Data Leak via Missing RLS

**What goes wrong:**
One church's data becomes visible to another church. In a SaaS like Siltec-SGI, a missed RLS policy on a single table means Church A can query Church B's member lists, donations, or financial reports via the Supabase client. Since the `anon` key is embedded in the React frontend, anyone who extracts it can query the full database if RLS is disabled or misconfigured.

**Why it happens:**
Supabase RLS is **off by default** on new tables. Developers create tables in migrations, add CRUD operations in React, and forget the `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` step. Alternatively, they write policies with `USING (true)` or forget the `WITH CHECK` clause on INSERT, allowing users to create rows for other tenants. Another common mistake: using the `service_role` key in frontend code (which bypasses all RLS).

**How to avoid:**
- Every migration that creates a table MUST include `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY` (so table owner is also constrained during dev/testing).
- Use a migration template that bakes this in.
- Store `church_id` (tenant ID) on every row that belongs to a church. Index it.
- Write explicit policies for each operation (SELECT, INSERT, UPDATE, DELETE). Never use `USING (true)` except for genuinely public tables (which should contain no private data).
- Inject `church_id` into the JWT `app_metadata` at login so policies can use `auth.jwt() ->> 'church_id'` without subquery overhead.
- Never expose `service_role` key to the client. Use it only in server-side/edge functions.
- Add a CI check: query `pg_tables` + `pg_policies` to fail the build if any table lacks RLS.

**Warning signs:**
- Queries return empty arrays in dev but work for other users in production
- No `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` in migrations
- `service_role` key referenced anywhere in frontend code
- Policies that only cover SELECT but miss INSERT/UPDATE/DELETE

**Phase to address:**
Phase 1 (Auth & Multi-Tenancy Foundation) — RLS must be designed before any table is created.

---

### Pitfall 2: The "Feature Checklist" Trap — Building What Churches Don't Actually Use

**What goes wrong:**
The system launches with 15 modules (groups, events, giving, check-in, volunteers, podcasts, etc.), but church staff only use 30–40% of them. The rest becomes dead code, maintenance burden, and confusing UI. Meanwhile, the 2–3 workflows they actually need (e.g., "who attended this week?" or "send a prayer request") are buried or clunky.

**Why it happens:**
Builders evaluate software by feature checklists: "Does it do check-in? Does it handle groups? Does it have giving?" This rewards breadth over depth. Churches have very specific workflows — a Methodist church tracks confirmation classes; a Baptist church tracks small group attendance; a Pentecostal church tracks altar call responses. One-size-fits-all modules miss these nuances.

**How to avoid:**
- Before building any module, document the top 5 weekly tasks for each user role (pastor, secretary, treasurer, volunteer coordinator).
- Build those 5 tasks first, deeply and well.
- Use the PRD's module list as a *backlog*, not a launch requirement.
- Phase delivery: launch member + finance core first; add groups, events, departments incrementally based on actual user feedback.
- Include a "feedback" mechanism in the UI so users can report what's missing vs. what's unused.

**Warning signs:**
- Building modules no staff member has asked for
- "Feature parity with [competitor]" as the requirement
- More time spent on admin dashboards than on volunteer-facing flows
- No user role identified for a feature during planning

**Phase to address:**
Phase 0 (Discovery) and every subsequent phase — each feature must trace to a real user workflow.

---

### Pitfall 3: Data Silos — The "Three Spreadsheet" Problem

**What goes wrong:**
Member data lives in the ChMS. Giving data lives in a separate giving platform. Event registrations come in through Google Forms. Volunteer schedules are on a WhatsApp group. When the pastor asks "who attended last week AND gave this month AND is in the youth group?", nobody can answer without 3 hours of spreadsheet reconciliation.

**Why it happens:**
The system is built module-by-module without considering cross-module data flows. The finance module doesn't know about member status. The events module doesn't know about small group membership. Each module works in isolation, and there's no unified data model connecting them.

**How to avoid:**
- Design a **unified data model** first: Person → Household → Church → Membership → Groups → Attendance → Giving. All modules reference the same `person_id` and `church_id`.
- Avoid separate databases per module (as some architectures suggest). Use a single Supabase project with shared tables and RLS scoping.
- Build cross-module reports early: "giving by member", "attendance by group", "volunteer hours by department".
- When integrating third-party tools (Stripe for giving, etc.), push data back into the central Supabase rather than treating the external tool as the source of truth.

**Warning signs:**
- Needing to export CSV from one module and import into another
- "We'll build the reports later" said repeatedly
- Separate login for "giving" vs. "members" vs. "events"
- No `person_id` foreign key linking tables across modules

**Phase to address:**
Phase 1 (Data Model & Core Schema) — the unified schema must be designed upfront, not retrofitted.

---

### Pitfall 4: Mobile Experience as an Afterthought

**What goes wrong:**
The React dashboard looks great on a 1920×1080 monitor. Then a volunteer tries to check in guests on an iPhone SE during Sunday rush. The sidebar nav is invisible, tables require horizontal scrolling, and the "Save" button is below the fold. The volunteer gives up and goes back to paper sign-in sheets.

**Why it happens:**
Developers work on large monitors. "Mobile-first" is stated but not enforced. Tailwind classes like `hidden md:block` are added after the fact. Bottom navigation (the PRD's mobile pattern) is bolted on rather than designed in. The PRD specifies `glassmorphism` and gradient effects that look great on desktop but cause tap-target and readability issues on small screens.

**How to avoid:**
- Use the `375px` (iPhone SE) viewport as the primary design target during development. Test on real devices, not just Chrome DevTools.
- Implement bottom navigation (PRD requirement) from day one, not as a later addition.
- All form inputs must be tappable (min 44px touch target). Avoid dense data tables on mobile — use card layouts instead.
- The PRD's `glassmorphism` effects should be tested on mobile: semi-transparent layers over complex backgrounds cause readability issues in bright sunlight (common in church lobbies).
- Use `@media (max-width: 767.98px)` breakpoints consistently. The ChurchCRM migration (GitHub commit e0c5fee) shows the specific CSS patterns needed.

**Warning signs:**
- Only testing on desktop browsers with DevTools toggle
- Tables with many columns used on mobile views
- No bottom nav implemented in Phase 1
- Glassmorphism text becoming unreadable on mobile photos/light backgrounds

**Phase to address:**
Phase 2 (UI Implementation) — mobile-first must be a design constraint from the first component.

---

### Pitfall 5: Financial Module Using Double-Entry When Single-Entry Suffices (or Vice Versa)

**What goes wrong:**
The finance module is built as a double-entry accounting system (debits, credits, general ledger, invoices) because "that's how accounting works." But churches don't invoice customers — they receive donations. The double-entry complexity confuses volunteer treasurers, and the system can't produce contribution statements (required for donors' tax purposes). Alternatively, a single-entry "checkbook" approach is used, but the church grows to need fund accounting with restricted vs. unrestricted funds.

**Why it happens:**
Developers apply business accounting patterns to churches without understanding fund accounting. Churches need to track *designated funds* (Building Fund, Missions, General Operating) — this is **fund accounting**, not double-entry vs. single-entry. The real question is: can the system track "this $500 donation is for the Building Fund and cannot be spent on salaries"?

**How to avoid:**
- Build **fund-based single-entry accounting**: track income/expenses by fund, show fund balances, and enforce that restricted fund money stays in that fund.
- Ensure every donation is linked to a `person_id` (for year-end contribution statements) AND a `fund_id` (for restricted fund tracking).
- Include a "Contribution Statement" generator that produces IRS-compliant annual giving summaries per person.
- Only add double-entry (debits/credits, balance sheet) if the church has payroll, accounts payable, or requires GAAP-compliant financials. Most churches do not need this initially.
- Reference: ChurchTrac, ChMeetings, and Grain Ledger all use fund-based single-entry as their core model.

**Warning signs:**
- "General Ledger" terminology in a church context
- No `fund_id` column on donation/income tables
- No way to generate a per-person annual giving statement
- Invoicing features before donation-tracking features

**Phase to address:**
Phase 4 (Finance Module) — the accounting model must be defined before any financial table is created.

---

### Pitfall 6: Volunteer-Facing Features That Require Training to Use

**What goes wrong:**
The check-in system requires volunteers to navigate a 5-step wizard with dropdowns, modals, and search fields. A new volunteer joins the team on Sunday morning. They can't figure it out. The line backs up. The pastor ends up doing check-in instead of greeting. The feature works perfectly — but nobody uses it.

**Why it happens:**
Features are designed for the administrator (who uses the system 40 hours/week) rather than the volunteer (who uses it 20 minutes/week). Complexity that's tolerable for staff is a barrier for volunteers. The volunteer check-in flow should be: tap name → confirm → done. Not: select event → search name → select household → confirm details → submit.

**How to avoid:**
- For any volunteer-facing flow, the "time to first action" must be under 30 seconds.
- Use QR code check-in: volunteer scans a code sent via SMS/email, confirming attendance in one tap.
- Pre-load volunteer schedules: show "You're serving sound this Sunday" with a single "Confirm" button.
- Avoid multi-step wizards for volunteer tasks. If it takes more than 3 taps, simplify.
- Test with actual volunteers over 50 years old (a significant demographic in many churches).

**Warning signs:**
- Volunteer features requiring a "training session" to use
- More than 3 clicks/taps to complete a volunteer task
- Volunteers asking "can I just write it on paper instead?"
- Volunteer module built identically to admin module (same forms, same density)

**Phase to address:**
Phase 5 (Volunteer & Department Management) — volunteer UX must be a specific design criterion.

---

### Pitfall 7: Member Data Becomes a "Dirty Database"

**What goes wrong:**
After 2 years, the member database has 6,000 records but only 350 active attendees. The rest are duplicates, former members, visitors from 2019, and incomplete entries. Searching for a member returns 4 results with slightly different spellings. Sending a newsletter goes to 2,000 bounced emails. The data is too messy to clean, so nobody trusts it.

**Why it happens:**
No data entry standards during initial import or daily use. Names are entered as "John Smith", "J. Smith", "Smith, John". Phone numbers mix `(555) 123-4567`, `555-123-4567`, and `5551234567`. No validation on required fields. Duplicate detection isn't built in. The initial data import from spreadsheets brings in years of accumulated errors.

**How to avoid:**
- Define data standards **before** the first member is entered: phone format, address format, name fields (first, last, middle — never a single "name" field).
- Build duplicate detection: on member creation, search for matching name/phone/email and warn before creating a new record.
- Include an `active_status` field with clear definitions: Active (attended in last 90 days), Inactive (former member), Visitor (came once), Archived (do not contact).
- Archive (don't delete) old records. Provide a "merge duplicates" admin tool.
- The PRD mentions "Indicadores de Status" — build this status system from day one.
- Run data hygiene audits: 15–25% of church databases have duplicate records (per Scriptured 2026 research).

**Warning signs:**
- No validation on member import forms
- No duplicate detection on `name` + `phone` + `email`
- "Status" field is free-text rather than enum
- No archive/cleanup tool in the admin panel

**Phase to address:**
Phase 3 (Member Management) — data standards and duplicate detection must ship with the member module.

---

### Pitfall 8: Supabase Storage RLS Forgotten on File Uploads

**What goes wrong:**
Church logos, member photos, event banners, and financial documents are uploaded to Supabase Storage. The database tables have RLS, but the storage buckets don't. Church A's member photos are accessible via a predictable URL pattern by Church B. Or worse, a member photo URL from 2023 still works after the member left and requested data deletion (GDPR/privacy compliance issue).

**Why it happens:**
Developers meticulously secure database tables with RLS but treat Supabase Storage as a separate concern. Storage policies use a different syntax (`storage.objects` policies) and are easy to overlook. The default storage bucket is often public or has overly permissive policies.

**How to avoid:**
- Every storage bucket must have storage-level RLS policies linked to `church_id`.
- Use a folder structure: `{church_id}/members/{member_id}/photo.jpg` — then policy checks `storage.foldername` starts with `auth.jwt() ->> 'church_id'`.
- Set up a cleanup cron/function: when a member is archived, delete their associated storage objects.
- Never make member photos publicly accessible via URL. Use signed URLs with short expiry for temporary access.
- Test: log in as Church A, try to access a storage URL from Church B.

**Warning signs:**
- Storage bucket has no policies (public access)
- File URLs are stored without `church_id` in the path
- No cleanup on member delete/archive
- "We'll secure storage later" said during planning

**Phase to address:**
Phase 1 (Auth & Storage Setup) — storage RLS must be configured alongside table RLS.

---

### Pitfall 9: "The Wrong Choice" — Building for the Wrong Church Size

**What goes wrong:**
The system is built for a 2,000-member megachurch with multi-site, campus-level permissions, and complex reporting. But 80% of churches worldwide have fewer than 200 members. The UI is overwhelming, the setup takes 3 hours, and the small-church pastor gives up before finishing onboarding.

**Why it happens:**
Developers build for the most complex case they can imagine, thinking "we can simplify later." But complex architecture is hard to unwind. Multi-site support, campus-level permissions, and advanced reporting add UI complexity that small churches don't need and won't use.

**How to avoid:**
- Target the PRD's audience: the system should feel right for a 100–500 member church.
- Defer multi-site support to a later phase. Single-site with departments/groups should be the MVP.
- Keep onboarding to under 10 minutes for a new church admin: connect Supabase, invite team, import members, start using.
- If multi-site is needed later, it can be added as a `campus_id` column + policies, not a rewrite.

**Warning signs:**
- "Multi-site" mentioned in Phase 1 requirements
- Onboarding flow longer than 5 steps
- Admin dashboard has features for "campus pastors" before having features for "pastors"
- More time spent on scalability than on core workflows

**Phase to address:**
Phase 0 (Architecture Decision) — scope the MVP to the right church size.

---

### Pitfall 10: No "Report Test" — Building Features Nobody Can Get Data Out Of

**What goes wrong:**
The system tracks everything: member attendance, giving, group membership, volunteer hours. But when the pastor asks "how many first-time visitors came in Q1?" or "what's our giving trend over the last 6 months?", the treasurer exports 3 CSV files, opens Excel, and spends 2 hours manually joining data. The system has the data but can't answer basic ministry questions.

**Why it happens:**
Reports are treated as a "Phase 6" concern, built after all modules are complete. By then, the data model has inconsistencies that make reporting difficult. Each module was built in isolation without considering the cross-module queries needed for real reports.

**How to avoid:**
- For each module, define the top 3 reports it must support *before* building the UI.
- Member module → reports: "members by status", "new members this month", "members who haven't attended in 60 days".
- Finance module → reports: "giving by fund", "monthly trend", "top 10 donors", "annual contribution statement".
- Build a basic "Report Builder" early: let admins select a table, add filters, and export CSV/PDF.
- Test the "report test" regularly: pick a real ministry question and time how long it takes to answer from within the system.

**Warning signs:**
- "Reporting" is a Phase 6 item in the roadmap
- No CSV/PDF export on any module
- Data exists but can't be filtered or grouped in the UI
- Treasurer still uses Excel for month-end reports

**Phase to address:**
Every phase — each module must ship with its top 3 reports.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip RLS on "internal only" tables | Faster dev, no policy debugging | One missed `WHERE` clause = data leak | Never — always enable RLS |
| Store `church_id` in React state instead of JWT | Easier to implement initially | Client-side only, policies can't use it, security by obscurity | Never for multi-tenant — use JWT claims |
| Single `members` table without `households` | Simpler schema, fewer joins | Can't model family units, updating family address requires N updates, duplicates abound | MVP only — add household model by Phase 3 |
| Use `any` type in TypeScript for Supabase responses | Faster coding, no type errors | Runtime errors, missing fields not caught, refactoring is dangerous | Never — generate types from Supabase schema |
| Skip indexes on `church_id`, `person_id` | Faster migrations | Queries scan full table, performance degrades linearly with church size | Never — index tenant-scoped columns immediately |
| Hardcode "Admin" role as a string check | Simple permission logic | Can't add new roles without code changes, no granularity | MVP only — design role system properly by Phase 2 |
| Use `onDelete: CASCADE` everywhere | Clean deletes, no orphaned rows | Accidental delete of a church deletes all data with no recovery | Be selective — archive instead of delete for members/donations |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| **Supabase Auth + JWT** | Storing `church_id` only in client React state | Embed `church_id` in JWT `app_metadata` at login; use `auth.jwt() ->> 'church_id'` in RLS policies |
| **Stripe / Giving** | Treating Stripe as source of truth for donation data | Store donation records in Supabase linked to `person_id` + `fund_id`; use Stripe webhooks to update status, but keep your DB as the canonical source |
| **Google Calendar / Outlook** | Bidirectional sync from day one | Start with one-way export (events created in SGI appear in Google). Bidirectional sync is complex (conflict resolution, duplicates) — defer to later phase |
| **WhatsApp / SMS** | Building custom SMS gateway | Use an existing service (Twilio, MessageBird) via Supabase Edge Functions. Don't build telecom infrastructure. |
| **Spreadsheet Import** | Accepting any CSV format | Define a strict template with required columns and validation. Reject imports that don't match. Provide a downloadable template. |
| **Email Service (SendGrid/Resend)** | Sending from the browser | Email sending must go through Edge Functions with `service_role`. Never expose email API keys to the client. |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| RLS subquery on every row (`organization_id IN (SELECT ...)`) | Queries take 8+ seconds with 100K rows | Add index on `organization_id`; use `STABLE` function; consider JWT claims to avoid subquery | ~100K rows per tenant |
| No pagination on member/transaction lists | Dashboard takes 5+ seconds to load with 1,000+ members | Implement cursor-based pagination (not offset) from day one. Show max 50 rows per page. | ~500 members |
| Real-time subscriptions on large tables | Browser becomes unresponsive, Supabase Realtime overwhelmed | Only subscribe to specific rows (`eq('church_id', user.church_id)`). Unsubscribe on unmount. Limit real-time to <5 channels per client. | ~10 simultaneous subscriptions |
| `glassmorphism` + gradient backgrounds on mobile | Scroll lag, janky frame rate on low-end phones | Test on iPhone SE / Moto G. Use `transform` and `opacity` for animations (GPU-accelerated). Avoid `box-shadow` on scrollable lists. | Any mobile device with <3GB RAM |
| No database connection pooling | "Too many connections" error under 50 concurrent users | Supabase handles pooling, but monitor `pg_stat_activity`. Use Supabase's built-in pooling (PgBouncer). | ~50 concurrent DB connections |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| `service_role` key in `.env` accessible to frontend bundle | **CRITICAL**: Full database access for any user, RLS completely bypassed | `service_role` key only in Edge Function environment variables. Frontend uses `anon` key only. Verify with a build-time check. |
| Member personal data (address, phone) exposed in API responses to unauthorized staff | Privilege escalation: volunteer sees pastor notes, treasurer sees member addresses they shouldn't | Row-level + column-level security. Use Postgres views or GraphQL-style field selection. Implement role-based field visibility in the API layer. |
| No rate limiting on login/register endpoints | Brute force attacks on church admin accounts | Supabase Auth has built-in rate limiting. Don't disable it. Add CAPTCHA on registration if open signup. |
| Member photos accessible via predictable URLs without auth | Privacy violation: anyone with the URL can see member photos | Use Supabase Storage signed URLs with short expiry. Never make member photos publicly readable. |
| Church data not backed up / no disaster recovery plan | **CRITICAL**: Total data loss if database is corrupted or accidentally deleted | Supabase provides automated backups. Verify backup frequency. Document restore procedure. Consider additional application-level backup (export members + donations to encrypted storage weekly). |
| GDPR / LGPD compliance ignored (Brazil) | Legal: fines, mandatory breach disclosure, member lawsuits | Implement "right to be forgotten" (delete member + storage). Get explicit consent for data collection. Provide data export. Log all data access. PRD is for a Brazilian church — LGPD applies. |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Using corporate language ("constituents", "case management") instead of ministry language ("members", "pastoral notes") | Pastors feel the system doesn't "speak their language"; adoption drops | Use ministry terminology throughout. The PRD uses "Santuário Digital" — extend this Portuguese ministry language to all UI text. |
| Dashboard shows 20+ metrics on first load | Overwhelming for volunteers and pastors; they can't find the 2 metrics they care about | Progressive disclosure: show 3–5 key metrics (attendance, giving, member count). "View more" expands to full dashboard. |
| Forms require many required fields for member registration | Volunteers skip the system and go back to paper; incomplete data accumulates | Minimal viable entry: name + phone/email to start. "Complete profile" prompted later. The PRD's member table should have minimal required fields. |
| No offline support for check-in/onboarding | Volunteers can't check in members when internet drops during Sunday service | For MVP: show clear "offline" message. For Phase 5+: implement offline-first with background sync (enable service workers or use React Query's `onlineManager`). |
| "Save" buttons that don't show loading/success state | User clicks twice, creates duplicate records; or thinks system is broken | Every form action must show loading spinner + success toast. Disable button during submission. |
| No confirmation on destructive actions (delete member, delete event) | Accidental deletes cause data loss and panic | Confirmation dialog for all destructive actions. Show "undo" option for 5 seconds after delete (soft delete pattern). |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Member Management**: Often missing **duplicate detection** — verify that creating a member with the same phone/email warns the user
- [ ] **Authentication**: Often missing **password reset flow** — verify that "Forgot Password" sends email and allows reset
- [ ] **Multi-Tenancy**: Often missing **church isolation test** — verify that Church A cannot query Church B's data via Supabase client
- [ ] **Giving/Finance**: Often missing **annual contribution statement** — verify that a per-person, per-year giving summary can be generated
- [ ] **Events**: Often missing **recurring event support** — verify that weekly "Sunday Service" doesn't require manual re-entry every week
- [ ] **Mobile**: Often missing **bottom navigation** on screens <768px — verify that the mobile layout uses bottom nav, not hidden sidebar
- [ ] **Data Export**: Often missing **CSV/PDF export** on all modules — verify that any table can be exported
- [ ] **Member Photos**: Often missing **storage RLS** — verify that member photos are scoped to `church_id` in Supabase Storage
- [ ] **Roles**: Often missing **role-based field visibility** — verify that volunteers can't see pastoral notes or treasurer data
- [ ] **LGPD Compliance**: Often missing **data deletion** — verify that deleting a member removes their storage objects and can be exported before deletion

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| **RLS missing on table** | LOW | Enable RLS + add policy in a migration. No data loss. Deploy immediately. |
| **Data duplicate mess (20%+ duplicates)** | MEDIUM | Build "Merge Duplicates" admin tool. Show potential duplicates. Let admin confirm merge. Update all foreign keys to surviving record. Archive duplicates. |
| **Wrong accounting model (double vs. single entry)** | HIGH | Export all financial data. Redesign schema. Re-import with correct fund accounting. Requires data migration script + verification. |
| **`service_role` key exposed in frontend** | HIGH | Rotate `service_role` key immediately in Supabase dashboard. Audit access logs for unauthorized queries. Check if any data was accessed. Notify affected churches if breach occurred. |
| **Mobile UX is unusable** | MEDIUM | Audit all forms/tables on 375px viewport. Create "Mobile UX" ticket per page. Implement bottom nav, touch-friendly inputs, card layouts. May require component redesign. |
| **No LGPD compliance** | MEDIUM | Add "Export My Data" endpoint. Add "Delete My Data" with confirmation. Document data retention policy. Add consent checkboxes to member registration. |
| **Feature creep — built 15 modules, nobody uses 10** | HIGH | Sunset unused modules. Hide behind feature flags. Focus team on deepening the 5 core modules. Communicate changes to users. |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Multi-Tenant Data Leak (RLS) | Phase 1: Auth & Multi-Tenancy | Log in as Church A, try to query Church B's data via Supabase client. Must return 0 rows. |
| Feature Checklist Trap | Phase 0: Discovery | Every feature traces to a user role's top 5 weekly tasks. |
| Data Silos | Phase 1: Data Model & Schema | `person_id` foreign keys exist across members, giving, attendance, groups tables. |
| Mobile Afterthought | Phase 2: UI Implementation | All pages tested at 375px. Bottom nav present. Touch targets ≥44px. |
| Wrong Accounting Model | Phase 4: Finance Module | Every donation has `fund_id`. Annual contribution statement generates correctly. |
| Volunteer UX Complexity | Phase 5: Volunteers & Departments | Volunteer check-in flow takes <30 seconds. Tested with non-technical users. |
| Dirty Database | Phase 3: Member Management | Duplicate detection on member creation. Data standards documented. |
| Storage RLS Forgotten | Phase 1: Auth & Storage | Storage URLs for Church A return 403 when accessed by Church B. |
| Wrong Church Size Target | Phase 0: Architecture | Onboarding completes in <10 minutes for a 200-member church pastor. |
| No Report Test | Every Phase | "Report test" run monthly: pick a ministry question, answer it within 2 minutes from the UI. |

---

## Sources

- **Scriptured Blog (2026-02-22)** — "Church Management Software: The Complete 2026 Buyer's Guide" — common mistakes: over-buying features, ignoring mobile, not planning for growth, data cleaning before migration. https://blog.scriptured.app/blog/church-management-software-guide/
- **ChurchRaise Blog (2026-02-17)** — "The Modern Church Technology Stack: What Every Church Needs in 2026" — common stack mistakes: buying overlapping tools, ignoring communication layer, choosing complexity over simplicity. https://www.churchraise.ai/blog/modern-church-technology-stack
- **The Unstuck Group (2026-02-11)** — "8 Reasons Why Your ChMS Isn't Working" — adoption failures: software too complicated, not integrated with ministries, control over impact mindset. https://theunstuckgroup.com/8-reasons-why-your-chms-isnt-working/
- **Relius Blog (2025-01-05)** — "Why Most Church Software Fails" — real reasons adoption fails: language mismatch, solving wrong problem, too many clicks, no support relationship, nobody owns rollout. https://relius.ai/blog/why-church-software-fails/
- **Religious Product News (2022-01-10)** — "Are You Making These 3 Mistakes with Your Church Management Software?" — Wrong Choice, Wrong Implementation, Insufficient Training. https://www.religiousproductnews.com/church-technology-are-you-making-these-3-mistakes-with-your-church-management-software/
- **SIIT Blog** — "Breaking Free From Common Church Management System Mistakes" — poor data management, integration failures, scalability neglect, security breaches. https://siit.co/blog/breaking-free-from-common-church-management-system-mistakes/16868
- **Supabase RLS Docs + KowashLab (2026-02-18)** — "Supabase Row Level Security: Production Patterns & Common Pitfalls" — 7 critical RLS mistakes that expose entire database. https://kowashlab.com/blog/supabase-row-level-security-patterns
- **Dev.to (whoffagents, 2026-04-08)** — "PostgreSQL Row-Level Security with Supabase: Multi-Tenant Data Isolation" — common mistakes: forgetting RLS, using app-level IDs, exposing service_role key. https://dev.to/whoffagents/postgresql-row-level-security-with-supabase-multi-tenant-data-isolation-216l
- **PreBreach (2026-02-20)** — "The 7 Supabase RLS Mistakes That Expose Your Entire Database" — no RLS, over-permissive SELECT, missing INSERT/UPDATE policies, service_role in client. https://www.prebreach.dev/blog/supabase-rls-mistakes-database-security
- **ChurchTrac** — "Why Your Church Needs Single-Entry Accounting" — double-entry vs. single-entry for churches, fund accounting requirements. https://www.churchtrac.com/articles/why-your-church-needs-single-entry-accounting
- **ChMeetings Blog (2026-03-05)** — "Church Accounting Guide" — consistency at entry, fund assignment at point of entry, real-time balances. https://www.chmeetings.com/blog/church-accounting-guide-2/
- **Church Office Online** — "Church Data Entry Best Practices" — standardized formats, consistent entry, defined member types. https://www.churchofficeonline.com/blog/church-data-entry-best-practices/
- **Concordia Technology (2025-06-24)** — "Understanding Databases in Your Church Management Software" — household vs. person table design, many-to-many relationships for attendance. https://resources.concordiatechnology.org/blog/understanding-databases-in-your-church-management-software
- **WebPX Kirchenwerk Case Study (2026-02-06)** — React + TypeScript + Tailwind SaaS architecture, multi-tenant with role-based access, real-time with Convex. https://webpx.de/en/blog/kirchenwerk-church-management
- **ChurchCRM GitHub (commit e0c5fee, 2026-04-07)** — Mobile responsive review after Tabler/BS5 migration: CSS patterns for 375px–768px viewports. https://github.com/ChurchCRM/CRM/commit/e0c5feefc3178241803275263cbc39b2456bf6ec
- **Pushpay Blog (2026-03-26)** — "Why Your Church Tech Stack is Fragmented" — data silos, manual reconciliation, costs of fragmented systems. https://pushpay.com/blog/church-tech-stack-consolidation/
- **Aplos Academy (2022-02-28)** — "5 Best Practices for Utilizing Your Church Database" — pastor buy-in, people details/notes, consistency, data maintenance, security/privacy. https://www.aplos.com/academy/5-best-practices-for-utilizing-your-church-database
- **ChurchSpring (2025-10-17)** — "Build a Mobile-First Church Website" — mobile UX requirements: speed, tap targets, sermon playback, clear next steps. https://churchspring.com/blog/mobile-first-church-website-growth/

---

*Pitfalls research for: Church Management System (Siltec-SGI / Santuário Digital)*
*Researched: 2026-05-04*
*Confidence: HIGH — based on 15+ sources from church tech practitioners, post-mortems, and Supabase ecosystem documentation.*
