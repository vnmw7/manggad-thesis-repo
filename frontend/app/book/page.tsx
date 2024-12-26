"use client";

import { useState, useEffect, ChangeEvent, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBookPage = () => {
  const [books, getBooks] = useState<
    { id: number; title: string; yearOfSubmission: number }[]
  >([]);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Sending search request for: ${searchQuery}`);
    const response = await fetch("http://localhost:3001/books/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery }),
    });
    const searchResults = await response.json();
    console.log(`Received search results: ${searchResults}`);
    getBooks(searchResults);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (initialQuery) {
      const formEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      }) as unknown as FormEvent<HTMLFormElement>;
      handleSubmit(formEvent);
    }
  }, [initialQuery]);

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

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Navbar */}
      <nav className="flex w-full items-center justify-between bg-[#0442B1] px-4 py-2 text-white">
        <div className="flex items-center">
          <img
            src="/MANGGAD LOGO.png"
            alt="Manggad Logo"
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
              onClick={() => router.push("../login")}
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

      {/* Image Banner */}
      <div className="w-full">
        <img
          src="/Librarysample.jpg"
          alt="Banner"
          className="h-[200px] w-full object-cover"
        />
      </div>

      {/* Main Content with Sidebar */}
      <div className="ml-4 flex flex-1">
        {/* Sidebar */}
        <div className="sticky top-5 mt-5 w-[250px] self-start rounded-lg border bg-white p-4">
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
                    onClick={() => router.push("/collection")}
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-pointer text-lg hover:underline"
                    onClick={() => router.push("/discipline")}
                  >
                    Disciplines
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
              Author Corners
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
                    href="#"
                    className="cursor-pointer text-lg hover:underline"
                  >
                    Policies
                  </a>
                </li>
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
        <Suspense fallback={<div>Loading search results...</div>}>
          <div className="flex-1 px-4">
            {/* search input */}
            <div className="mt-5 flex w-full justify-center">
              <form
                className="flex w-full max-w-7xl items-center"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 text-lg placeholder:text-[#262832]"
                  placeholder="Search for documents, research, and more..."
                  value={searchQuery}
                  onChange={handleChange}
                />
                <button
                  className="ml-2 max-w-96 bg-[#0442B1] px-6 py-2 text-lg text-white transition hover:bg-blue-600"
                  type="submit"
                >
                  {" "}
                  Search{" "}
                </button>
              </form>
            </div>

            <div className="mx-auto mt-5 h-[930px] max-w-7xl rounded-lg border px-4 py-2">
              <div className="mx-auto mt-1 max-w-7xl">
                {/* book grid nga ga contain sng mga search results / books */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {books.map((result) => (
                    <div
                      key={result.id}
                      className="overflow-clip rounded-lg border hover:cursor-pointer hover:border-neutral-400"
                      onClick={() => router.push(`/book/${result.id}`)}
                    >
                      <div className="grid grid-cols-2 grid-rows-2 px-4 py-2">
                        <p className="col-span-2"> {result.title} </p>
                        <p className="row-start-2 text-neutral-600">
                          {" "}
                          {result.yearOfSubmission}{" "}
                        </p>
                        <div className="column-start-2 row-span-3 row-start-2 flex h-full w-full items-center justify-end">
                          <p className="pr-2 text-neutral-200"> 0 </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5rem"
                            height="1.5rem"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#e5e5e5"
                              fill-rule="evenodd"
                              d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a1 1 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a1 1 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a1 1 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a1 1 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a1 1 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a1 1 0 0 1-.696-.288l-.893-.893A2.98 2.98 0 0 0 12 2m3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253l-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="group relative flex h-60 w-full items-end justify-center bg-neutral-200">
                        {" "}
                        {/* 💬[vincent]: nag gamit ko "group"(for the parent) kag "group-hover"(for its child) para mag ipa disappear ang text kng mag hover. */}
                        <div
                          className="aspect-[1/1.3] w-40 bg-cover bg-center group-hover:opacity-0"
                          style={{
                            backgroundImage: `url("/defaults/defaultBookCover.png")`,
                          }}
                        ></div>
                        <p className="absolute top-0 h-full w-full overflow-y-hidden p-2 text-justify text-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Suspense>
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
};

export default SearchBookPage;
