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

## 03 — Proposta de identidade visual (20/11/2026)
- Pedido: avançar à próxima etapa, identidade visual e logo com IA.
- Objetivo: criar marca própria exigida no RF-16.
- Ferramenta: image_gen integrado ao Codex; geração real de símbolo PNG transparente.
- Resultado: xícara roxa com grão dourado, vapor e traços de movimento. Prompt completo em BRANDING.md; arquivo em public/brand.
- Decisão proposta: manter Coffee Delivery, usar roxo/dourado e base creme para a aplicação escura. Avaliação da aluna pendente.
- Evidências: arquivo gerado, BRANDING.md e brand-preview.html. Não declarar favicon/cabeçalho concluídos nesta etapa.

## 04 — Cabeçalho, rotas e temas (20/11/2026)
- Pedido/contexto: aprovação da marca e continuação da etapa de cabeçalho/temas.
- Ações: leitura do cabeçalho no Figma MCP, adaptação para styled-components, marca aprovada, fontes locais, React Router e ThemeProvider com hook useTheme.
- Decisões: substituir cidade fictícia por texto genérico; manter área de conteúdo inicial enquanto catálogo não está implementado. Checkout e Success mostram estados vazios, sem simular pedidos.
- Evidências: componentes e páginas em src, ícones locais em public/icons e screenshots em docs/evidencias.
- Validação real: build com TypeScript aprovado; ESLint aprovado; biblioteca Playwright (não MCP) testou rotas, imagens carregadas, preferência do sistema, escolha persistida, storage bloqueado e larguras 320/390/768/1440. Sem pageerrors. Screenshots desktop claro/mobile escuro inspecionados.
