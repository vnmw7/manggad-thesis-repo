"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const SearchBookPage = () => {
	const [books, getBooks] = useState<{ id: number; title: string; yearOfSubmission: number }[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const router = useRouter()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        console.log(`Sending search request for: ${searchQuery}`);
		const response = await fetch('http://localhost:3001/books/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ searchQuery }),
		});
		const searchResults = await response.json();
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
	
	return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="w-full bg-[#0442B1] text-white px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src="/MANGGAD LOGO.png"
                        alt="Manggad Logo"
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

            {/* Image Banner */}
            <div className="w-full">
                <img
                    src="/Librarysample.jpg"
                    alt="Banner"
                    className="w-full object-cover h-[200px]"
                />
            </div>

            {/* Main Content with Sidebar */}
            <div className="flex flex-1 ml-4">
                {/* Sidebar */}
                <div className="sticky top-5 w-[250px] bg-white p-4 border rounded-lg mt-5 self-start">
                    {/* BROWSE Section */}
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

                    {/* Author Corner Section */}
                    <div className="mb-4">
                        <button
                            onClick={() => toggleDropdown("author")}
                            className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 15.5l2.5-2.5-2.5-2.5m-11 7l-2.5-2.5 2.5-2.5M5 9h14m-7 10l-5-5h10l-5 5z"/>
                            </svg>
                            Author Corners
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

                {/* Main Content Area */}
                <div className="flex-1 px-4">
                    {/* search input */}
                    <div className="w-full flex justify-center mt-5">
                        <form className="w-full max-w-7xl flex items-center" onSubmit={handleSubmit}>
                            <input type="text" className="border border-gray-300 placeholder:text-[#262832] px-4 py-2 w-full text-lg" placeholder="Search for documents, research, and more..." value={searchQuery} onChange={handleChange}/>
                            <button className="bg-[#0442B1] transition hover:bg-blue-600 text-white px-6 py-2 text-lg ml-2 max-w-96" type='submit'> Search </button>
                        </form>
                    </div>

                    <div className="mt-5 px-4 py-2 border rounded-lg max-w-7xl mx-auto h-[930px]">
                        <div className="mt-1 max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {books.map(result => (
                                    <div key={result.id} className="border rounded-lg overflow-clip hover:cursor-pointer hover:border-neutral-400">
                                        <div className='p-4 grid grid-cols-2 grid-rows-2'>
                                            <h5 > {result.title} </h5>
                                            <h6> {result.yearOfSubmission} </h6>
                                        </div>
                                        <div className='bg-neutral-200 w-full h-60 flex items-end justify-center relative group'> {/* 💬[vincent]: nag gamit ko "group"(for the parent) kag "group-hover"(for its child) para mag ipa disappear ang text kng mag hover. */}
                                            <div className='aspect-[1/1.3] w-40 bg-cover bg-center group-hover:opacity-0' style={{ backgroundImage: `url("/defaults/defaultBookCover.png")` }}></div>
                                            <p className="text-gray-600 absolute top-0 w-full h-full p-2 text-justify overflow-y-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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
	)
}

export default SearchBookPage;