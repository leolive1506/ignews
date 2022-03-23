# JAMStack
- Criar apps quase que completas sem depender de uma estrutura completa de um backend
- JAM
  - Javascript (funcionamento)
  - Api (apis de terceiro)
  - Markup (html, estrutura)

# CMS
- Content Management System
  - Projetos com painel adm pronto pra criar conteudo la dentro
    - Ex: 
    - Wordpress
    x Drupal
    x Joomla
    - Magento (E-commerce)

## Headless CMS
- CMS sem parte visual p quem vai consumir o conteudo
  - Parte visual apenas painel adm
- É um painel de adm + API HTTP, GraphQL, SDK
- Ex: Wordpress 
  - Gratuitos
    - Strapi (Qualquer tipo conteudo)
      - Quando projeto começa crescer mt ele pode se perder
      - Usar em projeto pequenos
    - Ghost (Blog)
    - Keystone (Qualer tipo conteudo)

  - Pagos
    - GraphCMS
    - Prismic CMS (usado nas aulas)
      - Planos mais baratos
    - Contentful
      - Bom pra projetos grandes
    
    - Shopify (e-commerce)
    - Saleor (e-commerce)

# Configurar o prismic cms
- Entrar site prismic, criar um repository e executar o comando

- Todo conteudo primic vem por padrão como public
  - Se quiser alterar pra private api, é necessário passar uma chave (token) p toda req pra busca conteudo
- IR em api & security
  - Fazer alterações necessárias e pegar permanet access tokens 
- Instalar o client 
- Instalação dom pra converter resultado da api em html ou texto
```sh
npm i prismic-dom
```
  
# Dicas gerais
- Ver oq tem dentro do console que ira rodar no server node
```ts
console.log(JSON.stringify(response, null, 2))
```

- Quando busca dados api de terceiros, não vem na formatação desejadas normalmente
  - Pode formatar no getStaticProps ou getServerSideProps ou no html
    - Quando formatar no getStaticProps, isso sera feito somente quando obj for renderizado primeira vez

  - Dar preferencia pra formatar em getStaticProps ou getServerSideProps