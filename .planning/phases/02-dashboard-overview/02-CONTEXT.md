# Fase 2: Dashboard & Overview - Contexto

**Reunião:** 2026-05-05
**Status:** Pronto para planejamento

<domain>
## Escopo

Entregar Dashboard principal com métricas, resumo financeiro, e agenda diária.
</domain>

<decisions>
## Decisões de Implementação

### Identidade Visual
- **D-01:** Implementar nova identidade visual baseada em `docs/login.png` (referência de design)
  - Logo: "SANTUÁRIO DIGITAL" com ícone de cruz
  - Cores: Gradiente azul/púrpura/rosa
  - Background: Efeito nebular/galáctico
  - Card: Glass elevado com gradiente

### Layout do Dashboard
- **D-02:** Grid de cards — organização visual alinhada com novo design

### Métricas Financeiras
- **D-03:** Sparklines visuais — números com gráficos simples

### Agenda
- **D-04:** Próximo evento em destaque no topo

</decisions>

<references>
## Referências Canônicas

- `.planning/REQUIREMENTS.md` — requisitos DASH-01 a DASH-05
- `.planning/phases/01-authentication-system/01-UI-SPEC.md` — specs visuais atuais
- `docs/login.png` — referência de identidade visual
- `docs/{120D7DC1-0BD2-4F61-A668-2A37D94AC22D}.png` — referência de design

</references>

<codebase>
## Insights do Código Existente

- ComponentesAuth disponíveis em `src/components/auth/`
- Sistema de autenticação com contexto React
- Estilização com Tailwind CSS (glassmorphism)
- Mobile-first já implementado

</codebase>

<specifics>
## Ideias Específicas

Usuário manifestou desejo de alterar identidade visual do projeto — não apenas o Dashboard, mas o design system completo.

</specifics>

---

*Fase: 02-dashboard-overview*
*Contexto capturado: 2026-05-05*