"use client"

import { useRouter } from "next/navigation"

const RegistrationPage = () => {
	const router = useRouter()

	return (
		<div className="grid items-center justify-center min-h-screen">
			<div className="form-container">
				<h1> Register </h1>
				<input type="text" placeholder="email" />
				<input type="password" placeholder="Password" />
				<input type="text" placeholder="First Name" />
				<input type="text" placeholder="Last Name" />
				<button onClick={() => router.push("/auth/register")}> Register </button>
				<p> Already have an account? </p>
				<button className="secondary" onClick={() => router.push("/auth/login")}> Login </button>
				<button className="tritiary" onClick={() => router.push("/")}> Back </button>
			</div>
		</div>
	)
}

export default RegistrationPage