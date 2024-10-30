"use client";

import { useRouter } from "next/navigation";

const LoginPage = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			{/* Main Content Area */}
			<div className="flex flex-grow">
				{/* Left Side with Background Image */}
				<div
					className="hidden lg:flex w-1/2 bg-cover bg-center"
					style={{ backgroundImage: "url('/Library3.jpg')" }}
				></div>

				{/* Right Side - Login Form */}
				<div className="flex flex-col w-full lg:w-1/2 justify-center items-center bg-white">
					<div className="form-container bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-4">
						<h1 className="text-2xl font-semibold text-center text-[#0442B1] mb-6">Admin Login</h1>
						
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Email"
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#0442B1]"
							/>
							<input
								type="password"
								placeholder="Password"
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#0442B1]"
							/>
							<button
								onClick={() => router.push("/admin")}
								className="w-full py-3 bg-[#0442B1] text-white font-semibold rounded-md hover:bg-[#033b9b] transition-colors duration-200"
							>
								Login
							</button>
						</div>

						<div className="text-center mt-4">
							<p className="text-gray-600">Don't have an account?</p>
							<button
								className="secondary text-[#0442B1] font-medium mt-2"
								onClick={() => router.push("/auth/register")}
							>
								Register
							</button>
							<button
								className="tritiary text-gray-500 mt-2 hover:underline"
								onClick={() => router.push("/home") }
							>
								Back
							</button>
						</div>
					</div>

					{/* Credit Section */}
					<div className="w-full flex justify-center mt-8">
						<p className="text-center text-gray-500">
							© Manggad. All rights reserved. 2024
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
