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
            .then(response => response.json())
            .then(data => setBook(data));
    }, [id]);

    const toggleDropdown = (dropdownName: string) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    if (!book) return <div className="w-full h-screen flex justify-center items-center">Loading...</div>;

    return (
        <div className="w-full min-h-screen flex flex-col">
            <nav className="w-full bg-[#0442B1] text-white px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src="../MANGGAD LOGO.png"
                        alt="Logo"
                        className="h-32 w-32 mr-2"
                    />
                    <div className="text-2xl font-extrabold">Manggad Research Repository</div>
                </div>

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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-800"
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
                    className="w-full object-cover h-[200px]"
                />
            </div>

            <div className="flex flex-1 ml-4">
                <div className="w-[250px] h-[428px] bg-white p-4 border rounded-lg mt-5">
                    <div className="mb-4">
                        <button
                            onClick={() => toggleDropdown("browse")}
                            className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18m-7 5h7"/>
                            </svg>
                            Browse
                        </button>
                        {openDropdown === "browse" && (
                            <ul className="space-y-1">
                                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/collection")}>Collections</a></li>
                                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/discipline")}>Disciplines</a></li>
                                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/author")}>Authors</a></li>
                            </ul>
                        )}
                    </div>

                    <div className="mb-4">
                        <button
                            onClick={() => toggleDropdown("author")}
                            className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 15.5l2.5-2.5-2.5-2.5m-11 7l-2.5-2.5 2.5-2.5M5 9h14m-7 10l-5-5h10l-5 5z"/>
                            </svg>
                            Author Corner
                        </button>
                        {openDropdown === "author" && (
                            <ul className="space-y-1">
                                <li><a className="text-lg hover:underline cursor-pointer">Author FAQ</a></li>
                            </ul>
                        )}
                    </div>

                    <div className="mb-4">
                        <button
                            onClick={() => toggleDropdown("connect")}
                            className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 4.5l-7 7-7-7M19 15.5l-7 7-7-7"/>
                            </svg>
                            About Manggad
                        </button>
                        {openDropdown === "connect" && (
                            <ul className="space-y-1">
                                <li><a href="#" className="text-lg hover:underline cursor-pointer">Policies</a></li>
                                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/contact")}>Contact</a></li>
                                <li><a href="https://lcc.edu.ph/" className="text-lg hover:underline cursor-pointer">LCCB Website</a></li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                        <h1 className="text-4xl font-bold text-[#0442B1] mb-6">{book.title}</h1>
                        
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                {book.coverImage && (
                                    <img 
                                        src={book.coverImage} 
                                        alt={book.title}
                                        className="w-full rounded-lg shadow-md mb-4"
                                    />
                                )}
                                
                                <h2 className="text-2xl font-semibold mb-3">Authors</h2>
                                <ul className="list-disc list-inside mb-6">
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
                                        <h2 className="text-2xl font-semibold mb-2">Abstract</h2>
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
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#0442B1] text-white py-2 px-4 rounded-md hover:bg-[#03308a]"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <footer className="bg-[#0442B1] text-white py-4 mt-14">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <p className="text-sm">