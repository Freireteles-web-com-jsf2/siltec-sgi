# Project: Siltec-SGI

## What This Is
**Siltec‑SGI** (Santuário Digital) é uma plataforma abrangente de gestão de igrejas e ministérios, projetada para líderes religiosos, pastores e administradores. O sistema moderniza a administração eclesiástica (mordomia), oferecendo uma interface elegante, intuitiva e centralizada para acompanhamento de membros, controle financeiro, organização de eventos e estruturação de departamentos.

## Core Value
Centralizar e simplificar a gestão administrativa eclesiástica, permitindo que líderes foquem no propósito comunitário e espiritual, não na burocracia.

## Requirements

### Validated
- ✓ React.js com functional components e Hooks – definido no PRD
- ✓ Tailwind CSS para estilização – definido no PRD
- ✓ Supabase para backend e auth – definido no PRD
- ✓ React Router DOM para roteamento – definido no PRD

### Active
- [ ] **AUTH-01**: Usuário pode fazer login com e‑mail e senha
- [ ] **AUTH-02**: Usuário pode recuperar senha via fluxo de recuperação
- [ ] **AUTH-03**: Usuário pode optar por “Lembrar‑me” (persistência de sessão)
- [ ] **DASH-01**: Dashboard exibe saudação personalizada e resumo da congregação
- [ ] **DASH-02**: Dashboard mostra métricas financeiras rápidas (dízimos/semana, gráfico sparkline)
- [ ] **DASH-03**: Dashboard mostra crescimento comunitário (total de membros, taxa do mês)
- [ ] **DASH-04**: Dashboard lista agenda diária (compromissos, reuniões, cultos)
- [ ] **DASH-05**: Dashboard destaca o próximo evento em card visual
- [ ] **MEMB-01**: Listagem de membros com foto/avatar, nome, data de registro, status, departamento e contato
- [ ] **MEMB-02**: Filtros por departamento (abas rápidas)
- [ ] **MEMB-03**: Exportação de dados em PDF ou CSV
- [ ] **MEMB-04**: Controle de paginação para grandes volumes
- [ ] **EVENT-01**: Card de promoção para mega eventos com inscrições
- [ ] **EVENT-02**: Quadro de cultos semanais com horários recorrentes
- [ ] **EVENT-03**: Calendário comunitário com cards independentes para eventos diversos
- [ ] **EVENT-04**: Categorização de eventos (Retiros, Feiras, Ações Comunitárias)
- [ ] **FIN-01**: Visão geral do capital com ações rápidas (Transferir, Gerar Relatório)
- [ ] **FIN-02**: Acompanhamento de dízimos/metas com barra de progresso
- [ ] **FIN-03**: Análise de fluxo de caixa com gráfico interativo
- [ ] **FIN-04**: Alocação de fundos com gráfico donut
- [ ] **FIN-05**: Transações recentes com indicação visual débito/crédito
- [ ] **DEPT-01**: Estatísticas de engajamento (líderes ativos vs membros)
- [ ] **DEPT-02**: Cartões de departamento em bento grid com líderes, vagas, status

### Out of Scope
- [ ] Aplicativos nativos mobile – fora do escopo do MVP (apenas web responsivo)
- [ ] Multi‑igreja (suporte a múltiplas congregações) – foco em uma única igreja
- [ ] Funcionalidades de IA avançada – futuro
- [ ] Integração com sistemas externos de pagamento – futuro

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Usar Supabase | Backend como serviço, auth integrada, realtime, Postgres | Selecionado |
| Usar Tailwind CSS com glassmorphism | Design moderno, rápida prototipagem, consome menos JS | Selecionado |
| Usar React com Vite | Bundler rápido, HMR, ampla adoção | Selecionado |
| Usar React Router DOM | Roteamento client‑side padrão para SPA | Selecionado |
| Design responsive mobile‑first | Maior parte dos usuários acessa via mobile | Selecionado |

## Evolution

Este documento evolui em transições de fase e marcos. Após cada fase (via `/gsd-transition`):
1. Requisitos invalidados? → mover para Out of Scope com razão
2. Requisitos validados? → mover para Validated com referência da fase
3. Novos requisitos surgidos? → adicionar a Active
4. Decisões a registrar? → adicionar a Key Decisions
5. “What This Is” ainda preciso? → atualizar se houver desvio

Após cada marco (via `/gsd-complete-milestone`):
1. Revisão completa de todas as seções
2. Verificação do Core Value – ainda é a prioridade?
3. Auditoria de Out of Scope – razões ainda válidas?
4. Atualização de Context com estado atual

---
*Last updated: 2026-05-04 after initialization*
