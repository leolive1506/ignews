# Adicionar ts
```sh
npm install typescript @types/react @types/node -D
```

- No app.tsx
```ts
import { AppProps } from 'next/app'
function MyApp({ Component, pageProps }: AppProps)
```

# Styles
- Scoped CSS
    - Um css não afeta outro componente

- Css modules
    - salvar arquivo file.module.css
    - usar css module
        - Sempre começar estilos com uma class ou id
        ```ts
        import styles from '../styles/home.module.css'
        <h1> className={styles.title}>Hello word</h1>
        ```

- Install scss
```sh
npm i sass
```

- Configurar uma fonte externa
    - Deve ser feito apenas uma unica vez
    - Nao utlizar o _app.tsx pois ele é recarregado quando muda a pag
    - Criar um arquivo _document.tsx
        - Carregado uma unica vez 
        - Um componente react

- Dentro document ja coloca 
    - doctype
    - charset
    - meta http-equive
    - meta name viewport

```tsx
import Document, { Html, Head, Main, NextScript } from  'next/document'

export default class MyDocument extends Document {
  reunder() {        
    <Html>
        <Head>
            <title>Document</title>
        </Head>
        <body>
          {/* todo conteudo renderizado no lugar do main */}
            <Main />
            {/* onde next coloca os arquivos js pra funcionar */}
            <NextScript />
        </body>
    </Html>
  }
}
```



# Formar fazer chamada em Next

## Cliente-side
- Pelo cliente
- Quando não precisa indexação
- Informação q não necessáriamente tem que tem ta la quando a pag for carregada
# Server side rendering 
- Quando tem operação api acontece nivel do componente, utilizando useEffect, por exemplo
  - Essa chamada so é feita no browser
  - Como é feita chamada, o google não ia anexar o valor da chamada
    - Ex: preço de algo
  - ## **Solução aplicar SSR pra vir anexado a interface com as informações**
    - Tem que **fazer em uma PAGINA do next**
      - Se quiser **informação** em um **componente** tem que **passar da página pra componente**

    - Tudo passado dentro getServerSideProps é executado servidor do next
    - Mesmo que não use, tem que ser uma função async

```ts
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      nome: 'Leonardo'
    }
  }
}
```
## Static Site Generation (SSG)
- Uma pessoa acessou e fez as chamadas
- Faz mesmo processo so SSR
- Além de retornar pro browser
- Salva o html forma fisica (estático)
- Prox vez que for acessar mesma tela, ao em vez de fazer toda chamada de novo, retorna html pront ja
  - Util quando quer pegar informações que nao mudam sempre

```ts
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      nome: 'Leonardo'
    },
    // quando tempo em segundos mantém a pagina sem precisar sem revalidado
    revalidate: 60 * 60 * 24 // 24 horas
  }
}
```

## Diferenças entre getStaticProps e getServerSideProps
- getStaticProps
  - Salva html e não muda até o tempo do revalidate
  - Mais performático
  - So pode usar em paginas que podem ser estáticas

- getServerSideProps
  - Permite ser mais dinamicos
  - Ex: Informações usuários logados

- Se não tiver necessidade indexação, motores busca
  - Maioria das vezes é melhor fazer essa chamada pelo cliente (ex: useEffect) do que pelo servidor node
## Dicas CSS 
- Ao colocar height e line-height mesmo tamanho, conteudo fica centralizado
```scss
a {
  display: inline-block;
  padding: 0 0.5rem;
  height: 5rem;
  line-height: 5rem;
}
```

- deixar border radius mesmo tamanho do height, deixa mais arredondado possível
```scss
.signInButton {
  
  height: 3rem;
  border-radius: 3rem;

}
```

# Configurar Stripe
- Plataforma de pagamento que permite users fazer pagamento atraves cartão crédito (principalmente)
  - Suporte no brasil ainda não é integral
    - Visa e master


1. Acessar o site striper
2. Criar um produto (aba produto)
3. Ir aba desenvolvedores, copiar chave secreta em arquivo .env.local
```sh
npm i stripe
```
## Chamada API
- Dentro services/stripe.ts
```ts
import Stripe from 'stripe'
import { version as versionMyApp } from '../../package.json'

export const stripe = new Stripe(
  // chave secreta
  process.env.STRIPE_API_KEY,
  {
    // versão api stripe qeu ta usando
    apiVersion: '2020-08-27',
    // informações do nosso app
    appInfo: {
      name: 'Ignews',
      version: versionMyApp
    }
  }
)
```
- Dentro da página onde fará a chamada
```ts
export const getServerSideProps: GetServerSideProps = async () => {
  // buscando um so preço de um produto
  // dentor retrieve passar id do preço
    // aba produtos e copia api id
  const price = await stripe.prices.retrieve('price_1KbmalBYjUp74OA8ywxH3gf4', {
    // pegando todas informações do produto
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    // preço vem sempre em centavos
    amount: (price.unit_amount / 100),
    // se fosse usar informações do produto
    product: price.product
  }
  return {
    props: {
      product
    }
  }
}
```
# Variaveis ambientes NextJS
- .env.local
  - Rodando projeto local 

- .env.test
- .env.development
- .env.production