# Coffee Delivery

Projeto final acadêmico: cafeteria virtual com catálogo, carrinho e pedido fictício.

## Estado atual
Planejamento registrado e base React + Vite convertida para TypeScript. Cabeçalho com marca aprovada, fontes locais, temas persistidos e rotas Home/Checkout/Success implementados. Catálogo com 14 cafés e quantidades independentes implementado. Botões de adicionar ainda desabilitados: carrinho e formulário de checkout permanecem pendentes; intro visual da Home ainda será completada.

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
npm.cmd run build
```
`typecheck` verifica os tipos; `lint` verifica regras de código; `build` verifica TypeScript e gera a versão de produção em `dist`. `npm.cmd run preview` permite conferir essa versão após o build. Testes de regras de negócio serão adicionados junto às funcionalidades.

## Planejamento
- [Requisitos do produto](docs/PRD_SPEC.md)
- [Especificação técnica](docs/TECH_SPEC.md)
- [Etapas e progresso](docs/TASKS_SPEC.md)
- [Orientações do agente](AGENTS.md)
- [Uso de IA](docs/AI_USAGE.md)

## Design
[Figma de referência](https://www.figma.com/design/EW054NGdudJL4d1Z2uC2Ce/Coffee-Delivery?node-id=0-1).

Branding documentado em docs/BRANDING.md; primeiras capturas em docs/evidencias. Fluxo de compra e publicação ainda pendentes.
