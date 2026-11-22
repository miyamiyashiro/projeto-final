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

## 05 — Catálogo e quantidades (22/11/2026)
- Pedido: continuar a etapa de catálogo.
- Ferramenta: Figma MCP, get_design_context do frame 217:719, com referência visual.
- Resultado: catálogo local tipado com 14 produtos, imagens locais, tags, descrições e preço fictício de 990 centavos conforme Figma. CoffeeCard e QuantityInput reutilizáveis; quantidades independentes com mínimo 1. Rotação das imagens de Café com Leite e Havaiano preservada conforme referência.
- Limite desta etapa: botão de adicionar desabilitado até implementação do contexto/reducer; não há adição ou persistência de carrinho ainda. Intro da Home continua provisória, sem a ilustração e benefícios do Figma.
- Validação: build/TypeScript e ESLint aprovados. Biblioteca Playwright verificou 14 cards, incremento/decremento, mínimo 1, independência entre cards, imagens, temas e larguras 320/390/768/1440 sem overflow ou pageerrors. Screenshots catalog-desktop.png e catalog-mobile-dark.png revisados visualmente.

## 06 — Carrinho funcional (22/11/2026)
- Pedido: continuar após o catálogo.
- Implementação: CartProvider com Context API/useReducer; ações adicionar, incrementar, decrementar, remover e limpar; badge soma unidades; carrinho salvo em localStorage e recuperado com validação; preços sempre obtidos do catálogo. Totais em centavos e frete único de 350 centavos.
- Interface: botões dos cards ativados, resumo e edição do carrinho na rota Checkout, estado vazio e aviso quando armazenamento está bloqueado. Referência visual consultada via Figma MCP, frame 217:564. Formulário/pagamento/confirmar pedido ainda não implementados.
- Testes: 15 testes Vitest aprovados (reducer, imutabilidade, cálculos e recuperação de dados), build/TypeScript e ESLint aprovados. Biblioteca Playwright (não MCP) verificou soma de repetidos, badge, totais, edição, remoção, refresh, estados vazios, JSON inválido e storage bloqueado, temas e 320/390/768/1440px. Sem pageerrors. Capturas cart-desktop.png e cart-mobile-dark.png revisadas.

## 07 — Endereço e consulta de CEP (22/11/2026)
- Pedido: continuar a próxima etapa, mantendo desenvolvimento incremental.
- Implementação: React Hook Form e Zod validam CEP, campos obrigatórios e UF; complemento opcional. Serviço ViaCEP separado do formulário e hook com cancelamento, limite de dez segundos e proteção contra respostas antigas. Campos podem ser corrigidos manualmente.
- Referência: Figma MCP, painel 217:649; documentação pública https://viacep.com.br/. Labels e mensagens acrescentados para acessibilidade.
- Validação: 32 testes Vitest aprovados, build/TypeScript e lint aprovados. Biblioteca Playwright (não MCP) verificou campos obrigatórios, preenchimento automático, complemento opcional, CEP não encontrado, falha de rede com preenchimento manual, resposta parcial, temas e larguras 320/390/768/1440 sem overflow ou erros JavaScript.
- As respostas de CEP nos testes foram simuladas; não se trata de teste da disponibilidade real do ViaCEP. Capturas address-desktop.png e address-mobile-dark.png revisadas visualmente.
- Limite da etapa: Verificar endereço valida campos, mas ainda não confirma pedido. Pagamento e confirmação ficam na T09.
