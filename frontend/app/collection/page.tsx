"use client";

import React, { useState, useEffect } from "react";

export default function Collections() {
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
    { name: "LCCB College Departments", subcategories: ["School of Architecture, Fine Arts & Interior Design", "School of Business and Information Technology ", "School of Hospitality and Tourism Management", "School of Sciences Liberal Arts and Teacher Education "] },
    { name: "College Courses", subcategories: ["Course 1", "Course 2", "Course 3"] },
  ];

  // Toggle the expandAll state
  const handleExpandAll = () => {
    setExpandAll(!expandAll);
    setOpenDropdown(null); // Reset any single open dropdown to avoid conflicts
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-[#0442B1] text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo Image */}
          <img
            src="MANGGAD LOGO.png" // Replace with the path to your logo image
            alt="Logo"
            className="h-14 w-14 mr-2" // Adjust height and width as needed
          />
          <div className="text-lg font-extrabold">Manggad</div>
        </div>

        {/* Centered Navigation Links and Real-time/ Admin section */}
        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="flex space-x-5">
            <a href="#" className="hover:underline text-lg">Home</a>
            <a href="#" className="hover:underline text-lg">About</a>
            <a href="#" className="hover:underline text-lg">Contact</a>
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
      
      {/* Banner Image */}
      <div className="w-full">
        <img
          src="Librarysample.jpg"
          alt="Banner"
          className="w-full object-cover h-[200px]"
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
              className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2"
            >
              Browse
            </button>
            {openDropdown === "browse" && (
              <ul className="space-y-1">
                <li><a href="#" className="text-lg hover:underline">Collections</a></li>
                <li><a href="#" className="text-lg hover:underline">Disciplines</a></li>
                <li><a href="#" className="text-lg hover:underline">Authors</a></li>
              </ul>
            )}
          </div>

          {/* Author Corner Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("author")}
              className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2"
            >
              Author Corner
            </button>
            {openDropdown === "author" && (
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline text-lg">Author FAQ</a></li>
              </ul>
            )}
          </div>

          {/* CONNECT Section */}
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("connect")}
              className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2"
            >
              About Manggad
            </button>
            {openDropdown === "connect" && (
              <ul className="space-y-1">
                <li><a href="#" className="text-lg hover:underline">content1</a></li>
                <li><a href="#" className="text-lg hover:underline">content2</a></li>
                <li><a href="#" className="text-lg hover:underline">content3</a></li>
                <li><a href="#" className="text-lg hover:underline">content4</a></li>
                <li><a href="#" className="text-lg hover:underline">content5</a></li>
              </ul>
            )}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          {/* Search Form */}
          <div className="w-full flex justify-center mt-5">
            <form className="w-full max-w-7xl flex items-center">
              <input
                type="text"
                className="border border-gray-300 placeholder:text-[#262832] px-4 py-2 w-full text-lg"
                placeholder="Search for documents, research, and more..."
              />
              <button className="bg-[#0442B1] text-white px-6 py-2 text-lg ml-2 max-w-96">
                Search
              </button>
            </form>
          </div>

          {/* Browse by Department and Course Section */}
          <div className="mt-5 px-4 py-2 border rounded-lg max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-2">Browse by Department and Course</h2>
            <p className="text-lg text-gray-600 mb-4">
              The content available here has been selected and deposited by individual departments. For more information, see <a href="#" className="text-blue-500 hover:underline">About the Repository</a>.
            </p>
            <button onClick={handleExpandAll} className="text-white text-lg bg-[#0442B1] px-4 py-2 rounded-md mb-2">
              {expandAll ? "Collapse All" : "Expand All"}
            </button>

            {/* Dropdown items with expand/collapse functionality */}
            <ul className="space-y-2">
              {dropdownItems.map((item, index) => (
                <li key={index} className="border-b flex flex-col">
                  {/* Expand/Collapse Icons */}
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="text-lg text-[#0442B1] bg-transparent hover:bg-inherit font-semibold py-2 w-full text-left" // Adjusted for full width
                  >
                    {/* Render + or - based on the dropdown state */}
                    {openDropdown === item.name || expandAll ? '-' : '+'} {item.name}
                  </button>
                  {(openDropdown === item.name || expandAll) && (
                    <ul className="ml-5 space-y-1 text-lg text-gray-700 font-semibold">
                      {item.subcategories.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <a href="#" className="hover:underline">{sub}</a>
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

      {/* Footer Section */}
      <footer className="bg-[#0442B1] text-white py-4 mt-32">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} Manggad. All rights reserved.</p>
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
