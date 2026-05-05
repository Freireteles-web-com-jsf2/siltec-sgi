# CLAUDE.md — Siltec-SGI Project Guide

## Project Context

**Project Name:** Siltec-SGI (Santuário Digital)
**Description:** Plataforma abrangente de gestão de igrejas e ministérios com interface moderna (glassmorphism, Tailwind CSS, React.js)

**Core Value:** Centralizar e simplificar a administração eclesiástica através de uma interface moderna que permite aos líderes focarem em seu propósito comunitário e espiritual.

---

## GSD Workflow

This project uses **Get Shit Done (GSD)** workflow for structured development.

### Current State

- **Milestone:** MVP (Phases 1-6)
- **Current Phase:** Phase 1 — Authentication System
- **Requirements:** 27 v1 requirements defined
- **Mode:** YOLO (auto-approve, just execute)
- **Granularity:** Standard (5-8 phases, 3-5 plans each)
- **Execution:** Parallel (independent plans run simultaneously)

### Key Commands

- `/gsd-discuss-phase 1` — Gather context and clarify approach for Phase 1
- `/gsd-plan-phase 1` — Create detailed plan for Phase 1
- `/gsd-execute-phase 1` — Execute all plans in Phase 1
- `/gsd-progress` — Check project progress and next steps
- `/gsd-next` — Auto-advance to next logical step

### Workflow Stages

1. **Questioning** → PROJECT.md (completed)
2. **Research** → `.planning/research/` (optional)
3. **Requirements** → REQUIREMENTS.md (completed)
4. **Roadmap** → ROADMAP.md (completed)
5. **Discuss Phase** → Gather context (next)
6. **Plan Phase** → Create PLAN.md
7. **Execute Phase** → Run plans with atomic commits
8. **Verify** → Confirm requirements met
9. **Transition** → Update PROJECT.md, move to next phase

---

## Tech Stack

- **Frontend:** React.js (Functional Components + Hooks)
- **Routing:** React Router DOM (SPA)
- **Styling:** Tailwind CSS (utility-first)
- **Typography:** Manrope (headings), Inter (body)
- **Icons:** Material Symbols Outlined (Google)
- **Layout:** Responsive (sidebar desktop, bottom nav mobile)

### Design System

- Glassmorphism effects
- Soft gradients
- Ambient shadow elevation
- Mobile-first (< 768px viewport)

---

## Project Structure

```
.planning/
├── PROJECT.md          # Project context and core value
├── REQUIREMENTS.md     # v1 requirements with REQ-IDs
├── ROADMAP.md          # Phase structure (6 phases)
├── STATE.md            # Project memory and session context
├── config.json         # Workflow preferences
└── research/           # Domain research (optional)
    ├── STACK.md
    ├── FEATURES.md
    ├── ARCHITECTURE.md
    ├── PITFALLS.md
    └── SUMMARY.md
```

---

## Development Guidelines

### Code Style

- Functional Components with Hooks
- Tailwind CSS utility classes
- Mobile-first responsive design
- Component-based architecture

### Git Workflow

- Atomic commits for each task/plan
- Planning docs tracked in version control
- `.planning/` directory is committed

### UI/UX Principles

- Glassmorphism and modern aesthetics
- Smooth transitions and hover effects
- Clear visual hierarchy
- Intuitive navigation (sidebar + bottom nav)

---

## Phase 1: Authentication System

**Requirements:**
- AUTH-01: Login with email/password
- AUTH-02: Password recovery flow
- AUTH-03: "Remember me" session persistence

**Next Step:** Run `/gsd-discuss-phase 1` to gather implementation context.

---

*Generated: 2026-05-05*
*Last updated: 2026-05-05 after project initialization*
