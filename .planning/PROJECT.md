# Siltec-SGI

## What This Is

O **Siltec-SGI** (Santuário Digital) é uma plataforma abrangente de gestão de igrejas e ministérios projetada para líderes religiosos, pastores e administradores. O sistema moderniza a administração eclesiástica (mordomia), oferecendo uma interface elegante, intuitiva e centralizada para acompanhamento de membros, controle financeiro, organização de eventos e estruturação de departamentos.

## Core Value

Centralizar e simplificar a administração eclesiástica através de uma interface moderna que permite aos líderes focarem em seu propósito comunitário e espiritual em vez de tarefas administrativas complexas.

## Requirements

### Validated

(Nenhum ainda — primeiro milestone é o MVP)

### Active

- [ ] **AUTH-01**: Usuário pode acessar o sistema com e-mail e senha
- [ ] **AUTH-02**: Usuário pode recuperar senha através de fluxo de recuperação
- [ ] **AUTH-03**: Usuário pode optar por "Lembrar-me" para persistência de sessão
- [ ] **ACESSO-01**: Sistema deve diferenciar tipos de usuário (Membro, Líder, Tesoureiro, Super Admin)
- [ ] **ACESSO-02**: Membros só podem visualizar informações básicas (perfil próprio, eventos)
- [ ] **ACESSO-03**: Líderes podem cadastrar, editar e visualizar em Membros, Eventos, Departamentos e Dashboard
- [ ] **ACESSO-04**: Líderes têm apenas permissão de visualização no módulo Financeiro
- [ ] **ACESSO-05**: Tesoureiros têm permissão CRUD total apenas no módulo Financeiro
- [ ] **ACESSO-06**: Super Admin tem privilégios totais de CRUD em todos os módulos
- [ ] **ACESSO-07**: Super Admin pode gerenciar papéis e permissões de outros usuários
- [ ] **DASH-01**: Usuário visualiza resumo personalizado com saudação e métricas da congregação
- [ ] **DASH-02**: Usuário visualiza métricas financeiras rápidas com gráficos sparkline
- [ ] **DASH-03**: Usuário visualiza crescimento comunitário (total de membros e taxa do mês)
- [ ] **DASH-04**: Usuário visualiza agenda diária com compromissos e cultos
- [ ] **DASH-05**: Usuário visualiza card destacando o próximo evento importante
- [ ] **MEMB-01**: Usuário visualiza indicadores de status da saúde cadastral (total, ativos)
- [ ] **MEMB-02**: Usuário visualiza diretório/tabela de membros com foto/avatar, nome, data registro, status, departamento e contato
- [ ] **MEMB-03**: Usuário pode filtrar membros por departamento via abas rápidas
- [ ] **MEMB-04**: Usuário pode exportar relatório de diretório em PDF ou CSV
- [ ] **MEMB-05**: Usuário navega por grandes volumes de membros via paginação
- [ ] **EVT-01**: Usuário visualiza card promocional de mega eventos com inscrições
- [ ] **EVT-02**: Usuário visualiza quadro de cultos semanais com horários recorrentes
- [ ] **EVT-03**: Usuário visualiza calendário comunitário com cards de eventos (retiros, ações sociais, etc.)
- [ ] **EVT-04**: Usuário pode realizar inscrições rápidas e gerenciar capacidade de eventos
- [ ] **EVT-05**: Usuário pode filtrar eventos por categoria (Retiros, Feiras, Ações Comunitárias)
- [ ] **FIN-01**: Usuário visualiza visão holística do capital operacional com ações de transferir/gerar relatório
- [ ] **FIN-02**: Usuário acompanha dízimos/metas com comparação planejado vs realizado e barra de progresso
- [ ] **FIN-03**: Usuário visualiza análise de fluxo de caixa com gráfico interativo de entradas vs saídas
- [ ] **FIN-04**: Usuário visualiza alocação de fundos com gráfico donut (Missões, Programas, Operações)
- [ ] **FIN-05**: Usuário visualiza transações recentes com indicação visual de débito/crédito
- [ ] **GRP-01**: Usuário visualiza estatísticas de engajamento (líderes ativos vs membros)
- [ ] **GRP-02**: Usuário visualiza cartões de departamento em bento grid com estruturação visual
- [ ] **GRP-03**: Usuário visualiza nomes dos líderes e indicadores de vagas vs participantes
- [ ] **GRP-04**: Usuário visualiza status de cada subunidade com avatar visual da comunidade

### Out of Scope

- Módulo de relatórios nativos (DRE e gráficos gerenciais) — planejado para versão futura com Supabase
- Controle e acompanhamento de Escalas (Voluntários) — planejado para versão futura
- Integração completa com Supabase Auth — MVP usará autenticação simulada
- Aplicativo mobile nativo — foco inicial em PWA responsivo
- Módulo de comunicação (chat, e-mail marketing) — fora do escopo do MVP

## Context

O Siltec-SGI surge da necessidade de modernizar a administração eclesiástica, tradicionalmente realizada de forma manual ou com ferramentas fragmentadas. O sistema adota princípios modernos de UX/UI para facilitar a adoção por líderes religiosos que podem não ter familiaridade com sistemas complexos.

**Módulos principais identificados:**
- Autenticação segura
- Dashboard com visão geral
- Gestão de Membros
- Eventos e Agenda
- Financeiro
- Departamentos e Grupos

## Constraints

- **Tech Stack**: React.js com Functional Components e Hooks, Tailwind CSS, React Router DOM
- **Design System**: Uso rigoroso de glassmorphism, gradientes suaves, elevação suave (ambient-shadow)
- **Tipografia**: Manrope (títulos/destaques) e Inter (corpo de texto)
- **Ícones**: Material Symbols Outlined (Google)
- **Layout**: Responsivo mobile-first (sidebar em desktop, bottom navigation em mobile)
- **Viewport**: Adaptação para viewports < 768px
- **Assets**: Reuso de links online estáticos para assets visuais, lucide-react ou material-symbols para iconografia

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React.js + Tailwind CSS | Stack moderna, fácil prototipagem, ampla adoção | — Pending |
| Design System Glassmorphism | Diferenciação visual, modernidade, alinhado ao "Santuário Digital" | — Pending |
| Mobile-first Responsivo | Líderes precisam acessar de qualquer dispositivo | — Pending |
| Supabase para persistência futura | Integração nativa prevista, MVP pode usar dados simulados | — Pending |

---
*Last updated: 2026-05-05 after initialization*
