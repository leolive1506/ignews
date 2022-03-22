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
  
  
  