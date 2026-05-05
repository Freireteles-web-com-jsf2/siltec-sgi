# Phase 1: Authentication System - Context

**Gathered:** 2026-05-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementar sistema de autenticação seguro com controle de acesso baseado em papéis (RBAC). Inclui login com e-mail/senha, recuperação de senha, persistência de sessão ("Lembrar-me") e diferenciação de 4 papéis: Membro, Líder, Tesoureiro, Super Admin. A integração com Supabase é para versões futuras — MVP usará dados simulados.
</domain>

<decisions>
## Implementation Decisions

### Role-Based Access Control (RBAC)
- **D-01:** Armazenar informação de papel (role) no payload do JWT token. Frontend lê o token para verificar permissões.
- **D-02:** Usar Route Guards no React Router para proteger rotas baseado no papel do usuário. Obrigatório para áreas restritas.
- **D-03:** Líderes têm acesso de visualização (read-only) no módulo Financeiro. Mostrar ícones/botões desabilitados.
- **D-04:** Super Admin tem privilégios totais (CRUD) em todos os módulos e pode gerenciar papéis de outros usuários.
- **D-05:** Matriz de permissões definida no PRD (docs/prd-siltec-sgi.md Seção 8).

### Password Recovery
- **D-06:** Fluxo de recuperação via e-mail link. Usuário informa e-mail, sistema gera token e envia link (simulado no MVP).
- **D-07:** Token de recuperação enviado via URL parameter (ex: `/reset-password?token=xyz`). Padrão para SPAs.
- **D-08:** No MVP, apenas exibir mensagem "E-mail enviado para ***@***.com" (simulação). Sem envio real de e-mails.
- **D-09:** Token com validade de 15-30 minutos.

### Data Persistence (MVP)
- **D-10:** Usar dados simulados (mock) no MVP. Não integrar com Supabase Auth ainda.
- **D-11:** Armazenar usuários simulados no localStorage. Persiste entre sessões, fácil de implementar.
- **D-12:** Criar usuários de teste no localStorage: 1 Super Admin, 1 Tesoureiro, 1 Líder, 1 Membro.
- **D-13:** Estrutura de dados preparada para futura migração para Supabase.

### Session Management
- **D-14:** JWT tokens para gerenciamento de sessão stateless.
- **D-15:** "Lembrar-me" implementado via localStorage persistente (token com longa duração). Sem "Lembrar-me" usa sessionStorage (token expira ao fechar navegador).

### the agent's Discretion
- Exata implementação visual dos formulários de login/recuperação
- Tratamento de erros e mensagens de validação
- Componentes específicos de Route Guards (como serão implementados)
- Design exato dos ícones/botões desabilitados para Líderes no Financeiro

</decisions>

<specifics>
## Specific Ideas

- "JWT token deve incluir role no payload para facilitar verificação no frontend"
- "Route Guards devem redirecionar para página de 'Acesso Negado' se papel insuficiente"
- "Tela de login deve ter design glassmorphism consistente com o resto do sistema"
- "Simulação de e-mail no MVP: exibir token na tela para testes (apenas desenvolvimento)"

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Authentication & Access Control
- `docs/prd-siltec-sgi.md` §8 — Controle de Acesso e Permissões, Matriz de Permissões
- `.planning/PROJECT.md` — Visão geral do projeto, Core Value, Tech Stack
- `.planning/REQUIREMENTS.md` — Requisitos AUTH-01 a AUTH-03 e ACESSO-01 a ACESSO-07

### Technical References
- `docs/prd-siltec-sgi.md` §4 — Arquitetura e Tecnologias (React.js, Tailwind CSS)
- `docs/prd-siltec-sgi.md` §6 — Requisitos Não Funcionais (Design System, Responsividade)

### Future Integration
- `docs/prd-siltec-sgi.md` §7 — Integração com Supabase (futuro, não para MVP)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Nenhum ainda (projeto recém-inicializado, sem código existente)

### Established Patterns
- React.js com Functional Components e Hooks (definido no PROJECT.md)
- Tailwind CSS para estilização (glassmorphism, ambient-shadow)
- React Router DOM para roteamento SPA

### Integration Points
- localStorage para persistência de dados simulados (usuários, tokens)
- Estrutura de pastas: `/src/components/auth/`, `/src/contexts/`, `/src/utils/`

</code_context>

<deferred>
## Deferred Ideas

- Integração real com Supabase Auth — Fase futura (ver §7 do PRD)
- Envio real de e-mails (SMTP/SendGrid/Resend) — pós-MVP
- Refresh tokens para renovação automática de JWT — futuro
- Módulo de gerenciamento de usuários pelo Super Admin (CRUD de usuários) — pode ser parte da Fase 6 ou fase separada
- 2FA (Two-Factor Authentication) — não especificado no MVP

</deferred>

---
*Phase: 01-authentication-system*
*Context gathered: 2026-05-05*
