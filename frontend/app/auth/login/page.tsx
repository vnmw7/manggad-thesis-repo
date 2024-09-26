"use client"

import { useRouter } from "next/navigation"

const LoginPage = () => {
	const router = useRouter()

	return (
		<div className="grid items-center justify-center min-h-screen">
			<div className="form-container">
				<h1> LoginPage </h1>
				<input type="text" placeholder="email" />
				<input type="password" placeholder="Password" />
				<button onClick={() => router.push("/auth/login")}> Login </button>
				<p> Don't have an account? </p>
				<button className="secondary" onClick={() => router.push("/auth/register")}> Register </button>
				<button className="tritiary" onClick={() => router.push("/")}> Back </button>
			</div>
		</div>
	)
}

export default LoginPage