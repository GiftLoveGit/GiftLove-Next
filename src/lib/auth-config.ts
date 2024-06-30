import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const auth: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                cpfCnpj: { label: "CPF/CNPJ", type: "text", placeholder: "000.0000.0000-00" },
                password: { label: "Senha", type: "password" },
                remember_me: { label: "Manter conectado", type: "checkbox" },
            },
            async authorize(credentials, req) {
                const remember_me_boolean = credentials?.remember_me === 'true' ? true : false;
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                    method: "POST",
                    cache: 'no-store',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cpfCnpj: credentials?.cpfCnpj,
                        password: credentials?.password,
                        remember_me: remember_me_boolean
                    })
                })
                if (res.ok) {
                    const user = await res.json();
                    console.log('retorno do login', )
                    return user;
                }
                return null
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            const customUser = user as unknown as any
            if (user) {
                const expiresAt = customUser.expires_at ? new Date(customUser.expires_at).getTime() / 1000 : undefined;
                return {
                    ...token,
                    id: customUser.id,
                    role: customUser.role,
                    expires: customUser.expires_at ? new Date(customUser.expires_at).toISOString() : undefined,
                    access_token: customUser.access_token,
                    exp: expiresAt
                }
            }
            return token
        },
        session: async ({ session, token }) => {
            return {
                ...session,
                access_token: token.access_token,
                image: token.email,
                user: {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role: token.role,
                    access_token: token.access_token,
                    cpfCnpj: token.user?.cpfCnpj,
                    image: token.email,
                    phone: session.user.access_token
                },
                expires: typeof token.expires === 'string' ? token.expires : ''
            };
        }
    },
    pages: {
        signIn: '/login',
        // signOut: '/'
    }
}
