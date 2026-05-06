# Phase 14: Financial Analytics - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Desenvolver análises financeiras com visualização de tendências, comparações e projeções.

**Requirements (do roadmap):**
- FIN-ANA-01: Balanço financeiro mensal
- FIN-ANA-02: Orçado vs realizado
- FIN-ANA-03: Relatório de dízimos por membro
- FIN-ANA-04: Projeções financeiras simples

</domain>

<decisions>
## Implementation Decisions

### Fonte de dados
- **D-01:** Usar dados reais do localStorage (`siltec_transactions`)
  - Estrutura: id, description, amount, type (entrada/saída), date, category

### Tipos de relatórios
- **D-02:** Balanço mensal com gráfico de barras (entradas vs saídas)
- **D-03:** Comparativo orçado vs realizado (usar valores simulados para orçado)
- **D-04:** Relatório de dízimos agrupados por membro
- **D-05:** Projeção simples baseada em tendência linear dos últimos 3 meses

### UI/Layout
- **D-06:** Reutilizar componentes criados nas Phases 11-13
- **D-07:** Gráfico de barras para balanço mensal
- **D-08:** Gráfico de linha para projeções
- **D-09:** Tabela para relatório de dízimos

### Claude's Discretion
- Valores orçados simulados (não há sistema de orçamento ainda)
- Formato de moeda brasileira (R$ com separador de milhares)

</decisions>

<canonical_refs>
## Canonical References

**Fontes de dados (localStorage):**

### Transações `siltec_transactions`
- Estrutura de dados em: `src/services/storage.js` (linhas 288-338)
- Funções: `getTransactions()`, `getTransactionsByType(type)`, `getMonthlyTotals()`

### Componentes Reutilizáveis
- `src/components/analytics/MetricCard.jsx` - Cards de métricas
- `src/components/analytics/FinancialTrendsChart.jsx` - Gráfico de tendências
- `src/components/analytics/MemberGrowthChart.jsx` - Gráfico de linha Recharts

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **MetricCard.jsx:** Cards reutilizáveis com glassmorphism
- **FinancialTrendsChart.jsx:** Gráfico de barras Recharts (entradas vs saídas)
- **getMonthlyTotals():** Função já existente em storage.js para agregações

### Established Patterns
- Dados em localStorage com chave `siltec_transactions`
- Cálculos de métricas no componente usando useMemo
- Valores em Reais (R$)

### Integration Points
- Nova página: `pages/FinancialAnalyticsPage.jsx`
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

*Phase: 14-financial-analytics*
*Context gathered: 2026-05-06*