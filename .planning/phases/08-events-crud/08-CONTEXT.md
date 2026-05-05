# Phase 8: Events CRUD - Context

**Gathered:** 2026-05-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementar operações CRUD para eventos com gestão de capacidades, inscrições e eventos recorrentes.

</domain>

<decisions>
## Implementation Decisions

### UI Forms
- **D-01:** Usar Modal overlay para formulários (Mesmo padrão que Members)
- **D-02:** Create e Edit usam modais separados

### Event Features
- **D-03:** Capacidade máxia por evento
- **D-04:** Lista de inscrições por evento
- **D-05:** Eventos recorrentes (semanal)

### Claude's Discretion
- Reutilizar componentes MemberForm (adaptar para eventos)
- Estrutura do formulário: título, data, horário, descrição, capacidade, categoria

</decisions>

<canonical_refs>
## Canonical References

### Project Files
- `.planning/PROJECT.md` — Projeto Siltec-SGI contexto
- `.planning/REQUIREMENTS.md` — Requisitos v2.0
- `.planning/ROADMAP.md` — Fase 8 detalhes
- `.planning/phases/07-members-crud/07-CONTEXT.md` — Decisões UI similares

### Codebase
- `src/pages/EventsPage.jsx` — Página de eventos (leitura apenas)
- `src/services/storage.js` — Storage service existente

### Research
- `.planning/research/FEATURES.md` — Features Events CRUD
- `.planning/research/ARCHITECTURE.md` — Arquitetura

</canonical_refs>

<specifics>
## Specific Ideas

- Modal create: Abre com botão "Criar Evento"
- Modal edit: Abre ao clicar no evento
- Exclusão: Dialog de confirmação
- Gestão de inscrições: Aprovar/rejeitar
- Eventos recorrentes: Opção semanal

</specifics>

<deferred>
## Deferred Ideas

- Check-in QR code (v2)
- Enviar notificação aos participantes (v2)

</deferred>

---

*Phase: 08-events-crud*
*Context gathered: 2026-05-05*