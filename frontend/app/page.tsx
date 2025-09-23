"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ArrowRight, Book, Home } from "lucide-react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { MagicCard } from "@/components/magicui/magic-card";
import ThemeSwitch from "./_components/theme/ThemeSwitch";

export default function StartPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query.");
    } else {
      toast.success("Searching for: " + searchQuery);
      router.push(`/home?view=book&query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const goToHomepage = () => {
    toast.info("Navigating to Homepage...");
    router.push("/home");
  };

  // Fade-in animation variants
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
          className="w-full max-w-5xl overflow-hidden rounded-2xl"
          gradientSize={300}
          gradientFrom="#4F46E5"
        >
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-xl backdrop-blur-xl dark:border-gray-800/40 dark:bg-black/40 dark:backdrop-blur-xl"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left column with image - visible on larger screens */}
              <div className="hidden lg:block lg:w-1/2">
                <div className="relative h-full w-full">
                  <Image
                    src="/CollegeAtrium.jpg"
                    alt="LCCB Library"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
                </div>
              </div>

              {/* Right column with content - enhanced with subtle glassmorphism */}
              <div className="flex flex-col p-6 sm:p-8 lg:w-1/2 lg:p-10">
                {/* Logos section */}
                <motion.div
                  className="flex items-center justify-center space-x-4 sm:justify-start"
                  variants={fadeIn}
                >
                  <div className="h-16 w-16 sm:h-20 sm:w-20">
                    <Image
                      src="/MANGGAD LOGO.png"
                      alt="Manggad Logo"
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="h-14 w-14 sm:h-16 sm:w-16">
                    <Image
                      src="/lccb.png"
                      alt="LCCB Logo"
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </motion.div>

                {/* Title and headline */}
                <motion.div
                  className="mt-6 text-center sm:mt-8 sm:text-left"
                  variants={fadeIn}
                >
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                    MANGGAD
                  </h1>
                  <p className="mt-2 text-xl font-semibold text-blue-700 sm:text-2xl dark:text-blue-400">
                    Research Repository Management System
                  </p>
                </motion.div>

                {/* Description */}
                <motion.p
                  className="mt-4 text-base text-gray-600 sm:mt-6 dark:text-gray-300"
                  variants={fadeIn}
                >
                  Discover and explore a comprehensive collection of research
                  papers, theses, and documents—empowering academic growth and
                  supporting the advancement of knowledge and research.
                </motion.p>

                {/* Enhanced search form with glassmorphism */}
                <motion.form
                  onSubmit={handleSearch}
                  className="mt-8 w-full sm:mt-10"
                  variants={fadeIn}
                >
                  <div
                    className={`relative flex items-center rounded-full border ${
                      isInputFocused
                        ? "border-blue-500/70 ring-2 ring-blue-200/50 dark:ring-blue-800/30"
                        : "border-gray-300/50 dark:border-gray-700/50"
                    } bg-white/80 shadow-lg backdrop-blur-md transition-all duration-300 dark:bg-gray-900/60 dark:backdrop-blur-md`}
                  >
                    <Search className="ml-4 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search related studies, theses, or papers..."
                      className="h-12 w-full flex-1 bg-transparent px-4 py-2 text-gray-900 outline-none dark:text-gray-100"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                    />
                    <button
                      type="submit"
                      className="mr-1 flex h-10 items-center justify-center rounded-full bg-blue-600/90 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:outline-none dark:bg-blue-700/90 dark:hover:bg-blue-600"
                    >
                      <span className="hidden sm:inline">Search</span>
                      <Search className="h-4 w-4 sm:hidden" />
                    </button>
                  </div>
                </motion.form>

                {/* Enhanced action buttons with glassmorphism */}
                <motion.div
                  className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                  variants={fadeIn}
                >
                  <button
                    onClick={goToHomepage}
                    className="group flex items-center justify-center space-x-2 rounded-lg bg-blue-600/90 px-5 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:outline-none dark:bg-blue-700/90 dark:hover:bg-blue-800"
                  >
                    <Home className="h-5 w-5" />
                    <span>Go to Homepage</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => router.push("/book")}
                    className="group flex items-center justify-center space-x-2 rounded-lg border border-gray-300/60 bg-white/70 px-5 py-3 text-base font-medium text-gray-700 backdrop-blur-sm transition-all hover:bg-white/80 hover:shadow-md focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:outline-none dark:border-gray-700/40 dark:bg-gray-800/60 dark:text-gray-200 dark:hover:bg-gray-800/70"
                  >
                    <Book className="h-5 w-5" />
                    <span>Browse Collection</span>
                  </button>
                </motion.div>

                {/* Footer */}
                <motion.div
                  className="mt-auto pt-8 text-center text-sm text-gray-500 dark:text-gray-400"
                  variants={fadeIn}
                >
                  © Manggad. All rights reserved. {new Date().getFullYear()}
                </motion.div>
              </div>
            </div>
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
}
