# API routes
- Sempre que alguma operação esta no frontend nunca é totalmente segura
  - Alguns momentos, é possivel desenvolver algumas funcionalidades do backend dentro do next
  - Dentro pages/api todos os arquivos se transformam em rotas backend
- retornar uma funcao (dar um nome ou arrow funcfion)
- recebe req e res
- request recebe todos os dados da requisição
- response (resposta)
```ts
import { NextApiRequest, NextApiResponse} from 'next'
export default (request: NextApiRequest, response: NextApiResponse) => {
  // operação feita no backend
}
```
- Dentro api routes não tem middleweres
- É tudo feito na camada do next, oq é feito la não é acessível ao cliente

- ## Todas rotas são executadas usanod conceito de serverless
  - Toda vez que é chamada, instancia uma 'maquina virtual' pra executar e dps morre

# Metódos de autenticação
- No geral a grande maioria sistemas usam um jeito simples e seguro
  - JWT
    - salva 
      - localStorage
      - cookies
    - recupera
    - coloca data experição e coloca refresh token

  - Next Auth()
    - sistema app simples
    - social (google, facebook, github)
    - Quando não quer fica preocupando armazendo credenciais de acesso do usuário no backend
    - Independe de ter um backend  

  - E outros como
    - Cognito
    - Auth0
    - Etc...

# Parametrização nas rotas
- API routes e file system routes
- Colocar colchetes por volta do parametro
```js
[id].ts
```
- Pegar valor passado api routes
```ts
const id = request.query.id
```

- Pegar tudo digitado apos na rota
- Criar um 
```ts
[...nomequequiser].tsx
```
- Na rota digitar /user/vamo/ve 
```ts
console.log(request.query)
```


# [Autenticação](https://next-auth.js.org/providers/github)
- Ir em getting started e seguir oq ta falando
- Dentro pages/api/auth criar um [...nextauth].ts
```sh
npm i next-auth
npm i @types/next-auth -D
```

```ts
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // quais informações ter acesso do user
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
    // ...add more providers here
  ],
})
```
- Criar uma aplicação dentro do github p parte autenticação
  - Settings -> developer settings -> oauth apps -> new oatuh apps

- Copiar client id
- Gerar um client secret em generate a new client secrete
```env
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

# Fazer login no front
- No componente que tem o botão
```tsx
import { signIn, useSession } from 'next-auth/react'

const {data: session} = useSession()

  return session ? (
    <button
      onClick={() => signOut()}
    >
      {session.user.name}
    </button>
  ) : (
    <button 
      onClick={() => signIn('github')}
    >
      Sign in with Github
    </button>
```

- Next auth use context pra servir informações p usuários se o user ta autenticado ou não
- No _app.jsx
```tsx
import { AppProps } from 'next/app'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // informações se use ta logado vem do pageProps.session
    <NextAuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
```

# Usando FaunaDB (feito principalmente pra apps serveless)
- Assim que user logar salvar algumas informações no db
  - Quanod se increver, precisa saber qual user se inscreveu

- Todas operações feitas no faunadb
  - São feitas através de http

  - Em bancos tradicionais
    - Precisa de uma conexão ativa com db

  - Criar uma nova conexão com banco toda vez que uma aplicação serveless for chamada pra autenticar um user é algo custoso pro db

  - Mais usados em aplicações serveless
    - FaunaDB - HTTP
    - DynamoDB - AWS

- Fauna é um banco não relacional
  - Schema free
    - Não tem colunas no banco de dados
      - São documentos com os dados que quiser (app que controla oq vai salvar)
    - ## Existe campos que quer pesquiser (Ex: pesquisar por email)
      - Criar um indice p tornar a busca mais perfermática
- Todos dados ficam dentro de uma chave chamada data

## Configurar FaunaDB 
- Criar uma conta no faundaDB
- Pegar chave de api deles
  - securiy
  - new key
     - Role -> admin
      - Quando colocar em prod criar as roles certas
  - Copiar key e colocar no env
- Por padrão, fauna executa o banco em produção

- Criar um index p uma busca mais performática
  - Terms: data.email

- Instalar faunadb
```sh
npm i faunadb
```

- Criar um services/fauna.ts
```ts
import { Client } from 'faunadb'

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY
})
```

## Salvar user no db
- Callbacks [next auth](https://next-auth.js.org/configuration/callbacks)
- Deixar
```ts
import { query as q } from "faunadb"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/fauna"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user

      try {
        await fauna.query(
          // criar sem verificar se existe
          q.Create(
            // nome table
            q.Collection('users'),
            { data: { email }}
          )
        )      

        return true
      } catch (error) {
        // evitar user fazer login caso app não consiga conectar com db
        return false
      }
    },
  }
})

```

- Verificar se o user ja existe
```ts
import { query as q } from "faunadb"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/fauna"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                // match é tipo um where
                q.Match(
                  // index do fauna
                  q.Index('user_by_email'),
                  // campo comparado
                  q.Casefold(user.email)
                )
              )
            ),
            // se não existir, cria
            q.Create(
              q.Collection('users'),
              { data: { email }}
            ),
            // else
            // se existir, pega ele
            q.Get( // como se fosse select
              q.Match(                
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )      
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  }
})
```

# Pagamento no stripe
## [Gerando uma sessão de checkout](https://stripe.com/docs/api/checkout/sessions)
- Url p redirecionar usuário p preecher informações de pagamentos, quando preecher tudo e redirecionado de volta p aplicação

```ts
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from '../../services/stripe'
import { getSession } from 'next-auth/react'
import { fauna } from "../../services/fauna";
import { query as q } from 'faunadb'

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id: string
  }
}
export default async function Subscribe (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // criar um customer (user) dentro do painel do strip, pegar qual user logado no app
    // dados salvos ficam nos cookies, é possível acessoar pelo back e front
    // dificilmente ira salvar informações no localStorage, pq fica disponível so no front
    const session = await getSession({ req })

    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )

    let customerId = user.data.stripe_customer_id
    if(!customerId) {
      // verificar se ja tem o stripe_customer_id
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email
      })

      // verificar se o user ja existe antes de criar um novo
      await fauna.query(
        q.Update(
          // passar ref (id)
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: { stripe_customer_id: stripeCustomer.id}
          }
        )
      )

      customerId = stripeCustomer.id
    }


    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      // quem esta comprando, passando id do user no stripe
      customer: customerId,
      // quais metodos pagamanto vai aceitar, se quiser aceitar todos não precisa colocar nada
      payment_method_types: ['card'],
      // quero obrigar user preecher endereço ou deixar automático
      billing_address_collection: 'required',
      // quais os items
      line_items: [
        {
          // id do preço
          price: 'price_1KbmalBYjUp74OA8ywxH3gf4',
          quantity: 1
        }
      ],
      // pagamento recorrente
      mode: 'subscription',
      // cupom desconto permitido
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    // retornar o id mas consegue converter em uma url
    return res.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    // falando que so aceita metodos post
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}
```

# Stripe tem duas sdk
- Uma backend (precisa passar chave)
  - services/stripe.ts
- Uma frontend (não precisa passar chave)
  - services/stripe-js.ts
```sh
npm i @stripe/stripe-js
```

```ts
import { loadStripe } from '@stripe/stripe-js'

export async function getStripeJs() {
  // passar chave publica
  // desenvolvedores -> chaves da api -> Chave publicável
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

  return stripeJs
}
```