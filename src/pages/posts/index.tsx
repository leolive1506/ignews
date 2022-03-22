import Head from 'next/head'
import React from 'react'
import styles from './styles.module.scss'

function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and, release process</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and, release process</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and, release process</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with lerna & Yarn Workspaces</strong>
            <p>In this guid, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and, release process</p>
          </a>
        </div>
      </main>
    </>
  )
}

export default Posts