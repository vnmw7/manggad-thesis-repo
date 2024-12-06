"use client"

import { useState, useEffect, ChangeEvent, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/app/_components/Header';
import SideNav from '@/app/_components/SideNav';
import Footer from '@/app/_components/Footer';

const SearchBookPage = () => {
    const [books, getBooks] = useState<{ 
        id: number
        title: string
        yearOfSubmission: number
        coverImage: string
        recommendations: number
        abstract: string
    }[]>([]);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('query') || '';
    const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const fetchData = async (query: string) => {
        try {
            const response = await fetch(`http://localhost:3001/books${query ? '/search' : ''}`, {
                method: query ? 'POST' : 'GET', // Conditional method
                headers: {
                    'Content-Type': query ? 'application/json' : 'application/json', // Correct header even for GET (optional, depends on your API)

                },
                body: query ? JSON.stringify({ searchQuery: query }) : undefined, // Conditional body
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);  // Handle errors properly
            }

            const data = await response.json();
            getBooks(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Optionally display an error message to the user
            getBooks([]); // Or handle the error state as needed
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Use router.push instead of directly calling fetchData.
        // This allows nextjs to handle the searchparams properly.
        router.push(`/book/search?query=${searchQuery}`);
    };

    useEffect(() => {
        // Use a single useEffect and fetchData function
        fetchData(initialQuery);
    }, [initialQuery]);

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />

            {/* Main Content with Sidebar */}
            <div className="flex flex-1 ml-4">
                <SideNav />

                {/* Main Content Area */}
                <div className="flex-1 px-4">
                    <Suspense fallback={<div>Loading search results...</div>}>
                        {/* search input */}
                        <div className="w-full flex justify-center mt-5">
                            <form className="w-full max-w-7xl flex items-center" onSubmit={handleSubmit}>
                                <input type="text" className="border border-gray-300 placeholder:text-[#262832] px-4 py-2 w-full text-lg" placeholder="Search for documents, research, and more..." value={searchQuery} onChange={handleChange}/>
                                <button className="bg-[#0442B1] transition hover:bg-blue-600 text-white px-6 py-2 text-lg ml-2 max-w-96" type='submit'> Search </button>
                            </form>
                        </div>

                        <div className="mt-5 px-4 py-2 border rounded-lg max-w-7xl mx-auto h-[930px]">
                            <div className="mt-1 max-w-7xl mx-auto">
                                {/* book grid nga ga contain sng mga search results / books */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {books.map(Book => (
                                        <div key={Book.id} className="border rounded-lg overflow-clip hover:cursor-pointer hover:border-neutral-400" onClick={() => router.push(`/book/${Book.id}`)}>
                                            <div className='px-4 py-2 grid grid-cols-2 grid-rows-2'>
                                                <p className='col-span-2'> {Book.title} </p>
                                                <p className='row-start-2 text-neutral-600'> {Book.yearOfSubmission} </p>
                                                <div className='row-start-2 row-span-3 column-start-2 w-full h-full flex items-center justify-end'>
                                                    <p className={`pr-2 ${Book.recommendations > 0 ? 'text-blue-700' : 'text-neutral-200'}`}> {Book.recommendations} </p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
                                                        <path fill={Book.recommendations > 0 ? '#0442b1' : '#e5e5e5'} fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a1 1 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a1 1 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a1 1 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a1 1 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a1 1 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a1 1 0 0 1-.696-.288l-.893-.893A2.98 2.98 0 0 0 12 2m3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253l-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className='bg-neutral-200 w-full h-60 flex items-end justify-center relative group'> {/* 💬[vincent]: nag gamit ko "group"(for the parent) kag "group-hover"(for its child) para mag ipa disappear ang text kng mag hover. */}
                                                <div className='aspect-[1/1.3] w-40 bg-cover bg-center group-hover:opacity-0' style={{ backgroundImage: `url(${Book.coverImage || "/defaults/defaultBookCover.png"})` }}></div>
                                                <p className="text-gray-600 absolute top-0 w-full h-full p-2 text-justify overflow-y-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"> {Book.abstract} </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Suspense>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default SearchBookPage;
