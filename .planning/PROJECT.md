# Siltec-SGI

## What This Is

O **Siltec-SGI** (Santuário Digital) é uma plataforma abrangente de gestão de igrejas e ministérios projetada para líderes religiosos, pastores e administradores. O sistema moderniza a administração eclesiástica (mordomia), oferecendo uma interface elegante, intuitiva e centralizada para acompanhamento de membros, controle financeiro, organização de eventos e estruturação de departamentos.

## Core Value

Centralizar e simplificar a administração eclesiástica através de uma interface moderna que permite aos líderes focarem em seu propósito comunitário e espiritual em vez de tarefas administrativas complexas.

## Requirements

### Validated

- [x] **AUTH-01**: Usuário pode acessar o sistema com e-mail e senha (Phase 1)
- [x] **AUTH-02**: Usuário pode recuperar senha através de fluxo de recuperação (Phase 1)
- [x] **AUTH-03**: Usuário pode optar por "Lembrar-me" para persistência de sessão (Phase 1)
- [x] **DASH-01**: Usuário visualiza resumo personalizado com saudação e métricas (Phase 2)
- [x] **MEMB-01**: Usuário visualiza indicadores de status da saúde cadastral (Phase 3)
- [x] **EVT-01**: Usuário visualiza card promocional de mega eventos (Phase 4)
- [x] **FIN-01**: Usuário visualiza visão holística do capital operacional (Phase 5)
- [x] **GRP-01**: Usuário visualiza estatísticas de engajamento (Phase 6)

### Active

- [x] **MEMB-CRUD-01**: Usuário pode cadastrar novo membro (Phase 7)
- [x] **MEMB-CRUD-02**: Usuário pode editar detalhes de membro (Phase 7)
- [x] **EVT-CRUD-01**: Usuário pode criar novo evento (Phase 8)
- [x] **EVT-CRUD-05**: Usuário pode gerenciar inscrições (Phase 8) — com seleção de membros
- [x] **DEPT-CRUD-01**: Usuário pode criar departamento (Phase 9)
- [x] **FIN-CRUD-01**: Usuário pode criar transação (Phase 10)

### Out of Scope

- Módulo de relatórios nativos (DRE e gráficos gerenciais) — planejado para versão futura com Supabase
- Controle e acompanhamento de Escalas (Voluntários) — planejado para versão futura
- Integração completa com Supabase Auth — MVP usará autenticação simulada
- Aplicativo mobile nativo — foco inicial em PWA responsivo
- Módulo de comunicação (chat, e-mail marketing) — fora do escopo do MVP

## Context

O Siltec-SGI surge da necessidade de modernizar a administração eclesiástica, tradicionalmente realizada de forma manual ou com ferramentas fragmentadas. O sistema adota princípios modernos de UX/UI para facilitar a adoção por líderes religiosos que podem não ter familiaridade com sistemas complexos.

**Módulos principais identificados:**
- Autenticação segura
- Dashboard com visão geral
- Gestão de Membros
- Eventos e Agenda
- Financeiro
- Departamentos e Grupos

## Constraints

- **Tech Stack**: React.js com Functional Components e Hooks, Tailwind CSS, React Router DOM
- **Design System**: Uso rigoroso de glassmorphism, gradientes suaves, elevação suave (ambient-shadow)
- **Tipografia**: Manrope (títulos/destaques) e Inter (corpo de texto)
- **Ícones**: Material Symbols Outlined (Google)
- **Layout**: Responsivo mobile-first (sidebar em desktop, bottom navigation em mobile)
- **Viewport**: Adaptação para viewports < 768px
- **Assets**: Reuso de links online estáticos para assets visuais, lucide-react ou material-symbols para iconografia

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React.js + Tailwind CSS | Stack moderna, fácil prototipagem, ampla adoção | — Pending |
| Design System Glassmorphism | Diferenciação visual, modernidade, alinhado ao "Santuário Digital" | — Pending |
| Mobile-first Responsivo | Líderes precisam acessar de qualquer dispositivo | — Pending |
| Supabase para persistência futura | Integração nativa prevista, MVP pode usar dados simulados | — Pending |

---

## Current Milestone: v2.0 CRUD Operations ✓

**Goal:** Adicionar operações CRUD completas aos módulos principais (Membros, Eventos, Departamentos, Financeiro)

**Status:** ✅ COMPLETO em 2026-05-06

**Completed Phases:**
- Phase 7: Members CRUD ✓
- Phase 8: Events CRUD ✓ (com seleção de membros)
- Phase 9: Departments CRUD ✓
- Phase 10: Financial CRUD ✓

**Next:** v3.0 — Novas funcionalidades (planejamento pendente)

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

*Last updated: 2026-05-06 after v2.0 milestone completion*
