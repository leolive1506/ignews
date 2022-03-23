import Prismic from '@prismicio/client'

export function getPrimisClient(req?: unknown) {
  const primic = Prismic.client(
    process.env.PRISMIC_ENDPOINT,
    {
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    } 
  )
  return primic
}