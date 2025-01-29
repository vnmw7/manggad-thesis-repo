"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AuthorsPage() {
  const router = useRouter();
  // State for the dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const today = new Date();

  // State for real-time clock and date
  const [currentTime, setCurrentTime] = useState(new Date());

  // State for alphabetical selection
  const [selectedLetter, setSelectedLetter] = useState<string>("A");

  // Sample list of items to display based on alphabetical selection
  const items = ["A"];

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
  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  // Format date as Month Day, Year (e.g., October 26, 2024)
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Navbar */}
      <nav className="flex w-full items-center justify-between bg-[#0442B1] px-4 py-2 text-white">
        <div className="flex items-center">
          {/* Logo Image */}
          <Image
            src="/MANGGAD LOGO.png" // Replace with the path to your logo image
            alt="Logo"
            width={128} // Adjust width as needed
            height={128} // Adjust height as needed
            className="mr-2"
          />
          <div className="text-2xl font-extrabold">
            Manggad Research Repository
          </div>
        </div>

        {/* Centered Navigation Links and Real-time/ Admin section */}
        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="flex space-x-5">
            <a
              className="cursor-pointer text-lg hover:underline"
              onClick={() => router.push("/home")}
            >
              Home
            </a>
            <a
              className="text-lg hover:underline"
              onClick={() => router.push("/about")}
            >
              About
            </a>
            <a
              className="text-lg hover:underline"
              onClick={() => router.push("/contact")}
            >
              Contact
            </a>
          </div>

          {/* Divider Line */}
          <div className="mx-4 h-10 border-l border-white"></div>

          {/* Real-time Date, Time and Admin Button */}
          <div className="flex items-center space-x-4">
            <div className="text-right font-mono text-lg">
              <div>{formattedDate}</div>
              <div>{formattedTime}</div>
            </div>

            {/* Profile Icon Button for Admin Login */}
            <button
              className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => router.push("/login")}
            >
              {/* SVG Icon for Person */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-800"
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
        <Image
          src="/Librarysample.jpg"
          alt="Banner"
          width={1920} // Adjust width as needed
          height={200} // Adjust height as needed
          className="object-cover"
        />
      </div>

      {/* Main Content with Sidebar under the banner */}
      <div className="ml-4 flex flex-1">
        {/* Sidebar - Under Banner and on Full Left */}
        <div className="bg-white] mt-5 h-[428px] w-[250px] rounded-lg border p-4">
          {/* BROWSE Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("browse")}
              className="mb-2 flex w-full items-center rounded-lg bg-[#0442B1] p-4 text-left text-xl font-thin text-white"
            >
              <svg
                className="mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7h18M3 12h18m-7 5h7"
                />
              </svg>
              Browse
            </button>
            {openDropdown === "browse" && (
              <ul className="space-y-1">
                <li>
                  <a
                    className="cursor-pointer text-lg hover:underline"
                    onClick={() => router.push("/book/search")}
                  >
                    Search Repository
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-pointer text-lg hover:underline"
                    onClick={() => router.push("/collection")}
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-pointer text-lg hover:underline"
                    onClick={() => router.push("/author")}
                  >
                    Authors
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* Author Corner Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("author")}
              className="mb-2 flex w-full items-center rounded-lg bg-[#0442B1] p-4 text-left text-xl font-thin text-white"
            >
              <svg
                className="mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.5 15.5l2.5-2.5-2.5-2.5m-11 7l-2.5-2.5 2.5-2.5M5 9h14m-7 10l-5-5h10l-5 5z"
                />
              </svg>
              Author Corner
            </button>
            {openDropdown === "author" && (
              <ul className="space-y-1">
                <li>
                  <a
                    className="cursor-pointer text-lg hover:underline"
                    onClick={() => router.push("/faq")}
                  >
                    Author FAQ
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* CONNECT Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("connect")}
              className="mb-2 flex w-full items-center rounded-lg bg-[#0442B1] p-4 text-left text-xl font-thin text-white"
            >
              <svg
                className="mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 4.5l-7 7-7-7M19 15.5l-7 7-7-7"
                />
              </svg>
              About Manggad
            </button>
            {openDropdown === "connect" && (
              <ul className="space-y-1">
                <li>
                  <a
                    className="cursor-pointer text-lg hover:underline"
                    onClick={() => router.push("/contact")}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://lcc.edu.ph/"
                    className="cursor-pointer text-lg hover:underline"
                  >
                    LCCB Website
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* About */}
          <div className="mx-auto mt-5 max-w-7xl rounded-lg border px-4 py-2">
            <h2 className="mb-2 text-3xl font-semibold">Browse by Author</h2>
            <p className="mb-4 text-lg text-gray-600">
              Here is a list of authors from La Consolacion College Bacolod who
              have works in this repository as of {formattedDate}. Click an
              author&apos;s name to see their work. For more details, see{" "}
              <a href="#" className="text-blue-500 hover:underline">
                About the Repository
              </a>
              .
            </p>
          </div>

          {/* Alphabetical Selector Section */}
          <div className="mx-auto mt-5 max-w-7xl rounded-lg border px-4 py-2">
            {/* Alphabetical Selector */}
            <div className="justify-left mb-4 flex space-x-2">
              {Array.from(Array(26)).map((_, index) => {
                const letter = String.fromCharCode(65 + index); // A-Z
                return (
                  <span
                    key={letter}
                    className={`cursor-pointer text-lg ${selectedLetter === letter ? "font-bold underline" : "text-[#0442B1]"} hover:underline`}
                    onClick={() => setSelectedLetter(letter)}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>

            {/* Display selected letter */}
            <div className="mt-4 text-xl font-bold">
              <span className="text-3xl text-[#0442B1]">{selectedLetter}</span>
            </div>

            {/* Alphabetical List */}
            <div className="mt-2 text-lg">
              <div className="space-y-1">
                {items
                  .filter((item) => item.startsWith(selectedLetter))
                  .map((item) => (
                    <span
                      key={item}
                      className="cursor-pointer text-lg underline hover:text-blue-600"
                      onClick={() => console.log(`Clicked on ${item}`)} // Replace with your click handling logic
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-14 bg-[#0442B1] py-4 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Manggad. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              className="cursor-pointer hover:underline"
              onClick={() => router.push("/about")}
            >
              About Us
            </a>
            <a
              className="cursor-pointer hover:underline"
              onClick={() => router.push("/contact")}
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
