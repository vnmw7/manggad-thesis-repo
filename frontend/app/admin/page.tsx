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
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      {/* Main Content with Sidebar */}
      <div className="flex flex-1 ml-4">
        <SideNav />

        {/* Main Content Area */}
        <div className="flex-1 px-4">
          {/* Books Container */}
          <div className="mt-5 px-4 py-2 border rounded-lg max-w-7xl mx-auto min-h-[500px]">
            <div className="mt-1 max-w-7xl mx-auto">
              <h1 className="text-2xl font-semibold mb-4">
                Current Uploaded Books
              </h1>
              <button
                className="mb-6 px-4 py-2 bg-[#0442B1] text-white rounded hover:bg-blue-700"
                onClick={() => router.push("/book/addBook")}
              >
                Add Book
              </button>

              {/* Book Cards Grid */}
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-max">
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
                    <CardActions className="justify-start p-2 gap-2">
                      <Button
                        size="small"
                        onClick={() => router.push(`/book/${book.id}`)}
                        className="rounded-lg px-4 py-2 w-24 whitespace-nowrap cursor-pointer"
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
                        className="rounded-lg px-4 py-2 w-24 cursor-pointer"
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
                        className="rounded-lg px-4 py-2 w-24 cursor-pointer"
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
                        className="rounded-lg px-4 py-2 w-24 cursor-pointer"
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
