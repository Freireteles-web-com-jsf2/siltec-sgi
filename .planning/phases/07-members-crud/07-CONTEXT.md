# Phase 7: Members CRUD - Context

**Gathered:** 2026-05-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Implementar operações CRUD para membros da congregação com formulários em modal, validação e persistência em localStorage.

</domain>

<decisions>
## Implementation Decisions

### UI Forms
- **D-01:** Usar Modal overlay para formulários (não página dedicada)
- **D-02:** Create e Edit usam modais separados (diferentes do modal create)

### Claude's Discretion
- Componentes reutilizáveis (Modal, Input, Button) — criar conforme necessidade
- Estrutura do formulário — campos: nome, e-mail, telefone, departamento, status

</decisions>

<canonical_refs>
## Canonical References

### Project Files
- `.planning/PROJECT.md` — Projeto Siltec-SGI contexto
- `.planning/REQUIREMENTS.md` — Requisitos v2.0
- `.planning/ROADMAP.md` — Fase 7 detalhes

### Codebase
- `src/pages/MembersPage.jsx` — Página de membros (leitura apenas)
- `src/components/auth/LoginForm.jsx` — Exemplo de formulário existente
- `src/contexts/AuthContext.jsx` — Contexto de autenticação

### Research
- `.planning/research/STACK.md` — Stack recomendado: React Hook Form + Zod
- `.planning/research/FEATURES.md` — Features CRUD
- `.planning/research/ARCHITECTURE.md` — Arquitetura de dados
- `.planning/research/PITFALLS.md` — Armadilhas comuns

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- LoginForm.jsx — Exemplo de formulário em React
- AuthContext.jsx — Padrão de Context API
- Tailwind CSS — Estilização glassmorphism

### Established Patterns
- Card glassmorphism: `card-glass rounded-xl`
- Botões: `bg-purple-600 hover:bg-purple-500`
- Inputs: `bg-white/10 border-white/20 rounded-lg`

### Integration Points
- MembersPage.jsx — Adicionar botões de ação
- SidebarLayout — Inserir modal wrapper
- localStorage — Persistência de dados

</code_context>

<specifics>
## Specific Ideas

- Modal create: Abre com botão "Cadastrar Membro"
- Modal edit: Abre ao clicar no membro na tabela
- Exclusão: Dialog de confirmação antes de excluir
- Feedback: Toast notification após operações

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-members-crud*
*Context gathered: 2026-05-05*