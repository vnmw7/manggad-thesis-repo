"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

export default function HomePage() {
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

      {/* Image Banner */}
      <div className="w-full">
        <img
          src="Librarysample.jpg"
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
                <li><a href="#" className="text-lg hover:underline">Author FAQ</a></li>
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

          {/* Image Carousel */}
          <div className="w-full mt-8 flex justify-center rounded-lg">
            <div className="w-full max-w-7xl">
              <Carousel
                showThumbs={false}
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                showStatus={false}
                stopOnHover={false}  // Optional: Keeps autoPlay running when hovered
                dynamicHeight={false}
              >
                <div>
                  <img src="Galo.jpg" alt="Carousel Image 1" className="object-fill h-[300px] w-full rounded-lg" />
                </div>
                <div>
                  <img src="RizalEntrance.jpg" alt="Carousel Image 2" className="object-fill h-[300px] w-full rounded-lg" />
                </div>
                <div>
                  <img src="CollegeAtrium.jpg" alt="Carousel Image 3" className="object-fill h-[300px] w-full rounded-lg" />
                </div>
                <div>
                  <img src="SwimCenter.jpg" alt="Carousel Image 4" className="object-fill h-[300px] w-full rounded-lg" />
                </div>
                <div>
                  <img src="Amistad.jpg" alt="Carousel Image 5" className="object-fill h-[300px] w-full rounded-lg" />
                </div>
              </Carousel>
            </div>
          </div>

          {/* First New Div Below the Carousel */}
          <div className="w-full flex justify-center mt-8 -ml-48">
            <div className="text-center max-w-4xl">
              <h2 className="text-5xl text-left font-bold text-[#0A379C] mb-2">The First Higher Education Institution in Negros Occidental</h2>
              <p className="text-gray-600 text-xl text-justify mt-5 max-full">
                Dive deep into various disciplines and explore a wealth of knowledge contributed by our students and faculty. 
                Our repository houses documents, research papers, and valuable resources curated for your academic and professional growth.
              </p>
            </div>
          </div>

          {/* Second New Div */}
          <div className="w-full flex justify-center mt-8 -ml-48">
            <div className="text-center max-w-4xl">
              <h2 className="text-3xl text-left font-bold text-[#0A379C] mb-2">Founded by the Augustinian Sisters of our Lady of Consolation</h2>
              <p className="text-gray-600 text-xl text-justify mt-5">
              La Consolacion College Bacolod was first established in 1919 by the Augustinian Sisters from Spain under the leadership of Mo. Rita Barcelo, OSA and Mo. Consuelo, OSA upon the invitation of a Catholic Bishop to put up a school in Bacolod City, now the capital of Negros Occidental, Philippines – one of the world’s top suppliers of sugar at that time. 
              </p>
            </div>
          </div>

          {/* Third New Div */}
          <div className="w-full flex justify-center mt-8 -ml-48">
            <div className="text-center max-w-4xl">
              <h2 className="text-3xl text-left font-bold text-[#0A379C] mb-2">Pioneer in Education</h2>
              <p className="text-gray-600 text-xl text-justify mt-5">
              With a campus located at the center of Bacolod City, the first educational offerings of La Consolacion College Bacolod were primary and intermediate school certificates.
              </p>
            </div>
          </div>

          {/* Fourth New Div */}
          <div className="w-full flex justify-center mt-8 -ml-48">
            <div className="text-center max-w-4xl">
              <h2 className="text-3xl text-left font-bold text-[#0A379C] mb-2">School of Girls</h2>
              <p className="text-gray-600 text-xl text-justify mt-5">
              The first students of La Consolacion College Bacolod were girls from wealthy families of Negros Occidental until the 1960’s when the provincial economy was hit by a global crisis in the sugar industry, LCCB became co-educational and opened its doors to provide greater access to education for the poor – reinforcing its mission for evangelization through education.
              </p>
            </div>
          </div>

          {/* Fifth New Div */}
          <div className="w-full flex justify-center mt-8 -ml-48">
            <div className="text-center max-w-4xl">
              <h2 className="text-3xl text-justify font-bold text-[#0A379C] mb-2">Physical and Academic Advancement</h2>
              <p className="text-gray-600 text-xl text-justify mt-5">
              There was a rapid growth of student population as educational offerings and scholarship opportunities were increasingly offered. The college pioneered the offering of architecture, fine arts and interior design degree programs in addition to its teacher education and commerce degrees. It was followed by the offering of culinary, hospitality and tourism degree programs which were also the first of their kind in the province.
              </p>
            </div>
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
