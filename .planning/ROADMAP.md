# Roadmap: Siltec-SGI

**Created:** 2026-05-05
**Milestone:** v2.0 CRUD Operations
**Total Phases:** 4
**Total v1 Requirements:** 30

---

## Phase Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 7 | Members CRUD | Implementar operações CRUD para membros com formulários e persistência | MEMB-CRUD-01 to MEMB-CRUD-06, INF-01 to INF-04 | 10 |
| 8 | Events CRUD | Implementar operações CRUD para eventos com formulários e capacidade | EVT-CRUD-01 to EVT-CRUD-06 | 6 |
| 9 | Departments CRUD | Implementar operações CRUD para departamentos com gestão de líderes | DEPT-CRUD-01 to DEPT-CRUD-06 | 6 |
| 10 | Financial CRUD | Implementar operações CRUD para transações financeiras | FIN-CRUD-01 to FIN-CRUD-06 | 6 |

---

## Phase Details

### Phase 7: Members CRUD

**Goal:** Implementar operações CRUD para membros com formulários, validação e persistência

**Requirements:**
- MEMB-CRUD-01: Cadastrar novo membro
- MEMB-CRUD-02: Editar membro
- MEMB-CRUD-03: Excluir membro
- MEMB-CRUD-04: Bulk delete
- MEMB-CRUD-05: Ativar/desativar status
- MEMB-CRUD-06: Importar CSV
- INF-01: Persistência localStorage
- INF-02: Toast notifications
- INF-03: Validação de formulários
- INF-04: Verificação de permissões

**Success Criteria:**
1. Usuário pode cadastrar novo membro através de modal comvalidação
2. Usuário pode editar membro existente com pré-preenchimento
3. Usuário pode excluir membro com dialog deconfirmação
4. Usuário pode selecionar e excluir múltiplos membros
5. Usuário pode ativar/desativar status de membro com um clique
6. Usuário pode importar membros via arquivo CSV
7. Sistema salva dados em localStorage
8. Sistema exibe notificações toast para feedback
9. Sistema exibe erros de validação no formulário
10. Sistema verifica permissões do usuário

**UI hint:** yes

**Plans:** 1 plan

---

### Phase 8: Events CRUD

**Goal:** Implementar operações CRUD para eventos com gestão de capacidades e inscrições

**Requirements:**
- EVT-CRUD-01: Criar evento
- EVT-CRUD-02: Editar evento
- EVT-CRUD-03: Excluir evento
- EVT-CRUD-04: Cancelar evento
- EVT-CRUD-05: Gerenciar inscrições
- EVT-CRUD-06: Eventos recorrentes

**Success Criteria:**
1. Usuário pode criar novo evento com formulário completo
2. Usuário pode editar detalhes do evento
3. Usuário pode excluir evento com confirmação
4. Usuário pode cancelar evento (marcar cancelado)
5. Usuário pode aprovar/rejeitar inscrições
6. Usuário pode criar eventos que se repetem semanalmente

**UI hint:** yes

**Plans:** 1 plan

---

### Phase 9: Departments CRUD

**Goal:** Implementar operações CRUD para departamentos com gestão de líderes e membros

**Requirements:**
- DEPT-CRUD-01: Criar departamento
- DEPT-CRUD-02: Editar departamento
- DEPT-CRUD-03: Excluir departamento
- DEPT-CRUD-04: Atribuir líder
- DEPT-CRUD-05: Gerenciar membros
- DEPT-CRUD-06: Sub-grupos

**Success Criteria:**
1. Usuário pode criar novo departamento
2. Usuário pode editar departamento existente
3. Usuário pode excluir departamento com aviso de membros
4. Usuário pode atribuir ou alterar líder do departamento
5. Usuário pode adicionar/remover membros no departamento
6. Usuário pode criar sub-grupos dentro de departamentos

**UI hint:** yes

**Plans:** 1 plan

---

### Phase 10: Financial CRUD

**Goal:** Implementar operações CRUD para transações financeiras com relatórios

**Requirements:**
- FIN-CRUD-01: Criar transação
- FINAL-CRUD-02: Editar transação
- FIN-CRUD-03: Excluir transação
- FIN-CRUD-04: Metas de alocação
- FINAL-CRUD-05: Registro de dízimo
- FIN-CRUD-06: Exportar relatórios

**Success Criteria:**
1. Usuário pode criar transação (entrada/saída)
2. Usuário pode editar transação existente
3. Usuário pode excluir transação com confirmação
4. Usuário pode criar e editar metas de alocação
5. Usuário pode registrar dízimo por membro
6. Usuário pode exportar relatório financeiro em PDF

**UI hint:** yes

**Plans:** 1 plan

---

## Milestones

### Milestone v2.0: CRUD Operations

**Target:** Complete CRUD operations for all modules

**Coverage:** 30/30 v1 requirements (100%)

---

*Roadmap created: 2026-05-05*
*Last updated: 2026-05-05 after v2.0 roadmap creation*