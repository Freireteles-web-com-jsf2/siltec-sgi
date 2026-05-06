# Phase 11: Analytics Dashboard - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Criar dashboard analítico principal com visão geral de todos os módulos e métricas principais.

**Requisitos (do roadmap):**
- ANLT-01: Dashboard analítico com visão geral
- ANLT-02: Gráficos de crescimento de membros
- ANLT-03: Distribuição de membros por departamento
- ANLT-04: Métricas de engajamento
- ANLT-05: Tendências financeiras

</domain>

<decisions>
## Implementation Decisions

### Fonte de Dados
- **D-01:** Usar dados reais do localStorage existente
  - Membros: `siltec_members`
  - Eventos: `siltec_events`
  - Departamentos: `siltec_departments`
  - Transações: `siltec_transactions`
  - Inscrições: `siltec_registrations`

### Estrutura de Dados Disponível
Cada entidade contém:
- **Membros:** id, name, email, phone, status, department, role, registeredAt, avatar
- **Eventos:** id, name, date, time, location, type, description, registered, status, registrations
- **Departamentos:** id, name, leader, members[], subgroups[], status
- **Transações:** id, type (entrada/saida), amount, date, category, description
- **Inscrições:** eventoId → [{memberId, memberName, status, registeredAt}]

### Claude's Discretion
- Biblioteca de gráficos (a escolher)
- Tipos de visualizações (linha, pizza, barras)
- Layout específico dos cards

</decisions>

<canonical_refs>
## Canonical References

**Fontes de dados (localStorage):**

### Membros `siltec_members`
- Estrutura de dados em: `src/services/storage.js` (linhas 1-59)
- Funções: `getMembers()`, `getMemberById(id)`, `saveMember(member)`

### Eventos `siltec_events`
- Estrutura de dados em: `src/services/storage.js` (linhas 62-105)
- Funções: `getEvents()`, `getEventById(id)`, `getRegistrations(eventId)`

### Departamentos `siltec_departments`
- Estrutura de dados em: `src/services/storage.js` (linhas 211-286)
- Funções: `getDepartments()`, `getDepartmentById(id)`

### Transações `siltec_transactions`
- Estrutura de dados em: `src/services/storage.js` (linhas 288-338)
- Funções: `getTransactions()`, `getTransactionsByType(type)`, `getMonthlyTotals()`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **storage.js:** Já possui funções de leitura aggregation (`getMonthlyTotals()`)
- **DashboardPage.jsx:** Layout existente para referência
- **Tailwind CSS v4:** Disponível para estilização

### Established Patterns
- Dados em localStorage com chave prefixada (`siltec_*`)
- Estrutura de dados com `id`, `status`, timestamps

### Integration Points
- Nova página: `pages/AnalyticsPage.jsx`
- Adicionar rota em `App.jsx`
- Adicionar link no sidebar

</code_context>

<specifics>
## Specific Ideas

**Sem requisitos específicos ainda** — aberta para abordagem padrão.

</specifics>

<deferred>
## Deferred Ideas

**Nenhuma ideia adiada** — discussão ficou dentro do escopo da fase.

</deferred>

---

*Phase: 11-analytics-dashboard*
*Context gathered: 2026-05-06*