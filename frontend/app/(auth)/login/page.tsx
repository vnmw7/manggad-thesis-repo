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

  // Notification creation function
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
        createNotification('Successfully logged in!', 'success');
        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error);
        createNotification(data.error || 'Login failed', 'error');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
      createNotification("An unexpected error occurred. Please try again.", 'error');
    }
  };

  const handleRegisterClick = () => {
    createNotification('Redirecting to registration...', 'info');
    setTimeout(() => {
      router.push("/register");
    }, 1000);
  };

  const handleBackClick = () => {
    createNotification('Going back...', 'info');
    setTimeout(() => {
      router.push("/register");
    }, 1000);
  };

  const handleBypassClick = () => {
    createNotification('Bypassing authentication...', 'success');
    setTimeout(() => {
      router.push("/admin");
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
              >
                Login
              </button>
            </div>

            <div className="mt-4 text-center flex flex-col w-full items-center">
              <p className="text-gray-600">Don&apos;t have an account?</p>
              <button
                className="secondary mt-2 font-medium text-[#0442B1]"
                onClick={handleRegisterClick}
                type="button"
              >
                Register
              </button>
              <button
                className="tritiary"
                onClick={handleBackClick}
                type="button"
              >
                Back
              </button>
              <button
                className="fourtiary"
                onClick={handleBypassClick}
                type="button"
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