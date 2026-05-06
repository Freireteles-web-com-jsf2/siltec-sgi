---
wave: 1
depends_on: []
requirements_addressed: [ANLT-01, ANLT-02, ANLT-03, ANLT-04, ANLT-05]
files_modified:
  - package.json
  - src/App.jsx
  - src/components/layout/SidebarLayout.jsx
  - src/pages/AnalyticsPage.jsx
files_created:
  - src/components/analytics/MetricCard.jsx
  - src/components/analytics/MemberGrowthChart.jsx
  - src/components/analytics/DepartmentChart.jsx
  - src/components/analytics/EngagementMetrics.jsx
  - src/components/analytics/FinancialTrendsChart.jsx
autonomous: false
---

# Phase 11: Analytics Dashboard

<objective>
Criar dashboard analítico principal com visão geral de todos os módulos e métricas principais. Inclui gráficos de crescimento, distribuição por departamento, métricas de engajamento e tendências financeiras.
</objective>

<read_first>
- src/services/storage.js
- src/pages/DashboardPage.jsx
- src/components/layout/SidebarLayout.jsx
- src/App.jsx
</read_first>

<tasks>

## Task 1: Instalar dependência Recharts

<action>
Instalar recharts:
```bash
npm install recharts
```
</action>

<acceptance_criteria>
- package.json contém recharts em dependencies
- npm install completa sem erros
</acceptance_criteria>

## Task 2: Criar componentes de gráficos

<action>
Criar diretório src/components/analytics/ com arquivos:
- MetricCard.jsx — Card para métricas individuais
- MemberGrowthChart.jsx — Gráfico de linha/barra crescimento
- DepartmentChart.jsx — Gráfico pizza/barra distribuição
- EngagementMetrics.jsx — Métricas engajamento
- FinancialTrendsChart.jsx — Gráfico receitas/despesas
</action>

<acceptance_criteria>
- 5 arquivos criados em src/components/analytics/
- Cada componente exports default Component
</acceptance_criteria>

## Task 3: Criar AnalyticsPage

<action>
Criar src/pages/AnalyticsPage.jsx:
- Importar componentes de analytics
- Buscar dados via storage.js (getMembers, getDepartments, getEvents, getTransactions)
- Renderizar dashboard com métricas calculadas
- Aplicar styling glassmorphism consistente
- Incluir saudação personalize "Dashboard Analítico"
</action>

<acceptance_criteria>
- Arquivo criado em src/pages/
- Componente renderiza sem erros
- Usa dados do localStorage
- Layout responsivo mobile-first
</acceptance_criteria>

## Task 4: Adicionar rota em App.jsx

<action>
Adicionar rota para /analytics em App.jsx:
```jsx
<Route path="/analytics" element={<AnalyticsPage />} />
```
</action>

<acceptance_criteria>
- Rota /analytics existe
- Navigates para AnalyticsPage corretamente
</acceptance_criteria>

## Task 5: Adicionar link no Sidebar

<action>
Adicionar item de menu em SidebarLayout.jsx:
- Ícone de gráfico/estatísticas
- Label "Analytics" ou "Análises"
- Link para /analytics
</action>

<acceptance_criteria>
- Link visível no sidebar
- Clique navega para AnalyticsPage
- Estilo consistente com outros itens
</acceptance_criteria>

</tasks>

<verification>
- [ ] npm install recharts completa
- [ ] /analytics retorna AnalyticsPage
- [ ] sidebar mostra link Analytics
- [ ] Dashboard exibe métricas de membros eventos finanças
</verification>