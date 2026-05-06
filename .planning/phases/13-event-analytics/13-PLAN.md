---
wave: 1
depends_on: []
requirements_addressed: [EVT-ANA-01, EVT-ANA-02, EVT-ANA-03, EVT-ANA-04]
files_modified:
  - src/App.jsx
  - src/components/layout/SidebarLayout.jsx
files_created:
  - src/pages/EventAnalyticsPage.jsx
  - src/components/analytics/EventParticipationChart.jsx
  - src/components/analytics/PopularEventsChart.jsx
  - src/components/analytics/ParticipationTrendChart.jsx
  - src/components/analytics/AverageParticipantsChart.jsx
autonomous: false
---

# Phase 13: Event Analytics

<objective>
Criar painel de eventos com métricas de participação, popularidade e tendências.
</objective>

<read_first>
- src/services/storage.js
- src/pages/AnalyticsPage.jsx
- src/components/analytics/MetricCard.jsx
- .planning/phases/13-event-analytics/13-CONTEXT.md
</read_first>

<tasks>

## Task 1: Criar componentes de gráficos de eventos

<action>
Criar em src/components/analytics/:
- EventParticipationChart.jsx — Gráfico de barra com taxa de participação
- PopularEventsChart.jsx — Gráfico de barras horizontais com ranking
- ParticipationTrendChart.jsx — Gráfico de linha com tendência temporal
- AverageParticipantsChart.jsx — Gráfico de barras com média por tipo
</action>

<acceptance_criteria>
- 4 arquivos criados em src/components/analytics/
- Cada componente usa Recharts
- Export default de cada componente funcional
</acceptance_criteria>

## Task 2: Criar EventAnalyticsPage

<action>
Criar src/pages/EventAnalyticsPage.jsx:
- Importar MetricCard, EventParticipationChart, PopularEventsChart, ParticipationTrendChart, AverageParticipantsChart
- Buscar dados via getEvents(), getRegistrations()
- Cards: Total eventos, Participação média, Evento mais popular, Média participantes
- Gráficos organizados em grid responsivo
- Saudação personalizada
</action>

<acceptance_criteria>
- Página renderiza sem erros
- Cards mostram métricas calculadas de localStorage
- Gráficos exibem dados reais
- Layout responsivo mobile-first
</acceptance_criteria>

## Task 3: Adicionar rota em App.jsx

<action>
Adicionar import e rota em src/App.jsx:
```jsx
import EventAnalyticsPage from './pages/EventAnalyticsPage';

<Route
  path="/event-analytics"
  element={
    <RequireAnyRole roles={['leader', 'super_admin']}>
      <SidebarLayout><EventAnalyticsPage /></SidebarLayout>
    </RequireAnyRole>
  }
/>
```
</action>

<acceptance_criteria>
- Rota /event-analytics existe
- Acesso restrito a leaders e super_admin
</acceptance_criteria>

## Task 4: Adicionar link no Sidebar

<action>
Adicionar item em SidebarLayout.jsx na seção "Geral":
```jsx
{ name: 'Análises Eventos', path: '/event-analytics', icon: '📅', roles: ['leader', 'super_admin'] }
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
- [ ] /event-analytics retorna EventAnalyticsPage
- [ ] Gráficos mostram dados reais de eventos
- [ ] Taxa de participação calculada corretamente
- [ ] Ranking de eventos populares exibido
</verification>