import { auth as authOptions } from '@/lib/auth-config'

import NextAuth from 'next-auth/next'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
// import NextAuth from 'next-auth/next'
// import { NextAuthOptions, User } from 'next-auth'
// import CredentialsProvider from "next-auth/providers/credentials";

// const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 cpfCnpj: { label: "CPF/CNPJ", type: "text", placeholder: "000.0000.0000-00" },
//                 password: { label: "Senha", type: "password" },
//                 remember_me: { label: "Manter conectado", type: "checkbox" },
//             },
//             async authorize(credentials, req) {
//                 const remember_me_boolean = credentials?.remember_me === 'true' ? true : false;
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
//                     method: "POST",
//                     cache: 'no-store',
//                     headers: {
//                         Accept: 'application/json',
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         cpfCnpj: credentials?.cpfCnpj,
//                         password: credentials?.password,
//                         remember_me: remember_me_boolean
//                     })
//                 })
//                 // console.log('[RESPONSE]', res)
//                 // console.log('[OK]', res.ok)
//                 // console.log('[STATUS]', res.status)
//                 // console.log('[STATUS_TEXTE]', res.statusText)
//                 if (res.ok) {
//                     // const {id, access_token, expires_at, name, email, cpfCnpj, phone, date_birth, role} = await res.json();
//                     const user = await res.json();
//                     // const user = {
//                     //     id,
//                     //     name,
//                     //     phone,
//                     //     email,
//                     //     cpfCnpj,
//                     //     date_birth,
//                     //     role,
//                     //     expires_at,
//                     //     access_token
//                     // };
//                     return user;
//                 }

//                 // const user = await res.json();
//                 // if (!res.ok || !user) {
//                 //     return null
//                 // }          
//                 // return user
//                 return null
//             }
//         })
//     ],
//     callbacks: {
//         jwt: async ({ token, user }) => {
//             // console.log('[TOKEN]', token)
//             // console.log('[USER]', user)
//             // const customUser = user as unknown as any
//             // if (user) {
//             //     token.user = user;
//             // }
//             if (user) {
//                 // console.log('[SIM_EXISTE]')
//                 token.user = user;
//                 // const expiresAt = customUser.expires_at ? new Date(customUser.expires_at).getTime() / 1000 : undefined;
//                 // return {
//                 //     ...token,
//                 //     role: customUser.role,
//                 //     expires: customUser.expires_at ? new Date(customUser.expires_at).toISOString() : undefined,
//                 //     access_token: customUser.access_token,
//                 //     exp: expiresAt
//                 // }
//             }
//             return token
//         },
//         session: async ({ session, token }) => {
//             // console.log('[SESSION]', session)
//             // console.log('[TOKEN]', token)
//             // session.user = token.user;
//             session.user = token.user;
//             return session;
//             // return {
//             //     ...session,
//             //     access_token: token.access_token,
//             //     image: token.email,
//             //     user: {
//             //         name: token.name,
//             //         email: token.email,
//             //         role: token.role,
//             //         access_token: token.access_token,
//             //         cpfCnpj: token.user?.cpfCnpj,
//             //         image: token.email,
//             //         phone: session.user.access_token
//             //     },
//             //     expires: typeof token.expires === 'string' ? token.expires : ''
//             // };
//         }
//     },
//     pages: {
//         signIn: '/login',
//         // signOut: '/'
//     }
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }