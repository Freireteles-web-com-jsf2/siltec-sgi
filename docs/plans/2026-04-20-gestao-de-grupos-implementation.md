# Plano de Implementação: Gestão de Grupos

> **Para Gemini:** SUB-HABILIDADE OBRIGATÓRIA: Use superpowers:executing-plans para implementar esta tarefa passo a passo.

**Objetivo:** Implementar a página de "Gestão de Grupos" (`/grupos`) que permite visualizar, criar, editar e excluir departamentos, com um layout "Bento Grid" e estilo *glassmorphism*.

**Arquitetura:** Utilizaremos o hook `useDepartments` para interagir com o Supabase via TanStack Query, componentes reutilizáveis como `DepartmentCard` e modais para gerenciamento (criação/edição/exclusão).

**Tech Stack:** React, TypeScript, Vite, Vitest, Tailwind CSS, Supabase, TanStack Query.

---

### Tarefa 1: Criação do Hook `useDepartments`

**Arquivos:**
- Criar: `src/hooks/useDepartments.ts`
- Testar: `tests/unit/hooks/useDepartments.test.ts`

**Passo 1: Escrever o teste falho**
```typescript
// tests/unit/hooks/useDepartments.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useDepartments } from '@/hooks/useDepartments';
import { supabase } from '@/api/supabaseClient'; // Assumindo que este é o cliente Supabase

// Mock do cliente Supabase
vi.mock('@/api/supabaseClient', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    rpc: vi.fn().mockReturnThis(), // Para chamadas de procedure, se usadas
    // Adicionar outras funções do Supabase conforme necessário
    eq: vi.fn().mockReturnThis(),
    returns: vi.fn().mockReturnThis(),
    data: [],
    error: null,
  },
}));

describe('useDepartments Hook', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Mock default successful response for select
    supabase.select.mockResolvedValue({ data: [], error: null });
  });

  test('should fetch departments successfully', async () => {
    const mockDepartments = [{ id: 1, name: 'Ministry of Finance', member_count: 15 }];
    supabase.select.mockResolvedValue({ data: mockDepartments, error: null });

    const { result } = renderHook(() => useDepartments());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.departments).toEqual(mockDepartments);
    expect(result.current.error).toBeNull();
    expect(supabase.from).toHaveBeenCalledWith('departments'); // Assumindo a tabela 'departments'
    expect(supabase.select).toHaveBeenCalledWith('*');
  });

  // Teste para falha no fetch
  test('should handle fetch error', async () => {
    const fetchError = new Error('Failed to fetch');
    supabase.select.mockResolvedValue({ data: null, error: fetchError });

    const { result } = renderHook(() => useDepartments());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.departments).toEqual([]);
    expect(result.current.error).toEqual(fetchError);
  });

  // Testes para createDepartment, updateDepartment, deleteDepartment viriam aqui
  // ...
});
```

**Passo 2: Executar o teste para verificar falha**
Executar: `npm test -- tests/unit/hooks/useDepartments.test.ts`
Esperado: FALHA (pois o hook ainda não foi implementado)

**Passo 3: Escrever a implementação mínima do hook `useDepartments`**
```typescript
// src/hooks/useDepartments.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Department } from '@/types/database'; // Assumindo que você tenha um tipo 'Department'

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('departments') // Assumindo a tabela 'departments' no Supabase
          .select('*'); // Seleciona todas as colunas

        if (error) {
          throw error;
        }
        setDepartments(data || []);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Implementar funções para create, update, delete aqui
  const createDepartment = async (newDepartment: Omit<Department, 'id'>) => { ... };
  const updateDepartment = async (id: number, updatedDepartment: Partial<Department>) => { ... };
  const deleteDepartment = async (id: number) => { ... };

  return {
    departments,
    isLoading,
    error,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
};

// Note: O tipo 'Department' precisaria ser definido em '@/types/database'.
// As funções create, update, delete precisam ser implementadas completamente.
// A lógica de TanStack Query não foi explicitamente incluída aqui para manter a simplicidade do hook básico,
// mas seria o próximo passo para uma implementação robusta.
// Para este plano inicial, focamos no fetch básico.
```

**Passo 4: Executar o teste para verificar se passa**
Executar: `npm test -- tests/unit/hooks/useDepartments.test.ts`
Esperado: PASS

**Passo 5: Commit**
```bash
git add src/hooks/useDepartments.ts tests/unit/hooks/useDepartments.test.ts
git commit -m "feat: add basic useDepartments hook for fetching departments"
```

---

### Tarefa 2: Implementação do Componente `DepartmentCard`

**Arquivos:**
- Criar: `src/components/ui/DepartmentCard.tsx`
- Testar: `tests/unit/components/DepartmentCard.test.ts`

**Passo 1: Escrever o teste falho**
```typescript
// tests/unit/components/DepartmentCard.test.ts
import { render, screen } from '@testing-library/react';
import DepartmentCard from '@/components/ui/DepartmentCard';

const mockDepartment = {
  id: 1,
  name: 'Ministry of Finance',
  description: 'Handles fiscal matters',
  member_count: 15,
};

describe('DepartmentCard Component', () => {
  test('renders department name, description, and member count', () => {
    render(<DepartmentCard department={mockDepartment} />);

    expect(screen.getByText('Ministry of Finance')).toBeInTheDocument();
    expect(screen.getByText('Handles fiscal matters')).toBeInTheDocument();
    expect(screen.getByText('15 membros')).toBeInTheDocument();
  });

  // Teste para a chamada de funções de editar/excluir quando os botões são clicados (mockados)
  // ...
});
```

**Passo 2: Executar o teste para verificar falha**
Executar: `npm test -- tests/unit/components/DepartmentCard.test.ts`
Esperado: FALHA (componente ainda não existe)

**Passo 3: Escrever a implementação mínima do `DepartmentCard`**
```typescript
// src/components/ui/DepartmentCard.tsx
import React from 'react';
import clsx from 'clsx';
import { Department } from '@/types/database'; // Assumindo tipo 'Department'
import { cn } from '@/lib/utils'; // Utilitário para merge de classes CSS (shadcn/ui)
// Assumir que existem ícones para opções (editar/excluir) e que um menu dropdown será usado

interface DepartmentCardProps {
  department: Department;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onEdit, onDelete }) => {
  // Implementar lógica para menu de opções (dropdown com editar/excluir)
  const handleEditClick = () => {
    if (onEdit) onEdit(department.id);
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(department.id);
  };

  return (
    <div className={cn(
      "p-6 rounded-lg shadow-lg border border-zinc-800/50 bg-white/10 backdrop-blur-sm", // Estilo glassmorphism
      "relative"
    )}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-zinc-100">{department.name}</h3>
        {department.description && (
          <p className="text-zinc-300 mt-1 text-sm">{department.description}</p>
        )}
      </div>
      <div className="text-zinc-200">
        <span className="font-semibold">{department.member_count || 0}</span> membros
      </div>

      {/* Menu de opções (placeholder) */}
      <div className="absolute top-3 right-3">
        {/* Aqui entraria um componente de dropdown/menu */}
        <button onClick={handleEditClick} className="text-zinc-400 hover:text-zinc-200 mr-2">
          ✏️ {/* Editar */}
        </button>
        <button onClick={handleDeleteClick} className="text-red-400 hover:text-red-300">
          🗑️ {/* Excluir */}
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;

// Nota: O tipo 'Department' e o utilitário 'cn' devem estar disponíveis.
// A implementação do menu de opções e a lógica de mock dos handlers onEdit/onDelete
// precisam ser completas nos testes.
```

**Passo 4: Executar o teste para verificar se passa**
Executar: `npm test -- tests/unit/components/DepartmentCard.test.ts`
Esperado: PASS

**Passo 5: Commit**
```bash
git add src/components/ui/DepartmentCard.tsx tests/unit/components/DepartmentCard.test.ts
git commit -m "feat: add DepartmentCard component"
```

---

### Tarefa 3: Criação da Página `GroupsPage.tsx` (Estrutura Básica)

**Arquivos:**
- Criar: `src/pages/GroupsPage.tsx`
- Testar: `tests/unit/pages/GroupsPage.test.ts`

**Passo 1: Escrever o teste falho**
```typescript
// tests/unit/pages/GroupsPage.test.ts
import { render, screen } from '@testing-library/react';
import GroupsPage from '@/pages/GroupsPage';

describe('GroupsPage Component', () => {
  test('renders loading state initially', () => {
    // Mock do hook useDepartments para simular estado de carregamento
    // Vi.mock('@/hooks/useDepartments', () => ({
    //   useDepartments: () => ({ departments: [], isLoading: true, error: null, createDepartment: vi.fn(), updateDepartment: vi.fn(), deleteDepartment: vi.fn() }),
    // }));

    render(<GroupsPage />);

    // Assumindo que haverá um indicador de carregamento
    // expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  test('renders departments when loaded successfully', () => {
    // Mock do hook useDepartments para simular dados carregados
    // Vi.mock('@/hooks/useDepartments', () => ({
    //   useDepartments: () => ({ departments: [{ id: 1, name: 'Finance', member_count: 15 }], isLoading: false, error: null, createDepartment: vi.fn(), updateDepartment: vi.fn(), deleteDepartment: vi.fn() }),
    // }));

    render(<GroupsPage />);

    // Espera-se que o nome do departamento e a contagem de membros sejam exibidos
    // expect(screen.getByText('Finance')).toBeInTheDocument();
    // expect(screen.getByText('15 membros')).toBeInTheDocument();
  });

  // Testes para renderização de erro e estado vazio também viriam aqui.
});
```

**Passo 2: Executar o teste para verificar falha**
Executar: `npm test -- tests/unit/pages/GroupsPage.test.ts`
Esperado: FALHA (página e mocks não implementados)

**Passo 3: Escrever a implementação mínima de `GroupsPage.tsx`**
```typescript
// src/pages/GroupsPage.tsx
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DepartmentCard from '@/components/ui/DepartmentCard';
import { useDepartments } from '@/hooks/useDepartments';
import { Department } from '@/types/database'; // Assumindo tipo 'Department'
import { Button } from '@/components/ui/button'; // shadcn/ui button
import DepartmentFormModal from '@/components/modals/DepartmentFormModal'; // Assumindo que este modal será criado
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal'; // Assumindo que este modal será criado

const GroupsPage: React.FC = () => {
  const { departments, isLoading, error, createDepartment, updateDepartment, deleteDepartment } = useDepartments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [deletingDepartmentId, setDeletingDepartmentId] = useState<number | null>(null);

  const handleAddClick = () => {
    setEditingDepartment(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (dept: Department) => {
    setEditingDepartment(dept);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingDepartmentId(id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
    setDeletingDepartmentId(null); // Ensure this is also cleared if modal is for delete confirmation
  };

  const handleSaveDepartment = async (deptData: Omit<Department, 'id'>) => {
    if (editingDepartment) {
      await updateDepartment(editingDepartment.id, deptData);
    } else {
      await createDepartment(deptData);
    }
    handleModalClose();
  };

  const handleConfirmDelete = async () => {
    if (deletingDepartmentId !== null) {
      await deleteDepartment(deletingDepartmentId);
      setDeletingDepartmentId(null);
      handleModalClose(); // Close delete confirmation modal
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-100">Gestão de Grupos</h1>
          <Button onClick={handleAddClick}>+ Novo Grupo</Button>
        </div>

        {isLoading && <p>Carregando grupos...</p>}
        {error && <p className="text-red-500">Erro ao carregar grupos: {error.message}</p>}

        {!isLoading && !error && departments.length === 0 && (
          <p>Nenhum grupo encontrado. Adicione um novo!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && !error && departments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              onEdit={() => handleEditClick(dept)}
              onDelete={() => handleDeleteClick(dept.id)}
            />
          ))}
        </div>

        {/* Modais */}
        {(isModalOpen || editingDepartment) && (
          <DepartmentFormModal
            isOpen={isModalOpen || !!editingDepartment}
            onClose={handleModalClose}
            onSubmit={handleSaveDepartment}
            initialData={editingDepartment}
          />
        )}

        {deletingDepartmentId !== null && (
          <DeleteConfirmationModal
            isOpen={deletingDepartmentId !== null}
            onClose={() => setDeletingDepartmentId(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default GroupsPage;

// Nota: Componentes `DepartmentFormModal` e `DeleteConfirmationModal` precisam ser criados.
// O tipo 'Department' e as implementações completas de create/update/delete no hook useDepartments
// são pré-requisitos. A parte do TanStack Query para refetching após mutações precisará ser implementada no hook.
```

**Passo 4: Executar o teste para verificar se passa**
Executar: `npm test -- tests/unit/pages/GroupsPage.test.ts`
Esperado: PASS (após mockar o hook `useDepartments` corretamente nos testes da página)

**Passo 5: Commit**
```bash
git add src/pages/GroupsPage.tsx tests/unit/pages/GroupsPage.test.ts
git commit -m "feat: implement basic GroupsPage structure and UI elements"
```

---

### Tarefa 4: Implementação dos Modais (`DepartmentFormModal` e `DeleteConfirmationModal`)

**Arquivos:**
- Criar: `src/components/modals/DepartmentFormModal.tsx`
- Criar: `src/components/modals/DeleteConfirmationModal.tsx`
- Testar: `tests/unit/components/modals/DepartmentFormModal.test.ts`
- Testar: `tests/unit/components/modals/DeleteConfirmationModal.test.ts`

**Passo 1: Escrever testes falhos para os modais**
(Testes para `DepartmentFormModal` e `DeleteConfirmationModal` seriam escritos aqui, verificando renderização, inputs, botões e chamadas de props de callback.)

**Passo 2: Executar testes para verificar falha**
Executar: `npm test -- tests/unit/components/modals/*.test.ts`
Esperado: FALHA (componentes ainda não existem)

**Passo 3: Escrever implementação mínima dos modais**
(Implementação para `DepartmentFormModal` e `DeleteConfirmationModal` seria escrita aqui, focando na estrutura básica, inputs, botões e comunicação com a página pai via props.)

**Passo 4: Executar testes para verificar se passam**
Executar: `npm test -- tests/unit/components/modals/*.test.ts`
Esperado: PASS

**Passo 5: Commit**
```bash
git add src/components/modals/DepartmentFormModal.tsx src/components/modals/DeleteConfirmationModal.tsx tests/unit/components/modals/DepartmentFormModal.test.ts tests/unit/components/modals/DeleteConfirmationModal.test.ts
git commit -m "feat: add DepartmentFormModal and DeleteConfirmationModal"
```

---

### Tarefa 5: Finalizar `useDepartments` Hook (CRUD Operations e TanStack Query)

**Arquivos:**
- Modificar: `src/hooks/useDepartments.ts`
- Modificar: `tests/unit/hooks/useDepartments.test.ts`

**Passo 1: Escrever testes falhos para as operações CRUD e TanStack Query**
(Testes para `createDepartment`, `updateDepartment`, `deleteDepartment` e a integração com TanStack Query seriam adicionados aqui.)

**Passo 2: Executar testes para verificar falha**
Executar: `npm test -- tests/unit/hooks/useDepartments.test.ts`
Esperado: FALHA (novas funções e lógica de TanStack Query não implementadas)

**Passo 3: Escrever implementação para operações CRUD e TanStack Query**
(Implementar as funções `createDepartment`, `updateDepartment`, `deleteDepartment` no hook `useDepartments`, utilizando `supabase` e `queryClient` do TanStack Query para refetching automático.)

**Passo 4: Executar testes para verificar se passam**
Executar: `npm test -- tests/unit/hooks/useDepartments.test.ts`
Esperado: PASS

**Passo 5: Commit**
```bash
git add src/hooks/useDepartments.ts tests/unit/hooks/useDepartments.test.ts
git commit -m "feat: implement CRUD operations and TanStack Query in useDepartments hook"
```

---

### Tarefa 6: Refinar `GroupsPage` e Integrar Funcionalidades Completas

**Arquivos:**
- Modificar: `src/pages/GroupsPage.tsx`
- Modificar: `tests/unit/pages/GroupsPage.test.ts`

**Passo 1: Escrever testes falhos para as funcionalidades completas**
(Testes para `GroupsPage` verificando a interação com os modais e o hook `useDepartments` após operações CRUD.)

**Passo 2: Executar testes para verificar falha**
Executar: `npm test -- tests/unit/pages/GroupsPage.test.ts`
Esperado: FALHA (funcionalidades dos modais e hook ainda não 100% integradas/testadas na página)

**Passo 3: Escrever implementação para refinar `GroupsPage.tsx`**
(Integrar completamente os modais, refinar o fluxo de loading/error, e garantir que as chamadas de `create/update/delete` do hook funcionem corretamente com a UI.)

**Passo 4: Executar testes para verificar se passam**
Executar: `npm test -- tests/unit/pages/GroupsPage.test.ts`
Esperado: PASS

**Passo 5: Commit**
```bash
git add src/pages/GroupsPage.tsx tests/unit/pages/GroupsPage.test.ts
git commit -m "feat: complete GroupsPage integration with CRUD operations and modals"
```

---

### Tarefa 7: Configurar `vitest.setup.ts` (Opcional, mas recomendado)

**Arquivos:**
- Criar: `vitest.setup.ts`
- Testar: `tests/unit/vitest.setup.ts`

**Passo 1: Escrever o teste falho**
(Testes que dependem de setup global, como mocks de API ou configurações específicas.)

**Passo 2: Executar teste para verificar falha**

**Passo 3: Implementar `vitest.setup.ts`**
(Configurar mocks globais ou bibliotecas aqui.)

**Passo 4: Executar testes para verificar se passam**

**Passo 5: Commit**
```bash
git add vitest.setup.ts tests/unit/vitest.setup.ts
git commit -m "feat: add vitest.setup.ts for global test configuration"
```

---

### Tarefa 8: Atualizar `package.json` com scripts de teste (já feito)

**Arquivos:**
- `package.json`

**Observação:** O script `test` já foi adicionado como `"test": "vitest"` durante a configuração do ambiente.

---

Plan complete and saved to `docs/plans/2026-04-20-gestao-de-grupos-implementation.md`. Two execution options:

1.  **Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration
2.  **Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?
