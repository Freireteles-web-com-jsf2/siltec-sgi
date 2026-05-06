# Phase 13: Event Analytics - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Criar painel de eventos com métricas de participação, popularidade e tendências.

**Requisitos (do roadmap):**
- EVT-ANA-01: Taxa de participação em eventos
- EVT-ANA-02: Eventos mais populares
- EVT-ANA-03: Tendência de participação
- EVT-ANA-04: Média de participantes por tipo

</domain>

<decisions>
## Implementation Decisions

### Fonte de dados
- **D-01:** Usar dados reais do localStorage (`siltec_events`, `siltec_registrations`)
  - Eventos: id, name, date, type, registered, status, registrations
  - Inscrições: eventId → [{memberId, memberName, status, registeredAt}]

### Tipos de relatórios
- **D-02:** Taxa de participação = (inscritos com status 'approved' / capacidade total) * 100
- **D-03:** Ranking de eventos por popularidade (mais inscritos)
- **D-04:** Gráfico de linha mostrando tendência de participação ao longo do tempo
- **D-05:** Média de participantes agrupados por tipo de evento

### UI/Layout
- **D-06:** Reutilizar componentes criados nas Phases 11 e 12
- **D-07:** Gráficos de barras para ranking e médias
- **D-08:** Gráfico de linha para tendências temporais

### Claude's Discretion
- Estilo específico dos gráficos
- Animações de transição

</decisions>

<canonical_refs>
## Canonical References

**Fontes de dados (localStorage):**

### Eventos `siltec_events`
- Estrutura de dados em: `src/services/storage.js` (linhas 62-105)
- Funções: `getEvents()`, `getEventById(id)`, `getRegistrations(eventId)`

### Inscrições `siltec_registrations`
- Estrutura em: `src/services/storage.js` (linhas 107-172)
- Funções: `getRegistrations(eventId)`, `addRegistration()`, `approveRegistration()`

### Componentes Reutilizáveis
- `src/components/analytics/MetricCard.jsx` - Cards de métricas
- `src/components/analytics/MemberGrowthChart.jsx` - Gráfico de linha Recharts

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **MetricCard.jsx:** Cards reutilizáveis com glassmorphism
- **MemberGrowthChart.jsx:** Gráfico de linha Recharts (pode ser adaptado)
- **MemberFilters.jsx:** Padrão de filtros

### Established Patterns
- Dados em localStorage com chave `siltec_events` e `siltec_registrations`
- Cálculos de métricas no componente usando useMemo

### Integration Points
- Nova página: `pages/EventAnalyticsPage.jsx`
- Adicionar rota em `App.jsx`
- Adicionar link no sidebar (seção Geral)

</code_context>

<specifics>
## Specific Ideas

**Sem requisitos específicos ainda** - aberta para abordagem padrão.

</specifics>

<deferred>
## Deferred Ideas

**Nenhuma ideia adiada** - discussão ficou dentro do escopo da fase.

</deferred>

---

*Phase: 13-event-analytics*
*Context gathered: 2026-05-06*