import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { createToken } from '../../../utils/tokenHandler'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jokowi@gmail.com',
        },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const user = await res.json()
        if (!res.ok) throw new Error(JSON.stringify(user))
        if (res.ok && user) return user
        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ account, email, profile, user, credentials }) {
      if (account.provider !== 'credentials') {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user?email=${user.email}&provider=${account.provider}`
          )
          const oldUser = await res.json()
          if (res.ok && oldUser.count) {
            user.id = oldUser.rows[0].id
            user.role = oldUser.rows[0].role
            user.name = oldUser.rows[0].name
            user.image = oldUser.rows[0].image
            user.provider = oldUser.rows[0].provider
          } else if (res.ok && !oldUser.count) {
            const { id, ...dataUser } = user
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/signup`,
              {
                method: 'POST',
                body: JSON.stringify({
                  ...dataUser,
                  provider: account.provider,
                }),
                headers: { 'Content-Type': 'application/json' },
              }
            )
            const newUser = await res.json()
            if (res.ok) {
              user.id = newUser.id
              user.role = newUser.role
              user.name = newUser.name
              user.image = newUser.image
              user.provider = newUser.provider
            } else {
              console.log(newUser)
            }
          } else {
            console.log(oldUser)
          }
        } catch (error) {
          console.log(error)
        }
      }
      const maxAge = 60 * 60 * 24 * 30
      user.accessToken = createToken(user, maxAge)
      return true
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.provider = user.provider
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ token, session }) {
      session.user.id = token.sub
      session.user.role = token.role
      session.user.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  debug: true,
})
