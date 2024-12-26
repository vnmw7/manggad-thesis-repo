"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/_components/Header";
import SideNav from "@/app/_components/SideNav";
import Footer from "@/app/_components/Footer";
import AddEditBookForm from "@/app/_components/AddEditBookForm";

// typescript nga mag set up types sa dictionary
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
  coverImageUrl?: string;
  authors: Author[];
}

const EditBook = () => {
  const { id } = useParams();
  console.log(id);

  const [Book, setBook] = useState<Book | null>(null); // i also want to add the id

  useEffect(() => {
    fetch(`http://localhost:3001/books/view/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Fetched from server:`, data);
        setBook(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  console.log(`Current Book state:`, Book);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />

      {/* Main Content with Sidebar under the banner */}
      <div className="ml-4 flex flex-1">
        <SideNav />

        <div className="flex-1">
          <AddEditBookForm heading="Edit Book / Research" Book={Book} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditBook;
