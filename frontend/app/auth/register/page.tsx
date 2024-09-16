"use client"

import { useRouter } from "next/navigation"

const RegisterPage = () => {
	const router = useRouter()

  return (
    <div>
      <h1> RegisterPage </h1>
      <button onClick={() => router.push("/")}> Back </button>
    </div>
  )
}

export default RegisterPage