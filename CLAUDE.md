# CLAUDE.md — Siltec-SGI

## GSD Workflow

Siga rigorosamente o fluxo GSD (Get Shit Done) para cada fase:

1. **Discuss** (`/gsd-discuss-phase [n]`) — Reunir contexto, esclarecer abordagem
2. **Plan** (`/gsd-plan-phase [n]`) — Criar plano detalhado (PLAN.md) com verificação
3. **Execute** (`/gsd-execute-phase [n]`) — Executar planos com commits atômicos
4. **Verify** (`/gsd-verify-work`) — Validar entrega via UAT conversacional
5. **Transition** (`/gsd-transition`) — Atualizar PROJECT.md, REQUERIMENTS.md, ROADMAP.md

## Projeto

**Nome:** Siltec-SGI (Santuário Digital)  
**Versão:** 1.0.0 (MVP)  
**Stack:** React 19 + Vite 8 + Tailwind CSS 4 + Supabase  
**Design:** Glassmorphism, mobile-first, Material Symbols + Lucide React  

## Roadmap Atual

| Fase | Nome | Status |
|------|------|--------|
| 1 | Auth & Foundation | Pendente |
| 2 | Member Management | Pendente |
| 3 | Departments | Pendente |
| 4 | Events & Calendar | Pendente |
| 5 | Financial Module | Pendente |
| 6 | Dashboard | Pendente |

## Padrões de Código

- **Componentes:** Functional Components + Hooks, extensão `.jsx`
- **Estilização:** Tailwind CSS utilitário, classes glassmorphism definidas no `tailwind.config.js`
- **Roteamento:** React Router DOM v7
- **Backend:** Supabase (Postgres + Auth + Realtime + Storage)
- **Formulários:** React Hook Form + Zod validation
- **Tabelas:** TanStack Table (headless)
- **Gráficos:** Recharts (sparklines, donut, linha)
- **State:** Zustand (leve, 1.2KB gzip)
- **Testes:** Jest + React Testing Library

## Requisitos Não Funcionais

- **NFR-01:** Design System com glassmorphism e `ambient-shadow` no Tailwind
- **NFR-02:** Responsivo mobile‑first (<768px: bottom nav, sidebar em desktop)
- **NFR-03:** Ícones via `lucide-react` e `material-symbols`
- **NFR-04:** Integração oficial com Supabase (Auth + DB)

## Comandos Git

- Commits atômicos seguindo padrão: `feat:`, `fix:`, `docs:`, `chore:`
- Planejamentos e documentação em `.planning/` são comitados
- Não comitar `.env`, `node_modules/`, builds de produção

## Próximo Passo

Iniciar `/gsd-discuss-phase 1` para discutir a Fase 1 (Auth & Foundation).

---
*Gerado por /gsd-new-project em 2026-05-04*
