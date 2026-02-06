'use server'
import { getServerSession } from "next-auth"
import authOptions from "@/Auth"

export async function Gettheauthtoken(): Promise<string | null> {
    try {
        const session = await getServerSession(authOptions())
        
        if (!session || !session.token) {
            return null
        }
        
        return session.token
    } catch (error) {
        console.error("Error getting auth token:", error)
        return null
    }
}