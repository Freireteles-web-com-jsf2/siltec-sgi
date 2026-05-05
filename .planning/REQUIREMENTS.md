# Requirements: Siltec-SGI

**Defined:** 2026-05-05
**Core Value:** Centralizar e simplificar a administração eclesiástica através de uma interface moderna que permite aos líderes focarem em seu propósito comunitário e espiritual

## v1 Requirements

Requirements for MVP initial release. Each maps to roadmap phases.

### Authentication

- [ ] **AUTH-01**: Usuário pode acessar o sistema mediante e-mail e senha
- [ ] **AUTH-02**: Usuário pode recuperar senha através de fluxo de recuperação
- [ ] **AUTH-03**: Usuário pode optar por "Lembrar-me" para persistência opcional da sessão

### Dashboard

- [ ] **DASH-01**: Usuário visualiza saudação personalizada com resumo imediato da congregação (número de almas, eventos essenciais)
- [ ] **DASH-02**: Usuário visualiza métricas rápidas financeiras com totalização de dízimos/entradas da semana com gráfico sparkline
- [ ] **DASH-03**: Usuário visualiza crescimento comunitário (total de membros e taxa de crescimento no mês atual)
- [ ] **DASH-04**: Usuário visualiza agenda diária com compromissos, reuniões e cultos previstos para o dia
- [ ] **DASH-05**: Usuário visualiza card destacando o próximo evento ou de maior importância

### Members Management

- [ ] **MEMB-01**: Usuário visualiza indicadores de status da saúde cadastral (total de membros, total de ativos)
- [ ] **MEMB-02**: Usuário visualiza diretório/tabela de membros com foto/avatar, nome, data de registro, status, departamento e contato
- [ ] **MEMB-03**: Usuário pode filtrar membros por departamento via abas rápidas (Ministério Jovem, Coral, etc.)
- [ ] **MEMB-04**: Usuário pode exportar relatório de diretório em formatos PDF ou CSV
- [ ] **MEMB-05**: Usuário navega por grandes volumes de membros via controle de paginação

### Events and Agenda

- [ ] **EVT-01**: Usuário visualiza card amplo para mega eventos com inscrições e informações fundamentais
- [ ] **EVT-02**: Usuário visualiza quadro de cultos semanais com lista de horários recorrentes
- [ ] **EVT-03**: Usuário visualiza calendário comunitário com cards para eventos (retiros, ações sociais, noites de adoração)
- [ ] **EVT-04**: Usuário pode realizar inscrições rápidas e gerenciar capacidade de eventos
- [ ] **EVT-05**: Usuário pode filtrar eventos por categorias (Retiros, Feiras, Ações Comunitárias)

### Financial

- [ ] **FIN-01**: Usuário visualiza visão holística do capital operacional com ações rápidas de "Transferir" ou "Gerar Relatório"
- [ ] **FIN-02**: Usuário acompanha dízimos/metas com comparação planejado vs realizado e barra de progresso
- [ ] **FIN-03**: Usuário visualiza análise de fluxo de caixa com gráfico interativo de entradas vs saídas
- [ ] **FIN-04**: Usuário visualiza alocação de fundos com gráfico donut (Missões, Programas, Operações)
- [ ] **FIN-05**: Usuário visualiza transações recentes com indicação visual de débito/crédito

### Departments and Groups

- [ ] **GRP-01**: Usuário visualiza estatísticas de engajamento (líderes ativos vs quantidade de membros)
- [ ] **GRP-02**: Usuário visualiza cartões de departamento em bento grid com estruturação visual
- [ ] **GRP-03**: Usuário visualiza nomes dos líderes, indicadores de vagas vs participantes por ministério
- [ ] **GRP-04**: Usuário visualiza status de cada subunidade com avatar visual da comunidade

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Supabase Integration

- **SUP-01**: Integração com Supabase Services (Supabase & Auth) para persistência de dados real
- **SUP-02**: Migração de dados simulados para banco de dados real

### Reports Module

- **RPT-01**: Criação nativa de DRE (Demonstrativo de Resultado do Exercício)
- **RPT-02**: Gráficos gerenciais interativos para análise financeira

### Volunteer Schedules

- **ESC-01**: Controle e acompanhamento de Escalas de voluntários
- **ESC-02**: Interface para gestão de disponibilidade e alocação de voluntários

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Chat interno entre membros | Fora do escopo do MVP, complexidade alta para comunicação eclesiástica básica |
| Aplicativo mobile nativo (iOS/Android) | Foco inicial em PWA responsivo, app nativo para versões futuras |
| Integração com redes sociais | Não essencial para administração eclesiástica básica |
| Módulo de streaming/pedidos de oração | Escopo focado em mordomia/administração, não engajamento remoto |
| Multi-tenant (múltiplas igrejas) | MVP focado em instância única, expansão futura possível |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| DASH-01 | Phase 2 | Pending |
| DASH-02 | Phase 2 | Pending |
| DASH-03 | Phase 2 | Pending |
| DASH-04 | Phase 2 | Pending |
| DASH-05 | Phase 2 | Pending |
| MEMB-01 | Phase 3 | Pending |
| MEMB-02 | Phase 3 | Pending |
| MEMB-03 | Phase 3 | Pending |
| MEMB-04 | Phase 3 | Pending |
| MEMB-05 | Phase 3 | Pending |
| EVT-01 | Phase 4 | Pending |
| EVT-02 | Phase 4 | Pending |
| EVT-03 | Phase 4 | Pending |
| EVT-04 | Phase 4 | Pending |
| EVT-05 | Phase 4 | Pending |
| FIN-01 | Phase 5 | Pending |
| FIN-02 | Phase 5 | Pending |
| FIN-03 | Phase 5 | Pending |
| FIN-04 | Phase 5 | Pending |
| FIN-05 | Phase 5 | Pending |
| GRP-01 | Phase 6 | Pending |
| GRP-02 | Phase 6 | Pending |
| GRP-03 | Phase 6 | Pending |
| GRP-04 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-05*
*Last updated: 2026-05-05 after initial definition*
