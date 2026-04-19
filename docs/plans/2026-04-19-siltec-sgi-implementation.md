# Siltec-SGI Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construir o protótipo funcional do Santuário Digital (Siltec-SGI) com foco em experiência moderna, glassmorphism e integração total com Supabase.

**Architecture:** Frontend SPA com React 18 e Vite. Gerenciamento de estado de servidor com React Query e autenticação/banco via Supabase. Layout responsivo híbrido (Sidebar Desktop / BottomNav Mobile).

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React, Supabase, TanStack Query, Recharts.

---

### Task 1: Setup do Projeto e Tailwind (CONCLUÍDA)
### Task 2: Inicialização shadcn/ui e Glassmorphism (CONCLUÍDA)
### Task 3: Configuração Supabase Client e AuthContext (CONCLUÍDA)
### Task 4: Layout Base (Sidebar & BottomNav) (CONCLUÍDA)
### Task 5: Dashboard - StatCards e Bento Grid (CONCLUÍDA)
### Task 6: Gestão de Membros - Listagem e Indicadores (CONCLUÍDA)
### Task 7: Eventos - Calendário e Cards (CONCLUÍDA)

---

### Task 8: Controle Financeiro - Fluxo de Caixa e Transações

**Files:**
- Create: `src/pages/FinancialPage.tsx`, `src/hooks/useTransactions.ts`
- Modify: `src/App.tsx` (adicionar rota)

**Step 1: Instalar Dependências de Gráficos**
Run: `npm install recharts`
Run: `npx shadcn@latest add progress -y`

**Step 2: Criar Hook useTransactions**
Implementar busca de transações e saldo total no Supabase.

**Step 3: Implementar FinancialPage**
- Cards de resumo: Saldo em Caixa, Entradas da Semana, Saídas.
- Gráfico de Área (Recharts) para fluxo dos últimos 6 meses.
- Gráfico Donut para alocação por categoria (Dízimos, Ofertas, Missões).
- Barra de progresso para Meta Mensal de Dízimos.
- Tabela de transações recentes.

**Step 4: Commit**
```bash
git add .
git commit -m "feat: add financial page with charts and transaction history"
```

---

### Task 9: Autenticação Real e Proteção de Rotas

**Files:**
- Create: `src/pages/AuthPage.tsx`
- Modify: `src/App.tsx`, `src/contexts/AuthContext.tsx`

**Step 1: Implementar AuthPage**
Formulário de login com visual glassmorphism.

**Step 2: Proteger Rotas**
Criar componente `ProtectedRoute` para redirecionar usuários não autenticados para `/login`.

**Step 3: Commit**
```bash
git add .
git commit -m "feat: implement real authentication and protected routes"
```
