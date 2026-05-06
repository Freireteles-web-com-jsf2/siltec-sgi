# Requirements: Siltec-SGI

**Defined:** 2026-05-05
**Core Value:** Centralizar e simplificar a administração eclesiástica através de uma interface moderna

**Milestone:** v2.0 CRUD Operations

---

## v1 Requirements

Requirements for CRUD operations milestone.

### Members CRUD

- [x] **MEMB-CRUD-01**: Usuário pode cadastrar novo membro com formulário (nome, e-mail, telefone, departamento, status)
- [x] **MEMB-CRUD-02**: Usuário pode editar detalhes de membro existente
- [x] **MEMB-CRUD-03**: Usuário pode excluir membro com confirmação
- [x] **MEMB-CRUD-04**: Usuário pode excluir múltiplos membros (bulk delete)
- [x] **MEMB-CRUD-05**: Usuário pode ativar/desativar status de membro
- [x] **MEMB-CRUD-06**: Usuário pode importar membros via upload CSV

### Events CRUD

- [x] **EVT-CRUD-01**: Usuário pode criar novo evento (título, data, horário, descrição, capacidade, categoria)
- [x] **EVT-CRUD-02**: Usuário pode editar detalhes do evento
- [x] **EVT-CRUD-03**: Usuário pode excluir evento com confirmação
- [x] **EVT-CRUD-04**: Usuário pode cancelar evento
- [x] **EVT-CRUD-05**: Usuário pode gerenciar inscrições (aprovar/rejeitar) + seleção de membros
- [x] **EVT-CRUD-06**: Usuário pode criar eventos recorrentes

### Departments CRUD

- [x] **DEPT-CRUD-01**: Usuário pode criar novo departamento (nome, ícone, líder, capacidade, descrição)
- [x] **DEPT-CRUD-02**: Usuário pode editar detalhes do departamento
- [x] **DEPT-CRUD-03**: Usuário pode excluir departamento com confirmação
- [x] **DEPT-CRUD-04**: Usuário pode atribuir/alterar líder do departamento
- [x] **DEPT-CRUD-05**: Usuário pode gerenciar membros do departamento
- [x] **DEPT-CRUD-06**: Usuário pode criar sub-grupos dentro do departamento

### Financial CRUD

- [x] **FIN-CRUD-01**: Usuário pode criar transação (tipo, descrição, valor, data, categoria)
- [x] **FIN-CRUD-02**: Usuário pode editar transação
- [x] **FIN-CRUD-03**: Usuário pode excluir transação com confirmação
- [x] **FIN-CRUD-04**: Usuário pode criar/editar metas de alocação
- [x] **FIN-CRUD-05**: Usuário pode registrar dízimo/oferta por membro
- [x] **FIN-CRUD-06**: Usuário pode exportar relatórios financeiros (PDF)

### Infrastructure

- [x] **INF-01**: Sistema persiste dados em localStorage
- [x] **INF-02**: Sistema exibe notificações toast para feedback
- [x] **INF-03**: Sistema valida formulários com mensagens de erro
- [x] **INF-04**: Sistema verifica permissões antes de permitir operações CRUD

---

## v2 Requirements

Deferred to future release.

### Members Extended

- **MEMB-EXT-01**: Perfil do membro com histórico de participação
- **MEMB-EXT-02**: Anotações/comentários por membro
- **MEMB-EXT-03**: Estatísticas avançadas de membros

### Events Extended

- **EVT-EXT-01**: Check-in de evento (QR code)
- **EVT-EXT-02**: Enviar notificação aos participantes

### Departments Extended

- **DEPT-EXT-01**: Calendário de departamento
- **DEPT-EXT-02**: Relatórios de departamento

### Financial Extended

- **FIN-EXT-01**: Transações recorrentes (aluguel mensal, etc.)
- **FIN-EXT-02**: Orçamento vs realizado

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multi-tenant (múltiplas igrejas) | MVP focado em instância única |
| Integração com gateways de pagamento | Escopo para versão futura |
| Automação de e-mails | Escopo para versão futura |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MEMB-CRUD-01 | Phase 7 | Pending |
| MEMB-CRUD-02 | Phase 7 | Pending |
| MEMB-CRUD-03 | Phase 7 | Pending |
| MEMB-CRUD-04 | Phase 7 | Pending |
| MEMB-CRUD-05 | Phase 7 | Pending |
| MEMB-CRUD-06 | Phase 7 | Pending |
| EVT-CRUD-01 | Phase 8 | Pending |
| EVT-CRUD-02 | Phase 8 | Pending |
| EVT-CRUD-03 | Phase 8 | Pending |
| EVT-CRUD-04 | Phase 8 | Pending |
| EVT-CRUD-05 | Phase 8 | Pending |
| EVT-CRUD-06 | Phase 8 | Pending |
| DEPT-CRUD-01 | Phase 9 | Pending |
| DEPT-CRUD-02 | Phase 9 | Pending |
| DEPT-CRUD-03 | Phase 9 | Pending |
| DEPT-CRUD-04 | Phase 9 | Pending |
| DEPT-CRUD-05 | Phase 9 | Pending |
| DEPT-CRUD-06 | Phase 9 | Pending |
| FIN-CRUD-01 | Phase 10 | Pending |
| FIN-CRUD-02 | Phase 10 | Pending |
| FIN-CRUD-03 | Phase 10 | Pending |
| FIN-CRUD-04 | Phase 10 | Pending |
| FIN-CRUD-05 | Phase 10 | Pending |
| FIN-CRUD-06 | Phase 10 | Pending |
| INF-01 | Phase 7 | Pending |
| INF-02 | Phase 7 | Pending |
| INF-03 | Phase 7 | Pending |
| INF-04 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 30
- Unmapped: 0 ✓

---

*Requirements defined: 2026-05-05*
*Last updated: 2026-05-05 after v2.0 requirements definition*