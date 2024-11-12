"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadImage from './UploadImage';

// typescript nga mag set up types sa dictionary
interface Author {
  firstName: string;
  lastName: string;
}

export default function AboutPage() {
  const router = useRouter();
  // State for the dropdown
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // State for real-time clock and date
  const [currentTime, setCurrentTime] = useState(new Date());

  // Form state for AddBook
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [language, setLanguage] = useState('');
  const [yearOfSubmission, setYearOfSubmission] = useState<number | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  // Author and Advisor arrays
  const [authors, setAuthors] = useState<Author[]>([]);
  const [author_firstName, setAuthor_firstName] = useState('');
  const [author_lastName, setAuthor_lastName] = useState('');
  const [advisors, setAdvisors] = useState<Author[]>([]);
  const [advisor_firstName, setAdvisor_firstName] = useState('');
  const [advisor_lastName, setAdvisor_lastName] = useState('');

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

  // Add Author to the list
  const addAuthor = () => {
    if (author_firstName && author_lastName) {
      setAuthors([...authors, { firstName: author_firstName, lastName: author_lastName }]);
      setAuthor_firstName('');
      setAuthor_lastName('');
    } else {
      alert("Both names are required.");
    }
  };

  // Remove Author from the list
  const removeAuthor = (removeIndex: number) => {
    const newArray = authors.filter((author, authorIndex) => removeIndex !== authorIndex);
    setAuthors(newArray);
  };

  // Add Advisor to the list
  const addAdvisor = () => {
    if (advisor_firstName && advisor_lastName) {
      setAdvisors([...advisors, { firstName: advisor_firstName, lastName: advisor_lastName }]);
      setAdvisor_firstName('');
      setAdvisor_lastName('');
    } else {
      alert("Both names are required.");
    }
  };

  // Remove Advisor from the list
  const removeAdvisor = (removeIndex: number) => {
    const newArray = advisors.filter((advisor, advisorIndex) => removeIndex !== advisorIndex);
    setAdvisors(newArray);
  };

  // Handle form submission for adding a new book
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook = {
      title,
      abstract,
      language,
      keywords,
      yearOfSubmission,
      authors,
      advisors,
      coverImageUrl
    };

    console.log("Sending new book:", newBook);

    try {
      const response = await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-[#0442B1] text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo Image */}
          <img
            src="MANGGAD LOGO.png"
            alt="Logo"
            className="h-14 w-14 mr-2"
          />
          <div className="text-lg font-extrabold">Manggad</div>
        </div>

        {/* Centered Navigation Links and Real-time/ Admin section */}
        <div className="flex items-center space-x-8">
          <div className="flex space-x-5">
            <a className="hover:underline cursor-pointer text-lg" onClick={() => router.push("/home")}>Home</a>
            <a className="hover:underline cursor-pointer text-lg" onClick={() => router.push("/about")}>About</a>
            <a className="hover:underline cursor-pointer text-lg" onClick={() => router.push("/contact")}>Contact</a>
          </div>

          <div className="border-l border-white h-10 mx-4"></div>

          <div className="flex items-center space-x-4">
            <div className="font-mono text-lg text-right">
              <div>{formattedDate}</div>
              <div>{formattedTime}</div>
            </div>
            <button
              className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => console.log("Login as admin")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-800">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c2.485 0 4.5-2.015 4.5-4.5S14.485 2 12 2 7.5 4.015 7.5 6.5 9.515 11 12 11zM4 20c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
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
          className="w-full object-cover h-[200px]"
        />
      </div>

      {/* Main Content with Sidebar under the banner */}
      <div className="flex flex-1 ml-4">
        {/* Sidebar - Under Banner and on Full Left */}
        <div className="w-[250px] h-[428px] bg-white p-4 border rounded-lg mt-5">
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
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/collection") }>Collections</a></li>
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/discipline") }>Disciplines</a></li>
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/author") }>Authors</a></li>
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
                <li><a className="text-lg hover:underline cursor-pointer">Author FAQ</a></li>
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
              <input
                type="text"
                className="border border-gray-300 placeholder:text-[#262832] px-4 py-2 w-full text-lg"
                placeholder="Search for documents, research, and more..."
              />
              <button className="bg-[#0442B1] transition hover:bg-blue-600 text-white px-6 py-2 text-lg ml-2 max-w-96">
                Search
              </button>
            </form>
          </div>

          {/* Add Book Form */}
          <form onSubmit={handleSubmit} className="mt-5">
            <div>
              <label htmlFor="publishedDate"> Title: </label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div>
              <input value={author_firstName} onChange={e => setAuthor_firstName(e.target.value)} placeholder="First Name" />
              <input value={author_lastName} onChange={e => setAuthor_lastName(e.target.value)} placeholder="Last Name" />
              <button type="button" onClick={addAuthor}>Add Author</button>
              <ul>
                {authors.map((author, index) => (
                  <li key={index}>
                    {author.firstName} {author.lastName}
                    <button onClick={() => removeAuthor(index)} type="button"> Remove </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <input value={advisor_firstName} onChange={e => setAdvisor_firstName(e.target.value)} placeholder="First Name" />
              <input value={advisor_lastName} onChange={e => setAdvisor_lastName(e.target.value)} placeholder="Last Name" />
              <button type="button" onClick={addAdvisor}>Add Advisor</button>
              <ul>
                {advisors.map((advisor, index) => (
                  <li key={index}>
                    {advisor.firstName} {advisor.lastName}
                    <button onClick={() => removeAdvisor(index)} type="button"> Remove </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label htmlFor="abstract"> Abstract </label>
              <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="keywords"> Keywords </label>
              <input value={keywords} onChange={(e) => setKeywords(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="language"> Language </label>
              <input value={language} onChange={(e) => setLanguage(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="yearOfSubmission"> Year of Submission </label>
              <input value={yearOfSubmission || ""} onChange={(e) => setYearOfSubmission(Number(e.target.value))} required />
            </div>

            <div>
              <label htmlFor="coverImageUrl"> Cover Image URL </label>
              <input value={coverImageUrl || ""} onChange={(e) => setCoverImageUrl(e.target.value)} />
            </div>

            <button type="submit">Add Book</button>
          </form>
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
