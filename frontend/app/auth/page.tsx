"use client"

import { useRouter } from "next/navigation"

const AuthenticationPage = () => {
    const router = useRouter()

    return (
		<div className="grid items-center justify-center min-h-screen">
			<div className="form-container">
				<h1> Admin Authentication </h1>
				<p> You will be proceeding as an admin of this thesis repository. </p>
				<button onClick={() => router.push("/auth/login")}> Login </button>
				<button onClick={() => router.push("/auth/register")}> Register </button>
				<button className="secondary" onClick={() => router.push("/")}> Back </button>
			</div>
		</div>
    )
}

export default AuthenticationPage