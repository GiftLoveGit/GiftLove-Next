import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            access_token: string
            name: string;
            email: string;
            role: string | undefined;
            phone: string;
            cpfCnpj: string;
            date_birth: string;
            expires_at: string;
            image?: string
        }
    }
    interface User {
        id: string;
        access_token: string
        name: string;
        email: string;
        role: string | undefined;
        phone: string;
        cpfCnpj: string;
        date_birth: string;
        expires_at: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            access_token: string
            name: string;
            email: string;
            role: string;
            phone: string;
            cpfCnpj: string;
            date_birth: string;
            expires_at: string;
        };
    }
}