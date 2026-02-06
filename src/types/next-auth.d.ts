import "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        token?: string
        user?: any
    }

    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
        } & DefaultSession["user"]
        token?: string
        userData?: any
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        token?: string
        user?: any
    }
}