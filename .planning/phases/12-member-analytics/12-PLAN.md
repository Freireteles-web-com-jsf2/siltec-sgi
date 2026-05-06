---
wave: 1
depends_on: []
requirements_addressed: [MEMB-ANA-01, MEMB-ANA-02, MEMB-ANA-03, MEMB-ANA-04, MEMB-ANA-05]
files_modified:
  - src/App.jsx
  - src/components/layout/SidebarLayout.jsx
files_created:
  - src/pages/MemberAnalyticsPage.jsx
  - src/components/analytics/MemberFilters.jsx
  - src/components/analytics/RetentionChart.jsx
  - src/components/analytics/AbsentMembersTable.jsx
autonomous: false
---

# Phase 12: Member Analytics

<objective>
Implementar análises detalhadas de membros com métricas de engajamento, crescimento e retenção.
</objective>

<read_first>
- src/services/storage.js
- src/pages/AnalyticsPage.jsx
- src/components/analytics/MemberGrowthChart.jsx
- .planning/phases/12-member-analytics/12-CONTEXT.md
</read_first>

<tasks>

## Task 1: Criar componentes de filtro e retenção

<action>
Criar src/components/analytics/MemberFilters.jsx:
- Filtros por status (ativo, inativo, novo)
- Filtros por departamento
- Filtros por período (mês, trimestre, ano)
- Usar Tailwind CSS e glassmorphism

Criar src/components/analytics/RetentionChart.jsx:
- Gráfico de linha mostrando taxa de retenção
- Reutilizar Recharts (LineChart)
- Cálculo: (membros ativos / total) * 100
</action>

<acceptance_criteria>
- MemberFilters.jsx exporta componente funcional
- RetentionChart.jsx renderiza gráfico de retenção
- Filtros funcionam com state local
</acceptance_criteria>

## Task 2: Criar tabela de membros ausentes

<action>
Criar src/components/analytics/AbsentMembersTable.jsx:
- Listar membros sem participação em eventos no último trimestre
- Colunas: Nome, Departamento, Última participação, Status
- Usar dados de siltec_members e siltec_registrations
- Estilo glassmorphism consistente
</action>

<acceptance_criteria>
- Tabela exibe membros ausentes
- Dados calculados corretamente do localStorage
- Layout responsivo
</acceptance_criteria>

## Task 3: Criar MemberAnalyticsPage

<action>
Criar src/pages/MemberAnalyticsPage.jsx:
- Importar componentes: MetricCard, MemberGrowthChart, MemberFilters, RetentionChart, AbsentMembersTable
- Buscar dados via getMembers(), getEvents(), getRegistrations()
- Cards: Total membros, Ativos, Inativos, Novos este mês, Taxa retenção
- Gráficos: Crescimento (reutilizar MemberGrowthChart), Retenção
- Seção: Filtros + Tabela ausentes
- Saudação personalizada
</action>

<acceptance_criteria>
- Página renderiza sem erros
- Cards mostram métricas corretas
- Gráficos exibem dados reais do localStorage
- Filtros funcionam
</acceptance_criteria>

## Task 4: Adicionar rota em App.jsx

<action>
Adicionar import e rota em src/App.jsx:
```jsx
import MemberAnalyticsPage from './pages/MemberAnalyticsPage';

<Route
  path="/member-analytics"
  element={
    <RequireAnyRole roles={['leader', 'super_admin']}>
      <SidebarLayout><MemberAnalyticsPage /></SidebarLayout>
    </RequireAnyRole>
  }
/>
```
</action>

<acceptance_criteria>
- Rota /member-analytics existe
- Acesso restrito a leaders e super_admin
</acceptance_criteria>

## Task 5: Adicionar link no Sidebar

<action>
Adicionar item em SidebarLayout.jsx na seção "Geral":
```jsx
{ name: 'Análises Membros', path: '/member-analytics', icon: '👥', roles: ['leader', 'super_admin'] }
```
</action>

<acceptance_criteria>
- Link visível no sidebar para líderes
- Ícone apropriado
- Navegação funcional
</acceptance_criteria>

</tasks>

<verification>
- [ ] npm run build passa sem erros
- [ ] /member-analytics retorna MemberAnalyticsPage
- [ ] Gráficos mostram dados reais
- [ ] Filtros funcionam corretamente
- [ ] Tabela ausentes lista membros corretos
</verification>