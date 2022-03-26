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
    // alterar a session padrão do next
    async session({session}) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            // Pegar as coisas qeu batem com as duas condições
            q.Intersection([
              // pegando ref do user com email da session
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                // pegar activo
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )
        return {
          ...session,
          activeSubscription: userActiveSubscription
        }

      } catch {
        return {
          ...session,
          activeSubscription: null
        }
      }
    },

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

