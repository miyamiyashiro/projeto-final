# Coffee Delivery — especificação do produto

Status: planejamento inicial, 18/11/2026. Prazo informado: 24/11/2026.

## Objetivo e público
Criar uma cafeteria virtual para pessoas que desejam escolher cafés e simular um pedido de entrega. A aplicação deve tornar claros os produtos, as quantidades, o endereço e o valor final.

## Referências
- Enunciado: https://deluxe-blue-bc1.notion.site/Projeto-Final-05-Coffee-Delivery-React-TypeScript-IA-41bdfca74d8d8119a849e30ea492a6af
- Figma: https://www.figma.com/design/EW054NGdudJL4d1Z2uC2Ce/Coffee-Delivery?node-id=0-1
- Frames: Home 2:1550; Checkout 217:511; Checkout preenchido 222:564; Sucesso 222:824.

## Escopo e fluxo
Home: escolher café e quantidade → adicionar ao carrinho → Checkout: revisar itens, informar endereço e pagamento → confirmar → Sucesso: consultar dados do pedido concluído.
Inclui temas claro/escuro, adaptação a celular, logo original com IA, testes, documentação e publicação.
Não inclui autenticação, backend próprio, banco de dados, cobrança real, rastreamento real, cupons ou histórico de pedidos. Consulta a API pública de CEP está incluída.

## Requisitos e critérios de aceite
| ID | Requisito | Como verificar |
| --- | --- | --- |
| RF-01 | Catálogo com imagem, nome, descrição, preço e tags | Todos os produtos exibem os cinco dados na Home |
| RF-02 | Selecionar quantidade | Controles aceitam somente inteiros positivos |
| RF-03 | Adicionar ao carrinho | Repetir produto soma quantidade sem duplicar linhas |
| RF-04 | Contador no cabeçalho | Dois cafés de um tipo e três de outro mostram 5 |
| RF-05 | Alterar/remover itens | Quantidade, contador e totais mudam imediatamente |
| RF-06 | Persistir carrinho | Atualizar a página recupera produtos e quantidades |
| RF-07 | Navegar com React Router | Home, Checkout e Sucesso abrem sem recarga completa |
| RF-08 | Endereço e API de CEP | CEP válido preenche campos disponíveis; erros e carregamento são visíveis; número é manual e complemento opcional |
| RF-09 | Forma de pagamento | Exige uma opção: crédito, débito ou dinheiro |
| RF-10 | Resumo financeiro | Subtotal + frete corresponde ao total, em reais |
| RF-11 | Bloquear pedido inválido | Carrinho vazio ou formulário inválido não finaliza; erros são acessíveis |
| RF-12 | Confirmar pedido fictício | Sucesso mostra endereço e pagamento escolhidos |
| RF-13 | Limpar carrinho após confirmação | Carrinho fica vazio, mas resumo confirmado continua correto |
| RF-14 | Tema claro/escuro | Todas as telas respeitam tema e escolha persiste |
| RF-15 | Responsividade | Fluxo completo funciona no celular sem rolagem horizontal |
| RF-16 | Marca original com IA | Logo aparece no cabeçalho, favicon e documentação |

## Regras de negócio
- RN-01: quantidade mínima 1, sempre inteira. No carrinho, diminuir em 1 fica desabilitado; remoção usa botão próprio.
- RN-02: produto tem uma única linha no carrinho, identificada pelo ID.
- RN-03: subtotal = soma de preço × quantidade; frete fictício fixo de R$ 3,50 para carrinho não vazio; carrinho vazio exibe frete zero. Total = subtotal + frete.
- RN-04: preços e cálculos em centavos inteiros; apresentação em BRL com duas casas.
- RN-05: pagamento apenas informativo, sem dados de cartão nem transação real.
- RN-06: carrinho sobrevive ao refresh; pedido confirmado é uma cópia independente do carrinho. Guardar o último pedido na sessão para suportar refresh da confirmação.
- RN-07: CEP deve conter oito dígitos. Rua, número, bairro, cidade e UF são obrigatórios; complemento opcional. Consultar ViaCEP, indicar carregamento, CEP não encontrado e falha de rede. Permitir correção manual e preenchimento de dados não retornados. Consulta indisponível não impede concluir se todos os dados forem válidos e revisados.
- RN-08: catálogo local tipado, sem API própria. API pública de CEP obrigatória.
- RN-09: carrinho vazio e acesso ao Sucesso sem pedido exibem mensagens e caminho de volta à Home.
- RN-10: pedido só é confirmado com itens existentes no catálogo, quantidades válidas, endereço válido e pagamento selecionado.

## Qualidade e identidade
Usar o Figma como referência de composição, com identidade coerente e logo original gerada por ferramenta de imagem com IA. Nome inicial: Coffee Delivery. Conceito, paleta e logo finais ainda serão escolhidos; documentar ferramenta, prompt, resultado, justificativa e condições de uso. Criar versões legíveis em fundos claros/escuros e tamanho de favicon.

Planejar celular desde o início. Verificar 390, 768 e 1440 px, além de 320 px quando possível. Usar labels, foco visível, navegação por teclado, feedback de erros e contraste conforme referência WCAG 2.2 AA. Evitar imagens quebradas, recursos excessivos e erros no console. Verificar em navegadores Chromium e, quando disponível, Firefox.

## Aceite final
Atender RF-01 a RF-16 e RN-01 a RN-10, executar testes e build, publicar aplicação com rotas diretas funcionais, fornecer repositório público, SPECs, AGENTS, README e evidências. Capturar Home, Checkout, Sucesso e tema escuro em celular, além de desktop. Registrar pelo menos três interações reais com IA. Grupo/aluno deve explicar estado, reducer, Context, validação e persistência.
