import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'


interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
} 
export default function Home({ product }: HomeProps) {  
  return (
    <>
      <Head>
        <title>Home | Ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> wold.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
            <SubscribeButton priceId={product.priceId} />
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KbmalBYjUp74OA8ywxH3gf4', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
    // se fosse usar informações do produto
    product: price.product
  }

  return {
    props: {
      product
    },
    rendering: 60 * 60 * 24
  }
}