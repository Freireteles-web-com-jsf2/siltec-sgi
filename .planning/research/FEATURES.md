# Feature Landscape

**Domain:** Church Management System (SGI - Sistema de Gestão de Igrejas)
**Researched:** May 4, 2026
**Confidence:** HIGH (validated against 15+ platforms and industry guides)

## Table Stakes

Features users expect. Missing = product feels incomplete. Based on analysis of Planning Center, Breeze, Rock RMS, Pushpay, Realm, and 10+ other platforms.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Member Database (CRM)** | Every ChMS core function - stores contact info, family relationships, membership status | Low-Med | Must include: profiles, households/families, custom fields, duplicate detection, photo/avatar |
| **Attendance Tracking** | Pastors need to know who's coming, spot engagement trends, identify drifting members | Low-Med | Service attendance, small groups, events. Check-in for children's ministry is critical |
| **Online Giving & Donations** | 32% higher donation consistency with online giving (Scriptured 2026). Recurring gifts = #1 driver of consistent giving | Med | Card/ACH/Apple Pay/Google Pay, recurring gifts, text-to-give, automatic receipts, year-end statements |
| **Event Management & Calendar** | Churches run 5-15 events/week. Need centralized calendar, registration, capacity limits | Med | Event creation, RSVP, payment collection, calendar sync, public event pages |
| **Communication Tools (Email/SMS)** | Primary way to reach members. Segmentation by groups/tags essential | Med | Bulk email, SMS/text, segmented sending, templates, delivery tracking, WhatsApp (critical for Brazilian market) |
| **Volunteer Scheduling** | Churches run on volunteers. Prevents "who's serving?" chaos on Sundays | Med-High | Self-service scheduling, availability tracking, automated reminders, conflict detection, sub requests |
| **Groups & Department Management** | Small groups = discipleship. Departments = ministry structure | Low-Med | Small groups, ministry teams, cells, department structure, group leaders, membership rosters |
| **Reporting & Analytics** | Leaders need data to make decisions: giving trends, attendance patterns, group health | Med | Dashboards, giving reports, attendance trends, tax statements, engagement metrics |
| **Child Check-In Security** | Parents expect secure check-in for kids. Legal/liability issue | Med-High | Name tags, pickup codes, allergy alerts, kiosk mode, parent notifications |
| **Mobile Access (Responsive/App)** | Volunteers check schedules on phones. Members give from phones. Mobile-first is non-negotiable in 2026 | Med | Responsive web + optional native app. PWA (Progressive Web App) is minimum |
| **User Roles & Permissions** | Multiple staff roles need different access levels (pastor vs secretary vs volunteer) | Med | Role-based access control (RBAC), granular permissions by module |

## Differentiators

Features that set product apart. Not expected, but valued. Based on gaps in current market (Planning Center, Breeze, etc.).

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Modern Glassmorphism UI/UX** | Current ChMS platforms have dated interfaces (Realm, Church Windows). Modern design = faster adoption, less training | Med | Already in PRD: glassmorphism, gradients, Manrope/Inter fonts, mobile-first responsive |
| **WhatsApp Integration** | Brazilian/Latin American churches rely on WhatsApp. None of top US platforms (Planning Center, Breeze) support it natively | Med-High | Send messages via WhatsApp API, member opt-in, group messaging, payment notifications |
| **AI-Powered Insights** | Predict giving trends, identify at-risk members (drifting), suggest follow-up actions | High | Giving anomaly detection, engagement scoring, visitor-to-member conversion tracking, "people you should call" alerts |
| **Portuguese-First Localization** | 100% of top ChMS are US-centric (Planning Center charges American prices, no WhatsApp, no Boleto/Pix) | Med | Full pt-BR language, Pix payment support, Brazilian date/currency formats, local compliance |
| **Supabase Real-Time Backend** | Most ChMS use traditional REST APIs. Real-time = instant updates across devices, better UX | Med | Already chosen: Supabase Auth, PostgreSQL, real-time subscriptions, Row Level Security |
| **Member Self-Service Portal** | Members update their own info, view giving history, RSVP to events, access member directory | Med | Reduces admin workload. ChMeetings and Realm do this well - SGI should too |
| **Offline-First Capability** | Rural churches or poor connectivity. Can check-in, record attendance offline, sync later | High | Service workers, local database, background sync. Nice-to-have for Brazilian context |
| **Integrated Sermon/Media Management** | Churches stream sermons, manage media libraries. Separate tools = friction | Med | Sermon archive, video embeds, notes, sharing. Subsplash does this well |
| **QuickBooks/Accounting Integration** | Churches need fund accounting. Building full accounting = distraction | Low-Med | Sync with Aplos, QuickBooks, or provide export. Realm bundles accounting - SGI should integrate instead |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Building Own Payment Processor** | Stripe, Pushpay, PagSeguro exist. Payment processing = regulatory nightmare (PCI compliance) | Integrate Stripe (global) + PagSeguro/MercadoPago (Brazil). Already in roadmap via Supabase |
| **Full Church Accounting System** | Massive scope creep. Fund accounting is complex (QuickBooks, Aplos do it well) | Provide reports/exports for accountants. Integrate with existing tools via API |
| **Desktop-Only or Electron App** | Churches need mobile access. Desktop-only = dead product in 2026 | Web-first with responsive design. PWA for "app-like" experience |
| **Over-Customization (Too Many Settings)** | Analysis paralysis. Breeze wins because it's simple. Too many options = users confused | Opinionated defaults. Smart presets for Brazilian churches. Settings only where needed |
| **Building Own Email/SMTP Server** | Email deliverability is hard. Will get marked as spam. Use dedicated services | Integrate SendGrid, Mailchimp, or use WhatsApp for primary communication |
| **Multi-Campus/Enterprise Features (Phase 1)** | Most churches are <200 members. Enterprise features complicate UX for 90% of users | Build for small-to-mid churches first. Multi-site as later add-on module |
| **Deprecated Features (Flash, old browsers)** | Don't support IE11, old Android. Wastes development time | Modern browsers only (Chrome, Firefox, Safari, Edge latest versions) |
| **Complex Workflow Builder (Phase 1)** | Planning Center's workflows are powerful but complex. Breeze wins on simplicity | Simple automations first (welcome emails, follow-up reminders). Advanced workflows later |
| **Social Media Management** | Churches use Buffer, Hootsuite. Not core to church management | Focus on core ChMS. Integrate with social tools via API if needed |

## Feature Dependencies

```
Member Database → Attendance Tracking (links attendance to people)
Member Database → Giving (donations linked to donor profiles)
Member Database → Groups (members assigned to groups/departments)
Member Database → Communication (segmented messaging by groups/tags)
Event Management → Check-In (events need secure check-in)
Event Management → Communication (event reminders, RSVP notifications)
Volunteer Scheduling → Events (volunteers scheduled for specific events)
Giving → Reporting (financial reports from donation data)
Groups → Volunteer Scheduling (group members can be volunteers)
WhatsApp Integration → Communication (WhatsApp as a messaging channel)
Member Portal → Member Database (members view/edit own profiles)
AI Insights → Member Database + Giving + Attendance (needs data to analyze)
```

## MVP Recommendation

Prioritize for initial launch (based on industry standards and PRD):

1. **Member Database** - Core of everything. Must have first.
2. **Groups/Departments Management** - Already in PRD (`/grupos`). Critical for Brazilian church structure.
3. **Event Management & Calendar** - Already in PRD (`/eventos`). Churches live by their calendar.
4. **Basic Giving/Donations** - Already in PRD (`/financeiro`). Recurring gifts = financial health.
5. **Communication (Email + WhatsApp)** - Critical for Brazilian market. Differentiator.
6. **Dashboard/Reports** - Already in PRD (Dashboard `/`). Leaders need to see metrics.

Defer:
- **Advanced AI Insights** - Needs data first. Phase 2-3 feature.
- **Native Mobile App** - PWA is sufficient for MVP. Native app later.
- **Child Check-In Kiosk** - Important but can launch without it.
- **Volunteer Scheduling** - Manual scheduling works initially. Automate later.
- **Member Self-Service Portal** - Nice-to-have. Phase 2 feature.
- **Offline-First** - Edge case for MVP.

## Brazilian Church Context (Specific to SGI)

Based on research, Brazilian churches have unique needs vs. US-centric platforms:

| Need | Why | Solution |
|-----|-----|----------|
| **Pix/PagSeguro Payments** | Pix is dominant in Brazil (instant payments) | Integrate Pix API + PagSeguro for online giving |
| **WhatsApp Communication** | 98% of Brazilians use WhatsApp daily | WhatsApp Business API integration for church messaging |
| **Boleto Bancário** | Older members still use boleto for donations | Generate boleto for those without Pix/cards |
| **Portuguese (pt-BR)** | All top ChMS are English-only or bad Portuguese | Native pt-BR with local idioms ("irmão", "célula", "dízimo") |
| **CNPJ/CPF Fields** | Brazilian tax identification required | Member profiles include CPF/CNPJ fields |
| **Church Structure (Departamentos)** | Brazilian churches organize by departments (Ministério de Jovens, Infantil, etc.) | Already in PRD: `/grupos` with department structure |

## Sources

- **Planning Center Feature Comparison** (ChurchStack.io, 2026-02-20) - Industry standard features
- **Church Management Software Buyer's Guide** (Scriptured.app, 2026-02-22) - Core functions table
- **15 Best Church Management Software 2026** (ChurchMemberPro, 2025-11-15) - Pricing and feature comparison
- **Best Church Management Software 2026** (LeadSpark, 2026-03-30) - Platform comparison
- **Pushpay vs Realm Comparison** (Pushpay.com, 2022-10-05) - Enterprise feature differentiation
- **10 Church Management System Features That Matter Most** (TheLeadPastor.com, 2024-06-18) - Table stakes identification
- **Why Church Software Fails** (Relius.ai, 2025-01-05) - Anti-patterns and pitfalls
- **ChMeetings All Features** (chmeetings.com) - Comprehensive feature list reference
- **Rock RMS Features** (rockrms.com) - Open-source ChMS capabilities
- **ChurchStacks Features** (churchstacks.com) - AI modules in modern ChMS
- **Project PRD** (docs/prd-siltec-sgi.md) - SGI specific requirements already defined

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table Stakes Identification | HIGH | Validated against 15+ platforms. Consensus across all sources. |
| Differentiators | HIGH | Based on gap analysis vs. top 5 platforms. WhatsApp/Pix = clear advantage in Brazil. |
| Anti-Features | MEDIUM | Based on industry best practices and anti-patterns. Some may be debatable (offline-first). |
| Brazilian Context | HIGH | Well-documented needs. Pix/WhatsApp are non-negotiable in Brazil. |
| Feature Dependencies | HIGH | Logical relationships. Validated against Planning Center module structure. |
| MVP Prioritization | HIGH | Aligns with PRD and industry "start small" recommendations. |
