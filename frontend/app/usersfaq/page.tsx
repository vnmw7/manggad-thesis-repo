"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FaqPage() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <nav className="flex w-full items-center justify-between bg-[#0442B1] px-4 py-2 text-white">
        <div className="flex items-center">
          <img
            src="MANGGAD LOGO.png"
            alt="Logo"
            className="mr-2 h-32 w-32" // Adjust height and width as needed
          />
          <div className="text-2xl font-extrabold">
            Manggad Research Repository
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <div className="flex space-x-5">
            <a
              className="cursor-pointer text-lg hover:underline"
              onClick={() => router.push("/home")}
            >
              Home
            </a>
            <a
              className="cursor-pointer text-lg hover:underline"
              onClick={() => router.push("/about")}
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
          <div className="mx-4 h-10 border-l border-white"></div>
          <div className="flex items-center space-x-4">
            <div className="text-right font-mono text-lg">
              <div>{formattedDate}</div>
              <div>{formattedTime}</div>
            </div>
            <button
              className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => router.push("/login")}
            >
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

      <div className="w-full">
        <img
          src="Librarysample.jpg"
          alt="Banner"
          className="h-[200px] w-full object-cover"
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
          {/* Centered Search Field */}

          {/* FAQ Section */}
          <div className="mt-8 w-full flex-1">
            <h2 className="mx-auto mb-4 w-full max-w-7xl text-3xl font-semibold text-[#0A379C]">
              Frequently Asked Questions
            </h2>
            <div className="ml-44 w-full max-w-7xl">
              {" "}
              {/* Div for alignment */}
              <ul className="space-y-4">
                {[
                  {
                    question:
                      "What is Manggad: Research Repository Management System?",
                    answer:
                      "Manggad is a web-based repository system designed to make theses and academic studies accessible to students and faculty at LCCB. It aims to provide a streamlined way to search, filter, and explore academic works.",
                  },
                  {
                    question: "What are the primary features of the system?",
                    answer: (
                      <div>
                        <p>
                          ⦁ Online Accessibility: Students and faculty can
                          access theses and academic studies from any device
                          with an internet connection.
                        </p>
                        <p>
                          ⦁ Search and Filter Tools: Users can easily locate
                          specific research papers by using keywords,
                          publication dates, or department filters.
                        </p>
                        <p>
                          ⦁ Faculty Recommendations: Faculty members can mark
                          and highlight recommended studies in the repository.
                        </p>
                      </div>
                    ),
                  },
                  {
                    question: "Who can use the system?",
                    answer: (
                      <div>
                        <p>
                          Students can use the system to search and view theses
                          and academic studies, while faculty members have
                          additional privileges such as marking recommended
                          studies for reference.
                        </p>
                      </div>
                    ),
                  },
                  {
                    question:
                      "How will Manggad promote the improvement of previous theses?",
                    answer: (
                      <div>
                        <p>
                          By making previous works easily accessible and
                          enabling faculty to recommend exemplary studies,
                          Manggad encourages students to build on existing
                          research, fostering academic growth and innovation.
                        </p>
                      </div>
                    ),
                  },
                  {
                    question: "When will the system be implemented?",
                    answer: (
                      <div>
                        <p>
                          The system will be launched after full development and
                          testing. It will also be formally introduced to the
                          LCCB community to ensure awareness and adoption.
                        </p>
                      </div>
                    ),
                  },
                  {
                    question:
                      "Can faculty and students contribute to the repository?",
                    answer: (
                      <div>
                        <p>
                          Currently, only authorized personnel, such as faculty
                          members or system administrators, can add new content
                          to the repository. Students can only access and view
                          the available resources.
                        </p>
                      </div>
                    ),
                  },
                  // Add more FAQs here as needed
                ].map(({ question, answer }, index) => (
                  <li key={index} className="ml-4">
                    {" "}
                    {/* Align questions with margin */}
                    <a
                      className="cursor-pointer text-lg font-medium text-[#0A379C] underline"
                      onClick={() => toggleQuestion(question)}
                    >
                      {question}
                    </a>
                    {openQuestion === question && (
                      <div className="ml-4 mt-2 text-gray-700">{answer}</div> // Align answer with question
                    )}
                  </li>
                ))}
              </ul>
            </div>{" "}
            {/* End of added div */}
          </div>
        </div>
      </div>

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
