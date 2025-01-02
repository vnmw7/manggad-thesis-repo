"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/_components/Header";
import SideNav from "@/app/_components/SideNav";
import Footer from "@/app/_components/Footer";

const SearchBookPage = () => {
  const [books, getBooks] = useState<
    {
      id: number;
      title: string;
      yearOfSubmission: number;
      coverImage: string;
      recommendations: number;
      abstract: string;
      keywords: string;
    }[]
  >([]);
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    author: "",
    advisor: "",
    publisher: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getAllBooks = () => {
    fetch("http://localhost:3001/books/")
      .then((response) => response.json())
      .then((data) => getBooks(data));
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      getAllBooks();
    } else {
      const response = await fetch("http://localhost:3001/books/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery }),
      });
      const searchResults = await response.json();
      console.log(`Received search results: ${searchResults}`);
      getBooks(searchResults.data);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      const formEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      }) as unknown as FormEvent<HTMLFormElement>;
      handleSubmit(formEvent);
    } else {
      getAllBooks();
    }
  }, [initialQuery]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />

      {/* Main Content with Sidebar */}
      <div className="ml-4 flex flex-1">
        <SideNav />

        {/* Main Content Area */}
        <div className="flex-1 px-4">
          {/* search input */}
          <div className="mt-5 flex w-full flex-col items-center">
            <form
              className="flex w-full max-w-7xl flex-col items-center gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="grow border border-gray-300 px-4 py-2 text-lg placeholder:text-[#262832]"
                placeholder="Search for documents, research, and more..."
                value={searchQuery}
                onChange={handleChange}
              />
              <button
                className="tritiary ml-4 h-full max-w-60 !border !border-gray-300 px-12"
                type="submit"
              >
                Filters
              </button>
              <button
                className="ml-2 h-full max-w-96 bg-[#0442B1] px-6 py-2 text-lg text-white transition hover:bg-blue-600"
                type="submit"
              >
                Search
              </button>
              <div className="flex w-full items-center">
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
                  Search
                </button>
                <button
                  type="button"
                  className="ml-2 border border-gray-300 px-4 py-2 text-lg transition hover:bg-gray-100"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              {/* Filter Section */}
              {showFilters && (
                <div className="w-full max-w-7xl rounded-lg border border-gray-300 p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Date Range
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          name="startDate"
                          value={filters.startDate}
                          onChange={handleFilterChange}
                          className="w-full rounded border border-gray-300 px-3 py-2"
                        />
                        <span className="self-center">to</span>
                        <input
                          type="date"
                          name="endDate"
                          value={filters.endDate}
                          onChange={handleFilterChange}
                          className="w-full rounded border border-gray-300 px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={filters.author}
                        onChange={handleFilterChange}
                        className="rounded border border-gray-300 px-3 py-2"
                        placeholder="Enter author name"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Advisor
                      </label>
                      <input
                        type="text"
                        name="advisor"
                        value={filters.advisor}
                        onChange={handleFilterChange}
                        className="rounded border border-gray-300 px-3 py-2"
                        placeholder="Enter advisor name"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Publisher
                      </label>
                      <input
                        type="text"
                        name="publisher"
                        value={filters.publisher}
                        onChange={handleFilterChange}
                        className="rounded border border-gray-300 px-3 py-2"
                        placeholder="Enter publisher name"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="mx-auto mt-5 h-[930px] max-w-7xl rounded-lg border px-4 py-2">
            <div className="mx-auto mt-1 max-w-7xl">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {books.map((Book) => (
                  <div
                    key={Book.id}
                    className="overflow-clip rounded-lg border hover:cursor-pointer hover:border-neutral-400"
                    onClick={() => router.push(`/book/${Book.id}`)}
                  >
                    <div className="grid grid-cols-2 grid-rows-2 px-4 py-2">
                      <p className="col-span-2"> {Book.title} </p>
                      <p className="row-start-2 text-neutral-600">
                        {Book.yearOfSubmission}
                      </p>
                      <div className="column-start-2 row-span-3 row-start-2 flex h-full w-full items-center justify-end">
                        <p
                          className={`pr-2 ${Book.recommendations > 0 ? "text-blue-700" : "text-neutral-200"}`}
                        >
                          {Book.recommendations}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.5rem"
                          height="1.5rem"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill={
                              Book.recommendations > 0 ? "#0442b1" : "#e5e5e5"
                            }
                            fill-rule="evenodd"
                            d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a1 1 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a1 1 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a1 1 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a1 1 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a1 1 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a1 1 0 0 1-.696-.288l-.893-.893A2.98 2.98 0 0 0 12 2m3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253l-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="group relative flex h-60 w-full items-end justify-center bg-neutral-200">
                      <div
                        className="aspect-[1/1.3] w-40 bg-cover bg-center group-hover:opacity-0"
                        style={{
                          backgroundImage: `url(${Book.coverImage || "/defaults/defaultBookCover.png"})`,
                        }}
                      ></div>
                      <p className="absolute top-0 h-full w-full overflow-y-hidden p-2 text-justify text-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {Book.abstract}
                        <br /> <br /> Keywords: <br />
                        {Book.keywords}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchBookPage;
