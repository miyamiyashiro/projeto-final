# Uso de IA no projeto

Registrar interações reais: prompt, objetivo, resposta resumida, decisão e evidência. Exigência final: pelo menos três interações relevantes; não contar tarefas futuras como realizadas.

## 01 — Análise e organização inicial (17–18/11/2026)
- Ferramenta: Codex.
- Pedido: analisar o novo projeto e avançar por partes até dia 24; depois trazer para este computador o repositório criado na faculdade.
- Objetivo: entender requisitos e preparar trabalho incremental.
- Resposta/ações: leitura do enunciado, consulta da estrutura da cópia do Figma, clonagem e inspeção do template; identificação de JavaScript onde o projeto exige TypeScript; preparação dos SPECs e AGENTS.
- Decisão: preservar repositório existente, documentar primeiro e migrar para TypeScript na próxima etapa. Frete e regra de quantidade estão propostos no PRD para leitura da aluna.
- Evidência: conversa do Codex e arquivos PRD_SPEC.md, TECH_SPEC.md e TASKS_SPEC.md. Commit de documentação ainda pendente. Esta interação não contém teste funcional, logo gerada ou implementação das telas.

## Próximos registros
Acrescentar interações reais de implementação/revisão e testes conforme acontecerem, incluindo resultado e decisão tomada pela aluna.

## 02 — Migração para TypeScript (18/11/2026)
- Pedido: continuar a próxima etapa após o planejamento.
- Objetivo: adequar a base JavaScript à exigência de TypeScript, preservando a tela inicial.
- Ações: conversão de App/main para TSX e configuração Vite para TS; configuração estrita de tipos, ESLint e build; instalação de dependências e atualização do README.
- Decisão: manter o exemplo inicial até validar a configuração; instalar bibliotecas de funcionalidades nas próximas tarefas.
- Evidência: alterações nos arquivos TSX/tsconfig e scripts; build com TypeScript aprovado, lint sem erros e verificação real com biblioteca Playwright no Chromium (tela renderiza, contador responde, sem pageerrors). Esta verificação não utilizou Playwright MCP.
- Observação: npm reportou dez alertas de severidade alta na instalação; consulta detalhada do npm audit não retornou durante esta etapa e foi interrompida. Revisão de dependências pendente; nenhuma correção automática incompatível foi aplicada.
