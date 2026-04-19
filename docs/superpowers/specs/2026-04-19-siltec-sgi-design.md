# Siltec-SGI: Santuário Digital — Design Specification

## 1. Overview

**Nome:** Siltec-SGI (Santuário Digital)
**Versão:** 1.0.0
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS + Supabase

Aplicação de gestão eclesiástica (church management) com foco em experiência moderna, glassmorphism seletivo e mobile-first.

---

## 2. Arquitetura

### 2.1 Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| TypeScript | Linguagem |
| Tailwind CSS | Estilização |
| React Router DOM v6 | Roteamento SPA |
| @tanstack/react-query | Gerenciamento de dados server-state |
| @supabase/supabase-js | Backend (Auth + Database) |
| @supabase/auth-helpers-react | Helpers de autenticação |

### 2.2 Estrutura de Pastas (Monorepo Simples)

```
src/
├── api/
│   ├── supabaseClient.ts       # Cliente Supabase
│   └── queries/                # Queries React Query
├── components/
│   ├── ui/                     # Componentes base (Button, Input, Card)
│   ├── layout/                 # Sidebar, BottomNav, Layout
│   └── features/               # Componentes de domínio
├── contexts/
│   ├── AuthContext.tsx         # Contexto de autenticação
│   └── QueryClientContext.tsx  # Provider React Query
├── hooks/
│   ├── useAuth.ts
│   └── useMembers.ts
├── pages/
│   ├── AuthPage.tsx            # /login
│   ├── DashboardPage.tsx       # /
│   ├── MembersPage.tsx         # /membros
│   ├── EventsPage.tsx          # /eventos
│   ├── FinancialPage.tsx       # /financeiro
│   └── GroupsPage.tsx          # /grupos
├── styles/
│   └── globals.css             # Tailwind imports
├── App.tsx
└── main.tsx
```

### 2.3 Rotas

| Path | Page | Descrição |
|---|---|---|
| `/login` | AuthPage | Login e recuperação de senha |
| `/` | DashboardPage | Painel principal |
| `/membros` | MembersPage | Gestão de membros |
| `/eventos` | EventsPage | Calendário e eventos |
| `/financeiro` | FinancialPage | Controle financeiro |
| `/grupos` | GroupsPage | Departamentos e grupos |

---

## 3. Design System

### 3.1 Paleta de Cores

```
background:     #09090b  (zinc-950)
card:           #18181b  (zinc-900)
card-hover:     #27272a  (zinc-800)
primary:        #6366f1  (indigo-500)
primary-hover:  #4f46e5  (indigo-600)
secondary:      #8b5cf6  (violet-500)
accent:         #f59e0b  (amber-500)
success:        #22c55e  (green-500)
danger:         #ef4444  (red-500)
text:           #fafafa  (zinc-50)
text-muted:     #a1a1aa  (zinc-400)
border:         #27272a  (zinc-800)
```

### 3.2 Tipografia

```
Headings:  Manrope (Google Fonts)
Body:      Inter (Google Fonts)
Fallback:  system-ui, sans-serif
```

**Escala:**
- Display/Logo: 2rem (32px), font-weight 700
- H1 (Page titles): 1.5rem (24px), font-weight 600
- H2 (Section titles): 1.25rem (20px), font-weight 600
- H3 (Card titles): 1rem (16px), font-weight 500
- Body: 0.875rem (14px), font-weight 400
- Small: 0.75rem (12px), font-weight 400

### 3.3 Glassmorphism (Seletivo)

| Componente | Intensidade | Aplicação |
|---|---|---|
| Sidebar (Desktop) | Alta | `bg-white/10 backdrop-blur-lg border border-white/20` |
| BottomNav (Mobile) | Alta | `bg-white/15 backdrop-blur-xl border border-white/10` |
| Cards Dashboard | Média | `bg-white/10 backdrop-blur-md border border-white/15` |
| Modais | Alta | `bg-black/40 backdrop-blur-2xl border border-white/20` |
| Cards Listagem | Baixa | `bg-zinc-800/50 shadow-lg` (sem glass) |

### 3.4 Espaçamentos

```
Espaçamento base: 4px (Tailwind default)
padding-card:     24px (p-6)
gap-section:      32px (gap-8)
radius-card:      16px (rounded-2xl)
radius-button:    12px (rounded-xl)
radius-avatar:    9999px (rounded-full)
```

### 3.5 Responsividade

```
Mobile:  < 768px  → BottomNav, sidebar colapsada
Tablet:  768px-1024px → Sidebar compacta
Desktop: > 1024px → Sidebar expandida + conteúdo
```

---

## 4. Componentes UI

### 4.1 Layout

**Sidebar (Desktop)**
- Largura: 280px (expanded), 80px (collapsed)
- Logo no topo
- NavItems com ícones (Material Symbols)
- UserAvatar + logout no rodapé
- Glassmorphism aplicado

**BottomNav (Mobile)**
- Altura: 64px
- 5 ícones: Home, Users, Calendar, Wallet, Users3
- Indicador de página ativa
- Glassmorphism aplicado

### 4.2 Componentes Base

| Componente | Props | Descrição |
|---|---|---|
| `Button` | variant (primary/secondary/ghost), size, loading | Botão comripple effect |
| `Input` | label, error, icon | Input com label flutuante |
| `Select` | options, label, error | Select estilizado |
| `Card` | glass, padding, hover | Wrapper de card (glass opcional) |
| `Avatar` | src, initials, size | Avatar com fallback para iniciais |
| `Badge` | variant, children | Tag de status |
| `Spinner` | size | Loading indicator |

### 4.3 Componentes de Domínio

| Componente | Descrição |
|---|---|
| `StatCard` | Card com ícone, valor principal, label, variação % (↑↓) |
| `MemberRow` | Linha da tabela: avatar, nome, email, status, departamento, ações |
| `EventCard` | Card de evento: imagem, título, data, hora, local, categoria |
| `TransactionRow` | Linha de transação: ícone categoria, descrição, valor, tipo (débito/crédito) |
| `ProgressBar` | Barra de progresso com label e percentage |
| `DonutChart` | Gráfico donut (usar biblioteca leve) |
| `SparklineChart` | Gráfico de linha mini para tendências |
| `EventCalendar` | Calendário mensal com indicadores de eventos |

---

## 5. Modelos de Dados (Supabase)

### 5.1 Schema

```sql
-- Membros da igreja
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  department_id UUID REFERENCES departments(id),
  registered_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Departamentos
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  leader_id UUID REFERENCES members(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Eventos
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME,
  location TEXT,
  category TEXT CHECK (category IN ('retreat', 'fair', 'social', 'worship')),
  capacity INTEGER,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Transações financeiras
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL CHECK (category IN ('tithe', 'offering', 'mission', 'operations', 'other')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  date DATE DEFAULT current_date,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Grupos/ministérios
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  department_id UUID REFERENCES departments(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Relacionamento grupos-membros
CREATE TABLE group_members (
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  PRIMARY KEY (group_id, member_id)
);
```

### 5.2 RLS (Row Level Security)

- `members`: Usuários autenticados podem ler; apenas admins podem modificar
- `departments`:同上
- `events`:同上
- `transactions`: 同上
- `groups`: 同上

---

## 6. Funcionalidades por Página

### 6.1 /login — Autenticação

- Formulário de login (email + senha)
- Checkbox "Lembrar-me"
- Link "Esqueci minha senha" → modal de recuperação
- Integração: Supabase Auth
- Validação client-side

### 6.2 / — Dashboard

- Saudação personalizada (hora do dia + nome)
- Cards de métricas:
  - Total de membros + variação mensal
  - Dízimos da semana + sparkline
  - Próximo evento (card destacado grande)
- Agenda do dia (lista de compromissos)
- Acesso rápido via Quick Actions

### 6.3 /membros — Gestão de Membros

- Indicadores: total membros, ativos, inativos
- Tabela com filtros:
  - Busca por nome
  - Filtro por departamento (tabs)
  - Filtro por status
- Cada linha: avatar, nome, email, status badge, departamento, ações
- Paginação
- Botão "Exportar" (PDF/CSV — futuro)
- Modal de detalhes/cadastro (futuro)

### 6.4 /eventos — Eventos e Agenda

- Card destaque para mega eventos (se houver)
- Lista de cultos semanais (cards pequenos)
- Calendário visual do mês
- Cards de eventos por categoria
- Filtro por categoria
- Modal de inscrição (futuro)

### 6.5 /financeiro — Controle Financeiro

- Visão geral: total em caixa + Quick Actions (Transferir, Relatório)
- Barra de progresso: dízimos vs meta mensal
- Gráfico de fluxo de caixa (6 meses)
- Gráfico donut: alocação por categoria
- Lista de transações recentes (últimas 10)
- Filtros: período, categoria, tipo

### 6.6 /grupos — Departamentos e Grupos

- Estatísticas: total líderes vs total membros
- Bento Grid de departamentos
- Cada card: nome, líder, membros count, vagas, avatar
- Clique leva a detalhes do departamento

---

## 7. Próximos Passos (Backlog)

1. Scaffold do projeto com Vite
2. Configuração do Tailwind
3. Configuração do Supabase
4. Implementação de Auth
5. Implementação das páginas uma a uma
6. Integração com Supabase (dados reais)

---

## 8. Decisões Tomadas

| Decisão | Alternativa descartada |
|---|---|
| React Query + Context | Zustand (overkill), Redux (complexo demais) |
| Supabase Auth | Firebase Auth (não alinhado), Auth0 ($$$) |
| Estrutura Monorepo simples | Feature-based (mais complexo), Layer-based (mais camadas) |
| Manrope + Inter | Poppins (menos legível), Sora (menos testado) |
| Glassmorphism seletivo | везде (muito噪), minimal (poucoimpacto) |
| Scaffold do zero | Template existente (controle total) |

---

_Design criado em: 2026-04-19_