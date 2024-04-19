"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
// import { useRouter } from "next/router"

export default function VerifyEmailPage() {
  //   const router = useRouter()
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  async function verifyUserEmail() {
    try {
      await axios.post("/api/users/verifyemail", { token })
      setVerified(true)
      setError(false)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
    // const { query } = router
    // const urlToken = query.token
    // setToken(urlToken ? urlToken[1] : "")
  }, [])

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login" className="underline text-blue-500">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  )
}