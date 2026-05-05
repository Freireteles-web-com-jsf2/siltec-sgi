# Phase 9: Departments CRUD - Context

**Gathered:** 2026-05-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementar operações CRUD para departamentos com gestão de líderes, membros e sub-grupos.

</domain>

<decisions>
## Implementation Decisions

### UI Forms
- **D-01:** Usar Modal overlay para formulários (Mesmo padrão)
- **D-02:** Create e Edit usam modais separados

### Department Features
- **D-03:** Atribuir/alterar líder
- **D-04:** Gerenciar membros do departamento
- **D-05:** Sub-grupos dentro do departamento

### Claude's Discretion
- Estrutura: nome, ícone, líder, capacidade, descrição

</decisions>

<canonical_refs>
## Canonical References

- `.planning/PROJECT.md` — Projeto contexto
- `.planning/REQUIREMENTS.md` — Requisitos v2.0
- `.planning/ROADMAP.md` — Fase 9 detalhes
- `.planning/phases/07-members-crud/07-CONTEXT.md` — Decisões UI
- `src/pages/DepartmentsPage.jsx` — Página atual

</canonical_refs>

<specifics>
## Specific Ideas

- Modal create/Edit para departamentos
- Líder como dropdown de membros existentes
- Sub-grupos como lista dentro do departamento

</specifics>

<deferred>
## Deferred Ideas

- Calendário de departamento (v2)
- Relatórios de departamento (v2)

</deferred>

---

*Phase: 09-departments-crud*
*Context gathered: 2026-05-05*