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