"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("")

  async function onLogout() {
    try {
      await axios.get("/api/users/logout")
      console.log("Logout successful")
      router.push("/login")
    } catch (error: any) {
      console.log(error.message)
    }
  }

  async function getUserDetails() {
    try {
      const response = await axios.get("/api/users/me")
      setData(response.data.data._id)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "" ? (
          "Nothing to show"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={onLogout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>
    </div>
  )
}
