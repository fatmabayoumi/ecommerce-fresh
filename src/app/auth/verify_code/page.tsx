// auth/verify-code/page.tsx
"use client"
import { useState } from "react"

export default function VerifyCode() {
  const [code, setCode] = useState("")

  async function submit() {
    await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode: code }),
      }
    )
  }

  return <input onBlur={submit} />
}
