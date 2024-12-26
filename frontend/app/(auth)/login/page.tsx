"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous error

    try {
      console.log("User Credentials:", userCredentials);
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Left Side with Background Image */}
        <div
          className="hidden w-1/2 bg-cover bg-center lg:flex"
          style={{ backgroundImage: "url('/Library3.jpg')" }}
        ></div>

        {/* Right Side - Login Form */}
        <div className="flex w-full flex-col items-center justify-center bg-white lg:w-1/2">
          <form
            className="form-container w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg"
            onSubmit={loginUser}
          >
            <h1 className="mb-6 text-center text-2xl font-semibold text-[#0442B1]">
              {" "}
              Welcome to Manggad{" "}
            </h1>
            <h2 className="mb-6 text-center text-2xl font-semibold text-[#0442B1]">
              {" "}
              Login{" "}
            </h2>

            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-[#0442B1] focus:outline-none"
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    email: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-[#0442B1] focus:outline-none"
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    password: e.target.value,
                  })
                }
              />
              <button
                type="submit"
                className="w-full rounded-md bg-[#0442B1] py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#033b9b]"
                onClick={() => router.push("/usershome")}
              >
                Login
              </button>
            </div>

            <div className="mt-4 text-center flex flex-col w-full items-center">
              <p className="text-gray-600">Don&apos;t have an account?</p>
              <button
                className="secondary mt-2 font-medium text-[#0442B1]"
                onClick={() => router.push("/register")}
              >
                Register
              </button>
              <button
                className="tritiary"
                onClick={() => router.push("/register")}
              >
                Back
              </button>
              <button
                className="fourtiary"
                onClick={() => router.push("/admin")}
              >
                Bypass Authentication
              </button>
            </div>
          </form>

          {/* Credit Section */}
          <div className="mt-8 flex w-full justify-center">
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
