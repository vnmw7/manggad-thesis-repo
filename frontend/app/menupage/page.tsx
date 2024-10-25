"use client";

import React from "react";

export default function MenuPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
        <div className="text-lg font-thin">
          Manggad Research Repository
        </div>
        <div className="space-x-4 flex items-center">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>

          {/* Profile Icon Button for Admin Login */}
          <button
            className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => console.log("Login as admin")}
          >
            {/* SVG Icon for Person */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c2.485 0 4.5-2.015 4.5-4.5S14.485 2 12 2 7.5 4.015 7.5 6.5 9.515 11 12 11zM4 20c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Image Banner */}
      <div className="w-full">
        <img
          src="Library1.jpg"
          alt="Banner"
          className="w-full object-cover h-[200px]" // Adjust height as needed
        />
      </div>

      {/* Main Content with Sidebar under the banner */}
      <div className="flex flex-1 ml-4">
        {/* Sidebar - Under Banner and on Full Left */}
        <div className="w-[250px] bg-gray-900 p-4 border-r min-h-screen mt-5">

          {/* BROWSE Section */}
          <div className="bg-green-700 text-white p-4 mb-4">
            <h2 className="font-bold mb-2">section1</h2>
            <ul className="space-y-1">
              <li><a href="#" className="text-white hover:underline">content1</a></li>
              <li><a href="#" className="text-white hover:underline">content2</a></li>
              <li><a href="#" className="text-white hover:underline">content3</a></li>
              <li><a href="#" className="text-white hover:underline">content4</a></li>
            </ul>
          </div>

          {/* SUBMIT Section */}
          <div className="bg-green-700 text-white p-4 mb-4">
            <h2 className="font-bold mb-2">section2</h2>
            <ul className="space-y-1">
              <li><a href="#" className="text-white hover:underline">content1</a></li>
              <li><a href="#" className="text-white hover:underline">content2</a></li>
              <li><a href="#" className="text-white hover:underline">content3</a></li>
              <li><a href="#" className="text-white hover:underline">content4</a></li>
            </ul>
          </div>

          {/* CONNECT Section */}
          <div className="bg-green-700 text-white p-4 mb-4">
            <h2 className="font-bold mb-2">section3</h2>
            <ul className="space-y-1">
              <li><a href="#" className="text-white hover:underline">content1</a></li>
              <li><a href="#" className="text-white hover:underline">content2</a></li>
              <li><a href="#" className="text-white hover:underline">content3</a></li>
              <li><a href="#" className="text-white hover:underline">content4</a></li>
              <li><a href="#" className="text-white hover:underline">content5</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Centered Search Field */}
          <div className="w-full flex justify-center mt-5">
            <form className="w-full max-w-7xl flex items-center">
              {/* Input field takes most of the width */}
              <input
                type="text"
                className="border border-gray-300 placeholder:text-[#262832] px-4 py-2 w-full text-lg"
                placeholder="Search for documents, research, and more..."
              />
              {/* Search button on the right side of the input */}
              <button className="bg-blue-500 transition hover:bg-blue-600 text-white px-6 py-2 text-lg ml-2 max-w-96">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
