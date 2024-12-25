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
        className="bg-cover bg-no-repeat w-[50vw] h-full" // Use vw (viewport width) for responsiveness
        style={{ backgroundImage: "url('/sample.jpg')" }}
      />

      {/* Right Side Logos and Text */}
      <div className="flex flex-col items-center justify-start bg-[#ffffff] w-[50vw] h-full px-4 sm:px-8 lg:px-16">
        {/* Responsive padding with px-4 for smaller screens */}

        {/* Logo Section */}
        <div className="flex items-center mb-1">
          <div className="w-[160px] h-[160px] mt-8">
            <img
              src="MANGGAD LOGO.png"
              alt="Manggad Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-[130px] h-[130px] ml-4 mt-8">
            <img
              src="lccb.png"
              alt="lccb"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Centered Text Under Logos */}
        <h2 className="text-center mt-16 text-6xl font-semibold">
          <div>MANGGAD</div>
          <div className="mt-7 text-5xl font-bold text-[#0A379C]">
            Research Repository Management System
          </div>
        </h2>

        {/* Centered Search Bar Under the H2 Text */}
        <div className="mt-24 w-full flex justify-center">
          <div className="flex items-center w-full max-w-[1000px]">
            <input
              type="text"
              placeholder="Search Related Studies"
              className="border border-gray-300 transition-colors placeholder:text-[#262832] flex-grow py-2 px-4"
              style={{ color: "#262832", borderColor: "#262832" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Button 1 */}
            <button
              className="ml-2 px-4 py-2 w-32 bg-blue-500 text-white rounded-lg transition hover:bg-blue-600"
              onClick={handleSearch}
            >
              Search
            </button>
            {/* Button 2 */}
            <button
              className="ml-2 px-4 py-2 w-64  text-white rounded-lg bg-[#0442B1] transition hover:bg-blue-600"
              onClick={() => router.push("/home")}
            >
              Go to Homepage
            </button>
          </div>
        </div>

        {/* Justified Paragraph */}
        <div className="mt-12 w-full flex justify-center">
          <div className="w-full max-w-[1000px]">
            <p className="text-justify text-gray-700 text-xl">
              This system helps users easily find and organize research papers,
              theses, and other documents. It makes it easy to access a large
              collection of studies, supporting the growth of knowledge and
              research.
            </p>
          </div>
        </div>

        {/* Credit Section */}
        <div className="w-full flex justify-center mt-48">
          <p className="text-center text-gray-500">
            © Manggad. All rights reserved. 2024
          </p>
        </div>
      </div>
    </div>
  );
}
