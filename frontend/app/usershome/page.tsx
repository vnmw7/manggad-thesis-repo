"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

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
            className="mr-2 h-32 w-32"
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
              onClick={() => router.push("/usershome")}
            >
              Home
            </a>
            <a
              className="cursor-pointer text-lg hover:underline"
              onClick={() => router.push("/usersabout")}
            >
              About
            </a>
            <a
              className="cursor-pointer text-lg hover:underline"
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
          width={1920}
          height={200}
          className="h-[200px] w-full object-cover"
        />
      </div>

      {/* Main Content with Sidebar under the banner */}
      <div className="ml-4 flex flex-1">
        {/* Sidebar - Under Banner and on Full Left */}
        <div className="bg-white] mt-5 h-[428px] w-[250px] rounded-lg border p-4">
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
                    onClick={() => router.push("/book/addBook")}
                  >
                    Submit Research
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-pointer text-lg hover:underline"
                    onClick={() => router.push("/usersfaq")}
                  >
                    Manggad FAQ
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
                    onClick={() => router.push("/userscontact")}
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
          {/* Centered Search Field */}
          <div className="mt-5 flex w-full justify-center">
            <form className="flex w-full max-w-7xl items-center">
              {/* Input field takes most of the width */}
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 text-lg placeholder:text-[#262832]"
                placeholder="Search for documents, research, and more..."
              />
              {/* Search button on the right side of the input */}
              <button className="ml-2 max-w-96 bg-[#0442B1] px-6 py-2 text-lg text-white transition hover:bg-blue-600">
                Search
              </button>
            </form>
          </div>

          {/* Image Carousel */}
          <div className="mt-8 flex w-full justify-center rounded-lg">
            <div className="w-full max-w-7xl">
              <Carousel
                showThumbs={false}
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                showStatus={false}
                stopOnHover={false} // Optional: Keeps autoPlay running when hovered
                dynamicHeight={false}
              >
                <div>
                  <Image
                    src="/Galo.jpg"
                    alt="Carousel Image 1"
                    width={1920}
                    height={300}
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
                <div>
                  <Image
                    src="/RizalEntrance.jpg"
                    alt="Carousel Image 2"
                    width={1920}
                    height={300}
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
                <div>
                  <Image
                    src="/CollegeAtrium.jpg"
                    alt="Carousel Image 3"
                    width={1920}
                    height={300}
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
                <div>
                  <Image
                    src="/SwimCenter.jpg"
                    alt="Carousel Image 4"
                    width={1920}
                    height={300}
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
                <div>
                  <Image
                    src="/Amistad.jpg"
                    alt="Carousel Image 5"
                    width={1920}
                    height={300}
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
              </Carousel>
            </div>
          </div>

          {/* First New Div Below the Carousel */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-left text-5xl font-bold text-[#0A379C]">
                The First Higher Education Institution in Negros Occidental
              </h2>
              <p className="max-full mt-5 text-justify text-xl text-gray-600">
                Dive deep into various disciplines and explore a wealth of
                knowledge contributed by our students and faculty. Our
                repository houses documents, research papers, and valuable
                resources curated for your academic and professional growth.
              </p>
            </div>
          </div>

          {/* Second New Div */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-left text-3xl font-bold text-[#0A379C]">
                Founded by the Augustinian Sisters of our Lady of Consolation
              </h2>
              <p className="mt-5 text-justify text-xl text-gray-600">
                La Consolacion College Bacolod was first established in 1919 by
                the Augustinian Sisters from Spain under the leadership of Mo.
                Rita Barcelo, OSA and Mo. Consuelo, OSA upon the invitation of a
                Catholic Bishop to put up a school in Bacolod City, now the
                capital of Negros Occidental, Philippines – one of the world’s
                top suppliers of sugar at that time.
              </p>
            </div>
          </div>

          {/* Third New Div */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-left text-3xl font-bold text-[#0A379C]">
                Pioneer in Education
              </h2>
              <p className="mt-5 text-justify text-xl text-gray-600">
                With a campus located at the center of Bacolod City, the first
                educational offerings of La Consolacion College Bacolod were
                primary and intermediate school certificates.
              </p>
            </div>
          </div>

          {/* Fourth New Div */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-left text-3xl font-bold text-[#0A379C]">
                School of Girls
              </h2>
              <p className="mt-5 text-justify text-xl text-gray-600">
                The first students of La Consolacion College Bacolod were girls
                from wealthy families of Negros Occidental until the 1960’s when
                the provincial economy was hit by a global crisis in the sugar
                industry, LCCB became co-educational and opened its doors to
                provide greater access to education for the poor – reinforcing
                its mission for evangelization through education.
              </p>
            </div>
          </div>

          {/* Fifth New Div */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-justify text-3xl font-bold text-[#0A379C]">
                Physical and Academic Advancement
              </h2>
              <p className="mt-5 text-justify text-xl text-gray-600">
                There was a rapid growth of student population as educational
                offerings and scholarship opportunities were increasingly
                offered. The college pioneered the offering of architecture,
                fine arts and interior design degree programs in addition to its
                teacher education and commerce degrees. It was followed by the
                offering of culinary, hospitality and tourism degree programs
                which were also the first of their kind in the province.
              </p>
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
            <a href="#" className="hover:underline">
              About Us
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
