"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RegistrationPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const createNotification = (message: string, type: string) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.5s ease-in-out;
    `;

    if (type === 'success') {
      notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
      notification.style.backgroundColor = '#f44336';
    } else {
      notification.style.backgroundColor = '#2196F3';
    }

    notification.textContent = message;

    document.body.appendChild(notification);

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-30px);
        }
        60% {
          transform: translateY(-15px);
        }
      }
    `;
    document.head.appendChild(style);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.5s ease-in-out';
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  };

  const newUser = {
    email,
    password,
  };

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password) {
      setPasswordMatch(false);
      createNotification('Passwords do not match!', 'error');
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
        createNotification('Registration successful!', 'success');
        setTimeout(() => {
          router.push("./login");
        }, 1500);
      } else {
        createNotification('Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error("Registration error:", error);
      createNotification('An unexpected error occurred.', 'error');
    }
  };

  const handleLoginClick = () => {
    createNotification('Redirecting to login...', 'info');
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const handleBackClick = () => {
    createNotification('Going back...', 'info');
    setTimeout(() => {
      router.back();
    }, 1000);
  };

  const handleBypassClick = () => {
    createNotification('Bypassing authentication...', 'success');
    setTimeout(() => {
      router.push("/login");
    }, 1000);
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
            className="form-container w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg animate-bounce" // Added animation class
            style={{ animation: 'bounce 1s' }} // Apply bounce animation
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
                    : setPasswordMatch(true);
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
                className="w-full rounded-md bg-[#0442B1] py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#033b9b]"
              >
                Register
              </button>
            </div>

            <div className="mt-4 text-center flex flex-col w-full items-center">
              <p className="text-gray-600"> Already have an account? </p>
              <button
                type="button"
                className="secondary mt-2 font-medium text-[#0442B1]"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                type="button"
                className="tritiary"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button
                type="button"
                className="fourtiary"
                onClick={handleBypassClick}
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