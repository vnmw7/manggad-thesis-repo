"use client"

import { useRouter } from "next/navigation"

const AuthenticationPage = () => {
    const router = useRouter()

    return (
      <div> 
        <h1> Admin Authentication </h1>
        <p> You will be proceeding as an admin of this thesis repository. </p>
        <button onClick={() => router.push("/auth/login")}> Login </button>
        <button onClick={() => router.push("/auth/register")}> Register </button>
        <button onClick={() => router.push("/")}> Back </button>
      </div>
    )
}

export default AuthenticationPage