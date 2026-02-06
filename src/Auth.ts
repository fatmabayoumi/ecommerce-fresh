import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"

export default function authOptions(): NextAuthOptions {
    return {
        pages: {
            signIn: '/auth/login',
            error: '/auth/error'
        },
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    email: { label: "Email", type: "email", placeholder: "email@example.com" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials) {
                    if (!credentials?.email || !credentials?.password) {
                        return null
                    }

                    try {
                        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password
                            })
                        })

                        const user = await res.json()

                        if (res.ok && user.token) {
                            return {
                                id: user.user._id || user.user.id,
                                email: user.user.email,
                                name: user.user.name,
                                token: user.token,
                                user: user.user
                            }
                        }
                        return null
                    } catch (error) {
                        console.error('Authorization error:', error)
                        return null
                    }
                }
            }),
            GitHubProvider({
                clientId: process.env.GITHUB_ID as string,
                clientSecret: process.env.GITHUB_SECRET as string
            })
        ],
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.id = user.id
                    token.token = (user as any).token
                    token.user = (user as any).user
                }
                return token
            },
            async session({ session, token }) {
                if (token && session.user) {
                    session.user.id = token.id as string
                    session.user.name = token.name as string
                    session.user.email = token.email as string
                    session.token = token.token as string
                    session.userData = token.user as any
                }
                return session
            }
        },
        session: {
            strategy: "jwt",
            maxAge: 30 * 24 * 60 * 60,
        },
        secret: process.env.NEXTAUTH_SECRET,
        debug: process.env.NODE_ENV === 'development'
    }
}