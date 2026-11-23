# Publicar o Coffee Delivery na Vercel

Publicado em 23/11/2026: https://projeto-final-delta-ten.vercel.app . Os passos abaixo ficam como referência para futuras publicações.

1. Faça commit das mudanças no Source Control do VS Code e use Sync Changes / Push.
2. Crie uma conta em https://vercel.com/signup usando o GitHub.
3. Crie um novo projeto na Vercel e importe miyamiyashiro/projeto-final. Se não aparecer, permita acesso a esse repositório na integração GitHub.
4. Confira: Framework Vite; Root Directory ./; Build Command npm run build; Output Directory dist; Node.js 24.x. Nenhuma variável de ambiente necessária.
5. Clique em Deploy e aguarde.
6. Abra o endereço fornecido em uma janela anônima. Teste café → carrinho → endereço → pagamento → confirmação → atualizar a página.
7. Abra diretamente /checkout e /success no domínio publicado. Não devem apresentar 404 da hospedagem; sem pedido, devem mostrar estados vazios.
8. Cole a URL no README, faça outro commit/push e envie ao professor junto do repositório.

O vercel.json configura as rotas conforme a [documentação oficial](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas).

## Entrega
- Repositório: https://github.com/miyamiyashiro/projeto-final
- Site: https://projeto-final-delta-ten.vercel.app
- README, AGENTS e três SPECs em docs.
- Capturas atuais: arquivos com prefixo final- em docs/evidencias.
- Uso de IA: docs/AI_USAGE.md; logo e prompt: docs/BRANDING.md.
- Testes: src/tests e e2e.

## Demonstração de dois minutos
1. Mostre Home e alterne o tema.
2. Adicione o mesmo café duas vezes: contador soma unidades.
3. Abra o carrinho e altere uma quantidade.
4. Use CEP de exemplo 01001-000, preencha número e pagamento.
5. Confirme: mostre endereço, total e carrinho vazio.
6. Atualize: resumo permanece na sessão.
7. Explique que não há cobrança ou entrega real.

