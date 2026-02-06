'use server'

import { Gettheauthtoken } from "@/utilites/getauthtoken"

type shippingAddresstype = {
    details: string
    phone: string
    city: string
}

export async function CheckoutOnloine(
    cartId: string, 
    url: string = process.env.NEXTAUTH_URL || 'http://localhost:3000', 
    shippingAddress: shippingAddresstype
) {
    try {
        console.log("🔧 CheckoutOnloine called with cartId:", cartId)
        console.log("📦 Shipping address:", shippingAddress)
        
        const rawToken = await Gettheauthtoken()
        
        if (!rawToken) {
            console.log("❌ No auth token")
            throw new Error('Unauthorized - Please login first')
        }
        
        console.log("🔑 Token length:", rawToken.length)
        
        const apiUrl = process.env.API
        if (!apiUrl) {
            throw new Error('API URL not configured')
        }
        
        // Correct URL format
        const requestUrl = `${apiUrl}/orders/checkout-session/${cartId}?url=${encodeURIComponent(url)}`
        console.log("📡 Calling:", requestUrl)
        
        const response = await fetch(requestUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'token': rawToken // ✅ CORRECT: key-value pair
            },
            body: JSON.stringify({ shippingAddress })
        })
        
        console.log("📊 Response status:", response.status)
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error("❌ API Error:", response.status, errorText)
            throw new Error(`Checkout failed: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("✅ Checkout response:", data)
        
        return data // ✅ CRITICAL: Must return!
        
    } catch (error) {
        console.error("💥 Error in CheckoutOnloine:", error)
        throw error
    }
}