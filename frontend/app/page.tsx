"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

export default function StartPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter a search query.");
    } else {
      toast.success("Searching for: " + searchQuery);
      router.push(`/book/search?query=${searchQuery}`);
    }
  };

  const goToHomepage = () => {
    toast.info("Navigating to Homepage...");
    router.push("/home");
  };

  return (
    <div className="flex h-[100vh]">
      {/* Left Side Background Image */}
      <div
        className="hidden h-full w-[50vw] bg-cover bg-no-repeat lg:block"
        style={{ backgroundImage: "url('/sample.jpg')" }}
      />

      {/* Right Side Logos and Text */}
      <div className="flex h-full w-full flex-col items-center justify-between overflow-y-auto bg-[#ffffff] px-4 sm:px-8 lg:w-[50vw] lg:px-16">
        {/* Logo Section */}
        <div className="mb-1 flex items-center">
          <div className="mt-8 aspect-square h-24">
            <img
              src="MANGGAD LOGO.png"
              alt="Manggad Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="ml-4 mt-8 aspect-square h-[90px]">
            <img
              src="lccb.png"
              alt="lccb"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Centered Text Under Logos */}
        <h2 className="mt-8 text-center text-4xl font-semibold">
          <div> MANGGAD </div>
          <div className="text-3xl font-bold text-[#0A379C]">
            Research Repository Management System
          </div>
        </h2>

        {/* Centered Search Bar Under the H2 Text */}
        <div className="mt-12 flex w-full justify-center">
          <div className="flex w-full max-w-[1000px] flex-col items-center lg:flex-row">
            <input
              type="text"
              placeholder="Search Related Studies"
              className="flex-grow border border-gray-300 px-4 py-2 transition-colors placeholder:text-[#262832]"
              style={{ color: "#262832", borderColor: "#262832" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex w-full justify-between lg:w-72">
              <button
                className="w-32 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 lg:ml-2"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="w-64 rounded-lg bg-[#0442B1] px-4 py-2 text-white transition hover:bg-blue-600 lg:ml-2"
                onClick={goToHomepage}
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>

        {/* Justified Paragraph */}
        <div className="mt-12 flex w-full justify-center">
          <div className="w-full max-w-[1000px]">
            <p className="text-justify text-base text-gray-700 lg:text-xl">
              This system helps users easily find and organize research papers,
              theses, and other documents. It makes it easy to access a large
              collection of studies, supporting the growth of knowledge and
              research.
            </p>
          </div>
        </div>

        {/* Credit Section */}
        <div className="mt-4 flex w-full justify-center">
          <p className="text-center text-gray-500">
            © Manggad. All rights reserved. 2024
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}