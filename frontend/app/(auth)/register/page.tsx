"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RegistrationPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const newUser = {
    email,
    password,
  };

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Registration error:", error);
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

        {/* Right Side - Registration Form */}
        <div className="flex w-full flex-col items-center justify-center bg-white lg:w-1/2">
          <form
            className="form-container w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg"
            onSubmit={registerUser}
          >
            <h1 className="mb-6 text-center text-2xl font-semibold text-[#0442B1]">
              Register
            </h1>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-[#0442B1] focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-[#0442B1] focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Retype Password"
                className="w-full rounded-md border border-gray-300 p-3 focus:border-[#0442B1] focus:outline-none"
                onChange={(e) => {
                  e.target.value !== password
                    ? setPasswordMatch(false)
                    : setPasswordMatch(
                        true,
                      ); /* shortcut sng if else statement */
                }}
              />
              <p
                className={`mt-1 text-sm text-red-500 ${passwordMatch ? "opacity-0" : "opacity-100"}`}
              >
                {" "}
                Passwords do not match{" "}
              </p>
              <button
                type="submit"
                onClick={() => router.push("/admin")}
                className="w-full rounded-md bg-[#0442B1] py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#033b9b]"
              >
                Register
              </button>
            </div>

            <div className="mt-4 text-center flex flex-col w-full items-center">
              <p className="text-gray-600"> Already have an account? </p>
              <button
                className="secondary mt-2 font-medium text-[#0442B1]"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="tritiary"
                onClick={() => router.back()}
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

export default RegistrationPage;
