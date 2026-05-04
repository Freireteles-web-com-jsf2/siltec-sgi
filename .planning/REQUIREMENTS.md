# Requirements — Siltec-SGI

## v1 Requirements (MVP)

### Authentication (AUTH)
- [ ] **AUTH-01**: Usuário pode fazer login com e‑mail e senha → Verify: login form accepts credentials, redirects to dashboard on success
- [ ] **AUTH-02**: Usuário pode recuperar senha via fluxo de recuperação → Verify: "Esqueceu senha?" link sends email with reset link
- [ ] **AUTH-03**: Usuário pode optar por “Lembrar‑me” (persistência de sessão) → Verify: session persists after browser restart when checked

### Dashboard (DASH)
- [ ] **DASH-01**: Dashboard exibe saudação personalizada e resumo da congregação (número de almas) → Verify: nome do usuário e total de membros ativos aparecem
- [ ] **DASH-02**: Dashboard mostra métricas financeiras rápidas (dízimos/semana, gráfico sparkline) → Verify: card com valor da semana e mini‑gráfico
- [ ] **DASH-03**: Dashboard mostra crescimento comunitário (total de membros, taxa de crescimento no mês) → Verify: número total e percentual de crescimento
- [ ] **DASH-04**: Dashboard lista agenda diária (compromissos, reuniões, cultos) → Verify: lista de eventos do dia atual
- [ ] **DASH-05**: Dashboard destaca o próximo evento em card visual → Verify: card com nome, data, imagem do evento mais próximo

### Gestão de Membros (MEMB)
- [ ] **MEMB-01**: Listagem de membros com foto/avatar, nome, data de registro, status, departamento e contato → Verify: tabela exibe colunas corretas, avatar ou iniciais
- [ ] **MEMB-02**: Filtros por departamento (abas rápidas) → Verify: clicar em aba filtra membros daquele departamento
- [ ] **MEMB-03**: Exportação de dados em PDF ou CSV → Verify: botão gera arquivo com dados da listagem atual
- [ ] **MEMB-04**: Controle de paginação para grandes volumes → Verify: navegação entre páginas, total de registros

### Eventos e Agenda (EVENT)
- [ ] **EVENT-01**: Card de promoção para mega eventos com inscrições → Verify: card amplo com botão de inscrição e contador
- [ ] **EVENT-02**: Quadro de cultos semanais com horários recorrentes → Verify: lista de cultos regulares exibida
- [ ] **EVENT-03**: Calendário comunitário com cards independentes para eventos diversos → Verify: clicar em evento abre detalhes/inscrição
- [ ] **EVENT-04**: Categorização de eventos (Retiros, Feiras, Ações Comunitárias) → Verify: filtro por categoria funciona

### Financeiro (FIN)
- [ ] **FIN-01**: Visão geral do capital com ações rápidas (Transferir, Gerar Relatório) → Verify: cards de saldo, botões de ação
- [ ] **FIN-02**: Acompanhamento de dízimos/metas com barra de progresso → Verify: barra mostra percentual da meta mensal
- [ ] **FIN-03**: Análise de fluxo de caixa com gráfico interativo → Verify: gráfico de linha entradas vs saídas
- [ ] **FIN-04**: Alocação de fundos com gráfico donut → Verify: gráfico de pizza mostra distribuição por fundo
- [ ] **FIN-05**: Transações recentes com indicação visual débito/crédito → Verify: lista com cores diferenciadas

### Departamentos e Grupos (DEPT)
- [ ] **DEPT-01**: Estatísticas de engajamento (líderes ativos vs membros) → Verify: números de líderes e participantes exibidos
- [ ] **DEPT-02**: Cartões de departamento em bento grid com líderes, vagas, status → Verify: grid responsivo com cards informativos

### Requisitos Não Funcionais (NFR)
- [ ] **NFR-01**: Design System com glassmorphism e elevação suave → Verify: componentes usam classes Tailwind conforme config
- [ ] **NFR-02**: Responsividade mobile‑first (viewport <768px) → Verify: sidebar vira bottom navigation em mobile
- [ ] **NFR-03**: Escalabilidade visual com ícones lucide‑react / material‑symbols → Verify: ícones renderizam corretamente
- [ ] **NFR-04**: Supabase integration para persistência oficial → Verify: dados lidos/gravados no Supabase

## v2 Requirements (Deferred)

- **AUTH-04**: Login com provedores OAuth (Google, Facebook) — diferencial, não essencial para MVP
- **MEMB-05**: Gestão de famílias (agrupamento familiar) — complexidade maior, post‑MVP
- **EVENT-05**: Inscrições com pagamento online (Pix/Stripe) — integração financeira futura
- **FIN-06**: Relatórios fiscais avançados (DRE, impostos) — contabilidade completa posterior
- **DEPT-03**: Voluntariado e escalas de serviço — módulo separado
- **NFR-05**: Progressive Web App (PWA) offline support — fase posterior
- **NFR-06**: Multi‑igreja (suporte a múltiplas congregações) — expansão futura

## Out of Scope (Explicitly Excluded)

- **Native Mobile Apps** (iOS/Android) — foco em web responsivo para MVP
- **Multi‑tenant avançado** (múltiplas igrejas na mesma instância) — única congregação
- **Funcionalidades de IA** (análise preditiva, chatbots) — fora do escopo atual
- **Integração com sistemas externos de pagamento** (Stripe, PagSeguro) — futuro
- **Desktop‑only version** — design mobile‑first
- **Customização excessiva de temas** — design system fixo com glassmorphism

## Traceability

| REQ-ID | ROADMAP Phase | Status |
|--------|---------------|--------|
| AUTH-01 | Phase 1: Auth & Foundation | Pending |
| AUTH-02 | Phase 1: Auth & Foundation | Pending |
| AUTH-03 | Phase 1: Auth & Foundation | Pending |
| NFR-04 | Phase 1: Auth & Foundation | Pending |
| MEMB-01 | Phase 2: Member Management | Pending |
| MEMB-02 | Phase 2: Member Management | Pending |
| MEMB-03 | Phase 2: Member Management | Pending |
| MEMB-04 | Phase 2: Member Management | Pending |
| NFR-01 | Phase 2: Member Management | Pending |
| NFR-02 | Phase 2: Member Management | Pending |
| NFR-03 | Phase 2: Member Management | Pending |
| DEPT-01 | Phase 3: Departments | Pending |
| DEPT-02 | Phase 3: Departments | Pending |
| NFR-01 | Phase 3: Departments | Pending |
| NFR-02 | Phase 3: Departments | Pending |
| NFR-03 | Phase 3: Departments | Pending |
| EVENT-01 | Phase 4: Events & Calendar | Pending |
| EVENT-02 | Phase 4: Events & Calendar | Pending |
| EVENT-03 | Phase 4: Events & Calendar | Pending |
| EVENT-04 | Phase 4: Events & Calendar | Pending |
| NFR-01 | Phase 4: Events & Calendar | Pending |
| NFR-02 | Phase 4: Events & Calendar | Pending |
| NFR-03 | Phase 4: Events & Calendar | Pending |
| FIN-01 | Phase 5: Financial Module | Pending |
| FIN-02 | Phase 5: Financial Module | Pending |
| FIN-03 | Phase 5: Financial Module | Pending |
| FIN-04 | Phase 5: Financial Module | Pending |
| FIN-05 | Phase 5: Financial Module | Pending |
| NFR-01 | Phase 5: Financial Module | Pending |
| NFR-02 | Phase 5: Financial Module | Pending |
| NFR-03 | Phase 5: Financial Module | Pending |
| DASH-01 | Phase 6: Dashboard | Pending |
| DASH-02 | Phase 6: Dashboard | Pending |
| DASH-03 | Phase 6: Dashboard | Pending |
| DASH-04 | Phase 6: Dashboard | Pending |
| DASH-05 | Phase 6: Dashboard | Pending |
| NFR-01 | Phase 6: Dashboard | Pending |
| NFR-02 | Phase 6: Dashboard | Pending |
| NFR-03 | Phase 6: Dashboard | Pending |

---
*Last updated: 2026-05-04 after roadmap creation*
