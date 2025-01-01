"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "@/app/_components/Header";
import SideNav from "@/app/_components/SideNav";
import Footer from "@/app/_components/Footer";

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

  useEffect(() => {
    fetch(`http://localhost:3001/books/view/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />

      <div className="ml-4 flex flex-1">
        <SideNav />

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

                {/* PDF viewer */}
                <iframe src="https://res.cloudinary.com/ddmy7qqy1/raw/upload/v1735550432/manggad/pdf/kobquhk5wdlaeew3puwg.pdf" width="800" height="600" title="PDF Viewer"></iframe>
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

                  <h2 className="mb-3 text-2xl font-semibold">Authors</h2>
                  <ul className="mb-6 list-inside list-disc">
                    {book.authors.map((author, index) => (
                      <li key={index} className="text-lg">
                        {author.firstName} {author.lastName}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="rounded-lg bg-[#0442B1] px-4 py-2 text-white hover:bg-[#033391]"
                    onClick={() => {
                      window.open("https://res.cloudinary.com/ddmy7qqy1/raw/upload/fl_attachment/v1735550432/manggad/pdf/kobquhk5wdlaeew3puwg.pdf", "_blank");
                    }}
                  > 
                    Download PDF 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
