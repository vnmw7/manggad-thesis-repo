"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    router.push(`/book/search?query=${searchQuery}`);
  };

  return (
    <div className="flex h-[100vh]">
      {/* Left Side Background Image */}
      <div
        className="h-full w-[50vw] bg-cover bg-no-repeat" // Use vw (viewport width) for responsiveness
        style={{ backgroundImage: "url('/sample.jpg')" }}
      />

      {/* Right Side Logos and Text */}
      <div className="flex h-full w-[50vw] flex-col items-center justify-start bg-[#ffffff] px-4 sm:px-8 lg:px-16">
        {/* Responsive padding with px-4 for smaller screens */}

        {/* Logo Section */}
        <div className="mb-1 flex items-center">
          <div className="mt-8 h-[160px] w-[160px]">
            <img
              src="MANGGAD LOGO.png"
              alt="Manggad Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="ml-4 mt-8 h-[130px] w-[130px]">
            <img
              src="lccb.png"
              alt="lccb"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Centered Text Under Logos */}
        <h2 className="mt-16 text-center text-6xl font-semibold">
          <div>MANGGAD</div>
          <div className="mt-7 text-5xl font-bold text-[#0A379C]">
            Research Repository Management System
          </div>
        </h2>

        {/* Centered Search Bar Under the H2 Text */}
        <div className="mt-24 flex w-full justify-center">
          <div className="flex w-full max-w-[1000px] items-center">
            <input
              type="text"
              placeholder="Search Related Studies"
              className="flex-grow border border-gray-300 px-4 py-2 transition-colors placeholder:text-[#262832]"
              style={{ color: "#262832", borderColor: "#262832" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Button 1 */}
            <button
              className="ml-2 w-32 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              onClick={handleSearch}
            >
              Search
            </button>
            {/* Button 2 */}
            <button
              className="ml-2 w-64 rounded-lg bg-[#0442B1] px-4 py-2 text-white transition hover:bg-blue-600"
              onClick={() => router.push("/home")}
            >
              Go to Homepage
            </button>
          </div>
        </div>

        {/* Justified Paragraph */}
        <div className="mt-12 flex w-full justify-center">
          <div className="w-full max-w-[1000px]">
            <p className="text-justify text-xl text-gray-700">
              This system helps users easily find and organize research papers,
              theses, and other documents. It makes it easy to access a large
              collection of studies, supporting the growth of knowledge and
              research.
            </p>
          </div>
        </div>

        {/* Credit Section */}
        <div className="mt-48 flex w-full justify-center">
          <p className="text-center text-gray-500">
            © Manggad. All rights reserved. 2024
          </p>
        </div>
      </div>
    </div>
  );
}
