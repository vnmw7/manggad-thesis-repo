"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import AddBookForm from "@/app/_components/AddBookForm";

export default function AboutPage() {
  const router = useRouter()
  // State for the dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // State for real-time clock and date
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to toggle dropdown
  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Use useEffect to update the clock and date every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  // Format time as HH:MM:SS AM/PM
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  // Format date as Month Day, Year (e.g., October 26, 2024)
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-[#0442B1] text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo Image */}
          <img
            src="/MANGGAD LOGO.png" // Replace with the path to your logo image
            alt="Logo"
            className="h-32 w-32 mr-2" // Adjust height and width as needed
            />
            <div className="text-2xl font-extrabold">Manggad Research Repository</div>
        </div>

        {/* Centered Navigation Links and Real-time/ Admin section */}
        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="flex space-x-5">
          <a className="hover:underline cursor-pointer text-lg" onClick={() => router.push("/home") }>Home</a>
    <a className="hover:underline cursor-pointer text-lg" onClick={() => router.push("/about") }>About</a>
    <a className="hover:underline cursor-pointer text-lg" onClick={() => router.push("/contact") }>Contact</a>
          </div>

          {/* Divider Line */}
          <div className="border-l border-white h-10 mx-4"></div>

          {/* Real-time Date, Time and Admin Button */}
          <div className="flex items-center space-x-4">
            <div className="font-mono text-lg text-right">
              <div>{formattedDate}</div>
              <div>{formattedTime}</div>
            </div>

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
        </div>
      </nav>

      {/* Image Banner */}
      <div className="w-full">
        <img
          src="/Librarysample.jpg"
          alt="Banner"
          className="w-full object-cover h-[200px]" // Adjust height as needed
        />
      </div>

       {/* Main Content with Sidebar under the banner */}
       <div className="flex flex-1 ml-4">
        {/* Sidebar - Under Banner and on Full Left */}
        <div className="w-[250px] h-[428px] bg-white] p-4 border rounded-lg mt-5">
          {/* BROWSE Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("browse")}
              className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18m-7 5h7"/>
              </svg>
              Browse
            </button>
            {openDropdown === "browse" && (
              <ul className="space-y-1">
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/collection") }>Collections</a></li>
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/discipline") }>Disciplines</a></li>
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/author") }>Authors</a></li>
              </ul>
            )}
          </div>

          {/* Author Corner Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("author")}
              className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 15.5l2.5-2.5-2.5-2.5m-11 7l-2.5-2.5 2.5-2.5M5 9h14m-7 10l-5-5h10l-5 5z"/>
              </svg>
              Author Corner
            </button>
            {openDropdown === "author" && (
              <ul className="space-y-1">
                <li><a className="text-lg hover:underline cursor-pointer">Author FAQ</a></li>
              </ul>
            )}
          </div>

          {/* CONNECT Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("connect")}
              className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 4.5l-7 7-7-7M19 15.5l-7 7-7-7"/>
              </svg>
              About Manggad
            </button>
            {openDropdown === "connect" && (
              <ul className="space-y-1">
                <li><a href="#" className="text-lg hover:underline cursor-pointer">Policies</a></li>
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/contact") }>Contact</a></li>
                <li><a href="https://lcc.edu.ph/" className="text-lg hover:underline cursor-pointer">LCCB Website</a></li>
              </ul>
            )}
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
              <button className="bg-[#0442B1] transition hover:bg-blue-600 text-white px-6 py-2 text-lg ml-2 max-w-96">
                Search
              </button>
            </form>
          </div>

			
          	<div className="mt-5 px-4 py-2 border rounded-lg max-w-7xl mx-auto">
				<AddBookForm />
          	</div>

        	</div>
      </div>
    
      {/* Footer */}
      <footer className="bg-[#0442B1] text-white py-4 mt-14">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Manggad. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
