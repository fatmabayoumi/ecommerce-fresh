// auth/forgot-password/page.tsx
"use client"
import { useState } from "react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")

  async function submit() {
    await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    )
  }

  return (
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      onBlur={submit}
    />
  )
}
