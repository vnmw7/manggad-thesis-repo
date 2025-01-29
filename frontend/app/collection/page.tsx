"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Collections() {
  const router = useRouter();

  // State for the dropdown and expand all feature
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  // State for real-time clock and date
  const [currentTime, setCurrentTime] = useState(new Date());

  // Function to toggle dropdown
  const toggleDropdown = (dropdownName: string) => {
    if (expandAll) setExpandAll(false); // If "Expand All" is active, turn it off when toggling a specific dropdown
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
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Dropdown items with unique subcategories
  const dropdownItems = [
    {
      name: "LCCB College Departments",
      subcategories: [
        "School of Architecture, Fine Arts & Interior Design",
        "School of Business and Information Technology ",
        "School of Hospitality and Tourism Management",
        "School of Sciences Liberal Arts and Teacher Education ",
      ],
    },
    {
      name: "Theses and Dissertations",
      subcategories: [
        "Advertising Arts",
        "Architecture",
        "Culinary Arts",
        "Digital Media Arts",
        "Elementary Education",
        "English Language Studies",
        "Entertainment & Multimedia Computing",
        "Fashion Design",
        "Hospitality Management",
        "Human Resource Management",
        "Industrial Design",
        "Information Technology",
        "Interior Design",
        "Library & Information Science",
        "Marketing Management",
        "Psychology",
        "Studio Arts",
        "Tourism Management",
      ],
    },
  ];

  // Toggle the expandAll state
  const handleExpandAll = () => {
    setExpandAll(!expandAll);
    setOpenDropdown(null); // Reset any single open dropdown to avoid conflicts
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Navbar */}
      <nav className="flex w-full items-center justify-between bg-[#0442B1] px-4 py-2 text-white">
        <div className="flex items-center">
          {/* Logo Image */}
          <Image
            src="/MANGGAD LOGO.png" // Replace with the path to your logo image
            alt="Logo"
            className="mr-2 h-32 w-32" // Adjust height and width as needed
            width={128}
            height={128}
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
              onClick={() => console.log("Login as admin")}
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

      {/* Banner Image */}
      <div className="w-full">
        <Image
          src="/Librarysample.jpg"
          alt="Banner"
          className="h-[200px] w-full object-cover"
          width={1920}
          height={200}
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
                  <a className="cursor-pointer text-lg hover:underline">
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

        {/* Main content area */}
        <div className="flex-1">
          {/* Browse by Department and Course Section */}
          <div className="mx-auto mt-5 max-w-7xl rounded-lg border px-4 py-2">
            <h2 className="mb-2 text-3xl font-semibold">
              Browse by Department and Course
            </h2>
            <p className="mb-4 text-lg text-gray-600">
              The content available here has been selected and deposited by
              individual departments. For more information, see{" "}
              <a href="#" className="text-blue-500 hover:underline">
                About the Repository
              </a>
              .
            </p>
            <button
              onClick={handleExpandAll}
              className="mb-2 rounded-md bg-[#0442B1] px-4 py-2 text-lg text-white"
            >
              {expandAll ? "Collapse All" : "Expand All"}
            </button>

            {/* Dropdown items with expand/collapse functionality */}
            <ul className="space-y-2">
              {dropdownItems.map((item, index) => (
                <li key={index} className="flex flex-col border-b">
                  {/* Expand/Collapse Icons */}
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full bg-transparent py-2 text-left text-lg font-semibold text-[#0442B1] hover:bg-inherit" // Adjusted for full width
                  >
                    {/* Render + or - based on the dropdown state */}
                    {openDropdown === item.name || expandAll ? "-" : "+"}{" "}
                    {item.name}
                  </button>
                  {(openDropdown === item.name || expandAll) && (
                    <ul className="ml-5 space-y-1 text-lg font-semibold text-gray-700">
                      {item.subcategories.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <a href="#" className="hover:underline">
                            {sub}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
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
