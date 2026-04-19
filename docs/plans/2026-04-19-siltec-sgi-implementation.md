# Siltec-SGI Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construir o protótipo funcional do Santuário Digital (Siltec-SGI) com foco em experiência moderna, glassmorphism e integração total com Supabase.

**Architecture:** Frontend SPA com React 18 e Vite. Gerenciamento de estado de servidor com React Query e autenticação/banco via Supabase. Layout responsivo híbrido (Sidebar Desktop / BottomNav Mobile).

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React, Supabase, TanStack Query.

---

### Task 1: Setup do Projeto e Tailwind (CONCLUÍDA)
### Task 2: Inicialização shadcn/ui e Glassmorphism (CONCLUÍDA)
### Task 3: Configuração Supabase Client e AuthContext (CONCLUÍDA)
### Task 4: Layout Base (Sidebar & BottomNav) (CONCLUÍDA)
### Task 5: Dashboard - StatCards e Bento Grid (CONCLUÍDA)

---

### Task 6: Gestão de Membros - Listagem e Indicadores

**Files:**
- Create: `src/pages/MembersPage.tsx`, `src/hooks/useMembers.ts`
- Modify: `src/App.tsx` (adicionar rota)

**Step 1: Criar Hook useMembers**
Implementar busca de membros no Supabase usando React Query. Criar tipos para Membro.

**Step 2: Implementar MembersPage**
Adicionar indicadores no topo (total, ativos, inativos) usando StatCard.
Implementar tabela com shadcn/ui (`table`) mostrando Avatar, Nome, Status e Departamento.
Incluir barra de busca e abas para filtragem por status.

**Step 3: Commit**
```bash
git add src/pages/MembersPage.tsx src/hooks/useMembers.ts
git commit -m "feat: add members page with listing and indicators"
```

---

### Task 7: Eventos - Calendário e Cards

**Files:**
- Create: `src/pages/EventsPage.tsx`, `src/components/ui/EventCard.tsx`
- Modify: `src/App.tsx` (adicionar rota)

**Step 1: Criar Componente EventCard**
Card com imagem de destaque, título, data, local e badge de categoria. Usar efeito glassmorphism.

**Step 2: Implementar EventsPage**
Grid de eventos futuros e integração com o componente de Calendário do shadcn.

**Step 3: Commit**
```bash
git add src/pages/EventsPage.tsx src/components/ui/EventCard.tsx
git commit -m "feat: add events page with calendar and cards"
```
