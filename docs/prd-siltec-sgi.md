# Product Requirements Document (PRD)

## 1. Informações Gerais
**Nome do Produto:** Siltec-Solutions | SGI
**Versão:** 1.0.0
**Status:** Em Desenvolvimento / MVP
**Data de Criação:** 26 de Abril de 2026

## 2. Visão Geral (Overview)
O **Santuário Digital** é uma plataforma abrangente de gestão de igrejas e ministérios projetada para líderes religiosos, pastores e administradores. O sistema visa modernizar a administração eclesiástica (mordomia), oferecendo uma interface elegante, intuitiva e centralizada para o acompanhamento de membros, controle financeiro, organização de eventos e estruturação de departamentos. 

Com um foco forte na experiência do usuário (UX), a interface adota princípios modernos de design (*glassmorphism*, gradientes suaves, responsividade *mobile-first*) para facilitar o trabalho administrativo e permitir que os líderes foquem em seu propósito comunitário e espiritual.

## 3. Público-Alvo
- Pastores e Liderança Eclesiástica
- Administradores e Secretários(as) da Igreja
- Líderes de Departamentos (Ex: Ministério Infantil, Jovens, Coral)
- Tesoureiros e Gestores Financeiros

## 4. Arquitetura e Tecnologias
- **Frontend:** React.js (com Functional Components e Hooks)
- **Roteamento:** React Router DOM (Single Page Application)
- **Estilização:** Tailwind CSS (Arquitetura orientada a utilitários)
- **Tipografia:** Famílias de fontes *Manrope* (títulos/destaques) e *Inter* (corpo de texto).
- **Ícones:** Material Symbols Outlined (Google)
- **Layout:** Estrutura responsiva (Sidebar em Desktop, Bottom Navigation em Mobile).

## 5. Escopo de Funcionalidades (Core Features)

### 5.1. Módulo de Autenticação (`/login`)
- **Login Seguro:** Acesso ao sistema mediante e-mail e senha.
- **Recuperação de Senha:** Fluxo para usuários que esqueceram a credencial.
- **Lembrar-me:** Persistência opcional da sessão.

### 5.2. Painel de Controle (Dashboard - `/`)
- **Resumo Geral:** Saudação personalizada com resumo imediato da congregação (número de almas, eventos essenciais do dia).
- **Métricas Rápidas Financeiras:** Totalização de dízimos ou entradas da semana com acompanhamento visual (gráfico estilo *sparkline*).
- **Crescimento Comunitário:** Visualização do número total de membros e taxa de crescimento no mês atual.
- **Agenda Diária:** Lista rápida dos compromissos, reuniões e cultos previstos para o dia.
- **Destaque do Próximo Evento:** Card visual destacando o evento mais próximo ou de maior importância.

### 5.3. Gestão de Membros (`/membros`)
- **Indicadores de Status:** Visão geral da saúde cadastral da comunidade (total de membros, total de ativos).
- **Diretório / Tabela de Membros:** 
  - Listagem com foto (avatar) ou iniciais, nome, data de registro, status (Ativo/Inativo), departamento alocado e informações de contato.
- **Filtros por Departamento:** Abas rápidas para segmentar por Grupos (ex: Ministério Jovem, Coral).
- **Exportação de Dados:** Capacidade de emitir o relatório de diretorato em formatos PDF ou CSV.
- **Controle de Paginação:** Navegação fluida para visualização de grandes volumes de pessoas.

### 5.4. Eventos e Agenda (`/eventos`)
- **Promoção de Mega Eventos:** Card amplo voltado para grandes convenções, destacando inscrições e informações fundamentais.
- **Quadro de Cultos Semanais:** Lista de horários de cultos recorrentes.
- **Calendário Comunitário:** Cards independentes para diversos eventos (retiros, ações sociais, noites de adoração) permitindo inscrições rápidas e gestão de capacidade.
- **Categorização:** Filtro por naturezas de eventos (Retiros, Feiras, Ações Comunitárias).

### 5.5. Financeiro (Finanças - `/financeiro`)
- **Visão Geral do Capital:** Visão holística do dinheiro operacional da igreja, permitindo ações rápidas de "Transferir" ou "Gerar Relatório".
- **Acompanhamento de Dízimos/Metas:** Comparação entre o planejado vs realizado no mês atual por barra de progresso.
- **Análise de Fluxo de Caixa:** Gráfico interativo evidenciando as oscilações de entradas contra saídas durante os semestres.
- **Alocação de Fundos (Capitações):** Gráfico estilo *Donut* apresentando como o montante geral é gasto (Ex: Missões, Programas e Operações).
- **Transações Recentes:** Extrato listando doações e custos operacionais com indicação visual para débito/crédito.

### 5.6. Departamentos e Grupos (`/grupos`)
- **Estatísticas de Engajamento:** Total visual do ecossistema informando quantos atuam ativamente como líderes em comparação a quantidade de membros.
- **Cartões de Departamento (Bento Grid):** 
  - Estruturação individual ilustrada para os polos da congregação (Equipe de Louvor, Jovens, Infantil, Finanças).
  - Listagem dos nomes dos respectivos líderes.
  - Indicadores de Vagas versus Participantes do ministério.
  - Informações de status sobre cada subunidade e avatar visual da comunidade acoplada.

## 6. Requisitos Não Funcionais
1. **Design System:** Rigoroso uso de efeitos como *glassmorphism*, e elevação suave utilizando `ambient-shadow` definidos no Tailwind Configuração Base.
2. **Responsividade Garantida:** Todo componente deve adaptar-se graciosamente para *viewports* com menos de 768px (Mobile), ajustando a navegação lateral para uma barra inferior de estilo aplicativo.
3. **Escalabilidade Visual:** A estrutura HTML deve permitir fácil reuso de links online estáticos para os assets visuais e `lucide-react` / `material-symbols` para a iconografia.

## 7. Integração com Supabase 
- Integração com Supabase Services (Supabase & Auth) para persistência de dados real oficial.
- Módulo de relatórios (Criação nativa de DRE e gráficos gerenciais interativos).
- Controle e acompanhamento de Escalas (Voluntários).

## 8. Controle de Acesso e Permissões

O sistema deve possuir diferentes níveis de acesso baseados em papéis (roles). Os níveis definidos são:

- **Membro (Member):** Acesso apenas para visualização de informações básicas (próprio perfil, eventos públicos). Não pode editar cadastros.
- **Líder de Departamento:** Pode cadastrar, editar e visualizar informações nos módulos de Membros, Eventos, Departamentos e Dashboard. No módulo Financeiro, possui apenas permissão de visualização.
- **Tesoureiro:** Possui permissão de CRUD completo (criar, ler, atualizar, deletar) apenas no módulo Financeiro. Não tem acesso aos demais módulos (ou apenas visualização conforme definido).
- **Super Admin (Administrador Geral):** Acesso total com privilégios de CRUD em todos os módulos do sistema (Autenticação, Dashboard, Membros, Eventos, Financeiro, Departamentos). Pode gerenciar papéis e permissões de outros usuários.

### Matriz de Permissões

| Módulo | Membro | Líder | Tesoureiro | Super Admin |
|--------|--------|--------|------------|-------------|
| Autenticação | Login próprio | Login próprio | Login próprio | Gerenciar usuários |
| Dashboard | Visualizar | Visualizar/Editar | Visualizar | CRUD |
| Membros | Visualizar (limitado) | CRUD | Visualizar | CRUD |
| Eventos | Visualizar | CRUD | Visualizar | CRUD |
| Financeiro | Sem acesso | Visualizar | CRUD | CRUD |
| Departamentos | Visualizar | CRUD | Visualizar | CRUD |

### Requisitos de Acesso

- **ACESSO-01:** Sistema deve diferenciar tipos de usuário (Membro, Líder, Tesoureiro, Super Admin)
- **ACESSO-02:** Membros só podem visualizar informações básicas (perfil próprio, eventos)
- **ACESSO-03:** Líderes podem cadastrar, editar e visualizar em Membros, Eventos, Departamentos e Dashboard
- **ACESSO-04:** Líderes têm apenas permissão de visualização no módulo Financeiro
- **ACESSO-05:** Tesoureiros têm permissão CRUD total apenas no módulo Financeiro
- **ACESSO-06:** Super Admin tem privilégios totais de CRUD em todos os módulos
- **ACESSO-07:** Super Admin pode gerenciar papéis e permissões de outros usuários
