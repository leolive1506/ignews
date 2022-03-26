import { GetStaticProps, GetStaticPaths } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'
import React, { useEffect } from 'react'
import { getPrimisClient } from '../../../services/prismic'
import styles from '../post.module.scss'

interface PostPreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}
export default function PostPreview({ post }: PostPreviewProps) {
  const {data: session} = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: {slug: 'jamstack-geleia-de-javascript-api-e-markup'} }
    ],
    fallback: 'blocking'
  }
}

// não precisa ver usuário logado, pose ser estática
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  // pegar client do prismic
  const prismic = getPrimisClient()
  // pegar doc pelo uid dele
  const response = await prismic.getByUID<any>('post', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    // pegar os 3 primeiros item do conteudo
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    },
    // tempo que post vai ser atualizado
    redirect: 60 * 30
  }
}