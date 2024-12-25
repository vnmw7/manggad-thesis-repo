"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Author {
  firstName: string;
  lastName: string;
}

interface Book {
  id: string;
  title: string;
  abstract?: string;
  keywords?: string;
  language?: string;
  yearOfSubmission?: number;
  coverImage?: string;
  authors: Author[];
}

export default function ViewBookPage() {
  const router = useRouter();
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/books/view/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data));
  }, [id]);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

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

  if (!book)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <nav className="flex w-full items-center justify-between bg-[#0442B1] px-4 py-2 text-white">
        <div className="flex items-center">
          <img
            src="../MANGGAD LOGO.png"
            alt="Logo"
            className="mr-2 h-32 w-32"
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
              onClick={() => console.log("/login")}
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
          src="../Librarysample.jpg"
          alt="Banner"
          className="h-[200px] w-full object-cover"
        />
      </div>

      <div className="ml-4 flex flex-1">
        <div className="mt-5 h-[428px] w-[250px] rounded-lg border bg-white p-4">
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
        </div>

        <div className="flex-1 p-6">
          <div className="mx-auto max-w-7xl rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-4xl font-bold text-[#0442B1]">
              {book.title}
            </h1>

            {/* Back Button */}
            <button
              onClick={router.back}
              className="mb-6 rounded-lg bg-[#0442B1] px-4 py-2 text-white hover:bg-[#033391]"
            >
              Back
            </button>

            <div className="grid grid-cols-2 gap-8">
              <div>
                {book.coverImage && (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="mb-4 w-full rounded-lg shadow-md"
                  />
                )}

                <h2 className="mb-3 text-2xl font-semibold">Authors</h2>
                <ul className="mb-6 list-inside list-disc">
                  {book.authors.map((author, index) => (
                    <li key={index} className="text-lg">
                      {author.firstName} {author.lastName}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {book.abstract && (
                  <div className="mb-6">
                    <h2 className="mb-2 text-2xl font-semibold">Abstract</h2>
                    <p className="text-gray-700">{book.abstract}</p>
                  </div>
                )}

                <div className="space-y-4">
                  {book.keywords && (
                    <div>
                      <h3 className="font-semibold">Keywords:</h3>
                      <p className="text-gray-700">{book.keywords}</p>
                    </div>
                  )}

                  {book.language && (
                    <div>
                      <h3 className="font-semibold">Language:</h3>
                      <p className="text-gray-700">{book.language}</p>
                    </div>
                  )}

                  {book.yearOfSubmission && (
                    <div>
                      <h3 className="font-semibold">Year of Submission:</h3>
                      <p className="text-gray-700">{book.yearOfSubmission}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
