# Coffee Delivery — especificação técnica

Status: base React + Vite convertida para TypeScript em 18/11/2026. As funcionalidades descritas abaixo ainda são planejadas.

## Tecnologias planejadas
- React + Vite + TypeScript: interface em componentes TSX, compilação e tipos explícitos.
- React Router: rotas `/`, `/checkout` e `/success` (RF-07).
- Context API + useReducer: compartilhar carrinho e centralizar alterações (RF-03 a RF-06).
- React Hook Form + Zod: campos e validação de endereço/pagamento (RF-08, RF-09, RF-11).
- styled-components: estilos e tokens de temas, conforme stack sugerida pelo professor (RF-14, RF-15).
- Vitest + Testing Library: regras e comportamento; Playwright pode complementar fluxo no navegador.
- ViaCEP: preenchimento de endereço (RF-08).
Versões e instalação serão verificadas na tarefa de configuração; esta lista não significa que as dependências já foram instaladas.

## Organização e responsabilidades
`src/data`: catálogo. `types`: modelos. `components`: elementos reutilizáveis. `pages`: Home, Checkout e Success. `contexts`: carrinho e tema. `reducers`: alterações do carrinho. `hooks`: acesso ao contexto, tema e consulta de CEP. `schemas`: validação Zod. `services`: integração CEP. `utils`: cálculos/formatação. `styles`: tokens e estilos globais. `tests`: verificações automatizadas.

Componentes previstos: Header, ThemeToggle, CoffeeCard, CoffeeCatalog, QuantityInput, CartBadge, CartItem, CartSummary, DeliveryAddressForm, PaymentMethodSelector, EmptyCart e PageLayout. Props transportam dados e callbacks; páginas coordenam componentes. App configura provedores e rotas, sem concentrar regras de negócio.

## Tipos previstos
```ts
interface Coffee {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  priceInCents: number;
}
interface CartItem { coffeeId: string; quantity: number }
interface DeliveryAddress {
  cep: string; street: string; number: string; complement?: string;
  neighborhood: string; city: string; uf: string;
}
type PaymentMethod = 'credit' | 'debit' | 'cash';
interface Order {
  id: string;
  createdAt: string;
  items: Array<{ coffeeId: string; name: string; quantity: number; unitPriceInCents: number }>;
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotalInCents: number;
  deliveryFeeInCents: number;
  totalInCents: number;
}
```
Não usar `any` para contornar erros. Validar dados externos e recuperados do armazenamento antes de utilizá-los.

## Carrinho e estado
CartProvider mantém estado com useReducer e expõe ações por useCart. Ações discriminadas: ADD_ITEM, INCREMENT_ITEM, DECREMENT_ITEM, REMOVE_ITEM, CLEAR_CART. Reducer puro: sem acesso a storage, API ou navegação. Atualizações retornam novos arrays/objetos; usar find, map, filter e reduce conforme necessidade (RF-03 a RF-05, RN-01 a RN-04).

ADD_ITEM soma produto já existente. DECREMENT_ITEM não reduz abaixo de 1. Contador usa soma das quantidades. Preços são consultados no catálogo, não aceitos cegamente do storage. Totais derivados em utilitário único; constante de frete 350 centavos para carrinho não vazio.

Inicializar estado a partir de localStorage validado. useEffect persiste mudanças, tratando JSON inválido e indisponibilidade de storage sem quebrar interface (RF-06). Chaves versionadas: coffee-delivery:cart:v1 e coffee-delivery:theme:v1.

## Checkout, CEP e confirmação
Schema Zod valida CEP normalizado com oito dígitos, campos obrigatórios sem espaços vazios, UF brasileira válida e enum de pagamento. Número é texto para aceitar formatos como 12A; complemento opcional. Formulário mostra erro junto ao campo e permite foco no primeiro erro (RF-08 a RF-11).

Consultar ViaCEP ao sair do CEP válido ou solicitar busca. Exibir carregamento e erro. Cancelar/ignorar resposta antiga se o usuário mudar o CEP, para não sobrescrever endereço mais recente. Preencher só dados disponíveis da consulta atual e permitir edição. Falha da API permite revisão manual, mantendo validações locais. Testes usam respostas simuladas, sem depender da disponibilidade externa.

Ao enviar: validar formulário e carrinho → construir Order independente, com cópias de itens/endereço e totais → guardar último pedido em estado e sessionStorage validado → limpar carrinho → navegar para `/success` (RF-12, RF-13). Não executar esse fluxo automaticamente em useEffect. Sem pedido válido, Sucesso apresenta estado vazio. Não registrar endereço real em logs/evidências; usar dados fictícios.

## Tema e acessibilidade
ThemeProvider e useTheme: escolha salva prevalece sobre preferência do sistema; se ausente, usar prefers-color-scheme. Tokens semânticos para fundo, superfície, texto, borda, ação, foco e erro. Aplicar em todas as páginas (RF-14).
Layout móvel como base; pontos de adaptação iniciais 768 e 1024 px, ajustados ao conteúdo. Verificar 320/390/768/1440 px, controles acessíveis por teclado, botões nomeados, campos com labels, feedback perceptível e contraste (RF-15). Assets locais, logo legível e favicon (RF-16).

## Plano de testes
- Reducer: repetição soma sem duplicar, incremento, mínimo 1, remoção, limpeza e imutabilidade.
- Cálculos: preço × quantidade, soma de unidades, frete vazio/não vazio, BRL e centavos.
- Validação: obrigatórios, complemento opcional, CEP inválido, pagamento ausente.
- CEP: sucesso, dados parciais, não encontrado, rede indisponível e resposta atrasada.
- Fluxo: catálogo → carrinho → checkout → sucesso; dados preservados após limpar carrinho; acesso direto sem pedido; confirmação inválida bloqueada.
- Persistência: refresh, JSON inválido e preferência de tema.
- Interface: desktop/mobile, dois temas, teclado, foco, ausência de overflow e console sem erros.

## Execução e publicação
Após instalar dependências com `npm.cmd ci`, usar `npm.cmd run dev`. Scripts atuais: dev, typecheck, build, lint e preview. Build verifica TypeScript antes de gerar produção. Adicionar script test junto aos testes das funcionalidades. Rodar lint, test e build antes da entrega. Publicar em Vercel ou Netlify e configurar fallback da SPA para acesso direto às rotas. Registrar URLs e resultados reais no README, sem alegar testes não executados.
