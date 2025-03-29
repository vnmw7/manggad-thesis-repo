"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { MagicCard } from "@/components/magicui/magic-card";
import ThemeSwitch from "../_components/theme/ThemeSwitch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser, login } from "@/lib/appwrite";

const AuthPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login state
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  // Register state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const tabVariants = {
    inactive: { borderColor: "transparent", color: "#6b7280" },
    active: { borderColor: "#3b82f6", color: "#1e40af" },
  };

  // Login function
  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(""); // Clear previous error
    setIsLoading(true);

    try {
      const result = await login(
        userCredentials.email,
        userCredentials.password,
      );

      if (result.success) {
        toast.success("Login successful!");
        router.push("/admin");
      } else {
        setLoginError("Invalid email or password");
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser(email, password);

      if (result.success) {
        toast.success("Registration successful! Please login.");
        setActiveTab("login");
      } else {
        // Safe way to access error message that handles unknown type
        const errorMessage =
          result.error &&
          typeof result.error === "object" &&
          "message" in result.error
            ? result.error.message
            : "Registration failed";
        toast.error(String(errorMessage));
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-[#121212] dark:to-[#1e1e1e]">
      {/* Animated Grid Pattern Background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40">
        <AnimatedGridPattern
          width={50}
          height={50}
          className="fill-black/15 text-black/25 dark:fill-white/12 dark:text-white/22"
          numSquares={60}
          maxOpacity={0.4}
          duration={5}
        />
      </div>

      {/* Hero Section */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Theme Switch Button - positioned at the top right */}
        <div className="absolute top-4 right-4 z-10 w-auto min-w-[140px]">
          <ThemeSwitch />
        </div>

        {/* Enhanced background with stronger Gaussian blur effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Primary background circles with enhanced blur */}
          <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40 blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-gradient-to-r from-indigo-400/30 to-blue-400/30 blur-[100px]" />
          <div className="absolute right-1/3 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-pink-400/25 to-orange-400/25 blur-[120px]" />

          {/* Additional gaussian blur elements */}
          <div className="absolute top-1/3 left-0 -z-10 h-64 w-64 rounded-full bg-blue-300/20 blur-[80px] dark:bg-blue-900/20" />
          <div className="absolute right-0 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-purple-300/15 blur-[90px] dark:bg-purple-900/15" />

          {/* Small accent blurs for added depth */}
          <div className="absolute top-1/2 left-1/3 -z-10 h-24 w-24 rounded-full bg-yellow-300/20 blur-[50px] dark:bg-yellow-600/20" />
          <div className="absolute right-1/4 bottom-1/3 -z-10 h-32 w-32 rounded-full bg-green-300/15 blur-[60px] dark:bg-green-700/15" />
        </div>

        {/* Magic Card with enhanced glassmorphic card */}
        <MagicCard
          className="w-full max-w-xl overflow-hidden rounded-2xl"
          gradientSize={300}
          gradientFrom="#4F46E5"
        >
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-xl backdrop-blur-xl dark:border-gray-800/40 dark:bg-black/40 dark:backdrop-blur-xl"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            {/* Header with logo */}
            <div className="w-full px-8 py-6">
              <motion.div
                className="flex items-center justify-center space-x-4"
                variants={fadeIn}
              >
                <div className="h-16 w-16 sm:h-16 sm:w-16">
                  <Image
                    src="/MANGGAD LOGO.png"
                    alt="Manggad Logo"
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="h-14 w-14 sm:h-14 sm:w-14">
                  <Image
                    src="/lccb.png"
                    alt="LCCB Logo"
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
              </motion.div>

              <motion.h1
                className="mt-4 text-center text-2xl font-bold text-gray-900 dark:text-white"
                variants={fadeIn}
              >
                Welcome to MANGGAD
              </motion.h1>
            </div>

            {/* Tabs */}
            <motion.div className="flex justify-center px-8" variants={fadeIn}>
              <div className="grid w-full grid-cols-2 gap-2">
                <motion.button
                  className={`flex items-center justify-center space-x-2 border-b-2 py-3 text-center font-medium transition-colors ${activeTab === "login" ? "border-blue-500 text-blue-700 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("login")}
                  animate={activeTab === "login" ? "active" : "inactive"}
                  variants={tabVariants}
                >
                  <User size={18} />
                  <span>Login</span>
                </motion.button>

                <motion.button
                  className={`flex items-center justify-center space-x-2 border-b-2 py-3 text-center font-medium transition-colors ${activeTab === "register" ? "border-blue-500 text-blue-700 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("register")}
                  animate={activeTab === "register" ? "active" : "inactive"}
                  variants={tabVariants}
                >
                  <User size={18} />
                  <span>Register</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Forms Container */}
            <div className="px-8 py-6">
              {/* Login Form */}
              {activeTab === "login" && (
                <motion.form
                  onSubmit={loginUser}
                  className="space-y-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {loginError && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail
                          size={16}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-gray-300 bg-white/80 py-3 pr-4 pl-10 text-gray-700 shadow-sm backdrop-blur-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-100 dark:focus:border-blue-500"
                        onChange={(e) =>
                          setUserCredentials({
                            ...userCredentials,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock
                          size={16}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-gray-300 bg-white/80 py-3 pr-10 pl-10 text-gray-700 shadow-sm backdrop-blur-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-100 dark:focus:border-blue-500"
                        onChange={(e) =>
                          setUserCredentials({
                            ...userCredentials,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group mt-2 flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600/90 px-5 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:outline-none dark:bg-blue-700/90 dark:hover:bg-blue-800"
                  >
                    <span>Login</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                      onClick={() => router.push("/")}
                    >
                      Back to Home
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Register Form */}
              {activeTab === "register" && (
                <motion.form
                  onSubmit={registerUser}
                  className="space-y-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail
                          size={16}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-gray-300 bg-white/80 py-3 pr-4 pl-10 text-gray-700 shadow-sm backdrop-blur-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-100 dark:focus:border-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock
                          size={16}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Choose a password"
                        className="w-full rounded-lg border border-gray-300 bg-white/80 py-3 pr-10 pl-10 text-gray-700 shadow-sm backdrop-blur-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-100 dark:focus:border-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock
                          size={16}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`w-full rounded-lg border ${!passwordMatch ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"} bg-white/80 py-3 pr-10 pl-10 text-gray-700 shadow-sm backdrop-blur-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none dark:bg-gray-800/70 dark:text-gray-100 dark:focus:border-blue-500`}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setPasswordMatch(e.target.value === password);
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {!passwordMatch && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group mt-2 flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600/90 px-5 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:outline-none dark:bg-blue-700/90 dark:hover:bg-blue-800"
                  >
                    <span>Register</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                      onClick={() => router.push("/home")}
                    >
                      Back to Home
                    </button>
                  </div>
                </motion.form>
              )}
            </div>

            {/* Footer */}
            <motion.div
              className="border-t border-gray-200 py-4 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400"
              variants={fadeIn}
            >
              © Manggad. All rights reserved. {new Date().getFullYear()}
            </motion.div>
          </motion.div>
        </MagicCard>
      </div>

      {/* Toast Container with glassmorphism */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
        toastClassName="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg"
      />
    </div>
  );
};

export default AuthPage;
