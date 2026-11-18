# Coffee Delivery — tarefas pequenas

Status inicial em 18/11/2026. Prazo informado: 24/11. Datas são metas, não execução comprovada. Cada tarefa deve registrar teste/revisão realizada e commit; avançar em etapas que a aluna possa acompanhar.

| ID | Objetivo | Requisitos | Arquivos/áreas previstos | Critério de pronto | Status |
| --- | --- | --- | --- | --- | --- |
| T01 | Planejar produto e técnica | RF-01–16, RN-01–10 | docs/*SPEC.md, AGENTS.md | Documentos criados, decisões lidas pela aluna e versionadas antes do código | Rascunho pronto; leitura e commit pendentes |
| T02 | Migrar template para TypeScript | RF-07, arquitetura | package.json, lock, tsconfig, vite/eslint config, src/*.tsx | Dev abre, checagem TS, lint e build passam | Pendente |
| T03 | Criar identidade com IA | RF-16 | assets, favicon, docs/BRANDING.md | Prompt/resultado reais registrados, logo clara/escura legível | Pendente |
| T04 | Criar rotas, layout e temas | RF-07,14,15 | pages, styles, contexts, Header | Três rotas, toggle persistido e layout básico móvel | Pendente |
| T05 | Criar catálogo e cards | RF-01,02,15 | data, types, CoffeeCard, Home | Produtos completos e quantidade positiva | Pendente |
| T06 | Criar reducer e contexto | RF-03–05,10; RN-01–04 | reducers, contexts, hooks, utils, tests | Ações, contador e cálculos com testes aprovados | Pendente |
| T07 | Persistir e exibir carrinho | RF-05,06,11; RN-06,09 | CartItem, CartSummary, storage | Refresh recupera; vazio e JSON inválido tratados | Pendente |
| T08 | Formulário e CEP | RF-08,11; RN-07 | schemas, services, hooks, DeliveryAddressForm | Sucesso e erros de CEP tratados, campos validados | Pendente |
| T09 | Pagamento e finalizar | RF-09–13; RN-05,06,10 | Checkout, Success, tipos Order | Fluxo válido gera resumo independente e limpa carrinho | Pendente |
| T10 | Revisar mobile, temas e acesso | RF-14–16 | styles, components, pages | Fluxo utilizável em 390/768/1440 e verificação 320; teclado e foco | Pendente |
| T11 | Testar e reunir evidências | Todos | tests, docs/evidencias, AI_USAGE.md | Testes/build/lint verificados; prints e três interações reais | Pendente |
| T12 | Publicar e preparar entrega | Aceite final | README, SPECs, configuração deploy | URL pública, rotas diretas, GitHub e demonstração conferidos | Pendente |

## Metas atualizadas
- 18/11: T01 e início de T02.
- 19/11: T02–T05, com identidade simples e layout base.
- 20/11: T06–T07.
- 21/11: T08.
- 22/11: T09–T10.
- 23/11: T11–T12.
- 24/11: margem para ajustes, conferência da entrega e treino.

## Registro de validação
- T01: enunciado lido e estrutura do Figma acessada; base local conferida como template React JavaScript. Documentos descrevem implementação futura, sem declarar funcionalidades já entregues.
- Testes do aplicativo: ainda não executados nesta etapa documental.
- Primeiro commit de planejamento sugerido: `docs: planeja requisitos e etapas do Coffee Delivery`.
