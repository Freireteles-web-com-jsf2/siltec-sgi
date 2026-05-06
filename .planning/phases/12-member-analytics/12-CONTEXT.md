# Phase 12: Member Analytics - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementar análises detalhadas de membros com métricas de engajamento, crescimento e retenção.

**Requisitos (do roadmap):**
- MEMB-ANA-01: Relatório de crescimento de membros
- MEMB-ANA-02: Membros por status
- MEMB-ANA-03: Taxa de retenção
- MEMB-ANA-04: Membros ausentes frequentes
- MEMB-ANA-05: Filtros analíticos para membros

</domain>

<decisions>
## Implementation Decisions

### Fonte de dados
- **D-01:** Usar dados reais do localStorage (`siltec_members`)
  - Estrutura: id, name, email, phone, status, department, registeredAt, avatar

### Tipos de relatórios
- **D-02:** Crescimento mensal, trimestral e anual
- **D-03:** Filtros por status (ativo, inativo, novo)
- **D-04:** Cálculo de taxa de retenção baseado em membros ativos vs inativos
- **D-05:** Identificação de membros ausentes (sem participação em eventos recentes)

### UI/Layout
- **D-06:** Reutilizar componentes criados na Phase 11 (MetricCard, MemberGrowthChart)
- **D-07:** Gráficos de linha para crescimento temporal
- **D-08:** Cards para métricas de status
- **D-09:** Tabela para membros ausentes

### Claude's Discretion
- Estilo específico dos filtros
- Animações e transições

</decisions>

<canonical_refs>
## Canonical References

**Fontes de dados (localStorage):**

### Membros `siltec_members`
- Estrutura de dados em: `src/services/storage.js` (linhas 1-59)
- Funções: `getMembers()`, `getMemberById(id)`

### Eventos e Inscrições (para ausência)
- Eventos: `siltec_events` - `src/services/storage.js` (linhas 62-105)
- Inscrições: `siltec_registrations` - `src/services/storage.js` (linhas 107-172)

### Componentes Reutilizáveis
- `src/components/analytics/MetricCard.jsx` - Cards de métricas
- `src/components/analytics/MemberGrowthChart.jsx` - Gráfico de crescimento

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **MetricCard.jsx:** Cards reutilizáveis com glassmorphism
- **MemberGrowthChart.jsx:** Gráfico de linha Recharts
- **AnalyticsPage.jsx:** Layout de referência para nova página

### Established Patterns
- Dados em localStorage com chave `siltec_members`
- Filtros e métricas calculados no componente usando useMemo

### Integration Points
- Nova página: `pages/MemberAnalyticsPage.jsx`
- Adicionar rota em `App.jsx`
- Adicionar link no sidebar (em seção Geral)

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

*Phase: 12-member-analytics*
*Context gathered: 2026-05-06*