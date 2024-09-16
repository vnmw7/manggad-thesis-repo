"use client"

import { useRouter } from "next/navigation"

const AuthenticationPage = () => {
  const router = useRouter()

  return (
    <div> 
      <h1> You will be proceeding as admin.  </h1>
      <button onClick={() => router.push("/auth/login")}> Login </button>
      <button onClick={() => router.push("/auth/register")}> Register </button>
      <button onClick={() => router.push("/")}> Back </button>
    </div>
  )
}

export default AuthenticationPage