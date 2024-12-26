"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Header from "../_components/Header";
import SideNav from "../_components/SideNav";
import Footer from "../_components/Footer";

interface Author {
  firstName: string;
  lastName: string;
}

interface Book {
  id: number;
  title: string;
  authors: Author[];
  yearOfSubmission: number;
}

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/books/")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const deleteBook = (id: number) => {
    fetch(`http://localhost:3001/books/delete/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setBooks(books.filter((book) => book.id !== id));
      }
    });
  };

  const addRecommendation = (id: number) => {
    fetch(`http://localhost:3001/books/addRecommendation/${id}`, {
      method: "POST",
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      {/* Main Content with Sidebar */}
      <div className="flex flex-1 flex-col lg:flex-row">
        <SideNav />

        {/* Main Content Area */}
        <div className="flex-1 px-4">
          {/* Books Container */}
          <div className="mx-auto mt-5 min-h-[500px] max-w-7xl rounded-lg border px-4 py-2">
            <div className="mx-auto mt-1 max-w-7xl">
              <h1 className="mb-4 text-2xl font-semibold">
                Current Uploaded Books
              </h1>
              <button
                className="mb-6 rounded bg-[#0442B1] px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => router.push("/book/addBook")}
              >
                Add Book
              </button>

              {/* Book Cards Grid */}
              <div className="grid auto-rows-max grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {books.map((book: Book) => (
                  <Card
                    key={book.id}
                    variant="outlined"
                    className="flex flex-col"
                  >
                    <CardContent className="flex-1">
                      <h1 className="text-lg font-bold">{book.title}</h1>
                      <p>
                        {book.authors
                          .map(
                            (author) =>
                              `${author.firstName} ${author.lastName}`,
                          )
                          .join(", ")}
                      </p>
                      <p>{book.yearOfSubmission}</p>
                    </CardContent>
                    <CardActions className="justify-start gap-2 p-2">
                      <Button
                        size="small"
                        onClick={() => router.push(`/book/${book.id}`)}
                        className="w-24 cursor-pointer whitespace-nowrap rounded-lg px-4 py-2"
                        style={{
                          backgroundColor: "#2563eb",
                          color: "#ffffff",
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        onClick={() => router.push(`/book/${book.id}/edit`)}
                        className="w-24 cursor-pointer rounded-lg px-4 py-2"
                        style={{
                          backgroundColor: "#d1bf00",
                          color: "#ffffff",
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() => deleteBook(book.id)}
                        className="w-24 cursor-pointer rounded-lg px-4 py-2"
                        style={{
                          backgroundColor: "#ff2323",
                          color: "#ffffff",
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        onClick={() => addRecommendation(book.id)}
                        className="w-24 cursor-pointer rounded-lg px-4 py-2"
                        style={{
                          backgroundColor: "#d1bf00",
                          color: "#ffffff",
                        }}
                      >
                        ★
                      </Button>
                    </CardActions>
                  </Card>
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

export default Dashboard;
