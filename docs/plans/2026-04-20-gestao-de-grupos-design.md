# Plano de Design: Gerenciamento de Grupos

**Data:** 20 de Abril de 2026
**Versão:** 1.0.0

## 1. Visão Geral e Objetivos

Esta página, localizada em `/grupos`, terá como objetivo gerenciar departamentos e ministérios dentro do Santuário Digital. Ela permitirá a visualização detalhada de cada grupo, incluindo a contagem de membros associados, e suportará as operações de criação, edição e exclusão de departamentos, seguindo um layout "Bento Grid" e o tema visual de *glassmorphism* do projeto.

## 2. Arquitetura e Componentes

-   **Componente Principal:** `GroupsPage.tsx` (roteado para `/grupos`), integrado ao `MainLayout`.
-   **Hook de Dados:** `useDepartments` (ou `useGroups`) para interagir com o Supabase via TanStack Query, gerenciando fetch, create, update, delete.
-   **Layout:** Adaptação do "Bento Grid" para exibir `DepartmentCard`s.
-   **Gerenciamento:** Modais para criação/edição (`DepartmentFormModal`) e confirmação de exclusão (`DeleteConfirmationModal`).

## 3. Elementos de UI e Exibição de Dados

-   **`DepartmentCard`:** Componente reutilizável para exibir nome, descrição e contagem de membros de um departamento. Inclui menu de opções ("Editar", "Excluir") e estilo *glassmorphism*.
-   **Modais:**
    -   `DepartmentFormModal`: Contém campos para Nome e Descrição, com botões "Salvar" e "Cancelar".
    -   `DeleteConfirmationModal`: Para confirmação de exclusão com "Confirmar Exclusão" e "Cancelar".
-   **Grade Responsiva:** Organiza os `DepartmentCard`s, ajustando-se a diferentes tamanhos de tela.

## 4. Fluxo de Dados, Tratamento de Erros e Testes

-   **Fluxo de Dados:** Carregamento inicial via `useDepartments`, fetch de dados do Supabase. Operações de escrita (create, update, delete) via `useDepartments` com invalidação de cache para re-fetch.
-   **Tratamento de Erros:** Mensagens de erro exibidas via `Alert` ou nos modais para falhas de fetch/escrita e validação de input.
-   **Testes:** Unitários para componentes e hook `useDepartments`. Testes E2E (Playwright/Cypress) para fluxos completos de usuário.
