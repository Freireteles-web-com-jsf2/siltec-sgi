# Requirements: Siltec-SGI

**Defined:** 2026-05-06
**Core Value:** Centralizar e simplificar a administração eclesiástica através de uma interface moderna

**Milestone:** v3.0 Advanced Analytics

---

## v1 Requirements (Completed ✓)

### Authentication
- [x] **AUTH-01**: Usuário pode acessar o sistema com e-mail e senha (Phase 1)
- [x] **AUTH-02**: Usuário pode recuperar senha através de fluxo de recuperação (Phase 1)
- [x] **AUTH-03**: Usuário pode optar por "Lembrar-me" para persistência de sessão (Phase 1)

### Dashboard & Overview
- [x] **DASH-01**: Usuário visualiza resumo personalizado com saudação e métricas (Phase 2)

### Members Management
- [x] **MEMB-01**: Usuário visualiza indicadores de status da saúde cadastral (Phase 3)

### Events & Agenda
- [x] **EVT-01**: Usuário visualiza card promocional de mega eventos (Phase 4)

### Financial Management
- [x] **FIN-01**: Usuário visualiza visão holística do capital operacional (Phase 5)

### Departments & Groups
- [x] **GRP-01**: Usuário visualiza estatísticas de engajamento (Phase 6)

---

## v2 Requirements (Completed ✓)

### Members CRUD
- [x] **MEMB-CRUD-01**: Usuário pode cadastrar novo membro (Phase 7)
- [x] **MEMB-CRUD-02**: Usuário pode editar detalhes de membro (Phase 7)
- [x] **MEMB-CRUD-03**: Usuário pode excluir membro (Phase 7)
- [x] **MEMB-CRUD-04**: Usuário pode excluir múltiplos membros (Phase 7)
- [x] **MEMB-CRUD-05**: Usuário pode ativar/desativar status (Phase 7)
- [x] **MEMB-CRUD-06**: Usuário pode importar membros via CSV (Phase 7)

### Events CRUD
- [x] **EVT-CRUD-01**: Usuário pode criar novo evento (Phase 8)
- [x] **EVT-CRUD-02**: Usuário pode editar evento (Phase 8)
- [x] **EVT-CRUD-03**: Usuário pode excluir evento (Phase 8)
- [x] **EVT-CRUD-04**: Usuário pode cancelar evento (Phase 8)
- [x] **EVT-CRUD-05**: Usuário pode gerenciar inscrições (Phase 8)
- [x] **EVT-CRUD-06**: Usuário pode criar eventos recorrentes (Phase 8)

### Departments CRUD
- [x] **DEPT-CRUD-01**: Usuário pode criar departamento (Phase 9)
- [x] **DEPT-CRUD-02**: Usuário pode editar departamento (Phase 9)
- [x] **DEPT-CRUD-03**: Usuário pode excluir departamento (Phase 9)
- [x] **DEPT-CRUD-04**: Usuário pode atribuir líder (Phase 9)
- [x] **DEPT-CRUD-05**: Usuário pode gerenciar membros (Phase 9)
- [x] **DEPT-CRUD-06**: Usuário pode criar sub-grupos (Phase 9)

### Financial CRUD
- [x] **FIN-CRUD-01**: Usuário pode criar transação (Phase 10)
- [x] **FIN-CRUD-02**: Usuário pode editar transação (Phase 10)
- [x] **FIN-CRUD-03**: Usuário pode excluir transação (Phase 10)
- [x] **FIN-CRUD-04**: Usuário pode criar metas de alocação (Phase 10)
- [x] **FIN-CRUD-05**: Usuário pode registrar dízimo (Phase 10)
- [x] **FIN-CRUD-06**: Usuário pode exportar relatórios (Phase 10)

### Infrastructure
- [x] **INF-01**: Sistema persiste dados em localStorage (Phase 7)
- [x] **INF-02**: Sistema exibe notificações toast (Phase 7)
- [x] **INF-03**: Sistema valida formulários (Phase 7)
- [x] **INF-04**: Sistema verifica permissões (Phase 7)

---

## v3 Requirements (Advanced Analytics & Reporting)

### Analytics Dashboard

- [ ] **ANLT-01**: Usuário visualiza dashboard analítico com visão geral de todos os módulos
- [ ] **ANLT-02**: Usuário visualiza gráficos de crescimento de membros ao longo do tempo
- [ ] **ANLT-03**: Usuário visualiza distribuição de membros por departamento (gráfico de pizza/barras)
- [ ] **ANLT-04**: Usuário visualiza métricas de engajamento (membros ativos vs inativos)
- [ ] **ANLT-05**: Usuário visualiza tendências financeiras (receitas vs despesas mensais)

### Member Analytics

- [ ] **MEMB-ANA-01**: Usuário visualiza relatório de crescimento de membros (mensal, trimestral, anual)
- [ ] **MEMB-ANA-02**: Usuário visualiza membros por status (ativo, inativo, novo)
- [ ] **MEMB-ANA-03**: Usuário visualiza taxa de retenção de membros
- [ ] **MEMB-ANA-04**: Usuário visualiza membros ausentes frequentes
- [ ] **MEMB-ANA-05**: Usuário pode filtrar membros por critérios analíticos

### Event Analytics

- [ ] **EVT-ANA-01**: Usuário visualiza taxa de participação em eventos
- [ ] **EVT-ANA-02**: Usuário visualiza eventos mais populares (ranking)
- [ ] **EVT-ANA-03**: Usuário visualiza tendência de participação ao longo do tempo
- [ ] **EVT-ANA-04**: Usuário visualiza média de participantes por tipo de evento

### Financial Analytics

- [ ] **FIN-ANA-01**: Usuário visualiza balanço financeiro mensal com gráficos
- [ ] **FIN-ANA-02**: Usuário visualiza comparativo orçado vs realizado
- [ ] **FIN-ANA-03**: Usuário visualiza relatório de dízimos por membro
- [ ] **FIN-ANA-04**: Usuário visualiza projeções financeiras simples

### Interactive Reports

- [ ] **RPT-01**: Usuário pode gerar relatório customizado selecionando métricas
- [ ] **RPT-02**: Usuário pode exportar relatórios analíticos em PDF/Excel
- [ ] **RPT-03**: Usuário pode agendar envio automático de relatórios (e-mail)
- [ ] **RPT-04**: Usuário pode comparar períodos diferentes (ex: este ano vs ano passado)

---

## v4 Requirements (Deferred)

### Advanced Predictive Analytics
- **ANLT-EXT-01**: Previsão de crescimento baseada em histórico
- **ANLT-EXT-02**: Alertas inteligentes para métricas abaixo do esperado

### Real-time Dashboards
- **ANLT-EXT-03**: Atualização em tempo real das métricas
- **ANLT-EXT-04**: WebSockets para notificações de mudanças

---

## Out of Scope (v3.0)

| Feature | Reason |
|---------|--------|
| Machine Learning avançado | Complexidade alta, versão futura |
| Integração com redes sociais | Fora do escopo do milestone atual |
| Dashboards públicos para membros | Requer controle de acesso especial |
| APIs externas para dados demográficos | Requer pesquisa adicional |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ANLT-01 | Phase 11 | Pending |
| ANLT-02 | Phase 11 | Pending |
| ANLT-03 | Phase 11 | Pending |
| ANLT-04 | Phase 11 | Pending |
| ANLT-05 | Phase 11 | Pending |
| MEMB-ANA-01 | Phase 12 | Pending |
| MEMB-ANA-02 | Phase 12 | Pending |
| MEMB-ANA-03 | Phase 12 | Pending |
| MEMB-ANA-04 | Phase 12 | Pending |
| MEMB-ANA-05 | Phase 12 | Pending |
| EVT-ANA-01 | Phase 13 | Pending |
| EVT-ANA-02 | Phase 13 | Pending |
| EVT-ANA-03 | Phase 13 | Pending |
| EVT-ANA-04 | Phase 13 | Pending |
| FIN-ANA-01 | Phase 14 | Pending |
| FIN-ANA-02 | Phase 14 | Pending |
| FIN-ANA-03 | Phase 14 | Pending |
| FIN-ANA-04 | Phase 14 | Pending |
| RPT-01 | Phase 15 | Pending |
| RPT-02 | Phase 15 | Pending |
| RPT-03 | Phase 15 | Pending |
| RPT-04 | Phase 15 | Pending |

**Coverage:**
- v3 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0 ✓

---

*Requirements defined: 2026-05-06*
*Last updated: 2026-05-06 after v3.0 requirements definition*
