"use client"

import { useRouter } from "next/navigation"

const RegistrationPage = () => {
	const router = useRouter()

  return (
    <div>
      <h1> RegisterPage </h1>
      <button onClick={() => router.push("/")}> Back </button>
    </div>
  )
}

export default RegistrationPage