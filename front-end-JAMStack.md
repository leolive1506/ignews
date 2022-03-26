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

## Links
- Next roda react por tras
  - Muita coisa em uma pag e outra é a reaproveitada entre uma pag e outra
  - Se usar href normal da pag, ele recarrega toda pag do zero novamente
- Usar link do next/link e passar href p link
```tsx
<Link href="/">
  <a className={styles.active} href="#">Home</a>
</Link>
```

- Prefetch
  - Deixa a pag pre carregada
```tsx
<Link href="/posts" prefetch>
  <a className={styles.active} href="#">Posts</a>
</Link>
```

## Permitir que html vindo de 3º seja renderizado
```tsx
<div dangerouslySetInnerHTML={{ __html: post.content }} />
```

## Informacoes compartilhadas entre todos componentes
# CloneElement
- Clone um el ou children, mas permite add uma propriedade ao el da primeira camada
- Ex:
  - Ver qual link ta ativo
```tsx
// dentro header tem os link pra nav
<ActiveLink activeClassName={styles.active} href="/">
  <a>Home</a>
</ActiveLink>
```

- Criar um componente pra ver se a rota esta ativa
```tsx
interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  activeClassName: string
}

function ActiveLink({ children, activeClassName, ...rest}: ActiveLinkProps) {
  const { asPath } = useRouter()

  // comparando com href
  const className = asPath === rest.href ? activeClassName : ''

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}
```

- Pegar as coisas em qualquer bolinha
  - União

- Pegar as coisas qeu batem com as duas condições, quanto na esquerda quanto na direita
  - Intercessão

- Pegar as coisas que tem somente em uma bolinha
  - Diferença


# Redirecionamento
- Na camada next
```ts
if(!session.activeSubscription) {
  return {
    redirect: {
      destination: '/',
      // redirecionando so pq não tem assinatura
      permanent: false
    }
  }
}
```

- Redirecionar user de forma problematica, por uma função (não por um botão que ele clica)
```ts
const router = useRouter()

async function handleSubscribe () {
  if(session.activeSubscription) {
    router.push('/posts')
    return;
  }
}
```
