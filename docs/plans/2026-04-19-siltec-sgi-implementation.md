# Siltec-SGI Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construir o protótipo funcional do Santuário Digital (Siltec-SGI) com foco em experiência moderna, glassmorphism e integração total com Supabase.

**Architecture:** Frontend SPA com React 18 e Vite. Gerenciamento de estado de servidor com React Query e autenticação/banco via Supabase. Layout responsivo híbrido (Sidebar Desktop / BottomNav Mobile).

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React, Supabase, TanStack Query.

---

### Task 1: Setup do Projeto e Tailwind

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts` (via Vite CLI)
- Modify: `tailwind.config.js`, `src/styles/globals.css`

**Step 1: Inicializar Vite**
Run: `npm create vite@latest . -- --template react-ts`
Expected: Arquivos base criados.

**Step 2: Instalar Tailwind e Dependências Base**
Run: `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
Run: `npm install lucide-react react-router-dom @tanstack/react-query @supabase/supabase-js @supabase/auth-helpers-react clsx tailwind-merge`

**Step 3: Configurar Tailwind com Cores e Fontes**
Modify `tailwind.config.js` com as cores Zinc-950, Indigo-500 e as fontes Manrope/Inter. Adicionar suporte a animações de skeleton.

**Step 4: Commit**
```bash
git add .
git commit -m "chore: initial vite + tailwind + deps setup"
```

---

### Task 2: Inicialização shadcn/ui e Glassmorphism

**Files:**
- Create: `components.json`
- Modify: `src/styles/globals.css`

**Step 1: Init shadcn/ui**
Run: `npx shadcn-ui@latest init` (Escolher Zinc, New York style, CSS Variables: Yes).

**Step 2: Adicionar utilitários de Glassmorphism**
Modify `src/styles/globals.css` para incluir a classe `.bg-santuario-glass`:
```css
@layer utilities {
  .bg-santuario-glass {
    @apply bg-white/10 backdrop-blur-lg border border-white/20;
  }
}
```

**Step 3: Commit**
```bash
git add .
git commit -m "feat: init shadcn/ui and glassmorphism utilities"
```

---

### Task 3: Configuração Supabase Client e AuthContext

**Files:**
- Create: `.env`, `src/api/supabaseClient.ts`, `src/contexts/AuthContext.tsx`

**Step 1: Criar Cliente Supabase**
Implementar o singleton do cliente usando as variáveis de ambiente.

**Step 2: Implementar AuthContext**
Usar o helper `SessionContextProvider` do Supabase para envolver a aplicação.

**Step 3: Commit**
```bash
git add src/api src/contexts
git commit -m "feat: setup supabase client and auth context"
```

---

### Task 4: Layout Base (Sidebar & BottomNav)

**Files:**
- Create: `src/components/layout/Sidebar.tsx`, `src/components/layout/BottomNav.tsx`, `src/components/layout/MainLayout.tsx`

**Step 1: Criar Sidebar (Desktop)**
Implementar componente com `Lucide React` e suporte a colapsar. Usar `bg-santuario-glass`.

**Step 2: Criar BottomNav (Mobile)**
Implementar barra inferior fixa com os 5 ícones principais.

**Step 3: Commit**
```bash
git add src/components/layout
git commit -m "feat: add responsive layout (sidebar + bottomnav)"
```

---

### Task 5: Dashboard - StatCards e Bento Grid

**Files:**
- Create: `src/components/ui/StatCard.tsx`, `src/pages/DashboardPage.tsx`

**Step 1: Implementar StatCard**
Criar card com ícone, valor e variação percentual.

**Step 2: Montar Grid do Dashboard**
Usar Tailwind Grid para criar o layout Bento.

**Step 3: Commit**
```bash
git add src/components/ui src/pages/DashboardPage.tsx
git commit -m "feat: implement dashboard shell and stat cards"
```
