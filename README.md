# Coffee Delivery

Projeto final acadêmico: cafeteria virtual com catálogo, carrinho e pedido fictício.

## Estado atual
Planejamento registrado e base React + Vite convertida para TypeScript. Cabeçalho com marca aprovada, fontes locais, temas persistidos e rotas Home/Checkout/Success implementados. Catálogo com 14 cafés e quantidades independentes implementado. Carrinho funcional: adicionar, somar repetidos, editar, remover, calcular totais e recuperar após refresh. Formulário com React Hook Form/Zod e consulta de CEP pelo ViaCEP implementados. Pagamento e confirmação fictícia implementados, com resumo independente salvo na sessão e limpeza do carrinho; Home completa com ilustração, fundo e benefícios do Figma, adaptada para celular e temas.

## Executar no Windows
Recomendado Node.js 24 LTS e npm.

```powershell
npm.cmd ci
npm.cmd run dev
```
Abra o endereço exibido no terminal. Para interromper, use Ctrl+C.

## Verificações
```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run test
npm.cmd run build
```
`typecheck` verifica os tipos; `lint` verifica regras de código; `build` verifica TypeScript e gera a versão de produção em `dist`. `npm.cmd run preview` permite conferir essa versão após o build. Vitest verifica carrinho, cálculos, recuperação de dados, validação de endereço e serviço de CEP (41 casos).

## Planejamento
- [Requisitos do produto](docs/PRD_SPEC.md)
- [Especificação técnica](docs/TECH_SPEC.md)
- [Etapas e progresso](docs/TASKS_SPEC.md)
- [Orientações do agente](AGENTS.md)
- [Uso de IA](docs/AI_USAGE.md)

## Design
[Figma de referência](https://www.figma.com/design/EW054NGdudJL4d1Z2uC2Ce/Coffee-Delivery?node-id=0-1).

Branding documentado em docs/BRANDING.md; primeiras capturas em docs/evidencias. Fluxo fictício de compra implementado; revisão local concluída; publicação ainda pendente.




## Teste completo no navegador
Instale o navegador uma vez com **npx.cmd playwright install chromium**.
Depois execute **npm.cmd run build** e **npm.cmd run test:e2e**.

A suíte em e2e usa produção local, CEP simulado e Chromium. Verifica fluxo nos dois temas, validação, acessibilidade automática com axe-core, tamanhos 320/390/768/1440, persistência e falhas. Análise automática não substitui testes manuais de acessibilidade.

## Publicação e entrega
[Passo a passo para Vercel e roteiro de demonstração](docs/PUBLICACAO.md).
**Site público: publicação pendente na conta da aluna.** vercel.json configura o fallback das rotas. Após publicar, inserir aqui a URL real e verificar acessos diretos.
[Repositório público](https://github.com/miyamiyashiro/projeto-final) · [Revisão final](docs/REVISAO_FINAL.md).

