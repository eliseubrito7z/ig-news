import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

import { fauna } from "../../../services/fauna"
import { query as q } from 'faunadb'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
      authorization: {
        params: {
          scope: 'read:user',
        }
      }
    })
  ],
  jwt: {
    secret: String(process.env.SIGNING_KEY),
  },
  callbacks: {
    async signIn(params) {
      const { email } = params.user

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(String(params.user.email)),
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(String(params.user.email)),
              )
            )
          )
        )

        return true
      } catch {
        return false
      }
    },
  }
}) 

