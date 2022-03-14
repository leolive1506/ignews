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
            q.Create(
              q.Collection('users'),
              { data: { email }}
            ),
            // else
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

