---
wave: 1
depends_on: []
requirements_addressed: [FIN-ANA-01, FIN-ANA-02, FIN-ANA-03, FIN-ANA-04]
files_modified:
  - src/App.jsx
  - src/components/layout/SidebarLayout.jsx
files_created:
  - src/pages/FinancialAnalyticsPage.jsx
  - src/components/analytics/BalanceChart.jsx
  - src/components/analytics/TitheReportTable.jsx
  - src/components/analytics/ProjectionChart.jsx
autonomous: false
---

# Phase 14: Financial Analytics

<objective>
Desenvolver análises financeiras com visualização de tendências, comparações e projeções.
</objective>

<read_first>
- src/services/storage.js
- src/pages/AnalyticsPage.jsx
- src/components/analytics/FinancialTrendsChart.jsx
- .planning/phases/14-financial-analytics/14-CONTEXT.md
</read_first>

<tasks>

## Task 1: Criar componentes de analytics financeiro

<action>
Criar em src/components/analytics/:
- BalanceChart.jsx — Gráfico de barras balanço mensal (entradas vs saídas)
- TitheReportTable.jsx — Tabela de dízimos por membro
- ProjectionChart.jsx — Gráfico de linha com projeção simples
</action>

<acceptance_criteria>
- 3 arquivos criados em src/components/analytics/
- Cada componente exporta default Component
- Usam Recharts para gráficos
</acceptance_criteria>

## Task 2: Criar FinancialAnalyticsPage

<action>
Criar src/pages/FinancialAnalyticsPage.jsx:
- Importar MetricCard, FinancialTrendsChart, BalanceChart, TitheReportTable, ProjectionChart
- Buscar dados via getTransactions(), getMembers()
- Cards: Total receitas, Total despesas, Saldo, Projeção próximo mês
- Gráficos organizados em grid responsivo
- Seção: Tabela de dízimos
- Saudação personalizada
</action>

<acceptance_criteria>
- Página renderiza sem erros
- Cards mostram métricas calculadas de localStorage
- Gráficos exibem dados reais
- Layout responsivo
</acceptance_criteria>

## Task 3: Adicionar rota em App.jsx

<action>
Adicionar import e rota em src/App.jsx:
```jsx
import FinancialAnalyticsPage from './pages/FinancialAnalyticsPage';

<Route
  path="/financial-analytics"
  element={
    <RequireAnyRole roles={['treasurer', 'super_admin', 'leader']}>
      <SidebarLayout><FinancialAnalyticsPage /></SidebarLayout>
    </RequireAnyRole>
  }
/>
```
</action>

<acceptance_criteria>
- Rota /financial-analytics existe
- Acesso para treasurer, super_admin e leader
</acceptance_criteria>

## Task 4: Adicionar link no Sidebar

<action>
Adicionar item em SidebarLayout.jsx na seção "Geral":
```jsx
{ name: 'Análises Financeiras', path: '/financial-analytics', icon: '💰', roles: ['treasurer', 'leader', 'super_admin'] }
```
</action>

<acceptance_criteria>
- Link visível no sidebar para tesoureiros e líderes
- Ícone apropriado
- Navegação funcional
</acceptance_criteria>

</tasks>

<verification>
- [ ] npm run build passa sem erros
- [ ] /financial-analytics retorna FinancialAnalyticsPage
- [ ] Gráficos mostram dados reais de transações
- [ ] Tabela de dízimos lista membros corretos
- [ ] Projeção calculada corretamente
</verification>